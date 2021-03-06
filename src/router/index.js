import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'
import login from '@/views/login'
import SecondHome from '@/views/home/second_home'
Vue.use(VueRouter)

const routes = [
  {
    path: '*', // 匹配任何找不到组件的路由
    component: () => import('@/views/404')
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        component: SecondHome
      },
      {
        path: 'comment',
        component: () => import('@/views/comment')
      },
      {
        path: 'material',
        component: () => import('@/views/material')
      },
      {
        path: 'content',
        component: () => import('@/views/content')
      },
      {
        path: 'publish/:articleID?',
        component: () => import('@/views/publish')
      },
      {
        path: 'account',
        component: () => import('@/views/account')
      },
      {
        path: 'fansInfo',
        component: () => import('@/views/data')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
