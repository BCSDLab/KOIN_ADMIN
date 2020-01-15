<template>
  <div class="col-sm-12">
    <div class="row page-title">
      <div class="col-md-6 col-8 align-self-center">
        <h3 class="mb-0 mt-0">User Platform</h3>
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a>Home</a>
          </li>
          <li class="breadcrumb-item">
            <a class="">User Platform</a>
          </li>
        </ol>
      </div>
      <div class="col-md-6 col-4 align-self-center">
        <a class="btn btn-create fa-pull-right" @click="createUser">유저 생성</a>
      </div>
    </div>
    <div class="card">
      <div class="user-table">
        <table>
          <thead>
            <tr>
              <th>uid</th>
              <th>계정</th>
              <th>닉네임</th>
              <th>이름</th>
              <th>학부</th>
              <th>학번</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="index" @click="readSpecificUser(user.id)">
              <td>{{ user.id }}</td>
              <td>{{ user.portal_account }}</td>
              <td>{{ user.nickname }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.major}}</td>
              <td>{{ user.student_number }}</td>
            </tr>
          </tbody>
        </table>
        <!-- <table>
          <thead>
            <tr>
              <th>admin Uid</th>
              <th>user Uid</th>
              <th>계정</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="adminUser in adminUsers" :key="adminUser.id">
              <td>{{ adminUser.id }}</td>
              <td>{{ adminUser.user_id }}</td>
              <td>{{ adminUser.users.portal_account }} </td>
              <td class="read" @click="readSpecificUser(adminUser.user_id)">보기</td>
            </tr>
          </tbody>
        </table> -->
      </div>  
    </div>
    <div class="pagination">
      <button class="arrow" @click="prev">이전</button>
      <button class="num" :class="{ active: n===pageNum }" v-for="n in maxPageNum" :key="n.id" @click="setPage(n)" v-if="Math.ceil(n / 5) === currentBlock">
        <span>{{ n }}</span>
      </button>
      <button class="arrow" @click="next">다음</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UserPlatform',
    data() {
      return {
        currentBlock: 1,
        pageNum: 1,
        maxPageNum: '',
        users: '',
        portal_account: undefined,
        password: undefined,
        nickname: undefined,
        name: undefined,
        major: undefined,
        student_number: undefined,
        gender: undefined,
        nicknames: [],
        nicknameFlag: false,
        originNickFlag: false,
        is_admin: false,
        majorList: ["기계공학부", "메카트로닉스공학부", "전기전자통신공학부", "컴퓨터공학부", "디자인·건축공학부", "에너지신소재화학공학부", "산업경영학부"],
        majorCode: ["120", "140", "161", "135", "136", "151", "174", "180"],
        adminUsers: ''
      }
    },
    methods: {
      getUsers () {
        console.log(this.pageNum);
        this.$store.dispatch('getUsers', {
          token: this.$session.get('token'),
          page: this.pageNum
        }).then(res => {
          this.users = res.data.items;
          this.maxPageNum = res.data.totalPage;
          for(let i = 0; i < res.data.items.length; i++){
            this.nicknames[i] = res.data.items[i].nickname;
          }
        }, error => {
          console.log(error);
        })
      },
      setPage (n) {
          this.pageNum = n;
          this.$session.set('nowPageNum', this.pageNum);
          this.getUsers();
      },
      prev () {
        if (this.currentBlock === 1) {
          alert('제일 첫 블록입니다.');
        } else {
          this.currentBlock--;
          this.pageNum = this.currentBlock * 5 - 4;
          this.$session.set('nowPageNum', this.pageNum);
          this.getUsers();
        }
      },
      next () {
        if (this.currentBlock === Math.ceil(this.maxPageNum / 5)) {
          alert('마지막 블록입니다.');
        } else {
          this.currentBlock++;
          this.pageNum = this.currentBlock * 5 - 4;
          this.$session.set('nowPageNum', this.pageNum);
          this.getUsers();
        }
      },
      updateGender (user, gender) {
        user.gender = gender;
      },
      setGender (value) {
        this.gender = value;
      },
      readSpecificUser (userId) {
        this.$router.push(`/user-platform/detail/${userId}`);
      },
      createUser () {
        this.$router.push('/user-platform/register');
        // if (this.nickname === '') this.nickname = undefined; // 닉네임 입력했다가 지울 경우
        // if (this.nickname === undefined) this.nicknameFlag = true; // 닉네임이 없으면 중복체크 할 필요 없음
        // if (this.student_number === '') this.student_number = undefined; // 학번 입력했다가 지울 경우
        // if (this.student_number !== undefined) { // 학번이 존재하면 검사
        //   let majorCode = this.student_number.substring(4, 7);
        //   let cnt = 0;
        //   if (this.student_number.length !== 10) {
        //     alert("학번은 10자리 숫자여야 합니다.");
        //     return;
        //   }
        //   if (this.student_number.substring(0, 4) < 1992 || this.student_number.substring(0, 4) > new Date().getFullYear()) {
        //     alert("올바른 입학년도가 아닙니다.");
        //     return;
        //   }
        //   for (let i = 0; i < this.majorCode.length; i++) {
        //     if (majorCode !== this.majorCode[i]) cnt++;
        //     if (cnt === 8) {
        //       alert('올바른 학부코드가 아닙니다.');
        //       return;
        //     }
        //   }
        // }
        // if (this.nicknameFlag === true) {
        //   if (confirm(`정말 ${this.portal_account}를 생성하겠습니까?`)) {
        //     this.$store.dispatch('createUser', {
        //       token: this.$session.get('token'),
        //       portal_account: this.portal_account,
        //       password: this.password,
        //       nickname: this.nickname,
        //       name: this.name,
        //       major: this.major,
        //       student_number: this.student_number,
        //       gender: this.gender
        //     }).then(flag => {
        //       if (flag) {
        //         alert('성공적으로 생성했습니다.');
        //         this.$router.go(0);
        //       }
        //     }, error => {
        //       console.log(error);
        //     })
        //   }
        // } else {
        //   alert('닉네임 중복체크를 해주세요.');
        //   return;
        // }
      },
      updateUser (user, index) {
        if (user.name === null || user.name === '') user.name = undefined;
        if (user.major === null || user.major === '') user.major = undefined;
        if (user.nickname === null) user.nickname = undefined; // 닉네임 없이 그대로 수정할 경우
        if (user.nickname === this.nicknames[index]) this.originNickFlag = true; // 원래 닉네임과 같을 경우
        if (user.student_number === null || user.student_number === '') user.student_number = undefined; // 학번 입력했다가 지우거나 없이 그대로 수정할 경우
        if (user.nickname === undefined) { // 닉네임이 없으면 중복체크 안함
          this.nicknameFlag = true; 
        }
        if (user.student_number !== undefined) { // 학번이 존재하면 검사
          let majorCode = user.student_number.substring(4, 7);
          let cnt = 0;
          if (user.student_number.length !== 10) {
            alert("학번은 10자리 숫자여야 합니다.");
            return;
          }
          if (user.student_number.substring(0, 4) < 1992 || user.student_number.substring(0, 4) > new Date().getFullYear()) {
            alert("올바른 입학년도가 아닙니다.");
            return;
          }
          for (let i = 0; i < this.majorCode.length; i++) {
            if (majorCode !== this.majorCode[i]) cnt++;
            if (cnt === 8) {
              alert('올바른 학부코드가 아닙니다.');
              return;
            }
          }
        }
        if (this.nicknameFlag || this.originNickFlag) {
          if (confirm(`정말 ${user.portal_account}를 수정하겠습니까?`)) {
            this.$store.dispatch('updateUser', {
              token: this.$session.get('token'),
              id: user.id,
              portal_account: user.portal_account,
              nickname: user.nickname, 
              name: user.name,
              major: user.major,
              student_number: user.student_number,
              gender: user.gender === null ? undefined : user.gender,
              originNickFlag: this.originNickFlag,
            }).then(flag => {
              if (flag) {
                alert('성공적으로 수정했습니다.');
                this.originNickFlag = false;
                this.nicknameFlag = false;
                this.$router.go(0);
              }
            }, error => {
              console.log(error);
              this.originNickFlag = false;
              this.nicknameFlag = false;
            })
          }
        } else {
          alert('닉네임 중복체크를 해주세요.');
          return;
        }
      },
      deleteUser (user) {
        if (confirm(`정말 ${user.portal_account}를 삭제하겠습니까?`)) {
          this.$store.dispatch('deleteUser', {
            token: this.$session.get('token'),
            id: user.id
          }).then(flag => {
            if (flag) {
              alert('성공적으로 삭제했습니다.');
              this.$router.go(0);
            }
          }, error => {
            console.log(error);
          })
        }
      },
      nicknameCheck (nickname, index) {
        if (nickname === '' || nickname === undefined) {
          alert('닉네임을 입력해주세요.');
          return;
        }
        if (index != undefined && this.nicknames[index] === nickname) {
          alert('기존에 등록된 닉네임입니다.');
          this.originNickFlag = true;
          return;
        }
        this.$store.dispatch('nicknameCheck', {
          nickname: nickname
        }).then(flag => {
          if (flag) this.nicknameFlag = true;
        }, error => {
          console.log(error);
          this.nicknameFlag = false;
        })
      },
      setMajorByStudentNumber() {
        let majorCode;
        if (this.student_number !== undefined)
          majorCode = this.student_number.substring(4, 7);
        if (majorCode === '120') {
          this.major = '기계공학부';
        } else if (majorCode === '140') {
          this.major = '메카트로닉스공학부';
        } else if (majorCode === '161') {
          this.major = '전기전자통신공학부';
        } else if (majorCode === '136' || majorCode === '135') {
          this.major = '컴퓨터공학부';
        } else if (majorCode === '151') {
          this.major = '디자인·건축공학부';
        } else if (majorCode === '174') {
          this.major = '에너지신소재화학공학부';
        } else if (majorCode === '180') {
          this.major = '산업경영학부';
        } else {
          this.major = undefined;
        }
      },
      updateMajorByStudentNumber() {
        let majorCode;
        if (this.users === undefined) return undefined;
        for (let i = 0; i < this.users.length; i++) {
          if (this.users[i].student_number !== null)
            majorCode = this.users[i].student_number.substring(4, 7);
          if (majorCode === '120') {
            this.users[i].major = '기계공학부';
          } else if (majorCode === '140') {
            this.users[i].major = '메카트로닉스공학부';
          } else if (majorCode === '161') {
            this.users[i].major = '전기전자통신공학부';
          } else if (majorCode === '136' || majorCode === '135') {
            this.users[i].major = '컴퓨터공학부';
          } else if (majorCode === '151') {
            this.users[i].major = '디자인·건축공학부';
          } else if (majorCode === '174') {
            this.users[i].major = '에너지신소재화학공학부';
          } else if (majorCode === '180') {
            this.users[i].major = '산업경영학부';
          } else {
            this.users[i].major = undefined;
          }
          majorCode = undefined;
        }
      },
      getAdminPermissions () {
        this.$store.dispatch('getAdminPermissions', {
          token: this.$session.get('token')
        }).then(res => {
          this.adminUsers = res.data.admins;
        }, error => {
          console.log(error);
        });
      }
    },
    created () {
      this.pageNum = this.$session.get('nowPageNum') !== undefined ? this.$session.get('nowPageNum') : 1;
      // this.currentBlock = Math.ceil(this.pageNum / 5);
      this.getUsers();
      this.getAdminPermissions();
    },
    updated () {
      this.setMajorByStudentNumber();
      // this.updateMajorByStudentNumber();
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        if(from.path.match(to.path) === null) {
          console.log('다른 곳에서 들어옴');
          vm.pageNum = 1;
          vm.$session.set('nowPageNum', 1);
          vm.getUsers();
        } else {
          console.log('디테일에서 들어옴');
          vm.currentBlock = Math.ceil(vm.pageNum / 5);
          vm.getUsers();
        }
      });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.breadcrumb {
  background: transparent;
  padding-left: 0;
}
.card {
  margin-top: 20px; 
}
.user-table {
  background-color: #fff;
  padding: 20px;
}
.pagination { 
  margin: 20px auto;
  justify-content: center;
}
.arrow { 
  width: 60px;
  height: 40px;
  background-color: transparent;
  border: 1px solid #666666;
  color: #666666;
  cursor: pointer;
  font-size: 13px;
}
.num { 
  margin: 0 1px;
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: 1px solid #666666;
  color: #666666;
  cursor: pointer;
  font-size: 13px;
}
.active { background-color: #175c8e!important; color: #fff!important; }

table { width: 100%; }
thead tr th:first-child { width: 5%; }
thead tr th:nth-child(1n + 2) { width: 15%; }
table th, table td { padding: 1rem 2rem;}
table td { border-top: 1px solid #eceeef; }
table tbody tr { cursor: pointer; }
table tbody tr:hover { background: #dbdcdd; }
.btn-create {
  background: #ff7f00;
  color: #fff!important;
  border: 1px solid #ff7f00;
}
.btn-create:hover {
  background: transparent;
  color: #ff7f00!important;
}
</style>
