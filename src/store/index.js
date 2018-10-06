import Vue from 'vue'
import Vuex from 'Vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    cart:{
      carts:[]
    },
  },
  actions:{ //state = payload(載荷)
    updateLoading(context,status){
      context.commit('LOADING',status)
    },
    getCart(context,payload){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      context.commit('LOADING',true)
      axios.get(api).then(function(response) {
        context.commit('CARTS',response.data.data)
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
    } 
  }
})