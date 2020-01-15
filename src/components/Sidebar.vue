<template>
  <nav class="col-sm-3 col-md-2 d-none d-sm-block bg-light sidebar" id="sidebar">
    <ul class="nav nav-pills flex-column">
      <li v-for="(menu, index) in menus" class="nav-item"><a href="#" class="nav-link" @click="menuClick(menuUrl[index])">{{ menu }}</a></li>
    </ul>
  </nav>
</template>

<script>
import MenuBus from './MenuBus.vue'

export default {
  name: "Sidebar",
  data() {
    return {
      menus: ['USER_DB', 'ONEROOM_DB', 'TEST'],
      menuUrl: ['users', 'houses', 'test']
    }
  },
  methods : {
    menuClick : function(nowMenu){
      MenuBus.$emit('menu', nowMenu);
      this.$session.set("state", nowMenu);
      this.$router.push('/admin');
    }
  }
}
</script>

<style lang="css">
  #sidebar{
    padding-top:5%;
  }
</style>
