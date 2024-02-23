const { Pool } = require('pg');
const ENV = process.env.NODE_ENV || 'development';

const config = {}

if (ENV === 'production') {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
}

require('dotenv').config({
  path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.PGDATABASE && !process.env.DATABASE_UR) {
  throw new Error('PGDATABASE not set');
}

module.exports = new Pool(config);
