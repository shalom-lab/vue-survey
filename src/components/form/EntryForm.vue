<template>
  <div>
    <!-- 如果设置未完成，显示提示 -->
    <n-result v-if="!isSettingsComplete" status="warning" title="设置未完成" description="请完成以下必要设置">
      <div class="settings-requirements">
        <n-list>
          <n-list-item v-if="!userSettings.value?.recorder">
            <n-tag type="error">未设置</n-tag> 录入者姓名
          </n-list-item>
          <n-list-item v-if="!userSettings.value?.organization">
            <n-tag type="error">未设置</n-tag> 组织名称
          </n-list-item>
          <n-list-item v-if="!userSettings.value?.department">
            <n-tag type="error">未设置</n-tag> 所属部门
          </n-list-item>
        </n-list>
      </div>
      <template #footer>
        <n-button type="primary" @click="goToSetting">前往设置</n-button>
      </template>
    </n-result>
    
    <!-- 如果设置已完成，显示表单 -->
    <n-form
      v-else
      ref="formRef"
      :model="formModel"
      :rules="rules"
      label-placement="left"
      label-width="120px"
      require-mark-placement="right-hanging"
    >
      <n-grid :cols="2" :x-gap="24">
        <n-grid-item>
          <n-form-item label="文件名称" path="fileName">
            <n-input v-model:value="formModel.fileName" placeholder="请输入文件名称" :disabled="isFieldReadonly('fileName')" />
          </n-form-item>
        </n-grid-item>
        
        <n-grid-item>
          <n-form-item label="文件类型" path="fileType">
            <n-select
              v-model:value="formModel.fileType"
              :options="fileTypeOptions"
              placeholder="请选择文件类型"
              :disabled="isFieldReadonly('fileType')"
            />
          </n-form-item>
        </n-grid-item>
        
        <n-grid-item>
          <n-form-item label="文件大小" path="fileSize">
            <n-input-number
              v-model:value="formModel.fileSize"
              :min="0"
              :max="1000"
              placeholder="请输入文件大小(MB)"
            >
              <template #suffix>MB</template>
            </n-input-number>
          </n-form-item>
        </n-grid-item>
        
        <n-grid-item>
          <n-form-item label="上传日期" path="uploadDate">
            <n-date-picker
              v-model:value="formModel.uploadDate"
              type="date"
              clearable
            />
          </n-form-item>
        </n-grid-item>
        
        <n-grid-item>
          <n-form-item label="文件格式" path="fileFormat">
            <n-select
              v-model:value="formModel.fileFormat"
              :options="fileFormatOptions"
              placeholder="请选择文件格式"
            />
          </n-form-item>
        </n-grid-item>
        
        <n-grid-item>
          <n-form-item label="文件版本" path="fileVersion">
            <n-input v-model:value="formModel.fileVersion" placeholder="请输入文件版本" />
          </n-form-item>
        </n-grid-item>
        
        <n-grid-item>
          <n-form-item label="录入者" path="recorder">
            <n-input v-model:value="formModel.author" placeholder="请输入录入者" disabled />
          </n-form-item>
        </n-grid-item>
        
        <n-grid-item>
          <n-form-item label="组织" path="organization">
            <n-input v-model:value="organizationValue" disabled />
          </n-form-item>
        </n-grid-item>
        
        <n-grid-item>
          <n-form-item label="系统版本" path="version">
            <n-input v-model:value="versionValue" disabled />
          </n-form-item>
        </n-grid-item>
        
        <n-grid-item>
          <n-form-item label="部门" path="department">
            <n-select
              v-model:value="formModel.department"
              :options="departmentOptions"
              placeholder="请选择部门"
            />
          </n-form-item>
        </n-grid-item>
        
        <n-grid-item span="2">
          <n-form-item label="文件描述" path="description">
            <n-input
              v-model:value="formModel.description"
              type="textarea"
              placeholder="请输入文件描述"
            />
          </n-form-item>
        </n-grid-item>
        
        <n-grid-item>
          <n-form-item label="是否公开" path="isPublic">
            <n-switch v-model:value="formModel.isPublic" />
          </n-form-item>
        </n-grid-item>
        
        <n-grid-item>
          <n-form-item label="优先级" path="priority">
            <n-rate v-model:value="formModel.priority" :count="3" />
          </n-form-item>
        </n-grid-item>
        
        <n-grid-item span="2">
          <n-form-item label="标签" path="tags">
            <n-dynamic-tags v-model:value="formModel.tags" />
          </n-form-item>
        </n-grid-item>
      </n-grid>
      
      <div class="form-actions">
        <n-space>
          <n-button v-if="props.isEditing" @click="handleCancel">{{ $t('submit.cancel') }}</n-button>
          <n-button v-else @click="handleReset">{{ $t('submit.reset') }}</n-button>
          <n-button type="primary" @click="handleSubmit">
            {{ props.isEditing ? $t('submit.update') : $t('submit.submit') }}
          </n-button>
        </n-space>
      </div>
    </n-form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useDataStore } from '../../stores/data'
import { useSettingsStore } from '../../stores/setting'

