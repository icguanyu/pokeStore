import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/home')
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('@/views/categories')
    },
    {
      path: '/categories/:productId',
      name: 'productInfo',
      component: () => import('@/views/productInfo')
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: () => import('@/views/checkout')
    },
    {
      path: '/comfirm/:orderId',
      name: 'comfirm',
      component: () => import('@/views/comfirm')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/views/signin')
    },
    {
      path: '',
      name: 'admin',
      component: () => import('@/views/admin'),
      children: [
        {
          path: '/admin',
          name: 'productsManger',
          component: () => import('@/views/productsManager'),
          meta: { requiresAuth: true }
        },
        {
          path: '/admin/orderManager',
          name: 'orderManager',
          component: () => import('@/views/orderManager'),
          meta: { requiresAuth: true }
        },
        {
          path: '/admin/cupconManager',
          name: 'cupconManager',
          component: () => import('@/views/cupconManager'),
          meta: { cupconManager: true }
        }
      ]
    }
  ]
})
