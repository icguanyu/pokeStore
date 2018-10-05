<template>
  <div id="app">
    <loading v-if="isLoading" ></loading>
    <router-view/>
  </div>
</template>
<script>

import loading from "@/components/loading";
export default {
  name: "App",
  components:{
    loading,
  },
  computed:{
    isLoading(){
      return this.$store.state.isLoading
    }
  }
};
</script>
<style lang="scss">
@import "./assets/all";
#app{
  width: 100%;
}
</style>