const props = defineProps({
  initialData: {
    type: Object,
    default: () => null
  },
  isEditing: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit-success', 'submit-error', 'cancel-edit'])

const { t } = useI18n()
const router = useRouter()
const message = useMessage()
const dataStore = useDataStore()
const settingsStore = useSettingsStore()
const formRef = ref(null)

// 获取设置
const userSettings = computed(() => settingsStore.getUserSettings)
const formSettings = computed(() => settingsStore.getFormSettings)
const systemSettings = computed(() => settingsStore.getSystemSettings)

// 检查设置是否完成
const isSettingsComplete = computed(() => {
  console.log('Checking settings completion:')
  console.log('User settings:', userSettings.value)
  console.log('Has recorder:', !!userSettings.value?.recorder)
  console.log('Has organization:', !!userSettings.value?.organization)
  console.log('Has department:', !!userSettings.value?.department)
  
  return userSettings.value && 
         userSettings.value.recorder && 
         userSettings.value.organization && 
         userSettings.value.department
})

// 安全地获取设置值
const organizationValue = computed(() => {
  const org = userSettings.value?.organization
  console.log('Organization value:', org)
  return org || '请先设置组织'
})

const versionValue = computed(() => {
  const ver = systemSettings.value?.version
  console.log('Version value:', ver)
  return ver || '请先设置版本'
})

// 前往设置页面
const goToSetting = () => {
  router.push('/setting')
}

// 表单数据模型
const formModel = reactive({
  fileName: '',
  fileType: formSettings.value?.defaultFileType || null,
  fileSize: 0,
  uploadDate: null,
  fileFormat: null,
  fileVersion: '',
  author: userSettings.value?.recorder || '',
  department: userSettings.value?.department || null,
  description: '',
  isPublic: formSettings.value?.defaultIsPublic || false,
  priority: 1,
  tags: []
})

// 文件类型选项
const fileTypeOptions = [
  { label: '文档', value: 'document' },
  { label: '图片', value: 'image' },
  { label: '视频', value: 'video' },
  { label: '音频', value: 'audio' },
  { label: '压缩包', value: 'archive' },
  { label: '其他', value: 'other' }
]

// 文件格式选项
const fileFormatOptions = [
  { label: 'PDF', value: 'pdf' },
  { label: 'Word', value: 'docx' },
  { label: 'Excel', value: 'xlsx' },
  { label: 'PPT', value: 'pptx' },
  { label: 'JPG', value: 'jpg' },
  { label: 'PNG', value: 'png' },
  { label: 'MP4', value: 'mp4' },
  { label: 'MP3', value: 'mp3' },
  { label: 'ZIP', value: 'zip' },
  { label: '其他', value: 'other' }
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

// 表单验证规则
const rules = {
  fileName: {
    required: true,
    trigger: ['blur', 'input'],
    message: t('form.required')
  },
  fileType: {
    required: true,
    trigger: ['blur', 'change'],
    message: t('form.required')
  },
  fileSize: {
    required: true,
    trigger: ['blur', 'change'],
    type: 'number',
    message: t('form.required')
  },
  uploadDate: {
    required: true,
    trigger: ['blur', 'change'],
    type: 'number',
    message: t('form.required')
  },
  author: {
    required: true,
    trigger: ['blur', 'input'],
    message: t('form.required')
  }
}

// 检查字段是否只读
const isFieldReadonly = (fieldName) => {
  const readonlyFields = formSettings.value?.readonlyFields || []
  return readonlyFields.includes(fieldName)
}

// 如果是编辑模式，加载初始数据
watch(() => props.initialData, (newVal) => {
  if (newVal) {
    Object.keys(formModel).forEach(key => {
      if (newVal[key] !== undefined) {
        formModel[key] = newVal[key]
      }
    })
  }
}, { immediate: true })

// 提交表单
const handleSubmit = (e) => {
  e.preventDefault()
  
  // 再次检查设置是否完成
  if (!isSettingsComplete.value) {
    message.warning('请先完成系统设置')
    return
  }
  
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      try {
        // 创建一个新对象，确保数据格式正确
        const formData = {
          ...formModel,
          // 确保日期是字符串格式
          uploadDate: formModel.uploadDate ? formModel.uploadDate : null,
          // 确保标签是数组格式
          tags: Array.isArray(formModel.tags) ? [...formModel.tags] : [],
          // 添加设置中的信息
          systemVersion: systemSettings.value?.version || '',
          recorder: userSettings.value?.recorder || formModel.author,
          organization: userSettings.value?.organization || ''
        }
        
        if (props.isEditing && props.initialData) {
          // 更新现有数据
          await dataStore.updateEntry({
            ...props.initialData,
            ...formData
          })
          message.success(t('submit.success'))
        } else {
          // 添加新数据
          await dataStore.addEntry(formData)
          message.success(t('submit.success'))
          handleReset()
        }
        emit('submit-success')
      } catch (error) {
        message.error(t('submit.error'))
        emit('submit-error', error)
      }
    } else {
      message.error(t('submit.validation'))
    }
  })
}

// 重置表单
const handleReset = () => {
  formRef.value?.restoreValidation()
  
  if (props.isEditing && props.initialData) {
    // 如果是编辑模式，重置为初始数据
    Object.keys(formModel).forEach(key => {
      if (props.initialData[key] !== undefined) {
        formModel[key] = props.initialData[key]
      }
    })
  } else {
    // 如果是新建模式，重置为空
    formModel.fileName = ''
    formModel.fileType = null
    formModel.fileSize = 0
    formModel.uploadDate = null
    formModel.fileFormat = null
    formModel.fileVersion = ''
    formModel.author = ''
    formModel.department = null
    formModel.description = ''
    formModel.isPublic = false
    formModel.priority = 1
    formModel.tags = []
  }
}

// 取消编辑
const handleCancel = () => {
  emit('cancel-edit')
}
</script>

<style scoped>
.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
}

.settings-requirements {
  text-align: left;
  margin: 16px 0;
}
</style> 