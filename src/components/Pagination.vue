<template>
  <nav aria-label="Page navigation example" v-if="pagination">
      <ul class="pagination">
        <li class="page-item" 
        :class="{'disabled': !pagination.has_pre}"
        @click.prevent="updatePage(pagination.current_page - 1)">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item" 
          v-for="page in pagination.total_pages" 
          :key="page" 
          :class="{'active':pagination.current_page===page}"
          @click.prevent="updatePage(page)">
        <a class="page-link" href="#">{{page}}</a></li>
        <li class="page-item" 
        :class="{'disabled': !pagination.has_next}"
        @click.prevent="updatePage(pagination.current_page + 1)">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods:{
    updatePage(page) {
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`
      this.$store.dispatch('getProduct',api)
    }
  },
  computed:{
    pagination(){
      return this.$store.state.pagination
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~bootstrap/scss/bootstrap";
</style>
