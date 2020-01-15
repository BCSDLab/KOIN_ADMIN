<template>
  <b-modal
    class="user-detail"
    id="user-modal"
    size="xl"
    @show="showModal"
    @hidden="hideModal">
    <template v-slot:modal-footer>
      <b-button
        size="sm"
        variant="outline-success"
        v-if="mode === 'create'"
        @click="createUserInfo">
        Create
      </b-button>
      <b-button
        size="sm"
        variant="primary"
        v-else-if="mode === 'more'"
        @click="mode = 'edit'">
        Edit
      </b-button>
      <b-button
        size="sm"
        variant="success"
        v-else-if="mode === 'edit'"
        @click="updateUserInfo">
        Submit
      </b-button>

      <b-button
        size="sm"
        variant="danger"
        v-if="mode !== 'create'"
        @click="deleteUserInfo">
        Delete
      </b-button>
    </template>

    <b-row
      class="user-detail__row"
      no-gutters>
      <b-form-group
        class="col-2 mx-1"
        v-if="mode !== 'create'"
        label="UID"
        label-for="id"
        label-size="sm">
        <div
          id="id">
          {{ userInfo.id }}
        </div>
      </b-form-group>

      <b-form-group
        class="col-3 mx-1"
        label="ID"
        label-for="portal_account"
        label-size="sm">
        <!-- TODO: ID 중복 API가 나올경우 v-if 수정 -->
        <div
          id="portal_account"
          v-if="mode !== 'create'">
          {{ userInfo['portal_account'] }}
        </div>

        <b-input
          id="portal_account"
          v-else
          v-model="userInfo['portal_account']"
          />
      </b-form-group>

      <b-form-group
        class="col-3 mx-1"
        label="Password"
        label-for="password"
        label-size="sm">
        <div
          id="password"
          v-if="isMoreMode">
          &#x25CF;&#x25CF;&#x25CF;&#x25CF;&#x25CF;&#x25CF;&#x25CF;&#x25CF;&#x25CF;
        </div>

        <b-input
          id="password"
          v-else
          v-model="userInfo.password"
          placeholder="빈칸이면 이전과 동일함"/>
      </b-form-group>

      <b-form-group
        class="col-3 mx-1"
        label="닉네임"
        label-for="nickname"
        label-size="sm">
        <div
          id="nickname"
          v-if="isMoreMode">
          {{ userInfo.nickname }}
        </div>

        <b-input-group v-else>
          <b-input
            id="nickname"
            v-model="userInfo.nickname">
          </b-input>
          <b-input-group-append>
            <b-button
              variant="primary"
              @click="checkNicknameValid">
              Check
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </b-row>
    <b-row
      class="user-detail__row"
      no-gutters>
      <b-form-group
        class="col-2 mx-1"
        label="이름"
        label-for="name"
        label-size="sm">
        <div
          id="name"
          v-if="isMoreMode">
          {{ userInfo.name }}
        </div>

        <b-input
          id="name"
          v-else
          v-model="userInfo.name"
          />
      </b-form-group>

      <b-form-group
        class="col-3 mx-1"
        label="학번"
        label-for="student_number"
        label-size="sm">
        <div
          id="student_number"
          v-if="isMoreMode">
          {{ userInfo['student_number'] }}
        </div>

        <b-input
          id="student_number"
          v-else
          v-model="userInfo['student_number']"/>
      </b-form-group>

      <b-form-group
        class="col-3 mx-1"
        label="학과"
        label-for="major"
        label-size="sm">
        <div
          id="major"
          v-if="isMoreMode">
          {{ userInfo.major }}
        </div>

        <b-input
          id="major"
          v-else
          v-model="userInfo.major"
          disabled/>
      </b-form-group>

      <b-form-group
        class="col-3 mx-1"
        label="연락처"
        label-for="phone_number"
        label-size="sm">
        <div
          id="phone_number"
          v-if="isMoreMode">
          {{ userInfo['phone_number'] }}
        </div>

        <b-input
          id="phone_number"
          v-else
          v-model="userInfo['phone_number']"/>
      </b-form-group>

      <b-form-group
        class="col-2 mx-1"
        label="신분"
        label-for="identity"
        label-size="sm">
        <div
          id="identity"
          v-if="isMoreMode">
          {{ userInfo.identity | convertString(identityOptions) }}
        </div>

        <b-select
          id="identity"
          v-else
          :options="identityOptions"
          v-model="userInfo.identity">
          <template #first>
            <option :value="null" disabled>--- 선택하세요 ---</option>
          </template>
        </b-select>
      </b-form-group>

      <b-form-group
        class="col-3 mx-1"
        label="졸업여부"
        label-for="is_graduated"
        label-size="sm">
        <b-checkbox
          id="is_graduated"
          v-model="userInfo['is_graduated']"
          :disabled="isMoreMode"
          size="lg"
          switch/>
      </b-form-group>

      <b-form-group
        class="col-3 mx-1"
        label="로그인 허용"
        label-for="is_authed"
        label-size="sm">
        <b-checkbox
          id="is_authed"
          v-model="userInfo['is_authed']"
          :disabled="isMoreMode"
          size="lg"
          switch/>
      </b-form-group>

      <b-form-group
        class="col-3 mx-1"
        label="성별"
        label-for="gender"
        label-size="sm">
        <div
          id="gender"
          v-if="isMoreMode">
          {{ userInfo.gender | convertString(genderOptions) }}
        </div>

        <b-select
          id="gender"
          v-else
          :options="genderOptions"
          v-model="userInfo.gender">
          <template #first>
            <option :value="null" disabled>
              --- 선택하세요 ---
            </option>
          </template>
        </b-select>
      </b-form-group>

      <b-form-group
        class="col-3 mx-1"
        label="상태"
        label-for="condition"
        label-size="sm"
        v-if="isMoreMode">
        <b-badge
          id="condition"
          :variant="userInfo.condition.variant">
          {{ userInfo.condition.text }}
        </b-badge>
      </b-form-group>
      <b-form-group
        class="col-3 mx-1"
        label="마지막 로그인 일시"
        label-for="last-logged-at"
        label-size="sm"
        v-if="isMoreMode && userInfo['last_logged_at'] !== undefined">
        <div
          id="last-logged-at">
          {{ userInfo['last_logged_at'] }}
        </div>
      </b-form-group>
    </b-row>
    <template
      v-if="mode !== 'create'">
    <label for="permission">권한</label>
      <b-row
        id="permission"
        class="user-detail__row--final"
        no-gutters>
        <template
          v-if="mode === 'more' && permissionInfo.hasPermission === false">
          현재 권한이 없습니다.
        </template>
        <template
          v-else-if="mode !== 'create'">
          <b-form-group
            class="col-1"
            v-for="(field, index) in permissionField"
            :label="permissionFieldName[index]"
            :key="field"
            :label-for="field"
            label-size="sm">
            <b-checkbox
              :id="field"
              v-model="permissionInfo[field]"
              :disabled="isMoreMode"
              size="lg"
              switch/>
          </b-form-group>
        </template>
        <template
          v-if="!isMoreMode">
          <b-button
            class="mx-1"
            variant="success"
            @click="updatePermissionInfo">
            권한 부여
          </b-button>
          <b-button
            class="mx-1"
            variant="danger"
            @click="deletePermissionInfo">
            권한 삭제
          </b-button>
        </template>
      </b-row>
    </template>
  </b-modal>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import * as selected from "../../../../../static/selected.js"
  import {defaultModal} from "../../../../mixins/defualtModal";

  export default {
    name: "UserDetail",
    props: {
      initialMode: String
    },
    data() {
      return {
        //more: 일시 상세정보, edit: input form을 띄움
        mode: '',
        userInfo: this.getUserInfo(),
        permissionInfo: this.getPermissionInfo(),
        permissionFieldName: ['콜밴', '사용자', '상점', '게시판', '버전', 'BCSD',
          '동아리', '복덕방', '분실물', '설문조사', '중고장터', '권한 중지'],
        permissionField: selected.default.permission.editableData,
        identityOptions: [
          {value: 0, text: '학부생'},
          {value: 1, text: '대학원생'},
          {value: 2, text: '교수'},
          {value: 3, text: '교직원'}
        ],
        genderOptions: [
          {value: 0, text: '남자'},
          {value: 1, text: '여자'}
        ],
        nicknameState: null,
        studentNumberRegex: /^(\d{4})(\d{3})\d{3}$/
      }
    },
    methods: {
      ...mapGetters({
        getUserInfo: 'user/getUserInfo',
        getPermissionInfo: 'user/getPermissionInfo'
      }),
      ...mapActions({
        createUser: 'user/createUser',
        deleteUser: 'user/deleteUser',
        updateUser: 'user/updateUser',
        checkNickname: 'user/checkNickname',
        createPermission: 'user/createPermission',
        updatePermission: 'user/updatePermission',
        deletePermission: 'user/removePermission'
      }),
      createUserInfo() {
        if(confirm('정말 새로운 계정을 만드시겠습니까?') && this.checkInfoDataValid())
          this.createUser(this.userInfo).then(res => {
            if (res) {
              alert('성공적으로 만들었습니다.');
              this.$bvModal.hide('user-modal')
            }
          }, error => {
            console.log(error);
          })
      },
      deleteUserInfo() {
        if (confirm(`정말 ${this.userInfo['portal_account']}을 삭제하겠습니까?`)
          && this.checkInfoDataValid()) {
          this.deleteUser().then(res => {
            if (res) {
              alert('성공적으로 삭제했습니다.');
              this.$bvModal.hide('user-modal')
            }
          }, error => {
            console.log(error);
          })
        }
      },
      updateUserInfo() {
        if (confirm(`정말 변경하시겠습니까?`) && this.checkInfoDataValid()) {
          this.updateUser(this.userInfo).then(res => {
            if (res) {
              this.mode = 'more'
              alert('성공적으로 변경되었습니다.');
            }
          }, err => {
            console.log(err)
          })
        }
      },
      checkNicknameValid() {
        this.checkNickname(this.userInfo.nickname)
          .then(
            res => {
              this.nicknameState = res
            }
          )
      },
      checkInfoDataValid() {
        if(this.userInfo['portal_account'] === null
          || this.userInfo['portal_account'] === '')
          alert('아우누리 아이디를 입력해주세요.');
        else if(this.nicknameState === null)
          alert('닉네임 확인을 해주세요');
        else if(this.nicknameState === false)
          alert('닉네임이 중복됩니다.');
        else if((this.userInfo.password === '' === null
          || this.userInfo.password === '') && this.mode === 'create')
          //create mode일 경우 빈칸을 감지한다.
          alert('비밀번호를 입력해주세요.');
        else if(this.userInfo.major === '' && this.userInfo.major === null)
          alert('학번을 제대로 입력해주세요.');
        else
          return true;

        return false;
      },
      updatePermissionInfo() {
        console.log(this.permissionInfo)
        if(this.permissionInfo.id === undefined) {
          if (confirm('정말 권한을 부여하시겠습니까?'))
            this.createPermission(this.permissionInfo).then(res => {
              if (res) {
                alert('성공적으로 부여하였습니다.');
              }
            }, error => {
              console.log(error);
            });
        } else {
          if (confirm('정말 권한을 변경하시겠습니까?'))
            this.updatePermission(this.permissionInfo).then(res => {
              if (res) {
                alert('성공적으로 변경하였습니다.');
              }
            }, error => {
              console.log(error);
            })
        }
      },
      deletePermissionInfo() {
        if (confirm(`정말 권한을 삭제하겠습니까?`)) {
          this.deletePermission().then(res => {
            if (res) {
              alert('성공적으로 삭제했습니다.');
            }
          }, error => {
            console.log(error);
          })
        }
      },
      //TODO: ID 중복 확인 API가 나온다면 create시에도 modal이 뜨게 수정할 것.
      showModal(event) {
        if(this.initialMode === 'create') {
          event.preventDefault();
          alert('아직 지원되지 않습니다.');
        }
        this.mode = this.initialMode;
      }
    },
  mixins: [defaultModal],
    watch: {
      mode(newValue) {
        if (newValue === 'create') {
          this.userInfo = {};
          selected.default.user.editableData.map(
            value => {
              this.userInfo[value] = null
            }
          )
        } else {
          this.userInfo = this.getUserInfo();
          this.userInfo.password = '';
        }
      },
      '$store.state.user.userInfo': {
        deep: true,
        handler() {
          this.userInfo = this.getUserInfo();
        }
      },
      '$store.state.user.permissionInfo': {
        deep: true,
        handler() {
          this.permissionInfo = this.getPermissionInfo();
        }
      },
      'userInfo.student_number': {
        handler(newValue) {

          if(newValue && newValue.length === 10) {
            let admissionYear = this.studentNumberRegex.exec(newValue)[1];
            if(admissionYear > 1992
              && admissionYear < new Date().getFullYear()) {
              let majorCode = this.studentNumberRegex.exec(newValue)[2];

              switch (majorCode) {
                case '120':
                  this.userInfo.major = '기계공학부';
                  break;
                case '135':
                case '136':
                  this.userInfo.major = '컴퓨터공학부';
                  break;
                case '140':
                  this.userInfo.major = '메카트로닉스학부';
                  break;
                case '151':
                  this.userInfo.major = '디자인건축공학부';
                  break;
                case '161':
                  this.userInfo.major = '전기전자통신공학부';
                  break;
                case '174':
                  this.userInfo.major = '에너지신소재화학공학부';
                  break;
                case '180':
                  this.userInfo.major = '산업경영학부';
                  break;
                default:
                  this.userInfo.major = '';
              }
            }

          } else
            this.userInfo.major = '';
        }
      }
    }
  }
</script>

<style scoped>
  .user-detail__row {
    justify-content: center;
    border-bottom: 1px gray solid;
    margin-bottom: 10px;
  }
  .user-detail__row--final {
    justify-content: center;
  }
</style>
