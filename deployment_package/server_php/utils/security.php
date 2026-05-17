<?php
// utils/security.php

/**
 * Standardize JSON API Response
 */
function sendResponse($status, $message, $data = [], $http_code = 200) {
    http_response_code($http_code);
    echo json_encode([
        "status" => $status,
        "message" => $message,
        "data" => $data
    ]);
    exit;
}

/**
 * Sanitize String Input
 */
function sanitizeInput($data) {
    if (is_array($data)) {
        foreach ($data as $key => $value) {
            $data[$key] = sanitizeInput($value);
        }
        return $data;
    }
    // Only trim whitespace. htmlspecialchars/strip_tags can garble 
    // passwords and blog content. Prepared statements handle SQL injection.
    return trim($data);
}

/**
 * Parse JSON Request Body Data
 */
function getJsonInput() {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    if ($data === null) {
        return [];
    }
    return sanitizeInput($data);
}

/**
 * CSRF Token Management
 */
function generateCsrfToken() {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function validateCsrfToken($token) {
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }
    if (empty($_SESSION['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $token)) {
        sendResponse("error", "Invalid CSRF token", [], 403);
    }
    return true;
}

?>
