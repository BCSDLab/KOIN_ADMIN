<template>
  <div
    class="graph-wrapper">
  </div>
</template>

<script>
  export default {
    name: "BaseGraph",
    props: {
      options: Object
    },
    methods: {
      generateChart() {
        this.$chart = bb.generate(
          Object.assign(
            {"bindto": this.$el},
            this.options
          )
        );
      }
    },
    watch: {
      data: {
        deep: true,
        handler(newValue) {
          this.$chart.load(newValue);
        }
      }
    },
    mounted() {
      this.generateChart();
    },
    destroyed() {
      this.$chart.destroy();
      this.$chart = null;
    }
  }
</script>

<style scoped>

</style>
