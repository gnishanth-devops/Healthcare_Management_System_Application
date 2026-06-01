const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'appuser',
  password: 'apppassword',
  database: 'hospitaldb'
});

module.exports = pool;
