import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  // { path: '/', redirect: '/login' },/*  */
  { path: '/login', component: () => import('@/views/Login') },
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/home',
    children: [
      { path: '/home', component: () => import('@/views/Home') },
      { path: '/my', component: () => import('@/views/My') },
      { path: '/qa', component: () => import('@/views/QA') },
      { path: '/video', component: () => import('@/views/Video') }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
