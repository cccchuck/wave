import { createRouter, createWebHistory } from 'vue-router'
import BaseLayout from '@/components/BaseLayout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      component: BaseLayout,
      children: [
        {
          path: '/',
          name: 'Index',
          component: () => import('@/views/IndexView/index.vue')
        },
        {
          path: '/about',
          name: 'About',
          component: () => import('@/views/AboutView/index.vue')
        }
      ]
    }
  ]
})

export default router
