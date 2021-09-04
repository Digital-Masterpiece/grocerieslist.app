import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
