import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 默认设置
const defaultSettings = {
  system: {
    version: '1.0.0',
    buildNumber: '20230601',
    environment: 'production'
  },
  user: {
    recorder: '',
    department: '',
    organization: '智慧数据管理平台'
  },
  form: {
    defaultFileType: 'document',
    defaultIsPublic: false,
    requiredFields: ['fileName', 'fileType', 'author'],
    readonlyFields: []
  },
  table: {
    pageSize: 10,
    defaultSort: 'createdAt',
    defaultSortOrder: 'descend'
  }
}

export const useSettingsStore = defineStore('settings', () => {
  // 设置数据，使用默认值初始化
  const settings = ref({ ...defaultSettings })

  // 获取所有设置
  const getAllSettings = computed(() => settings.value)
  
  // 获取系统设置
  const getSystemSettings = computed(() => settings.value.system || defaultSettings.system)
  
  // 获取用户设置
  const getUserSettings = computed(() => settings.value.user || defaultSettings.user)
  
  // 获取表单设置
  const getFormSettings = computed(() => settings.value.form || defaultSettings.form)
  
  // 获取表格设置
  const getTableSettings = computed(() => settings.value.table || defaultSettings.table)
  
  // 更新设置
  function updateSettings(category, newSettings) {
    console.log(`Updating ${category} settings:`, newSettings)
    
    if (!settings.value[category]) {
      settings.value[category] = { ...defaultSettings[category] }
    }
    
    // 创建一个新对象，避免引用问题
    const updatedCategory = {
      ...settings.value[category],
      ...newSettings
    }
    
    // 使用解构赋值更新整个对象，确保触发响应式更新
    settings.value = {
      ...settings.value,
      [category]: updatedCategory
    }
    
    console.log('Settings after update:', settings.value)
  }
  
  // 重置设置
  function resetSettings() {
    console.log('Resetting settings to defaults')
    settings.value = JSON.parse(JSON.stringify(defaultSettings))
  }
  
  // 导入设置
  function importSettings(newSettings) {
    try {
      console.log('Importing settings:', newSettings)
      
      if (newSettings && typeof newSettings === 'object') {
        // 确保 newSettings 是一个对象而不是字符串或其他类型
        settings.value = {
          ...JSON.parse(JSON.stringify(defaultSettings)), // 确保有默认值
          ...(newSettings || {})
        }
        
        // 确保所有必要的部分都存在
        initSettings()
        
        console.log('Settings after import:', settings.value)
      } else if (typeof newSettings === 'string') {
        // 如果是字符串，尝试解析为 JSON
        const parsedSettings = JSON.parse(newSettings)
        settings.value = {
          ...JSON.parse(JSON.stringify(defaultSettings)), // 确保有默认值
          ...(parsedSettings || {})
        }
        
        // 确保所有必要的部分都存在
        initSettings()
        
        console.log('Settings after import (from string):', settings.value)
      } else {
        console.error('Invalid settings format:', newSettings)
      }
    } catch (error) {
      console.error('Error importing settings:', error)
    }
  }
  
  // 导出设置
  function exportSettings() {
    return JSON.stringify(settings.value, null, 2)
  }

  // 初始化设置（确保所有必要的部分都存在）
  function initSettings() {
    console.log('Initializing settings')
    
    if (!settings.value) {
      settings.value = JSON.parse(JSON.stringify(defaultSettings))
      return
    }
    
    if (!settings.value.user) settings.value.user = { ...defaultSettings.user }
    if (!settings.value.system) settings.value.system = { ...defaultSettings.system }
    if (!settings.value.form) settings.value.form = { ...defaultSettings.form }
    if (!settings.value.table) settings.value.table = { ...defaultSettings.table }
    
    // 确保每个部分都有所有必要的字段
    settings.value.user = { ...defaultSettings.user, ...settings.value.user }
    settings.value.system = { ...defaultSettings.system, ...settings.value.system }
    settings.value.form = { ...defaultSettings.form, ...settings.value.form }
    settings.value.table = { ...defaultSettings.table, ...settings.value.table }
    
    console.log('Settings after initialization:', settings.value)
  }

  // 获取原始设置数据
  function getRawSettings() {
    return JSON.parse(JSON.stringify(settings.value))
  }

  return {
    settings,
    getAllSettings,
    getSystemSettings,
    getUserSettings,
    getFormSettings,
    getTableSettings,
    updateSettings,
    resetSettings,
    importSettings,
    exportSettings,
    initSettings,
    getRawSettings
  }
}, {
  persist: {
    key: 'app-settings',
    storage: localStorage, // 使用 localStorage 而不是 IndexedDB
    paths: ['settings'] // 只持久化 settings 属性
  }
}) 