<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import axios from 'axios'
import { marked } from 'marked'

const post = reactive({
  title: '',
  summary: '',
  category: '',
  content: ''
})

// 默认演示内容
onMounted(() => {
  post.content = `# 欢迎使用 Markdown 编辑器

这里是**实时预览**区域。你可以尝试输入：

- **加粗文字**
- *斜体文字*
- [链接](https://github.com)

### 代码块示例：
\`\`\`javascript
console.log('Hello World');
\`\`\`
`
})

// Markdown 转 HTML
const previewHtml = computed(() => {
  return marked(post.content || '')
})

const submitPost = async () => {
  if (!post.title || !post.content) return alert('标题和内容不能为空')
  
  try {
    await axios.post('/api/articles', post)
    alert('🎉 发布成功！')
    post.title = ''
    post.summary = ''
    post.category = ''
    post.content = ''
  } catch (err) {
    alert('发布失败，请检查网络')
    console.error(err)
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-6 h-[calc(100vh-80px)] flex flex-col animate-fade-in">
    
    <!-- 顶部操作栏 -->
    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center gap-2">
        <span class="text-3xl filter drop-shadow-lg">📝</span>
        <h2 class="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 tracking-wide">
          创作中心
        </h2>
      </div>
      <button 
        @click="submitPost" 
        class="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-8 py-2.5 rounded-full font-bold transition-all shadow-lg hover:shadow-indigo-500/40 transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
      >
        <span>发布文章</span> 🚀
      </button>
    </div>

    <!-- 元数据输入区 (美化版) -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-5 mb-6">
      
      <!-- 1. 标题输入 -->
      <div class="md:col-span-8 relative group">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span class="text-2xl opacity-80 group-focus-within:opacity-100 transition-opacity">📑</span>
        </div>
        <input 
          v-model="post.title" 
          placeholder="请输入文章标题..." 
          class="modern-input pl-14 text-xl font-bold"
        >
        <!-- 底部渐变光条动画 -->
        <div class="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 group-hover:w-full group-focus-within:w-full"></div>
      </div>

      <!-- 2. 分类输入 -->
      <div class="md:col-span-4 relative group">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span class="text-xl opacity-80 group-focus-within:opacity-100 transition-opacity">🏷️</span>
        </div>
        <input 
          v-model="post.category" 
          placeholder="分类 (如: Vue)" 
          class="modern-input pl-12"
        >
        <div class="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 group-hover:w-full group-focus-within:w-full"></div>
      </div>

      <!-- 3. 摘要输入 -->
      <div class="md:col-span-12 relative group">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span class="text-xl opacity-80 group-focus-within:opacity-100 transition-opacity">💡</span>
        </div>
        <input 
          v-model="post.summary" 
          placeholder="写一段简短的摘要，一句话吸引读者..." 
          class="modern-input pl-12"
        >
        <div class="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 group-hover:w-full group-focus-within:w-full"></div>
      </div>
    </div>

    <!-- 核心编辑区 (左右分栏) -->
    <div class="flex-grow flex flex-col md:flex-row gap-4 h-full overflow-hidden border-t border-slate-700/50 pt-6">
      
      <!-- 左侧：编辑区 -->
      <div class="w-full md:w-1/2 flex flex-col h-full group">
        <div class="text-slate-400 text-sm mb-3 flex justify-between px-1">
          <span class="flex items-center gap-2"><i class="w-2 h-2 rounded-full bg-yellow-500"></i> Markdown 源码</span>
        </div>
        <textarea 
          v-model="post.content" 
          placeholder="# 开始你的创作..." 
          class="flex-grow bg-slate-800/40 border border-slate-700 rounded-xl p-5 text-slate-200 resize-none outline-none focus:border-indigo-500/50 focus:bg-slate-800/80 transition-all font-mono leading-relaxed custom-scrollbar shadow-inner"
        ></textarea>
      </div>

      <!-- 右侧：预览区 -->
      <div class="w-full md:w-1/2 flex flex-col h-full">
        <div class="text-slate-400 text-sm mb-3 flex justify-between px-1">
          <span class="flex items-center gap-2"><i class="w-2 h-2 rounded-full bg-green-500"></i> 实时预览</span>
        </div>
        <div 
          class="flex-grow bg-slate-900 border border-slate-800 rounded-xl p-8 overflow-y-auto markdown-body custom-scrollbar shadow-xl"
          v-html="previewHtml"
        ></div>
      </div>
    </div>

  </div>
</template>

<style>
/* 新版输入框样式 
  去掉默认边框，改用背景色和底部动画
*/
.modern-input {
  width: 100%;
  height: 3.5rem; /* h-14 */
  background-color: rgba(30, 41, 59, 0.5); /* bg-slate-800/50 */
  color: white;
  border-radius: 0.5rem; /* rounded-lg */
  /* border: 1px solid rgba(51, 65, 85, 0.5); border-slate-700/50 */
  border: none; /* 移除边框，靠底部光条提升质感 */
  outline: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
}

.modern-input::placeholder {
  color: #64748b; /* slate-500 */
}

/* 悬停和聚焦时背景稍微变亮 */
.modern-input:hover,
.modern-input:focus {
  background-color: rgba(30, 41, 59, 0.8);
}

/* 自定义滚动条 */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #475569;
  border-radius: 20px;
}

/* 动画 */
.animate-fade-in {
  animation: fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); scale: 0.98; }
  to { opacity: 1; transform: translateY(0); scale: 1; }
}

