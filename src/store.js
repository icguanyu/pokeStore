import Vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
Vue.use(vuex)

export default new vuex.Store({
  strict: true,
  state: {
    status: false,
    isLoading: false,
    cart: {
      carts: []
    },
    alert: {
      boolean: false,
      title: ''
    },
    products: [],
    pagination: {}
  },
  actions: {
    updateLoading (context, status) {
      context.commit('LOADING', status)
    },
    getCart (context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      context.commit('LOADING', true)
      axios.get(api).then(function (response) {
        context.commit('CARTS', response.data.data)
        context.commit('LOADING', false)
      })
    },
    showalert (context, payload) {
      context.commit('ALERT', payload)
      setTimeout(() => {
        let temp = {
          boolean: false
        }
        context.commit('ALERT', temp)
      }, 2000)
    },
    closealert (context, payload) {
      context.commit('ALERT', payload)
    },
    check (context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
      axios.post(api).then(res => {
        if (res.data.success) {
          context.commit('STATUS', true)
        } else {
          context.commit('STATUS', false)
        }
      })
    },
    getProducts (context, payload) {
      const api = payload
      context.commit('LOADING', true)
      axios.get(api).then(function (response) {
        context.commit('PRODUCTS', response.data.products)
        context.commit('PAGINATION', response.data.pagination)
        context.commit('LOADING', false)
      })
    },
    addtoCart (context, { id, alertinfo,qty }) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const cart = {
        product_id: id,
        qty
      }
      context.commit('LOADING', true)
      axios.post(api, { data: cart }).then(function (response) {
        context.dispatch('getCart')
        context.dispatch('showalert', alertinfo)
        context.commit('LOADING', false)
      })
    },
    removeCartItem (context, id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      context.commit('LOADING', true)
      axios.delete(api).then(function (response) {
        context.dispatch('getCart')
      })
    },
    addCouponCode (context, coupon) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const cupcondata = {
        code: coupon
      }
      axios.post(api, { data: cupcondata }).then(function (response) {
        context.dispatch('getCart')
      })
    }
  },
  mutations: {
    LOADING (state, status) {
      state.isLoading = status
    },
    CARTS (state, payload) {
      state.cart = payload
    },
    ALERT (state, payload) {
      state.alert = payload
    },
    STATUS (state, payload) {
      state.status = payload
    },
    PRODUCTS (state, payload) {
      state.products = payload
    },
    PAGINATION (state, payload) {
      state.pagination = payload
    }
  },
  getters: {
    status: state => { return state.status },
    isLoading: state => { return state.isLoading },
    cart: state => { return state.cart },
    alert: state => { return state.alert },
    products: state => { return state.products },
    pagination: state => { return state.pagination }
  }
})
