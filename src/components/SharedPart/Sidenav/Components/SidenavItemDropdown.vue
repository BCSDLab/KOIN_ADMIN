<template>
  <li
    class="side-nav-item">
    <a
      :class="titleLinkStyle"
      @click="clickTitle()">
      <slot/>
    <i
      :class="iconClass"></i>
    </a>
    <transition
      name="slide"
    >
      <ul
        class="side-nav-item__menu"
        :style="menuStyle"
        v-show="isShowDropdown"
        v-if="dropdownItems.length !== 0">
        <li
          v-for="item in dropdownItems"
          :key="item.name">
          <a
            :class="getDropdownLinkStyle(item)"
            @click="goLink(item.link, item.disabled)">
            {{ item.title }}
          </a>
        </li>
      </ul>
    </transition>
  </li>
</template>

<script>
  export default {
    name: "SidenavItem",
    data() {
      return {
        isShowDropdown: false
      }
    },
    props: {
      //dropdown 형태일 시 router.push로 보낼 링크의 base
      //dropdown 형태가 아닐 시 router.push로 보낼 링크
      link: {
        type: String
      },
      //item은 name(표시될 이름), link(router.push로 보낼 링크)로 구성된다.
      dropdownItems: {
        type: Array,
        default() {
          return [];
        }
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      clickTitle() {
        if(this.dropdownItems.length && !this.disabled)
          this.isShowDropdown = !this.isShowDropdown;
        else
          this.goLink('', this.disabled);
      },
      // goLink goUrl();
      goLink(link, disabled) {
        if(!disabled)
          if(this.link + link !== this.$route.path)
            this.$router.push(this.link + link);
      },
      // verb . setSecondLinkStyle
      getDropdownLinkStyle(item) {
        return {
          'side-nav-item__link--child': true,
          'side-nav-item__link--active': '/' + this.$route.path.split('/')[2] === item.link,
          'side-nav-item__link--disabled': item.disabled
        };
      }
    },
    computed: {
      iconClass() {
        return {
          'side-nav-item__icon': !this.isShowDropdown,
          'side-nav-item__icon--active': this.isShowDropdown
        }
      },
      menuStyle() {
        return {
          height: this.isShowDropdown ? 40 * this.dropdownItems + 'px' : null
        }
      },
      titleLinkStyle() {
        return {
          'side-nav-item__link': true,
          'side-nav-item__link--active': '/' + this.$route.path.split('/')[1] === this.link,
          'side-nav-item__link--disabled': this.disabled
        };
      }
    },
    mounted() {
      //만약 새로고침 했을 시 해당 dropdown의 자식의 주소라면 dropdown을 펼침
      if('/' + this.$route.path.split('/')[1] === this.link)
        this.isShowDropdown = true
    },
    watch: {
      '$route.path'(to) {
        if('/' + to.split('/')[1] !== this.link)
          this.isShowDropdown = false
      }
    }
  }
</script>

<style scoped>
  .side-nav-item, .side-nav-item__menu {
    list-style-type: none;
  }
  .side-nav-item__menu {
    padding: 0;
    margin: 0;
    overflow: hidden;
  }

  .side-nav-item__link, .side-nav-item__link--child {
    cursor: default;
    display: flex;
    text-align: left;
    align-items: center;
    height: 40px;
    -webkit-user-drag: element;
  }
  .side-nav-item__link {
    font-size: 17px;
    padding-left: 10px;
  }
  .side-nav-item__link--child {
    font-size: 14px;
    padding-left: 18px;
  }

  .side-nav-item__link:not(.side-nav-item__link--active),
  .side-nav-item__link--child:not(.side-nav-item__link--active) {
    color:white;
  }
  .side-nav-item__link:not(.side-nav-item__link--disabled),
  .side-nav-item__link--child:not(.side-nav-item__link--disabled) {
    cursor: pointer;
  }
  .side-nav-item__link:not(.side-nav-item__link--disabled):hover,
  .side-nav-item__link--child:not(.side-nav-item__link--disabled):hover,
  .side-nav-item__link--active:not(.side-nav-item__link--disabled) {
    color: #F9B868;
    background-color: #65AADB;
  }
  .side-nav-item__link.side-nav-item__link--active {
    border-left: #0F3C5C 5px solid;
    font-weight: bold;
  }
  .side-nav-item__link--child.side-nav-item__link--active {
    border-left: #0F3C5C 3px solid;
    font-weight: bold;
  }
  .side-nav-item__link.side-nav-item__link--disabled,
  .side-nav-item__link--child.side-nav-item__link--disabled,
  .side-nav-item__link.side-nav-item__link--disabled:hover,
  .side-nav-item__link--child.side-nav-item__link--disabled:hover {
    color: darkgray;
  }
  .side-nav-item__icon, .side-nav-item__icon--active {
    position: absolute;
    right: 10px;
    font-size: 20px;
  }
  .side-nav-item__icon:after {
    content: '\002B';
  }
  .side-nav-item__icon--active:after {
    content: '\2212';
  }

  .slide-enter, .slide-leave-to {
    opacity: 0;
  }
  .slide-enter-active, .slide-leave-active {
    transition: opacity .3s;
  }
</style>
