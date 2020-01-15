<template>
  <b-modal
    class="used-detail"
    id="used-modal"
    size="xl"
    @show="mode = initialMode"
    @hidden="hideModal">
    <template v-slot:modal-footer>
      <b-button
        size="sm"
        variant="outline-success"
        v-if="mode === 'create'"
        @click="createMarketItem">
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
        @click="updateMarketItem">
        Submit
      </b-button>

      <b-button
        size="sm"
        variant="danger"
        v-if="mode !== 'create'"
        @click="deleteMarketItem">
        Delete
      </b-button>
    </template>

    <b-row
      class="used-detail__row"
      no-gutters>
      <b-form-group
        class="col-2 mx-1"
        v-if="mode !== 'create'"
        label="ItemID"
        label-for="id"
        label-size="sm">
        <div
          id="id">
          {{ marketItemInfo.id }}
        </div>
      </b-form-group>
      <b-form-group
        class="col-2 mx-1"
        v-if="mode !== 'create'"
        label="작성자ID"
        label-for="id"
        label-size="sm">
        <div
          id="user_id">
          {{ marketItemInfo['user_id'] }}
        </div>
      </b-form-group>

      <b-form-group
        class="col-3 mx-1"
        v-if="mode !== 'create'"
        label="작성자"
        label-for="nickname"
        label-size="sm">
        <div id="nickname">
          {{ marketItemInfo.nickname }}
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
          {{ marketItemInfo.hit }}
        </div>
      </b-form-group>
    </b-row>
    <b-row
      class="used-detail__row"
      no-gutters>
      <b-form-group
        class="col-1 mx-1"
        label="종류"
        label-for="type"
        label-size="sm">
        <div
          id="type"
          v-if="isMoreMode">
          {{ marketItemInfo.type | convertString(typeOptions) }}
        </div>

        <b-select
          id="type"
          v-else
          v-model="marketItemInfo.type"
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
          {{ marketItemInfo.state | convertString(stateOptions) }}
        </div>

        <b-select
          id="state"
          v-else
          v-model="marketItemInfo.state"
          :options="stateOptions">
          <template #first>
            <option :value="null" disabled>없음</option>
          </template>
        </b-select>
      </b-form-group>
      <b-form-group
        class="col-3 mx-1"
        label="가격"
        label-for="price"
        label-size="sm">
        <div
          id="price"
          v-if="isMoreMode">
          {{ marketItemInfo.price + " 원" }}
        </div>

        <b-input-group
          id="price"
          v-else
          append="원">
          <b-input
            v-model="marketItemInfo.price"/>
        </b-input-group>
      </b-form-group>
      <b-form-group
        class="col-1 mx-1"
        label="핸드폰 공개"
        label-for="is_phone_open"
        label-size="sm">
        <b-checkbox
          id="is_phone_open"
          v-model="marketItemInfo['is_phone_open']"
          :disabled="isMoreMode"
          size="lg"
          switch/>
      </b-form-group>
      <b-form-group
        class="col-2 mx-1"
        label="핸드폰"
        label-for="phone"
        label-size="sm"
        v-if="marketItemInfo['is_phone_open']">
        <div
          id="phone"
          v-if="isMoreMode">
          {{ marketItemInfo.phone }}
        </div>

        <b-input
          id="phone"
          v-else
          v-model="marketItemInfo.phone"/>
      </b-form-group>
      <b-form-group
        class="col-1 mx-1"
        label="활성화"
        label-for="is_deleted"
        label-size="sm">
        <b-checkbox
          id="is_deleted"
          v-model="marketItemInfo['is_deleted']"
          :disabled="isMoreMode"
          :value="false"
          :unchecked-value="true"
          size="lg"
          switch/>
      </b-form-group>
    </b-row>
    <b-row
      class="used-detail__row"
      no-gutters>
      <b-form-group
        class="col-12 mx-1"
        label="제목"
        label-for="title"
        label-size="sm">
        <div
          id="context"
          class="used-detail__text"
          v-text="marketItemInfo.title"
          v-if="isMoreMode"></div>

        <b-input
          id="title"
          v-else
          v-model="marketItemInfo.title"/>
      </b-form-group>
      <b-form-group
        class="col-12 mx-1"
        label="내용"
        label-for="content"
        label-size="sm">
        <div
          id="content"
          v-if="isMoreMode">
          {{marketItemInfo.content}}
        </div>

        <b-textarea
          id="content"
          v-else
          v-model="marketItemInfo.content"
          rows="6"
          max-rows="10"/>
      </b-form-group>
      <b-form-group
        class="col-3 mx-1"
        label="생성 일시"
        label-for="created_at"
        label-size="sm"
        v-if="isMoreMode && marketItemInfo['created_at'] !== undefined">
        <div
          id="created_at">
          {{ marketItemInfo['created_at'] }}
        </div>
      </b-form-group>
      <b-form-group
        class="col-3 mx-1"
        label="수정 일시"
        label-for="updated_at"
        label-size="sm"
        v-if="isMoreMode && marketItemInfo['updated_at'] !== undefined">
        <div
          id="updated_at">
          {{ marketItemInfo['updated_at'] }}
        </div>
      </b-form-group>
    </b-row>

    <b-row
      class="used-detail__row"
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
            :src="marketItemInfo.thumbnail"
            width="500"/>
          <div
            v-else-if="marketItemInfo.thumbnail !== null">
            {{ marketItemInfo.thumbnail }}
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
      class="used-detail__row--final"
      no-gutters>
      <table
        class="used-detail__table">
        <thead>
        <tr>
          <th>UID</th>
          <th>닉네임</th>
          <th class="used-detail__comment">내용</th>
          <th>비활성화</th>
          <th v-if="!isMoreMode">Remove</th>
          <th v-if="!isMoreMode">Confirm</th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="(comment, index) in marketItemInfo.comments">
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
  import * as selected from "../../../../../static/selected";
  import {defaultModal} from "../../../../mixins/defualtModal";

  export default {
    name: "UsedDetail",
    props: {
      index: Number,
      initialMode: String
    },
    data() {
      return {
        //more: 일시 상세정보, edit: input form을 띄움
        marketItemInfo: this.getMarketItemInfo(),
        mode: '',
        currentThumbnail: null,
        typeOptions: [
          {value: 0, text: '팝니다'},
          {value: 1, text: '삽니다'}
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
        getMarketItemInfo: 'used/getMarketItemInfo'
      }),
      ...mapActions({
        deleteMarketItemInfo: 'used/deleteMarketItem',
        updateMarketItemInfo: 'used/updateMarketItem',
        createMarketItemInfo: 'used/createMarketItem',
        getMarketItemListComment: 'used/getMarketItemListComment',
        createMarketItemComment: 'used/createMarketItemComment',
        updateMarketItemComment: 'used/updateMarketItemComment',
        deleteMarketItemComment: 'used/deleteMarketItemComment',
        uploadThumbnailImage: 'used/uploadThumbnailImage'
      }),
      deleteMarketItem() {
        if (confirm(`정말 게시물을 삭제하겠습니까?`)) {
          this.deleteMarketItemInfo().then(
            res => {
              if (res) {
                alert('성공적으로 삭제했습니다.');
                this.$bvModal.hide('used-modal')
              }
            }, error => {
              console.log(error);
            })
        }
      },
      updateMarketItem() {
        if (confirm(`정말 변경하시겠습니까?`)) {
          this.updateMarketItemInfo(this.marketItemInfo).then(res => {
            if (res) {
              alert('성공적으로 변경되었습니다.');
              this.mode = 'more'
            }
          }, err => {
            console.log(err)
          })
        }
      },
      createMarketItem() {
        if (confirm(`정말 게시물을 만드시겠습니까?`)
          && this.checkInfoDataValid()) {
          this.createMarketItemInfo(this.marketItemInfo).then(
            res => {
              if (res) {
                alert('성공적으로 만들어졌습니다.');
                this.$bvModal.hide('used-modal')
              }
            },
            error => {
              console.error(error);
            }
          )
        }
      },
      //TODO: comment mixin으로 분리
      removeCommentInfo(index) {
        if(this.marketItemInfo.comments[index].id !== undefined) {
          if (confirm('해당 댓글을 지우겠습니까?'))
            this.deleteMarketItemComment(index);
        } else
          this.marketItemInfo.comments.splice(index, 1)
      },
      updateCommentInfo(index) {
        if(confirm('해당 댓글을 업데이트하시겠습니까?')) {
          let vaildState = true;
          //comment 내용이 빈칸인지 확인
          if(this.marketItemInfo.comments[index].context === null
            || this.marketItemInfo.comments[index].context === '')
            vaildState = false;
          //id가 없을 시 create 있는 경우 update
          if(!vaildState)
            alert('빈 칸을 모두 채워주세요.');
          else if(this.marketItemInfo.comments[index].id === undefined) {
            this.createMarketItemComment(this.marketItemInfo.comments[index])
              .then(
                () => {
                  alert('성공적으로 생성되었습니다.');
                }
              )
          } else
            this.updateMarketItemComment({
              data: this.marketItemInfo.comments[index],
              index: index
            }).then(
              () => {
                alert('성공적으로 수정되었습니다.');
              }
            )
        }
      },
      checkInfoDataValid() {
        if(this.marketItemInfo.type === null)
          alert('종류를 입력해주세요.');
        else if(this.marketItemInfo.state === null)
          alert('상태를 입력해주세요.');
        else if(this.marketItemInfo['is_phone_open']
          && !this.phoneRegex.test(this.marketItemInfo.phone))
          alert('핸드폰 공개를 끄거나 핸드폰을 입력해주세요 ex)010-1234-5678');
        else if(this.marketItemInfo.title === null || this.marketItemInfo.title === '')
          alert('제목을 입력해주세요.');
        else if(this.marketItemInfo.content === null
          || this.marketItemInfo.content === '')
          alert('내용을 입력해주세요.');
        else
          return true;

        return false;
      },
      addCommentRow() {
        if(this.marketItemInfo.comments === null)
          this.marketItemInfo.comments = [];
        this.marketItemInfo.comments.push({
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
        this.marketItemInfo.thumbnail = null;
      }
    },
    watch: {
      mode(newValue) {
        if (newValue === 'create') {
          this.marketItemInfo = {};
          console.log(selected.default)
          selected.default.used.editableData.map(
            value => {
              this.marketItemInfo[value] = null
            }
          )
        } else
          this.marketItemInfo = this.getMarketItemInfo();
      },
      '$store.state.used.marketItemInfo': {
        deep: true,
        handler() {
          console.log(this.getMarketItemInfo())
          this.marketItemInfo = this.getMarketItemInfo();
        }
      }
    },
    mixins: [defaultModal]
  }
</script>

<style scoped>
  .used-detail__row {
    justify-content: center;
    border-bottom: 1px gray solid;
    margin-bottom: 10px;
  }

  .used-detail__row--final {
    display: flex;
    justify-content: center;
  }
  .used-detail__text {
    word-break: break-word;
  }
  .used-detail__table {
    word-break: break-word;
    text-align: center;
    margin: 0 10px;
    width: 90%;
  }
  .used-detail__comment {
    width: 550px;
    margin: 3px;
  }
</style>
