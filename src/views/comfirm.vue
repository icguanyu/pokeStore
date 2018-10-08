<template>
  <div>
    <navbar></navbar>
    <div class="checkout">
      <div class="title">
        <p v-if="!order.is_paid">確認訂單</p>
        <p v-else>付款完成，感謝購買！</p>
      </div>
    <div class="anibox">
      <div class="home">
        <img src="../assets/img/home.png" alt="">
      </div>
      <div class="truck">
        <img src="../assets/img/truck.png" alt="">
      </div>
    </div>  
    <form class="mt-3 col-md-12" @submit.prevent="payOrder">
      <table v-if="!order.is_paid">
        <thead>
          <th>品名</th>
          <th>數量</th>
          <th>單價</th>
        </thead>
        <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td class="align-middle">{{ item.product.title }}</td>
            <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
            <td class="align-middle text-right">{{ item.final_total }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-right">總計</td>
            <td class="text-right">{{ order.total }}</td>
          </tr>
        </tfoot>
      </table>
      <div class="title">
        <p v-if="!order.is_paid">訂單地址</p>
      </div>
      <table>
        <tbody>
          <tr>
            <td widtd="10%">Email</td>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <td>姓名</td>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <td>收件人電話</td>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <td>收件人地址</td>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <td>付款狀態</td>
            <td>
              <span v-if="!order.is_paid">尚未付款</span>
              <span v-else class="text-success">付款完成</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-center" v-if="order.is_paid === false">
        <button>確認付款去</button>
      </div>
    </form>
    </div>
    <bottom></bottom>
  </div>
</template>

<script>
import navbar from "@/components/navbar";
import bottom from '@/components/bottom'
export default {
  name: "custom_order",
  data() {
    return {
      orderId:'',
      order:{
        user:{}
      },
    };
  },
  components: {
    bottom,
    navbar,
  },
  methods: {
    payOrder(){
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`;
      vm.$store.dispatch('updateLoading',true)
      this.$http.post(api).then(function(response) {
        vm.getOrder()
        vm.showalert()
        vm.$store.dispatch('updateLoading',false)
      });
    },
    showalert(title){
      let alertinfo = {
        boolean: true,
        title:'完成付款！感謝您的體驗！'
      }
      this.$store.dispatch('showalert',alertinfo)
    },
    getOrder(){
      //-LMrvJ22ENrY71xGnJKN
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`;
      vm.$store.dispatch('updateLoading',true)
      this.$http.get(api).then(function(response) {
        vm.order = response.data.order
        vm.$store.dispatch('updateLoading',false)
      });
    }
  },
  created(){
    this.orderId =  this.$route.params.orderId
    this.getOrder()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
p{
  margin: 0;
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
    width: 48px;
  }
  p {
    font-size: 24px;
    font-weight: 900;
    padding: 0 20px;
    color: #444;
    letter-spacing: 4px;
    margin: 0;
  }
}
button{
  cursor: pointer;
  width: 100%;
  transition: all .3s;
  &:hover{
    color: #000;
    border: 1px solid rgb(255, 212, 89);
    background: rgb(255, 212, 89);
    }
  }
.text-success{
  color: green;
}
.anibox{
  padding: 20px 0; 
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
