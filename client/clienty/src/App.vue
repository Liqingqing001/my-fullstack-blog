<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-slate-900 text-slate-200 font-sans flex flex-col">
    
    <!-- ================= 顶部导航栏 ================= -->
    <nav class="sticky top-0 z-50 bg-slate-900/95 backdrop-blur border-b border-slate-700 shadow-lg">
      <div class="max-w-6xl mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          
          <!-- 左侧 Logo (点击回主页) -->
          <div class="flex items-center gap-2 cursor-pointer" @click="$router.push('/')">
            <span class="text-2xl">⚡</span>
            <span class="text-xl font-bold text-white tracking-wider">
              MY<span class="text-indigo-500">BLOG</span>
            </span>
          </div>

          <!-- 右侧 导航菜单 -->
          <div class="flex space-x-4">
            <!-- 
              RouterLink 是 Vue 的跳转标签
              active-class="active-link" 表示：如果当前在那个页面，就应用这个样式
            -->
            <RouterLink to="/" class="nav-item" active-class="active-link">
              个人主页
            </RouterLink>
            
            <RouterLink to="/blog" class="nav-item" active-class="active-link">
              我的文章
            </RouterLink>
            
            <RouterLink to="/guestbook" class="nav-item" active-class="active-link">
              访客留言
            </RouterLink>
          </div>

        </div>
      </div>
    </nav>

    <!-- ================= 页面内容显示区 ================= -->
    <!-- flex-grow 让它自动撑开高度，把 footer 挤到底部 -->
    <main class="flex-grow max-w-6xl w-full mx-auto px-4 py-8 relative">
      <!-- 
        RouterView 是一个占位符。
        当你点击"文章"时，这里就会显示 BlogView 组件的内容。
      -->
      <RouterView v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>

    <!-- ================= 底部版权 ================= -->
    <footer class="border-t border-slate-800 py-8 text-center text-slate-500 bg-slate-950">
      <p>&copy; 2025 Powered by Vue 3 & Node.js</p>
    </footer>

  </div>
</template>

<style scoped>
/* 导航按钮默认样式 */
.nav-item {
  padding: 8px 16px;
  border-radius: 99px; /* 圆角 */
  color: #94a3b8;      /* 灰色文字 */
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

/* 鼠标悬停样式 */
.nav-item:hover {
  background-color: #1e293b; /* 深灰色背景 */
  color: white;
}

/* 选中状态样式 (紫色高亮) */
.active-link {
  background-color: #4f46e5; /* 靛蓝色 */
  color: white;
  box-shadow: 0 0 15px rgba(79, 70, 229, 0.4); /* 发光效果 */
}

/* 页面切换动画 (淡入淡出) */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px); /* 稍微有点位移 */
}
</style>