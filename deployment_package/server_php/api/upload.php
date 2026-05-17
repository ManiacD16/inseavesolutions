<?php
// api/upload.php
require_once __DIR__ . '/../utils/security.php';
require_once __DIR__ . '/../middleware/auth.php';

// Only admins can upload files
requireLogin();

$method = $_SERVER['REQUEST_METHOD'];

if ($method !== 'POST') {
    sendResponse("error", "Method not allowed", [], 405);
}

// Check if file is uploaded
if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
    sendResponse("error", "No file uploaded or upload error", [], 400);
}

$file = $_FILES['image'];

// Configs matching Node implementation limit: 5MB
$maxFileSize = 5 * 1024 * 1024;
$allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

// File checks
if ($file['size'] > $maxFileSize) {
    sendResponse("error", "File is too large. Max 5MB.", [], 400);
}

$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!in_array($mimeType, $allowedMimeTypes)) {
    sendResponse("error", "Invalid file type. Only JPG, PNG, WEBP allowed.", [], 400);
}

$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
if (!preg_match('/^(jpg|jpeg|png|webp)$/i', $extension)) {
     sendResponse("error", "Invalid file extension.", [], 400);
}

// Generate unique filename
$uniqueSuffix = round(microtime(true) * 1000) . '-' . mt_rand(100000000, 999999999);
$newFilename = $uniqueSuffix . '.' . $extension;

// Destination using existing 'uploads' directory one level up from server_php if we want to share
// Or a new directory here. Let's make an uploads dir inside server_php to isolate it.
$uploadDir = __DIR__ . '/../uploads/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$destination = $uploadDir . $newFilename;

if (move_uploaded_file($file['tmp_name'], $destination)) {
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
    $host = $_SERVER['HTTP_HOST'];
    $imageUrl = $protocol . "://" . $host . '/uploads/' . $newFilename;
    sendResponse("success", "File uploaded", ["imageUrl" => $imageUrl]);
} else {
    sendResponse("error", "Failed to move uploaded file.", [], 500);
}
?>
