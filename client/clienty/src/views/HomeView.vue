<script setup>
// 1. 引入你的照片文件
// '@' 是一个别名，指向 'src' 文件夹
// 【重要】如果你的照片不叫 me.jpg，请修改下面这行代码的文件名！
import myProfilePhoto from '@/assets/me.jpg'
</script>

<template>
  <div class="text-center py-20 animate-fade-in">
    
    <!-- 头像区域 -->
    <div class="relative inline-block mb-8 group">
      <!-- 背景光晕效果 -->
      <div class="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-500"></div>
      
      <!-- 
        2. 使用照片 
        :src="myProfilePhoto" 表示使用我们上面引入的那个变量作为图片地址
      -->
      <img 
        :src="myProfilePhoto" 
        alt="Profile" 
        class="relative w-40 h-40 rounded-full border-4 border-slate-900 shadow-2xl mx-auto object-cover bg-slate-800 transition-transform duration-500 group-hover:scale-105"
      >
    </div>
    
    <!-- 文字介绍 -->
    <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
      你好，我是 <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">24大数据LQ</span>
    </h1>
    
    <p class="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
      欢迎来到我的数字空间！这是我使用 
      <span class="text-indigo-400 font-semibold">Vue 3</span>, 
      <span class="text-indigo-400 font-semibold">Node.js</span> 和 
      <span class="text-indigo-400 font-semibold">MySQL</span> 
      从零打造的全栈博客项目。
      我在这里记录学习历程，分享技术心得。
    </p>

    <!-- 技术栈卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto">
      <div class="tech-card group">
        <div class="text-3xl mb-3">💻</div>
        <h3 class="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition">前端技术</h3>
        <p class="text-slate-400 text-sm">Vue 3 (Composition API), Vite, Vue Router, Tailwind CSS</p>
      </div>
      
      <div class="tech-card group">
        <div class="text-3xl mb-3">🔧</div>
        <h3 class="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition">后端服务</h3>
        <p class="text-slate-400 text-sm">Node.js, Express, RESTful API 设计</p>
      </div>
      
      <div class="tech-card group">
        <div class="text-3xl mb-3">🗄️</div>
        <h3 class="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition">数据存储</h3>
        <p class="text-slate-400 text-sm">MySQL 数据库, mysql2 驱动, SQL 操作</p>
      </div>
    </div>
    
  </div>
</template>

<style scoped>
/* 简单的进入动画 */
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 技术卡片样式 */
.tech-card {
  @apply bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/20;
}
</style>