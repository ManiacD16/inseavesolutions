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
$allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

// File checks
if ($file['size'] > $maxFileSize) {
    sendResponse("error", "File is too large. Max 5MB.", [], 400);
}

$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $file['tmp_name']);
$finfo_close = finfo_close($finfo);

if (!in_array($mimeType, $allowedMimeTypes)) {
    sendResponse("error", "Invalid file type. Only JPG, PNG, WEBP allowed.", [], 400);
}

$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
if (!preg_match('/^(jpg|jpeg|png|webp)$/i', $extension)) {
     sendResponse("error", "Invalid file extension.", [], 400);
}

// Generate unique filename for webp
$uniqueSuffix = round(microtime(true) * 1000) . '-' . mt_rand(100000000, 999999999);
$uploadDir = __DIR__ . '/../uploads/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

/**
 * Automatically convert image to optimized WebP format
 * and resize if width exceeds limit to make file ultra-lightweight.
 */
function convertToWebp($sourcePath, $destinationPath, $quality = 80, $maxWidth = 1200) {
    if (!function_exists('imagecreatefromjpeg') || !function_exists('imagewebp')) {
        return false; // Fallback to normal upload if GD library Webp isn't supported
    }

    $info = getimagesize($sourcePath);
    if ($info === false) {
        return false;
    }

    $mime = $info['mime'];
    
    // Load source image
    switch ($mime) {
        case 'image/jpeg':
        case 'image/jpg':
            $image = imagecreatefromjpeg($sourcePath);
            break;
        case 'image/png':
            $image = imagecreatefrompng($sourcePath);
            if ($image) {
                imagepalettetotruecolor($image);
                imagealphablending($image, true);
                imagesavealpha($image, true);
            }
            break;
        case 'image/webp':
            $image = imagecreatefromwebp($sourcePath);
            break;
        default:
            return false;
    }

    if (!$image) {
        return false;
    }

    // Resize image if it exceeds max width to keep files ultra-lightweight!
    $width = imagesx($image);
    $height = imagesy($image);
    
    if ($width > $maxWidth) {
        $newWidth = $maxWidth;
        $newHeight = floor($height * ($maxWidth / $width));
        
        $resizedImage = imagecreatetruecolor($newWidth, $newHeight);
        
        // Preserve alpha channels during resizing
        imagealphablending($resizedImage, false);
        imagesavealpha($resizedImage, true);
        
        imagecopyresampled($resizedImage, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
        imagedestroy($image);
        $image = $resizedImage;
    }

    // Save as WebP
    $result = imagewebp($image, $destinationPath, $quality);
    imagedestroy($image);
    
    return $result;
}

// Destination path for converted webp file
$newFilename = $uniqueSuffix . '.webp';
$destination = $uploadDir . $newFilename;

// Run conversion
$converted = convertToWebp($file['tmp_name'], $destination, 80, 1200);

// Protocol and Host detection
$protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http";
$host = $_SERVER['HTTP_HOST'];

// 100% Dynamic Subfolder detection for Hostinger and Local environments
$scriptName = str_replace('\\', '/', $_SERVER['SCRIPT_NAME']);
$uploadsUrlPath = dirname(dirname($scriptName)) . '/uploads';
$uploadsUrlPath = '/' . trim($uploadsUrlPath, '/');

if ($converted) {
    $imageUrl = $protocol . "://" . $host . $uploadsUrlPath . '/' . $newFilename;
    sendResponse("success", "File uploaded and converted to WebP successfully", ["imageUrl" => $imageUrl]);
} else {
    // Fallback: move original file if GD conversion failed or wasn't supported
    $fallbackFilename = $uniqueSuffix . '.' . strtolower($extension);
    $fallbackDestination = $uploadDir . $fallbackFilename;
    
    if (move_uploaded_file($file['tmp_name'], $fallbackDestination)) {
        $imageUrl = $protocol . "://" . $host . $uploadsUrlPath . '/' . $fallbackFilename;
        sendResponse("success", "File uploaded successfully (fallback to original format)", ["imageUrl" => $imageUrl]);
    } else {
        sendResponse("error", "Failed to upload file.", [], 500);
    }
}
?>
