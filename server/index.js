const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// 中间件
app.use(cors()); // 允许前端跨域访问
app.use(bodyParser.json());

// 数据库连接配置
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // 你的 MySQL 用户名
    password: '123456', // 你的 MySQL 密码 (记得修改这里！)
    database: 'my_blog_db'
});

db.connect(err => {
    if (err) {
        console.error('数据库连接失败:', err);
        return;
    }
    console.log('MySQL 数据库已连接');
});

// --- API 接口 ---

// 1. 获取所有文章
app.get('/api/articles', (req, res) => {
    const sql = 'SELECT * FROM articles ORDER BY created_at DESC';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// 2. 获取所有留言
app.get('/api/comments', (req, res) => {
    const sql = 'SELECT * FROM comments ORDER BY created_at DESC';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// 3. 发布新留言
app.post('/api/comments', (req, res) => {
    const { nickname, email, content } = req.body;
    const sql = 'INSERT INTO comments (nickname, email, content) VALUES (?, ?, ?)';
    db.query(sql, [nickname, email, content], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: '留言成功', id: result.insertId });
    });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`后端服务器运行在 http://localhost:${PORT}`);
});
