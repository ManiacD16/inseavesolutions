const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const { envFileName } = require('./config/env');
const db = require('./db');
const { bootstrapDatabase } = require('./db/bootstrap');
const { getDbErrorResponse } = require('./utils/dbError');

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
    origin: [
        'https://webnexfusion.com',
        'http://webnexfusion.com',
        'http://localhost:5173',
        'http://localhost:3000'
    ],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

// Track visitors on the main route (or you can apply it globally if preferred)
const { trackVisitor } = require('./middleware/trackVisitor');
app.use(trackVisitor);

// Basic route
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await db.testConnection();
    } catch (error) {
        const response = getDbErrorResponse(error);
        console.error(`Database startup check failed: ${response.error}`);
        process.exit(1);
    }

    if (process.env.AUTO_DB_BOOTSTRAP !== 'false') {
        try {
            const { seededAdmin } = await bootstrapDatabase();
            if (seededAdmin) {
                console.log('Admin user created from environment defaults.');
            }
        } catch (error) {
            const response = getDbErrorResponse(error);
            console.error(`Database bootstrap failed: ${response.error}`);
            process.exit(1);
        }
    }

    app.listen(PORT, () => {
        console.log(`Using env file: ${envFileName}`);
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();
