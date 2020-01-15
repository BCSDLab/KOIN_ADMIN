<template>
  <div
    class="dashboard-card--simple"
    :style="cardStyle">
    <div
      class="dashboard-card__title">
      <slot name="header">오늘은</slot>
    </div>
    <div class="dashboard-card__number">
      <slot name="number"/>
    </div>
    <div
      class="dashboard-card__footer--simple">
      <slot name="footer">의 수가 있습니다.</slot>
    </div>
  </div>
</template>

<script>
  import * as randomColors from "@/../static/RandomGradientColor";

  export default {
    name: "DashBoardCard",
    props: {
      index: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        randomColors: randomColors.default
      }
    },
    computed: {
      cardStyle() {
        let randomNumber = parseInt(Math.random() * 100) * (this.index + 1) % this.randomColors.length;
        return {
          "background": `linear-gradient(
            75deg,
            ${this.randomColors[randomNumber].start},
            ${this.randomColors[randomNumber].end}
          )`
        }
      }
    }
  }
</script>

<style scoped>
  .dashboard-card--simple {
    margin: 15px auto;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 1px 1px 7px lightgray;
    width: 90%;
    height: 190px;
  }

  .dashboard-card__title,
  .dashboard-card__number,
  .dashboard-card__footer--simple {
    display: flex;
    align-items: center;
    color: whitesmoke;
  }
  .dashboard-card__title {
    font-weight: bold;
    font-size: 27px;
    justify-content: flex-start;
    width: 100%;
    height: 40px;
  }
  .dashboard-card__number {
    font-weight: bold;
    font-size: 50px;
    justify-content: center;
    width: 100%;
    height: 100px;
  }
  .dashboard-card__footer--simple {
    font-weight: bold;
    font-size: 17px;
    justify-content: flex-end;
    width: 100%;
    height: 30px;
  }
</style>
