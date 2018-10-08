<template>
  <div class="signin">
    <loading v-if="isLoading"></loading> 
    <div class="box">
      <img src="../assets/img/pokemon_store.png" alt="">
      
    
      <div class="anibox">
        <div class="home">
          <img src="../assets/img/home.png" alt="">
        </div>
        <div class="truck">
          <img src="../assets/img/truck.png" alt="">
        </div>
      </div> 
      <input type="text" placeholder="abc@gmail.com" v-model="user.username" autocomplete="true">
      <input type="password" placeholder="******" v-model="user.password" autocomplete="true">
      <button @click="signin">登入</button>
      <router-link to="back">
        <button class="back">返回</button>
      </router-link>
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
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`
      vm.isLoading = true
      this.$http.post(api,vm.user).then((res)=>{
        // console.log(res.data)
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
.anibox{
  padding-bottom: 20px; 
  max-width: 1080px;
  box-sizing: border-box;
  overflow: hidden;
  margin: auto;
  display: flex;
  justify-content: center;
  position: relative;
  .home{
    img{
      width: 160px;
    }
  }
  .truck{
    position: absolute;
    bottom:-10px;
    animation: 10s drive infinite linear;
    img{
      width: 80px;
      animation: .5s wave infinite linear;
    }
  }
}
@keyframes drive {
  0%{
    right: -20%
  }
  40%{
    right: 45%;
  }
  60%{
    right: 45%;
  }
  100%{
    right: 100%;
  }
}
@keyframes wave {
  0%{
    transform: translateY(3%)
  }
  100%{
    transform: translateY(0%)
  }
}
</style>
