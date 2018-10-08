<template>
  <div class="board">
    <div class="navbar">
      <div class="container">
        <ul>
          <router-link to="/admin"><li>產品管理</li></router-link>
          <router-link to="/admin/orderManager"><li>訂單管理</li></router-link>
          <router-link to="/admin/cupconManager"><li>優惠券</li></router-link>
        </ul>
        <ul>
          <router-link to="/"><li>回到首頁</li></router-link>
          <li @click="signout">登出</li>
        </ul>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "admin",
  methods:{
    signout(){
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/logout`
      vm.isLoading = true
      this.$http.post(api).then((res)=>{
        if(res.data.success){
          vm.$router.push('/')
          vm.isLoading = false
        }
      });
    },
  }
};
</script>

<style lang="scss" scoped>
a{
  color: #fff;
}
.board{
  width: 100%;
}
.navbar{
  width: 100%;
  padding: 20px 0;
  background: #184b80;
  .container{
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    max-width: 1080px;
    margin: auto;
    color: #fff;
    .title{
      font-size: 16px;
      letter-spacing: 3px;
      margin-right: 30px;
    }
    ul{
      list-style: none;
      display: flex;
    }
    li{
      cursor: pointer;
      margin: 0px 10px;
    }
  }
}

</style>
