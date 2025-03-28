import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DataView from '../views/DataView.vue'
import EntryView from '../views/EntryView.vue'
import SettingView from '../views/SettingView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/data',
    name: 'data',
    component: DataView
  },
  {
    path: '/submit',
    name: 'entry',
    component: EntryView
  },
  {
    path: '/setting',
    name: 'setting',
    component: SettingView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 