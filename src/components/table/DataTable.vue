<template>
  <div class="data-table-container">
    <div class="table-actions">
      <n-input
        v-model:value="searchText"
        placeholder="搜索..."
        clearable
        style="width: 200px"
      >
        <template #prefix>
          <n-icon><search-icon /></n-icon>
        </template>
      </n-input>
      
      <div class="right-actions">
        <n-upload
          accept=".json"
          :custom-request="customRequest"
          :show-file-list="false"
        >
          <n-button>{{ $t('data.import') }}</n-button>
        </n-upload>
        
        <n-button @click="handleExport">{{ $t('data.export') }}</n-button>
      </div>
    </div>
    
    <div class="table-wrapper">
      <n-data-table
        :columns="columns"
        :data="filteredData"
        :loading="dataStore.isLoading"
        :pagination="pagination"
        :row-key="rowKey"
        :scroll-x="1800"
        striped
      />
    </div>
  </div>
</template>

<script setup>
import { h, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { 
  NDataTable, 
  NButton, 
  NInput, 
  NIcon, 
  NSpace, 
  NPopconfirm, 
  NUpload,
  NTag,
  NTooltip,
  NEllipsis,
  useMessage,
  useDialog
} from 'naive-ui'
import { useDataStore } from '../../stores/data'

const router = useRouter()
const { t } = useI18n()
const message = useMessage()
const dialog = useDialog()
const dataStore = useDataStore()

// 搜索文本
const searchText = ref('')

// 表格分页设置
const pagination = {
  pageSize: 10
}

// 行的唯一标识
const rowKey = (row) => row.id

// 根据搜索文本过滤数据
const filteredData = computed(() => {
  if (!searchText.value) return dataStore.entries
  
  const searchLower = searchText.value.toLowerCase()
  return dataStore.entries.filter(entry => {
    return (
      entry.fileName?.toLowerCase().includes(searchLower) ||
      entry.description?.toLowerCase().includes(searchLower) ||
      entry.author?.toLowerCase().includes(searchLower) ||
      entry.tags?.some(tag => tag.toLowerCase().includes(searchLower))
    )
  })
})

// 表格列定义
const columns = computed(() => [
  {
    title: 'ID',
    key: 'id',
    width: 80,
    fixed: 'left'
  },
  {
    title: '文件名称',
    key: 'fileName',
    width: 180,
    fixed: 'left',
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '文件类型',
    key: 'fileType',
    width: 120,
    render(row) {
      const typeMap = {
        document: { label: '文档', type: 'info' },
        image: { label: '图片', type: 'success' },
        video: { label: '视频', type: 'warning' },
        audio: { label: '音频', type: 'error' },
        archive: { label: '压缩包', type: 'default' },
        other: { label: '其他', type: 'default' }
      }
      const type = typeMap[row.fileType] || typeMap.other
      return h(NTag, { type: type.type }, { default: () => type.label })
    }
  },
  {
    title: '文件格式',
    key: 'fileFormat',
    width: 100
  },
  {
    title: '文件版本',
    key: 'fileVersion',
    width: 100
  },
  {
    title: '文件大小',
    key: 'fileSize',
    width: 100,
    render(row) {
      return `${row.fileSize} MB`
    },
    sorter: 'default'
  },
  {
    title: '上传日期',
    key: 'uploadDate',
    width: 120,
    render(row) {
      if (!row.uploadDate) return '-'
      // 尝试解析日期字符串
      try {
        return new Date(row.uploadDate).toLocaleDateString()
      } catch (e) {
        return row.uploadDate || '-'
      }
    },
    sorter: (a, b) => {
      if (!a.uploadDate || !b.uploadDate) return 0
      try {
        return new Date(a.uploadDate) - new Date(b.uploadDate)
      } catch (e) {
        return 0
      }
    }
  },
  {
    title: '作者',
    key: 'author',
    width: 120
  },
  {
    title: '部门',
    key: 'department',
    width: 120,
    render(row) {
      const deptMap = {
        rd: '研发部',
        marketing: '市场部',
        sales: '销售部',
        hr: '人力资源部',
        finance: '财务部',
        admin: '行政部'
      }
      return deptMap[row.department] || '-'
    }
  },
  {
    title: '优先级',
    key: 'priority',
    width: 100,
    render(row) {
      const priorityMap = {
        1: '低',
        2: '中',
        3: '高'
      }
      return priorityMap[row.priority] || '-'
    }
  },
  {
    title: '是否公开',
    key: 'isPublic',
    width: 100,
    render(row) {
      return row.isPublic ? '是' : '否'
    }
  },
  {
    title: '标签',
    key: 'tags',
    width: 200,
    render(row) {
      if (!row.tags || row.tags.length === 0) return '-'
      return h(
        'div',
        {
          style: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px'
          }
        },
        row.tags.map(tag => h(
          NTag,
          {
            size: 'small',
            type: 'default'
          },
          { default: () => tag }
        ))
      )
    }
  },
  {
    title: '文件描述',
    key: 'description',
    width: 200,
    ellipsis: {
      tooltip: true
    }
  },
  {
    title: '首次提交时间',
    key: 'createdAt',
    width: 180,
    render(row) {
      if (!row.createdAt) return '-'
      return new Date(row.createdAt).toLocaleString()
    }
  },
  {
    title: '末次修改时间',
    key: 'lastModifiedAt',
    width: 180,
    render(row) {
      if (!row.lastModifiedAt) return '-'
      return new Date(row.lastModifiedAt).toLocaleString()
    }
  },
  {
    title: '录入者',
    key: 'recorder',
    width: 120
  },
  {
    title: '组织',
    key: 'organization',
    width: 150
  },
  {
    title: '系统版本',
    key: 'systemVersion',
    width: 100
  },
  {
    title: '操作',
    key: 'actions',
    width: 150,
    fixed: 'right',
    render(row) {
      return h(
        NSpace,
        {
          justify: 'center'
        },
        {
          default: () => [
            h(
              NButton,
              {
                size: 'small',
                onClick: () => handleEdit(row)
              },
              { default: () => t('data.edit') }
            ),
            h(
              NPopconfirm,
              {
                onPositiveClick: () => handleDelete(row.id)
              },
              {
                default: () => t('data.confirmDeleteMessage'),
                trigger: () => h(
                  NButton,
                  {
                    size: 'small',
                    type: 'error'
                  },
                  { default: () => t('data.delete') }
                )
              }
            )
          ]
        }
      )
    }
  }
])

