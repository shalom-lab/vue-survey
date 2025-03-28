import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import i18n from './locales'
import './assets/main.css'

// 创建 Pinia 实例并使用持久化插件
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// 创建 Vue 应用实例
const app = createApp(App)

// 首先使用 Pinia，确保 store 被初始化
app.use(pinia)
app.use(router)
app.use(i18n)

// 全局错误处理
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue 错误:', err)
  console.error('错误信息:', info)
}

// 在app.mount之前添加
document.title = 'DataFlow - 数据录入解决方案'

// 挂载应用
app.mount('#app') 