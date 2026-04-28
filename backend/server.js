const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// 建立資料庫連線池
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 測試連線
db.getConnection((err, conn) => {
    if (err) {
        console.error('資料庫連線失敗:', err.message);
    } else {
        console.log('成功連線至遠端 Vultr 資料庫');
        conn.release();
    }
});

// --- 註冊 API ---
app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        // 加密密碼
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
        
        db.query(sql, [email, hashedPassword], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(400).json({ error: "Email 可能已被註冊" });
            }
            res.status(201).json({ message: "註冊成功，帳號已建立" });
        });
    } catch (e) {
        res.status(500).json({ error: "伺服器內部錯誤" });
    }
});

// --- 登入 API ---
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ?";
    
    db.query(sql, [email], async (err, results) => {
        if (err || results.length === 0) return res.status(400).json({ error: "使用者不存在" });
        
        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) return res.status(400).json({ error: "密碼錯誤" });

        // 核發 JWT 令牌
        const token = jwt.sign(
            { id: user.id, email: user.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );

        res.json({ 
            token, 
            user: { email: user.email, tokens: user.token_balance } 
        });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`後端伺服器運行中，埠口：${PORT}`));