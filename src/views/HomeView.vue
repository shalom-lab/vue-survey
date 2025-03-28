<template>
  <div class="home-container">
    <div class="hero-section" :class="{ 'hero-section--dark': isDarkMode }">
      <div class="hero-content">
        <h1 class="hero-title" :class="{ 'hero-title--dark': isDarkMode }">{{ $t('home.welcome') }}</h1>
        <p class="hero-description" :class="{ 'hero-description--dark': isDarkMode }">{{ $t('home.description') }}</p>
        <n-button type="primary" size="large" @click="goToSubmit" class="get-started-btn">
          {{ $t('home.getStarted') }}
        </n-button>
      </div>
      <div class="hero-image">
        <img src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="数据可视化" />
      </div>
    </div>
    
    <div class="features-section">
      <h2 class="features-title" :class="{ 'features-title--dark': isDarkMode }">{{ $t('home.features') }}</h2>
      
      <div class="features-grid">
        <n-card class="feature-card" :class="{ 'feature-card--dark': isDarkMode }">
          <template #header>
            <div class="feature-header">
              <n-icon size="28" :color="isDarkMode ? '#40a9ff' : '#1890ff'">
                <document-text-icon />
              </n-icon>
              <h3 :class="{ 'feature-header-title--dark': isDarkMode }">{{ $t('home.feature1') }}</h3>
            </div>
          </template>
          <p :class="{ 'feature-text--dark': isDarkMode }">轻松录入数据，系统自动验证，确保数据准确性和完整性。</p>
        </n-card>
        
        <n-card class="feature-card" :class="{ 'feature-card--dark': isDarkMode }">
          <template #header>
            <div class="feature-header">
              <n-icon size="28" :color="isDarkMode ? '#40a9ff' : '#1890ff'">
                <grid-outline-icon />
              </n-icon>
              <h3 :class="{ 'feature-header-title--dark': isDarkMode }">{{ $t('home.feature2') }}</h3>
            </div>
          </template>
          <p :class="{ 'feature-text--dark': isDarkMode }">直观的数据管理界面，支持搜索、排序和筛选，轻松找到所需信息。</p>
        </n-card>
        
        <n-card class="feature-card" :class="{ 'feature-card--dark': isDarkMode }">
          <template #header>
            <div class="feature-header">
              <n-icon size="28" :color="isDarkMode ? '#40a9ff' : '#1890ff'">
                <cloud-download-outline-icon />
              </n-icon>
              <h3 :class="{ 'feature-header-title--dark': isDarkMode }">{{ $t('home.feature3') }}</h3>
            </div>
          </template>
          <p :class="{ 'feature-text--dark': isDarkMode }">支持数据导入导出功能，与其他系统无缝对接，提高工作效率。</p>
        </n-card>
      </div>
    </div>
    
    <div class="testimonial-section">
      <n-card class="testimonial-card" :class="{ 'testimonial-card--dark': isDarkMode }">
        <div class="testimonial-content">
          <n-icon size="48" :color="isDarkMode ? '#40a9ff' : '#1890ff'" class="quote-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
              <path fill="currentColor" d="M6.5 10c-.223 0-.437.034-.65.065c.069-.232.14-.468.254-.68c.114-.308.292-.575.469-.844c.148-.291.409-.488.601-.737c.201-.242.475-.403.692-.604c.213-.21.492-.315.714-.463c.232-.133.434-.28.65-.35l.539-.222l.474-.197l-.485-1.938l-.597.144c-.191.048-.424.104-.689.171c-.271.05-.56.187-.882.312c-.318.142-.686.238-1.028.466c-.344.218-.741.4-1.091.692c-.339.301-.748.562-1.05.945c-.33.358-.656.734-.909 1.162c-.293.408-.492.856-.702 1.299c-.19.443-.343.896-.468 1.336c-.237.882-.343 1.72-.384 2.437c-.034.718-.014 1.315.028 1.747c.015.204.043.402.063.539l.025.168l.026-.006A4.5 4.5 0 1 0 6.5 10zm11 0c-.223 0-.437.034-.65.065c.069-.232.14-.468.254-.68c.114-.308.292-.575.469-.844c.148-.291.409-.488.601-.737c.201-.242.475-.403.692-.604c.213-.21.492-.315.714-.463c.232-.133.434-.28.65-.35l.539-.222l.474-.197l-.485-1.938l-.597.144c-.191.048-.424.104-.689.171c-.271.05-.56.187-.882.312c-.317.143-.686.238-1.028.467c-.344.218-.741.4-1.091.692c-.339.301-.748.562-1.05.944c-.33.358-.656.734-.909 1.162c-.293.408-.492.856-.702 1.299c-.19.443-.343.896-.468 1.336c-.237.882-.343 1.72-.384 2.437c-.034.718-.014 1.315.028 1.747c.015.204.043.402.063.539l.025.168l.026-.006A4.5 4.5 0 1 0 17.5 10z"/>
            </svg>
          </n-icon>
          <p class="testimonial-text" :class="{ 'testimonial-text--dark': isDarkMode }">
            DataFlow系统极大地简化了我们的数据录入流程，提高了团队工作效率。直观的界面和强大的验证功能让数据管理变得简单而可靠。
          </p>
          <p class="testimonial-author" :class="{ 'testimonial-author--dark': isDarkMode }">— 张经理, 某科技公司</p>
        </div>
      </n-card>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../stores/app'
import { 
  DocumentText as DocumentTextIcon, 
  GridOutline as GridOutlineIcon, 
  CloudDownloadOutline as CloudDownloadOutlineIcon 
} from '@vicons/ionicons5'

