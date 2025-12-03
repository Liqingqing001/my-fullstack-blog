import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 【新增】本地开发服务器配置
  server: {
    proxy: {
      // 告诉 Vite：所有以 /api 开头的请求，都转发给本地后端
      '/api': {
        target: 'http://localhost:3000', // 本地后端的地址
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '') // 如果你后端接口没写 /api 前缀才需要这行，你写了就不需要
      }
    }
  }
})