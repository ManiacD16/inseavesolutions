const db = require('./index');

const updateTable = async () => {
    try {
        await db.query(`
            ALTER TABLE users 
            ADD COLUMN IF NOT EXISTS reset_otp VARCHAR(6),
            ADD COLUMN IF NOT EXISTS reset_otp_expiry TIMESTAMP;
        `);
        console.log("Users table updated successfully with OTP columns");
    } catch (err) {
        console.error("Error updating table:", err);
    }
};

updateTable();
