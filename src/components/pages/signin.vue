<template>
  <div class="signin">
    <loading v-if="isLoading"></loading> 
    <div class="box">
      <div class="title">會員登入</div>
      <input type="text" placeholder="abc@gmail.com" v-model="user.username" autocomplete="true">
      <input type="password" placeholder="******" v-model="user.password" autocomplete="true">
      <button @click="signin">登入</button>
    </div>
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
  justify-content: center;
  align-items: center;
  background: url('../../assets/img/bg.jpg') no-repeat;
  background-size: cover;
}
.box{
  width: 300px;
  border-radius: 10px;
}
.title{
  font-size: 28px;
  letter-spacing: 3px;
  color: #333;
  text-align: center;
  font-weight: 600;
}
input{
  border: none;
  width: 100%;
  &:focus{
    padding: 10px 5px;
  }
}
button{
  cursor: pointer;
  border: none;
  width: 100%;
  transition: all .3s;
  &:hover{
    color: #fff;
    background: #e65a41;
  }
}
</style>
