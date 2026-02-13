const db = require('../db');

const trackVisitor = async (req, res, next) => {
    // Only track GET requests to the main site, or specifically marked routes
    // For simplicity, we'll track all requests to /api/blogs (public content) as a proxy for site visits
    // Or ideally, the frontend should call a /api/visit endpoint on initial load.
    // Let's assume the frontend will call /api/analytics/visit

    // We can also just track here if we want.
    next();
};

const recordVisit = async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    try {
        // Simple check to avoid spamming: check if IP visited in last 15 mins?
        // For now, just insert.
        await db.query('INSERT INTO visitors (ip_address) VALUES ($1)', [ip]);
        res.status(200).json({ message: 'Visit recorded' });
    } catch (error) {
        console.error('Error recording visit:', error);
        res.status(500).json({ error: 'Failed to record visit' });
    }
};

module.exports = { trackVisitor, recordVisit };
