<template>
  <div id="app">
    <alert></alert>
    <loading v-if="isLoading" ></loading>
    <router-view/>
  </div>
</template>
<script>
import loading from "@/components/loading";
import alert from "@/components/alert";
export default {
  name: "App",
  components:{
    loading,
    alert
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