<?php
// api/stats.php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/security.php';
require_once __DIR__ . '/../middleware/auth.php';

// Only admins can view stats
requireLogin();

$database = new Database();
$db = $database->getConnection();

try {
    // 1. Total Blogs
    $stmtBlogs = $db->prepare("SELECT COUNT(*) as count FROM blogs");
    $stmtBlogs->execute();
    $blogsCount = $stmtBlogs->fetch(PDO::FETCH_ASSOC)['count'];

    // 2. Total Contacts
    $stmtContacts = $db->prepare("SELECT COUNT(*) as count FROM contacts");
    $stmtContacts->execute();
    $contactsCount = $stmtContacts->fetch(PDO::FETCH_ASSOC)['count'];

    // 3. Unread Contacts (Notifications)
    // Check if is_read column exists first (to prevent breaking if migration isn't run yet)
    $unreadCount = 0;
    try {
        $stmtUnread = $db->prepare("SELECT COUNT(*) as count FROM contacts WHERE is_read = 0");
        $stmtUnread->execute();
        $unreadCount = $stmtUnread->fetch(PDO::FETCH_ASSOC)['count'];
    } catch (PDOException $e) {
        // is_read column might not exist yet
        $unreadCount = 0; 
    }

    $data = [
        "totalBlogs" => (int)$blogsCount,
        "totalContacts" => (int)$contactsCount,
        "unreadContacts" => (int)$unreadCount
    ];

    sendResponse("success", "Stats retrieved", $data);

} catch (Exception $e) {
    sendResponse("error", "Database error fetching stats", [], 500);
}
?>
