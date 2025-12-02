⚡ My Fullstack Blog (个人全栈博客系统)一个基于 Vue 3 + Node.js + MySQL 开发的个人博客系统。实现前后端分离，具备文章展示、留言板互动等功能。(建议：项目运行起来后，截一张好看的图，替换上面这个链接)🛠 技术栈 (Tech Stack)前端 (Frontend)Vue 3: 使用 Composition API 构建逻辑。Vite: 极速的开发构建工具。Vue Router: 单页应用路由管理。Tailwind CSS: 高效的原子化 CSS 样式库。Axios: 处理 HTTP 请求。后端 (Backend)Node.js: JavaScript 运行时环境。Express: 简洁灵活的 Web 应用框架。MySQL: 关系型数据库存储文章与留言。mysql2: 高效的数据库驱动。🚀 功能特性📱 响应式设计：完美适配桌面端与移动端。🧭 SPA 单页应用：丝滑的页面切换体验，无刷新加载。📝 动态数据交互：文章与留言数据实时从数据库获取。🎨 现代化 UI：使用深色模式 (Dark Mode) 与毛玻璃特效。💻 本地运行指南 (How to run)1. 克隆项目git clone [https://github.com/你的用户名/my-fullstack-blog.git](https://github.com/你的用户名/my-fullstack-blog.git)
cd my-fullstack-blog
2. 数据库设置确保本地安装了 MySQL，并执行以下 SQL 语句：CREATE DATABASE my_blog_db;
-- (这里可以把你之前的建表语句 create table articles... 贴一部分在这里，方便别人运行)
3. 启动后端cd server
npm install
# 注意：请在 server/index.js 中修改你的数据库密码
npm start
4. 启动前端新建终端窗口：cd client
npm install
npm run dev
访问浏览器 http://localhost:5173 即可查看效果。Author: [你的名字/GitHubID]