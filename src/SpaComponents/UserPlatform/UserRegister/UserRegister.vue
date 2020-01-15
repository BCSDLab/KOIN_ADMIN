<template>
  <div class="col-sm-12">
      <div class="row page-title">
        <div class="col-md-6 col-8 align-self-center">
          <h3 class="mb-0 mt-0">User Register</h3>
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a>Home</a>
            </li>
            <li class="breadcrumb-item">
              <a class="">User Platform</a>
            </li>
            <li class="breadcrumb-item">
              <a class="">User Register</a>
            </li>
          </ol>
        </div>
        <div class="col-md-6 col-4 align-self-center">
          <a class="btn btn-create fa-pull-right" @click="createUser">유저 생성</a>
        </div>
      </div>
      <div class="card">
        <table>
          <thead>
            <tr>
              <th>계정 <span style="color: red">*</span></th>
              <th>비밀번호 <span style="color: red">*</span></th>
              <th>닉네임</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input class="form-control" type="text" v-model="portal_account"></td>
              <td><input class="form-control" type="password" v-model="password"></td>
              <td>
                <input class="form-control" type="text" v-model="nickname" style="width: 50%; display: inline-block;">
                <button class="btn btn-check" @click="nicknameCheck(nickname)">중복체크</button>
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>전공</th>
              <th>학번</th>
              <th>연락처</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input class="form-control" type="text" v-model="name"></td>
              <td><input class="form-control" type="text" v-model="major" readonly></td>
              <td><input class="form-control" type="text" v-model="student_number"></td>
              <td><input class="form-control" type="text" v-model="phone_number"></td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>성별</th>
              <th>신분</th>
              <th>졸업 여부</th>
              <th>로그인 허용</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="category">
                <label class="btn" :class="{ active: gender === 0 }" for="male">남자</label>
                <input id="male" type="radio" :checked="gender===0" @click="setGender(0)">
                <label class="btn" :class="{ active: gender === 1 }" for="female">여자</label>
                <input id="female" type="radio" :checked="gender===1" @click="setGender(1)">
              </td>
              <td class="category">
                <label class="btn" :class="{ active: identity === 0 }" for="identity1">학부생</label>
                <input id="identity1" type="radio" :checked="identity === 0" @click="setIdentitiy(0)">
                <label class="btn" :class="{ active: identity === 1 }" for="identity2">대학원생</label>
                <input id="identity2" type="radio" :checked="identity === 1" @click="setIdentitiy(1)">
                <label class="btn" :class="{ active: identity === 2 }" for="identity3">교수</label>
                <input id="identity3" type="radio" :checked="identity === 2" @click="setIdentitiy(2)">
                <label class="btn" :class="{ active: identity === 3 }" for="identity4">교직원</label>
                <input id="identity4" type="radio" :checked="identity === 3" @click="setIdentitiy(3)">
              </td>
              <td>
                <input id="graduated" type="checkbox" :checked="is_graduated" @click="setIsGraduated">
                <label for="graduated"></label>
              </td>
              <td>
                <input id="allow" type="checkbox" :checked="is_authed" @click="setIsAuthed">
                <label for="allow"></label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
        <!-- <table>
          <thead>
            <tr>
              <th>Admin Uid</th>
              <th>콜밴</th>
              <th>유저</th>
              <th>상점</th>
              <th>커뮤니티</th>
              <th>버전</th>
              <th>원룸</th>
              <th>중고장터</th>
              <th>동아리</th>
              <th>숨김</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-show="!adminFlag">
              <td></td>
              <td><input type="checkbox" :checked="permissions[0]" @click="setPermission(0)"></td>
              <td><input type="checkbox" :checked="permissions[1]" @click="setPermission(1)"></td>
              <td><input type="checkbox" :checked="permissions[2]" @click="setPermission(2)"></td>
              <td><input type="checkbox" :checked="permissions[3]" @click="setPermission(3)"></td>
              <td><input type="checkbox" :checked="permissions[4]" @click="setPermission(4)"></td>
              <td><input type="checkbox" :checked="permissions[5]" @click="setPermission(5)"></td>
              <td><input type="checkbox" :checked="permissions[6]" @click="setPermission(6)"></td>
              <td><input type="checkbox" :checked="permissions[7]" @click="setPermission(7)"></td>
              <td><input type="checkbox" :checked="permissions[8]" @click="setPermission(8)"></td>
              <td class="create" @click="setAdminPermission">권한 부여</td>
              <td></td>
            </tr>
            <tr v-show="adminFlag">
              <td>{{ adminPermission.id }}</td>
              <td><input type="checkbox" :checked="adminPermission.grant_callvan" @click="updatePermission(adminPermission, 0)"></td>
              <td><input type="checkbox" :checked="adminPermission.grant_user" @click="updatePermission(adminPermission, 1)"></td>
              <td><input type="checkbox" :checked="adminPermission.grant_shop" @click="updatePermission(adminPermission, 2)"></td>
              <td><input type="checkbox" :checked="adminPermission.grant_community" @click="updatePermission(adminPermission, 3)"></td>
              <td><input type="checkbox" :checked="adminPermission.grant_version" @click="updatePermission(adminPermission, 4)"></td>
              <td><input type="checkbox" :checked="adminPermission.grant_land" @click="updatePermission(adminPermission, 5)"></td>
              <td><input type="checkbox" :checked="adminPermission.grant_market" @click="updatePermission(adminPermission, 6)"></td>
              <td><input type="checkbox" :checked="adminPermission.grant_circle" @click="updatePermission(adminPermission, 7)"></td>
              <td><input type="checkbox" :checked="adminPermission.is_deleted" @click="updatePermission(adminPermission, 8)"></td>
              <td class="update" @click="updateAdminPermission">권한 수정</td>
              <td class="delete" @click="withdrawAdminPermission">권한 삭제</td>
            </tr>
          </tbody>
        </table> -->
      <!-- </div> -->
  </div>
