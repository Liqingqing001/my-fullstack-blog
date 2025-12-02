<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const articles = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/articles')
    articles.value = res.data
  } catch (err) {
    console.error(err)
  }
})
</script>

<template>
  <div class="page-container">
    <h2 class="text-3xl font-bold text-white mb-8 border-l-4 border-indigo-500 pl-4">我的随笔</h2>
    
    <div class="grid gap-6">
      <div v-for="item in articles" :key="item.id" class="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-indigo-500 transition-colors">
        <div class="flex justify-between items-start">
          <h3 class="text-2xl font-bold text-white mb-2">{{ item.title }}</h3>
          <span class="text-xs bg-indigo-900 text-indigo-300 px-2 py-1 rounded">{{ item.category }}</span>
        </div>
        <p class="text-slate-400 mt-2 line-clamp-3">{{ item.summary }}</p>
        <p class="text-slate-500 text-sm mt-4">发布时间: {{ new Date(item.created_at).toLocaleDateString() }}</p>
      </div>
      
      <p v-if="articles.length === 0" class="text-slate-500 text-center py-10">
        数据库里暂时没有文章，快去 MySQL 插入几条数据吧！
      </p>
    </div>
  </div>
</template>