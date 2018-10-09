<template>
  <div>
    <div class="inner_car" :class="{'showCart':show}">
      <h1>我的購物車</h1>
      <div class="anibox">
        <div class="home">
          <img src="../assets/img/home.png" alt="">
        </div>
        <div class="truck">
          <img src="../assets/img/truck.png" alt="">
        </div>
      </div> 
      <div class="list">
        <table v-if="!cart.carts.length==0">
          <thead>
            <tr>
              <td>品名</td>
              <td>品項</td>
              <td>金額</td>
              <td>刪除</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart.carts" :key="item.id">
              <td>{{ item.product.title }}</td>
              <td>{{ item.qty }}/{{ item.product.unit }}</td>
              <td>{{ item.final_total|currency }}</td>
              <td @click="removeCartItem(item.id)"><i class="material-icons">delete_outline</i></td>
            </tr>
          </tbody>
        </table>
        <p class="empty" v-else>購物車還沒有任何東西哦</p>
      </div>
      
      <div class="total">
        <p>小計:NT{{ cart.total|currency }}</p>
        <p class="onsale" v-if="cart.final_total!==cart.total">折扣價:NT${{ cart.final_total }}</p>
      </div>
      <div class="cupcon">
        <input type="text" placeholder="請輸入優惠碼" v-model="coupon_code">
        <button @click="addCouponCode(coupon_code)">套用優惠碼</button>
      </div>
      <div class="action">
        <button @click="show=!show">再逛逛</button>
        <router-link to="/checkout"><button>結帳去</button></router-link>
      </div>
    </div>
    <div class="car" @click="show=!show">
        <p>{{cart.carts.length}}</p>
    </div>
</div>
  
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
export default {
  name: "car",
  data(){
    return{
      show: false,
      coupon_code:'',
    }
  },
  methods:{
    ...mapActions(['getCart','addCouponCode','removeCartItem'])
  },
  computed:{
    ...mapGetters(['isLoading','cart'])
  },
  created(){
    this.getCart()
  }
};
</script>

<style lang="scss" scoped>
@mixin scrollbars($size, $foreground-color, $background-color) {
  ::-webkit-scrollbar {
    width: $size;
    height: $size;
    background: $background-color;
    cursor: pointer;
  }
  ::-webkit-scrollbar-thumb {
    background: $foreground-color;
    cursor: pointer;
  }
}

.inner_car {
  @include scrollbars(5px, #fd3b3b, transparent);
  position: fixed;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 0%) scale(0,0);
  width: 418px;
  height: 600px;
  padding: 15px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 3px;
  transition: all .5s;
  h1 {
    text-align: center;
    margin-top: 5px;
    font-size: 18px;
    font-weight: normal;
    letter-spacing: 3px;
    padding: 5px 0;
    i {
      font-size: 26px;
    }
  }
  .list {
    display: block;
    overflow-y: auto;
    height: 260px;
    table {
      width: 100%;
      border-collapse: collapse; //摺疊邊框
      thead {
        background: #ffdd7c;
      }
      tr {
        width: 100%;
        border: none;
      }
      tr:nth-child(even) {
        background: #fff1ca;
      }
      td {
        text-align: center;
        padding: 6px;
        font-weight: 200;
        color: #333;
        font-weight: normal;
        i{
          cursor: pointer;
        }
      }
    }
    .empty{
      padding: 30px;
      margin: 20px;
      border-radius: 15px;
      background: #eee;
      text-align: center;
    }
  }
  input,
  button {
    flex: 1;
    font-size: 16px;
    outline: none;
    border: 1px solid #aaa;
    padding: 5px;
    margin: 0 5px;
    letter-spacing: 2px;
    background: #fff;
    font-family: "Noto Sans TC", sans-serif;
    border-radius: 3px;
  }
  input {
    flex: 3;
  }
  button {
    flex: 1;
    cursor: pointer;
    &:hover {
      border: 1px solid #ffdd7c;
      background: #ffdd7c;
    }
  }
  .cupcon {
    margin-top: 5px;
    display: flex;
  }
  .total {
    text-align: center;
    font-size: 16px;
    padding: 5px 0px;
    letter-spacing: 1px;
    color: #48a38e;
    .onsale{
      color:#fd3b3b;
      font-weight: 600;
      font-size: 18px;
    }
  }
  .action{
    margin-top: 10px;
    button{
      display: inline-block;
      font-size: 16px;
      width: 100%;
      box-sizing: border-box;
      margin: 3px 0;
    }
  }
}
.showCart{
  transform: translate(-50%, -50%) scale(1,1);
}
.car {
  cursor: pointer;
  width: 60px;
  height: 60px;
  background-image: url("../assets/img/ball.png");
  background-size: cover;
  position: fixed;
  right: 50px;
  bottom: 50px;
  transition: all 0.3s;
  z-index: 10;
  animation: 3s wave infinite ease-in-out;
  p {
    position: absolute;
    border: 2px solid #fff;
    right: 0px;
    top: -10px;
    width: 16px;
    text-align: center;
    font-size: 14px;
    line-height: 16px;
    border-radius: 50%;
    color: #fff;
    background: #fb2424;
    padding: 3px;
    display: inline-block;
  }
}
@keyframes wave {
  0% {
    transform: rotate(0deg);
    transform-origin: 50% 100%;
  }
  85% {
    transform: rotate(0deg);
    transform-origin: 50% 100%;
  }
  90% {
    transform: rotate(-5deg);
    transform-origin: 50% 100%;
  }
  95% {
    transform: rotate(5deg);
    transform-origin: 50% 100%;
  }
  100% {
    transform: rotate(0deg);
    transform-origin: 50% 100%;
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
@media screen and (max-width: 736px) {
  .anibox{
    display: none;
  }
  .car {
    right: 20px;
    bottom: 20px;
    width: 40px;
    height: 40px;
    font-size: 12px;
  }
  .inner_car{
    width: 90%;
    max-height: 85%;
    box-sizing: border-box;
    padding: 8px;
    &:before{
      display: none;
    }
    h1{
      margin: 0;
      padding: 5px 0;
      font-size: 18px;
      i{
        font-size: 18px;
      }
    }
    .list{
      max-height: 35%;
      table{
        td{
          padding: 2px 0;
          font-size: 14px;
        }
      }
    }
    .total{
      display: flex;
      align-items: center;
      font-size: 12px;
      justify-content: space-around;
      .onsale{
        font-size: 14px;
      }
    }
    .cupcon,.action{
      margin: 0px;
      flex-direction: column;
      font-size: 14px;
      *{
        margin: 5px 0;
      }
    }
  }
}
</style>
