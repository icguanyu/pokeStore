import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/home'
import Checkout from '@/components/pages/checkout'
import Comfirm from '@/components/pages/comfirm'
import categories from '@/components/pages/categories'
import productInfo from '@/components/pages/productInfo'
//前台
import Signin from '@/components/pages/signin'
//後台
import Admin from '@/components/pages/admin'
import productsManager from '@/components/pages/productsManager'
import orderManager from '@/components/pages/orderManager'
import cupconManager from '@/components/pages/cupconManager'

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
      component: Home
    },
    {
      path: '/categories',
      name: 'categories',
      component: categories,
    },
    {
      path: '/categories/:productId',
      name: 'productInfo',
      component: productInfo,
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout,
    },
    {
      path: '/comfirm/:orderId',
      name: 'comfirm',
      component: Comfirm 
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin 
    },
    {
      path: '',
      name: 'admin',
      component: Admin,
      children:[
        {
          path: '/admin',
          name: 'productsManger',
          component: productsManager,
          meta: { requiresAuth: true},
        },
        {
          path: '/admin/orderManager',
          name: 'orderManager',
          component: orderManager,
          meta: { requiresAuth: true}
        },
        {
          path: '/admin/cupconManager',
          name: 'cupconManager',
          component: cupconManager,
          meta: { cupconManager: true}
        },
      ]
    }
  ]
})
