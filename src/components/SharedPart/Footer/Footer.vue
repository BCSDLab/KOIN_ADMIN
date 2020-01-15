<template>
  <div
    :class="{'covered': !isSidenavOpen }"
    class="footer">
    footer
  </div>
</template>

<script>
  export default {
    name: 'Footer',
    props: {
      isSidenavOpen: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .footer {
    position: relative;
    bottom: 0;
    width: calc(100% - 150px);
    height: 100px;
    background: #fefefe;
  }

  .covered {
    width: 100%;
  }
</style>
