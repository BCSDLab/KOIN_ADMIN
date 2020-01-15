<template>
  <div class="container" :style="{ display: this.$session.get('token') === undefined ? 'block' : 'none' }">
    <div class="login">
      <img
        class="logo"
        src="https://static.koreatech.in/assets/img/logo_primary.png">
      <h2>ADMIN</h2>
      <div class="id">
        <input class="form-control" type="text" v-model="id" placeholder="ID" @keyup.enter="login">
      </div>
      <div class="password">
        <input class="form-control" type="password" v-model="pw" placeholder="PASSWORD" @keyup.enter="login">
      </div>
      <div class="second-password">
        <input class="form-control" type="password" v-model="pw2" placeholder="SECOND PASSWORD" @keyup.enter="login">
      </div>
      <div>
        <button class="login-btn" @click="login">LOGIN</button>
      </div>
    </div>
  </div>
</template>

<script>
  import sha256 from "sha256";

  export default {
    name: 'Login',
    data() {
      return {
        id: '',
        pw: '',
        pw2: '',
        hashedPW2: '',
      }
    },
    methods: {
      login() {
        if (this.id === '' || this.id === undefined) {
          alert('ID를 입력하세요');
          return;
        }
        if (this.pw === '' || this.pw === undefined) {
          alert('비밀번호를 입력하세요');
          return;
        }
        if (sha256(this.pw2) === this.hashedPW2) {
          this.$store.dispatch('login', {
            id: this.id,
            pw: this.pw
          }).then(data => {
            this.$session.set('userInfo', data[0]);
            this.$session.set("token", data[1]);
            this.$router.push('/dashboard');
          }, error => {
            console.log(error);
          })
        } else {
          alert('2단계 인증 비밀번호가 틀렸습니다.');
          return;
        }
      }
    },
    created() {
      this.hashedPW2 = sha256('rhrnak');
      if (this.$session.get('token') !== undefined && this.$session.get('token') !== null) {
        this.$router.push('/dashboard');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    min-height: 700px;
  }

  .login {
    padding: 150px 0;
    width: 100%;
    text-align: center;
  }

  .logo {
    margin: 50px 70px 10px 50px;
    width: 200px;
  }

  input {
    margin: 5px auto;
    width: 250px;
    height: 30px;
    font-size: 15px;
    border-radius: 5px;
    color: black;
  }

  .login-btn {
    background-color: #175c8e;
    color: #ffffff;
    width: 250px;
    height: 40px;
    font-size: 20px;
    border-radius: 5px;
    margin-top: 5px;
    cursor: pointer;
  }

  .login-btn:hover {
    background-color: #ffffff;
    border: 1px solid #175c8e;
    color: #175c8e;
  }

  h2 {
    margin-bottom: 30px;
    font-weight: 800;
    color: #175c8e;
  }
</style>
