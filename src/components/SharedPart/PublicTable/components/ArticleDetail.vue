<template>
  <b-modal
    class="board-detail"
    id="board-modal"
    size="xl"
    @show="mode = initialMode"
    @hidden="hideModal">
    <template v-slot:modal-footer>
      <b-button
        size="sm"
        variant="outline-success"
        v-if="mode === 'create'"
        @click="createArticleInfo">
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
        @click="updateArticleInfo">
        Submit
      </b-button>

      <b-button
        size="sm"
        variant="danger"
        v-if="mode !== 'create'"
        @click="deleteArticleInfo">
        Delete
      </b-button>
    </template>

    <b-row
      class="board-detail__row"
      no-gutters>
      <b-form-group
        class="col-2 mx-1"
        v-if="mode !== 'create'"
        label="ID"
        label-for="id"
        label-size="sm">
        <div
          id="id">
          {{ articleInfo.id }}
        </div>
      </b-form-group>
      <b-form-group
        class="col-2 mx-1"
        v-if="mode !== 'create' && articleInfo['user_id']"
        label="작성자ID"
        label-for="user_id"
        label-size="sm">
        <div
          id="user_id">
          {{ articleInfo['user_id'] }}
        </div>
      </b-form-group>

      <b-form-group
        class="col-3 mx-1"
        v-if="mode !== 'create'"
        label="작성자"
        label-for="nickname"
        label-size="sm">
        <div id="nickname">
          {{ articleInfo.nickname }}
        </div>
      </b-form-group>

      <b-form-group
        class="col-1 mx-1"
        v-if="mode !== 'create'"
        label="조회수"
        label-for="hit"
        label-size="sm">
        <div
          id="hit">
          {{ articleInfo.hit }}
        </div>
      </b-form-group>
      <b-form-group
        class="col-3 mx-1"
        label="게시판"
        label-for="board_id"
        label-size="sm">
        <div
          id="board_id"
          v-if="isMoreMode">
          {{ articleInfo['board_id'] | convertString(boardListOptions) }}
        </div>

        <b-select
          id="board_id"
          v-else
          v-model="articleInfo['board_id']"
          :options="boardListOptions"
          >
          <template #first>
            <option :value="null" disabled>--- 선택하세요 ---</option>
          </template>
        </b-select>
      </b-form-group>

      <b-form-group
        class="col-1 mx-1"
        label="해결 여부"
        label-for="is_solved"
        label-size="sm">
        <b-checkbox
          id="is_solved"
          v-model="articleInfo['is_solved']"
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
          v-model="articleInfo['is_deleted']"
          :value="false"
          :unchecked-value="true"
          size="lg"
          switch/>
      </b-form-group>
    </b-row>
    <b-row
      class="board-detail__row"
      no-gutters>
      <b-form-group
        class="col-12 mx-1"
        label="제목"
        label-for="title"
        label-size="sm">
        <div
          id="title"
          class="board-detail__content"
          v-if="isMoreMode">
          {{ articleInfo.title }}
        </div>

        <b-input
          id="title"
          v-else
          v-model="articleInfo.title"/>
      </b-form-group>
      <b-form-group
        class="col-12 mx-1"
        label="내용"
        label-for="content"
        label-size="sm">
        <div
          id="content"
          v-if="isMoreMode">
          {{ articleInfo.content }}
        </div>

        <b-textarea
          id="content"
          v-else
          v-model="articleInfo.content"
          rows="6"
          max-rows="10"/>
      </b-form-group>
      <b-form-group
        class="col-3 mx-1"
        label="생성 일시"
        label-for="created_at"
        label-size="sm"
        v-if="isMoreMode && articleInfo['created_at'] !== undefined">
        <div
          id="created_at">
          {{ articleInfo['created_at'] }}
        </div>
      </b-form-group>
      <b-form-group
        class="col-3 mx-1"
        label="수정 일시"
        label-for="updated_at"
        label-size="sm"
        v-if="isMoreMode && articleInfo['updated_at'] !== undefined">
        <div
          id="updated_at">
          {{ articleInfo['updated_at'] }}
        </div>
      </b-form-group>
    </b-row>

    <b-row
      v-if="mode !== 'create'"
      class="board-detail__row--final"
      no-gutters>
      <table
        class="board-detail__table">
        <thead>
          <tr>
            <th>UID</th>
            <th>닉네임</th>
            <th class="board-detail__comment">내용</th>
            <th>활성화</th>
            <th v-if="!isMoreMode">Remove</th>
            <th v-if="!isMoreMode">Confirm</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(comment, index) in articleInfo.comments">
            <td>{{ comment.id }}</td>
            <td>{{ comment.nickname }}</td>
            <td>
              <template
                v-if="isMoreMode">
                {{ comment.content }}
              </template>
              <b-input
                v-else
                size="sm"
                v-model="comment.content"/>
            </td>
            <td>
              <b-checkbox
                v-if="comment.id !== undefined"
                :disabled="isMoreMode"
                v-model="!comment['is_deleted']"
                :value="false"
                :unchecked-value="true"
                switch/>
            </td>
            <td
              v-if="!isMoreMode">
              <b-button
                size="sm"
                variant="danger"
                @click="removeCommentInfo(index)">
                -
              </b-button>
            </td>

            <td
              v-if="!isMoreMode">
              <b-button
                size="sm"
                :variant="comment.id !== undefined ? 'primary' : 'success'"
                @click="updateCommentInfo(index)">
                {{comment.id !== undefined ? "수정" : "추가"}}
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>
      <b-button
        variant="success"
        v-if="mode === 'edit'"
        @click="addCommentRow">
        새로운 열 생성
      </b-button>
    </b-row>
  </b-modal>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import * as selected from "../../../../../static/selected.js"
  import {defaultModal} from "../../../../mixins/defualtModal";

  export default {
    name: "ArticleDetail",
    props: {
      initialMode: String
    },
    data() {
      return {
        //more: 일시 상세정보, edit: input form을 띄움
        mode: '',
        articleInfo: this.getArticleInfo(),
        boardListOptions: this.getBoardListOption()
      }
    },
    methods: {
      ...mapGetters({
        getArticleInfo: 'board/getArticleInfo',
        getBoardListOption: 'board/getBoardListOption'
      }),
      ...mapActions({
        createArticle: 'board/createArticle',
        deleteArticle: 'board/deleteArticle',
        updateArticle: 'board/updateArticle',
        createComment: 'board/createComment',
        updateComment: 'board/updateComment',
        deleteComment: 'board/deleteComment'
      }),
      createArticleInfo() {
        if (confirm(`정말 게시물을 만드시겠습니까?`) && this.checkInfoDataValid()) {
          this.createArticle(this.articleInfo).then(
            res => {
              if(res) {
                alert('성공적으로 만들어졌습니다.');
                this.$bvModal.hide('board-modal')
              }
            },
             error => {
              console.error(error);
             }
          )
        }
      },
      deleteArticleInfo() {
        if (confirm(`정말 ${this.articleInfo.name}을 삭제하겠습니까?`)) {
          this.deleteArticle().then(res => {
            if (res) {
              alert('성공적으로 삭제했습니다.');
              this.$bvModal.hide('board-modal')
            }
          }, error => {
            console.log(error);
          })
        }
      },
      updateArticleInfo() {
        if (confirm(`정말 변경하시겠습니까?`) && this.checkInfoDataValid()) {
          this.updateArticle(this.articleInfo).then(res => {
            if (res) {
              alert('성공적으로 변경되었습니다.');
              this.mode = 'more'
            }
          }, err => {
            console.log(err)
          })
        }
      },
      //하나의 댓글을 업데이트(만들기 포함)
      updateCommentInfo(index) {
        if(confirm('해당 댓글을 업데이트하시겠습니까?')) {
          let vaildState = true;
          //comment 내용이 빈칸인지 확인
          if(this.articleInfo.comments[index].context === null
            || this.articleInfo.comments[index].context === '')
            vaildState = false;
          //id가 없을 시 create 있는 경우 update
          if(!vaildState)
            alert('빈 칸을 모두 채워주세요.');
          else if(this.articleInfo.comments[index].id === undefined) {
            this.createComment(this.articleInfo.comments[index])
          } else
            this.updateComment({
              data: this.articleInfo.comments[index],
              index: index
            })
        }
      },
      removeCommentInfo(index) {
        if(this.articleInfo.comments[index].id !== undefined) {
          if (confirm('해당 댓글을 지우겠습니까?'))
            this.deleteComment(index);
        } else
          this.articleInfo.comments.splice(index, 1)
      },
      //articleInfo의 required 측정
      checkInfoDataValid() {
        if(this.articleInfo.title === null || this.articleInfo.title === '')
          alert('제목을 입력해주세요.');
        else if(this.articleInfo['board_id'] === null)
          alert('카테고리를 입력해주세요.');
        else if(this.articleInfo.content === null
          || this.articleInfo.content === '')
          alert('내용을 입력해주세요.');
        else
          return true;

        return false;
      },
      addCommentRow() {
        if(this.articleInfo.comments === null)
          this.articleInfo.comments = [];
        this.articleInfo.comments.push({
          content: null,
          'is_deleted': false
        })
      }
    },
    watch: {
      mode(newValue) {
        if(newValue === 'create') {
          this.articleInfo = {};
          selected.default.board.editableData.map(
            value => {
              this.articleInfo[value] = null
            }
          )
        } else
          this.articleInfo = this.getArticleInfo();
      },
      '$store.state.board.articleInfo': {
        deep: true,
        handler() {
          this.articleInfo = this.getArticleInfo();
        }
      }
    },
    mixins: [defaultModal]
  }
</script>

<style scoped>
  .board-detail__row {
    justify-content: center;
    border-bottom: 1px gray solid;
    margin-bottom: 10px;
  }
  .board-detail__row--final {
    justify-content: center;
  }
  .board-detail__table {
    word-break: break-word;
    text-align: center;
    margin: 0 10px;
    width: 90%;
  }
  .board-detail__comment {
    width: 550px;
  }
</style>
