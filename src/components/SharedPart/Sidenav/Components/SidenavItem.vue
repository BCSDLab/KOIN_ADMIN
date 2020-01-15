<template>
  <li
    class="side-nav-item">
    <a
      :class="titleLinkStyle"
      @click="goLink()">
      <slot/>
    </a>
  </li>
</template>

<script>
  export default {
    name: "SidenavItem",
    props: {
      //router.push로 보낼 링크
      link: {
        type: String
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      goLink() {
        if(!this.disabled)
          if(this.link  !== this.$route.path)
            this.$router.push(this.link);
      }
    },
    computed: {
      titleLinkStyle() {
        return {
          'side-nav-item__link': true,
          'side-nav-item__link--active': '/' + this.$route.path.split('/')[1] === this.link,
          'side-nav-item__link--disabled': this.disabled
        };
      }
    }
  }
</script>

<style scoped>
  .side-nav-item{
    list-style-type: none;
  }

  .side-nav-item__link {
    cursor: default;
    display: flex;
    text-align: left;
    align-items: center;
    font-size: 17px;
    padding-left: 10px;
    height: 40px;
    -webkit-user-drag: element;
  }

  .side-nav-item__link:not(.side-nav-item__link--active) {
    color: white;
  }
  .side-nav-item__link:not(.side-nav-item__link--disabled) {
    cursor: pointer;
  }
  .side-nav-item__link:not(.side-nav-item__link--disabled):hover,
  .side-nav-item__link--active:not(.side-nav-item__link--disabled) {
    color: #F9B868;
    background-color: #65AADB;
  }
  .side-nav-item__link--active {
    border-left: #0F3C5C 5px solid;
    font-weight: bold;
  }
  .side-nav-item__link.side-nav-item__link--disabled,
  .side-nav-item__link.side-nav-item__link--disabled:hover {
    color: darkgray;
  }
</style>
