<?php
// middleware/auth.php
require_once __DIR__ . '/../utils/security.php';

function requireLogin() {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    
    // In a full JWT setup, we'd read Headers and verify here.
    // Assuming simple Session based auth or passing token for Hostinger PHP.
    $authHeader = isset($_SERVER['HTTP_AUTHORIZATION']) ? $_SERVER['HTTP_AUTHORIZATION'] : '';

    if (empty($_SESSION['user_id']) && empty($authHeader)) {
        sendResponse("error", "Unauthorized access. Please login.", [], 401);
    }

    // Ideally parse JWT or confirm session validity here
    // For now we assume if session user_id is set, it's valid.
    return $_SESSION['user_id'] ?? null;
}
?>
