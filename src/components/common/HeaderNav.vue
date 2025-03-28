<template>
  <header class="header" :class="{ 'header--dark': isDarkMode }">
    <div class="header-container">
      <div class="logo">
        <router-link to="/">
          <n-icon size="32" color="#1890ff" class="logo-image">
            <logo-icon />
          </n-icon>
          <span class="logo-text">{{ $t('app.shortTitle') }}</span>
        </router-link>
      </div>
      
      <nav class="nav">
        <router-link to="/" class="nav-item" :class="{ 'nav-item--dark': isDarkMode }">
          {{ $t('nav.home') }}
        </router-link>
        <router-link to="/submit" class="nav-item" :class="{ 'nav-item--dark': isDarkMode }">
          {{ $t('nav.entry') }}
        </router-link>
        <router-link to="/data" class="nav-item" :class="{ 'nav-item--dark': isDarkMode }">
          {{ $t('nav.data') }}
        </router-link>
        <router-link to="/setting" class="nav-item" :class="{ 'nav-item--dark': isDarkMode }">
          {{ $t('nav.settings') }}
        </router-link>
      </nav>
      
      <div class="actions">
        <n-button-group>
          <n-button quaternary @click="toggleTheme">
            <template #icon>
              <n-icon>
                <sunny-outline v-if="isDarkMode" />
                <moon-outline v-else />
              </n-icon>
            </template>
          </n-button>
          
          <n-button quaternary @click="toggleLanguage">
            <template #icon>
              <n-icon>
                <language-outline />
              </n-icon>
            </template>
            {{ locale === 'zh-CN' ? 'EN' : '中' }}
          </n-button>
        </n-button-group>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { NButton, NButtonGroup, NIcon } from 'naive-ui'
import { useAppStore } from '../../stores/app'
import { SunnyOutline, MoonOutline, LanguageOutline } from '@vicons/ionicons5'
import LogoIcon from '../icons/LogoIcon.vue'

const { locale, t } = useI18n()
const appStore = useAppStore()
const isDarkMode = computed(() => appStore.theme === 'dark')

// 切换语言
const toggleLanguage = () => {
  locale.value = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
}

// 切换主题
const toggleTheme = () => {
  appStore.toggleTheme()
}
</script>

<style lang="scss" scoped>
// 变量定义
$header-height: 64px;
$header-bg: #fff;
$header-shadow: rgba(0, 0, 0, 0.08);
$header-dark-bg: #1f1f1f;
$header-dark-shadow: rgba(0, 0, 0, 0.2);
$primary-color: #1890ff;
$text-color: #606266;
$text-color-dark: #a6a6a6;
$logo-font-size: 20px;
$nav-gap: 24px;
$nav-item-padding: 8px;

.header {
  background-color: $header-bg;
  box-shadow: 0 2px 8px $header-shadow;
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all 0.3s;
  flex-shrink: 0;
  width: 100%;

  &--dark {
    background-color: $header-dark-bg;
    box-shadow: 0 2px 8px $header-dark-shadow;
  }
}

.header-container {
  height: $header-height;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: $primary-color;
    font-weight: bold;
  }

  &-image {
    margin-right: 8px;
  }

  &-text {
    font-size: $logo-font-size;
  }
}

.nav {
  display: flex;
  gap: $nav-gap;

  &-item {
    color: $text-color;
    text-decoration: none;
    padding: $nav-item-padding 0;
    position: relative;
    transition: all 0.3s;

    &--dark {
      color: $text-color-dark;
    }

    &:hover,
    &.router-link-active {
      color: $primary-color;
    }

    &.router-link-active {
      font-weight: 500;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: $primary-color;
      }
    }
  }
}

.actions {
  display: flex;
  align-items: center;
}
</style> 