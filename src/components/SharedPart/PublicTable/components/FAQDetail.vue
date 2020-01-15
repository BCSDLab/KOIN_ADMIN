<template>
  <b-modal
    class="faq-detail"
    id="faq-modal"
    size="xl"
    @show="mode = initialMode"
    @hidden="hideModal">
    <template v-slot:modal-footer>
      <b-button
        size="sm"
        variant="outline-success"
        v-if="mode === 'create'"
        @click="createFaqInfo">
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
        @click="updateFaqInfo">
        Submit
      </b-button>

      <b-button
        size="sm"
        variant="danger"
        v-if="mode !== 'create'"
        @click="deleteFaqInfo">
        Delete
      </b-button>
    </template>

    <b-row
      class="faq-detail__row"
      no-gutters>
      <b-form-group
        class="col-2 mx-1"
        v-if="mode !== 'create'"
        label="UID"
        label-for="id"
        label-size="sm">
        <div
          id="id">
          {{ faqInfo.id }}
        </div>
      </b-form-group>

      <b-form-group
        class="col-3 mx-1"
        label="동아리 ID"
        label-for="circle_id"
        label-size="sm">
        <div
          id="circle_id"
          v-if="isMoreMode">
          {{ faqInfo['circle_id'] ? faqInfo['circle_id'] : '지정 안 됨' }}
        </div>

        <b-input
          id="circle_id"
          v-else
          v-model="faqInfo['circle_id']"
          required/>
      </b-form-group>

      <b-form-group
        class="col-1 mx-1"
        label="활성화"
        label-for="is_deleted"
        label-size="sm">
        <b-checkbox
          id="is_deleted"
          v-model="faqInfo['is_deleted']"
          :disabled="isMoreMode"
          size="sm"
          button
          :button-variant="!faqInfo['is_deleted'] ? 'primary' : 'secondary'">
          {{ !faqInfo['is_deleted'] ? '예' : '아니요' }}
        </b-checkbox>
      </b-form-group>

      <b-form-group
        class="col-2 mx-1"
        label="생성 날짜"
        label-for="created_at"
        label-size="sm"
        v-if="isMoreMode">
        <div
          id="created_at">
          {{ faqInfo['created_at'] }}
        </div>
      </b-form-group>
      <b-form-group
        class="col-2 mx-1"
        label="최근 수정 날짜"
        label-for="updated_at"
        label-size="sm"
        v-if="isMoreMode">
        <div
          id="updated_at">
          {{ faqInfo['updated_at'] }}
        </div>
      </b-form-group>

      <b-form-group
        class="col-12 mx-1"
        label="Question"
        label-for="question"
        label-size="sm">
        <div
          id="question"
          v-if="isMoreMode">
          {{ faqInfo.question }}
        </div>

        <b-input
          v-else
          v-model="faqInfo.question"/>
      </b-form-group>
    </b-row>

    <b-row
      class="faq-detail__row--final">
      <b-form-group
        class="col-12 mx-1"
        label="Answer"
        label-for="answer"
        label-size="sm">
        <div
          id="answer"
          v-if="isMoreMode">
          {{ faqInfo.answer }}
        </div>

        <b-textarea
          v-else
          v-model="faqInfo.answer"
          rows="3"
          max-rows="6"/>
      </b-form-group>
    </b-row>
  </b-modal>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import * as selected from "../../../../../static/selected.js"
  import {defaultModal} from "../../../../mixins/defualtModal";

  export default {
    name: "FAQDetail",
    props: {
      initialMode: String
    },
    data() {
      return {
        //more: 일시 상세정보, edit: input form을 띄움
        mode: '',
        faqInfo: this.getFaqInfo()
      }
    },
    methods: {
      ...mapGetters({
        getFaqInfo: 'faq/getFaqInfo'
      }),
      ...mapActions({
        createFaq: 'faq/createFaq',
        deleteFaq: 'faq/deleteFaq',
        updateFaq: 'faq/updateFaq'
      }),
      createFaqInfo() {
        if (confirm('정말 해당질문을 만드시겠습니까?') && this.checkValid()) {
          this.createFaq(this.faqInfo).then(
            res => {
              if(res) {
                alert('성공적으로 만들어졌습니다.');
                this.$bvModal.hide('faq-modal')
              }
            },
             error => {
              console.error(error);
             }
          )
        }
      },
      deleteFaqInfo() {
        if (confirm('정말 해당 질문을 삭제하겠습니까?')) {
          this.deleteFaq().then(res => {
            if (res) {
              alert('성공적으로 삭제했습니다.');
              this.$bvModal.hide('faq-modal')
            }
          }, error => {
            console.error(error);
          })
        }
      },
      updateFaqInfo() {
        if (confirm(`정말 변경하시겠습니까?`) && this.checkValid()) {
          this.updateFaq(this.faqInfo).then(res => {
            if (res) {
              alert('성공적으로 변경되었습니다.');
              this.mode = 'more'
            }
          }, err => {
            console.error(err)
          })
        }
      },
      //faqInfo의 required 측정
      checkValid() {
        if(this.faqInfo.question === null || this.faqInfo.question === '')
          alert('질문을 입력해주세요.');
        else if(this.faqInfo.answer === null || this.faqInfo.answer === '')
          alert('대답을 입력해주세요.');
        else
          return true;

        return false;
      }
    },
    watch: {
      mode(newValue) {
        if(newValue === 'create') {
          this.faqInfo = {};
          selected.default.faq.editableData.map(
            value => {
              this.faqInfo[value] = null
            }
          )
        } else
          this.faqInfo = this.getFaqInfo();
      },
      '$store.state.faq.faqInfo': {
        deep: true,
        handler() {
          this.faqInfo = this.getFaqInfo();
        }
      }
    },
    mixins: [defaultModal]
  }
</script>

<style scoped>
  .faq-detail__row {
    justify-content: center;
    border-bottom: 1px gray solid;
    margin-bottom: 10px;
  }
  .faq-detail__row--final {
    justify-content: center;
  }
</style>
