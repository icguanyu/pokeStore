<template>
  <div>  
    <div class="navbar">
      <div class="logo">
        <img src="../static/img/pokemon_store.png" alt="">
      </div>
      <div class="top_right">
        <ul>
          <li>登入/註冊</li>
          <li>購物車</li>
          <!-- <li>藥品補給</li>
          <li>野外生活道具</li>
          <li>冒險者組合包</li> -->
        </ul>
      </div>
    </div>
    <div class="main_menu">
      <ul>
          <li>精選商品</li>
          <li>精靈球</li>
          <li>藥品補給</li>
          <li>野外生活道具</li>
          <li>冒險者組合包</li>
        </ul>
    </div>
  </div>

</template>

<script>
import $ from "jquery";

export default {
  name: "navbar"
};
</script>

<style lang="scss" scoped>
.navbar {
  max-width: 1080px;
  width: 100%;
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  .logo {
    width: 240px;
    padding: 10px;
    img {
      width: 100%;
    }
  }
  .top_right {
    font-size: 14px;
    ul {
      display: flex;
      list-style: none;
    }
    li {
      cursor: pointer;
      padding: 10px 10px;
      margin: 0px 5px;

      transition: all 0.3s cubic-bezier(0.5, 0, 0.32, 1.88);
      &:hover {
        box-shadow: inset 0px -3px 0px #fb2424;
      }
    }
  }
}
.main_menu {
  display: flex;
  font-size: 14px;
  ul {
    width: 100%;
    display: flex;
    justify-content: space-around;
    list-style: none;
  }
  li {
    flex:1;
    text-align: center;
    cursor: pointer;
    padding: 10px 20px;
    margin: 0px 5px;

    transition: all 0.3s cubic-bezier(0.5, 0, 0.32, 1.88);
    &:hover {
      box-shadow: inset 0px -3px 0px #fb2424;
    }
  }
}
</style>
