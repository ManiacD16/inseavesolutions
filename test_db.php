<?php
// test_db.php

// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Require the database configuration file
require_once __DIR__ . '/server_php/config/database.php';

// Instantiate the Database class
$database = new Database();

try {
    // Attempt to get the connection
    $conn = $database->getConnection();

    if ($conn !== null) {
        echo "Database connected successfully";
    } else {
        echo "Failed to connect to the database.";
    }
} catch (Exception $e) {
    // Fallback error catch
    echo "Connection error: " . $e->getMessage();
}
?>
