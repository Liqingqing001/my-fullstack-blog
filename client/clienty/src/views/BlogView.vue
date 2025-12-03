<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router' // 1. 引入 router

const router = useRouter()
const articles = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('/api/articles')
    articles.value = res.data
  } catch (err) {
    console.error(err)
  }
})

// 2. 跳转函数
const goToDetail = (id) => {
  router.push(`/article/${id}`)
}
</script>

<template>
  <div class="page-container">
    <div class="flex justify-between items-center mb-8 border-l-4 border-indigo-500 pl-4">
      <h2 class="text-3xl font-bold text-white">我的随笔</h2>
    </div>
    
    <div class="grid gap-6">
      <!-- 3. 在 div 上添加点击事件 @click -->
      <div 
        v-for="item in articles" 
        :key="item.id" 
        @click="goToDetail(item.id)"
        class="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-indigo-500 transition-colors cursor-pointer group hover:shadow-lg hover:shadow-indigo-500/10"
      >
        <div class="flex justify-between items-start">
          <h3 class="text-2xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
            {{ item.title }}
          </h3>
          <span class="text-xs bg-indigo-900 text-indigo-300 px-2 py-1 rounded">{{ item.category }}</span>
        </div>
        <p class="text-slate-400 mt-2 line-clamp-3">{{ item.summary }}</p>
        <p class="text-slate-500 text-sm mt-4">发布时间: {{ new Date(item.created_at).toLocaleDateString() }}</p>
      </div>
      
      <p v-if="articles.length === 0" class="text-slate-500 text-center py-10">
        数据库里暂时没有文章，请访问 /write 页面进行发布。
      </p>
    </div>
  </div>
</template>