<template>
  <div class="col-sm-12">
    <div class="row page-title">
      <div class="col-md-6 col-8 align-self-center">
        <h3 class="mb-0 mt-0">Store Register</h3>
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a>Home</a>
          </li>
          <li class="breadcrumb-item">
            <a>School Information</a>
          </li>
          <li class="breadcrumb-item">
            <a>Nearby Stores</a>
          </li>
          <li class="breadcrumb-item">
            <a>Store Register</a>
          </li>
        </ol>
      </div>
      <div class="col-md-6 col-4 align-self-center">
        <a class="btn btn-create fa-pull-right" @click="createStore">상점 생성</a>
      </div>
    </div>
    <div class="card">
      <div class="store-table">
        <table>
          <thead>
            <tr>
              <th>이름 <span style="color: red">*</span></th>
              <th>카테고리 <span style="color: red">*</span></th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td><input class="form-control" type="text" v-model="name"></td>
                <td class="category">
                    <input id="S001" type="radio" :checked="category==='S001'" @click="setCategory('S001')">
                    <label class="btn" :class="{ active: category === 'S001'}" for="S001">콜벤</label>   
                    <input id="S002" type="radio" :checked="category==='S002'" @click="setCategory('S002')">
                    <label class="btn" :class="{ active: category === 'S002'}" for="S002">도시락</label>
                    <input id="S003" type="radio" :checked="category==='S003'" @click="setCategory('S003')">
                    <label class="btn" :class="{ active: category === 'S003'}" for="S003">족발</label>
                    <input id="S004" type="radio" :checked="category==='S004'" @click="setCategory('S004')">
                    <label class="btn" :class="{ active: category === 'S004'}" for="S004">중식</label>
                    <input id="S005" type="radio" :checked="category==='S005'" @click="setCategory('S005')">
                    <label class="btn" :class="{ active: category === 'S005'}" for="S005">치킨</label>
                    <input id="S006" type="radio" :checked="category==='S006'" @click="setCategory('S006')">
                    <label class="btn" :class="{ active: category === 'S006'}" for="S006">피자</label>
                    <input id="S007" type="radio" :checked="category==='S007'" @click="setCategory('S007')">
                    <label class="btn" :class="{ active: category === 'S007'}" for="S007">탕수육</label>
                    <input id="S008" type="radio" :checked="category==='S008'" @click="setCategory('S008')">
                    <label class="btn" :class="{ active: category === 'S008'}" for="S008">일반식당</label>
                    <input id="S009" type="radio" :checked="category==='S009'" @click="setCategory('S009')">
                    <label class="btn" :class="{ active: category === 'S009'}" for="S009">미용실</label>
                </td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>전화번호</th>
              <th>주소</th>
              <th>오픈시간</th>
              <th>마감시간</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td><input class="form-control" type="text" v-model="phone"></td>
                <td><input class="form-control" type="text" v-model="address"></td>
                <td><input class="form-control" type="text" v-model="open_time"></td>
                <td><input class="form-control" type="text" v-model="close_time"></td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>배달금액</th>
              <th>배달여부</th>
              <th>카드결제</th>
              <th>계좌이체</th>
              <th>이벤트</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td><input class="form-control" type="text" v-model="delivery_price"></td>
                <td>
                  <input id="delivery" class="form-control" type="checkbox" :checked="delivery" @click="setDelivery">
                  <label for="delivery"></label>
                </td>
                <td>
                  <input id="pay_card" class="form-control" type="checkbox" :checked="pay_card" @click="setPayCard">
                  <label for="pay_card"></label>
                </td>
                <td>
                  <input id="pay_bank" class="form-control" type="checkbox" :checked="pay_bank" @click="setPayBank">
                  <label for="pay_bank"></label>
                </td>
                <td>
                  <input id="is_event" class="form-control" type="checkbox" :checked="is_event" @click="setIsEvent">
                  <label for="is_event"></label>
                </td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>설명</th>
              <th>행사비고</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td><input class="form-control" type="text" v-model="description"></td>
                <td><input class="form-control" type="text" v-model="remarks"></td>
            </tr>
          </tbody>
        </table>
        <table>
            <thead>
            <tr>
              <th>이미지</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>
                    <input accept="image/*" enctype='multipart/form-data' type="file" @change="imageUpload($event.target.name, $event.target.files)">
                    <div v-for="image in image_urls" :key="image.id">
                        {{ image }}
                    </div>
                </td>
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
    name: 'Store',
    data() {
      return {
        name: undefined,
        phone: undefined,
        category: undefined,
        open_time: undefined,
        close_time: undefined,
        delivery: false,
        pay_card: false,
        pay_bank: false,
        address: undefined,
        remarks: undefined,
        description: undefined,
        is_event: false,
        delivery_price: 0,
        image_urls: []
      }
    },
    methods: {
      createStore () {
        if (confirm(`정말 ${this.name}을 생성하겠습니까?`)) {
          this.$store.dispatch('createStore', {
            token: this.$session.get('token'),
            name: this.name,
            phone: this.phone,
            category: this.category,
            address: this.address,
            description: this.description,
            open_time: this.open_time,
            close_time: this.close_time,
            delivery: this.delivery,
            delivery_price: this.delivery_price,
            pay_card: this.pay_card,
            pay_bank: this.pay_bank,
            is_event: this.is_event,
            remarks: this.remarks,
            image_urls: this.image_urls.length === 0 ? undefined : JSON.stringify(this.image_urls) 
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
      setCategory (category) {
        this.category = category;
      },
      setDelivery () {
        this.delivery = !this.delivery;
      },
      setPayCard () {
        this.pay_card = !this.pay_card;
      },
      setPayBank () {
        this.pay_bank = !this.pay_bank;
      },
      setIsEvent () {
          this.is_event = !this.is_event;
      },
      imageUpload (name, file) {
            let formData = new FormData();
            formData.append('image[]', file[0]);
            api.uploadImage(this.$session.get('token'), formData).then(res => {
                if (this.image_urls === null) this.image_urls = res.data.url;
                else this.image_urls.push(res.data.url[0]);
            }, error => {
                alert('이미지의 크기가 너무 큽니다.');
                return ;
            })
        }
    },
    created () {
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
.store-table {
  background-color: #fff;
  padding: 20px;
}
table { width: 100%; }
.category input[type=radio] {
    display: none;
}
.category .active { 
    font-weight: 700;
    background: #ffa500;
    color: #ffffff;
}
.category label {
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
.card table:nth-child(2) thead tr th:nth-child(1) { width: 20%; }
.card table:nth-child(2) thead tr th:nth-child(2) { width: 40%; }
.card table:nth-child(2) thead tr th:nth-child(3) { width: 20%; }
.card table:nth-child(2) thead tr th:nth-child(4) { width: 20%; }
.card table:nth-child(3) thead tr th { width: 20%; }
table th, table td { padding: 1rem 2rem;}
table td { border-top: 1px solid #eceeef; }
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