</template>

<script>
  export default {
    name: 'UserDetail',
    data() {
      return {
        portal_account: undefined,
        password: undefined,
        name: undefined,
        nickname: undefined,
        major: undefined,
        student_number: undefined,
        phone_number: undefined,
        gender: undefined,
        identity: undefined,
        is_graduated: false,
        is_authed: false,
        adminFlag: false,
        adminPermission: '',
        permissions: [false, false, false, false, false, false, false, false, false],
        adminIsDeleted: false,
        majorList: ["기계공학부", "메카트로닉스공학부", "전기전자통신공학부", "컴퓨터공학부", "디자인·건축공학부", "에너지신소재화학공학부", "산업경영학부"],
        majorCode: ["120", "140", "161", "135", "136", "151", "174", "180"],
        originNickname: '',
        nicknameFlag: false,
        originNickFlag: false,
        phoneNumberChecker: /^\d{3}-\d{3,4}-\d{4}$/,
      }
    },
    methods: {
      nicknameCheck (nickname) {
        if (nickname === '' || nickname === undefined) {
          alert('닉네임을 입력해주세요.');
          return;
        }
        if (this.originNickname === nickname) {
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
      setGender (gender) {
        this.gender = gender;
      },
      setIsAuthed () {
        this.is_authed = !this.is_authed;
      },
      setIsGraduated () {
        this.is_graduated = !this.is_graduated;
      },
      setIdentitiy (value) {
        this.identity = value;
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
      createUser () {
        if (this.nickname === '') this.nickname = undefined; // 닉네임 입력했다가 지울 경우
        if (this.nickname === undefined) this.nicknameFlag = true; // 닉네임이 없으면 중복체크 할 필요 없음
        if (this.student_number === '') this.student_number = undefined; // 학번 입력했다가 지울 경우
        if (this.student_number !== undefined) { // 학번이 존재하면 검사
          let majorCode = this.student_number.substring(4, 7);
          let cnt = 0;
          if (this.student_number.length !== 10) {
            alert("학번은 10자리 숫자여야 합니다.");
            return;
          }
          if (this.student_number.substring(0, 4) < 1992 || this.student_number.substring(0, 4) > new Date().getFullYear()) {
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
        if (this.password === '' || this.password === undefined) {
          alert('비밀번호를 입력해주세요.');
          return;
        }
        if (this.nicknameFlag === true) {
          if (confirm(`정말 ${this.portal_account}를 생성하겠습니까?`)) {
            this.$store.dispatch('createUser', {
              token: this.$session.get('token'),
              portal_account: this.portal_account,
              password: this.password,
              nickname: this.nickname,
              name: this.name,
              major: this.major,
              student_number: this.student_number,
              phone_number: this.phone_number,
              gender: this.gender,
              is_graduated: this.is_graduated,
              identity: this.identity,
              is_authed: this.is_authed
            }).then(flag => {
              if (flag) {
                alert('성공적으로 생성했습니다.');
                this.$router.go(-1);
              }
            }, error => {
              console.log(error);
            })
          }
        } else {
          alert('닉네임 중복체크를 해주세요.');
          return;
        }
      },
    },
    created () {
    },
    updated () {
      this.setMajorByStudentNumber();
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
table { width: 100%; }
thead tr th:first-child { width: 5%; }
thead tr th:nth-child(1n + 2) { width: 15%; }
table th, table td { padding: 1rem 2rem;}
table td { border-top: 1px solid #eceeef; }
.category input[type=radio] {
    display: none;
}
.category .active { 
    font-weight: 700;
    background: #ffa500;
    color: #ffffff;
}
.category label {
    margin-right: 10px;
    padding: 5px 10px;
    border: 1px solid #ffa500;
    color: #ffa500;
}
input[type=checkbox] {
  display: none;
}

input[type=checkbox] + label {
  display: inline-block;
  cursor: pointer;
  position: relative;
  padding-left: 7%;
}

input[type=checkbox] + label:before {
  content: "";
  width: 16px;
  height: 16px;
  position: absolute;
  left: 0;
  bottom: 1px;
  background-color: #ffffff;
  border: 1px solid #d2dae2;
  line-height: 13px;
}

input[type=checkbox]:checked + label:before {
  content: "";
  background-image: url("./../../../assets/check.png");
  background-size: cover;
}
.card table:nth-child(2) thead tr th { width: 10% }
.card table:nth-child(3) thead tr th { width: 5% }
.card table:nth-child(3) thead tr th:nth-child(2) { width: 10% }
.btn-check {
  background: #ff7f00;
  color: #fff!important;
  border: 1px solid #ff7f00;
}
.btn-check:hover {
  background: transparent;
  color: #ff7f00!important;
}
.btn-create {
  background: #175c8e;
  color: #fff!important;
  border: 1px solid #175c8e;
  margin-right: 10px;
}
.btn-create:hover {
  background: transparent;
  color: #175c8e!important;
}
</style>
