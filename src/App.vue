<template>
  <div id="app">
    <div class="main container-fluid">
      <div
        class="sidebar"
        v-if="token!==null && token!==undefined">
        <app-sidebar></app-sidebar>
      </div>
      <div
        :style="{ marginLeft: token === undefined ? '0' : '240px' }"
        class="page-wrapper"
        :class="{ 'width-all': token === undefined}">
        <div class="container-fluid router">
          <div class="row-main">
            <router-view/>
          </div>
        </div>
        <div :style="{ display: token === undefined ? 'none' : '' }">
          <app-footer></app-footer>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import Topnav from './SharedComponents/Topnav/Topnav'
  import Footer from './SharedComponents/Footer/Footer'
  import Sidebar from './SharedComponents/Sidebar/Sidebar'

  export default {
    name: 'app',
    components: {
      'app-topnav': Topnav,
      'app-footer': Footer,
      'app-sidebar': Sidebar
    },
    data() {
      return {
        token: '',
      }
    },
    methods: {},
    created() {
      this.token = this.$session.get('token');
      console.log(this.token);
    },
    updated() {
      this.token = this.$session.get('token');
      console.log(this.token);
    }
  }
</script>

<style>
  .width-all {
    width: 100% !important;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    min-width: 1132px;
  }

  .main {
    /* min-height: calc(100vh - 284px); */
    display: flex;
    overflow: scroll;
    height: 100vh;
    padding: 0;
    background-color: #f2f7f8;
  }

  .sidebar {
    position: fixed;
    width: 240px;
    padding: 0;
  }

  .row-main {
    margin: 0;
    min-height: calc(100vh - 144px);
  }

  .page-wrapper {
    margin-left: 240px;
    height: 100%;
    width: calc(100% - 240px);
    float: left;
  }

  .page-wrapper .container-fluid {
    background-color: #f2f7f8;
    padding-top: 15px;
    padding-bottom: 15px;
  }

  .router {
  }

  .primary-yellow {
    background-color: #fbcb98;
  }

  .primary-bright {
    background-color: #0284e2;
    color: white;
  }

  .primary {
    background-color: #175c8e;
    color: white;
  }

  .primary-bold {
    background-color: #194562;
    color: white;
  }

  .primary-yellow {
    background-color: #f7931e;
  }

</style>
