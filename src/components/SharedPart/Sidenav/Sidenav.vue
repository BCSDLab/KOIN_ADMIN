<template>
  <nav class="side-nav">
    <div
      class="side-nav__title"
    >
      ADMIN PAGE
    </div>
    <div
      v-for="items in Object.values(navItems)"
      :key="items.title">
      <div
        class="side-nav__name">
        {{ items.title }}
      </div>
      <template
        v-for="item in Object.values(items.list)">
        <sidenav-item
          v-if="!item.list"
          :link="item.link"
          :disabled="item.disabled">
          {{ item.title }}
        </sidenav-item>
        <sidenav-item-dropdown
          v-else
          :link="item.link"
          :dropdown-items="item.list"
          :disabled="item.disabled">
          {{ item.title }}
        </sidenav-item-dropdown>
      </template>
    </div>
  </nav>
</template>

<script>
  import SidenavItem from "./Components/SidenavItem";
  import SidenavItemDropdown from "./Components/SidenavItemDropdown";
  import navItems from "../../../../static/navItems";
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'Sidenav',
    data() {
      return {
        //permissionInfo: this.getPermissionInfo(),
        //sidenav-item에 넣을 객체들, json은 초기화할 때만 쓰인다.
        navItems: navItems
      }
    },
    methods: {
      ...mapActions({
        setBoardList: 'board/setBoardList',
        //resetPermissionInfo: 'resetUserPermissionInfo'
      }),
      ...mapGetters({
        getDisplayBoardList: 'board/getDisplayBoardList',
        //getPermissionInfo: 'getUserPermissionInfo'
      })
    },
    watch: {
      '$store.state.board.boardList': {
        deep: true,
        handler() {
          this.navItems.main.list.board.list = this.getDisplayBoardList();
        }
      }
    },
    created() {
      this.setBoardList();
    },
    /*
    async mounted() {
      await this.resetPermissionInfo();
      //TODO: /admin/user/{id}/permission에서 받은 해당 permission에 따른 disabled 값을 줘야 함
    },
    */
    components: {
      'sidenav-item': SidenavItem,
      'sidenav-item-dropdown': SidenavItemDropdown
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .side-nav {
    position: fixed;
    list-style-type: none;
    -webkit-user-drag: element;
    padding-top: 25px;
    padding-left: 0;
    width: 150px;
    height: 100%;
    background: #175c8e;
    overflow-y: scroll;
  }

  .side-nav__title {
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 10px;
    color: #f7941e;
  }
  .side-nav__name {
    text-align: left;
    color: #238FDB;
    margin-left: 10px;
    margin-right: 10px;
    border-bottom: #238FDB 1px solid;
  }
</style>
