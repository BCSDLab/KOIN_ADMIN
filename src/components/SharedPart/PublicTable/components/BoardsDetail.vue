<template>
  <b-modal
    class="boards-detail"
    id="boards-modal"
    size="xl"
    @show="mode = initialMode"
    @hidden="hideModal">
    <template v-slot:modal-footer>
      <b-button
        size="sm"
        variant="outline-success"
        v-if="mode === 'create'"
        @click="createBoardInfo">
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
        @click="updateBoardInfo">
        Submit
      </b-button>

      <b-button
        size="sm"
        variant="danger"
        v-if="mode !== 'create'"
        @click="deleteBoardInfo">
        Delete
      </b-button>
    </template>

    <b-row
      class="boards-detail__row"
      no-gutters>
      <b-form-group
        class="col-1 mx-1"
        v-if="mode !== 'create'"
        label="ID"
        label-for="id"
        label-size="sm">
        <div
          id="id">
          {{ boardInfo.id }}
        </div>
      </b-form-group>
      <b-form-group
        class="col-3 mx-1"
        label="이름"
        label-for="name"
        label-size="sm">
        <div
          id="name"
          v-if="isMoreMode">
          {{ boardInfo.name}}
        </div>

        <b-input
          id="name"
          v-else
          v-model="boardInfo.name"/>
      </b-form-group>
      <b-form-group
        class="col-1 mx-1"
        label="순서"
        label-for="seq"
        label-size="sm">
        <div
          id="seq"
          v-if="isMoreMode">
          {{ boardInfo.seq }}
        </div>

        <b-input
          id="seq"
          v-else
          v-model="boardInfo.seq"/>
      </b-form-group>

      <b-form-group
        class="col-3 mx-1"
        label="부모 게시판"
        label-for="parent_id"
        label-size="sm">
        <div
          id="parent_id"
          v-if="isMoreMode">
          {{ boardInfo['parent_id'] | convertString(boardListOptions) }}
        </div>

        <b-select
          id="parent_id"
          v-else
          v-model="boardInfo['parent_id']"
          :options="boardListOptions"
          >
          <template #first>
            <option :value="null">없음</option>
          </template>
        </b-select>
      </b-form-group>

      <b-form-group
        class="col-1 mx-1"
        label="공지"
        label-for="is_notice"
        label-size="sm">
        <b-checkbox
          id="is_notice"
          v-model="boardInfo['is_notice']"
          :disabled="isMoreMode"
          size="lg"
          switch/>
      </b-form-group>
      <b-form-group
        class="col-1 mx-1"
        label="익명"
        label-for="is_anonymous"
        label-size="sm">
        <b-checkbox
          id="is_anonymous"
          v-model="boardInfo['is_anonymous']"
          :disabled="isMoreMode"
          size="lg"
          switch/>
      </b-form-group>
      <b-form-group
        class="col-1 mx-1"
        label="활성화"
        label-for="is_deleted"
        label-size="sm">
        <b-checkbox
          id="is_deleted"
          :disabled="isMoreMode"
          v-model="boardInfo['is_deleted']"
          :value="false"
          :unchecked-value="true"
          size="lg"
          switch/>
      </b-form-group>
    </b-row>
    <b-row
      class="boards-detail__row--final"
      no-gutters>
      <b-form-group
        class="col-2 mx-1"
        label="Tag"
        label-for="tag"
        label-size="sm">
        <div
          id="tag"
          v-if="isMoreMode">
          {{ boardInfo.tag }}
        </div>

        <b-input
          id="tag"
          v-else
          v-model="boardInfo.tag"/>
      </b-form-group>
      <b-form-group
        class="col-2 mx-1"
        label="게시물 개수"
        label-for="article_count"
        label-size="sm"
        v-if="isMoreMode && boardInfo['created_at'] !== undefined">
        <div
          id="article_count">
          {{ boardInfo['article_count']}}
        </div>
      </b-form-group>

      <b-form-group
        class="col-3 mx-1"
        label="생성 일시"
        label-for="created_at"
        label-size="sm"
        v-if="isMoreMode && boardInfo['created_at'] !== undefined">
        <div
          id="created_at">
          {{ boardInfo['created_at'] }}
        </div>
      </b-form-group>
      <b-form-group
      class="col-3 mx-1"
      label="수정 일시"
      label-for="updated_at"
      label-size="sm"
      v-if="isMoreMode && boardInfo['updated_at'] !== undefined">
      <div
        id="updated_at">
        {{ boardInfo['updated_at'] }}
      </div>
    </b-form-group>
    </b-row>
  </b-modal>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import * as selected from "../../../../../static/selected.js"
  import {defaultModal} from "../../../../mixins/defualtModal";

  export default {
    name: "BoardsDetail",
    data() {
      return {
        boardInfo: this.getBoardInfo(),
        tagRegex: /^[A-Z]{2}\d{3}$/
      }
    },
    methods: {
      ...mapGetters({
        getBoardInfo: 'board/getBoardInfo'
      }),
      ...mapActions({
        setBoardList: 'board/setBoardList',
        createBoard: 'board/createBoard',
        deleteBoard: 'board/deleteBoard',
        updateBoard: 'board/updateBoard'
      }),
      createBoardInfo() {
        if (confirm(`정말 ${this.boardInfo.name}을 만드시겠습니까?`) && this.checkInfoDataValid()) {
          this.createBoard(this.boardInfo).then(
            res => {
              if(res) {
                alert('성공적으로 만들어졌습니다.');
                this.setBoardList();
                this.$bvModal.hide('boards-modal');
              }
            },
             error => {
              console.error(error);
             }
          )
        }
      },
      deleteBoardInfo() {
        if (confirm(`정말 ${this.boardInfo.name}을 삭제하겠습니까?`)) {
          this.deleteBoard().then(res => {
            if (res) {
              alert('성공적으로 삭제했습니다.');
              this.setBoardList();
              this.$bvModal.hide('boards-modal');
              this.$router.push('/');
            }
          }, error => {
            console.log(error);
          })
        }
      },
      updateBoardInfo() {
        if (confirm(`정말 변경하시겠습니까?`) && this.checkInfoDataValid()) {
          this.updateBoard(this.boardInfo).then(res => {
            if (res) {
              alert('성공적으로 변경되었습니다.');
              this.mode = 'more'
            }
          }, err => {
            console.log(err)
          })
        }
      },
      //boardInfo의 required 측정
      checkInfoDataValid() {
        if(this.boardInfo.name === null || this.boardInfo.name === '')
          alert('게시판 이름을 입력해주세요.');
        else if(!this.tagRegex.test(this.boardInfo.tag))
          alert('태그를 입력해주세요.');
        else if(this.boardInfo.seq === null || this.boardInfo.seq === '')
          alert('순서를 입력해주세요.');
        else
          return true;

        return false;
      }
    },
    computed: {
      ...mapGetters({
        boardListOptions: 'board/getBoardListOption'
      })
    },
    extends: defaultModal,
    watch: {
      mode(newValue) {
        if(newValue === 'create') {
          this.boardInfo = {};
          selected.default.board.editableData.map(
            value => {
              this.boardInfo[value] = null
            }
          )
          this.boardInfo['is_deleted'] = false;
        } else
          this.boardInfo = this.getBoardInfo();
      },
      '$store.state.board.boardInfo': {
        deep: true,
        handler() {
          this.boardInfo = this.getBoardInfo();
        }
      }
    }
  }
</script>

<style scoped>
  .boards-detail__row {
    justify-content: center;
    border-bottom: 1px gray solid;
    margin-bottom: 10px;
  }
  .boards-detail__row--final {
    justify-content: center;
  }
</style>
