import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/home'
import Checkout from '@/components/pages/checkout'
import Comfirm from '@/components/pages/comfirm'
import Signin from '@/components/pages/signin'

import Admin from '@/components/pages/admin'
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
      path: '/admin',
      name: 'admin',
      component: Admin 
    }
  ]
})
