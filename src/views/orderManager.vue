<template>
  <div class="orderbox">
    <table class="table">
      <thead>
        <tr>
          <td>購買時間</td>
          <td>Email</td>
          <td>購買款項</td>
          <td>應付金額</td>
          <td>是否付款</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in sortOrder" :key="key"
          v-if="orders.length"
          :class="{'text-secondary': !item.is_paid}">
          <td>{{ item.create_at | dateFilter }}</td>
          <td><span v-text="item.user.email" v-if="item.user"></span></td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ item.total | currency }}</td>
          <td>
            <strong v-if="item.is_paid" class="text-success">已付款</strong>
            <span v-else class="text-muted">尚未付款</span>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @emitPages="getOrders"></Pagination>
  </div>
</template>

<script>

import Pagination from '@/components/Pagination' 
export default {
  components:{
    Pagination,
  },
  data() {
    return {
      orders: [],
      pagination:{},
    }
  },
  methods: {
    getOrders(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/orders?page=${page}`;
      vm.$store.dispatch('updateLoading',true)
      this.$http.get(api).then(function(response) {
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination
        vm.$store.dispatch('updateLoading',false)
      });
    },
    openDeleteModel(item){
      this.tempProduct = Object.assign({}, item)
      $("#delProductModal").modal("show");
    }
  },
  computed: {
    sortOrder() {
      const vm = this;
      let newOrder = [];
      if (vm.orders.length) {
        newOrder = vm.orders.sort((a, b) => {
          const aIsPaid = a.is_paid ? 1 : 0;
          const bIsPaid = b.is_paid ? 1 : 0;
          return bIsPaid - aIsPaid;
        });
      }
      return newOrder;
    },
  },
  created() {
    this.getOrders();
  }
};
</script>


<style lang="scss" scoped>
@import "~bootstrap/scss/bootstrap";
@import "~bootstrap/scss/functions";
.orderbox{
  padding: 20px;
  box-sizing: border-box;
  max-width: 1080px;
  margin: 10px auto;
  border: 1px solid #eee;
}
</style>