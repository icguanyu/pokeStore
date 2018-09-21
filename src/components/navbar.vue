<template>
  <div>  
    <div class="navbar">
      <div class="logo">
        <router-link to="/"><img src="../assets/img/pokemon_store.png" alt=""></router-link>
      </div>
      <div class="top_right">
        <ul>
          <router-link to="/signin"><li class="sign" v-if="!status">管理員登入</li></router-link>
          <li class="sign" v-if="status" @click="signout">登出</li>
          <router-link to="/checkout"><li class="cart" v-if="!status">購物車({{cart.carts.length}})</li></router-link>
          <router-link to="/admin"><li class="sign" v-if="status">進入後台</li></router-link>
        </ul>
        <div class="hamburgur" @click="toggle">
          <div class="nav_icon"></div>
        </div>
      </div>
    </div>
    <div class="main_menu">
      <ul>
        <li>精選商品</li>
        <li>精靈球</li>
        <li>藥品補給</li>
        <li>野外生活道具</li>
        <li>冒險者組合包</li>
      </ul>
    </div>
    <div class="mobile_menu">
      <ul class="option">
        <router-link to="/admin"><li class="sign" v-if="status">進入後台管理</li></router-link>
        <router-link to="/signin"><li class="sign" v-if="!status">登入/註冊</li></router-link>
        <li class="sign" v-if="status" @click="signout">登出！</li>
      </ul>
      <ul class="menu">
        <li>精選商品</li>
        <li>精靈球</li>
        <li>藥品補給</li>
        <li>野外生活道具</li>
        <li>冒險者組合包</li>
      </ul>
    </div>
  </div>

</template>

<script>
import $ from "jquery";
//手機選單

export default {
  name: "navbar",
  data(){
    return{
      status:false
    }
  },
  props: ['cart'],
  methods: {
    toggle(e) {
      $('.hamburgur').children().toggleClass("nav_open");
      $('.mobile_menu').toggleClass('active')
      e.stopPropagation()
      $(document).on('click', function() {
        $('.hamburgur').children().removeClass('nav_open')
        $('.mobile_menu').removeClass('active')
      })
    },
    check(){
      const vm = this
      const api = `${process.env.APIPATH}/api/user/check`;
      this.$http.post(api).then(res => {
        console.log(res.data);
        if (res.data.success) {
          //由伺服器判斷是否登入
          vm.status = true
        } else {
          vm.status = false
        }
      });
    },
    signout(){
      this.$emit('signout')
    }
  },
  created(){
    this.check()
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  z-index: 10;
  max-width: 1080px;
  margin: 0 auto;
  width: 100%;
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  .logo {
    width: 240px;
    padding: 10px;
    img {
      width: 100%;
    }
  }
  .top_right {
    font-size: 14px;
    ul {
      display: flex;
      list-style: none;
    }
    li {
      cursor: pointer;
      padding: 10px 10px;
      margin: 0px 5px;

      transition: all 0.3s cubic-bezier(0.5, 0, 0.32, 1.88);
      &:hover {
        box-shadow: inset 0px -3px 0px #fb2424;
      }
    }
  }
}

.hamburgur {
  cursor: pointer;
  padding: 20px 10px;
  display: none;
  .nav_icon {
    background: #000;
    display: block;
    height: 2px;
    position: relative;
    transition: all 0.2s ease-out;
    width: 24px;
    &::before,
    &::after {
      background: #000;
      content: "";
      display: block;
      height: 100%;
      position: absolute;
      transition: all 0.2s ease-out;
      width: 100%;
    }
    &::before {
      top: -6px;
    }
    &::after {
      top: 6px;
    }
  }
  .nav_open {
    background: transparent;
    &::before {
      top: 0;
      transform: rotate(-45deg);
    }
    &::after {
      top: 0;
      transform: rotate(45deg);
    }
  }
}
.main_menu {
  display: flex;
  max-width: 1080px;
  font-size: 14px;
  margin: auto;
  ul {
    width: 100%;
    display: flex;
    justify-content: space-around;
    list-style: none;
  }
  li {
    flex: 1;
    text-align: center;
    cursor: pointer;
    padding: 10px 20px;
    margin: 0px 5px;

    transition: all 0.3s cubic-bezier(0.5, 0, 0.32, 1.88);
    &:hover {
      box-shadow: inset 0px -3px 0px #fb2424;
    }
  }
}
.mobile_menu {
  display: none;
  height: 100vh;
  width: 100%;
  color: #fff;
  overflow-y: hidden;
  background: rgba(255, 212, 89, 0.95);
  opacity: 0;
  position: absolute;
  transform: translateX(-100%);
  z-index: 9;
  transition: all .3s;
  ul{
    list-style: none;
    li{
      cursor: pointer;
      font-size: 18px;
      padding: 20px 20px;
      letter-spacing: 3px;
      color: #333;
      &:hover{
        background: #ffe9aa;
      }
    }
  }
  .option{
    ul{
      display: flex;
      justify-content: flex-end;
      padding-right: 20px;
    }
  }
}
.active{
  opacity: 1;
  transform: translateX(0%);
}
@media screen and (max-width: 640px) {
  .navbar {
    padding: 0px;
    .logo {
      width: 180px;
    }
    .top_right {
      display: flex;
      ul {
        .sign{
          display: none;
        }
        .cart{
          padding: 10px 0;
        }
      }
      .hamburgur{
        display: block;
      }
    }
  }
  .main_menu {
    ul {
      display: none;
    }
  }
  .mobile_menu{
    display: block;
  }
}
</style>
