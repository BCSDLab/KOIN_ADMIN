<template>
  <div class="this">
    <img src="../assets/logo.png"><br>
    Koin Admin Page<br>
    <input class="my-box" type="text" v-model="id" placeholder="id"><br>
    <input class="my-box" type="password" v-model="pw" v-on:keyup="enter" value="" placeholder="password"><br>
    <button class="my-btn" @click="login">Login</button>
  </div>
</template>

<style lang="css">
  .my-box {
    margin-top: 10px;
    width: 131px;
    height: 20px;
    font-size: 0.8rem;
  }

  .my-box:focus {
    outline: none;
  }

  .my-btn {
    width: 131px;
    margin-top: 10px;
    border: 1px solid #c2c2c2;
    touch-action: manipulation;
    cursor: pointer;
    height: 20px;
    font-size: 0.8rem;
  }

  .my-btn:focus {
    outline: none;
  }

  .my-btn:active {
    background: #efefef;
    outline: none;
    position: relative;
    display: inline-block;
    border: 1px solid #c2c2c2;
  }

  img {
    margin-top: 150px;
  }

  .this {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }
</style>


<script>
  import axios from 'axios';
  import sha256 from 'sha256';

  export default {
    name: 'Login',
    data() {
      return {
        id: '',
        pw: ''
      }
    },
    methods: {
      login: function (e) {
        axios.post('http://api.koreatech.in/auth/login', {userId: this.id, userPw: sha256(this.pw)})
          .then((res) => {
            if (res.data.user.admin === true) {
              this.$session.set("admin", true);
              this.$session.set("token", res.data.token);
              this.$router.push("./admin");
            }
            else {
              alert("접근 권한이 없습니다.");
            }
          })
          .catch((ex) => {
            alert("Id 혹은 Password를 확인해주세요.");
          })
      },
      //pw 입력 후 엔터 시 로그인
      enter: function (e) {
        if (e.keyCode == 13)
          this.login();
      }
    },
    created: function () {
      this.$session.set("admin", false);
    }
  }
</script>
