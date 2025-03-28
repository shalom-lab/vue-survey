<template>
  <div class="footer-container">
    <p>{{ $t('footer.copyright', { year: new Date().getFullYear() }) }}</p>
  </div>
</template>

<script setup>
// 无需额外逻辑
</script>

<style scoped>
.footer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
  color: #666;
  font-size: 14px;
}
</style> 