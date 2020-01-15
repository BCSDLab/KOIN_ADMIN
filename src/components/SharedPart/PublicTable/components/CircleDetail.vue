<template>
  <b-modal
    class="circle-detail"
    id="circle-modal"
    size="xl"
    @show="mode = initialMode"
    @hidden="hideModal">
    <template v-slot:modal-footer>
      <b-button
        size="sm"
        variant="outline-success"
        v-if="mode === 'create'"
        @click="createCircleInfo">
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
        @click="updateCircleInfo">
        Submit
      </b-button>

      <b-button
        size="sm"
        variant="danger"
        v-if="mode !== 'create'"
        @click="deleteCircleInfo">
        Delete
      </b-button>
    </template>

    <b-row
      class="circle-detail__row"
      no-gutters>
      <b-form-group
        class="col-2 mx-1"
        v-if="mode !== 'create'"
        label="ID"
        label-for="id"
        label-size="sm">
        <div
          id="id">
          {{ circleInfo.id }}
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
          {{ circleInfo.name }}
        </div>

        <b-input
          id="name"
          v-else
          v-model="circleInfo.name"/>
      </b-form-group>

      <b-form-group
        class="col-2 mx-1"
        label="분류"
        label-for="category"
        label-size="sm">
        <div
          id="category"
          v-if="isMoreMode">
          {{ circleInfo.category | convertString(categoryOptions) }}
        </div>

        <b-select
          id="category"
          v-else
          :options="categoryOptions"
          v-model="circleInfo.category">
          <template #first>
            <option :value="null" disabled>--- 선택하세요 ---</option>
          </template>
        </b-select>
      </b-form-group>

      <b-form-group
        class="col-2 mx-1"
        label="위치"
        label-for="location"
        label-size="sm">
        <div
          id="location"
          v-if="isMoreMode">
          {{ circleInfo.location }}
        </div>

        <b-input
          id="location"
          v-else
          v-model="circleInfo.location"/>
      </b-form-group>

      <b-form-group
        class="col-2 mx-1"
        label="담당교수"
        label-for="professor"
        label-size="sm">
        <div
          id="professor"
          v-if="isMoreMode">
          {{ circleInfo.professor }}
        </div>

        <b-input
          id="professor"
          v-else
          v-model="circleInfo.professor">
        </b-input>
      </b-form-group>
    </b-row>
    <b-row
      class="circle-detail__row"
      no-gutters>
      <b-form-group
        class="col-12 mx-1"
        label="한줄 소개"
        label-for="line_description"
        label-size="sm">
        <div
          id="line_description"
          v-if="isMoreMode">
          {{ circleInfo['line_description'] }}
        </div>

        <b-input
          id="line_description"
          v-else
          v-model="circleInfo['line_description']"/>
      </b-form-group>

      <b-form-group
        class="col-12 mx-1"
        label="소개"
        label-for="description"
        label-size="sm">
        <div
          id="description"
          class="circle-detail__description"
          v-if="isMoreMode">
          {{ circleInfo.description }}
        </div>

        <b-textarea
          id="description"
          v-else
          v-model="circleInfo.description"
          row="2"
          max-rows="4"/>
      </b-form-group>
    </b-row>
    <b-row
      class="circle-detail__row"
      no-gutters>
      <b-form-group
        class="col-4 mx-1"
        label="주요활동"
        label-for="major_business"
        label-size="sm">
        <div
          id="major_business"
          v-if="isMoreMode">
          {{ circleInfo['major_business'] }}
        </div>

        <b-input
          id="major_business"
          v-else
          v-model="circleInfo['major_business']"/>
      </b-form-group>

      <b-form-group
        class="col-7 mx-1"
        label="메인페이지"
        label-for="introduce_url"
        label-size="sm">
        <div
          id="introduce_url"
          v-if="isMoreMode">
          {{ circleInfo['introduce_url'] }}
        </div>

        <b-input
          id="introduce_url"
          v-else
          type="url"
          v-model="circleInfo['introduce_url']"/>
      </b-form-group>
    </b-row>
    <b-row
      class="circle-detail__row--final"
      no-gutters>
      <b-form-group
        class="col-11 mx-1"
        label="로고"
        label-for="logo_url"
        label-size="sm">
        <div
          id="logo_url">
          <b-img
            v-if="isMoreMode"
            :src="circleInfo['logo_url']"
            width="100"/>
          <div
            v-else-if="circleInfo['logo_url']">
            {{ circleInfo['logo_url'] }}
            <b-button
              variant="danger"
              @click="circleInfo['logo_url'] = ''">
              -
            </b-button>
          </div>
        </div>
        <b-file
          v-if="!isMoreMode"
          v-model="currentLogoImage"
          accept="image/*"
          @change="setImage($event, 0)"/>
      </b-form-group>

      <b-form-group
        class="col-11 mx-1"
        label="배경 사진"
        label-for="background_img_url"
        label-size="sm">
        <div
          id="background_img_url">
          <b-img
            v-if="isMoreMode"
            :src="circleInfo['background_img_url']"
            width="500"/>
          <div
            v-else-if="circleInfo['background_img_url']">
            {{ circleInfo['background_img_url'] }}
            <b-button
              variant="danger"
              @click="circleInfo['background_img_url'] = ''">
              -
            </b-button>
          </div>
        </div>
        <b-file
          v-if="!isMoreMode"
          v-model="currentLogoImage"
          accept="image/*"
          @change="setImage($event, 1)"/>
      </b-form-group>
      <b-form-group
        class="col-1 mx-1"
        label="활성화"
        label-for="is_deleted"
        label-size="sm">
        <b-checkbox
          id="is_deleted"
          v-model="circleInfo['is_deleted']"
          :disabled="isMoreMode"
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
    name: "CircleDetail",
    props: {
      initialMode: String
    },
    data() {
      return {
        //more: 일시 상세정보, edit: input form을 띄움
        mode: '',
        circleInfo: this.getCircleInfo(),
        categoryOptions: [
          {value: 'C001', text: '예술'},
          {value: 'C002', text: '공연'},
          {value: 'C003', text: '운동'},
          {value: 'C004', text: '학술'},
          {value: 'C005', text: '종교'},
          {value: 'C006', text: '봉사'},
          {value: 'C007', text: '준'}
        ],
        currentLogoImage: null,
        currentBackgroundImage: null
      }
    },
    methods: {
      ...mapGetters({
        getCircleInfo: 'circle/getCircleInfo'
      }),
      ...mapActions({
        createCircle: 'circle/createCircle',
        deleteCircle: 'circle/deleteCircle',
        updateCircle: 'circle/updateCircle',
        uploadImage: 'uploadImage'
      }),
      createCircleInfo() {
        if(confirm('정말 새로운 동아리를 만드시겠습니까?') && this.checkInfoDataValid())
          this.createCircle(this.circleInfo).then(res => {
            if (res) {
              alert('성공적으로 만들었습니다.');
              this.$bvModal.hide('circle-modal')
            }
          }, error => {
            console.log(error);
          })
      },
      deleteCircleInfo() {
        if (confirm(`정말 ${this.circleInfo['name']}을 삭제하겠습니까?`)
          && this.checkInfoDataValid()) {
          this.deleteCircle().then(res => {
            if (res) {
              alert('성공적으로 삭제했습니다.');
              this.$bvModal.hide('circle-modal')
            }
          }, error => {
            console.log(error);
          })
        }
      },
      updateCircleInfo() {
        if (confirm(`정말 변경하시겠습니까?`) && this.checkInfoDataValid()) {
          this.updateCircle(this.circleInfo).then(res => {
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
        if(this.circleInfo.name === null
          || this.circleInfo.name === '')
          alert('동아리 이름을 입력해주세요.');
        else if(this.circleInfo.category === null)
          alert('분류를 골라주세요.');
        else if(this.circleInfo.description === '' && this.circleInfo.description === null)
          alert('소개는 정도는 입력해주세요.');
        else
          return true;

        return false;
      },
      async setImage(event, flag) {
        let formData = new FormData();
        formData.append('image', event.target.files[0]);
        let url = await this.uploadImage(formData);
        if(flag === 0) {
          this.circleInfo['logo_url'] = url;
          this.currentLogoImage = null;
        } else {
          this.circleInfo['background_img_url'] = url;
          this.currentBackgroundImage = null;
        }
      }
    },
    watch: {
      mode(newValue) {
        if(newValue === 'create') {
          this.circleInfo = {};
          selected.default.circle.editableData.map(
            value => {
              this.circleInfo[value] = null
            }
          )
        } else {
          this.circleInfo = this.getCircleInfo();
        }
      },
      '$store.state.circle.circleInfo': {
        deep: true,
        handler() {
          this.circleInfo = this.getCircleInfo();
        }
      }
    },
    mixins: [defaultModal]
  }
</script>

<style scoped>
  .circle-detail__row {
    justify-content: center;
    border-bottom: 1px gray solid;
    margin-bottom: 10px;
  }
  .circle-detail__row--final {
    justify-content: center;
  }
  .circle-detail__description {
    white-space: pre-line;
  }
</style>
