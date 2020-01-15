<template>
  <div
    class="copyright">
    <div class="container">
      <div class="logo-container">
        <img
          src="https://static.koreatech.in/assets/img/logo_white.png"
          class="logo"
          @click="clickItem('/')"
        >
      </div>
      <div class="content">
        COPYRIGHT ⓒ 2018 BY BCSDLab ALL RIGHTS RESERVED.
      </div>
      <div class="link">
        <img
          class="facebook"
          @click="clickItem('https://www.facebook.com/koreatech.in/')"
          src="https://static.koreatech.in/upload/fead6221d535ff547d4801081ee8f2e3.png">
        <img
          class="home"
          @click="clickItem('/')"
          src="https://static.koreatech.in/upload/1aae9a021f0338527c28e5c3d0518fa1.png">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Footer',
    data() {
      return {
      }
    },
    methods: {
      clickItem: function (path) {
        if (path === '/')
          this.$router.push(path);
        else
          window.open(path);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .copyright {
    width: 100%;
    background-color: #404040;
    color: white;
    display: table;
    position: relative;
    bottom: 0;
    font-size: 13px;
    border: none;
    height: 144px;
    vertical-align: middle;
  }
  .container {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
  .logo-container {
    float: left;
    height: 100%;
    text-align: left;
  }
  .logo-container img {
    width: 75px;
    margin-top: 51px;
  }
  .logo {
    cursor: pointer;
  }
  .content {
    padding-bottom: 3%;
    padding-top: 66px;
    font-size: 13px;
    padding-left: 43px;
    float: left;
    text-align: left;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: -0.7px;
    color: #7d7d7d;
  }
  .link {
    margin-top: 58px;
    float: right;
  }
  .link .facebook {
    width: 13px;
    margin-right: 28px;
    cursor: pointer;
  }
  .link .home {
    width: 24px;
    cursor: pointer;
  }
</style>
