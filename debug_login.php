<?php
// debug_login.php
require_once __DIR__ . '/server_php/config/database.php';

$database = new Database();
$db = $database->getConnection();

$username = 'admin';
$password = 'admin123';

echo "<pre>";
echo "Testing Login for user: $username\n";

try {
    $query = "SELECT * FROM users WHERE username = :username LIMIT 1";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":username", $username);
    $stmt->execute();
    $stmt->

    if ($stmt->rowCount() > 0) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        echo "User found in database.\n";
        echo "Stored Hash: '" . $user['password_hash'] . "'\n";
        echo "Hash Length: " . strlen($user['password_hash']) . "\n";
        echo "Hash Hex: " . bin2hex($user['password_hash']) . "\n";
        
        $expectedHash = hash('sha256', $password);
        $isValid = ($expectedHash === $user['password_hash']);
        
        echo "Expected SHA256 Hash: $expectedHash\n";
        echo "Password Match: " . ($isValid ? "YES" : "NO") . "\n";
        
        if (!$isValid) {
            echo "\nDIAGNOSTIC:\n";
            if (strlen($user['password_hash']) !== 64) {
                echo "- Stored hash length is NOT 64. Please re-run the SQL UPDATE query.\n";
            }
            if ($expectedHash !== $user['password_hash']) {
                echo "- The strings do not match. Check for hidden spaces or characters.\n";
            }
        }
    } else {
        echo "User '$username' NOT found in database.\n";
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
echo "</pre>";
?>
