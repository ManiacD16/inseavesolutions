const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const rootDir = path.resolve(__dirname, '../../');
const envFileName =
    process.env.ENV_FILE ||
    (process.env.NODE_ENV === 'production' ? '.env.production' : '.env');

const envPath = path.resolve(rootDir, envFileName);
const fallbackPath = path.resolve(rootDir, '.env');
const loadPath = fs.existsSync(envPath) ? envPath : fallbackPath;

dotenv.config({ path: loadPath });

module.exports = {
    envFileName: path.basename(loadPath),
    envPath: loadPath,
};
