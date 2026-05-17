<?php
// config/database.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once __DIR__ . '/env.php';

class Database {
    private $host;
    private $db_name;
    private $username;
    private $password;
    public $conn;

    public function __construct() {
        $this->host = $_ENV['DB_HOST'] ?? "localhost";
        $this->db_name = $_ENV['DB_NAME'] ?? "";
        $this->username = $_ENV['DB_USER'] ?? "";
        $this->password = $_ENV['DB_PASS'] ?? "";
    }

    public function getConnection() {
        $this->conn = null;

        try {
            // Setup PDO with error mode exception for robust error handling
            $dsn = "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=utf8mb4";
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false, // True prepared statements
            ];
            $this->conn = new PDO($dsn, $this->username, $this->password, $options);
        } catch(PDOException $exception) {
            // Output secure error json
            echo json_encode([
                "status" => "error",
                "message" => "Database connection error.",
                // "data" => $exception->getMessage() // Uncomment for debugging in dev
            ]);
            exit;
        }
        return $this->conn;
    }
}
?>
