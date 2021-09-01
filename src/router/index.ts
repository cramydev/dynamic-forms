import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Forms from '../views/Forms.vue'
import CreateForm from '../views/CreateForm.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'About',
    component: About
  },
  {
    path: '/formularios',
    name: 'Forms',
    component: Forms
  },
  {
    path: '/crear',
    name: 'CreateForm',
    component: CreateForm
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
