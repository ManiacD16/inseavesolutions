<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/security.php';
require_once __DIR__ . '/../middleware/auth.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];
$action = isset($_GET['action']) ? $_GET['action'] : '';
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;
$input = getJsonInput();

switch($method) {
    case 'GET':
        requireLogin(); // Only admin can see list
        if ($id > 0) {
            $stmt = $db->prepare("SELECT * FROM career_requests WHERE id = :id");
            $stmt->execute([':id' => $id]);
            $request = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($request) {
                sendResponse("success", "Request retrieved", $request);
            } else {
                sendResponse("error", "Request not found", [], 404);
            }
        } else {
            $stmt = $db->query("SELECT * FROM career_requests ORDER BY created_at DESC");
            $requests = $stmt->fetchAll(PDO::FETCH_ASSOC);
            sendResponse("success", "Requests retrieved", $requests);
        }
        break;

    case 'POST':
        // Public submission
        $first_name = $input['first_name'] ?? '';
        $last_name = $input['last_name'] ?? '';
        $email = $input['email'] ?? '';
        $phone = $input['phone'] ?? '';
        $address = $input['address'] ?? '';
        $pincode = $input['pincode'] ?? '';
        $profile = $input['profile'] ?? '';
        $experience_level = $input['experience_level'] ?? 'Fresher';

        if (empty($first_name) || empty($email) || empty($phone)) {
            sendResponse("error", "Name, Email and Phone are required", [], 400);
        }

        try {
            $query = "INSERT INTO career_requests (first_name, last_name, email, phone, address, pincode, profile, experience_level) 
                      VALUES (:first_name, :last_name, :email, :phone, :address, :pincode, :profile, :experience_level)";
            $stmt = $db->prepare($query);
            $stmt->execute([
                ':first_name' => $first_name,
                ':last_name' => $last_name,
                ':email' => $email,
                ':phone' => $phone,
                ':address' => $address,
                ':pincode' => $pincode,
                ':profile' => $profile,
                ':experience_level' => $experience_level
            ]);
            sendResponse("success", "Application submitted successfully", [], 201);
        } catch (PDOException $e) {
            sendResponse("error", "Failed to submit application: " . $e->getMessage(), [], 500);
        }
        break;

    case 'PUT':
        requireLogin();
        if ($id <= 0) sendResponse("error", "ID required", [], 400);

        $status = $input['status'] ?? 'Pending';
        // Allow updating other fields too if needed
        $first_name = $input['first_name'] ?? '';
        $last_name = $input['last_name'] ?? '';
        $email = $input['email'] ?? '';
        $phone = $input['phone'] ?? '';
        $address = $input['address'] ?? '';
        $pincode = $input['pincode'] ?? '';
        $profile = $input['profile'] ?? '';
        $experience_level = $input['experience_level'] ?? '';

        try {
            $query = "UPDATE career_requests SET 
                        first_name = :first_name, 
                        last_name = :last_name, 
                        email = :email, 
                        phone = :phone, 
                        address = :address, 
                        pincode = :pincode, 
                        profile = :profile, 
                        experience_level = :experience_level,
                        status = :status 
                      WHERE id = :id";
            $stmt = $db->prepare($query);
            $stmt->execute([
                ':first_name' => $first_name,
                ':last_name' => $last_name,
                ':email' => $email,
                ':phone' => $phone,
                ':address' => $address,
                ':pincode' => $pincode,
                ':profile' => $profile,
                ':experience_level' => $experience_level,
                ':status' => $status,
                ':id' => $id
            ]);
            sendResponse("success", "Application updated");
        } catch (PDOException $e) {
            sendResponse("error", "Failed to update: " . $e->getMessage(), [], 500);
        }
        break;

    case 'DELETE':
        requireLogin();
        if ($id <= 0) sendResponse("error", "ID required", [], 400);

        try {
            $stmt = $db->prepare("DELETE FROM career_requests WHERE id = :id");
            $stmt->execute([':id' => $id]);
            sendResponse("success", "Application deleted");
        } catch (PDOException $e) {
            sendResponse("error", "Failed to delete", [], 500);
        }
        break;

    default:
        sendResponse("error", "Method not allowed", [], 405);
        break;
}
?>
