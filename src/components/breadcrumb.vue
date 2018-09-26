<template>
  <ul>
    <li><router-link to="/">首頁　/　</router-link></li>
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
  margin: 8px 0;
  padding: 5px 0;
  color: #999;
  li{
    font-size: 14px;
    letter-spacing: 2px;
    color: #4287d7;
  }
  
}
@media screen and(max-width: 640px){
  ul{
    margin: 8px 15px;
    li{
      letter-spacing: 0px;
    }
  }
}
</style>
