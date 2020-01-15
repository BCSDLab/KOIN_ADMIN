<template>
  <b-modal
    class="land-detail"
    id="land-modal"
    size="xl"
    @show="mode = initialMode"
    @hidden="hideModal">
    <template v-slot:modal-footer>
      <b-button
        size="sm"
        variant="outline-success"
        v-if="mode === 'create'"
        @click="createLandInfo">
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
        @click="updateLandInfo">
        Submit
      </b-button>

      <b-button
        size="sm"
        variant="danger"
        v-if="mode !== 'create'"
        @click="deleteLandInfo">
        Delete
      </b-button>
    </template>

    <b-row
      class="land-detail__row"
      no-gutters>
      <b-form-group
        class="col-2 mx-1"
        v-if="mode !== 'create'"
        label="UID"
        label-for="id"
        label-size="sm">
        <div
          id="id">
          {{ landInfo.id }}
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
          {{ landInfo.name }}
        </div>

        <b-input
          id="name"
          v-else
          v-model="landInfo.name"/>
      </b-form-group>

      <b-form-group
        class="col-1 mx-1"
        label="방 크기"
        label-for="size"
        label-size="sm">
        <div
          id="size"
          v-if="isMoreMode">
          {{ landInfo.size !== null ? landInfo.size + "평" : "정보 없음"}}
        </div>
        <b-input-group
          id="size"
          v-else
          append="평">
          <b-input
            v-model="landInfo.size"/>
        </b-input-group>
      </b-form-group>
      <b-form-group
        class="col-1 mx-1"
        label="형태"
        label-for="room_type"
        label-size="sm">
        <div
          id="room_type"
          v-if="isMoreMode">
          {{ landInfo['room_type'] }}
        </div>

        <b-input
          id="room_type"
          v-else
          v-model="landInfo['room_type']"/>
      </b-form-group>
      <b-form-group
        class="col-1 mx-1"
        label="층수"
        label-for="floor"
        label-size="sm">
        <div
          id="floor"
          v-if="isMoreMode">
          {{ landInfo.floor !== null ? landInfo.floor + "층" : "정보 없음" }}
        </div>

        <b-input-group
          id="floor"
          v-else
          append="층">
          <b-input
            v-model="landInfo.floor"/>
        </b-input-group>
      </b-form-group>
    </b-row>
    <b-row
      class="land-detail__row"
      no-gutters>
      <b-form-group
        class="col-3 mx-1"
        label="위치(위도, 경도)"
        label-for="location"
        label-size="sm">
        <div
          id="location"
          v-if="isMoreMode">
          {{ landInfo.latitude }}
           ,
          {{ landInfo.longitude }}
        </div>

        <b-input-group
          id="location"
          v-else>
          <b-input
            v-model="landInfo.latitude"
            min="36"
            max="37"/>

          <b-input
            v-model="landInfo.longitude"
            min="127"
            max="128"/>
        </b-input-group>
      </b-form-group>

      <b-form-group
        class="col-6 mx-1"
        label="주소"
        label-for="address"
        label-size="sm">
        <div
          id="address"
          v-if="isMoreMode">
          {{ landInfo.address }}
        </div>

        <b-input
          id="address"
          v-else
          v-model="landInfo.address"/>
      </b-form-group>
      <b-form-group
        class="col-2 mx-1"
        label="핸드폰"
        label-for="phone"
        label-size="sm">
        <div
          id="phone"
          v-if="isMoreMode">
          {{ landInfo.phone }}
        </div>

        <b-input
          id="phone"
          v-else
          v-model="landInfo.phone"/>
      </b-form-group>
      <b-form-group
        class="col-12 mx-1"
        label="설명"
        label-for="description"
        label-size="sm">
        <div
          id="description"
          v-if="isMoreMode">
          {{landInfo.description}}
        </div>

        <b-textarea
          id="description"
          v-else
          v-model="landInfo.description"
          rows="2"
          max-rows="4"/>
      </b-form-group>
    </b-row>
    <b-row
      class="land-detail__row"
      no-gutters>
      <b-form-group
        class="col-11 mx-1"
        label="이미지 파일"
        label-for="image_urls"
        label-size="sm">
        <div
          id="image_urls"
          v-for="(url, index) in landInfo['image_urls']"
          :key="index">
          <b-img
            v-if="isMoreMode"
            :src="url"
            width="500"/>
          <template v-else>
            {{ url }}
            <b-button
              variant="danger"
              @click="removeImage(index)">
              -
            </b-button>
          </template>
        </div>
        <b-file
          v-if="!isMoreMode"
          v-model="currentImage"
          accept="image/*"
          @change="imageUpload"/>
      </b-form-group>
    </b-row>
    <b-row
      class="land-detail__row"
      no-gutters>
      <b-form-group
        class="col-2 mx-1"
        label="보증금"
        label-for="deposit"
        label-size="sm">
        <div
          id="deposit"
          v-if="isMoreMode">
          {{ landInfo.deposit !== null ? landInfo.deposit + "만원" : "정보 없음"}}
        </div>

        <b-input-group
          id="deposit"
          v-else
          append="만원">
          <b-input
            v-model="landInfo.deposit"/>
        </b-input-group>
      </b-form-group>
      <b-form-group
        class="col-2 mx-1"
        label="월세 가격"
        label-for="monthly_fee"
        label-size="sm">
        <div
          id="monthly_fee"
          v-if="isMoreMode">
          {{ landInfo['monthly_fee'] !== null ? landInfo['monthly_fee'] : "정보 없음" }}
        </div>

        <b-input
          id="monthly_fee"
          v-else
          v-model="landInfo['monthly_fee']"/>
      </b-form-group>
      <b-form-group
        class="col-2 mx-1"
        label="전세 가격"
        label-for="charter_fee"
        label-size="sm">
        <div
          id="charter_fee"
          v-if="isMoreMode">
          {{ landInfo['charter_fee'] !== null ? landInfo['charter_fee'] + "만원" : "정보 없음" }}
        </div>

        <b-input-group
          id="charter_fee"
          v-else
          append="만원">
          <b-input
            v-model="landInfo['charter_fee']"/>
        </b-input-group>
      </b-form-group>
      <b-form-group
        class="col-5 mx-1"
        label="관리비"
        label-for="management_fee"
        label-size="sm">
        <div
          id="management_fee"
          v-if="isMoreMode">
          {{ landInfo['management_fee'] !== null ? landInfo['management_fee'] : "정보 없음" }}
        </div>

        <b-input
          id="management_fee"
          v-else
          v-model="landInfo['management_fee']"/>
      </b-form-group>
    </b-row>
    <b-row
      class="land-detail__row--final"
      no-gutters>
      <b-form-group
        class="col-1"
        v-for="furniture in furnitureList"
        :key="furniture.value"
        :label="furniture.text"
        :label-for="'opt_' + furniture.value"
        label-size="sm">
        <b-checkbox
          id="is_phone_open"
          v-model="landInfo['opt_' + furniture.value]"
          :disabled="isMoreMode"
          size="lg"
          switch/>
      </b-form-group>
    </b-row>
  </b-modal>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import * as selected from "../../../../../static/selected.js"
  import {defaultModal} from "../../../../mixins/defualtModal";

  export default {
    name: "LandDetail",
    props: {
      index: Number,
      initialMode: String
    },
    data() {
      return {
        //more: 일시 상세정보, edit: input form을 띄움
        mode: '',
        landInfo: this.getLandInfo(),
        currentImage: null,
        //가구 리스트
        furnitureList: selected.default.land.furnitureList,
        phoneRegex: /^[0-9]{3}[-]+[0-9]{3,4}[-]+[0-9]{4}$/
      }
    },
    methods: {
      ...mapGetters({
        getLandInfo: 'land/getLandInfo'
      }),
      ...mapActions({
        createLand: 'land/createLand',
        deleteLand: 'land/deleteLand',
        updateLand: 'land/updateLand',
        uploadImage: 'land/uploadImage'
      }),
      createLandInfo() {
        if (confirm(`정말 ${this.landInfo.name}을 만드시겠습니까?`) && this.checkInfoDataValid()) {
          this.createLand(this.landInfo).then(
            res => {
              if (res) {
                alert('성공적으로 만들어졌습니다.');
                this.$bvModal.hide('land-modal')
              }
            },
            error => {
              console.error(error);
            }
          )
        }
      },
      deleteLandInfo() {
        if (confirm(`정말 ${this.landInfo.name}을 삭제하겠습니까?`)) {
          this.deleteLand().then(res => {
            if (res) {
              alert('성공적으로 삭제했습니다.');
              this.$bvModal.hide('land-modal')
            }
          }, error => {
            console.log(error);
          })
        }
      },
      updateLandInfo() {
        if (confirm(`정말 ${this.landInfo.name}을 변경하시겠습니까?`)
          && this.checkInfoDataValid()) {
          this.updateLand(this.landInfo).then(res => {
            if (res) {
              alert('성공적으로 변경되었습니다.');
              this.mode = 'more'
            }
          }, err => {
            console.log(err)
          })
        }
      },
      //이미지를 서버에 업로드 후 배열에 추가
      async imageUpload (event) {
        let formData = new FormData();
        formData.append('image[]', event.target.files[0]);
        await this.uploadImage(formData);
        this.currentImage = null;
      },
      //이미지 하나를 배열에서 제거
      removeImage(index) {
        if(confirm('이미지를 삭제하시겠습니까?'))
          this.landInfo['image_urls'].splice(index, 1);
      },
      checkInfoDataValid() {
        if(this.landInfo.name === null || this.landInfo.name === '')
          alert('가게 이름을 입력해주세요.');
        else if(this.landInfo['room_type'] === null)
          alert('방의 형태를 입력해주세요.');
        else if(!(this.landInfo.phone === null) && !(this.landInfo.phone === '')
          && !this.phoneRegex.test(this.landInfo.phone)) {
          alert('핸드폰 번호을 제대로 입력해주세요.');
        } else if(this.landInfo.latitude === null || this.landInfo.latitude === '')
          alert('위도를 제대로 입력해주세요.');
        else if(this.landInfo.longitude === null || this.landInfo.longitude === '')
          alert('경도를 제대로 입력해주세요.');
        else {
          this.landInfo.latitude = Number(this.landInfo.latitude);
          this.landInfo.longitude = Number(this.landInfo.longitude);
          return true;
        }
        return false;
      }
    },
    watch: {
      mode(newValue) {
        if (newValue === 'create') {
          this.landInfo = {};
          selected.default.land.editableData.map(
            value => {
              this.landInfo[value] = null
            }
          )
        } else
          this.landInfo = this.getLandInfo();
      },
      '$store.state.land.landInfo': {
        deep: true,
        handler() {
          this.landInfo = this.getLandInfo();
        }
      }
    },
    mixins: [defaultModal]
  }
</script>

<style scoped>
  .land-detail__row {
    justify-content: center;
    border-bottom: 1px gray solid;
    margin-bottom: 10px;
  }
  .land-detail__row--final {
    display: flex;
    justify-content: center;
  }
</style>
