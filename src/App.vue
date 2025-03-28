<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <div class="app-container" :class="{ 'dark-mode': isDarkMode }">
              <app-layout />
            </div>
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup>
import AppLayout from './components/common/AppLayout.vue'
import { useAppStore } from './stores/app'
import { darkTheme } from 'naive-ui'
import { computed } from 'vue'

const appStore = useAppStore()

// 简化主题逻辑，直接使用 naive-ui 内置的 darkTheme
const theme = computed(() => appStore.theme === 'dark' ? darkTheme : null)
const isDarkMode = computed(() => appStore.theme === 'dark')

// 修改主题覆盖，为暗色模式增加配置
const themeOverrides = computed(() => {
  // 基础配置
  const baseOverrides = {
    common: {
      primaryColor: '#1890ff',
      primaryColorHover: '#40a9ff',
      primaryColorPressed: '#096dd9',
      primaryColorSuppl: '#1890ff',
      infoColor: '#1890ff'
    }
  }
  
  // 如果是暗色模式，添加额外覆盖
  if (appStore.theme === 'dark') {
    return {
      ...baseOverrides,
      common: {
        ...baseOverrides.common,
        bodyColor: '#121212',
        cardColor: '#1f1f1f',
        modalColor: '#1f1f1f',
        popoverColor: '#1f1f1f'
      }
    }
  }
  
  return baseOverrides
})
</script>

<style>
/* 确保所有基础元素占满宽度 */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden; /* 防止水平滚动条 */
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f7fa;
  transition: background-color 0.3s;
  width: 100%;
  max-width: 100%; /* 确保不超过视口宽度 */
  overflow-x: hidden; /* 防止水平滚动条 */
}

.dark-mode {
  background-color: #121212;
  color: #e0e0e0;
}

/* 全局样式优化 */
body {
  margin: 0;
  padding: 0;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  line-height: 1.5;
}

/* 内容容器样式 */
.main-container {
  width: 100%;
  margin: 0 auto;
  padding: 12px 24px; /* 恢复左右内边距，但比原来小一些 */
  flex: 1;
  box-sizing: border-box; /* 确保padding不增加元素宽度 */
}

/* 卡片样式优化 */
.n-card {
  transition: all 0.3s;
  width: 100%;
  margin-bottom: 16px;
  box-sizing: border-box; /* 确保padding不增加元素宽度 */
}

.welcome-card {
  margin-bottom: 40px;
}

/* 按钮样式优化 */
.n-button {
  transition: all 0.3s;
}

/* 添加暗色模式下按钮文本颜色 */
:global(.dark-mode) .n-button {
  color: #e0e0e0;
}

:global(.dark-mode) .n-button--primary-type {
  color: #ffffff;
}

:global(.dark-mode) .n-button--default-type {
  color: #e0e0e0;
  border-color: #555;
}

:global(.dark-mode) .n-button--text {
  color: #1890ff;
}

:global(.dark-mode) .n-button--default-type:hover {
  border-color: #1890ff;
  color: #1890ff;
}

:global(.dark-mode) .n-button--text:hover {
  color: #40a9ff;
}

/* 暗色模式下按钮禁用状态 */
:global(.dark-mode) .n-button--disabled {
  color: #666 !important;
  background-color: #333 !important;
  border-color: #444 !important;
}

/* 表单样式优化 */
.n-form-item-label {
  font-weight: 500;
}

/* 输入框样式优化 */
.n-input {
  transition: all 0.3s;
}

/* 表格样式优化 */
.n-data-table-th {
  background-color: #f5f7fa;
}

.dark-mode .n-data-table-th {
  background-color: #1f1f1f;
}

/* 增强暗色模式下的全局样式 */
.dark-mode {
  background-color: #121212;
  color: #e0e0e0;
}

/* 卡片样式暗色模式优化 */
:global(.dark-mode) .n-card {
  background-color: #1f1f1f;
  color: #e0e0e0;
  border-color: #333;
}

:global(.dark-mode) .n-card-header {
  border-bottom-color: #333;
}

:global(.dark-mode) .n-card__footer {
  border-top-color: #333;
}

/* 表单元素暗色模式优化 */
:global(.dark-mode) .n-input {
  background-color: #333;
  color: #e0e0e0;
  border-color: #444;
}

:global(.dark-mode) .n-input:hover {
  border-color: #1890ff;
}

:global(.dark-mode) .n-input-wrapper {
  background-color: #333;
}

:global(.dark-mode) .n-form-item-label {
  color: #ccc;
}

/* 选择器暗色模式优化 */
:global(.dark-mode) .n-select .n-base-selection {
  background-color: #333;
  border-color: #444;
  color: #e0e0e0;
}

:global(.dark-mode) .n-select .n-base-selection:hover {
  border-color: #1890ff;
}

/* 表格暗色模式增强 */
:global(.dark-mode) .n-data-table {
  background-color: #1f1f1f;
  color: #e0e0e0;
}

:global(.dark-mode) .n-data-table-td {
  border-color: #333;
  color: #e0e0e0;
}

/* 首页特定样式优化 */
:global(.dark-mode) .hero-section {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

:global(.dark-mode) .hero-title {
  background: linear-gradient(90deg, #40a9ff, #69c0ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

:global(.dark-mode) .hero-description {
  color: #bfbfbf;
}

:global(.dark-mode) .feature-card {
  background-color: #1f1f1f;
  border-color: #333;
}

:global(.dark-mode) .features-title {
  color: #e0e0e0;
}

:global(.dark-mode) .feature-header h3 {
  color: #e0e0e0;
}

/* 其他UI元素暗色模式优化 */
:global(.dark-mode) .n-tag {
  background-color: #333;
}

:global(.dark-mode) .n-dropdown-menu {
  background-color: #1f1f1f;
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.4);
}

:global(.dark-mode) .n-dropdown-option {
  color: #e0e0e0;
}

:global(.dark-mode) .n-dropdown-option:hover {
  background-color: #333;
}

/* 确保所有图标在暗色模式下清晰可见 */
:global(.dark-mode) .n-icon {
  color: #e0e0e0;
}

/* 导航栏暗黑模式样式 */
:global(.dark-mode) .header {
  background-color: #1f1f1f;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

/* 页脚暗黑模式样式 */
:global(.dark-mode) .footer {
  background-color: #1f1f1f;
  border-top: 1px solid #333;
}

/* 英雄区域暗黑模式样式 */
:global(.dark-mode) .hero-section {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}
</style> 