import { createI18n } from 'vue-i18n'
import zhCN from './zh-CN'
import enUS from './en-US'

// 创建 i18n 实例
const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: 'zh-CN', // 设置默认语言
  fallbackLocale: 'en-US', // 设置备用语言
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  }
})

export default i18n 