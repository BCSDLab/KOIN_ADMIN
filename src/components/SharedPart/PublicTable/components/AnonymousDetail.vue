<template>
  <b-modal
    class="anonymous-detail"
    id="anonymous-modal"
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
      class="anonymous-detail__row"
      no-gutters>
      <b-form-group
        class="col-2 mx-1"
        v-if="mode !== 'create'"
        label="ID"
        label-for="id"
        label-size="sm">
        <div
          id="id">
          {{ anonymousInfo.id }}
        </div>
      </b-form-group>
      <b-form-group
        class="col-2 mx-1"
        v-if="mode !== 'create' && anonymousInfo['user_id']"
        label="작성자ID"
        label-for="user_id"
        label-size="sm">
        <div
          id="user_id">
          {{ anonymousInfo['user_id'] }}
        </div>
      </b-form-group>

      <b-form-group
        class="col-3 mx-1"
        v-if="mode !== 'create'"
        label="작성자"
        label-for="nickname"
        label-size="sm">
        <div
          id="nickname"
          v-if="isMoreMode">
          {{ anonymousInfo.nickname }}
        </div>

        <b-input
          id="nickname"
          v-else
          v-model="anonymousInfo.nickname"/>
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
          v-model="anonymousInfo.password"
          placeholder="빈칸이면 이전과 동일함"/>
      </b-form-group>

      <b-form-group
        class="col-1 mx-1"
        v-if="mode !== 'create'"
        label="조회수"
        label-for="hit"
        label-size="sm">
        <div
          id="hit">
          {{ anonymousInfo.hit }}
        </div>
      </b-form-group>
    </b-row>
    <b-row
      class="anonymous-detail__row"
      no-gutters>
      <b-form-group
        class="col-12 mx-1"
        label="제목"
        label-for="title"
        label-size="sm">
        <div
          id="title"
          class="anonymous-detail__content"
          v-if="isMoreMode">
          {{ anonymousInfo.title }}
        </div>

        <b-input
          id="title"
          v-else
          v-model="anonymousInfo.title"/>
      </b-form-group>
      <b-form-group
        class="col-12 mx-1"
        label="내용"
        label-for="content"
        label-size="sm">
        <div
          id="content"
          class="anonymous-detail__content"
          v-if="isMoreMode">
          {{ anonymousInfo.content }}
        </div>

        <b-textarea
          id="content"
          v-else
          v-model="anonymousInfo.content"
          rows="6"
          max-rows="10"/>
      </b-form-group>
      <b-form-group
        class="col-3 mx-1"
        label="생성 일시"
        label-for="created_at"
        label-size="sm"
        v-if="isMoreMode && anonymousInfo['created_at'] !== undefined">
        <div
          id="created_at">
          {{ anonymousInfo['created_at'] }}
        </div>
      </b-form-group>
      <b-form-group
        class="col-3 mx-1"
        label="수정 일시"
        label-for="updated_at"
        label-size="sm"
        v-if="isMoreMode && anonymousInfo['updated_at'] !== undefined">
        <div
          id="updated_at">
          {{ anonymousInfo['updated_at'] }}
        </div>
      </b-form-group>
    </b-row>

    <b-row
      v-if="mode !== 'create'"
      class="anonymous-detail__row--final"
      no-gutters>
      <table
        class="anonymous-detail__table">
        <thead>
          <tr>
            <th>UID</th>
            <th class="anonymous-detail__comment--information">닉네임</th>
            <th class="anonymous-detail__comment--context">내용</th>
            <th v-if="!isMoreMode">Remove</th>
            <th v-if="!isMoreMode">Confirm</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(comment, index) in anonymousInfo.comments">
            <td>{{ comment.id }}</td>
            <td>
              <template
                v-if="isMoreMode">
                {{ comment.nickname }}
              </template>
              <b-input
                v-else
                size="sm"
                class="anonymous-detail__comment--information"
                v-model="comment.nickname"/>
            </td>
            <td>
              <template
                v-if="isMoreMode">
                {{ comment.content }}
              </template>
              <b-input
                v-else
                size="sm"
                class="anonymous-detail__comment--context"
                v-model="comment.content"/>
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
    name: "AnonymousDetail",
    data() {
      return {
        anonymousInfo: this.getAnonymousInfo()
      }
    },
    methods: {
      ...mapGetters({
        getAnonymousInfo: 'anonymous/getAnonymousInfo'
      }),
      ...mapActions({
        createArticle: 'anonymous/createArticle',
        deleteArticle: 'anonymous/deleteArticle',
        updateArticle: 'anonymous/updateArticle',
        createComment: 'anonymous/createComment',
        updateComment: 'anonymous/updateComment',
        deleteComment: 'anonymous/deleteComment'
      }),
      createArticleInfo() {
        if (confirm(`정말 게시물을 만드시겠습니까?`) && this.checkInfoDataValid()) {
          this.createArticle(this.anonymousInfo).then(
            res => {
              if(res) {
                alert('성공적으로 만들어졌습니다.');
                this.$bvModal.hide('anonymous-modal')
              }
            },
             error => {
              console.error(error);
             }
          )
        }
      },
      deleteArticleInfo() {
        if (confirm(`정말 ${this.anonymousInfo.name}을 삭제하겠습니까?`)) {
          this.deleteArticle().then(res => {
            if (res) {
              alert('성공적으로 삭제했습니다.');
              this.$bvModal.hide('anonymous-modal')
            }
          }, error => {
            console.log(error);
          })
        }
      },
      updateArticleInfo() {
        if (confirm(`정말 변경하시겠습니까?`) && this.checkInfoDataValid()) {
          this.updateArticle(this.anonymousInfo).then(res => {
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
          if(this.anonymousInfo.comments[index].context === null
            || this.anonymousInfo.comments[index].context === '') {
            alert('댓글 내용을 채워주세요.');
            vaildState = false;
          } else if(this.anonymousInfo.comments[index].nickname === null
            || this.anonymousInfo.comments[index].nickname === '') {
            alert('닉네임을 채워주세요.');
            vaildState = false;
          } else if(this.anonymousInfo.comments[index].id === undefined
            && this.anonymousInfo.comments[index].password === '') {
            alert('비밀번호를 채워주세요.');
            vaildState = false;
          }
          //id가 없을 시 create 있는 경우 update
          if(!vaildState && this.anonymousInfo.comments[index].id === undefined) {
            this.createComment(this.anonymousInfo.comments[index])
          } else
            this.updateComment({
              data: this.anonymousInfo.comments[index],
              index: index
            })
        }
      },
      removeCommentInfo(index) {
        if(this.anonymousInfo.comments[index].id !== undefined) {
          if (confirm('해당 댓글을 지우겠습니까?'))
            this.deleteComment(index);
        } else
          this.anonymousInfo.comments.splice(index, 1)
      },
      //anonymousInfo의 required 측정
      checkInfoDataValid() {
        if(this.anonymousInfo.title === null || this.anonymousInfo.title === '')
          alert('제목을 입력해주세요.');
        else if(this.anonymousInfo.nickname === null
          || this.anonymousInfo.nickname === '')
          alert('카테고리를 입력해주세요.');
        else if(this.anonymousInfo.content === null
          || this.anonymousInfo.content === '')
          alert('내용을 입력해주세요.');
        else if((this.anonymousInfo.password === '' === null
          || this.anonymousInfo.password === '') && this.mode === 'create')
        //create mode일 경우 빈칸을 감지한다.
          alert('비밀번호를 입력해주세요.');
        else
          return true;

        return false;
      },
      addCommentRow() {
        if(this.anonymousInfo.comments === null)
          this.anonymousInfo.comments = [];
        this.anonymousInfo.comments.push({
          nickname: null,
          //password valid 감지하기 쉽도록 빈칸으로 놓는다.
          password: '',
          content: null
        })
      }
    },
    watch: {
      mode(newValue) {
        if(newValue === 'create') {
          this.anonymousInfo = {};
          selected.default.anonymous.editableData.map(
            value => {
              this.anonymousInfo[value] = null
            }
          )
        } else
          this.anonymousInfo = this.getAnonymousInfo();
      },
      '$store.state.anonymous.articleInfo': {
        deep: true,
        handler() {
          this.anonymousInfo = this.getAnonymousInfo();
        }
      }
    },
    extends: defaultModal
  }
</script>

<style scoped>
  .anonymous-detail__row {
    justify-content: center;
    border-bottom: 1px gray solid;
    margin-bottom: 10px;
  }
  .anonymous-detail__row--final {
    justify-content: center;
  }
  .anonymous-detail__table {
    word-break: break-word;
    text-align: center;
    margin: 0 10px;
    width: 90%;
  }
  .anonymous-detail__comment--information {
    width: 120px;
    margin: 3px;
  }
  .anonymous-detail__comment--context {
    width: 450px;
    margin: 3px;
  }
</style>
