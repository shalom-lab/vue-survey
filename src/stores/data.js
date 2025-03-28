import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { openDB } from 'idb'

// 初始化 IndexedDB
const initDB = async () => {
  return await openDB('fileEntrySystem', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('entries')) {
        const store = db.createObjectStore('entries', { keyPath: 'id', autoIncrement: true })
        store.createIndex('createdAt', 'createdAt')
      }
    }
  })
}

export const useDataStore = defineStore('data', () => {
  const entries = ref([])
  const isLoading = ref(false)
  const currentEntry = ref(null)
  const isEditing = ref(false)

  // 获取所有数据
  async function fetchEntries() {
    isLoading.value = true
    try {
      const db = await initDB()
      const data = await db.getAll('entries')
      entries.value = data
    } catch (error) {
      console.error('Error fetching entries:', error)
    } finally {
      isLoading.value = false
    }
  }

  // 添加新数据
  async function addEntry(entry) {
    try {
      const db = await initDB()
      const now = new Date().toISOString()
      
      // 确保 entry 是一个对象
      if (!entry || typeof entry !== 'object') {
        throw new Error('Invalid entry data')
      }
      
      // 创建一个可以被 IndexedDB 序列化的对象
      const newEntry = {
        ...(entry || {}),
        // 确保日期是字符串格式
        uploadDate: entry.uploadDate ? entry.uploadDate.toString() : null,
        // 确保标签是数组格式
        tags: Array.isArray(entry.tags) ? [...entry.tags] : [],
        // 添加首次提交时间和更新时间
        createdAt: now,
        updatedAt: now,
        lastModifiedAt: null // 首次创建时，末次修改时间为空
      }
      
      const id = await db.add('entries', newEntry)
      newEntry.id = id
      entries.value.push(newEntry)
      return id
    } catch (error) {
      console.error('Error adding entry:', error)
      throw error
    }
  }

  // 更新数据
  async function updateEntry(entry) {
    try {
      const db = await initDB()
      const now = new Date().toISOString()
      
      // 创建一个可以被 IndexedDB 序列化的对象
      const updatedEntry = {
        ...entry,
        // 确保日期是字符串格式
        uploadDate: entry.uploadDate ? entry.uploadDate.toString() : null,
        // 确保标签是数组格式
        tags: Array.isArray(entry.tags) ? [...entry.tags] : [],
        // 更新末次修改时间
        updatedAt: now,
        lastModifiedAt: now
      }
      
      await db.put('entries', updatedEntry)
      
      const index = entries.value.findIndex(e => e.id === entry.id)
      if (index !== -1) {
        entries.value[index] = updatedEntry
      }
      
      return entry.id
    } catch (error) {
      console.error('Error updating entry:', error)
      throw error
    }
  }

  // 删除数据
  async function deleteEntry(id) {
    try {
      const db = await initDB()
      await db.delete('entries', id)
      entries.value = entries.value.filter(e => e.id !== id)
    } catch (error) {
      console.error('Error deleting entry:', error)
      throw error
    }
  }

  // 设置当前编辑的数据
  function setCurrentEntry(entry) {
    currentEntry.value = entry
    isEditing.value = !!entry
  }

  // 清除当前编辑的数据
  function clearCurrentEntry() {
    currentEntry.value = null
    isEditing.value = false
  }

  // 导出数据
  function exportData() {
    const dataStr = JSON.stringify(entries.value, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `file-entries-${new Date().toISOString().slice(0, 10)}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  // 导入数据
  async function importData(jsonData) {
    try {
      const db = await initDB()
      const tx = db.transaction('entries', 'readwrite')
      
      for (const entry of jsonData) {
        const newEntry = {
          ...entry,
          updatedAt: new Date().toISOString()
        }
        await tx.store.put(newEntry)
      }
      
      await tx.done
      await fetchEntries()
      return true
    } catch (error) {
      console.error('Error importing data:', error)
      throw error
    }
  }

  return {
    entries,
    isLoading,
    currentEntry,
    isEditing,
    fetchEntries,
    addEntry,
    updateEntry,
    deleteEntry,
    setCurrentEntry,
    clearCurrentEntry,
    exportData,
    importData
  }
}) 