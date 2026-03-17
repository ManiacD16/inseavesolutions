<?php
// test_hash.php
$password = 'admin123';
$hash = hash('sha256', $password);
echo "Password: $password\n";
echo "SHA256 Hash: $hash\n";
echo "Length: " . strlen($hash) . "\n";
?>
