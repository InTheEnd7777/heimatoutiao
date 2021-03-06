import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  // { path: '/', redirect: '/login' },/*  */
  { path: '/login', component: () => import('@/views/Login') },
  { path: '/search', component: () => import('@/views/search') },
  { path: '/user', component: () => import('@/views/My/user') },
  {
    path: '/detail/:article_id',
    component: () => import('@/views/Home/components/detail')
  },
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/home',
    children: [
      { path: '/home', component: () => import('@/views/Home') },
      {
        path: '/my',
        component: () => import('@/views/My'),
        children: [
          {
            path: '/my/updatePortrait',
            component: () => import('@/views/My/user/updatePortrait')
          }
        ]
      },
      { path: '/qa', component: () => import('@/views/QA') },
      { path: '/video', component: () => import('@/views/Video') }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
