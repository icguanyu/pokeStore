<template>
  <ul>
    <li><router-link to="/">Home　/　</router-link></li>
    <li v-if="categories">{{categories}}　/　</li>
    <li v-if="productTitle">{{productTitle}}</li>
  </ul>
</template>

<script>
export default {
  props:['categories','productTitle'],
  name: "breadcrumb"
};
</script>

<style lang="scss" scoped>
ul{
  list-style: none;
  display: flex;
  margin: 5px 0;
  padding: 5px 0;
  color: #999;
  li{
    letter-spacing: 2px;
  }
  
}
</style>
