<template>
  <div id="app">
    <router-view/>
    <bottom></bottom>
  </div>
</template>
<script>
import bottom from '@/components/bottom'
export default {
  name: "App",
  components:{
    bottom
  }
};
</script>
<style lang="scss">
@import "./assets/all";
#app{
  width: 100%;
}
</style>


