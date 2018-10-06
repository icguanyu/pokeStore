<template>
  <div class="topSlide">
    <alert :alert="alert" @closealert="closealert"></alert>
    <navbar :status="status" @signout="signout"></navbar>
    <slide></slide>
    <h1>＂冒險者！歡迎來到神奇寶貝購物中心＂</h1>
    <div class="news">
      <p>2018.09.21<span class="class emergency">緊急</span>因真新鎮受超夢大軍侵襲，暫時停止營業，不便之處，敬請見諒。</p>
    </div>
    <products @addtoCart="addtoCart"></products>
    <car></car>
    <bottom></bottom>
  </div>
</template>

<script>
import navbar from '@/components/navbar'
import slide from '@/components/slide'
import car from '@/components/car'
import products from '@/components/products'
import alert from "@/components/alert";
import bottom from '@/components/bottom'
export default {
  name: "Home",
  data(){
    return{
      alert: {
        boolen: false,
        title: ''
      },
      status: false,
    }
  },
  components:{
    bottom,
    navbar,
    slide,
    car,
    products,
    alert
  },
  methods:{
    getCart(){
      this.$store.dispatch('getCart')
    },
    addtoCart(id,title,qty = 1){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const cart = {
        product_id:id,
        qty
      }
      vm.$store.dispatch('updateLoading',true)
      this.$http.post(api,{data: cart}).then(function(response) {
        //console.log(response)
        vm.getCart()
        vm.showalert(title)
        vm.$store.dispatch('updateLoading',false)
      });
    },
    showalert(title){
      const vm = this
      vm.alert.boolen = true
      vm.alert.title = `已將「${title}」加入購物車`
      setTimeout(()=>{
        vm.alert.boolen = false
      },3000)
    },
    closealert(){
      this.alert = false
    },
    signout(){
      const vm = this
      const api = `${process.env.APIPATH}/logout`
      vm.$store.dispatch('updateLoading',true)
      this.$http.post(api).then((res)=>{
        if(res.data.success){
          vm.$router.push('/signin')
          vm.$store.dispatch('updateLoading',false)
        }
      });
    },
  },
  created(){
    this.getCart()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.topSlide {
  max-width: 1080px;
  width: 100%;
  margin: 0 auto;
  background-position: center center;
  background-size: cover;
  h1 {
    color: #2b447d;
    margin: 20px auto;
    width: 18em;
    border-right: 0.05em solid;
    overflow: hidden;
    font-weight: 900;
    white-space: nowrap;
    animation: typing 3s steps(18), insert 1s steps(1) infinite;
  }
}
.news{
  letter-spacing: 1px;
  color: #666;
  padding: 10px;
  margin-bottom: 30px;
  box-shadow: 1px 3px 5px #eee; 
  .class{
    border-radius: 5px;
    padding: 0px 4px;
    font-style: 14px;
    margin: 0px 10px;
    color: #fff;
  }
  .emergency{
    background: red;
  }
}
@keyframes insert {
  50% {
    border-color: transparent;
  }
}
@keyframes typing {
  0% {
    width: 0;
  }
}
@media screen and (max-width: 640px) {
  .topSlide{
    h1{
      font-size: 20px;
    }
  }
  .news{
    width: 90%;
    margin: auto;
  }
}
</style>
