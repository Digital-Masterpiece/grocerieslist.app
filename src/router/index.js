import { createRouter, createWebHistory } from 'vue-router'
import Lists from '../views/Lists.vue'

const routes = [
  {
    path: '/',
    name: 'Lists',
    component: Lists
  },
  {
    path: '/new',
    name: 'New List',
    component: () => import(/* webpackChunkName: "new" */ '../views/New.vue')
  },
  {
    path: '/:id',
    name: 'List',
    component: () => import(/* webpackChunkName: "list" */ '../views/List.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
