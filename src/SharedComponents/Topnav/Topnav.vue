<template>
  <div
    class="navbar primary">
    <div class="nav">
      <img
        src="https://static.koreatech.in/assets/img/logo_white.png"
        class="logo"
        @click="clickLogo"
      >
    </div>
  </div>

</template>

<script>

  export default {
    name: 'Topnav',
    data() {
      return {
      }
    },
    methods: {
      clickLogo: function () {
        this.$router.push('/');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .navbar {
    min-width: 1132px;
    overflow: hidden;
    height: 80px !important;
    font-size: 12px;
    border-bottom: 1px solid #0000002b;
    font-family: "NanumSquare", serif;
    font-weight: 800;
    color: white;
  }

  .nav {
    margin-left: auto;
    margin-right: auto;
    width: 1131px;
    height: 80px;
  }

  /* Links inside the navbar */
  .navbar .logo {
    color: white;
    float: left;
    width: 80px;
    height: 45px;
    margin-top: 18px;
    cursor: pointer;
  }
</style>
