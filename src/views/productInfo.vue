<template>
  <div class="products_info">
    <navbar></navbar>
    <breadcrumb :categories="product.category" :productTitle="product.title"></breadcrumb>
    <div class="products_box">
      <div class="left">
        <div class="imgbox">
          <img :src="product.imageUrl" alt="">
        </div>
        <div class="info_box">
          <p class="title">商品介紹</p>
          <p class="text">{{product.description}}</p>
        </div>
        <div class="info_box">
          <p class="title">運費資訊</p>
          <p class="text">無</p>
        </div>
      </div>
      <div class="right">
        <div class="product_title">{{product.title}}</div>
        <div class="ori_price">原價 NT{{product.origin_price|currency}}</div>
        <div class="sale_price">特價 NT{{product.price|currency}}</div>
        <select name="count" id="count" v-model="counts">
          <option value=0 selected disabled>請選擇數量</option>
          <option :value="i" v-for="i in 10" :key="i">
            選購 {{i}} {{product.unit}}
          </option>
        </select>
        <button class="out" v-if="!product.is_enabled">已售完</button>
        <button v-else @click="addtoCart(product.id,product.title,counts)">
          小計 <strong>{{ counts * product.price|currency }}</strong> 元 / 加入購物車
        </button>
        <div class="info_box">
          <p class="title">注意事項</p>
          <p class="text">無</p>
        </div>
      </div>
    </div>
    <car></car>
    <bottom></bottom>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import navbar from '@/components/navbar'
import breadcrumb from '@/components/breadcrumb'
import car from '@/components/car'
import bottom from '@/components/bottom'
export default {
  name: "categories",
  data(){
    return{
      productId:'',
      product: [],
      counts:0,
      //status: false,//登入狀態
    }
  },
  components:{
    breadcrumb,
    bottom,
    navbar,
    car,
  },
  methods:{ 
    getProduct(){//取得單一產品
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${vm.productId}`;
      vm.$store.dispatch('updateLoading',true)
      this.$http.get(api).then(function(response) {
        if(response.data.success){ 
          vm.product = response.data.product
          vm.$store.dispatch('updateLoading',false)
        }else{
          console.log(response.data.message)
        }
      });
    },
    getCart(){
      this.$store.dispatch('getCart')
    },
    addtoCart(id,title,qty=1){
      if(this.counts<1){
        alert('請選擇數量')
        return
      }
      let alertinfo = {
          boolean: true,
          title:`已將「${title} x ${this.counts} ${this.product.unit}」加入購物車`
        }
      this.$store.dispatch('addtoCart',{id,alertinfo,qty})
    },
    closealert(){
      let alertinfo = {
        boolean: false,
        title:''
      }
      this.$store.dispatch('closealert',alertinfo)
    }
  },
  created(){
    this.productId =  this.$route.params.productId
    // console.log(this.productId)
    this.getProduct()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.products_info {
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
.categories_titel{
  position: relative;
  font-size: 20px;
  font-weight: 600;
  color: #53acac;
  margin-bottom: 10px;
}

.products_box{
  width: 100%;
  display: flex;
}
.left,.right{
  flex:1;
  padding: 20px;
  margin: 5px;
  border: 1px solid #eee;
}
.imgbox{
  display: flex;
  justify-content: center;
  padding: 20px;
  img{
    max-width: 100%;
    max-height: 100%;
  }
}

.info_box{
  color: #444;
  font-size: 14px;
  letter-spacing: 1px;
  margin-bottom: 40px;
  .title{
    font-size: 18px;
    padding: 20px 0;
    margin-bottom: 10px;
    color: #555;
    border-bottom: 1px solid #ddd;
  }
}
.right{
  .product_title{
    font-size: 24px;
    margin: 10px 0;
    letter-spacing: 3px;
  }
  .ori_price{
    font-size: 14px;
    color: #666;
  }
  .sale_price{
    font-size: 22px;
    font-weight: 600;
    color:#3cb1a6;
  }
}
select{
  margin: 10px 0;
  padding: 10px;
  outline: none;
  width: 100%;
  font-size: 16px;
  letter-spacing: 2px;
  font-family: "Noto Sans TC", sans-serif;
}
button{
  cursor: pointer;
  margin: 0;
  width: 100%;
  background: #fc6767;
  border: none;
  color:#fff;
  &:hover{
    background: #ef1c1c;
  }
}
.out{
  background: #999;
  &:hover{
    background: #999;
  }
}
@media screen and (max-width: 640px) {
  .products_box{
    flex-direction: column;
  }
}
</style>