// 编辑数据
const handleEdit = (row) => {
  dataStore.setCurrentEntry(row)
  router.push('/submit')
}

// 删除数据
const handleDelete = async (id) => {
  try {
    await dataStore.deleteEntry(id)
    message.success('删除成功')
  } catch (error) {
    message.error('删除失败')
  }
}

// 导出数据
const handleExport = () => {
  if (dataStore.entries.length === 0) {
    message.warning('没有数据可导出')
    return
  }
  
  dataStore.exportData()
  message.success('导出成功')
}

// 自定义上传请求（用于导入数据）
const customRequest = ({ file }) => {
  const reader = new FileReader()
  
  reader.onload = async (e) => {
    try {
      const jsonData = JSON.parse(e.target.result)
      await dataStore.importData(jsonData)
      message.success(t('data.importSuccess'))
    } catch (error) {
      message.error(t('data.importError'))
      console.error('Import error:', error)
    }
  }
  
  reader.readAsText(file.file)
}

// 搜索图标
const SearchIcon = () => h('svg', { viewBox: '0 0 24 24', width: '1em', height: '1em' }, [
  h('path', { fill: 'currentColor', d: 'M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z' })
])
</script>

<style scoped>
.data-table-container {
  width: 100%;
}

.table-actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.right-actions {
  display: flex;
  gap: 8px;
}

.table-wrapper {
  overflow-x: auto;
}

.tag-item {
  background-color: #f0f0f0;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}
</style> 