import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host:               process.env.DB_HOST,
  user:               process.env.DB_USER,
  password:           process.env.DB_PASS,
  database:           process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit:    10,
});

let initialized = false;

export async function getDb() {
  if (!initialized) {
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS audit_reports (
        id            INT AUTO_INCREMENT PRIMARY KEY,
        slug          VARCHAR(32) UNIQUE NOT NULL,
        business_name VARCHAR(255) NOT NULL,
        area          VARCHAR(255) NOT NULL,
        total_score   INT NOT NULL,
        scores_json   JSON NOT NULL,
        actions_json  JSON NOT NULL,
        created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS leads (
        id            INT AUTO_INCREMENT PRIMARY KEY,
        report_slug   VARCHAR(32) NOT NULL,
        email         VARCHAR(255) NOT NULL,
        phone         VARCHAR(50) NOT NULL,
        callback_time VARCHAR(50) NOT NULL,
        is_called     TINYINT(1) DEFAULT 0,
        created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    initialized = true;
  }
  return pool;
}
