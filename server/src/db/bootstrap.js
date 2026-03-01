const db = require('./index');
const bcrypt = require('bcryptjs');

const ensureSchema = async () => {
    await db.query(`
        CREATE TABLE IF NOT EXISTS blogs (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            slug VARCHAR(255) UNIQUE NOT NULL,
            description TEXT,
            content TEXT NOT NULL,
            author VARCHAR(100),
            tags TEXT[],
            image_url VARCHAR(512),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE,
            name VARCHAR(100),
            profile_pic VARCHAR(512),
            reset_otp VARCHAR(10),
            reset_otp_expiry TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS contacts (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            email VARCHAR(255),
            subject VARCHAR(255),
            message TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS visitors (
            id SERIAL PRIMARY KEY,
            ip_address VARCHAR(45) NOT NULL,
            visit_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);

    // Ensure columns exist for older users table structure.
    await db.query(`
        ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_otp VARCHAR(10);
        ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_otp_expiry TIMESTAMP;
    `);
};

const ensureAdminUser = async () => {
    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD || '12345';
    const name = process.env.ADMIN_NAME || 'Super Admin';
    const email = process.env.ADMIN_EMAIL || 'admin@example.com';

    const { rows } = await db.query('SELECT id FROM users WHERE username = $1', [username]);
    if (rows.length > 0) {
        return false;
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    await db.query(
        'INSERT INTO users (username, password_hash, name, email, profile_pic) VALUES ($1, $2, $3, $4, $5)',
        [username, hash, name, email, '']
    );
    return true;
};

const bootstrapDatabase = async () => {
    await ensureSchema();

    if (process.env.AUTO_SEED_ADMIN === 'false') {
        return { seededAdmin: false };
    }

    const seededAdmin = await ensureAdminUser();
    return { seededAdmin };
};

module.exports = {
    bootstrapDatabase,
    ensureSchema,
    ensureAdminUser,
};
