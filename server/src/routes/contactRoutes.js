const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/authMiddleware');
const { sendDbAwareError } = require('../utils/dbError');

// Public: Submit contact form
router.post('/', async (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
        await db.query(
            'INSERT INTO contacts (name, email, subject, message) VALUES ($1, $2, $3, $4)',
            [name, email, subject, message]
        );
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        sendDbAwareError(res, 'Contact submit error', error);
    }
});

// Admin: Get all messages
router.get('/', authMiddleware, async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM contacts ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        sendDbAwareError(res, 'Fetch contacts error', error);
    }
});

module.exports = router;
