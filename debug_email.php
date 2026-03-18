<?php
// debug_email.php
require_once 'server_php/utils/email_utils.php';

$testEmail = 'webnexfusion@gmail.com'; // Testing with your own email
$testName = 'Debug Test';

echo "Attempting to send debug email to $testEmail...\n";

if (sendAutoReply($testEmail, $testName)) {
    echo "SUCCESS: Email sent successfully!\n";
} else {
    echo "FAILURE: Email sending failed. Checking logs...\n";
    $logFile = 'server_php/utils/email_debug.log';
    if (file_exists($logFile)) {
        echo "LOG CONTENT:\n" . file_get_contents($logFile) . "\n";
    } else {
        echo "No debug log file found.\n";
    }
}
?>
