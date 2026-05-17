<?php
// server_php/api/migrate_base64.php
require_once __DIR__ . '/../config/database.php';

echo "<h2>Database Schema Migration for Base64 Images</h2>";

$database = new Database();
$db = $database->getConnection();

if (!$db) {
    die("Database connection failed.");
}

try {
    // Modify users table
    $db->exec("ALTER TABLE users MODIFY profile_pic LONGTEXT;");
    echo "<p style='color: green;'>Successfully updated `users` table: `profile_pic` is now LONGTEXT.</p>";

    // Modify blogs table
    $db->exec("ALTER TABLE blogs MODIFY image_url LONGTEXT;");
    echo "<p style='color: green;'>Successfully updated `blogs` table: `image_url` is now LONGTEXT.</p>";

    echo "<p><strong>Migration complete! You can now store base64 images.</strong></p>";
} catch (PDOException $e) {
    echo "<p style='color: red;'>Error during migration: " . htmlspecialchars($e->getMessage()) . "</p>";
}
?>
