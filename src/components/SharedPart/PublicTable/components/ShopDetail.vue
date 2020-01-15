<template>
  <b-modal
    class="shop-detail"
    id="shop-modal"
    size="xl"
    @show="mode = initialMode"
    @hidden="hideModal">
    <template v-slot:modal-footer>
      <b-button
        size="sm"
        variant="outline-success"
        v-if="mode === 'create'"
        @click="createShopInfo">
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
        @click="updateShopInfo">
        Submit
      </b-button>

      <b-button
        size="sm"
        variant="danger"
        v-if="mode !== 'create'"
        @click="deleteShopInfo">
        Delete
      </b-button>
    </template>

    <b-row
      class="shop-detail__row"
      no-gutters>
      <b-form-group
        class="col-2 mx-1"
        v-if="mode !== 'create'"
        label="ID"
        label-for="id"
        label-size="sm">
        <div
          id="id">
          {{ shopInfo.id }}
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
          {{ shopInfo.name }}
        </div>

        <b-input
          id="name"
          v-else
          v-model="shopInfo.name"/>
      </b-form-group>

      <b-form-group
        class="col-3 mx-1"
        label="Category"
        label-for="category"
        label-size="sm">
        <div
          id="category"
          v-if="isMoreMode">
          {{ shopInfo.category | convertString(categoryOptions) }}
        </div>

        <b-select
          id="category"
          v-else
          v-model="shopInfo.category"
          :options="categoryOptions"
          >
          <template #first>
            <option :value="null" disabled>--- 선택하세요 ---</option>
          </template>
        </b-select>
      </b-form-group>

      <b-form-group
        class="col-3 mx-1"
        label="Opening Hours"
        label-for="opening_hours"
        label-size="sm">
        <div
          id="opening_hours"
          v-if="isMoreMode">
          {{ shopInfo['open_time'] }}
          ~
          {{ shopInfo['close_time'] }}
        </div>

        <b-input-group
          id="opening_hours"
          v-else>
          <b-input
            v-model="shopInfo['open_time']"/>

          <b-input
            v-model="shopInfo['close_time']"/>
        </b-input-group>
      </b-form-group>
    </b-row>
    <b-row
      class="shop-detail__row"
      no-gutters>
      <b-form-group
        class="col-2 mx-1"
        label="전화번호"
        label-for="phone"
        label-size="sm">
        <div
          id="phone"
          v-if="isMoreMode">
          {{ shopInfo.phone }}
        </div>

        <b-input
          id="phone"
          v-else
          v-model="shopInfo.phone"
          />
      </b-form-group>

      <b-form-group
        class="col-9 mx-1"
        label="주소"
        label-for="address"
        label-size="sm">
        <div
          id="address"
          v-if="isMoreMode">
          {{ shopInfo.address }}
        </div>

        <b-input
          id="address"
          v-else
          v-model="shopInfo.address"
          />
      </b-form-group>

      <b-form-group
        class="col-11 mx-1"
        label="설명"
        label-for="description"
        label-size="sm">
        <div
          id="description"
          v-if="isMoreMode">
          {{ shopInfo.description }}
        </div>

        <b-textarea
          id="description"
          v-else
          v-model="shopInfo.description"
          rows="2"
          max-rows="3"/>
      </b-form-group>
    </b-row>
    <b-row
      class="shop-detail__row"
      no-gutters>
      <b-form-group
        class="col-2 mx-1"
        label="배달가능여부"
        label-for="delivery"
        label-size="sm">
        <b-checkbox
          id="delivery"
          v-model="shopInfo.delivery"
          :disabled="isMoreMode"
          size="lg"
          switch/>
      </b-form-group>

      <b-form-group
        class="col-2 mx-1"
        label="배달료"
        label-for="delivery_price"
        label-size="sm">
        <div
          id="delivery_price"
          v-if="isMoreMode">
          {{ shopInfo.delivery ? shopInfo['delivery_price'] : '없음'}}
        </div>

        <b-input
          id="delivery_price"
          v-else
          v-model="shopInfo['delivery_price']"
          :disabled="!shopInfo.delivery"/>
      </b-form-group>

      <b-form-group
        class="col-2 mx-1"
        label="카드가능여부"
        label-for="pay_card"
        label-size="sm">
        <b-checkbox
          id="pay_card"
          v-model="shopInfo['pay_card']"
          :disabled="isMoreMode"
          size="lg"
          switch/>
      </b-form-group>

      <b-form-group
        class="col-2 mx-1"
        label="계좌이체가능여부"
        label-for="pay_bank"
        label-size="sm">
        <b-checkbox
          id="pay_bank"
          v-model="shopInfo['pay_bank']"
          :disabled="isMoreMode"
          size="lg"
          switch/>
      </b-form-group>

      <b-form-group
        class="col-2 mx-1"
        label="이벤트 여부"
        label-for="is_event"
        label-size="sm">
        <b-checkbox
          id="is_event"
          v-model="shopInfo['is_event']"
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
          v-model="shopInfo['is_deleted']"
          :value="false"
          :unchecked-value="true"
          :disabled="isMoreMode"
          size="lg"
          switch/>
      </b-form-group>

      <b-form-group
        class="col-11 mx-1"
        label="행사비고"
        label-for="remark"
        label-size="sm">
        <div
          id="remark"
          v-if="isMoreMode">
          {{ shopInfo.remark }}
        </div>

        <b-textarea
          id="remark"
          v-else
          v-model="shopInfo.remark"
          rows="2"
          max-rows="3"/>
      </b-form-group>
    </b-row>

    <b-row
      class="shop-detail__row"
      no-gutters>
      <b-form-group
        class="col-11 mx-1"
        label="이미지 파일"
        label-for="image_urls"
        label-size="sm">
        <div
          id="image_urls"
          v-for="(url, index) in shopInfo['image_urls']"
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
          accept="image/*"
          @change="imageUpload"/>
      </b-form-group>
    </b-row>
    <b-row
      v-if="mode !== 'create'"
      class="shop-detail__row"
      no-gutters>
      <table
        class="shop-detail__table">
        <thead>
          <tr>
            <th>UID</th>
            <th>메뉴</th>
            <th>사이즈</th>
            <th>가격</th>
            <th>활성화</th>
            <th v-if="!isMoreMode">Remove</th>
            <th v-if="!isMoreMode">Confirm</th>
          </tr>
        </thead>
        <tbody
          v-for="(menu, outerIndex) in shopInfo.menus">
          <tr
            v-for="(sizeInfo, index) in menu['price_type']">
            <td
              v-if="!index"
              :rowspan="menu['price_type'].length">
              {{ menu.id }}
            </td>
            <td
              v-if="!index"
              :rowspan="menu['price_type'].length">
              <div
                v-if="isMoreMode">
                {{ menu.name }}
              </div>
              <div
                class="shop-detail__inputgroup"
                v-else>
                <b-input
                  size="sm"
                  class="shop-detail__input--menu"
                  v-model="menu.name"/>
                <b-button
                  size="sm"
                  variant="success"
                  @click="addSizeRow(outerIndex)">
                  +
                </b-button>
              </div>
            </td>

            <td>
              <div
                v-if="isMoreMode">
                {{ sizeInfo.size }}
              </div>
              <b-input
                v-else
                size="sm"
                class="shop-detail__input--size"
                v-model="sizeInfo.size"/>
            </td>
            <td>
              <div
                v-if="isMoreMode">
                {{ sizeInfo.price }}
              </div>
              <b-input
                v-else
                size="sm"
                class="shop-detail__input--size"
                v-model="sizeInfo.price"/>
            </td>
            <td
              v-if="!index"
              :rowspan="menu['price_type'].length">
              <b-checkbox
                v-if="menu.id !== undefined"
                :disabled="isMoreMode"
                v-model="menu['is_deleted']"
                :value="false"
                :unchecked-value="true"
                switch/>
            </td>
            <td
              v-if="!isMoreMode">
              <b-button
                size="sm"
                variant="danger"
                @click="removeSizeRow(outerIndex, index)">
                -
              </b-button>
            </td>

            <td
              v-if="!isMoreMode && !index"
              :rowspan="menu['price_type'].length">
              <b-button
                size="sm"
                :variant="menu.id !== undefined ? 'primary' : 'success'"
                @click="updateMenuRow(outerIndex)">
                {{menu.id !== undefined ? "수정" : "추가"}}
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>
      <b-button
        class="my-2"
        v-if="!isMoreMode"
        variant="success"
        @click="addMenuRow">
        메뉴 줄 추가
      </b-button>
    </b-row>
  </b-modal>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import * as selected from "../../../../../static/selected.js"
  import {defaultModal} from "../../../../mixins/defualtModal";

  export default {
    name: "ShopDetail",
    data() {
      return {
        shopInfo: this.getShopInfo(),
        categoryOptions: [
          {value: 'S001', text: '콜벤'},
          {value: 'S002', text: '도시락'},
          {value: 'S003', text: '족발'},
          {value: 'S004', text: '중식'},
          {value: 'S005', text: '치킨'},
          {value: 'S006', text: '피자'},
          {value: 'S007', text: '탕수육'},
          {value: 'S008', text: '일반식당'},
          {value: 'S009', text: '미용실'}
        ],
        timeRegex: /^[0-9]{2}[:]+[0-9]{2}/,
        currentImage: {}
      }
    },
    methods: {
      ...mapGetters({
        getShopInfo: 'shop/getShopInfo'
      }),
      ...mapActions({
        createShop: 'shop/createShop',
        deleteShop: 'shop/deleteShop',
        updateShop: 'shop/updateShop',
        createMenu: 'shop/createMenu',
        updateMenu: 'shop/updateMenu',
        deleteMenu: 'shop/deleteMenu',
        uploadImage: 'shop/uploadImage'
      }),
      createShopInfo() {
        if (confirm(`정말 ${this.shopInfo.name}을 만드시겠습니까?`) && this.checkInfoDataValid()) {
          this.createShop(this.shopInfo).then(
            res => {
              if(res) {
                alert('성공적으로 만들어졌습니다.');
                this.$bvModal.hide('shop-modal')
              }
            },
             error => {
              console.error(error);
             }
          )
        }
      },
      deleteShopInfo() {
        if (confirm(`정말 ${this.shopInfo.name}을 삭제하겠습니까?`)) {
          this.deleteShop().then(res => {
            if (res) {
              alert('성공적으로 삭제했습니다.');
              this.$bvModal.hide('shop-modal')
            }
          }, error => {
            console.log(error);
          })
        }
      },
      //메뉴 제외
      updateShopInfo() {
        if (confirm(`정말 변경하시겠습니까?`) && this.checkInfoDataValid()) {
          this.updateShop(this.shopInfo).then(res => {
            if (res) {
              alert('성공적으로 변경되었습니다.');
              this.mode = 'more'
            }
          }, err => {
            console.log(err)
          })
        }
      },
      removeSizeRow(outerIndex, index) {
        let menu = this.shopInfo.menus[outerIndex];

        if(menu['price_type'].length !== 1) {
          menu['price_type'].splice(index, 1);
          this.shopInfo.menus[outerIndex]['price_type'] = menu['price_type'];
        } else {
          if(confirm('해당 메뉴를 지우겠습니까?')) {
            this.deleteMenu(menu.id);
            this.shopInfo.menus.splice(outerIndex, 1)
          }
        }
      },
      addSizeRow(outerIndex) {
        this.shopInfo.menus[outerIndex]['price_type'].push({size: null, price: null})
      },
      addMenuRow() {
        this.shopInfo.menus.push({
          name: null,
          "price_type": [{
            size: null,
            price: null
          }]
        })
      },
      //하나의 메뉴를 업데이트(만들기 포함)
      updateMenuRow(outerIndex) {
        if(confirm('해당 메뉴를 업데이트하시겠습니까?')) {
          let vaildState = true;
          //price_type 배열의 요소에 빈 칸이 있는지 확인
          this.shopInfo.menus[outerIndex]['price_type'].some(
            value => {
              if(value.size === null) value.size = '';
              if(value.price === null) value.price = '';
              if(value.size === '' || value.price === '') {
                vaildState = false;
                return true;
              }
            }
          );
          //menu 이름이 빈칸인지 확인
          if(this.shopInfo.menus[outerIndex].name === null
            || this.shopInfo.menus[outerIndex].name === '')
            vaildState = false;
          //id가 없을 시 create 있는 경우 update
          if(!vaildState)
            alert('빈 칸을 모두 채워주세요.');
          else if(this.shopInfo.menus[outerIndex].id === undefined) {
            this.createMenu({
              data: this.shopInfo.menus[outerIndex],
              index: outerIndex
            })
          } else
            this.updateMenu({
              data: this.shopInfo.menus[outerIndex],
              index: outerIndex
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
          this.shopInfo['image_urls'].splice(index, 1);
      },
      //shopInfo의 required 측정
      checkInfoDataValid() {
        if(this.shopInfo.name === null || this.shopInfo.name === '')
          alert('가게 이름을 입력해주세요.');
        else if(this.shopInfo.category === null)
          alert('카테고리를 입력해주세요.');
        else if(this.shopInfo.phone === null || this.shopInfo.phone === '')
          alert('핸드폰 번호를 입력해주세요.');
        else if(!this.phoneRegex.test(this.shopInfo.phone))
          alert('핸드폰 번호을 제대로 입력해주세요.');
        else if(!this.timeRegex.test(this.shopInfo['open_time'])
          || !this.timeRegex.test(this.shopInfo['close_time']))
          alert('영업 시간을 제대로 입력해주세요.');
        else
          return true;

        return false;
      }
    },
    extends: defaultModal,
    watch: {
      mode(newValue) {
        if(newValue === 'create') {
          this.shopInfo = {};
          selected.default.shop.editableData.map(
            value => {
              this.shopInfo[value] = null
            }
          )
        } else
          this.shopInfo = this.getShopInfo();
      },
      '$store.state.shop.shopInfo': {
        deep: true,
        handler() {
          this.shopInfo = this.getShopInfo();
        }
      }
    }
  }
</script>

<style scoped>
  .shop-detail__row {
    justify-content: center;
    border-bottom: 1px gray solid;
    margin-bottom: 10px;
  }
  .shop-detail__table {
    word-break: break-word;
    text-align: center;
    margin: 0 10px;
    width: 90%;
  }
  .shop-detail__inputgroup{
    display: inline-flex;
  }

  .shop-detail__input--menu {
    width: 400px;
  }
  .shop-detail__input--size {
    width: 130px;
    margin: 3px;
  }
</style>
