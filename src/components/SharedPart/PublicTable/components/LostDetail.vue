<template>
  <b-modal
    class="lost-detail"
    id="lost-modal"
    size="xl"
    @show="mode = initialMode"
    @hidden="hideModal">
    <template v-slot:modal-footer>
      <b-button
        size="sm"
        variant="outline-success"
        v-if="mode === 'create'"
        @click="createLostInfo">
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
        @click="updateLostInfo">
        Submit
      </b-button>

      <b-button
        size="sm"
        variant="danger"
        v-if="mode !== 'create'"
        @click="deleteLostInfo">
        Delete
      </b-button>
    </template>

    <b-row
      class="lost-detail__row"
      no-gutters>
      <b-form-group
        class="col-2 mx-1"
        v-if="mode !== 'create'"
        label="ItemID"
        label-for="id"
        label-size="sm">
        <div
          id="id">
          {{ lostItemInfo.id }}
        </div>
      </b-form-group>
      <b-form-group
        class="col-2 mx-1"
        v-if="mode !== 'create'"
        label="작성자ID"
        label-for="user_id"
        label-size="sm">
        <div
          id="user_id">
          {{ lostItemInfo['user_id'] }}
        </div>
      </b-form-group>

      <b-form-group
        class="col-3 mx-1"
        v-if="mode !== 'create'"
        label="작성자"
        label-for="nickname"
        label-size="sm">
        <div id="nickname">
          {{ lostItemInfo.nickname }}
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
          {{ lostItemInfo.hit }}
        </div>
      </b-form-group>
    </b-row>
    <b-row
      class="lost-detail__row"
      no-gutters>
      <b-form-group
        class="col-1 mx-1"
        label="종류"
        label-for="type"
        label-size="sm">
        <div
          id="type"
          v-if="isMoreMode">
          {{ lostItemInfo.type | convertString(typeOptions) }}
        </div>

        <b-select
          id="type"
          v-else
          v-model="lostItemInfo.type"
          :options="typeOptions">
          <template #first>
            <option :value="null" disabled>없음</option>
          </template>
        </b-select>
      </b-form-group>

      <b-form-group
        class="col-1 mx-1"
        label="상태"
        label-for="state"
        label-size="sm">
        <div
          id="state"
          v-if="isMoreMode">
          {{ lostItemInfo.state | convertString(stateOptions) }}
        </div>

        <b-select
          id="state"
          v-else
          v-model="lostItemInfo.state"
          :options="stateOptions">
          <template #first>
            <option :value="null" disabled>없음</option>
          </template>
        </b-select>
      </b-form-group>
      <b-form-group
        class="col-3 mx-1"
        label="위치"
        label-for="location"
        label-size="sm">
        <div
          id="location"
          v-if="isMoreMode">
          {{ lostItemInfo.location }}
        </div>

        <b-input
          id="location"
          v-else
          v-model="lostItemInfo.location"/>
      </b-form-group>
      <b-form-group
        class="col-1 mx-1"
        label="핸드폰 공개"
        label-for="is_phone_open"
        label-size="sm">
        <b-checkbox
          id="is_phone_open"
          v-model="lostItemInfo['is_phone_open']"
          :disabled="isMoreMode"
          size="lg"
          switch/>
      </b-form-group>
      <b-form-group
        class="col-2 mx-1"
        label="핸드폰"
        label-for="phone"
        label-size="sm"
        v-if="lostItemInfo['is_phone_open']">
        <div
          id="phone"
          v-if="isMoreMode">
          {{ lostItemInfo.phone }}
        </div>

        <b-input
          id="phone"
          v-else
          v-model="lostItemInfo.phone"/>
      </b-form-group>
      <b-form-group
        class="col-1 mx-1"
        label="활성화"
        label-for="is_deleted"
        label-size="sm">
        <b-checkbox
          id="is_deleted"
          v-model="lostItemInfo['is_deleted']"
          :disabled="isMoreMode"
          :value="false"
          :unchecked-value="true"
          size="lg"
          switch/>
      </b-form-group>
    </b-row>
    <b-row
      class="lost-detail__row"
      no-gutters>
      <b-form-group
        class="col-12 mx-1"
        label="제목"
        label-for="title"
        label-size="sm">
        <div
          id="title"
          class="lost-detail__text"
          v-text="lostItemInfo.title"
          v-if="isMoreMode"></div>

        <b-input
          id="title"
          v-else
          v-model="lostItemInfo.title"/>
      </b-form-group>
      <b-form-group
        class="col-12 mx-1"
        label="내용"
        label-for="content"
        label-size="sm">
        <div
          id="content"
          v-if="isMoreMode">
          {{lostItemInfo.content}}
        </div>

        <b-textarea
          id="content"
          v-else
          v-model="lostItemInfo.content"
          rows="6"
          max-rows="10"/>
      </b-form-group>
      <b-form-group
        class="col-3 mx-1"
        label="생성 일시"
        label-for="created_at"
        label-size="sm"
        v-if="isMoreMode && lostItemInfo['created_at'] !== undefined">
        <div
          id="created_at">
          {{ lostItemInfo['created_at'] }}
        </div>
      </b-form-group>
      <b-form-group
        class="col-3 mx-1"
        label="수정 일시"
        label-for="updated_at"
        label-size="sm"
        v-if="isMoreMode && lostItemInfo['updated_at'] !== undefined">
        <div
          id="updated_at">
          {{ lostItemInfo['updated_at'] }}
        </div>
      </b-form-group>
    </b-row>

    <b-row
      class="lost-detail__row"
      no-gutters>
      <b-form-group
        class="col-11 mx-1"
        label="이미지 파일"
        label-for="thumbnail"
        label-size="sm">
        <div
          id="image_urls"
          class="my-1">
          <b-img
            v-if="isMoreMode"
            :src="lostItemInfo.thumbnail"
            width="500"/>
          <div
            v-else-if="lostItemInfo.thumbnail !== null">
            {{ lostItemInfo.thumbnail }}
            <b-button
              variant="danger"
              @click="removeThumbnail">
              -
            </b-button>
          </div>
        </div>
        <b-file
          v-if="!isMoreMode"
          v-model="currentThumbnail"
          accept="image/*"
          @change="uploadThumbnail"/>
      </b-form-group>
    </b-row>

    <b-row
      v-if="mode !== 'create'"
      class="lost-detail__row--final"
      no-gutters>
      <table
        class="lost-detail__table">
        <thead>
        <tr>
          <th>UID</th>
          <th>닉네임</th>
          <th class="lost-detail__comment">내용</th>
          <th>비활성화</th>
          <th v-if="!isMoreMode">Remove</th>
          <th v-if="!isMoreMode">Confirm</th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="(comment, index) in lostItemInfo.comments">
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
              v-model="comment['is_deleted']"
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
              variant="primary"
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
  import {mapGetters, mapActions} from 'vuex'
  import * as selected from "../../../../../static/selected.js"
  import {defaultModal} from "../../../../mixins/defualtModal";

  export default {
    name: "LostDetail",
    props: {
      index: Number,
      initialMode: String
    },
    data() {
      return {
        //more: 일시 상세정보, edit: input form을 띄움
        mode: '',
        lostItemInfo: this.getLostItemInfo(),
        currentThumbnail: null,
        typeOptions: [
          {value: 1, text: '습득'},
          {value: 0, text: "찾기"}
        ],
        stateOptions: [
          {value: 2, text: '완료'},
          {value: 1, text: '중지'},
          {value: 0, text: "진행 중"}
        ],
        phoneRegex: /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/
      }
    },
    methods: {
      ...mapGetters({
        getLostItemInfo: 'lost/getLostItemInfo'
      }),
      ...mapActions({
        createLostItem: 'lost/createLostItem',
        deleteLostItem: 'lost/deleteLostItem',
        updateLostItem: 'lost/updateLostItem',
        createLostItemComment: 'lost/createLostItemComment',
        updateLostItemComment: 'lost/updateLostItemComment',
        deleteLostItemComment: 'lost/deleteLostItemComment',
        uploadThumbnailImage: 'lost/uploadThumbnailImage'
      }),
      createLostInfo() {
        if (confirm('정말 게시물을 만드시겠습니까?'))
          this.createLostItem(this.lostItemInfo).then(res => {
            if (res) {
              alert('성공적으로 만들었습니다.');
              this.$bvModal.hide('lost-modal')
            }
          }, error => {
            console.log(error);
          })
      },
      deleteLostInfo() {
        if (confirm(`정말 ${this.lostItemInfo['title']}을 삭제하겠습니까?`)) {
          this.deleteLostItem().then(res => {
            if (res) {
              alert('성공적으로 삭제했습니다.');
              this.$bvModal.hide('lost-modal')
            }
          }, error => {
            console.log(error);
          })
        }
      },
      updateLostInfo() {
        if (confirm(`정말 변경하시겠습니까?`) && this.checkInfoDataValid()) {
          this.updateLostItem(this.lostItemInfo).then(res => {
            if (res) {
              alert('성공적으로 변경되었습니다.');
              this.mode = 'more'
            }
          }, err => {
            console.log(err)
          })
        }
      },
      //TODO: comment mixin으로 분리
      removeCommentInfo(index) {
        if(this.lostItemInfo.comments[index].id !== undefined) {
          if (confirm('해당 댓글을 지우겠습니까?'))
            this.deleteLostItemComment(index);
        } else
          this.lostItemInfo.comments.splice(index, 1)
      },
      updateCommentInfo(index) {
        if(confirm('해당 댓글을 업데이트하시겠습니까?')) {
          let vaildState = true;
          //comment 내용이 빈칸인지 확인
          if(this.lostItemInfo.comments[index].context === null
            || this.lostItemInfo.comments[index].context === '')
            vaildState = false;
          //id가 없을 시 create 있는 경우 update
          if(!vaildState)
            alert('빈 칸을 모두 채워주세요.');
          else if(this.lostItemInfo.comments[index].id === undefined) {
            this.createLostItemComment(this.lostItemInfo.comments[index])
              .then(
                () => {
                  alert('성공적으로 생성되었습니다.');
                }
              )
          } else
            this.updateLostItemComment({
              data: this.lostItemInfo.comments[index],
              index: index
            }).then(
              () => {
                alert('성공적으로 수정되었습니다.');
              }
            )
        }
      },
      checkInfoDataValid() {
        if(this.lostItemInfo.type === null)
          alert('종류를 입력해주세요.');
        else if(this.lostItemInfo.state === null)
          alert('상태를 입력해주세요.');
        else if(this.lostItemInfo['is_phone_open']
          && !this.phoneRegex.test(this.lostItemInfo.phone))
          alert('핸드폰 공개를 끄거나 핸드폰을 입력해주세요 ex)010-1234-5678');
        else if(this.lostItemInfo.title === null || this.lostItemInfo.title === '')
          alert('제목을 입력해주세요.');
        else if(this.lostItemInfo.content === null
          || this.lostItemInfo.content === '')
          alert('내용을 입력해주세요.');
        else
          return true;

        return false;
      },
      addCommentRow() {
        if(this.lostItemInfo.comments === null)
          this.lostItemInfo.comments = [];
        this.lostItemInfo.comments.push({
          content: null,
          'is_deleted': false
        })
      },
      async uploadThumbnail(event) {
        let formData = new FormData();
        formData.append('image', event.target.files[0]);
        await this.uploadThumbnailImage(formData)
          .then(
            () => {
              this.currentThumbnail = null;
            }
          );
      },
      removeThumbnail() {
        this.lostItemInfo.thumbnail = null;
      }
    },
    mixins: [defaultModal],
    watch: {
      mode(newValue) {
        if (newValue === 'create') {
          this.lostItemInfo = {};
          selected.default.lost.editableData.map(
            value => {
              this.marketItemInfo[value] = null
            }
          );
        } else {
          this.lostItemInfo = this.getLostItemInfo();
        }
      },
      '$store.state.lost.lostItemInfo': {
        deep: true,
        handler() {
          this.lostItemInfo = this.getLostItemInfo();
        }
      }
    }
  }
</script>

<style scoped>
  .lost-detail__row {
    justify-content: center;
    border-bottom: 1px gray solid;
    margin-bottom: 10px;
  }

  .lost-detail__row--final {
    display: flex;
    justify-content: center;
  }
  .lost-detail__text {
    word-break: break-word;
  }
  .lost-detail__table {
    word-break: break-word;
    text-align: center;
    margin: 0 10px;
    width: 90%;
  }
  .lost-detail__comment {
    width: 550px;
    margin: 3px;
  }
</style>
