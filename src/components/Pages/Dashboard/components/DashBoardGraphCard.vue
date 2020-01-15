<template>
  <div
    :class="cardClass"
    :style="cardStyle">
    <div
      class="dashboard-card__title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div
      class="dashboard-card__wrapper--graph">
      <base-graph
        :options="options"/>
    </div>
  </div>
</template>

<script>
  import * as randomColors from "@/../static/RandomGradientColor";
  import BaseGraph from "../../../SharedPart/Wrapper/BaseGraph";

  export default {
    name: "DashBoardGraphCard",
    props: {
      title: String,
      data: Object,
      graphType: String
    },
    data() {
      return {
        randomColors: randomColors.default,
        options: {
          data: Object.assign(this.data, {type: this.graphType}),
          axis: {
            x: {
              padding: {
                left: 0.5,
                right: 0.5
              }
            },
            y: {
              tick: {
                outer: false
              }
            }
          },
          size: {
            height: 380
          }
        }
      }
    },
    computed: {
      cardStyle() {
        let randomNumber = parseInt(Math.random() * 100) % this.randomColors.length;
        return {
          "background": `linear-gradient(
            75deg,
            ${this.randomColors[randomNumber].start},
            ${this.randomColors[randomNumber].end}
          )`
        }
      },
      cardClass() {
        return {
          'dashboard-card--graph': true,
          'col-11': this.graphType !== 'donut' && this.graphType !== 'pie',
          'col-7': this.graphType === 'donut' || this.graphType === 'pie'
        }
      }
    },
    components: {
      'base-graph': BaseGraph
    }
  }
</script>

<style scoped>
  .dashboard-card--graph {
    margin: 15px;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 1px 1px 7px lightgray;
  }

  .dashboard-card__wrapper--graph {
    margin-top: 15px;
    padding: 5px;
    border-radius: 5px;
    width: 100%;
    height: 400px;
    background-color: white;
  }

  .dashboard-card__title {
    display: flex;
    align-items: center;
    color: whitesmoke;
    font-weight: bold;
    font-size: 27px;
    justify-content: flex-start;
    width: 70%;
    height: 40px;
  }
</style>
