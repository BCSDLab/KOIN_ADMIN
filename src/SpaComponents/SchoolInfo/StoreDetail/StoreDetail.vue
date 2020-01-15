<template>
    <div class="col-sm-12">
        <div class="row page-title">
            <div class="col-md-6 col-8 align-self-center">
                <h3 class="mb-0 mt-0">Store Detail</h3>
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
                    <a>Store Detail</a>
                </li>
                </ol>
            </div>
            <div class="col-md-6 col-4 align-self-center">
                <a class="btn btn-delete fa-pull-right" @click="deleteStore(store)">상점 삭제</a>
                <a class="btn btn-update fa-pull-right" @click="updateStore(store)">상점 수정</a>
            </div>
        </div>
        <div class="card">
        <div class="store-table">
            <table>
                <thead>
                    <tr>
                        <th>uid <span style="color: red">*</span></th>
                        <th>이름 <span style="color: red">*</span></th>
                        <th>카테고리 <span style="color: red">*</span></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input class="form-control" type="text" v-model="store.id"></td>
                        <td><input class="form-control" type="text" v-model="store.name"></td>
                        <td class="category">
                            <input id="S001" type="radio" :checked="store.category==='S001'" @click="updateCategory(store, 'S001')">
                            <label class="btn" :class="{ active: store.category === 'S001'}" for="S001">콜벤</label>   
                            <input id="S002" type="radio" :checked="store.category==='S002'" @click="updateCategory(store, 'S002')">
                            <label class="btn" :class="{ active: store.category === 'S002'}" for="S002">도시락</label>
                            <input id="S003" type="radio" :checked="store.category==='S003'" @click="updateCategory(store, 'S003')">
                            <label class="btn" :class="{ active: store.category === 'S003'}" for="S003">족발</label>
                            <input id="S004" type="radio" :checked="store.category==='S004'" @click="updateCategory(store, 'S004')">
                            <label class="btn" :class="{ active: store.category === 'S004'}" for="S004">중식</label>
                            <input id="S005" type="radio" :checked="store.category==='S005'" @click="updateCategory(store, 'S005')">
                            <label class="btn" :class="{ active: store.category === 'S005'}" for="S005">치킨</label>
                            <input id="S006" type="radio" :checked="store.category==='S006'" @click="updateCategory(store, 'S006')">
                            <label class="btn" :class="{ active: store.category === 'S006'}" for="S006">피자</label>
                            <input id="S007" type="radio" :checked="store.category==='S007'" @click="updateCategory(store, 'S007')">
                            <label class="btn" :class="{ active: store.category === 'S007'}" for="S007">탕수육</label>
                            <input id="S008" type="radio" :checked="store.category==='S008'" @click="updateCategory(store, 'S008')">
                            <label class="btn" :class="{ active: store.category === 'S008'}" for="S008">일반식당</label>
                            <input id="S009" type="radio" :checked="store.category==='S009'" @click="updateCategory(store, 'S009')">
                            <label class="btn" :class="{ active: store.category === 'S009'}" for="S009">미용실</label>
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
                        <td><input class="form-control" type="text" v-model="store.phone"></td>
                        <td><input class="form-control" type="text" v-model="store.address"></td>
                        <td><input class="form-control" type="text" v-model="store.open_time"></td>
                        <td><input class="form-control" type="text" v-model="store.close_time"></td>
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
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input class="form-control" type="text" v-model="store.delivery_price"></td>
                        <td>
                            <input id="delivery" class="form-control" type="checkbox" :checked="store.delivery" @click="updateDelivery(store)">
                            <label for="delivery"></label>
                        </td>
                        <td>
                            <input id="pay_card" class="form-control" type="checkbox" :checked="store.pay_card" @click="updatePayCard(store)">
                            <label for="pay_card"></label>
                        </td>
                        <td>
                            <input id="pay_bank" class="form-control" type="checkbox" :checked="store.pay_bank" @click="updatePayBank(store)">
                            <label for="pay_bank"></label>
                        </td>
                        <td>
                            <input id="is_event" class="form-control" type="checkbox" :checked="store.is_event" @click="updateIsEvent(store)">
                            <label for="is_event"></label>
                        </td>
                        <td>
                            <input id="is_deleted" class="form-control" type="checkbox" :checked="store.is_deleted" @click="updateIsDeleted(store)">
                            <label for="is_deleted"></label>
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
                        <td><input class="form-control" type="text" v-model="store.description"></td>
                        <td><input class="form-control" type="text" v-model="store.remarks"></td>
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
                            <div v-for="(image, index) in store.image_urls" :key="image.id">
                                {{ image }}
                                <button
                                    @click="removeImage(index)"
                                    class="badge badge-sm badge-danger">
                                    삭제
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="card menu">
        <table>
            <tbody>
                <tr>
                    <td><input type="text" v-model="menuName" placeholder="메뉴이름"></td>
                    <td><input type="text" v-model="menuSize" placeholder="메뉴사이즈"></td>
                    <td><input type="text" v-model="menuPrice" placeholder="메뉴가격"></td>
                    <td><a class="btn btn-create" @click="addMenuPriceType(menuName, menuSize, menuPrice)">사이즈 추가</a></td>
                    <td><a class="btn btn-create" @click="createMenu(menuName, menuSize, menuPrice)">메뉴 추가</a></td>
                </tr>
                <tr v-for="(data, index) in priceType" :key="index">
                    <td>사이즈 {{ index+1 }}</td>
                    <td>{{ menuName }}</td>
                    <td colspan="4">{{ data }}</td>
                </tr>
            </tbody>
        </table>
        <table>
            <thead>
                <tr>
                    <th style="width: 8%">메뉴 uid</th>
                    <th style="width: 50%">이름</th>
                    <th style="width: 10%">사이즈</th>
                    <th style="width: 10%">가격</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="menu in menus" :key="menu.id">
                    <td>{{ menu.id }}</td>
                    <td><input class="form-control" type="text" v-model="menu.name"></td>
                    <td>
                        <tr v-for="price_type in menu.price_type" :key="price_type.id">
                            <td><input class="form-control" type="text" v-model="price_type.size"></td>
                        </tr>
                    </td>
                    <td>
                        <tr v-for="price_type in menu.price_type" :key="price_type.id">
                            <td><input class="form-control" type="text" v-model="price_type.price"></td>
                        </tr>
                    </td>
                    <td>
                        <tr v-for="(price_type, index) in menu.price_type" :key="index">
                            <td><a class="btn btn-delete" @click="deleteMenuPriceType(menu.price_type, index)">사이즈 삭제</a></td>
                        </tr>
                    </td>
                    <td><a class="btn btn-update" @click="updateMenu(menu)">메뉴 수정</a></td>
                    <td><a class="btn btn-delete" @click="deleteMenu(menu)">메뉴 삭제</a></td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>

