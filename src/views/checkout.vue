<template>
  <div>
    <navbar></navbar>
    <div class="checkout">
      <div class="title">
        <img src="../assets/img/products/2.png" alt="">
        <p>購物車</p>
      </div>
      <p class="empty" v-if="!cart.carts.length">購物車沒有東西哦！</p>
      <div class="cartlist" v-else>
        <div class="action">
          <input type="text" placeholder="請輸入優惠碼 試試abc?" v-model="coupon_code">
          <button @click="addCouponCode(coupon_code)">套用優惠碼</button>
          <button>想要優惠碼?</button>
        </div>
        <table>
          <thead>
            <tr>
              <td class="item_title">品名</td>
              <td class="item_count">數量</td>
              <td class="item_price">單價</td>
              <td class="item_delete">刪除</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart.carts" :key="item.id">
              <td>{{ item.product.title }}
                <span v-if="item.coupon">｜已折價</span>
              </td>
              <td>{{ item.qty }}/{{ item.product.unit }}</td>
              <td>
                <p>原價：NT{{ item.total|currency }}</p>
                <span v-if="item.final_total!==item.total">優惠價：NT{{ item.final_total|currency }}</span>
              </td>
              <td><i @click="removeCartItem(item.id)" class="material-icons">delete_outline</i></td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="total">
              <td colspan="2" >總計</td>
              <td colspan="2" >
                <p> 原價NT{{ cart.total|currency }}</p>
                <p class="onsale" v-if="cart.final_total!==cart.total">
                  折扣價:NT{{ cart.final_total|currency }}
                </p>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="title">
        <img src="../assets/img/products/1.png" alt="">
        <p>帳單資訊</p>
      </div>
      <label for="useremail">Email
        <span class="text-danger" v-if="errors.has('name')">請輸入正確格式的信箱</span>
      </label>
      <input type="email" name="email" autocomplete="on" v-model="form.user.email" placeholder="請輸入 Email" v-validate="'required|email'">
      
        
      <label for="username">收件人姓名
        <span class="text-danger" v-if="errors.has('name')">請輸入姓名</span>
      </label>
      <input type="text" class="form-control" autocomplete="on" name="name"
        v-model="form.user.name" placeholder="輸入姓名" v-validate="'required'">
      
        
      <label for="usertel">收件人電話
        <span class="text-danger" v-if="errors.has('regex')">請輸入十碼正確手機號碼</span>
      </label>
      <input type="text" class="form-control" autocomplete="on" name="regex" v-model="form.user.tel" placeholder="請輸入電話" 
      v-validate="{required:true,regex: /^[09]{2}[0-9]{8}$/}" >
        
      <label for="useraddress">收件人地址
        <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
      </label>
      <input type="text" class="form-control" name="address" autocomplete="on" v-model="form.user.address" placeholder="請輸入地址" v-validate="'required'">
      
      <label for="useraddress">特殊需求</label>
      <textarea name="" id="" class="form-control" cols="10" rows="3" v-model="form.message"></textarea>

      <button @click="createOrder">送出訂單</button>
    </div>
    <bottom></bottom>
  </div>
</template>

<script>
import { mapGetters , mapActions } from 'vuex';
import navbar from "@/components/navbar";
import bottom from '@/components/bottom';
export default {
  name: "Home",
  data() {
    return {
      coupon_code:'',
      orderId:'',
      order:{
        user:{}
      },
      form:{
        user:{
          email:'',
          name:'',
          tel:'',
          address:'',
        },
        message:''
      }
    };
  },
  components: {
    bottom,
    navbar
  },
  methods: {
    createOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      vm.$validator.validate().then(result => {
        if (result) {
          vm.$store.dispatch('updateLoading',true)
          vm.$http.post(api,{data:vm.form}).then(function(response) {
            if(response.data.success){
              vm.showalert()
              setTimeout(()=>{
                vm.$router.push(`/comfirm/${response.data.orderId}`)
              },3000)
            }
            vm.$store.dispatch('updateLoading',false)
          });
        }else{
          console.log('欄位不完整')
        }
      });
    },
    showalert(title){
      let alertinfo = {
        boolean: true,
        title:'訂單已送出！'
      }
      this.$store.dispatch('showalert',alertinfo)
    },
    ...mapActions(['getCart','removeCartItem','addCouponCode'])
  },
  computed:{
    ...mapGetters(['cart'])
  },
  created() {
    this.getCart()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
p{
  margin: 0;
}
.empty{
  margin: 20px 0;
  text-align: center;
  padding: 30px 0;
  background: #eee;
  border-radius: 10px;
  font-size: 16px;
  letter-spacing: 2px;
}
.checkout {
  max-width: 1080px;
  padding: 30px;
  box-sizing: border-box;
  margin: auto;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 60px;
  }
  p {
    font-size: 30px;
    font-weight: 900;
    padding: 0 20px;
    color: #444;
    letter-spacing: 4px;
    margin: 0;
  }
}
.cartlist {
  margin: 15px 0;
  padding: 20px 10px;
  border-radius: 10px;
  table {
    font-size: 14px;
    width: 100%;
    border-collapse: collapse; //摺疊邊框
    .item_title{
      width: 40%;
    }
    .item_count{
      width: 15%;
    }
    .item_price{
      width: 40%;
    }
    .item_delete{
      width: 5%;
    }
    tr {
      height: 40px;
      padding: 10px 0;
      border-top: 1px solid #ccc;
    }
    td {
      text-align: left;
      padding: 6px;
      font-weight: 200;
      color: #333;
      font-weight: normal;
      span{
        color: forestgreen;
      }
      i {
        cursor: pointer;
      }
    }
    .total{
      font-size: 14px;
      color: #666;
      .onsale{
        font-size: 16px;
        color: red;
      }
    }
  }
  input,
  button {
    cursor: pointer;
    font-size: 16px;
    color: #666;
    outline: none;
    border: 1px solid #ccc;
    padding: 5px;
    margin: 0 5px;
    letter-spacing: 2px;
    background: #fff;
    font-family: "Noto Sans TC", sans-serif;
    border-radius: 3px;
  }
  .action{
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    button{
      transition: all .3s;
      &:hover{
        color: #000;
        border: 1px solid rgb(255, 212, 89);
        background: rgb(255, 212, 89);
      }
    }
  }
}
input,button{
  width: 100%;
}
textarea{
  width: 100%;
}
.text-danger{
  color:red;
  margin: 0 5px;
}
button{
  cursor: pointer;
  transition: all .3s;
  &:hover{
    color: #000;
    border: 1px solid rgb(255, 212, 89);
    background: rgb(255, 212, 89);
  }
}
input:focus{
  padding: 10px;
  border: 1px solid #42cdcd;
}

@media screen and (max-width: 640px){
  .action{
    flex-direction: column;
    input{
      font-size: 14px;
      margin-bottom: 5px;
    }
    button{
      font-size: 14px;
      margin-bottom: 5px;
    }
  }
}
</style>
