<template>
  <b-modal
    class="version-detail"
    id="version-modal"
    size="xl"
    @show="mode = initialMode"
    @hidden="hideModal">
    <template v-slot:modal-footer>
      <b-button
        size="sm"
        variant="outline-success"
        v-if="mode === 'create'"
        @click="createVersionInfo">
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
        @click="updateVersionInfo">
        Submit
      </b-button>

      <b-button
        size="sm"
        variant="danger"
        v-if="mode !== 'create'"
        @click="deleteVersionInfo">
        Delete
      </b-button>
    </template>

    <b-row
      class="version-detail__row--final"
      no-gutters>
      <b-form-group
        class="col-2 mx-1"
        v-if="mode !== 'create'"
        label="ID"
        label-for="id"
        label-size="sm">
        <div
          id="id">
          {{ versionInfo.id }}
        </div>
      </b-form-group>
      <b-form-group
        class="col-2 mx-1"
        label="종류"
        label-for="type"
        label-size="sm">
        <div
          id="type"
          v-if="mode !== 'create'">
          {{ versionInfo.type }}
        </div>
        <b-input
          id="type"
          v-else
          v-model="versionInfo.type"/>
      </b-form-group>
      <b-form-group
        class="col-2 mx-1"
        label="버전"
        label-for="version"
        label-size="sm">
        <div
          id="version"
          v-if="isMoreMode">
          {{ versionInfo.version }}
        </div>

        <b-input
          id="version"
          v-else
          v-model="versionInfo.version"/>
      </b-form-group>
      <b-form-group
        class="col-2 mx-1"
        label="생성 일시"
        label-for="created_at"
        label-size="sm"
        v-if="isMoreMode && versionInfo['created_at'] !== undefined">
        <div
          id="created_at">
          {{ versionInfo['created_at'] }}
        </div>
      </b-form-group>
      <b-form-group
        class="col-2 mx-1"
        label="수정 일시"
        label-for="updated_at"
        label-size="sm"
        v-if="isMoreMode && versionInfo['updated_at'] !== undefined">
        <div
          id="updated_at">
          {{ versionInfo['updated_at'] }}
        </div>
      </b-form-group>
    </b-row>
  </b-modal>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import * as selected from "../../../../../static/selected.js"
  import {defaultModal} from "../../../../mixins/defualtModal";

  export default {
    name: "VersionDetail",
    props: {
      initialMode: String
    },
    data() {
      return {
        //more: 일시 상세정보, edit: input form을 띄움
        mode: '',
        versionInfo: this.getVersionInfo(),
        phoneRegex: /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/
      }
    },
    methods: {
      ...mapGetters({
        getVersionInfo: 'version/getVersionInfo',
        isVersionSame: 'version/isVersionSame'
      }),
      ...mapActions({
        createVersion: 'version/createVersion',
        deleteVersion: 'version/deleteVersion',
        updateVersion: 'version/updateVersion'
      }),
      createVersionInfo() {
        if(confirm('정말 새로운 화사 정보를 만드시겠습니까?') && this.checkInfoDataValid())
          this.createVersion(this.versionInfo).then(res => {
            if (res) {
              alert('성공적으로 만들었습니다.');
              this.$bvModal.hide('version-modal')
            }
          }, error => {
            console.log(error);
          })
      },
      deleteVersionInfo() {
        if (confirm(`정말 ${this.versionInfo['type']}을 삭제하겠습니까?`)) {
          this.deleteVersion().then(res => {
            if (res) {
              alert('성공적으로 삭제했습니다.');
              this.$bvModal.hide('version-modal')
            }
          }, error => {
            console.log(error);
          })
        }
      },
      updateVersionInfo() {
        if (confirm(`정말 ${this.versionInfo.type}을 변경하시겠습니까?`)
          && this.checkInfoDataValid()) {
          this.updateVersion(this.versionInfo.version).then(res => {
            if (res) {
              alert('성공적으로 변경되었습니다.');
              this.mode = 'more'
            }
          }, err => {
            console.log(err)
          })
        }
      },
      checkInfoDataValid() {
        if(this.versionInfo.type === null
          || this.versionInfo.type === '')
          alert('종류를 입력해주세요.');
        else if(this.versionInfo.version === null
          || this.versionInfo.version === '')
          alert('버전을 입력해주세요.');
        else if(this.isVersionSame()(this.versionInfo.version))
          alert('버전이 똑같습니다.');
        else
          return true;

        return false;
      }
    },
    mixins: [defaultModal],
    watch: {
      mode(newValue) {
        if(newValue === 'create') {
          this.versionInfo = {};
          selected.default.version.editableData.map(
            value => {
              this.versionInfo[value] = null
            }
          )
        } else {
          this.versionInfo = this.getVersionInfo();
        }
      },
      '$store.state.version.versionInfo': {
        deep: true,
        handler() {
          this.versionInfo = this.getVersionInfo();
        }
      }
    }
  }
</script>

<style scoped>
  .version-detail__row {
    justify-content: center;
    border-bottom: 1px gray solid;
    margin-bottom: 10px;
  }
  .version-detail__row--final {
    justify-content: center;
  }
</style>