/* =========================================
   Markdown 预览区样式 (保持之前的高颜值配色)
   ========================================= */
.markdown-body {
  color: #e2e8f0;
  line-height: 1.8;
}
.markdown-body h1 { font-size: 2.25em; font-weight: 800; margin-bottom: 1rem; border-bottom: 1px solid #334155; padding-bottom: 0.3em; color: white; }
.markdown-body h2 { font-size: 1.75em; font-weight: 700; margin-top: 1.5em; margin-bottom: 1rem; border-bottom: 1px solid #334155; padding-bottom: 0.3em; color: white; }
.markdown-body h3 { font-size: 1.5em; font-weight: 600; margin-top: 1.2em; margin-bottom: 0.8rem; color: #a5b4fc; }
.markdown-body p { margin-bottom: 1.2em; }
.markdown-body ul { list-style-type: disc; padding-left: 1.5em; margin-bottom: 1.2em; color: #cbd5e1; }
.markdown-body ol { list-style-type: decimal; padding-left: 1.5em; margin-bottom: 1.2em; color: #cbd5e1; }
.markdown-body li { margin-bottom: 0.3em; }
.markdown-body blockquote {
  border-left: 4px solid #6366f1;
  padding-left: 1em;
  margin: 1.5em 0;
  color: #94a3b8;
  background: rgba(99, 102, 241, 0.1);
  padding: 0.5em 1em;
  border-radius: 0 0.5rem 0.5rem 0;
}
.markdown-body pre {
  background-color: #0f172a;
  padding: 1rem;
  border-radius: 0.75rem;
  overflow-x: auto;
  margin-bottom: 1.5em;
  border: 1px solid #1e293b;
}
.markdown-body code {
  font-family: 'Fira Code', monospace;
  background-color: rgba(99, 102, 241, 0.15);
  color: #c4b5fd;
  padding: 0.2em 0.4em;
  border-radius: 0.25rem;
  font-size: 0.9em;
}
.markdown-body pre code {
  background-color: transparent;
  color: #e2e8f0;
  padding: 0;
  font-size: 0.95em;
}
.markdown-body a {
  color: #38bdf8;
  text-decoration: underline;
  text-underline-offset: 4px;
}
.markdown-body img {
  max-width: 100%;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
  margin: 1.5em 0;
}
</style>