<script>
  import * as api from '../../../api/api';
  export default {
    name: 'StoreDetail',
    data() {
      return {
          store: '',
          menus: '',
          menuName: '',
          menuSize: '',
          menuPrice: '',
          addMenuSize: '',
          addMenuPrice: '',
          priceType: [],
      }
    },
    methods: {
        getSpecificStore () {
            this.$store.dispatch('getSpecificStore', {
                token: this.$session.get('token'),
                id: this.$router.history.current.path.split('/')[4]
            }).then(res => {
                this.store = res;
                this.menus = res.menus;
            }, error => {
                console.log(error);
            })
        },
        updateStore (store) {
            if (store.open_time === null || store.open_time === '') store.open_time = undefined;
            if (store.close_time === null || store.close_time === '') store.close_time = undefined;
            if (store.description === null || store.description === '') store.description = '';
            if (store.remarks === null || store.remarks === '') store.remarks = null;
            if (store.address === null || store.address === '') store.address = null;
            if (store.phone === null || store.phone === '') store.phone = null;
            if (confirm(`정말 ${store.name}을 수정하겠습니까?`)) {
                this.$store.dispatch('updateStore', {
                    token: this.$session.get('token'),
                    id: store.id,
                    name: store.name,
                    phone: store.phone,
                    category: store.category,
                    open_time: store.open_time,
                    close_time: store.close_time,
                    delivery: store.delivery,
                    pay_card: store.pay_card,
                    pay_bank: store.pay_bank,
                    delivery_price: store.delivery_price,
                    description: store.description,
                    is_deleted: store.is_deleted,
                    is_event: store.is_event,
                    remarks: store.remarks,
                    address: store.address,
                    image_urls: store.image_urls === null ? undefined : JSON.stringify(store.image_urls),
                }).then(flag => {
                    if (flag) {
                    alert('성공적으로 수정했습니다.');
                    this.$router.go(0);
                    }
                }, error => {
                    console.log(error);
                })
            }
        },
        deleteStore (store) {
            if (confirm(`정말 ${store.name}을 삭제하겠습니까?`)) {
                this.$store.dispatch('deleteStore', {
                    token: this.$session.get('token'),
                    id: store.id
                }).then(flag => {
                    if (flag) {
                    alert('성공적으로 삭제했습니다.');
                    this.$router.go(-1);
                    }
                }, error => {
                    console.log(error);
                })
            }
        },
        addMenuPriceType (menuName, menuSize, menuPrice) {
            let flag = false;
            if (menuName === '') {
                alert('메뉴 이름을 입력해주세요.');
                return ;
            }
            if (menuSize === '') {
                alert('메뉴 사이즈를 입력해주세요.');
                return ;
            }
            if (menuPrice === '') {
                alert('메뉴 사이즈를 입력해주세요.');
                return ;
            }
            let data = `{"size": "${menuSize}", "price": "${menuPrice}"}`;
            this.menus.some((e) => {
                flag = (e.name === menuName);
                if(flag) e.price_type.push(JSON.parse(data));
                return flag;
            });
            if (!flag) this.priceType.push(data);
            data = '';
        },
        deleteMenuPriceType(priceType, index) {
            priceType.splice(index, 1);
        },
        createMenu (menuName, menuSize, menuPrice) {
            if (this.priceType.length === 0) {
                alert('사이즈를 추가하세요.');
                return ;
            }
            console.log(`[${this.priceType.toString()}]`);
            if (confirm(`정말 사이즈를 다 추가하셨고 ${menuName}를 생성하시겠습니까?`)) {
                this.$store.dispatch('createMenu', {
                    token: this.$session.get('token'),
                    shopId: this.$router.history.current.path.split('/')[4],
                    name: this.menuName,
                    price_type: `[${this.priceType.toString()}]`
                }).then(flag => {
                    if(flag) { 
                        this.priceType = [];
                        alert('성공적으로 생성되었습니다.');
                        this.$router.go(0);
                    }
                }, error => {
                    console.log(error);
                })
            }
        },
        updateMenu (menu) {
            console.log(menu.price_type);
            if (confirm(`정말 ${menu.name}을 수정하겠습니까?`)) {
                this.$store.dispatch('updateMenu', {
                    token: this.$session.get('token'),
                    shopId: this.$router.history.current.path.split('/')[4],
                    menuId: menu.id,
                    name: menu.name,
                    price_type: JSON.stringify(menu.price_type)
                }).then(flag => {
                    if(flag) alert('성공적으로 수정되었습니다.');
                    this.$router.go(0);
                }, error => {
                    console.log(error);
                })
            }
        },
        deleteMenu (menu) {
            if(confirm(`정말 ${menu.name}을 삭제하겠습니까?`)) {
                this.$store.dispatch('deleteMenu', {
                    token: this.$session.get('token'),
                    shopId: this.$router.history.current.path.split('/')[4],
                    menuId: menu.id
                }).then(flag => {
                    if(flag) alert('성공적으로 삭제되었습니다.');
                    this.$router.go(0);
                }, error => {
                    console.log(error);
                })
            }
        },
        updateCategory (store, category) {
            store.category = category;
        },
        updateDelivery (store) {
            store.delivery = !store.delivery;
        },
        updatePayCard (store) {
            store.pay_card = !store.pay_card;
        },
        updatePayBank (store) {
            store.pay_bank = !store.pay_bank;
        },
        updateIsEvent (store) {
            store.is_event = !store.is_event;
        },
        updateIsDeleted (store) {
            store.is_deleted = !store.is_deleted;
            console.log(store);
        },
        imageUpload (name, file) {
            let formData = new FormData();
            formData.append('image[]', file[0]);
            api.uploadImage(this.$session.get('token'), formData).then(res => {
                if (this.store.image_urls === null) this.store.image_urls = res.data.url;
                else this.store.image_urls.push(res.data.url[0]);
            }, error => {
                alert('이미지의 크기가 너무 큽니다.');
                return ;
            })
        },
        removeImage (index) {
            this.store.image_urls.splice(index, 1);
        }
    },
    created () {
        this.getSpecificStore();
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
.card table:nth-child(3) thead tr th { width: 16.6%; }
table th, table td { padding: 1rem 2rem;}
table td { border-top: 1px solid #eceeef; }
.menu { margin-top: 20px; }
.menu table th, .menu table td { padding: 5px 0; }
.menu .btn-update { margin-right: 0; }
.btn-create {
  background: #ff7f00;
  color: #fff!important;
  border: 1px solid #ff7f00;
}
.btn-create:hover {
  background: transparent;
  color: #ff7f00!important;
}
.btn-update {
  background: #175c8e;
  color: #fff!important;
  border: 1px solid #175c8e;
  margin-right: 10px;
}
.btn-update:hover {
  background: transparent;
  color: #175c8e!important;
}
.btn-delete {
  background: #ff4c4c;
  color: #fff!important;
  border: 1px solid #ff4c4c;
}
.btn-delete:hover {
  background: transparent;
  color: #ff4c4c!important;
}
</style>
