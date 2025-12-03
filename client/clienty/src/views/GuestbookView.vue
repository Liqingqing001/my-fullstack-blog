<script setup>
import { ref, onMounted, reactive, computed } from 'vue'
import axios from 'axios'

const comments = ref([])
const isLoading = ref(false)

const form = reactive({
  nickname: '',
  email: '',
  content: ''
})

// 根据昵称生成随机头像 URL
const getAvatar = (name) => {
  const seed = name || 'guest'
  return `https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9`
}

// 获取留言
const fetchComments = async () => {
  try {
    isLoading.value = true
    // 这里使用相对路径，Nginx 会自动代理
    const res = await axios.get('/api/comments')
    comments.value = res.data
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

// 提交留言
const submitComment = async () => {
  if(!form.nickname || !form.content) return alert('请填写昵称和内容')
  
  try {
    // 简单的防抖，防止重复点击
    isLoading.value = true
    await axios.post('/api/comments', form)
    
    // 清空表单
    form.nickname = ''
    form.email = ''
    form.content = ''
    
    // 重新获取列表
    await fetchComments()
    alert('🎉 留言成功！')
  } catch (err) {
    alert('提交失败，请检查网络')
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchComments)
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 animate-fade-in">
    
    <!-- 顶部标题区 -->
    <div class="text-center mb-10">
      <h2 class="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-4">
        访客留言板
      </h2>
      <p class="text-slate-400">留下你的足迹，分享你的想法 👋</p>
    </div>

    <!-- 1. 留言输入卡片 -->
    <div class="glass-card p-6 md:p-8 rounded-2xl mb-12 relative overflow-hidden">
      <!-- 装饰背景 -->
      <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <!-- 昵称输入 -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-slate-300 ml-1">昵称 <span class="text-red-400">*</span></label>
          <input 
            v-model="form.nickname" 
            type="text" 
            placeholder="怎么称呼你？" 
            class="custom-input"
          >
        </div>
        <!-- 邮箱输入 -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-slate-300 ml-1">邮箱 <span class="text-slate-500 text-xs">(保密)</span></label>
          <input 
            v-model="form.email" 
            type="email" 
            placeholder="user@example.com" 
            class="custom-input"
          >
        </div>
      </div>

      <!-- 内容输入 -->
      <div class="space-y-2 mb-6">
        <label class="text-sm font-medium text-slate-300 ml-1">留言内容 <span class="text-red-400">*</span></label>
        <textarea 
          v-model="form.content" 
          rows="4" 
          placeholder="写下你想对博主说的话..." 
          class="custom-input resize-none py-3"
        ></textarea>
      </div>

      <!-- 发送按钮 -->
      <div class="flex justify-end">
        <button 
          @click="submitComment" 
          :disabled="isLoading"
          class="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-600/30 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="isLoading">发送中...</span>
          <span v-else>🚀 发送留言</span>
        </button>
      </div>
    </div>

    <!-- 2. 留言列表展示区 -->
    <div class="space-y-6">
      <div class="flex items-center gap-2 mb-6">
        <div class="w-1 h-6 bg-indigo-500 rounded-full"></div>
        <h3 class="text-xl font-bold text-white">最新留言 ({{ comments.length }})</h3>
      </div>

      <!-- 空状态 -->
      <div v-if="comments.length === 0 && !isLoading" class="text-center py-10 opacity-60">
        <div class="text-6xl mb-4">💬</div>
        <p class="text-slate-400">还没有人留言，快来抢沙发！</p>
      </div>

      <!-- 留言卡片循环 -->
      <transition-group name="list">
        <div 
          v-for="item in comments" 
          :key="item.id" 
          class="bg-slate-800/50 border border-slate-700/50 p-5 rounded-xl hover:bg-slate-800 transition-colors flex gap-4 group"
        >
          <!-- 头像 -->
          <div class="flex-shrink-0">
            <img 
              :src="getAvatar(item.nickname)" 
              alt="Avatar" 
              class="w-12 h-12 rounded-full bg-slate-700 border-2 border-slate-600 group-hover:border-indigo-500 transition-colors"
            >
          </div>
          
          <!-- 内容 -->
          <div class="flex-grow">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <span class="font-bold text-indigo-300 text-lg">{{ item.nickname }}</span>
              <span class="text-xs text-slate-500 font-mono">
                {{ new Date(item.created_at).toLocaleString() }}
              </span>
            </div>
            <p class="text-slate-200 leading-relaxed whitespace-pre-wrap">{{ item.content }}</p>
          </div>
        </div>
      </transition-group>
    </div>

    <!-- 底部留白 -->
    <div class="h-20"></div>
  </div>
</template>

<style scoped>
/* 磨砂玻璃卡片效果 */
.glass-card {
  background: rgba(30, 41, 59, 0.6); /* slate-800 at 60% */
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

/* 自定义输入框样式 - 解决你说的“白色文字”问题 */
.custom-input {
  width: 100%;
  background-color: #0f172a; /* slate-900 (更深) */
  color: #f1f5f9;            /* slate-100 (亮白文字) */
  border: 1px solid #334155; /* slate-700 */
  border-radius: 0.75rem;    /* rounded-xl */
  padding: 0.75rem 1rem;
  outline: none;
  transition: all 0.3s ease;
}

/* 占位符颜色 (Placeholder) */
.custom-input::placeholder {
  color: #64748b; /* slate-500 */
}

/* 聚焦时的效果 (Focus) */
.custom-input:focus {
  border-color: #6366f1; /* indigo-500 */
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2); /* 紫色光晕 */
  background-color: #1e293b; /* slate-800 (稍微变亮一点) */
}

/* 简单的进入动画 */
.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 列表项动画 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>