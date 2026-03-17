<?php
// reset_admin.php
require_once __DIR__ . '/server_php/config/database.php';

$database = new Database();
$db = $database->getConnection();

$username = 'admin';
$password = 'admin123';
$hash = hash('sha256', $password);

echo "<pre>";
echo "Attempting to reset password for user: $username\n";
echo "New Password: $password\n";
echo "New SHA256 Hash: $hash\n";

try {
    // Check if user exists
    $checkQuery = "SELECT id FROM users WHERE username = :username";
    $checkStmt = $db->prepare($checkQuery);
    $checkStmt->bindParam(":username", $username);
    $checkStmt->execute();

    if ($checkStmt->rowCount() > 0) {
        // Update existing user
        $query = "UPDATE users SET password_hash = :hash WHERE username = :username";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":hash", $hash);
        $stmt->bindParam(":username", $username);
        
        if ($stmt->execute()) {
            echo "\nSUCCESS: Password updated successfully in database!\n";
            echo "You can now login with: $username / $password\n";
        } else {
            echo "\nERROR: Failed to update database.\n";
        }
    } else {
        // Insert new user if not exists
        echo "User '$username' not found. Creating new user...\n";
        $query = "INSERT INTO users (username, password_hash, name, email) VALUES (:username, :hash, 'Admin', 'admin@webnexfusion.com')";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":hash", $hash);
        $stmt->bindParam(":username", $username);
        
        if ($stmt->execute()) {
            echo "\nSUCCESS: User 'admin' created and password set!\n";
        } else {
            echo "\nERROR: Failed to create user.\n";
        }
    }
} catch (Exception $e) {
    echo "\nFATAL ERROR: " . $e->getMessage() . "\n";
}

echo "\n--- Verification ---\n";
$verifyQuery = "SELECT password_hash FROM users WHERE username = :username";
$vStmt = $db->prepare($verifyQuery);
$vStmt->bindParam(":username", $username);
$vStmt->execute();
$vUser = $vStmt->fetch(PDO::FETCH_ASSOC);
echo "Current Stored Hash: " . $vUser['password_hash'] . "\n";
echo "PHP hash('sha256', 'admin123'): " . hash('sha256', 'admin123') . "\n";
echo "Match: " . (hash('sha256', 'admin123') === $vUser['password_hash'] ? "YES" : "NO") . "\n";

echo "</pre>";
?>
