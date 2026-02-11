const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.log('SMTP credentials not found. Email not sent.');
        console.log(`To: ${to}, Subject: ${subject}, Text: ${text}`);
        return;
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: process.env.SMTP_PORT || 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: `"WebnexFusion Admin" <${process.env.SMTP_USER}>`,
            to,
            subject,
            text,
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;
