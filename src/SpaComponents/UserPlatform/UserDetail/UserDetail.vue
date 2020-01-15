<template>
  <div class="col-sm-12">
      <div class="row page-title">
        <div class="col-md-6 col-8 align-self-center">
          <h3 class="mb-0 mt-0">User Detail</h3>
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a>Home</a>
            </li>
            <li class="breadcrumb-item">
              <a class="">User Platform</a>
            </li>
            <li class="breadcrumb-item">
              <a class="">User Detail</a>
            </li>
          </ol>
        </div>
        <div class="col-md-6 col-4 align-self-center">
          <a class="btn btn-delete fa-pull-right" @click="deleteUser(user)">유저 삭제</a>
          <a class="btn btn-update fa-pull-right" @click="updateUser(user)">유저 수정</a>
        </div>
      </div>
      <div class="card">
        <table>
          <thead>
            <tr>
              <th>uid <span style="color: red">*</span></th>
              <th>계정 <span style="color: red">*</span></th>
              <th>닉네임</th>
              <th>익명 닉네임</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input class="form-control" type="text" v-model="user.id"></td>
              <td><input class="form-control" type="text" v-model="user.portal_account"></td>
              <td>
                <input class="form-control" type="text" v-model="user.nickname" style="width: 50%; display: inline-block;">
                <button class="btn btn-check" @click="nicknameCheck(user.nickname)">중복체크</button>
              </td>
              <td><input class="form-control" type="text" v-model="user.anonymous_nickname"></td>
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
              <td><input class="form-control" type="text" v-model="user.name"></td>
              <td><input class="form-control" type="text" v-model="user.major" readonly></td>
              <td><input class="form-control" type="text" v-model="user.student_number"></td>
              <td><input class="form-control" type="text" v-model="user.phone_number"></td>
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
                <label class="btn" :class="{ active: user.gender === 0 }" for="male">남자</label>
                <input id="male" type="radio" :checked="user.gender===0" @click="updateGender(user, 0)">
                <label class="btn" :class="{ active: user.gender === 1 }" for="female">여자</label>
                <input id="female" type="radio" :checked="user.gender===1" @click="updateGender(user, 1)">
              </td>
              <td class="category">
                <label class="btn" :class="{ active: user.identity === 0 }" for="identity1">학부생</label>
                <input id="identity1" type="radio" :checked="user.identity === 0" @click="updateIdentitiy(user, 0)">
                <label class="btn" :class="{ active: user.identity === 1 }" for="identity2">대학원생</label>
                <input id="identity2" type="radio" :checked="user.identity === 1" @click="updateIdentitiy(user, 1)">
                <label class="btn" :class="{ active: user.identity === 2 }" for="identity3">교수</label>
                <input id="identity3" type="radio" :checked="user.identity === 2" @click="updateIdentitiy(user, 2)">
                <label class="btn" :class="{ active: user.identity === 3 }" for="identity4">교직원</label>
                <input id="identity4" type="radio" :checked="user.identity === 3" @click="updateIdentitiy(user, 3)">
              </td>
              <td>
                <input id="graduated" type="checkbox" :checked="user.is_graduated" @click="updateIsGraduated(user)">
                <label for="graduated"></label>
              </td>
              <td>
                <input id="allow" type="checkbox" :checked="user.is_authed" @click="updateIsAuthed(user)">
                <label for="allow"></label>
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th colspan="4">최근 로그인</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="4">{{ user.last_logged_at }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card admin">
        <table>
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
            <tr class="admin-create" v-show="!adminFlag">
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
              <td><a class="btn btn-create" @click="setAdminPermission">권한 부여</a></td>
              <td></td>
            </tr>
            <tr class="admin-update" v-show="adminFlag">
              <td>{{ adminPermission.id }}</td>
              <td>
                <input id="callvan" type="checkbox" :checked="adminPermission.grant_callvan" @click="updatePermission(adminPermission, 0)">
                <label for="callvan"></label>
              </td>
              <td>
                <input id="user" type="checkbox" :checked="adminPermission.grant_user" @click="updatePermission(adminPermission, 1)">
                <label for="user"></label>
              </td>
              <td>
                <input id="store" type="checkbox" :checked="adminPermission.grant_shop" @click="updatePermission(adminPermission, 2)">
                <label for="store"></label>
              </td>
              <td>
                <input id="community" type="checkbox" :checked="adminPermission.grant_community" @click="updatePermission(adminPermission, 3)">
                <label for="community"></label>
              </td>
              <td>
                <input id="version" type="checkbox" :checked="adminPermission.grant_version" @click="updatePermission(adminPermission, 4)">
                <label for="version"></label>
              </td>
              <td>
                <input id="land" type="checkbox" :checked="adminPermission.grant_land" @click="updatePermission(adminPermission, 5)">
                <label for="land"></label>
              </td>
              <td>
                <input id="market" type="checkbox" :checked="adminPermission.grant_market" @click="updatePermission(adminPermission, 6)">
                <label for="market"></label>
              </td>
              <td>
                <input id="circle" type="checkbox" :checked="adminPermission.grant_circle" @click="updatePermission(adminPermission, 7)">
                <label for="circle"></label>
              </td>
              <td>
                <input id="is_deleted" type="checkbox" :checked="adminPermission.is_deleted" @click="updatePermission(adminPermission, 8)">
                <label for="is_deleted"></label>
              </td>
              <td><a class="btn btn-update" @click="updateAdminPermission">권한 수정</a></td>
              <td><a class="btn btn-delete" @click="withdrawAdminPermission"> 권한 삭제</a></td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'UserDetail',
    data() {
      return {
        adminFlag: false,
        adminPermission: '',
        permissions: [false, false, false, false, false, false, false, false, false],
        adminIsDeleted: false,
        user: '',
        majorList: ["기계공학부", "메카트로닉스공학부", "전기전자통신공학부", "컴퓨터공학부", "디자인·건축공학부", "에너지신소재화학공학부", "산업경영학부"],
        majorCode: ["120", "140", "161", "135", "136", "151", "174", "180"],
        originNickname: '',
        nicknameFlag: false,
        originNickFlag: false,
        phoneNumberChecker: /^\d{3}-\d{3,4}-\d{4}$/,
      }
    },
    methods: {
      getSpecificUser () {
        this.$store.dispatch('getSpecificUser', {
            token: this.$session.get('token'),
            id: this.$router.history.current.path.split('/')[3]
        }).then(res => {
            this.user = res.data;
            this.originNickname = res.data.nickname;
            this.getAdminPermissions();
        }, error => {
            console.log(error);
        })
      },
      updateUser (user) {
        if (user.name === null || user.name === '') user.name = undefined;
        if (user.major === null || user.major === '') user.major = undefined;
        if (user.phone_number === null || user.phone_number === '') user.phone_number = undefined;
        if (user.nickname === null) user.nickname = undefined; // 닉네임 없이 그대로 수정할 경우
        if (user.nickname === this.originNickname) this.originNickFlag = true; // 원래 닉네임과 같을 경우
        if (user.student_number === null || user.student_number === '') user.student_number = undefined; // 학번 입력했다가 지우거나 없이 그대로 수정할 경우
        if (user.gender === null) user.gender = undefined;
        if (user.nickname === undefined) { // 닉네임이 없으면 중복체크 안함
          this.nicknameFlag = true; 
        }
        if (user.phone_number !== undefined && !this.phoneNumberChecker.test(user.phone_number)) {
          alert("전화번호 양식을 지켜주세요. (Ex: 010-1234-5678)");
          return;
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
              name: user.name,
              nickname: user.nickname,
              student_number: user.student_number,
              major: user.major,
              identity: user.identity,
              is_graduated: user.is_graduated,
              phone_number: user.phone_number,
              gender: user.gender,
              is_authed: user.is_authed,
              originNickFlag: this.originNickFlag,
            }).then(flag => {
              if (flag) {
                alert('성공적으로 수정했습니다.');
                this.$router.go(0);
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
      deleteUser (user) {
        if (confirm(`정말 ${user.portal_account}를 삭제하겠습니까?`)) {
          this.$store.dispatch('deleteUser', {
            token: this.$session.get('token'),
            id: user.id
          }).then(flag => {
            if (flag) {
              alert('성공적으로 삭제했습니다.');
              this.$router.go(-1);
            }
          }, error => {
            console.log(error);
          })
        }
      },
      updateGender (user, gender) {
        user.gender = gender;
      },
      updateIsAuthed (user) {
        user.is_authed = !user.is_authed;
      },
      updateIsGraduated (user) {
        user.is_graduated = !user.is_graduated;
      },
      updateIdentitiy (user, value) {
        user.identity = value;
      },
      updateMajorByStudentNumber() {
        let majorCode;
        if (this.user === undefined) return undefined;
        if (this.user.student_number !== null && this.user.student_number !== undefined)
          majorCode = this.user.student_number.substring(4, 7);
        if (majorCode === '120') {
          this.user.major = '기계공학부';
        } else if (majorCode === '140') {
          this.user.major = '메카트로닉스공학부';
        } else if (majorCode === '161') {
          this.user.major = '전기전자통신공학부';
        } else if (majorCode === '136' || majorCode === '135') {
          this.user.major = '컴퓨터공학부';
        } else if (majorCode === '151') {
          this.user.major = '디자인·건축공학부';
        } else if (majorCode === '174') {
          this.user.major = '에너지신소재화학공학부';
        } else if (majorCode === '180') {
          this.user.major = '산업경영학부';
        } else {
          this.user.major = undefined;
        } 
      },
      getAdminPermissions () {
        this.$store.dispatch('getAdminPermissions', {
          token: this.$session.get('token')
        }).then(res => {
          for(let i = 0; i < res.data.admins.length; i++) {
            if (res.data.admins[i].users === null) continue;
            if (this.user.portal_account === res.data.admins[i].users.portal_account){
              console.log('1');
              this.adminFlag = true;
              this.adminPermission = res.data.admins[i];
            }
          }
        });
      },
      setAdminPermission () {
        if (confirm(`${this.user.portal_account} 계정에게 권한을 부여하겠습니까?`)) {
          this.$store.dispatch('setAdminPermission', {
            token: this.$session.get('token'),
            userId: this.user.id,
            grant_callvan: this.permissions[0],
            grant_user: this.permissions[1],
            grant_shop: this.permissions[2],
            grant_community: this.permissions[3],
            grant_version: this.permissions[4],
            grant_land: this.permissions[5],
            grant_market: this.permissions[6],
            grant_circle: this.permissions[7],
            is_deleted: this.permissions[8]
          }).then(flag => {
            if (flag) {
              alert('성공적으로 권한을 부여했습니다.');
              this.adminFlag = true;
              this.$router.go(0);
            }
          }, error => {
            console.log(error);
          })
        }
      },
      updateAdminPermission () {
        if (confirm(`${this.adminPermission.users.portal_account} 계정의 권한을 수정하겠습니까?`)) {
          this.$store.dispatch('updateAdminPermission', {
            token: this.$session.get('token'),
            userId: this.user.id,
            grant_callvan: this.adminPermission.grant_callvan,
            grant_user: this.adminPermission.grant_user,
            grant_shop: this.adminPermission.grant_shop,
            grant_community: this.adminPermission.grant_community,
            grant_version: this.adminPermission.grant_version,
            grant_land: this.adminPermission.grant_land,
            grant_market: this.adminPermission.grant_market,
            grant_circle: this.adminPermission.grant_circle,
            is_deleted: this.adminPermission.is_deleted
          }).then(flag => {
            if (flag) {
              alert('성공적으로 권한을 수정했습니다.');
              this.$router.go(0);
            }
          }, error => {
            console.log(error);
          })
        }
      },
      withdrawAdminPermission () {
        if (confirm(`${this.adminPermission.users.portal_account} 계정의 권한을 철회하겠습니까?`)) {
          this.$store.dispatch('withdrawAdminPermission', {
            token: this.$session.get('token'),
            userId: this.user.id
          }).then(flag => {
            if (flag) {
              alert('성공적으로 권한을 철회했습니다.');
              this.adminFlag = false;
              this.$router.go(0);
            }
          }, error => {
            console.log(error);
          })
        }
      },
      setPermission (idx) {
        this.permissions[idx] = !this.permissions[idx];
      },
      updatePermission (adminPermission, idx) {
        if (idx === 0) adminPermission.grant_callvan = !adminPermission.grant_callvan;
        else if (idx === 1) adminPermission.grant_user = !adminPermission.grant_user;
        else if (idx === 2) adminPermission.grant_shop = !adminPermission.grant_shop;
        else if (idx === 3) adminPermission.grant_community = !adminPermission.grant_community;
        else if (idx === 4) adminPermission.grant_version = !adminPermission.grant_version;
        else if (idx === 5) adminPermission.grant_land = !adminPermission.grant_land;
        else if (idx === 6) adminPermission.grant_market = !adminPermission.grant_market;
        else if (idx === 7) adminPermission.grant_circle = !adminPermission.grant_circle;
        else if (idx === 8) adminPermission.is_deleted = !adminPermission.is_deleted;
      }
    },
    created () {
        this.getSpecificUser();
    },
    updated () {
      this.updateMajorByStudentNumber();
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
thead tr th:first-child { width: 5%; }
thead tr th:nth-child(1n + 2) { width: 15%; }
table th, table td { padding: 1rem 2rem;}
table td { border-top: 1px solid #eceeef; }

.card table:nth-child(2) thead tr th { width: 10% }
.card table:nth-child(3) thead tr th { width: 5% }
.card table:nth-child(3) thead tr th:nth-child(2) { width: 10% }
.admin table thead tr th { width: 8% }
.admin table thead tr th:nth-child(11) { width: 10% }
.admin table thead tr th:last-child { width: 10% }

.btn-check, .btn-create {
  background: #ff7f00;
  color: #fff!important;
  border: 1px solid #ff7f00;
}
.btn-check:hover, .btn-create:hover {
  background: transparent;
  color: #ff7f00!important;
}
.btn-update {
  background: #175c8e;
  color: #fff!important;
  border: 1px solid #175c8e;
  margin-right: 10px;
}
.btn-update:hover {
  background: transparent;
  color: #175c8e!important;
}
.btn-delete {
  background: #ff4c4c;
  color: #fff!important;
  border: 1px solid #ff4c4c;
}
.btn-delete:hover {
  background: transparent;
  color: #ff4c4c!important;
}
</style>
