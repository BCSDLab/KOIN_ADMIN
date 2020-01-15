<template>
  <div class="col-sm-12">
    <div class="row page-title">
      <div class="col-md-6 col-8 align-self-center">
        <h3 class="mb-0 mt-0" v-show="type === 0">Sell Market Register</h3>
        <h3 class="mb-0 mt-0" v-show="type === 1">Buy Market Register</h3>
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a>Home</a>
          </li>
          <li class="breadcrumb-item">
            <a>Used Market</a>
          </li>
          <li class="breadcrumb-item">
            <a v-show="type === 0">Sell Market</a>
            <a v-show="type === 1">Buy Market</a>
          </li>
          <li class="breadcrumb-item">
            <a>Register</a>
          </li>
        </ol>
      </div>
      <div class="col-md-6 col-4 align-self-center">
        <a class="btn btn-create fa-pull-right" @click="createItem">게시글 생성</a>
      </div>
    </div>

    <div class="card">
      <div class="market-table">
        <table>
          <thead>
            <tr>
              <th>가격</th>
              <th>상태 <span style="color: red">*</span></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input class="form-control" type="number" v-model="price"></td>
              <td class="state">
                <input id="ing" type="radio" @click="setState(0)" :checked="state === 0">
                <label class="btn" :class="{ active: state === 0 }" for="ing" v-show="type===0">판매중</label>
                <label class="btn" :class="{ active: state === 0 }" for="ing" v-show="type===1">구매중</label>
                <input id="stop" type="radio" @click="setState(1)" :checked="state === 1">
                <label class="btn" :class="{ active: state === 1 }" for="stop" v-show="type===0">판매중지</label>
                <label class="btn" :class="{ active: state === 1 }" for="stop" v-show="type===1">구매중지</label>
                <input id="complete" type="radio" @click="setState(2)" :checked="state === 2">
                <label class="btn" :class="{ active: state === 2 }" for="complete" v-show="type===0">판매완료</label>
                <label class="btn" :class="{ active: state === 2 }" for="complete" v-show="type===1">구매완료</label>
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>연락처</th>
              <th>연락처 공개</th>
              <th>숨김</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input class="form-control" type="text" v-model="phone"></td>
              <td>
                <input id="is_phone_open" class="form-control" type="checkbox" :chekced="is_phone_open" @click="setIsPhoneOpen">
                <label for="is_phone_open"></label>
              </td>
              <td>
                <input id="is_deleted" class="form-control" type="checkbox" :checked="is_deleted" @click="setIsDeleted">
                <label for="is_deleted"></label>
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>썸네일</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input accept="image/*" enctype='multipart/form-data' type="file" @change="thumbnailImageUpload($event.target.name, $event.target.files)">
                <div>{{ thumbnail }}</div>
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>제목 <span style="color: red">*</span></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input class="form-control" type="text" v-model="title"></td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>내용</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><textarea class="form-control" cols="30" rows="10" v-model="content"></textarea></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import * as api from '../../../api/api';

  export default {
    name: 'Items',
    data() {
      return {
        type: '',
        title: undefined,
        content: undefined,
        state: undefined,
        price: undefined,
        phone: undefined,
        is_phone_open: false,
        thumbnail: undefined,
        is_deleted: false
      }
    },
    methods: {
      setState(item, state) {
        this.state = state;
      },
      createItem () {
        if (this.price === '') this.price = undefined;
        if (this.phone === '') this.phone = undefined;
        if (this.title === '' || this.title === undefined) {
            alert('제목을 입력해주세요.');
            return ;
        }
        if (this.content === '') this.content = undefined;
        if (confirm(`정말 ${this.title}을 생성하겠습니까?`)) {
          this.$store.dispatch('createItem', {
            token: this.$session.get('token'),
            type: this.type,
            title: this.title,
            content: this.content,
            state: this.state,
            price: this.price,
            phone: this.phone,
            is_phone_open: this.is_phone_open,
            thumbnail: this.thumbnail,
            is_deleted: this.is_deleted
          }).then(flag => {
            if (flag) {
              alert('성공적으로 생성했습니다.');
              this.$router.go(-1);
            }
          }, error => {
            console.log(error);
          })
        }
      },
      setState (state) {
        this.state = state;
      },
      setIsDeleted () {
        this.is_deleted = !this.is_deleted;
      },
      setIsPhoneOpen () {
        this.is_phone_open = !this.is_phone_open;
      },
      thumbnailImageUpload (name, file) {
          let formData = new FormData();
          formData.append('image', file[0]);
          api.uploadThumbnailImage(this.$session.get('token'), formData).then(res => {
            this.thumbnail = res.data.url;
          }, error => {
              alert('이미지의 크기가 너무 큽니다.');
              return ;
          })
      }
    },
    created () {
      console.log(this.$router.history.current.path.split('/')[2]);
      if(this.$router.history.current.path.split('/')[2] === 'sell') this.type = 0
      else this.type = 1;
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.breadcrumb {
  background: transparent;
  padding-left: 0;
}
.card {
  margin-top: 20px;
}
.market-table {
  background-color: #fff;
  padding: 20px;
}
table { width: 100%; }
.state input[type=radio] {
    display: none;
}
.state .active {
    font-weight: 700;
    background: #ffa500;
    color: #ffffff;
}
.state label {
    margin-right: 10px;
    padding: 5px 10px;
    border: 1px solid #ffa500;
    color: #ffa500;
}
input[type=checkbox] {
  display: none;
}

input[type=checkbox] + label {
  display: inline-block;
  cursor: pointer;
  position: relative;
  padding-left: 7%;
}

input[type=checkbox] + label:before {
  content: "";
  width: 16px;
  height: 16px;
  position: absolute;
  left: 0;
  bottom: 1px;
  background-color: #ffffff;
  border: 1px solid #d2dae2;
  line-height: 13px;
}

input[type=checkbox]:checked + label:before {
  content: "";
  background-image: url("./../../../assets/check.png");
  background-size: cover;
}
.card table:first-child thead tr th:first-child { width: 40% }
.card table:nth-child(2) thead tr th:first-child { width: 50% }
table th, table td { padding: 1rem 2rem;}
table td { border-top: 1px solid #eceeef; }
textarea { resize: none; }
.btn-create {
  background: #ff7f00;
  color: #fff!important;
  border: 1px solid #ff7f00;
}
.btn-create:hover {
  background: transparent;
  color: #ff7f00!important;
}
</style>
