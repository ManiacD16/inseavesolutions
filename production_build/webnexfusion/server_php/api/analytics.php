<?php
// api/analytics.php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/security.php';
require_once __DIR__ . '/../middleware/auth.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];
$action = isset($_GET['action']) ? $_GET['action'] : '';

switch($method) {
    case 'POST':
        // Record Visit
        if ($action === 'visit') {
            $ip = $_SERVER['HTTP_CLIENT_IP'] 
                ?? $_SERVER['HTTP_X_FORWARDED_FOR'] 
                ?? $_SERVER['REMOTE_ADDR'];
            
            // Clean IP
            $ip = filter_var($ip, FILTER_VALIDATE_IP) ? $ip : '0.0.0.0';

            try {
                $query = "INSERT INTO visitors (ip_address) VALUES (:ip)";
                $stmt = $db->prepare($query);
                $stmt->bindParam(':ip', $ip);
                $stmt->execute();
                sendResponse("success", "Visit recorded", [], 201);
            } catch (Exception $e) {
                sendResponse("error", "Database error", [], 500);
            }
        } else {
            sendResponse("error", "Action not recognized", [], 400);
        }
        break;

    case 'GET':
        // Get Stats (Admin only)
        requireLogin();

        try {
            // Get Today's count
            $stmtToday = $db->query("SELECT COUNT(*) as count FROM visitors WHERE DATE(visit_date) = CURDATE()");
            $today = $stmtToday->fetch(PDO::FETCH_ASSOC)['count'];

            // Get Yesterday's count
            $stmtYesterday = $db->query("SELECT COUNT(*) as count FROM visitors WHERE DATE(visit_date) = CURDATE() - INTERVAL 1 DAY");
            $yesterday = $stmtYesterday->fetch(PDO::FETCH_ASSOC)['count'];

            // Get Last 30 Days count
            $stmtMonth = $db->query("SELECT COUNT(*) as count FROM visitors WHERE visit_date >= CURDATE() - INTERVAL 30 DAY");
            $month = $stmtMonth->fetch(PDO::FETCH_ASSOC)['count'];

            // Get All Time count
            $stmtAllTime = $db->query("SELECT COUNT(*) as count FROM visitors");
            $allTime = $stmtAllTime->fetch(PDO::FETCH_ASSOC)['count'];

            // Get Graph Data (Last 7 days)
            $graphQuery = "
                SELECT 
                    DATE_FORMAT(visit_date, '%b %d') as date, 
                    COUNT(*) as count 
                FROM visitors 
                WHERE visit_date >= CURDATE() - INTERVAL 7 DAY
                GROUP BY DATE_FORMAT(visit_date, '%b %d'), DATE(visit_date)
                ORDER BY DATE(visit_date) ASC
            ";
            $stmtGraph = $db->query($graphQuery);
            $graph = $stmtGraph->fetchAll(PDO::FETCH_ASSOC);

            sendResponse("success", "Analytics retrieved", [
                "today" => (int)$today,
                "yesterday" => (int)$yesterday,
                "month" => (int)$month,
                "allTime" => (int)$allTime,
                "graph" => $graph
            ]);

        } catch (Exception $e) {
            sendResponse("error", "Database error", [], 500);
        }
        break;

    default:
        sendResponse("error", "Method not allowed", [], 405);
        break;
}
?>
