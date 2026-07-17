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
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS uber_eats_orders (
        id                INT AUTO_INCREMENT PRIMARY KEY,
        merchant_trade_no VARCHAR(20) UNIQUE NOT NULL,
        buyer_name        VARCHAR(255) NOT NULL,
        buyer_email       VARCHAR(255) NOT NULL,
        buyer_phone       VARCHAR(50) NULL,
        amount            INT NOT NULL,
        status            ENUM('pending','paid','failed') NOT NULL DEFAULT 'pending',
        pdf_sent          TINYINT(1) NOT NULL DEFAULT 0,
        ecpay_trade_no    VARCHAR(30) NULL,
        raw_notify_json   JSON NULL,
        created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        paid_at           TIMESTAMP NULL
      )
    `);
    initialized = true;
  }
  return pool;
}
