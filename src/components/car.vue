<template>
  <div>
    <div class="inner_car">
      <loading v-if="isLoading"></loading>
      <h1><i class="fas fa-cart-arrow-down"></i>我的購物車</h1>
      <div class="list">
        <table>
          <thead>
            <tr>
              <td>品名</td>
              <td>品項</td>
              <td>單價</td>
              <td>刪除</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart.carts" :key="item.id">
              <td>{{ item.product.title }}</td>
              <td>{{ item.qty }}/{{ item.product.unit }}</td>
              <td>{{ item.final_total }}</td>
              <td><i class="far fa-trash-alt" @click="removeCartItem(item.id)"></i></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="total">
        <p>小計:NT${{ cart.total }}</p>
        <p class="onsale" v-if="cart.final_total!==cart.total">折扣價:NT${{ cart.final_total }}</p>
      </div>
      <div class="cupcon">
        <input type="text" placeholder="請輸入優惠碼" v-model="coupon_code">
        <button @click="addCouponCode">套用優惠碼</button>
      </div>
      <div class="action">
        <button @click="hideCart">再逛逛</button>
        <button>結帳去</button>
      </div>
    </div>
    <div class="car" @click="showCart">
        <p>{{cart.carts.length}}</p>
    </div>
</div>
  
</template>

<script>
import $ from "jquery";
import loading from "@/components/loading";
export default {
  name: "car",
  props: ['cart'],
  components:{
    loading
  },
  data(){
    return{
      isLoading: false,
      coupon_code:'',
    }
  },
  methods:{
    showCart(){
      $('.inner_car').toggleClass('showCart')
    },
    hideCart(){
      $('.inner_car').removeClass('showCart')
    },
    removeCartItem(id){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      vm.isLoading = true
      this.$http.delete(api).then(function(response) {
        vm.getCart()
        vm.isLoading = false
      });
    },
    getCart() {
      this.$emit('getCart');
    },
    addCouponCode(){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const coupon = {
        code:  vm.coupon_code
      }
      vm.isLoading = true
      this.$http.post(api,{data:coupon}).then(function(response) {
        console.log(response)
        vm.getCart()
        vm.isLoading = false
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.loading{
  z-index: 0;
  height: 100%;
  border-radius: 10px;
}
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
@include scrollbars(5px, #fd3b3b, transparent);
.inner_car {
  position: fixed;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 0%) scale(0,0);
  width: 418px;
  height: 600px;
  padding: 15px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #999;
  transition: all .5s;
  &:before {
    content: "";
    position: absolute;
    width: 500px;
    height: 200px;
    top: -100px;
    left: 50%;
    transform: translateX(-50%);
    background-size: cover;
    background: url("../assets/img/ball_bg.png") no-repeat;
    background-position: center;
    z-index: 10;
  }
  h1 {
    text-align: center;
    margin-top: 50px;
    font-size: 18px;
    font-weight: normal;
    letter-spacing: 3px;
    padding: 10px 0;
    i {
      font-size: 26px;
    }
  }
  .list {
    display: block;
    overflow-y: auto;
    height: 360px;
    table {
      width: 100%;
      border-collapse: collapse; //摺疊邊框
      thead {
        background: #ffdd7c;
      }
      tr {
        width: 100%;
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
      border: none ;
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
    display: flex;
    button{
      font-size: 16px;
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

@media screen and (max-width: 640px) {
  .car {
    right: 20px;
    bottom: 20px;
    width: 40px;
    height: 40px;
    font-size: 12px;
  }
  .inner_car{
    width: 90%;
    max-height: 80%;
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
      max-height: 230px;
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
        margin: 3px;
        padding: 2px 10px;
      }
    }
  }
}
</style>
