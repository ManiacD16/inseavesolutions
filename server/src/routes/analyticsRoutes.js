const express = require('express');
const router = express.Router();
const db = require('../db');
const { recordVisit } = require('../middleware/trackVisitor');

// Public endpoint to record a visit
router.post('/visit', recordVisit);

// Admin endpoint to get stats
router.get('/', async (req, res) => {
    try {
        // Get Today's count
        const todayQuery = `
            SELECT COUNT(*) 
            FROM visitors 
            WHERE visit_date::date = CURRENT_DATE
        `;

        // Get Yesterday's count
        const yesterdayQuery = `
            SELECT COUNT(*) 
            FROM visitors 
            WHERE visit_date::date = CURRENT_DATE - INTERVAL '1 day'
        `;

        // Get Last Month's count
        const monthQuery = `
            SELECT COUNT(*) 
            FROM visitors 
            WHERE visit_date >= CURRENT_DATE - INTERVAL '30 days'
        `;

        // Get All Time count
        const allTimeQuery = `SELECT COUNT(*) FROM visitors`;

        // Get Graph Data (Last 7 days)
        const graphQuery = `
            SELECT 
                TO_CHAR(visit_date, 'Mon DD') as date, 
                COUNT(*) as count 
            FROM visitors 
            WHERE visit_date >= CURRENT_DATE - INTERVAL '7 days'
            GROUP BY date, visit_date::date 
            ORDER BY visit_date::date ASC
        `;

        const [today, yesterday, month, allTime, graph] = await Promise.all([
            db.query(todayQuery),
            db.query(yesterdayQuery),
            db.query(monthQuery),
            db.query(allTimeQuery),
            db.query(graphQuery)
        ]);

        res.json({
            today: parseInt(today.rows[0].count),
            yesterday: parseInt(yesterday.rows[0].count),
            month: parseInt(month.rows[0].count),
            allTime: parseInt(allTime.rows[0].count),
            graph: graph.rows
        });
    } catch (error) {
        console.error('Error fetching analytics:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
