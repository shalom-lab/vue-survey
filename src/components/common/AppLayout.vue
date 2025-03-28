<template>
  <div class="app-layout">
    <header-nav />
    <main class="main-container">
      <router-view />
    </main>
    <app-footer />
  </div>
</template>

<script setup>
import HeaderNav from './HeaderNav.vue'
import AppFooter from './AppFooter.vue'
</script>

<style lang="scss" scoped>
// 布局变量
$container-max-width: 1600px;
$container-padding: 24px;
$main-padding: 12px;

.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  overflow-y: auto;

  :deep(.header-container),
  :deep(.footer-content),
  .main-container {
    width: 100%;
    max-width: $container-max-width;
    margin: 0 auto;
    margin-top: 20px;
    padding: 0 $container-padding;
    box-sizing: border-box;
  }
}

.main-container {
  flex: 1;
  padding-top: $main-padding;
  padding-bottom: $main-padding;
}

/* 页面过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 