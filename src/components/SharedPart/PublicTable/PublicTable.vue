<template>
  <div class="public-table">
    <div
      class="public-table__header">
      <div
        class="public-table__title">
        {{ dataType | capitalize }}
        <b-select
          class="public-table__input"
          v-if="serviceType instanceof Array"
          :options="serviceType"
          v-model="selectedServiceType"
          @change="changeSelectedServiceType"/>
      </div>

      <div
        class="public-table__inputgroup">
        <b-input
          class="mx-2"
          type="number"
          :value="perPage"
          @blur="changePerPage($event.target.value)"/>

        <b-button
          class="mx-2"
          variant="info"
          @click="popModal('create', $event.target)">
          New
        </b-button>
      </div>
    </div>
    <b-table
      v-if="dataList !== []"
      class="public-table__table"
      :fields="field"
      id="test-table"
      :items="dataList">
      <template
        v-slot:cell(condition)="row">
        <b-badge
          :variant="dataList[row.index].condition.variant">
          {{ dataList[row.index].condition.text }}
        </b-badge>
      </template>
      <template
        v-slot:cell(title)="row">
        {{ dataList[row.index].title | cutTitle }}
      </template>

      <template
        v-slot:cell(edit)="row">
        <b-button
          size="sm"
          @click="popModal('more', $event.target, row.index)">
          More
        </b-button>
      </template>
    </b-table>

    <component
      ref="modal"
      :is="detailComponent"
      :type="dataType"
      :initial-mode="mode"
      @hide="initDataList"/>

    <b-pagination
      v-model="nowPage"
      :total-rows="totalPage * perPage"
      :per-page="perPage"
      aria-controls="test-table"
      align="center"
      @change="changeNowPage"/>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import UserDetail from "./components/UserDetail";
  import ShopDetail from "./components/ShopDetail";
  import * as selected from "../../../../static/selected.js"
  import FAQDetail from "./components/FAQDetail";
  import LostDetail from "./components/LostDetail"
  import CallVanDetail from "./components/CallvanDetail";
  import CircleDetail from "./components/CircleDetail";
  import UsedDetail from "./components/UsedDetail";
  import LandDetail from "./components/LandDetail"
  import ArticleDetail from "./components/ArticleDetail";
  import modalBus from "./components/modalBus";
  import VersionDetail from "./components/VersionDetail";
  import AnonymousDetail from "./components/AnonymousDetail";

  export default {
    name: "DataTable",
    props: {
      dataType: String,
      //예를 들어 중고장터의 삽니다 팝니다 등을 보내기 위한 것
      //Array일 경우 b-select가 활성화 되어 선택할 수 있게 한다.
      //Number일 경우 dataType의 Id를 가리킨다. ex) Community의 boardId
      serviceType: Array | Number
    },
    data() {
      return {
        perPage: 8,
        nowPage: 1,
        field: selected.default[this.dataType].field.concat(['edit']),
        //modal의 처음 모드를 결정함
        mode: "more",
        selectedServiceType: this.serviceType instanceof Array
          ? this.serviceType[0].value
          : this.serviceType
      }
    },
    methods: {
      ...mapGetters({
        getDataList: 'getDataList',
        getTotalPage: 'getTotalPage'
      }),
      ...mapActions({
        setDataInfo: 'setDataInfo',
        setDataList: 'setDataList'
      }),
      //mode에 따라 modal을 띄우는 방법을 다르게 한다.
      async popModal(mode, button, index) {
        this.mode = mode;
        if (mode !== 'create') {
          await this.setDataInfo({
            dataType: this.dataType,
            index,
            limit: this.perPage,
            serviceType: this.selectedServiceType
          }).then(
            () => {
              //modal을 띄우는 이벤트를 root에 보낸다.
              // 띄울 modal의 id와 modal이 hide될 시 focus할 요소를 보낸다.
              this.$root.$emit('bv::show::modal', this.dataType + '-modal', button);
            }
          )
        } else
          this.$nextTick()
            .then(
              () => {
                this.$root.$emit('bv::show::modal', this.dataType + '-modal', button)
              }
            )
      },
      //perPage를 바꾸기 위한 함수. blur를 할 경우 바뀐다.
      changePerPage(value) {
        //값이 이상할 경우 4를 넣는다.
        if(!value) {
          this.perPage = 4
        }
        //getTotalPage는 함수를 받아오므로 먼저 선언한다.
        let getTotalPage = this.getTotalPage();
        //perPage를 계산해서 넣는다.
        if(value > this.perPage * getTotalPage(this.dataType))
          this.perPage = this.perPage * getTotalPage(this.dataType);
        else if(value < 4)
          this.perPage = 4;
        else
          this.perPage = value;
        this.setDataList({
          dataType: this.dataType,
          page : this.nowPage,
          limit: value,
          serviceType: this.selectedServiceType
        })
      },
      initDataList() {
        this.setDataList({
          dataType : this.dataType,
          page : this.nowPage,
          limit: this.perPage,
          serviceType: this.selectedServiceType
        })
      },
      changeSelectedServiceType(value) {
        this.setDataList({
          dataType: this.dataType,
          page : this.nowPage,
          limit: this.perPage,
          serviceType: value
        })
      },
      changeNowPage(page) {
        this.setDataList({
          dataType: this.dataType,
          page : page,
          limit: this.perPage,
          serviceType: this.selectedServiceType
        })
      }
    },
    computed: {
      //동적으로 받는 dataList / totalPage
      dataList() {
        let getDataList = this.getDataList();
        return getDataList(this.dataType)
      },
      totalPage() {
        let getTotalPage = this.getTotalPage();
        return getTotalPage(this.dataType)
      },
      //동적 컴포넌트를 위함
      detailComponent() {
        switch (this.dataType) {
          case 'user':
            return UserDetail;
          case 'shop':
            return ShopDetail;
          case 'faq':
            return FAQDetail;
          case 'lost':
            return LostDetail;
          case 'callvan':
            return CallVanDetail;
          case 'circle':
            return CircleDetail;
          case 'used':
            return UsedDetail;
          case 'land':
            return LandDetail;
          case 'board':
            return ArticleDetail;
          case 'anonymous':
            return AnonymousDetail;
          case 'version':
            return VersionDetail;
        }
      }
    },
    watch: {
      //props 변경을 관찰하기 위함.
      serviceType(newValue) {
        this.selectedServiceType = newValue instanceof Array
          ? newValue[0].value
          : newValue;

        this.initDataList();
      }
    },
    created() {
      this.initDataList();
    },
    mounted() {
      modalBus.$on('modal-hide',
        () => {
          this.setDataList({
            dataType : this.dataType,
            page : this.nowPage,
            limit: this.perPage,
            serviceType: this.selectedServiceType
          })
        });
    },
    destroyed() {
      modalBus.$off('modal-hide');
    },
    filters: {
      capitalize(value) {
        if (!value)
          return '';
        value = value.toString();
        return value.charAt(0).toUpperCase() + value.slice(1)
      },
      cutTitle(value) {
        if(value.length >= 30) {
          return value.slice(0, 30).concat("...")
        }
        return value
      }
    }
  }
</script>

<style scoped>
  .public-table {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .public-table__table {
    margin: 10px;
    width: 100%;
  }
  .public-table__header {
    display: inline-flex;
    justify-content: space-between;
    width: 100%;
    margin: 10px;
  }
  .public-table__title {
    display: inline;
    font-size: 25px;
    font-weight: bold;
    width: 300px;
    overflow: hidden;
  }
  .public-table__input {
    width: 120px;
  }
  .public-table__inputgroup {
    display: inline-flex;b
    width: 300px;
    margin: 0 5px;
    float: right;
  }


</style>
