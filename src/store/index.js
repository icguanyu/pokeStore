import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
  },
  actions:{ //state = payload(載荷)
    updateLoading(context,status){
      context.commit('LOADING',status)
    }
  },
  mutations:{
    LOADING(state, status){
    //state即為上方state資料 , status為上面updateLoading傳過來的status
      state.isLoading = status
    }  
    
  }
})