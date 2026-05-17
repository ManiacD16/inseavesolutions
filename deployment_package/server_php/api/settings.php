<?php
// server_php/api/settings.php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/security.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    try {
        // Fetch the first admin's contact info as site settings
        $query = "SELECT email as contact_email, phone as contact_phone, name as site_name FROM users WHERE username = 'admin' LIMIT 1";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $settings = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$settings) {
            // Fallback if admin not found
            $settings = [
                "contact_email" => "webnexfusion@gmail.com",
                "contact_phone" => "+91-7067164631",
                "site_name" => "Inseave Solutions"
            ];
        }

        sendResponse("success", "Settings fetched", $settings);
    } catch (Throwable $e) {
        sendResponse("error", "Database error", [], 500);
    }
} else {
    sendResponse("error", "Method not allowed", [], 405);
}
