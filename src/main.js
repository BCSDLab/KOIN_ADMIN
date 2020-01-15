// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import {store} from '../stores/store'
import VueSessionStorage from 'vue-sessionstorage'
import bb from 'billboard.js'
import 'billboard.js/dist/billboard.css'

Vue.use(BootstrapVue);
Vue.use(VueSessionStorage);
window.bb = bb;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
