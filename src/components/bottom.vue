<template>
  <footer>
    <div class="shop">
      <img src="../assets/img/shop.png" alt="">
    </div>
    <div class="container">
      <img src="../assets/img/pokemon_store.png" alt="">
      <div class="info">
        <p>實體店面：真新鎮大木路一段6號</p>
        <p>營業時間：00:00-24:00</p>
      </div>
      <div>
        <p>作者：icguanyu <a href="https://github.com/icguanyu" target="_blank">Github</a>｜<a href="https://codepen.io/icguanyu/" target="_blank">Codepen</a></p>
        <p>練習作品｜<a href="https://www.pokemon.com/us/" target="_blank">圖片來源：https://www.pokemon.com/us/</a></p> 
      </div>
    </div>
  </footer>
</template>

<script>
import $ from "jquery";

export default {
  name: "bottom"
};
</script>

<style lang="scss" scoped>
footer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .shop{
    img{
      max-width: 800px;
      width: 100%;
    }
  }
  .container{
    display: flex;
    font-size: 14px;
    color: #666;
    align-items: center;
    justify-content: space-between;
    max-width: 1080px;
    width: 100%;
    padding: 20px 0;
    margin: 0 auto;
    border-top: 1px solid #aaa;
    img{
      height: 40px;
    }
    a{
      color: #666;
    }
  }
}
@media screen and (max-width: 640px) {
  footer{
    .container{
      padding: 10px 20px;
      flex-direction: column;
      align-items: flex-start;
      box-sizing: border-box;
    }
  }
}
</style>
