<template>
  <div>
    <p class="categories_titel">商品分類</p>
    <div class="categories">
      <div class="items">
        <router-link class="item" to="/categories">
          <img src="../assets/img/products/1.png" alt="">
          <p class="item_name">精選商品</p>
        </router-link>
        <router-link class="item" to="/categories">
          <img src="../assets/img/products/2.png" alt="">
          <p class="item_name">精靈球</p>
        </router-link>
        <router-link class="item" to="/categories">
          <img src="../assets/img/products/8.png" alt="">
          <p class="item_name">藥品補給</p>
        </router-link>
        <router-link class="item" to="/categories">
          <img src="../assets/img/products/21.png" alt="">
          <p class="item_name">野外求生道具</p>
        </router-link>
        <router-link class="item" to="/categories">
          <img src="../assets/img/products/26.png" alt="">
          <p class="item_name">精選組合包</p>
        </router-link>
      </div>
    </div>
    <p class="categories_titel">最新上架</p>
    <div class="products_list">
      <!-- swiper -->
      <swiper :options="swiperOption">
        <swiper-slide v-for="product in products" :key="product.id">
          <div class="categories">{{ product.category }}</div>
          <img :src="product.imageUrl" alt="">
          <div class="title">{{ product.title }}</div>
          <p class="intro">{{ product.description | textlength }}</p>
          <div class="price">
            <div class="onsale_price">NT{{product.price | currency}}元</div>
            <div class="ori_price">原價{{ product.origin_price | currency}}元</div>
          </div>
          <div class="more">
            <div class="read_more" v-if="product.is_enabled">
              <router-link :to="`/categories/${product.id}`">詳細介紹</router-link>
            </div>
            <div class="add_cart" v-if="!product.is_enabled">已售完</div>
            <div class="add_cart" v-else @click="addtoCart(product.id,product.title)">加入購物車</div>
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import "swiper/dist/css/swiper.css"; // require styles
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "products",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 10,
        speed: 600, 
        autoplay:{
          delay: 5000,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        breakpoints: {
          480: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 30
          },
          800: {
            slidesPerView: 3,
            spaceBetween: 30
          }
        }
      },
      tempProduct: {},
      screenWidth: document.body.clientWidth
    }
  },
  methods:{
    getPorducts(page = 1) {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`
      this.$store.dispatch('getProducts',api)
    },
    addtoCart(id,title,qty=1){
      let alertinfo = {
          boolean: true,
          title:`已將「${title} x1 」 加入購物車`
        }
      this.$store.dispatch('addtoCart',{id,alertinfo,qty})
    },
  },
  created(){
    this.getPorducts()
  },
  computed:{
    ...mapGetters(['products','pagination'])
  }
};
</script>

<style lang="scss" scoped>
.swiper-container {
  max-width: 1080px;
  width: 100%;
  height: 340px;
  padding-bottom: 20px;
}
.swiper-slide{
  border: 1px solid #ddd;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  padding: 5px 15px;
  box-sizing: border-box;
  .categories{
    background: #ff4c4c;
    font-size: 14px;
    display: inline-block;
    color: #fff;
    position: absolute;
    top: 0;
    margin: 0;
    right: 0;
    padding: 3px 5px;
    border-radius: 5px;
    border: 2px solid #fff;
  }
  img{
    max-width: 140px;
    max-height: 140px;
    padding: 10px;
  }
  .title{
    font-size: 18px;
    align-self: flex-start;
  }
  .intro{
    align-self: flex-start;
    font-weight: 400;
    color: #666;
    font-size: 14px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }
  .price{
    font-weight: normal;
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    .onsale_price{
      font-size: 16px;
      letter-spacing: 1px;
      color: #48a38e;
      font-weight: 600;
    }
    .ori_price{
      font-size: 12px;
      color: #888;
    }
  }
}
.swiper-pagination{
  bottom: 0px;
}
.categories_titel{
  position: relative;
  font-size: 20px;
  font-weight: 600;
  color: #53acac;
  padding: 10px;
}
.categories{
  margin: 10px 0;
  .items{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-around;
    .item{
      cursor: pointer;
      display: flex;
      flex:1;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: 10px;
      border-radius: 5px;
      border: 0.5px solid #cccccc;
      margin: 5px;
      transition: .3s all;
      &:hover{
        border: .5px solid rgb(0, 119, 199);
      }
      img{
        max-width: 50px;
        max-height: 50px;
      }
      .item_name{
        color: #333;
        margin-left: 10px;
      }
    }
  }
}
.more{
  width: 100%;
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
  .read_more,.add_cart{
    flex:1;
    text-align: center;
    padding: 5px 0;
    border: 1px solid #ccc;
    cursor: pointer;
  }
  .read_more{
    margin-right: 5px;
    &:hover{
      background: #ffc238;
      border: 1px solid #ffc238;
    }
  }
  .add_cart{
    &:hover{
      background: #ff4c4c;
      border: 1px solid #ff4c4c;
      color: #fff;
    }
  }
}
.products_list{
  padding: 20px 0;
}
@media screen and (max-width: 640px) {
  .swiper-container{
    width: 95%;
  }
  .swiper-slide{
    .categories{
      font-size: 16px;
      margin: 6px;
    }
  }
  .categories{
    margin: 0;
    .items{
      .item{
        flex-direction: column;
        font-size: 12px;
      }
    }
  }
}
</style>
