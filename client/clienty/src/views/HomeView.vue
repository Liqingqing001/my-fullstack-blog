<script setup>
import { ref } from 'vue'
// 1. 引入你的照片文件
// '@' 是一个别名，指向 'src' 文件夹
import myProfilePhoto from '@/assets/me.jpg'

// 2. 定义 GitHub 链接和复制状态
const githubLink = 'https://github.com/Liqingqing001'
const showCopiedTip = ref(false)

// 3. 复制功能实现 (兼容性写法)
const copyGithubLink = () => {
  // 创建一个临时的输入框来执行复制命令 (兼容 iframe 和旧浏览器)
  const textArea = document.createElement("textarea")
  textArea.value = githubLink
  
  // 确保输入框不在屏幕可视区域内
  textArea.style.position = "fixed"
  textArea.style.left = "-9999px"
  document.body.appendChild(textArea)
  
  textArea.select()
  
  try {
    document.execCommand('copy')
    // 显示"已复制"提示
    showCopiedTip.value = true
    // 2秒后隐藏提示
    setTimeout(() => {
      showCopiedTip.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败', err)
    alert('复制失败，请手动复制：' + githubLink)
  }
  
  document.body.removeChild(textArea)
}
</script>

<template>
  <div class="text-center py-20 animate-fade-in px-4">
    
    <!-- 头像区域 -->
    <div class="relative inline-block mb-8 group">
      <!-- 背景光晕效果 -->
      <div class="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-500"></div>
      
      <!-- 照片 -->
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
    
    <p class="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
      欢迎来到我的数字空间！这是我使用 
      <span class="text-indigo-400 font-semibold">Vue 3</span>, 
      <span class="text-indigo-400 font-semibold">Node.js</span> 和 
      <span class="text-indigo-400 font-semibold">MySQL</span> 
      从零打造的全栈博客项目。
      我在这里记录学习历程。
    </p>

    <!-- === 新增：社交链接区域 === -->
    <div class="flex justify-center gap-4 mb-16 relative">
      <!-- GitHub 按钮 -->
      <div class="relative group">
        <button 
          @click="copyGithubLink"
          class="flex items-center gap-2 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-full border border-slate-700 hover:border-indigo-500 transition-all shadow-lg hover:shadow-indigo-500/20 active:scale-95"
          title="点击复制 GitHub 链接"
        >
          <!-- GitHub SVG 图标 -->
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
          </svg>
          <span class="font-medium">GitHub</span>
        </button>

        <!-- 复制成功提示气泡 -->
        <transition name="pop">
          <div 
            v-if="showCopiedTip" 
            class="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white text-xs py-1 px-3 rounded shadow-lg whitespace-nowrap"
          >
            已复制到剪贴板! ✨
            <!-- 小三角 -->
            <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-indigo-600"></div>
          </div>
        </transition>
      </div>
    </div>

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

/* 气泡弹出动画 */
.pop-enter-active,
.pop-leave-active {
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translate(-50%, 10px);
}
</style>