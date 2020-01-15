<template>
  <div class="container" :style="{ display: this.$session.get('token') === undefined ? 'none' : 'block' }">
    <div class="header" @click="goUrl('/')">
      <img class="logo" src="https://static.koreatech.in/assets/img/logo_primary.png" alt="">
      <div class="title">ADMIN PAGE</div>
    </div>

    <ul class="main-menu">
      <li class="menu-item" :class="{ active: isActive === 1}"><a @click="goUrl('/dashboard')"><i
        class="fas fa-chart-line"></i>대시보드</a></li>
      <li class="menu-item" :class="{ active: isActive === 2}"><a @click="goUrl('/user-platform')"><i
        class="fas fa-users"></i>회원플랫폼</a></li>
      <li class="menu-item" :class="{ active: isActive === 3}"><a @click="goUrl('/school-info/stores')"><i
        class="fas fa-university"></i>학교정보</a>
        <ul class="sub-menu">
          <li class="sub-menu-item"><a @click="goUrl('/school-info/stores')"><i class="fas fa-store"></i>주변상점</a></li>
          <li class="sub-menu-item"><a @click="ready"><i class="fas fa-utensils"></i>식단</a></li>
          <li class="sub-menu-item"><a @click="goUrl('/school-info/faq')"><i class="fas fa-question-circle"></i>FAQ</a>
          </li>
        </ul>
      </li>
      <li class="menu-item parent" :class="{ active: isActive === 4}"><a @click="goUrl('/community/board/free')"><i
        class="fas fa-comments"></i>커뮤니티</a>
        <ul class="sub-menu">
          <li class="sub-menu-item" @click="goUrl('/community/board/free')"><a><i class="fas fa-comment"></i>자유게시판</a>
          </li>
          <li class="sub-menu-item" @click="goUrl('/community/board/job')"><a><i class="fas fa-comment"></i>취업게시판</a>
          </li>
          <li class="sub-menu-item" @click="goUrl('/community/board/anonymous')"><a><i class="fas fa-comment-dots"></i>익명게시판</a>
          </li>
        </ul>
      </li>
      <li class="menu-item" :class="{ active: isActive === 5}"><a @click="goUrl('/used-market/sell')"><i
        class="fas fa-store-alt"></i>중고장터</a>
        <ul class="sub-menu">
          <li class="sub-menu-item" @click="goUrl('/used-market/sell')"><a><i class="fas fa-comment"></i>팝니다</a></li>
          <li class="sub-menu-item" @click="goUrl('/used-market/buy')"><a><i class="fas fa-comment"></i>삽니다</a></li>
        </ul>
      </li>
      <li class="menu-item" :class="{ active: isActive === 6}"><a @click="goUrl('/circles')"><i
        class="fas fa-user-circle"></i>동아리</a></li>
      <li class="menu-item" :class="{ active: isActive === 8}"><a @click="goUrl('/rooms')"><i class="fas fa-home"></i>복덕방</a></li>
      <li class="menu-item"><a @click="ready"><i class="fas fa-star-half-alt"></i>평가시스템</a></li>
      <li class="menu-item"><a @click="logout"><i class="fas fa-power-off"></i>로그아웃</a></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Sidebar',
    data() {
      return {
        isActive: 0,
        currentPath: this.$router.history.current.path.split('/')
      }
    },
    methods: {
      goUrl(url) {
        this.$router.push(url);
        this.setIsActive();
      },
      ready() {
        alert('서비스 준비 중입니다.');
      },
      logout() {
        console.log("ddd");
        this.$store.dispatch('logout', {
          token: this.$session.get('token')
        }).then((flag) => {
          console.log(flag);
          if (flag) {
            alert('로그아웃 안전하게 되었습니다.');
            this.$session.clear("token");
            this.$session.clear("userInfo");
            this.$router.push('/');
          } else {
            alert('네트워크 확인을 해주세요.');
            this.$session.clear("token");
            this.$session.clear("userInfo");
            this.$router.push('/');
          }
        }, (error) => {
          console.log(error);
        })
        console.log(this.$session.get('token'));
      },
      setIsActive() {
        this.currentPath = this.$router.history.current.path.split('/');
        if (this.currentPath[1] === 'dashboard') this.isActive = 1;
        else if (this.currentPath[1] === 'user-platform') this.isActive = 2;
        else if (this.currentPath[1] === 'school-info') this.isActive = 3;
        else if (this.currentPath[1] === 'community') this.isActive = 4;
        else if (this.currentPath[1] === 'used-market') this.isActive = 5;
        else if (this.currentPath[1] === 'circles') this.isActive = 6;
        else if (this.currentPath[1] === 'recruit') this.isActive = 7;
        else if (this.currentPath[1] === 'rooms') this.isActive = 8;
      }
    },
    created() {
      this.setIsActive();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    /* width: 200px; */
    height: 100vh;
    background-color: #ffffff;
    padding: 10px 0;
  }

  .main-menu, .sub-menu {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .main-menu a {
    display: block;
    background-color: #ffffff;
    color: #54667a;
    text-decoration: none;
    padding: 15px 10px;
  }

  .main-menu a:hover {
    color: #009efb;
    font-weight: 700;
  }

  .main-menu li:hover .sub-menu {
    display: block;
    max-height: 200px;
  }

  .sub-menu a {
    background-color: #ffffff;
  }

  .sub-menu a:hover {
    color: #009efb;
    font-weight: 700;
  }

  .sub-menu {
    overflow: hidden;
    max-height: 0;
    -webkit-transition: all 0.5s ease-out;
  }

  li {
    cursor: pointer;
  }

  li a i {
    width: 20px;
    height: 20px;
    margin-left: 10px;
    margin-right: 20px;
  }

  .active {
    font-weight: 700;
    border-left: 4px solid #009efb;
    color: #175c8e;
  }

  .active > a {
    background-color: #f2f7f8;
    color: #009efb;
  }

  .logo {
    width: 200px;
    padding: 20px;
  }

  .title {
    width: 240px;
    text-align: center;
    padding-bottom: 20px;
    margin-bottom: 20px;
    font-weight: 800;
    font-size: 20px;
    border-bottom: 30px #f2f7f8 solid;
  }

  .header {
    cursor: pointer;
  }
</style>
