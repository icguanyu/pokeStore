// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'Vuex'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VeeValidate from 'vee-validate'
import attributesTW from 'vee-validate/dist/locale/zh_TW.js';
import store from './store'

import 'bootstrap'
Vue.use(Vuex)

Vue.use(VueAxios, axios)
Vue.config.productionTip = false

axios.defaults.withCredentials = true;

Vue.use(VeeValidate);
VeeValidate.Validator.localize('zh_TW',attributesTW)
/* eslint-disable no-new */


import currencyFilter from './filters/currency'
import dateFilter from './filters/date'
import textlength from './filters/textlength'

Vue.filter('currency',currencyFilter)
Vue.filter('dateFilter',dateFilter)
Vue.filter('textlength',textlength)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    //需要驗證,判斷是否登入
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then(res => {
      console.log(res.data);
      if (res.data.success) {
        //由伺服器判斷是否登入
        next();
      } else {
        alert("請重新登入");
        next({
          path: "/signin"
        });
      }
    });
  } else {
    //不需驗證
    next();
  }
});