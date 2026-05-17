<?php
// server_php/api/auth.php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/security.php';
require_once __DIR__ . '/../middleware/auth.php';
require_once __DIR__ . '/../utils/email_utils.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];
$action = isset($_GET['action']) ? $_GET['action'] : '';
$input = getJsonInput();

switch($action) {
    case 'login':
        if ($method !== 'POST') sendResponse("error", "Method not allowed", [], 405);
        
        $username = $input['username'] ?? '';
        $password = $input['password'] ?? '';

        if (empty($username) || empty($password)) {
            sendResponse("error", "Username and password required", [], 400);
        }

        try {
            // Using unique parameter names for absolute compatibility
            $query = "SELECT * FROM users WHERE username = :u_search OR email = :e_search LIMIT 1";
            $stmt = $db->prepare($query);
            $stmt->bindParam(":u_search", $username);
            $stmt->bindParam(":e_search", $username);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                
                // SHA256 verification as per user request
                if (hash('sha256', $password) === $user['password_hash']) {
                    $_SESSION['user_id'] = $user['id'];
                    $_SESSION['username'] = $user['username'];
                    $token = session_id(); 

                    sendResponse("success", "Login successful", [
                        "token" => $token,
                        "user" => [
                            "id" => $user['id'],
                            "username" => $user['username'],
                            "email" => $user['email'],
                            "phone" => $user['phone'],
                            "name" => $user['name'],
                            "profile_pic" => $user['profile_pic']
                        ]
                    ]);
                }
            }
            sendResponse("error", "Invalid username or password", [], 401);
        } catch(Throwable $e) {
            sendResponse("error", "Database error during login", [], 500);
        }
        break;

    case 'forgot-password':
        if ($method !== 'POST') sendResponse("error", "Method not allowed", [], 405);
        
        $usernameOrEmail = $input['usernameOrEmail'] ?? $input['email'] ?? '';

        if (empty($usernameOrEmail)) {
            sendResponse("error", "Username or Email is required", [], 400);
        }

        try {
            // Find user by username or email
            $query = "SELECT * FROM users WHERE username = :u_search OR email = :e_search LIMIT 1";
            $stmt = $db->prepare($query);
            $stmt->bindParam(":u_search", $usernameOrEmail);
            $stmt->bindParam(":e_search", $usernameOrEmail);
            $stmt->execute();

            if ($stmt->rowCount() === 0) {
                sendResponse("error", "User not found", [], 404);
            }

            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            $email = $user['email'];
            $name = $user['name'] ?? $user['username'];

            if (empty($email)) {
                sendResponse("error", "No email registered for this account", [], 400);
            }

            // Generate 6 digit OTP
            $otp = strval(rand(100000, 999999));
            $expiry = date('Y-m-d H:i:s', strtotime('+10 minutes'));

            // Update user table with OTP and expiry
            $updateQuery = "UPDATE users SET reset_otp = :otp, reset_otp_expiry = :expiry WHERE id = :id";
            $updateStmt = $db->prepare($updateQuery);
            $updateStmt->bindParam(":otp", $otp);
            $updateStmt->bindParam(":expiry", $expiry);
            $updateStmt->bindParam(":id", $user['id']);
            $updateStmt->execute();

            // Send OTP email
            $emailSent = sendOtpEmail($email, $otp, $name);
            if ($emailSent) {
                sendResponse("success", "OTP sent successfully to " . $email, ["email" => $email]);
            } else {
                sendResponse("error", "Failed to send email. Please check your SMTP settings.", [], 500);
            }
        } catch (Throwable $e) {
            sendResponse("error", "Database error during password reset request: " . $e->getMessage(), [], 500);
        }
        break;

    case 'verify-otp':
        if ($method !== 'POST') sendResponse("error", "Method not allowed", [], 405);
        
        $usernameOrEmail = $input['usernameOrEmail'] ?? $input['email'] ?? '';
        $otp = $input['otp'] ?? '';

        if (empty($usernameOrEmail) || empty($otp)) {
            sendResponse("error", "Username/Email and OTP are required", [], 400);
        }

        try {
            $query = "SELECT * FROM users WHERE username = :u_search OR email = :e_search LIMIT 1";
            $stmt = $db->prepare($query);
            $stmt->bindParam(":u_search", $usernameOrEmail);
            $stmt->bindParam(":e_search", $usernameOrEmail);
            $stmt->execute();

            if ($stmt->rowCount() === 0) {
                sendResponse("error", "User not found", [], 404);
            }

            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user['reset_otp'] !== $otp) {
                sendResponse("error", "Invalid OTP", [], 400);
            }

            $expiryTime = strtotime($user['reset_otp_expiry']);
            if (time() > $expiryTime) {
                sendResponse("error", "OTP has expired", [], 400);
            }

            sendResponse("success", "OTP verified successfully");
        } catch (Throwable $e) {
            sendResponse("error", "Database error during OTP verification", [], 500);
        }
        break;

    case 'reset-password':
        if ($method !== 'POST') sendResponse("error", "Method not allowed", [], 405);

        $usernameOrEmail = $input['usernameOrEmail'] ?? $input['email'] ?? '';
        $otp = $input['otp'] ?? '';
        $newPassword = $input['newPassword'] ?? '';

        if (empty($usernameOrEmail) || empty($otp) || empty($newPassword)) {
            sendResponse("error", "All fields are required", [], 400);
        }

        try {
            $query = "SELECT * FROM users WHERE username = :u_search OR email = :e_search LIMIT 1";
            $stmt = $db->prepare($query);
            $stmt->bindParam(":u_search", $usernameOrEmail);
            $stmt->bindParam(":e_search", $usernameOrEmail);
            $stmt->execute();

            if ($stmt->rowCount() === 0) {
                sendResponse("error", "User not found", [], 404);
            }

            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user['reset_otp'] !== $otp) {
                sendResponse("error", "Invalid OTP", [], 400);
            }

            $expiryTime = strtotime($user['reset_otp_expiry']);
            if (time() > $expiryTime) {
                sendResponse("error", "OTP has expired", [], 400);
            }

            // Hash the new password with SHA256 (same as login/other methods in this codebase)
            $passwordHash = hash('sha256', $newPassword);

            $updateQuery = "UPDATE users SET password_hash = :password_hash, reset_otp = NULL, reset_otp_expiry = NULL WHERE id = :id";
            $updateStmt = $db->prepare($updateQuery);
            $updateStmt->bindParam(":password_hash", $passwordHash);
            $updateStmt->bindParam(":id", $user['id']);
            $updateStmt->execute();

            sendResponse("success", "Password updated successfully");
        } catch (Throwable $e) {
            sendResponse("error", "Database error during password reset", [], 500);
        }
        break;

    case 'register-initial':
        if ($method !== 'POST') sendResponse("error", "Method not allowed", [], 405);
        try {
            $stmt = $db->query("SELECT COUNT(*) as count FROM users");
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($row['count'] > 0) sendResponse("error", "Admin already exists", [], 403);

            $username = $input['username'] ?? '';
            $password = $input['password'] ?? '';
            if (empty($username) || empty($password)) sendResponse("error", "Username and password required", [], 400);

            $hash = hash('sha256', $password);
            $query = "INSERT INTO users (username, password_hash) VALUES (:username, :password_hash)";
            $stmt = $db->prepare($query);
            $stmt->bindParam(":username", $username);
            $stmt->bindParam(":password_hash", $hash);
            
            if($stmt->execute()) {
                sendResponse("success", "Admin registered", ["id" => $db->lastInsertId(), "username" => $username], 201);
            } else {
                sendResponse("error", "Registration failed", [], 500);
            }
        } catch (Throwable $e) {
            sendResponse("error", "Database error during registration", [], 500);
        }
        break;

    case 'profile':
        if ($method !== 'PUT') sendResponse("error", "Method not allowed", [], 405);
        $userId = requireLogin();
        $name = $input['name'] ?? null;
        $email = $input['email'] ?? null;
        $phone = $input['phone'] ?? null;
        $profile_pic = $input['profile_pic'] ?? null;

        try {
            $query = "UPDATE users SET name = :name, email = :email, phone = :phone, profile_pic = :profile_pic WHERE id = :id";
            $stmt = $db->prepare($query);
            $stmt->execute([':name' => $name, ':email' => $email, ':phone' => $phone, ':profile_pic' => $profile_pic, ':id' => $userId]);
            
            $stmt2 = $db->prepare("SELECT id, username, email, phone, name, profile_pic FROM users WHERE id = :id");
            $stmt2->execute([':id' => $userId]);
            sendResponse("success", "Profile updated", $stmt2->fetch(PDO::FETCH_ASSOC));
        } catch (Throwable $e) {
            sendResponse("error", "Database error during profile update", [], 500);
        }
        break;

    case 'logout':
        session_destroy();
        sendResponse("success", "Logged out successfully");
        break;

    case 'password':
        if ($method !== 'PUT') sendResponse("error", "Method not allowed", [], 405);
        $userId = requireLogin();
        $currentPassword = $input['currentPassword'] ?? '';
        $newPassword = $input['newPassword'] ?? '';

        if (empty($currentPassword) || empty($newPassword)) {
            sendResponse("error", "Current and new password are required", [], 400);
        }

        try {
            $stmt = $db->prepare("SELECT password_hash FROM users WHERE id = :id");
            $stmt->execute([':id' => $userId]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if (hash('sha256', $currentPassword) !== $user['password_hash']) {
                sendResponse("error", "Incorrect current password", [], 401);
            }

            $newHash = hash('sha256', $newPassword);
            $stmt2 = $db->prepare("UPDATE users SET password_hash = :hash WHERE id = :id");
            $stmt2->execute([':hash' => $newHash, ':id' => $userId]);

            sendResponse("success", "Password updated successfully");
        } catch (Throwable $e) {
            sendResponse("error", "Database error during password update", [], 500);
        }
        break;

    default:
        sendResponse("error", "Endpoint or action not found", [], 404);
        break;
}
