<template>
  <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" 
        :class="{'disabled': !pages.has_pre}"
        @click.prevent="updatePage(pages.current_page - 1)">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item" 
          v-for="page in pages.total_pages" 
          :key="page" 
          :class="{'active':pages.current_page===page}"
          @click.prevent="updatePage(page)">
        <a class="page-link" href="#">{{page}}</a></li>
        <li class="page-item" 
        :class="{'disabled': !pages.has_next}"
        @click.prevent="updatePage(pages.current_page + 1)">
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
  props: ['pages'],
  //pages = 接收外層元件傳來的pagination,所以原本的pagination改為pages接收
  methods:{
    updatePage(page) {
      this.$emit('emitPages', page);
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~bootstrap/scss/bootstrap";
</style>
