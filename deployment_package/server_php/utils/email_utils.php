<?php
// server_php/utils/email_utils.php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require_once __DIR__ . '/PHPMailer/Exception.php';
require_once __DIR__ . '/PHPMailer/PHPMailer.php';
require_once __DIR__ . '/PHPMailer/SMTP.php';
require_once __DIR__ . '/../config/env.php';

/**
 * Send a professional auto-reply email to the client using PHPMailer SMTP
 */
function sendAutoReply($toEmail, $clientName) {
    if (empty($toEmail)) return false;

    $mail = new PHPMailer(true);

    try {
        // SMTP Configuration
        $mail->isSMTP();
        $mail->Host       = $_ENV['SMTP_HOST'] ?? 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = $_ENV['SMTP_USER'] ?? '';
        $mail->Password   = $_ENV['SMTP_PASS'] ?? '';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = $_ENV['SMTP_PORT'] ?? 587;

        // Recipients
        $fromEmail = $_ENV['SMTP_FROM_EMAIL'] ?? 'webnexfusion@gmail.com';
        $fromName = $_ENV['SMTP_FROM_NAME'] ?? 'WebNexFusion';
        
        $mail->setFrom($fromEmail, $fromName);
        $mail->addAddress($toEmail, $clientName);
        $mail->addReplyTo($fromEmail, $fromName);

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

/**
 * Send an OTP verification email to the user using PHPMailer SMTP
 */
function sendOtpEmail($toEmail, $otp, $name) {
    if (empty($toEmail)) return false;

    $mail = new PHPMailer(true);

    try {
        // SMTP Configuration
        $mail->isSMTP();
        $mail->Host       = $_ENV['SMTP_HOST'] ?? 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = $_ENV['SMTP_USER'] ?? '';
        $mail->Password   = $_ENV['SMTP_PASS'] ?? '';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = $_ENV['SMTP_PORT'] ?? 587;

        // Recipients
        $fromEmail = $_ENV['SMTP_FROM_EMAIL'] ?? 'webnexfusion@gmail.com';
        $fromName = $_ENV['SMTP_FROM_NAME'] ?? 'WebNexFusion';
        
        $mail->setFrom($fromEmail, $fromName);
        $mail->addAddress($toEmail, $name);
        $mail->addReplyTo($fromEmail, $fromName);

        // Content
        $mail->isHTML(true);
        $mail->Subject = "Admin Password Reset OTP - WebNexFusion";
        
        $message = "
        <html>
        <head>
            <style>
                .container { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
                .header { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 30px; text-align: center; color: white; }
                .content { padding: 40px; line-height: 1.6; color: #1e293b; background: #ffffff; text-align: center; }
                .footer { background: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
                .otp-box { font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4f46e5; background: #f1f5f9; padding: 15px; border-radius: 8px; display: inline-block; margin: 20px 0; border: 1px dashed #cbd5e1; }
                h1 { margin: 0; font-size: 24px; }
                p { margin-bottom: 16px; font-size: 16px; color: #334155; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>WebNexFusion</h1>
                </div>
                <div class='content'>
                    <p>Dear <strong>{$name}</strong>,</p>
                    <p>You requested an OTP to reset your password. Use the following code to complete the verification process:</p>
                    <div class='otp-box'>{$otp}</div>
                    <p>This code is valid for 10 minutes. If you did not make this request, please ignore this email.</p>
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
        $mail->AltBody = "Dear {$name},\n\nYou requested an OTP to reset your password. Use the following code to complete the verification process: {$otp}\n\nThis code is valid for 10 minutes.\n\nBest Regards,\nTeam WebNexFusion";

        $result = $mail->send();
        return $result;
    } catch (Exception $e) {
        $errorMsg = "[" . date("Y-m-d H:i:s") . "] Mailer Error: {$mail->ErrorInfo} | Exception: " . $e->getMessage() . "\n";
        file_put_contents(__DIR__ . '/email_debug.log', $errorMsg, FILE_APPEND);
        return false;
    }
}
?>
