<template>
  <div class="car">
    <p>13</p>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "car"
};
</script>

<style lang="scss" scoped>
.car{
  cursor: pointer;
  width: 60px;
  height: 60px;
  background-image: url("../static/img/ball.png");
  background-size: cover;
  position: fixed;
  right: 50px;
  bottom: 50px;
  transition: all .3s;
  animation: 3s wave infinite ease-in-out;
  &:hover{
    bottom: 55px;
  }
  p{
    position: absolute;
    border: 2px solid #fff;
    right: 0px;
    top: -10px;
    width: 16px;
    text-align: center;
    font-size: 14px;
    line-height: 16px;
    border-radius: 50%;
    color: #fff;
    background: #fb2424;
    padding: 3px;
    display: inline-block;
  }
}
@keyframes wave{
  0%{
    transform: rotate(0deg);
    transform-origin: 50% 100%;
  }
  85%{
    transform: rotate(0deg);
    transform-origin: 50% 100%;
  }
  90%{
    transform: rotate(-5deg);
    transform-origin: 50% 100%;
  }
  95%{
    transform: rotate(5deg);
    transform-origin: 50% 100%;
  }
  100%{
    transform: rotate(0deg);
    transform-origin: 50% 100%;
  }
}
// @keyframes wave{
//   0%{
//     transform: translateY(0%)
//   }
//   50%{
//     transform: translateY(10%)
//   }
//   100%{
//     transform: translateY(0%)
//   }
// }
</style>
