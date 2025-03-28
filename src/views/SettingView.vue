<template>
  <div class="settings-container">
    <n-card class="settings-card">
      <template #header>
        <div class="settings-header">
          <h1>{{ $t('settings.title') }}</h1>
          <div class="settings-actions">
            <n-upload
              accept=".json"
              :custom-request="handleImport"
              :show-file-list="false"
            >
              <n-button size="small">
                {{ $t('settings.import') }}
              </n-button>
            </n-upload>
            <n-button size="small" @click="handleExport">
              {{ $t('settings.export') }}
            </n-button>
          </div>
        </div>
      </template>
      
      <n-tabs type="line" animated class="settings-tabs">
        <!-- 系统设置 -->
        <n-tab-pane name="system" :tab="$t('settings.system')">
          <n-form
            ref="systemFormRef"
            :model="systemForm"
            label-placement="left"
            label-width="120px"
            require-mark-placement="right-hanging"
          >
            <n-form-item :label="$t('settings.version')" path="version">
              <n-input v-model:value="systemForm.version" disabled />
            </n-form-item>
            
            <n-form-item :label="$t('settings.buildNumber')" path="buildNumber">
              <n-input v-model:value="systemForm.buildNumber" disabled />
            </n-form-item>
            
            <n-form-item :label="$t('settings.environment')" path="environment">
              <n-select
                v-model:value="systemForm.environment"
                :options="environmentOptions"
              />
            </n-form-item>
            
            <div class="form-actions">
              <n-button type="primary" @click="saveSystemSettings">
                {{ $t('settings.save') }}
              </n-button>
            </div>
          </n-form>
        </n-tab-pane>
        
        <!-- 用户设置 -->
        <n-tab-pane name="user" :tab="$t('settings.user')">
          <n-form
            ref="userFormRef"
            :model="userForm"
            label-placement="left"
            label-width="120px"
            :rules="userRules"
          >
            <n-form-item :label="$t('settings.recorder')" path="recorder">
              <n-input v-model:value="userForm.recorder" placeholder="请输入录入者姓名" />
              <template #feedback v-if="!userForm.recorder">
                <span class="required-hint">* 必填项，用于记录数据录入人员</span>
              </template>
            </n-form-item>
            
            <n-form-item :label="$t('settings.department')" path="department">
              <n-select
                v-model:value="userForm.department"
                :options="departmentOptions"
                placeholder="请选择部门"
              />
              <template #feedback v-if="!userForm.department">
                <span class="required-hint">* 必填项，用于记录数据所属部门</span>
              </template>
            </n-form-item>
            
            <n-form-item :label="$t('settings.organization')" path="organization">
              <n-input v-model:value="userForm.organization" placeholder="请输入组织名称" />
              <template #feedback v-if="!userForm.organization">
                <span class="required-hint">* 必填项，用于记录数据所属组织</span>
              </template>
            </n-form-item>
            
            <div class="form-actions">
              <n-button type="primary" @click="saveUserSettings">
                {{ $t('settings.save') }}
              </n-button>
            </div>
          </n-form>
        </n-tab-pane>
        
        <!-- 表单设置 -->
        <n-tab-pane name="form" :tab="$t('settings.form')">
          <n-form
            ref="formSettingsRef"
            :model="formSettings"
            label-placement="left"
            label-width="120px"
            require-mark-placement="right-hanging"
          >
            <n-form-item :label="$t('settings.defaultFileType')" path="defaultFileType">
              <n-select
                v-model:value="formSettings.defaultFileType"
                :options="fileTypeOptions"
              />
            </n-form-item>
            
            <n-form-item :label="$t('settings.defaultIsPublic')" path="defaultIsPublic">
              <n-switch v-model:value="formSettings.defaultIsPublic" />
            </n-form-item>
            
            <n-form-item :label="$t('settings.requiredFields')" path="requiredFields">
              <n-select
                v-model:value="formSettings.requiredFields"
                :options="fieldOptions"
                multiple
              />
            </n-form-item>
            
            <n-form-item :label="$t('settings.readonlyFields')" path="readonlyFields">
              <n-select
                v-model:value="formSettings.readonlyFields"
                :options="fieldOptions"
                multiple
              />
            </n-form-item>
            
            <div class="form-actions">
              <n-button type="primary" @click="saveFormSettings">
                {{ $t('settings.save') }}
              </n-button>
            </div>
          </n-form>
        </n-tab-pane>
        
        <!-- 表格设置 -->
        <n-tab-pane name="table" :tab="$t('settings.table')">
          <n-form
            ref="tableFormRef"
            :model="tableForm"
            label-placement="left"
            label-width="120px"
            require-mark-placement="right-hanging"
          >
            <n-form-item :label="$t('settings.pageSize')" path="pageSize">
              <n-input-number v-model:value="tableForm.pageSize" :min="5" :max="100" />
            </n-form-item>
            
            <n-form-item :label="$t('settings.defaultSort')" path="defaultSort">
              <n-select
                v-model:value="tableForm.defaultSort"
                :options="sortFieldOptions"
              />
            </n-form-item>
            
            <n-form-item :label="$t('settings.defaultSortOrder')" path="defaultSortOrder">
              <n-select
                v-model:value="tableForm.defaultSortOrder"
                :options="sortOrderOptions"
              />
            </n-form-item>
            
            <div class="form-actions">
              <n-button type="primary" @click="saveTableSettings">
                {{ $t('settings.save') }}
              </n-button>
            </div>
          </n-form>
        </n-tab-pane>
        
        <!-- JSON视图 -->
        <n-tab-pane name="json" :tab="$t('settings.jsonView')">
          <div class="json-view-container">
            <div class="json-actions">
              <n-button @click="copySettingsJson">
                {{ $t('settings.copy') }}
              </n-button>
              <n-button @click="resetAllSettings" type="error">
                {{ $t('settings.reset') }}
              </n-button>
            </div>
            <pre class="json-code">{{ settingsJson }}</pre>
          </div>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>

