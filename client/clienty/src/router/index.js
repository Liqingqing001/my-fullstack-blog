import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlogView from '../views/BlogView.vue'
import GuestbookView from '../views/GuestbookView.vue'
import ArticleEditor from '../views/ArticleEditor.vue' // 引入编辑器
import ArticleDetail from '../views/ArticleDetail.vue' // 引入详情页

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/blog', name: 'blog', component: BlogView },
    { path: '/guestbook', name: 'guestbook', component: GuestbookView },
    // 【新增】写文章页面
    { path: '/write', name: 'write', component: ArticleEditor },
    
    // 【新增】文章详情页 (:id 是动态参数)
    { path: '/article/:id', name: 'article', component: ArticleDetail }
  ]
})

// ===============================================
// 【新增】路由切换监听：每次换页都告诉百度统计
// ===============================================
router.afterEach((to, from) => {
  // 确认百度统计代码已经加载了
  if (window._hmt) {
    // 发送一个新的页面浏览记录 (PV)
    window._hmt.push(['_trackPageview', to.fullPath]);
  }
})

export default router
 

 