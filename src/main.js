import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VeeValidate from 'vee-validate'
import attributesTW from 'vee-validate/dist/locale/zh_TW.js'
import currencyFilter from './filters/currency'
import dateFilter from './filters/date'
import textlength from './filters/textlength'
import 'bootstrap'

Vue.use(vuex)
Vue.use(VueAxios, axios)
Vue.use(VeeValidate)

VeeValidate.Validator.localize('zh_TW', attributesTW)

Vue.filter('currency', currencyFilter)
Vue.filter('dateFilter', dateFilter)
Vue.filter('textlength', textlength)

axios.defaults.withCredentials = true
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(api).then(res => {
      console.log(res.data)
      if (res.data.success) {
        next()
      } else {
        alert('請重新登入')
        next({
          path: '/signin'
        })
      }
    })
  } else {
    next()
  }
})
