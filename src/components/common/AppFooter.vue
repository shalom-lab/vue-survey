<template>
  <footer class="footer" :class="{ 'footer--dark': isDarkMode }">
    <div class="footer-content">
      <div class="copyright" :class="{ 'copyright--dark': isDarkMode }">
        &copy; {{ currentYear }} DataFlow - {{ $t('app.title') }}
      </div>
      <div class="links">
        <a href="#" class="footer-link" :class="{ 'footer-link--dark': isDarkMode }">{{ $t('footer.terms') }}</a>
        <a href="#" class="footer-link" :class="{ 'footer-link--dark': isDarkMode }">{{ $t('footer.privacy') }}</a>
        <a href="#" class="footer-link" :class="{ 'footer-link--dark': isDarkMode }">{{ $t('footer.contact') }}</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '../../stores/app'

const currentYear = new Date().getFullYear()
const appStore = useAppStore()
const isDarkMode = computed(() => appStore.theme === 'dark')
</script>

<style lang="scss" scoped>
// 变量定义
$footer-bg: #f5f7fa;
$footer-border: #e5e7eb;
$footer-dark-bg: #1f1f1f;
$footer-dark-border: #333;
$text-color: #606266;
$text-color-dark: #a6a6a6;
$link-hover: #1890ff;
$link-hover-dark: #40a9ff;
$font-size-base: 14px;
$spacing: 20px;

.footer {
  background-color: $footer-bg;
  border-top: 1px solid $footer-border;
  padding: $spacing 0;
  margin-top: auto;
  transition: all 0.3s;
  flex-shrink: 0;
  width: 100%;

  &--dark {
    background-color: $footer-dark-bg;
    border-top: 1px solid $footer-dark-border;
  }
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copyright {
  color: $text-color;
  font-size: $font-size-base;
  transition: color 0.3s;

  &--dark {
    color: $text-color-dark;
  }
}

.links {
  display: flex;
  gap: $spacing;
}

.footer-link {
  color: $text-color;
  text-decoration: none;
  font-size: $font-size-base;
  transition: color 0.3s;

  &:hover {
    color: $link-hover;
  }

  &--dark {
    color: $text-color-dark;

    &:hover {
      color: $link-hover-dark;
    }
  }
}
</style> 