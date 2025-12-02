⚡ My Fullstack Blog (个人全栈博客系统)一个基于 Vue 3 + Node.js + MySQL 从零开发的个人博客系统。(建议：项目做完后，截图你自己的网页替换上面这个链接)🛠 技术栈 (Tech Stack)前端 (Frontend)Framework: Vue 3 (Composition API)Build Tool: ViteRouting: Vue Router 4Styling: Tailwind CSSHTTP Client: Axios后端 (Backend)Runtime: Node.jsFramework: Express.jsDatabase: MySQL 5.7/8.0Driver: mysql2🚀 功能特性 (Features)📱 响应式设计：完美适配 PC 和移动端，采用深色模式 (Dark Theme)。🧭 SPA 单页应用：无刷新跳转，极速体验。📝 文章展示：从数据库动态读取文章列表。💬 留言板互动：访客可以提交留言，数据实时写入数据库。🛡️ RESTful API：标准的前后端分离架构。💻 本地运行指南 (How to Run)如果你想在本地运行这个项目，请按照以下步骤操作：1. 克隆项目git clone [https://github.com/Liqingqing001/my-fullstack-blog.git](https://github.com/Liqingqing001/my-fullstack-blog.git)
cd my-fullstack-blog
2. 数据库设置 (Database Setup)确保本地安装了 MySQL，创建一个名为 my_blog_db 的数据库，并执行以下 SQL：CREATE DATABASE my_blog_db;
USE my_blog_db;

-- 文章表
CREATE TABLE articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    summary TEXT,
    content LONGTEXT,
    category VARCHAR(50),
    cover_image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 留言表
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nickname VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 插入测试数据
INSERT INTO articles (title, summary, content, category) 
VALUES ('我的第一篇博客', 'Vue3真好用', '这是内容...', '技术');
3. 启动后端 (Backend)cd server
npm install
# 【重要】请在 server/index.js 中修改你的数据库密码
npm start
# 服务器将运行在 http://localhost:3000
4. 启动前端 (Frontend)新建一个终端窗口：cd client
npm install
npm run dev
# 访问 http://localhost:5173
📂 目录结构 (Structure)my-fullstack-blog/
├── client/     # Vue 3 前端代码
├── server/     # Node.js 后端代码
└── README.md   # 项目说明书
Author: Liqingqing001