<?php
// server_php/api/auth.php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/security.php';
require_once __DIR__ . '/../middleware/auth.php';

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
        $profile_pic = $input['profile_pic'] ?? null;

        try {
            $query = "UPDATE users SET name = :name, email = :email, profile_pic = :profile_pic WHERE id = :id";
            $stmt = $db->prepare($query);
            $stmt->execute([':name' => $name, ':email' => $email, ':profile_pic' => $profile_pic, ':id' => $userId]);
            
            $stmt2 = $db->prepare("SELECT id, username, email, name, profile_pic FROM users WHERE id = :id");
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

    default:
        sendResponse("error", "Endpoint or action not found", [], 404);
        break;
}
