<?php
// api/blogs.php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/security.php';
require_once __DIR__ . '/../middleware/auth.php';

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];
$action = isset($_GET['action']) ? $_GET['action'] : '';
$inId = isset($_GET['id']) ? intval($_GET['id']) : 0;
$inSlug = isset($_GET['slug']) ? sanitizeInput($_GET['slug']) : '';
$input = getJsonInput();

// Helper slug generator (if needed for creation)
function generateSlug($title) {
    $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $title)));
    return trim($slug, '-');
}

switch($method) {
    case 'GET':
        if (!empty($inSlug)) {
            // Get single
            $stmt = $db->prepare("SELECT * FROM blogs WHERE slug = :slug");
            $stmt->bindParam(':slug', $inSlug);
            $stmt->execute();
            if ($stmt->rowCount() > 0) {
                $blog = $stmt->fetch(PDO::FETCH_ASSOC);
                // Decode tags if they are JSON, assuming text array migration or JSON format.
                if(!empty($blog['tags'])) {
                    $decoded = json_decode($blog['tags'], true);
                    $blog['tags'] = $decoded !== null ? $decoded : $blog['tags'];
                }
                sendResponse("success", "Blog retrieved", $blog);
            } else {
                sendResponse("error", "Blog not found", [], 404);
            }
        } else {
            // Get all
            $stmt = $db->query("SELECT * FROM blogs ORDER BY created_at DESC");
            $blogs = $stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach($blogs as &$b) {
                if(!empty($b['tags'])) {
                    $decoded = json_decode($b['tags'], true);
                    $b['tags'] = $decoded !== null ? $decoded : $b['tags'];
                }
            }
            sendResponse("success", "Blogs retrieved", $blogs);
        }
        break;

    case 'POST':
        requireLogin(); // Admin required
        $title = $input['title'] ?? '';
        $content = $input['content'] ?? '';
        $description = $input['description'] ?? '';
        $author = $input['author'] ?? '';
        $tags = isset($input['tags']) && is_array($input['tags']) ? json_encode($input['tags']) : '[]';
        $image_url = $input['image_url'] ?? '';

        if (empty($title) || empty($content)) {
            sendResponse("error", "Title and content are required", [], 400);
        }

        $slug = generateSlug($title);

        try {
            $query = "INSERT INTO blogs (title, slug, description, content, author, tags, image_url) VALUES (:title, :slug, :description, :content, :author, :tags, :image_url)";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':title', $title);
            $stmt->bindParam(':slug', $slug);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':content', $content);
            $stmt->bindParam(':author', $author);
            $stmt->bindParam(':tags', $tags);
            $stmt->bindParam(':image_url', $image_url);
            
            if ($stmt->execute()) {
                $id = $db->lastInsertId();
                $inserted = $db->query("SELECT * FROM blogs WHERE id = $id")->fetch(PDO::FETCH_ASSOC);
                sendResponse("success", "Blog created", $inserted, 201);
            }
        } catch (PDOException $e) {
            // 23000 is integrity constraint violation (e.g. unique slug)
            if ($e->getCode() == 23000) {
                sendResponse("error", "A blog with this title already exists", [], 400);
            }
            sendResponse("error", "Failed to create blog", [], 500);
        }
        break;

    case 'PUT':
        requireLogin(); // Admin required
        if ($inId <= 0) sendResponse("error", "ID required for update", [], 400);

        $title = $input['title'] ?? '';
        $description = $input['description'] ?? '';
        $content = $input['content'] ?? '';
        $author = $input['author'] ?? '';
        $tags = isset($input['tags']) && is_array($input['tags']) ? json_encode($input['tags']) : '[]';
        $image_url = $input['image_url'] ?? '';

        try {
            // Exclude slug update logic to match JS, but optionally we could.
            $query = "UPDATE blogs SET title = :title, description = :description, content = :content, author = :author, tags = :tags, image_url = :image_url, updated_at = CURRENT_TIMESTAMP WHERE id = :id";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':title', $title);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':content', $content);
            $stmt->bindParam(':author', $author);
            $stmt->bindParam(':tags', $tags);
            $stmt->bindParam(':image_url', $image_url);
            $stmt->bindParam(':id', $inId);

            if ($stmt->execute()) {
                if ($stmt->rowCount() > 0) {
                    $updated = $db->query("SELECT * FROM blogs WHERE id = $inId")->fetch(PDO::FETCH_ASSOC);
                    sendResponse("success", "Blog updated", $updated);
                } else {
                    sendResponse("error", "Blog not found or no changes made", [], 404);
                }
            }
        } catch (Exception $e) {
            sendResponse("error", "Failed to update blog", [], 500);
        }
        break;

    case 'DELETE':
        requireLogin(); // Admin required
        if ($inId <= 0) sendResponse("error", "ID required for deletion", [], 400);

        try {
            $stmt = $db->prepare("DELETE FROM blogs WHERE id = :id");
            $stmt->bindParam(':id', $inId);
            if ($stmt->execute()) {
                if ($stmt->rowCount() > 0) {
                    sendResponse("success", "Blog deleted", [], 204);
                } else {
                    sendResponse("error", "Blog not found", [], 404);
                }
            }
        } catch (Exception $e) {
             sendResponse("error", "Failed to delete blog", [], 500);
        }
        break;

    default:
        sendResponse("error", "Method not allowed", [], 405);
        break;
}
?>
