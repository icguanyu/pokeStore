<template>
  <div>
    <loading v-if="isLoading"></loading>
    <div class="products">
      <p class="class_titel">商品分類</p>
      <div class="items">
        <div class="item">
          <img src="../../static/images/products/1.png" alt="">
          <p class="item_name">精選商品</p>
        </div>
        <div class="item">
          <img src="../../static/images/products/2.png" alt="">
          <p class="item_name">精靈球</p>
        </div>
        <div class="item">
          <img src="../../static/images/products/8.png" alt="">
          <p class="item_name">藥品補給</p>
        </div>
        <div class="item">
          <img src="../../static/images/products/21.png" alt="">
          <p class="item_name">野外求生道具</p>
        </div>
        <div class="item">
          <img src="../../static/images/products/26.png" alt="">
          <p class="item_name">精選組合包</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import loading from "@/components/loading";
export default {
  name: "products",
  data() {
    return {
      isLoading: false,
      products: [],
      pagination:{},
      tempProduct: {},
    };
  },
  methods:{
    getPorducts(page = 1) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;
      vm.isLoading = true
      this.$http.get(api).then(function(response) {
        //console.log(response.data)
        vm.products = response.data.products;
        vm.pagination = response.data.pagination
        vm.isLoading = false
      });
    }
  },
  created(){
    this.getPorducts()
  },
  components: {
    loading
  }
};
</script>

<style lang="scss" scoped>
.products{
  margin: 10px 0;
  .class_titel{
    position: relative;
    font-size: 20px;
    font-weight: 600;
    color: #53acac;
    padding: 10px;
  }
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
</style>
