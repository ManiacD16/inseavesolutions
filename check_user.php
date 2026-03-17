<?php
// check_user.php
require_once __DIR__ . '/server_php/config/database.php';

$database = new Database();
$db = $database->getConnection();

echo "<pre>";
try {
    $stmt = $db->query("SELECT id, username, email, password_hash FROM users");
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if (empty($users)) {
        echo "No users found in the 'users' table.\n";
    } else {
        echo "Found " . count($users) . " user(s):\n";
        foreach ($users as $user) {
            echo "ID: {$user['id']}, Username: {$user['username']}, Email: {$user['email']}\n";
            echo "Hash: {$user['password_hash']}\n";
            echo "-------------------\n";
        }
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
echo "</pre>";
?>
