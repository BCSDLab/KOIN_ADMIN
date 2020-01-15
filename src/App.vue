<template>
  <div id="app">
    <div v-if="checkPath()">
      <main-side-nav></main-side-nav>
    </div>


    <div :class="{'side-nav__space': checkPath()}">
      <div class="container side-nav__content">
        <router-view/>
      </div>
      <main-footer :is-sidenav-open="checkPath()"></main-footer>
    </div>

  </div>
</template>

<script>
  import Sidenav from './components/SharedPart/Sidenav/Sidenav';
  import Footer from './components/SharedPart/Footer/Footer';

  export default {
    components: {
      'main-side-nav': Sidenav,
      'main-footer': Footer,
    },
    data () {
      return {
        nowPath: ''
      }
    },
    name: 'App',
    methods: {
      checkPath() {
        this.nowPath = this.$router.history.current.path.split('/')[1];

        switch(this.nowPath) {
          case "login":
            return false;

          default:
            return true;
        }
      }
    }
  }
</script>

<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0;
  }

  .side-nav__space {
    margin-left: 150px;
  }
  .side-nav__content {
    min-height: calc(100vh - 100px);
  }
  .side-nav__content {
    min-height: calc(100vh - 100px);
  }
</style>
