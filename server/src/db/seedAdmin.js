const db = require('./index');
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
    try {
        const { rows } = await db.query('SELECT * FROM users WHERE username = $1', ['admin']);
        if (rows.length > 0) {
            console.log('Admin user already exists');
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash('admin123', salt);

        await db.query(
            'INSERT INTO users (username, password_hash, name, email, profile_pic) VALUES ($1, $2, $3, $4, $5)',
            ['admin', hash, 'Super Admin', 'admin@example.com', '']
        );

        console.log('Admin user created successfully');
        console.log('Username: admin');
        console.log('Password: admin123');
    } catch (error) {
        console.error('Error seeding admin:', error);
    }
};

seedAdmin();
