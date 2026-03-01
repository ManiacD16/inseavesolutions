const { Pool } = require('pg');
require('../config/env');

const useConnectionString = Boolean(process.env.DATABASE_URL);

const poolConfig = useConnectionString
    ? {
          connectionString: process.env.DATABASE_URL,
          ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
      }
    : {
          user: process.env.DB_USER,
          host: process.env.DB_HOST,
          database: process.env.DB_NAME,
          password: process.env.DB_PASSWORD,
          port: Number(process.env.DB_PORT || 5432),
      };

const pool = new Pool(poolConfig);

pool.on('error', (error) => {
    console.error('Unexpected PostgreSQL pool error:', error);
});

const testConnection = async () => {
    await pool.query('SELECT 1');
};

module.exports = {
    query: (text, params) => pool.query(text, params),
    testConnection,
};
