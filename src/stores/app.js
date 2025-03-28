import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    theme: localStorage.getItem('app-theme') || 'light'
  }),
  actions: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('app-theme', this.theme)
    },
    setTheme(newTheme) {
      this.theme = newTheme
      localStorage.setItem('app-theme', this.theme)
    }
  },
  persist: true
}) 