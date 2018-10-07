import Vue from 'vue'
import Vuex from 'Vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    status: false,//預設登入狀態
    isLoading: false,
    cart:{
      carts:[]
    },
    alert:{
      boolean: false,
      title: ''
    },
    products:[],
    pagination:{},
  },
  actions:{ //state = payload(載荷)
    updateLoading(context,status){
      context.commit('LOADING',status)
    },
    getCart(context){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      context.commit('LOADING',true)
      axios.get(api).then(function(response) {
        context.commit('CARTS',response.data.data)
        context.commit('LOADING',false)
      });
    },
    showalert(context, payload){
      context.commit('ALERT',payload)
      setTimeout(()=>{
        let temp = {
          boolean: false
        }
        context.commit('ALERT',temp)
      },2000)
    },
    closealert(context,payload){
      context.commit('ALERT',payload)
    },
    check(context){
      const api = `${process.env.APIPATH}/api/user/check`;
      axios.post(api).then(res => {
        if (res.data.success) {
          context.commit('STATUS',true)
        } else {
          context.commit('STATUS',false)
        }
      });
    },
    getProduct(context,payload){//payload(page)
      const api = payload
      context.commit('LOADING',true)
      axios.get(api).then(function(response) {
        context.commit('PRODUCTS',response.data.products)
        context.commit('PAGINATION',response.data.pagination)
        context.commit('LOADING',false)
      });
    },
    addCart(context,payload){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      context.commit('LOADING',true)
      axios.post(api,{data: payload}).then(function(response) {
        //this.getCart()
        this.dispatch('getCart')
        context.commit('ALERT',payload.title)
        context.commit('LOADING',false)
      });
    }
  },
  mutations:{
    LOADING(state, status){
    //state即為上方state資料 , status為上面updateLoading傳過來的status
      state.isLoading = status
    },
    CARTS(state, payload){
      state.cart = payload
    },
    ALERT(state, payload){
      state.alert = payload
    },
    STATUS(state, payload){
      state.status = payload
    },
    PRODUCTS(state, payload){
      state.products = payload
    },
    PAGINATION(state, payload){
      state.pagination = payload
    }
  }
})