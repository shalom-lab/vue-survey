<template>
  <div class="data-container">
    <n-card class="data-card">
      <template #header>
        <div class="settings-header">
          <h1>{{ $t('data.title') }}</h1>
          <div class="settings-actions">
            <n-button size="small" type="primary" @click="router.push('/submit')">
              {{ $t('nav.entry') }}
            </n-button>
          </div>
        </div>
      </template>
      
      <div v-if="dataStore.entries.length === 0 && !dataStore.isLoading" class="empty-state">
        <n-empty description="暂无数据">
          <template #extra>
            <n-button @click="router.push('/submit')">
              添加数据
            </n-button>
          </template>
        </n-empty>
      </div>
      
      <data-table v-else />
    </n-card>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { NCard, NEmpty, NButton } from 'naive-ui'
import DataTable from '../components/table/DataTable.vue'
import { useDataStore } from '../stores/data'

const router = useRouter()
const dataStore = useDataStore()

// 组件挂载时加载数据
onMounted(async () => {
  await dataStore.fetchEntries()
})
</script>

<style scoped>
.data-container {
  width: 100%;
}

.data-card {
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;
}

.settings-header h1 {
  margin: 0;
  font-size: 1.5rem;
  color: #1890ff;
}

.settings-actions {
  display: flex;
  gap: 12px;
}

:global(.dark-mode) .settings-header h1 {
  color: #40a9ff;
}

.empty-state {
  padding: 40px 0;
  text-align: center;
}

:deep(.n-card__content) {
  padding: 16px;
}

@media (max-width: 768px) {
  .settings-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .settings-actions {
    align-self: flex-end;
  }
}
</style> 