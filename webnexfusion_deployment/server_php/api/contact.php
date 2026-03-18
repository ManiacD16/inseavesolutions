<?php
// api/contact.php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/security.php';
require_once __DIR__ . '/../middleware/auth.php';
require_once __DIR__ . '/../utils/email_utils.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];
$input = getJsonInput();

switch($method) {
    case 'POST':
        $name = $input['name'] ?? '';
        $email = $input['email'] ?? '';
        $subject = $input['subject'] ?? '';
        $message = $input['message'] ?? '';

        if(empty($name) || empty($email) || empty($message)) {
            sendResponse("error", "Name, email, and message are required", [], 400);
        }

        try {
            $query = "INSERT INTO contacts (name, email, subject, message) VALUES (:name, :email, :subject, :message)";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':subject', $subject);
            $stmt->bindParam(':message', $message);
            
            if ($stmt->execute()) {
                // Send professional auto-reply email to client
                sendAutoReply($email, $name);
                
                sendResponse("success", "Message sent successfully", [], 201);
            } else {
                sendResponse("error", "Failed to send message", [], 500);
            }
        } catch (Exception $e) {
            sendResponse("error", "Database error", [], 500);
        }
        break;

    case 'GET':
        requireLogin(); // Only admin should read contacts

        try {
            $stmt = $db->query("SELECT * FROM contacts ORDER BY created_at DESC");
            $contacts = $stmt->fetchAll(PDO::FETCH_ASSOC);
            sendResponse("success", "Contacts retrieved", $contacts);
        } catch (Exception $e) {
            sendResponse("error", "Database error", [], 500);
        }
        break;

    default:
        sendResponse("error", "Method not allowed", [], 405);
        break;
}
?>
