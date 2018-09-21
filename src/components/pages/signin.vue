<template>
  <div class="signin">
    <loading v-if="isLoading"></loading> 
    <div class="box">
      <img src="../../assets/img/pokemon_store.png" alt="">
      <input type="text" placeholder="abc@gmail.com" v-model="user.username" autocomplete="true">
      <input type="password" placeholder="******" v-model="user.password" autocomplete="true">
      <button @click="signin">登入</button>
      <router-link to="back">
        <button class="back">返回</button>
      </router-link>
    </div>
    <img src="../../assets/img/shop.png" alt="">
  </div>
</template>

<script>
import $ from "jquery";
import loading from "@/components/loading";
export default {
  name: "signin",
  components:{
    loading
  },
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      isLoading: false,
    };
  },
  methods: {
    signin() {
      const vm = this
      const api = `${process.env.APIPATH}/admin/signin`
      vm.isLoading = true
      this.$http.post(api,vm.user).then((res)=>{
        console.log(res.data)
        if(res.data.success){
          vm.$router.push('/')
          vm.isLoading = false
        }else{
          alert('資料錯誤')
          vm.isLoading = false
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>

.signin{
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.box{
  width: 300px;
  border-radius: 10px;
  margin-bottom: 60px;
  img{
    width: 100%;
    margin-bottom: 20px;
  }
}
input{
  width: 100%;
  &:focus{
    padding: 10px 5px;
  }
}
button{
  cursor: pointer;
  border: none;
  width: 100%;
  background: #e65a41;
  color: #fff;
  transition: all .3s;
  &:hover{
    background: #d93113;
  }
}
</style>
