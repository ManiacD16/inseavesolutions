<?php
// server_php/utils/email_utils.php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require_once __DIR__ . '/PHPMailer/Exception.php';
require_once __DIR__ . '/PHPMailer/PHPMailer.php';
require_once __DIR__ . '/PHPMailer/SMTP.php';

/**
 * Send a professional auto-reply email to the client using PHPMailer SMTP
 */
function sendAutoReply($toEmail, $clientName) {
    if (empty($toEmail)) return false;

    $mail = new PHPMailer(true);

    try {
        // SMTP Configuration
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'webnexfusion@gmail.com';
        $mail->Password   = 'ljyk xghh pqik jghk'; // User provided App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Recipients
        $mail->setFrom('webnexfusion@gmail.com', 'WebNexFusion');
        $mail->addAddress($toEmail, $clientName);
        $mail->addReplyTo('webnexfusion@gmail.com', 'WebNexFusion');

        // Content
        $mail->isHTML(true);
        $mail->Subject = "Thank you for contacting WebNexFusion!";
        
        $message = "
        <html>
        <head>
            <style>
                .container { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
                .header { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 30px; text-align: center; color: white; }
                .content { padding: 40px; line-height: 1.6; color: #1e293b; background: #ffffff; }
                .footer { background: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
                .button { display: inline-block; padding: 12px 24px; background-color: #4f46e5; color: white !important; text-decoration: none; border-radius: 6px; font-weight: 600; margin-top: 20px; }
                h1 { margin: 0; font-size: 24px; }
                p { margin-bottom: 16px; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>WebNexFusion</h1>
                </div>
                <div class='content'>
                    <p>Dear <strong>{$clientName}</strong>,</p>
                    <p>Thank you for reaching out to WebNexFusion! We have received your message and appreciate your interest in our services.</p>
                    <p>Our team is currently reviewing your inquiry, and one of our experts will get back to you shortly (usually within 24 hours).</p>
                    <p>In the meantime, feel free to explore our portfolio or learn more about how we can help your business grow online.</p>
                    <div style='text-align: center;'>
                        <a href='https://webnexfusion.com' class='button'>Visit Our Website</a>
                    </div>
                    <p style='margin-top: 30px;'>Best Regards,<br><strong>Team WebNexFusion</strong></p>
                </div>
                <div class='footer'>
                    &copy; " . date("Y") . " WebNexFusion. All rights reserved.<br>
                    Innovative Solutions for Your Digital Success.
                </div>
            </div>
        </body>
        </html>
        ";

        $mail->Body = $message;
        $mail->AltBody = "Dear {$clientName},\n\nThank you for reaching out to WebNexFusion! We have received your message and appreciate your interest in our services. Our team will get back to you shortly.\n\nBest Regards,\nTeam WebNexFusion";

        $result = $mail->send();
        return $result;
    } catch (Exception $e) {
        // Log error to a debug file
        $errorMsg = "[" . date("Y-m-d H:i:s") . "] Mailer Error: {$mail->ErrorInfo} | Exception: " . $e->getMessage() . "\n";
        file_put_contents(__DIR__ . '/email_debug.log', $errorMsg, FILE_APPEND);
        return false;
    }
}
?>
