<template>
  <div
    class="dashboard-card--list col-7"
    :style="cardStyle">
    <div
      class="dashboard-card__header">
      <div
        class="dashboard-card__title">
        <slot
          name="title">
          {{ title }}
        </slot>
      </div>

      <div
        v-if="totalPage !== undefined"
        class="dashboard-card__controller">
        <button
          class="dashboard-card__button dashboard-card__button--previous"
          @click="previous"></button>
        <button
          class="dashboard-card__button dashboard-card__button--next"
          @click="next"></button>
      </div>
    </div>
    <div
      class="dashboard-card__wrapper--list">
      <transition
        name="slide"
        mode="out-in">
        <b-table
          :items="tableData"
          :fields="field"
          :key="currentPage"
          hover/>
      </transition>
    </div>
  </div>
</template>

<script>
  import * as randomColors from "@/../static/RandomGradientColor";

  export default {
    name: "DashBoardListCard",
    model: {
      prop: 'currentPage',
      event: 'change'
    },
    data() {
      return {
        randomColors: randomColors.default
      }
    },
    props: {
      title: {
        type: String,
        default: '제목'
      },
      tableData: Array,
      field: Array,
      currentPage: Number,
      totalPage: {
        type: Number
      }
    },
    methods: {
      previous() {
        /**
        * @function previous
        *
        * @description This is function to go previous page.
        * */
        this.$emit('change', (this.currentPage === 1 ? this.totalPage : this.currentPage - 1));
      },
      next() {
        this.$emit('change', (this.currentPage === this.totalPage ? 1 : this.currentPage + 1));
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
      }
    }
  }
</script>

<style scoped>
  .dashboard-card--list {
    margin: 15px;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 1px 1px 7px lightgray;
    width: 400px;
    height: 395px;
    overflow: hidden;
  }

  .dashboard-card__header {
    display: flex;
    padding: 5px;
    margin-bottom: 10px;
    width: 100%;
    height: 50px;
  }

  .dashboard-card__title {
    display: flex;
    align-items: center;
    color: whitesmoke;
    font-weight: bold;
    font-size: 27px;
    justify-content: flex-start;
    width: 70%;
    height: 100%;
  }
  .dashboard-card__controller {
    display: flex;
    justify-content: space-around;
    float: right;
    width: 30%;
  }

  .dashboard-card__wrapper--list {
    padding: 5px;
    border-radius: 5px;
    background-color: white;
    overflow: hidden;
  }

  .dashboard-card__button {
    background-color: transparent;
    border: 0;
    border-radius: 25px;
    color: whitesmoke;
    width: 50px;
    height: 50px;
  }
  .dashboard-card__button:hover {
    background-color: whitesmoke;
    opacity: .2;
    color: #0F0F0F;
  }
  .dashboard-card__button--previous:after {
    content: '<';
    font-size: 20px;
  }
  .dashboard-card__button--next:after {
    content: '>';
    font-size: 20px;
  }
  .slide-leave-to {
    opacity: 0;
    transform: translateY(-50px);
  }
  .slide-enter  {
    opacity: 0;
    transform: translateY(50px);
  }
  .slide-enter-active, .slide-leave-active {
    transition: all .3s;
  }
</style>
