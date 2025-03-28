<template>
  <div class="submit-container">
    <n-card class="submit-card">
      <template #header>
        <div class="settings-header">
          <h1>{{ editMode ? $t('submit.editing') : $t('submit.title') }}</h1>
          <div class="settings-actions">
            <n-button size="small" @click="handleCancelEdit" v-if="editMode">
              {{ $t('submit.cancel') }}
            </n-button>
          </div>
        </div>
      </template>
      
      <entry-form 
        :edit-mode="editMode" 
        :edit-data="editData"
        @submit-success="handleSubmitSuccess"
        @cancel-edit="handleCancelEdit"
      />
    </n-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMessage, useNotification } from 'naive-ui'
import { useDataStore } from '../stores/data'
import EntryForm from '../components/form/EntryForm.vue'

const route = useRoute()
const router = useRouter()
const dataStore = useDataStore()
const message = useMessage()
const notification = useNotification()

const editMode = ref(false)
const editData = ref(null)

onMounted(() => {
  const id = route.query.id
  
  if (id) {
    editMode.value = true
    editData.value = dataStore.getItemById(id)
    
    if (!editData.value) {
      message.error('数据不存在或已被删除')
      router.push('/data')
      return
    }
    
    notification.info({
      title: $t('submit.editingMode'),
      content: `正在修改 ID 为 ${id} 的数据`,
      duration: 4500,
      keepAliveOnHover: true
    })
  }
})

const handleSubmitSuccess = () => {
  if (editMode.value) {
    message.success('数据修改成功')
  } else {
    message.success('数据提交成功')
  }
  
  router.push('/data')
}

const handleCancelEdit = () => {
  router.push('/data')
}
</script>

<style scoped>
.submit-container {
  width: 100%;
}

.submit-card {
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