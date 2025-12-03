const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// 中间件
app.use(cors()); // 允许前端跨域访问
app.use(bodyParser.json());


// 【关键配置】告诉 Express 它躲在 Nginx 后面，请信任 Nginx 传过来的 IP
app.set('trust proxy', true);


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

app.use((req, res, next) => {
    // 1. 过滤掉静态资源请求 (不想记录 css/js/图片 的请求，太乱了)
    if (req.url.includes('.')) {
        return next(); 
    }

    // 2. 获取 IP (兼容 Nginx)
    const ip = req.headers['x-forwarded-for'] || req.ip;
    
    // 3. 获取设备信息
    const userAgent = req.headers['user-agent'];

    // 4. 存入数据库
    const sql = 'INSERT INTO visit_logs (ip_address, device_info, page_url) VALUES (?, ?, ?)';
    
    db.query(sql, [ip, userAgent, req.url], (err, result) => {
        if (err) {
            // 【新增】如果出错，打印红色错误
            console.error('❌ 插入访客记录失败:', err.message); 
        } else {
            // 【新增】如果成功，打印绿色日志
            console.log('✅ 成功记录一个访客! ID:', result.insertId); 
        }
    });

    next();
});


// --- API 接口 ---

// 1. 获取所有文章 (列表)
app.get('/api/articles', (req, res) => {
    // 列表页只需要 ID, 标题, 摘要, 时间，不需要把几万字的内容都查出来，浪费流量
    const sql = 'SELECT id, title, summary, category, created_at FROM articles ORDER BY created_at DESC';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// 2. 获取单篇文章详情 (包含 content)
app.get('/api/articles/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM articles WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).send('文章未找到');
        res.json(results[0]);
    });
});

// 3. 发布新文章 (已移除密码校验)
app.post('/api/articles', (req, res) => {
    // 移除 password 字段
    const { title, summary, content, category } = req.body;

    // 直接写入数据库，不再检查密码
    const sql = 'INSERT INTO articles (title, summary, content, category) VALUES (?, ?, ?, ?)';
    db.query(sql, [title, summary, content, category], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        res.json({ message: '发布成功', id: result.insertId });
    });
});
// --- 留言板相关接口 ---
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
