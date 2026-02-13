const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/emailService');

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const { rows } = await db.query('SELECT * FROM users WHERE username = $1 OR email = $1', [username]);
        const user = rows[0];

        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                name: user.name,
                profile_pic: user.profile_pic,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateProfile = async (req, res) => {
    const { name, email, profile_pic } = req.body;
    const userId = req.user.id;

    try {
        // Get current user data to check for email change
        const { rows: currentRows } = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
        const currentUser = currentRows[0];

        if (!currentUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { rows } = await db.query(
            'UPDATE users SET name = $1, email = $2, profile_pic = $3 WHERE id = $4 RETURNING id, username, email, name, profile_pic',
            [name, email, profile_pic, userId]
        );

        // Check if email has changed
        if (email && email !== currentUser.email) {
            const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

            // Notify OLD email
            await sendEmail(
                currentUser.email,
                'Security Alert: Email Address Changed',
                `Hello ${currentUser.name},\n\nYour account email address was changed to ${email} from IP: ${ip}.\n\nIf this wasn't you, please contact support immediately.`
            );

            // Notify NEW email
            await sendEmail(
                email,
                'Security Alert: Email Address Changed',
                `Hello ${name},\n\nYour account email address has been successfully updated.\n\nLogin IP: ${ip}`
            );
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    try {
        const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
        const user = rows[0];

        const validPassword = await bcrypt.compare(currentPassword, user.password_hash);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid current password' });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);

        await db.query('UPDATE users SET password_hash = $1 WHERE id = $2', [hash, userId]);

        // Send email notification
        if (user.email) {
            const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
            await sendEmail(
                user.email,
                'Security Alert: Password Changed',
                `Hello ${user.name},\n\nYour password was changed successfully from IP: ${ip}.\n\nIf this wasn't you, please contact support immediately.`
            );
        }

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const registerInitialAdmin = async (req, res) => {
    // Only allow if no users exist
    try {
        const { rows } = await db.query('SELECT COUNT(*) FROM users');
        if (parseInt(rows[0].count) > 0) {
            return res.status(403).json({ error: 'Admin already exists' });
        }

        const { username, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const { rows: newUser } = await db.query(
            'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username',
            [username, hash]
        );

        res.status(201).json(newUser[0]);
    } catch (error) {
        console.error("Register error", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    login,
    updateProfile,
    changePassword,
    registerInitialAdmin
};
