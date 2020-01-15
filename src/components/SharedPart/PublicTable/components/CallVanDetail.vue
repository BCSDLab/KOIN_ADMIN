<template>
  <b-modal
    class="callvan-detail"
    id="callvan-modal"
    size="xl"
    @show="mode = initialMode"
    @hidden="hideModal">
    <template v-slot:modal-footer>
      <b-button
        size="sm"
        variant="outline-success"
        v-if="mode === 'create'"
        @click="createCompanyInfo">
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
        @click="updateCompanyInfo">
        Submit
      </b-button>

      <b-button
        size="sm"
        variant="danger"
        v-if="mode !== 'create'"
        @click="deleteCompanyInfo">
        Delete
      </b-button>
    </template>

    <b-row
      class="callvan-detail__row"
      no-gutters>
      <b-form-group
        class="col-2 mx-1"
        v-if="mode !== 'create'"
        label="ID"
        label-for="id"
        label-size="sm">
        <div
          id="id">
          {{ companyInfo.id }}
        </div>
      </b-form-group>

      <b-form-group
        class="col-3 mx-1"
        label="Name"
        label-for="name"
        label-size="sm">
        <div
          id="name"
          v-if="isMoreMode">
          {{ companyInfo.name }}
        </div>

        <b-input
          id="name"
          v-else
          v-model="companyInfo.name"/>
      </b-form-group>
      <b-form-group
        class="col-3 mx-1"
        label="전화번호"
        label-for="phone"
        label-size="sm">
        <div
          id="phone"
          v-if="isMoreMode">
          {{ companyInfo.phone }}
        </div>

        <b-input
          id="phone"
          v-else
          v-model="companyInfo.phone"/>
      </b-form-group>
    </b-row>
    <b-row
      class="callvan-detail__row--final"
      no-gutters>
      <b-form-group
        class="col-2 mx-1"
        label="카드 가능"
        label-for="pay_card"
        label-size="sm">
        <b-checkbox
          id="pay_card"
          v-model="companyInfo['pay_card']"
          :disabled="isMoreMode"
          size="lg"
          switch/>
      </b-form-group>
      <b-form-group
        class="col-2 mx-1"
        label="계좌이체 가능"
        label-for="pay_bank"
        label-size="sm">
        <b-checkbox
          id="pay_bank"
          v-model="companyInfo['pay_bank']"
          :disabled="isMoreMode"
          size="lg"
          switch/>
      </b-form-group>
      <b-form-group
        class="col-2 mx-1"
        label="활성화"
        label-for="is_deleted"
        label-size="sm">
        <b-checkbox
          id="is_deleted"
          :disabled="isMoreMode"
          v-model="companyInfo['is_deleted']"
          :value="false"
          :unchecked-value="true"
          size="lg"
          switch/>
      </b-form-group>
    </b-row>
  </b-modal>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import * as selected from "../../../../../static/selected.js"
  import {defaultModal} from "../../../../mixins/defualtModal";

  export default {
    name: "CallvanDetail",
    props: {
      initialMode: String
    },
    data() {
      return {
        //more: 일시 상세정보, edit: input form을 띄움
        mode: '',
        companyInfo: this.getCompanyInfo(),
        phoneRegex: /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/
      }
    },
    methods: {
      ...mapGetters({
        getCompanyInfo: 'callvan/getCompanyInfo'
      }),
      ...mapActions({
        createCompany: 'callvan/createCompany',
        deleteCompany: 'callvan/deleteCompany',
        updateCompany: 'callvan/updateCompany'
      }),
      createCompanyInfo() {
        if(confirm('정말 새로운 화사 정보를 만드시겠습니까?') && this.checkInfoDataValid())
          this.createCompany(this.companyInfo).then(res => {
            if (res) {
              alert('성공적으로 만들었습니다.');
              this.$bvModal.hide('callvan-modal')
            }
          }, error => {
            console.log(error);
          })
      },
      deleteCompanyInfo() {
        if (confirm(`정말 ${this.companyInfo['name']}을 삭제하겠습니까?`)) {
          this.deleteCompany().then(res => {
            if (res) {
              alert('성공적으로 삭제했습니다.');
              this.$bvModal.hide('callvan-modal')
            }
          }, error => {
            console.log(error);
          })
        }
      },
      updateCompanyInfo() {
        if (confirm(`정말 ${this.companyInfo.name}을 변경하시겠습니까?`)
          && this.checkInfoDataValid()) {
          this.updateCompany(this.companyInfo).then(res => {
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
        if(this.companyInfo.name === null
          || this.companyInfo.name === '')
          alert('회사 이름을 입력해주세요.');
        else if(!this.phoneRegex.test(this.companyInfo.phone))
          alert('전화번호를 제대로 써주세요 ex)010-1234-5678');
        else
          return true;

        return false;
      }
    },
    mixins: [defaultModal],
    watch: {
      mode(newValue) {
        if(newValue === 'create') {
          this.companyInfo = {};
          selected.default.callvan.editableData.map(
            value => {
              this.companyInfo[value] = null
            }
          )
        } else {
          this.companyInfo = this.getCompanyInfo();
        }
      },
      '$store.state.callvan.companyInfo': {
        deep: true,
        handler() {
          this.companyInfo = this.getCompanyInfo();
        }
      }
    }
  }
</script>

<style scoped>
  .callvan-detail__row {
    justify-content: center;
    border-bottom: 1px gray solid;
    margin-bottom: 10px;
  }
  .callvan-detail__row--final {
    justify-content: center;
  }
</style>
