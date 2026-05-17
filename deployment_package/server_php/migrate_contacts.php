<?php
// server_php/migrate_contacts.php
require_once __DIR__ . '/config/database.php';

try {
    $db = (new Database())->getConnection();
    
    // Check if column exists
    $stmt = $db->query("SHOW COLUMNS FROM contacts LIKE 'is_read'");
    $exists = $stmt->fetch();
    
    if (!$exists) {
        $db->exec("ALTER TABLE contacts ADD COLUMN is_read TINYINT(1) DEFAULT 0");
        echo "Successfully added 'is_read' column to contacts table.<br>";
    } else {
        echo "'is_read' column already exists.<br>";
    }
    
    echo "Migration completed successfully.";
} catch(PDOException $e) {
    echo "Migration error: " . $e->getMessage();
}
?>
