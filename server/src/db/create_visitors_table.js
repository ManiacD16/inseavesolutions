const db = require('./index');

const createTable = async () => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS visitors (
                id SERIAL PRIMARY KEY, 
                ip_address VARCHAR(45) NOT NULL, 
                visit_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("Visitors table created successfully");
    } catch (err) {
        console.error("Error creating table:", err);
    }
};

createTable();