<script setup>
import { ref, computed, h, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'
import 'highlight.js/styles/github.css'
import { useSettingsStore } from '../stores/setting'

const { t } = useI18n()
const message = useMessage()
const settingsStore = useSettingsStore()

// 表单引用
const systemFormRef = ref(null)
const userFormRef = ref(null)
const formSettingsRef = ref(null)
const tableFormRef = ref(null)

// 系统设置表单
const systemForm = ref({
  version: '',
  buildNumber: '',
  environment: ''
})

// 用户设置表单
const userForm = ref({
  recorder: '',
  department: '',
  organization: ''
})

// 表单设置
const formSettings = ref({
  defaultFileType: '',
  defaultIsPublic: false,
  requiredFields: [],
  readonlyFields: []
})

// 表格设置表单
const tableForm = ref({
  pageSize: 10,
  defaultSort: '',
  defaultSortOrder: ''
})

// 环境选项
const environmentOptions = [
  { label: '开发环境', value: 'development' },
  { label: '测试环境', value: 'testing' },
  { label: '生产环境', value: 'production' }
]

// 部门选项
const departmentOptions = [
  { label: '研发部', value: 'rd' },
  { label: '市场部', value: 'marketing' },
  { label: '销售部', value: 'sales' },
  { label: '人力资源部', value: 'hr' },
  { label: '财务部', value: 'finance' },
  { label: '行政部', value: 'admin' }
]

// 文件类型选项
const fileTypeOptions = [
  { label: '文档', value: 'document' },
  { label: '图片', value: 'image' },
  { label: '视频', value: 'video' },
  { label: '音频', value: 'audio' },
  { label: '压缩包', value: 'archive' },
  { label: '其他', value: 'other' }
]

// 字段选项
const fieldOptions = [
  { label: '文件名称', value: 'fileName' },
  { label: '文件类型', value: 'fileType' },
  { label: '文件大小', value: 'fileSize' },
  { label: '上传日期', value: 'uploadDate' },
  { label: '文件格式', value: 'fileFormat' },
  { label: '文件版本', value: 'fileVersion' },
  { label: '作者', value: 'author' },
  { label: '部门', value: 'department' },
  { label: '文件描述', value: 'description' },
  { label: '是否公开', value: 'isPublic' },
  { label: '优先级', value: 'priority' },
  { label: '标签', value: 'tags' }
]

// 排序字段选项
const sortFieldOptions = [
  { label: '创建时间', value: 'createdAt' },
  { label: '更新时间', value: 'updatedAt' },
  { label: '文件名称', value: 'fileName' },
  { label: '文件大小', value: 'fileSize' },
  { label: '上传日期', value: 'uploadDate' }
]

// 排序方向选项
const sortOrderOptions = [
  { label: '升序', value: 'ascend' },
  { label: '降序', value: 'descend' }
]

// 使用 ref 而不是 computed 来存储 JSON 字符串
const settingsJson = ref('{}')

// 监听设置变化，更新 JSON 字符串
watch(() => settingsStore.settings, (newSettings) => {
  try {
    settingsJson.value = JSON.stringify(newSettings, null, 2) || '{}'
  } catch (error) {
    console.error('JSON watch error:', error)
  }
}, { deep: true, immediate: true })

// 检查设置是否完成
const isSettingsComplete = computed(() => {
  const userSettings = settingsStore.getUserSettings.value
  return userSettings && 
         userSettings.recorder && 
         userSettings.organization && 
         userSettings.department
})

// 加载设置
onMounted(async () => {
  // 等待 IndexedDB 数据加载完成
  await new Promise(resolve => setTimeout(resolve, 100))
  loadSettings()
})

// 加载设置
function loadSettings() {
  try {
    console.log('Loading settings...')
    console.log('All settings:', settingsStore.getAllSettings.value)
    
    // 加载系统设置
    const systemSettings = settingsStore.getSystemSettings.value || {}
    console.log('System settings:', systemSettings)
    systemForm.value = { ...systemSettings }
    
    // 加载用户设置
    const userSettings = settingsStore.getUserSettings.value || {}
    console.log('User settings:', userSettings)
    userForm.value = { ...userSettings }
    
    // 加载表单设置
    const formSettingsData = settingsStore.getFormSettings.value || {}
    console.log('Form settings:', formSettingsData)
    formSettings.value = { 
      ...formSettingsData,
      readonlyFields: formSettingsData?.readonlyFields || []
    }
    
    // 加载表格设置
    const tableSettings = settingsStore.getTableSettings.value || {}
    console.log('Table settings:', tableSettings)
    tableForm.value = { ...tableSettings }
    
    // 更新 JSON 字符串
    settingsJson.value = JSON.stringify(settingsStore.settings, null, 2) || '{}'
  } catch (error) {
    console.error('加载设置时出错:', error)
    message.error('加载设置失败，将使用默认设置')
    
    // 重置为默认设置
    settingsStore.resetSettings()
    
    // 延迟重新加载，确保重置完成
    setTimeout(() => {
      loadSettings()
    }, 100)
  }
}

// 保存系统设置
function saveSystemSettings() {
  settingsStore.updateSettings('system', systemForm.value)
  message.success(t('settings.saveSuccess'))
  
  // 更新 JSON 字符串
  settingsJson.value = JSON.stringify(settingsStore.settings, null, 2) || '{}'
}

// 用户设置验证规则
const userRules = {
  recorder: {
    required: true,
    message: '请输入录入者姓名',
    trigger: ['blur', 'input']
  },
  department: {
    required: true,
    message: '请选择部门',
    trigger: ['blur', 'change']
  },
  organization: {
    required: true,
    message: '请输入组织名称',
    trigger: ['blur', 'input']
  }
}

// 保存用户设置
function saveUserSettings() {
  userFormRef.value?.validate((errors) => {
    if (!errors) {
      const userFormData = JSON.parse(JSON.stringify(userForm.value))
      settingsStore.updateSettings('user', userFormData)
      message.success(t('settings.saveSuccess'))
      
      // 更新 JSON 字符串
      settingsJson.value = JSON.stringify(settingsStore.settings, null, 2) || '{}'
    }
  })
}

// 保存表单设置
function saveFormSettings() {
  const formData = JSON.parse(JSON.stringify(formSettings.value))
  settingsStore.updateSettings('form', formData)
  message.success(t('settings.saveSuccess'))
  
  // 更新 JSON 字符串
  settingsJson.value = JSON.stringify(settingsStore.settings, null, 2) || '{}'
}

// 保存表格设置
function saveTableSettings() {
  const tableData = JSON.parse(JSON.stringify(tableForm.value))
  settingsStore.updateSettings('table', tableData)
  message.success(t('settings.saveSuccess'))
  
  // 更新 JSON 字符串
  settingsJson.value = JSON.stringify(settingsStore.settings, null, 2) || '{}'
}

// 重置所有设置
function resetAllSettings() {
  settingsStore.resetSettings()
  loadSettings()
  message.success(t('settings.resetSuccess'))
}

// 复制设置JSON
function copySettingsJson() {
  navigator.clipboard.writeText(settingsJson.value)
    .then(() => {
      message.success(t('settings.copySuccess'))
    })
    .catch(() => {
      message.error('复制失败')
    })
}

// 导出设置
function handleExport() {
  const dataStr = settingsStore.exportSettings()
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
  
  const exportFileDefaultName = `settings-${new Date().toISOString().slice(0, 10)}.json`
  
  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', exportFileDefaultName)
  linkElement.click()
}

// 导入设置
function handleImport({ file }) {
  const reader = new FileReader()
  
  reader.onload = (e) => {
    try {
      const jsonData = JSON.parse(e.target.result)
      settingsStore.importSettings(jsonData)
      loadSettings()
      message.success(t('settings.importSuccess'))
    } catch (error) {
      message.error(t('settings.importError'))
      console.error('Import error:', error)
    }
  }
  
  reader.readAsText(file.file)
}

// 注册 JSON 语言
hljs.registerLanguage('json', json)
</script>

<style scoped>
.settings-container {
  width: 100%;
}

.settings-card {
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

:deep(.n-tabs-tab) {
  padding: 12px 16px;
  transition: all 0.3s;
}

:deep(.n-tabs-tab:hover) {
  color: #1890ff;
}

:deep(.n-tabs-tab-active) {
  font-weight: 500;
}

:deep(.n-card__content) {
  padding: 16px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
}

.form-actions .n-button {
  min-width: 100px;
}

.required-hint {
  color: #ff7875;
  font-size: 12px;
  transition: all 0.3s;
  opacity: 0.8;
}

/* JSON 视图样式 */
.json-view-container {
  margin-top: 24px;
  border-top: 1px dashed #e8e8e8;
  padding-top: 24px;
}

.json-view {
  margin-top: 16px;
}

.json-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-bottom: 16px;
}

.json-code {
  background-color: #f5f7fa;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 16px;
  overflow: auto;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  white-space: pre-wrap;
  max-height: 400px;
  font-size: 13px;
  line-height: 1.5;
}

:global(.dark-mode) .json-code {
  background-color: #1a1a1a;
  border-color: #333;
}

/* 响应式调整 */
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