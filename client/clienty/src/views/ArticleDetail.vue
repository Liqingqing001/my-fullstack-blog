<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { marked } from 'marked'

const route = useRoute()
const router = useRouter()
const article = ref(null)
const isLoading = ref(true)

const articleId = route.params.id

// 解析 Markdown 为 HTML
const contentHtml = computed(() => {
  if (!article.value || !article.value.content) return ''
  // 修正：使用 marked.parse() 以兼容最新版本，并确保换行符被渲染为 <br>
  return marked.parse(article.value.content, { breaks: true })
})

onMounted(async () => {
  try {
    isLoading.value = true
    const res = await axios.get(`/api/articles/${articleId}`)
    article.value = res.data
  } catch (err) {
    console.error(err)
    alert('文章不存在或已被删除')
    router.push('/blog')
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-10 animate-fade-in min-h-screen">
    
    <!-- 加载中 -->
    <div v-if="isLoading" class="text-center py-20">
      <div class="inline-block animate-spin text-4xl mb-4">⏳</div>
      <p class="text-slate-500">正在加载精彩内容...</p>
    </div>

    <!-- 文章主体 -->
    <div v-else-if="article">
      <!-- 顶部导航与元数据 -->
      <nav class="flex justify-between items-center mb-8 border-b border-slate-700/50 pb-6">
        <button 
          @click="$router.back()" 
          class="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
        >
          <span class="group-hover:-translate-x-1 transition-transform">←</span>
          返回列表
        </button>
        <div class="flex items-center gap-3 text-sm">
          <span class="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/20">
            {{ article.category || '未分类' }}
          </span>
          <span class="text-slate-500">{{ new Date(article.created_at).toLocaleDateString() }}</span>
        </div>
      </nav>
      
      <!-- 标题 -->
      <h1 class="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-8 leading-tight">
        {{ article.title }}
      </h1>

      <!-- 摘要引用 -->
      <div v-if="article.summary" class="bg-slate-800/50 border-l-4 border-indigo-500 p-4 rounded-r-xl mb-10 text-slate-300 italic">
        {{ article.summary }}
      </div>

      <!-- 核心内容区 (应用 markdown-body 样式类) -->
      <article class="markdown-body" v-html="contentHtml"></article>
      
      <!-- 底部版权/结束语 -->
      <div class="mt-16 pt-8 border-t border-slate-800 text-center text-slate-600 text-sm">
        ----- 本文结束 -----
      </div>
    </div>

  </div>
</template>

<style scoped>
/* 动画 */
.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* =========================================
   Markdown 阅读专用样式 (复制自编辑器，保持一致性)
   ========================================= */
.markdown-body {
  color: #e2e8f0; /* slate-200 */
  line-height: 1.8;
  font-size: 1.1rem; /* 阅读页字号稍微大一点点，更舒适 */
}

/* 使用 :deep() 穿透 scoped，确保 v-html 里的内容能吃到样式 */
.markdown-body :deep(h1) { 
  font-size: 2.25em; font-weight: 800; margin-top: 2em; margin-bottom: 1rem; 
  border-bottom: 1px solid #334155; padding-bottom: 0.3em; color: white; 
}
.markdown-body :deep(h2) { 
  font-size: 1.75em; font-weight: 700; margin-top: 1.8em; margin-bottom: 1rem; 
  border-bottom: 1px solid #334155; padding-bottom: 0.3em; color: white; 
}
.markdown-body :deep(h3) { 
  font-size: 1.5em; font-weight: 600; margin-top: 1.5em; margin-bottom: 0.8rem; color: #a5b4fc; 
}
.markdown-body :deep(p) { margin-bottom: 1.5em; text-align: justify; }
.markdown-body :deep(ul) { list-style-type: disc; padding-left: 1.5em; margin-bottom: 1.5em; color: #cbd5e1; }
.markdown-body :deep(ol) { list-style-type: decimal; padding-left: 1.5em; margin-bottom: 1.5em; color: #cbd5e1; }
.markdown-body :deep(li) { margin-bottom: 0.5em; }

.markdown-body :deep(blockquote) {
  border-left: 4px solid #6366f1;
  margin: 2em 0;
  color: #94a3b8;
  background: rgba(99, 102, 241, 0.1);
  padding: 1em;
  border-radius: 0 0.5rem 0.5rem 0;
}

.markdown-body :deep(pre) {
  background-color: #0f172a; /* slate-950 */
  padding: 1.2rem;
  border-radius: 0.75rem;
  overflow-x: auto;
  margin: 1.5em 0;
  border: 1px solid #1e293b;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.3);
}

.markdown-body :deep(code) {
  font-family: 'Consolas', 'Monaco', monospace;
  background-color: rgba(99, 102, 241, 0.15);
  color: #c4b5fd;
  padding: 0.2em 0.4em;
  border-radius: 0.25rem;
  font-size: 0.9em;
}

.markdown-body :deep(pre code) {
  background-color: transparent;
  color: #e2e8f0;
  padding: 0;
  font-size: 0.95em;
  border: none;
}

.markdown-body :deep(a) {
  color: #38bdf8;
  text-decoration: underline;
  text-underline-offset: 4px;
  transition: color 0.2s;
}
.markdown-body :deep(a:hover) { color: #7dd3fc; }

.markdown-body :deep(img) {
  max-width: 100%;
  border-radius: 0.75rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
  margin: 2em auto;
  display: block;
}

.markdown-body :deep(strong) { color: white; font-weight: 700; }
.markdown-body :deep(hr) { border-color: #334155; margin: 3em 0; }
</style>