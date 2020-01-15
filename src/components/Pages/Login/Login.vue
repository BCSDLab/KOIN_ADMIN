<template>
  <div class="login offset-3 col-md-6">
    <b-jumbotron>
      <template v-slot:header=""><b>KOIN ADMIN</b></template>

      <template v-slot:lead="">
        Please log in with your Admin account to use this website.
      </template>

      <hr class="my-4">

      <p>

      </p>

      <b-alert
        variant="danger"
        show>Your ip and some browser information is saved when you log in.
      </b-alert>

      <b-form-input
        v-model="userId"
        placeholder="Enter your Admin Account">
      </b-form-input>
      <br>
      <b-form-input
        type="password"
        v-model="userPw"
        @keyup="enter"
        placeholder="Enter your Admin Password">
      </b-form-input>

      <br>
      <b-button
        variant="dark"
        @click="clickLogin"
        block
      >Login</b-button>
    </b-jumbotron>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        userId: "",
        userPw: ""
      }
    },
    methods: {
      clickLogin: function() {
        this.$store.dispatch("login", {
          userId: this.userId,
          userPw: this.userPw
        }).then((res)=> {
          // 새로고침, 뒤로가기 시 token 유지를 위해 session에 보관
          // TODO: 전역 라우팅 가드 설정
          this.$session.set("token", res.data.token);
          this.$session.set("userInfo", res.data.user);

          this.$router.push("/");
        }).catch((err)=> {
          switch(err) {
            case 412:
              alert("입력방식이 올바르지 않습니다");
              break;

            case 401:
              alert("비밀번호가 틀렸습니다.");
              break;

            case 422:
              alert("빈값을 입력하셨습니다.");
              break;

            default:
              alert("비밀번호가 올바르지 않습니다.");
              break;

          }
        })
      },
      enter: function (e) {
        if (e.keyCode === 13)
          this.clickLogin();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login {
    margin-top: 15%;
  }

  .jumbotron {
    background: #f5f5f5;
  }
</style>
