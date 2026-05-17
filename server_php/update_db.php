<?php
require_once __DIR__ . '/config/database.php';
$db = (new Database())->getConnection();

try {
    $db->exec("ALTER TABLE blogs ADD COLUMN meta_title VARCHAR(255) DEFAULT NULL");
    echo "Added meta_title.\n";
} catch(Exception $e) { echo "meta_title might already exist.\n"; }

try {
    $db->exec("ALTER TABLE blogs ADD COLUMN meta_description TEXT DEFAULT NULL");
    echo "Added meta_description.\n";
} catch(Exception $e) { echo "meta_description might already exist.\n"; }

try {
    $db->exec("ALTER TABLE blogs ADD COLUMN focus_keyword VARCHAR(255) DEFAULT NULL");
    echo "Added focus_keyword.\n";
} catch(Exception $e) { echo "focus_keyword might already exist.\n"; }

echo "Done.";
?>
