<template>
  <div class="alert" :class="{showalert:alert.boolean}">
    <p>{{alert.title}}<i class="far fa-times-circle" @click="closealert"></i></p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "alert",
  methods:{
    closealert(){
      this.$store.dispatch('closealert',false)
    }
  },
  computed:{
    ...mapGetters(['alert'])
  }
};
</script>

<style lang="scss" scoped>
.alert{
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px 0;
  background: #f8e55c;
  z-index: 100;
  opacity: 0;
  transform: translateY(-120%);
  transition: all .3s;
  p{
    text-align: center;
    letter-spacing: 2px;
    position: relative;
  }
  i{
    font-size: 24px;
    position: absolute;
    cursor: pointer;
    margin: 0 20px;
    right: 0; 
    top: 0;
  }
}
.showalert{
  opacity: 1;
  transform: translateY(0%);
}
@media screen and (max-width: 640px) {
.alert{
  p{
    font-size: 14px;
    letter-spacing: 1px;
  }
  i{
    display: none;
  }
}
}
</style>
