import { createTheme } from 'naive-ui'

// 浅蓝色主题
const lightBlueTheme = createTheme({
  common: {
    primaryColor: '#1890ff',
    primaryColorHover: '#40a9ff',
    primaryColorPressed: '#096dd9',
    primaryColorSuppl: '#1890ff',
    infoColor: '#1890ff',
    successColor: '#52c41a',
    warningColor: '#faad14',
    errorColor: '#f5222d',
    borderRadius: '4px'
  },
  Button: {
    textColorPrimary: '#fff',
    colorPrimary: '#1890ff',
    colorHoverPrimary: '#40a9ff',
    colorPressedPrimary: '#096dd9',
    colorFocusPrimary: '#40a9ff',
    textColorHoverPrimary: '#fff',
    textColorPressedPrimary: '#fff',
    textColorFocusPrimary: '#fff',
    borderPrimary: '1px solid #1890ff',
    borderHoverPrimary: '1px solid #40a9ff',
    borderPressedPrimary: '1px solid #096dd9',
    borderFocusPrimary: '1px solid #40a9ff'
  },
  Card: {
    borderRadius: '8px',
    boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.1)'
  },
  Menu: {
    itemTextColorActive: '#1890ff',
    itemTextColorActiveHover: '#40a9ff',
    itemIconColorActive: '#1890ff',
    itemIconColorActiveHover: '#40a9ff'
  },
  Tabs: {
    tabTextColorActive: '#1890ff',
    barColor: '#1890ff'
  },
  Tag: {
    colorPrimary: 'rgba(24, 144, 255, 0.16)',
    textColorPrimary: '#1890ff',
    borderPrimary: '1px solid rgba(24, 144, 255, 0.16)'
  },
  Form: {
    labelTextColor: '#606266',
    feedbackTextColorError: '#f5222d'
  },
  Input: {
    borderHover: '1px solid #40a9ff',
    borderFocus: '1px solid #1890ff',
    boxShadowFocus: '0 0 0 2px rgba(24, 144, 255, 0.2)'
  },
  Select: {
    peers: {
      InternalSelection: {
        borderHover: '1px solid #40a9ff',
        borderFocus: '1px solid #1890ff',
        boxShadowFocus: '0 0 0 2px rgba(24, 144, 255, 0.2)'
      }
    }
  }
})

// 深色蓝色主题
const darkBlueTheme = createTheme({
  common: {
    primaryColor: '#1890ff',
    primaryColorHover: '#40a9ff',
    primaryColorPressed: '#096dd9',
    primaryColorSuppl: '#1890ff',
    bodyColor: '#141414',
    cardColor: '#1f1f1f',
    modalColor: '#1f1f1f',
    popoverColor: '#1f1f1f'
  }
})

// 修复导出方式
export { lightBlueTheme, darkBlueTheme } 