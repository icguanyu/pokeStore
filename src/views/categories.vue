<template>
  <div class="topSlide">
    <navbar></navbar>
    <slide></slide>
    <breadcrumb :categories="categories"></breadcrumb>
    <div class="products_box">
      <div class="categories">
        <div class="items">
          <div class="item" @click="categories='所有商品';getProducts()">
            <img src="../assets/img/products/1.png" alt="">
            <p class="item_name">所有商品</p>
          </div>
          <div class="item" @click="categories='精靈球';getProducts()">
            <img src="../assets/img/products/2.png" alt="">
            <p class="item_name">精靈球</p>
          </div>
          <div class="item" @click="categories='藥品';getProducts()">
            <img src="../assets/img/products/8.png" alt="">
            <p class="item_name">藥品</p>
          </div>
          <div class="item" @click="categories='道具';getProducts()">
            <img src="../assets/img/products/21.png" alt="">
            <p class="item_name">道具</p>
          </div>
          <div class="item" @click="categories='商城';getProducts()">
            <img src="../assets/img/products/26.png" alt="">
            <p class="item_name">商城</p>
          </div>
        </div>
    
      </div>
      <div class="products_list">
        <div class="categories_titel">{{categories}}</div>
        <div class="list">
          <div class="item" v-for="item in filterData" :key="item.id">
            <div class="bgimg" :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
            <div class="card-body">
              <span class="category">{{item.category}}</span>
              <p class="title">{{item.title}}</p>
              <p class="text">{{item.description|textlength}}</p>
              <div class="origin_price" v-if="item.price==item.origin_price">原價 NT{{ item.origin_price |currency }} 元</div>
              <div class="sale_price" v-if="item.price!==item.origin_price">
                特價 NT{{ item.price|currency }} 元
              </div>
            </div>
            <div class="cardaction">
              <button type="button" v-if="item.is_enabled">
                <router-link :to="`/categories/${item.id}`">查看更多</router-link> 
              </button>
              <button v-if="!item.is_enabled">已售完</button>
              <button v-else type="button" @click="addtoCart(item.id,item.title)">加到購物車</button>
            </div>
          </div>
        </div>
        <Pagination></Pagination>
      </div>
      <!--頁碼-->
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
import slide from '@/components/slide'
import bottom from '@/components/bottom'
import Pagination from '@/components/Pagination'
export default {
  name: "categories",
  data(){
    return{
      categories:'所有商品',
    }
  },
  components:{
    breadcrumb,
    bottom,
    navbar,
    slide,
    car,
    Pagination
  },
  methods:{ 
    getProducts(page = 1) {
      let api = this.categories=='所有商品'
        ?`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`
        :`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      this.$store.dispatch('getProducts',api)
    },
    getCart(){
      this.$store.dispatch('getCart')
    },
    addtoCart(id,title,qty=1){
      let alertinfo = {
          boolean: true,
          title:`已將「${title} x1 」 加入購物車`
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
  computed: {
    filterData(){
      const vm = this
      return vm.products.filter((item)=>{
        if(vm.categories==='所有商品'){
          return item
        }else{
          return item.category === vm.categories
        }
      })
    },
    ...mapGetters(['products'])
  },
  created(){
    this.getProducts()
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
.categories_titel{
  position: relative;
  font-size: 20px;
  font-weight: 600;
  color: #53acac;
  margin-bottom: 10px;
}

.products_box{
  display: flex;
}
.categories{
  flex:1;
  margin-right: 10px;
  .items{
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-around;
    .item{
      cursor: pointer;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      max-width: 180px;
      padding: 5px;
      border-radius: 5px;
      border: 0.5px solid #cccccc;
      margin-bottom:10px;
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
.products_list{
  flex:6;
  padding: 10px;
  border: 1px solid #eee;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.list{
  display: flex;
  flex-wrap: wrap;
}
.item{
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 275px;
  padding: 5px;
  box-sizing: border-box;
  margin-bottom: 8px;
  margin-right: 8px;
  border: 1px solid #eee;
  &:hover{
    .cardaction{
      opacity: 1;
    }
  }
  .bgimg{
    margin: 20px 0;
    box-sizing: border-box;
    width: 100%;
    height: 120px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .category{
    position: absolute;
    top: 0;
    right: 0;
    color: #fff;
    font-size: 14px;
    padding: 0 5px;
    background: #68cab3;
  }
  .title{
    font-weight: 400;
    letter-spacing: 3px;
    margin: 5px 0;
    font-size: 18px;
  }
  .text{
    font-size: 14px;
    letter-spacing: 1px;
    color: #666;
  }
  .sale_price{
    font-weight: 600;
    font-size: 16px;
    color: #fb5b5b;
  }
  .origin_price{
    font-size: 14px;
  }
}
.cardaction{
  display: inline-block;
  opacity: 0;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(black,.3);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all .5s;
  a{
    color: #fff;
    transition: all .3s;
  }
  button{
    cursor: pointer;
    color: #fff;
    border: 1px solid #fff;
    background: none;
    transition: all .3s;
    &:hover{
      color:#000;
      background: #fff;
      a{
        color: #333;
      }
    }
  }
}
@media screen and (max-width: 640px) {
  .products_box{
    width: 95%;
    margin: auto;
    flex-direction: column;
  }
  .categories{
    .items{
      flex-direction: row;
      justify-content: flex-start;
      .item{
        flex-direction: column;
        justify-content: flex-start;
        flex:1;
        font-size: 14px;
        img{
          width: 30px;
        }
      }
    }
  }
  .list{
    .item{
      cursor:auto;
      width: 100%;
    }
  }
  .cardaction{
    position: relative;
    display: flex;
    opacity: 1;
    width: 100%;
    height: 0;
    height: auto;
    background: none;
    margin-top: 5px;
    a{
      color: #333;
    }
    button{
      flex:1;
      border: 1px solid #888;
      color: #666;
      font-size: 14px;
      padding: 2px 5px;
      margin: 0;
      margin-right: 5px;
      &:hover{
        color:#fff;
        border: 1px solid #68cab3;
        background: #68cab3;
        a{
          color:#fff;
        }
      }
    }
  }
}
</style>
