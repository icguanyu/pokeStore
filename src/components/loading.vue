<template>
  <div class="loading">
    <img src="../assets/img/loading.gif" alt="">
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "loading"
};
</script>

<style lang="scss" scoped>

.loading{
  background: rgba(white,.8);
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;  
  img{
    width: 160px;
    opacity: .9 ;
  }
}
</style>