const router = useRouter()
const appStore = useAppStore()
const isDarkMode = computed(() => appStore.theme === 'dark')

const goToSubmit = () => {
  router.push('/submit')
}
</script>

<style lang="scss" scoped>
// 变量定义
$primary-color: #1890ff;
$primary-color-hover: #40a9ff;
$primary-color-light: #69c0ff;
$text-color: #303133;
$text-color-secondary: #606266;
$text-color-dark: #ffffff;
$text-color-dark-secondary: rgba(255, 255, 255, 0.85);
$bg-color-dark: #1f1f1f;
$border-color-dark: #333;

.home-container {
  width: 100%;
}

/* 英雄区域样式 */
.hero-section {
  display: flex;
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(135deg, #f0f7ff 0%, #e6f7ff 100%);
  margin-bottom: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  width: 100%;
  transition: all 0.3s;

  &--dark {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .hero-content {
    flex: 1;
    padding: 40px 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .hero-image {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e6f7ff;
    min-height: 400px;
    max-height: 450px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.hero-title {
  font-size: 2.75rem;
  font-weight: 700;
  margin: 0 0 20px;
  color: $text-color;
  line-height: 1.2;
  transition: all 0.3s;

  &--dark {
    color: $text-color-dark;
    background: linear-gradient(90deg, $primary-color-hover, $primary-color-light);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.hero-description {
  font-size: 1.25rem;
  color: $text-color-secondary;
  margin: 0 0 30px;
  line-height: 1.6;
  max-width: 600px;
  transition: color 0.3s;

  &--dark {
    color: #bfbfbf;
  }
}

.get-started-btn {
  align-self: flex-start;
  padding: 0 28px;
  height: 44px;
  font-size: 16px;
  font-weight: 500;
}

/* 特性区域样式 */
.features-section {
  margin-bottom: 40px;
  width: 100%;

  .features-title {
    text-align: center;
    margin: 0 0 30px;
    font-size: 2.25rem;
    font-weight: 700;
    color: $text-color;
    transition: color 0.3s;

    &--dark {
      color: #f3f4f6;
    }
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    width: 100%;
  }
}

.feature-card {
  border-radius: 12px;
  transition: all 0.3s ease;
  height: 100%;
  background-color: #fff;

  &--dark {
    background-color: $bg-color-dark;
    border: 1px solid $border-color-dark;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);

    &.feature-card--dark {
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    }
  }

  .feature-header {
    display: flex;
    align-items: center;
    padding: 16px;
    gap: 12px;

    h3 {
      margin: 0;
      font-size: 1.25rem;
      color: $text-color;
      font-weight: 600;
      transition: color 0.3s;
    }
  }

  p {
    color: $text-color-secondary;
    line-height: 1.6;
    font-size: 1rem;
    transition: color 0.3s;
  }
}

.feature-header-title--dark {
  color: $text-color-dark !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.feature-text--dark {
  color: $text-color-dark-secondary !important;
}

/* 推荐语区域样式 */
.testimonial-section {
  margin-bottom: 40px;
  width: 100%;
}

.testimonial-card {
  border-radius: 12px;
  background: linear-gradient(135deg, #f9f9f9 0%, #f5f5f5 100%);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  transition: all 0.3s;

  &--dark {
    background: linear-gradient(135deg, $bg-color-dark 0%, #1a1a1a 100%);
    border: 1px solid $border-color-dark;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .testimonial-content {
    padding: 40px;
    text-align: center;
    position: relative;
  }

  .quote-icon {
    margin-bottom: 20px;
    opacity: 0.5;
  }
}

.testimonial-text {
  font-size: 1.25rem;
  line-height: 1.8;
  color: #374151;
  font-style: italic;
  margin-bottom: 24px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  transition: color 0.3s;

  &--dark {
    color: #d1d5db;
  }
}

.testimonial-author {
  font-size: 1rem;
  color: #4b5563;
  transition: color 0.3s;

  &--dark {
    color: #9ca3af;
  }
}

/* 响应式样式 */
@media (max-width: 1200px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .hero-title {
    font-size: 2.25rem;
  }
  
  .hero-description {
    font-size: 1.125rem;
  }
}

@media (max-width: 1024px) {
  .hero-section {
    flex-direction: column;

    .hero-content {
      padding: 30px 20px;
      text-align: center;
    }

    .hero-image {
      min-height: 300px;
    }
  }

  .get-started-btn {
    align-self: center;
  }

  .hero-description {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
  }

  .hero {
    &-title {
      font-size: 2rem;
    }

    &-section {
      margin-bottom: 30px;
    }
  }

  .features {
    &-section {
      margin-bottom: 30px;
    }

    &-title {
      font-size: 1.75rem;
      margin-bottom: 20px;
    }
  }

  .testimonial-content {
    padding: 30px 20px;
  }

  .testimonial-text {
    font-size: 1.125rem;
  }
}

@media (max-width: 480px) {
  .hero {
    &-content {
      padding: 25px 15px;
    }

    &-title {
      font-size: 1.75rem;
    }

    &-description {
      font-size: 1rem;
      margin-bottom: 20px;
    }

    &-image {
      min-height: 200px;
    }
  }

  .get-started-btn {
    height: 40px;
    padding: 0 20px;
    font-size: 14px;
  }

  .features-title {
    font-size: 1.5rem;
  }

  .feature-header h3 {
    font-size: 1.125rem;
  }

  .testimonial {
    &-content {
      padding: 20px 15px;
    }

    &-text {
      font-size: 1rem;
    }
  }

  .quote-icon {
    transform: scale(0.8);
  }
}
</style> 