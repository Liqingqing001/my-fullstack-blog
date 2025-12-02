<script setup>
import { ref, onMounted, reactive } from 'vue'
import axios from 'axios'

const comments = ref([])
// 表单数据绑定
const form = reactive({
  nickname: '',
  email: '',
  content: ''
})

// 获取留言
const fetchComments = async () => {
  const res = await axios.get('http://localhost:3000/api/comments')
  comments.value = res.data
}

// 提交留言
const submitComment = async () => {
  if(!form.nickname || !form.content) return alert('请填写昵称和内容')
  
  try {
    await axios.post('http://localhost:3000/api/comments', form)
    alert('留言成功！')
    // 清空表单
    form.nickname = ''
    form.email = ''
    form.content = ''
    // 重新获取列表
    fetchComments()
  } catch (err) {
    alert('提交失败')
    console.error(err)
  }
}

onMounted(fetchComments)
</script>

<template>
  <div class="page-container max-w-3xl mx-auto">
    <h2 class="text-3xl font-bold text-white mb-8 text-center">访客留言板</h2>

    <!-- 留言表单 -->
    <div class="bg-slate-800 p-6 rounded-xl border border-slate-700 mb-10">
      <div class="grid grid-cols-2 gap-4 mb-4">
        <input v-model="form.nickname" placeholder="你的昵称 *" class="input-style">
        <input v-model="form.email" placeholder="邮箱 (选填)" class="input-style">
      </div>
      <textarea v-model="form.content" placeholder="写点什么吧..." rows="3" class="input-style w-full mb-4"></textarea>
      <button @click="submitComment" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-bold transition-colors">
        发送留言
      </button>
    </div>

    <!-- 留言列表 -->
    <div class="space-y-4">
      <div v-for="item in comments" :key="item.id" class="border-b border-slate-700 pb-4">
        <div class="flex justify-between mb-1">
          <span class="font-bold text-indigo-400">{{ item.nickname }}</span>
          <span class="text-xs text-slate-500">{{ new Date(item.created_at).toLocaleString() }}</span>
        </div>
        <p class="text-slate-300">{{ item.content }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-style {
  @apply bg-slate-900 border border-slate-700 rounded p-2 text-white outline-none focus:border-indigo-500;
}
</style>