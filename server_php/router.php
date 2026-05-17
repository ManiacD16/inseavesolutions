<?php
// router.php - Handles routing for PHP built-in server (php -S)

// Add CORS headers for API requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Dynamically normalize path to strip any subfolder nesting before 'api/'
$apiPos = strpos($path, 'api/');
if ($apiPos !== false) {
    $path = substr($path, $apiPos);
} else {
    $path = ltrim($path, '/');
}

// Serve existing files
if (is_file(__DIR__ . '/' . $path)) {
    if (pathinfo(__DIR__ . '/' . $path, PATHINFO_EXTENSION) === 'php') {
        require __DIR__ . '/' . $path;
        exit;
    }
    return false; // Let PHP serve static files natively
}

// Emulate .htaccess rewrites
if (preg_match('#^api/auth/([^/]+)/?$#', $path, $matches)) {
    $_GET['action'] = $matches[1];
    require __DIR__ . '/api/auth.php';
    exit;
}

if (preg_match('#^api/analytics/([^/]+)/?$#', $path, $matches)) {
    $_GET['action'] = $matches[1];
    require __DIR__ . '/api/analytics.php';
    exit;
}

if (preg_match('#^api/blogs/([0-9]+)/?$#', $path, $matches)) {
    $_GET['id'] = $matches[1];
    require __DIR__ . '/api/blogs.php';
    exit;
}

if (preg_match('#^api/blogs/([^/]+)/?$#', $path, $matches)) {
    $_GET['slug'] = $matches[1];
    require __DIR__ . '/api/blogs.php';
    exit;
}

if (preg_match('#^api/careers/([0-9]+)/?$#', $path, $matches)) {
    $_GET['id'] = $matches[1];
    require __DIR__ . '/api/careers.php';
    exit;
}

// Catch-all for /api/something -> /api/something.php
if (preg_match('#^api/([^/]+)/?$#', $path, $matches)) {
    $file = __DIR__ . '/api/' . $matches[1] . '.php';
    if (file_exists($file)) {
        require $file;
        exit;
    }
}

// Default 404
http_response_code(404);
echo "404 Not Found: " . htmlspecialchars($path);
