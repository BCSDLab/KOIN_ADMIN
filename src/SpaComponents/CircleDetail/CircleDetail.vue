<template>
 <div class="col-sm-12">
    <div class="row page-title">
        <div class="col-md-6 col-8 align-self-center">
            <h3 class="mb-0 mt-0">Circle Detail</h3>
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <a>Home</a>
                </li>
                <li class="breadcrumb-item">
                    <a class="">Circle</a>
                </li>
                <li class="breadcrumb-item">
                    <a class="">Circle Detail</a>
                </li>
            </ol>
        </div>
        <div class="col-md-6 col-4 align-self-center">
            <a class="btn btn-delete fa-pull-right" @click="deleteCircle()">동아리 삭제</a>
            <a class="btn btn-update fa-pull-right" @click="updateCircle()">동아리 수정</a>
        </div>
    </div>
    <div class="card">
        <div class="circle-table">
            <table>
                <thead>
                    <tr>
                        <th>uid <span style="color: red">*</span></th>
                        <th>이름 <span style="color: red">*</span></th>
                        <th>카테고리 <span style="color: red">*</span></th>
                        <th>위치</th>
                        <th>담당교수</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input class="form-control" type="text" v-model="circle.id"></td>
                        <td><input class="form-control" type="text" v-model="circle.name"></td>
                        <td class="category">
                            <label class="btn" :class="{ active: circle.category === 'C001' }" for="C001">예술</label>
                            <input id="C001" type="radio" :checked="circle.category==='C001'" @click="updateCategory('C001')">
                            <label class="btn" :class="{ active: circle.category === 'C002' }" for="C002">공연</label>
                            <input id="C003" type="radio" :checked="circle.category==='C002'" @click="updateCategory('C002')">
                            <label class="btn" :class="{ active: circle.category === 'C003' }" for="C003">운동</label>
                            <input id="C003" type="radio" :checked="circle.category==='C003'" @click="updateCategory('C003')">
                            <label class="btn" :class="{ active: circle.category === 'C004' }" for="C004">학술</label>
                            <input id="C004" type="radio" :checked="circle.category==='C004'" @click="updateCategory('C004')">
                            <label class="btn" :class="{ active: circle.category === 'C005' }" for="C005">종교</label>
                            <input id="C005" type="radio" :checked="circle.category==='C005'" @click="updateCategory('C005')">
                            <label class="btn" :class="{ active: circle.category === 'C006' }" for="C006">봉사</label>
                            <input id="C006" type="radio" :checked="circle.category==='C006'" @click="updateCategory('C006')">
                            <label class="btn" :class="{ active: circle.category === 'C007' }" for="C007">준</label>
                            <input id="C007" type="radio" :checked="circle.category==='C007'" @click="updateCategory('C007')">
                        </td>
                        <td><input class="form-control" type="text" v-model="circle.location"></td>
                        <td><input class="form-control" type="text" v-model="circle.professor"></td>
                    </tr>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <th>한줄소개 <span style="color: red">*</span></th>
                        <th>소개</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input class="form-control" type="text" v-model="circle.line_description"></td>
                        <td><textarea class="form-control" cols="30" rows="10" v-model="circle.description"></textarea></td>
                    </tr>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <th>주요활동</th>
                        <th>메인홈피</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input class="form-control" type="text" v-model="circle.major_business"></td>
                        <td><input class="form-control" type="text" v-model="circle.introduce_url"></td>
                    </tr>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <th>로고</th>
                        <th>배경</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input class="form-control" accept="image/*" enctype='multipart/form-data' type="file" @change="imageUpload($event.target.name, $event.target.files, 0)">
                            <span>{{ circle.logo_url }}</span>
                        </td>
                        <td><input class="form-control" accept="image/*" enctype='multipart/form-data' type="file" @change="imageUpload($event.target.name, $event.target.files, 1)">
                            <span>{{ circle.background_img_url }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <th>기타링크</th>
                        <th>숨김</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><textarea class="form-control" v-model="link_urls" cols="30" rows="10"></textarea></td>
                        <td>
                            <input id="is_deleted" class="form-control" type="checkbox" :checked="circle.is_deleted" @click="updateIsDeleted">
                            <label for="is_deleted"></label>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  </div>
</template>

<script>
  import * as api from '../../api/api';
  export default {
    name: 'CircleDetail',
    data() {
      return {
          circle: '',
          link_urls: '[{"type": "facebook", "link": ""}, {"type": "naver", "link": ""}, {"type": "cyworld", "link": ""}]',
      }
    },
    methods: {
        getSpecificCircle () {
            this.$store.dispatch('getSpecificCircle', {
                token: this.$session.get('token'),
                id: this.$router.history.current.path.split('/')[3]
            }).then(res => {
                this.circle = res.data;
                console.log(res.data.link_urls);
                this.link_urls = JSON.stringify(res.data.link_urls);
            }, error => {
                console.log(error);
            })
        },
        updateCategory (category) {
            this.circle.category = category;
        },
        updateCircle () {
            this.circle.link_urls = this.link_urls;
            if (confirm(`정말 ${this.circle.name}을 수정하겠습니까?`)) {
                this.$store.dispatch('updateCircle', {
                    token: this.$session.get('token'),
                    id: this.circle.id,
                    name: this.circle.name,
                    category: this.circle.category,
                    location: this.circle.location === null ? undefined : this.circle.location,
                    professor: this.circle.professor === null ? undefined : this.circle.professor,
                    is_deleted: this.circle.is_deleted === false ? 0 : 1,
                    line_description: this.circle.line_description === null ? undefined : this.circle.line_description,
                    description: this.circle.description === null ? undefined : this.circle.description,
                    major_business: this.circle.major_business === null ? undefined : this.circle.major_business,
                    introduce_url: this.circle.introduce_url === null ? undefined : this.circle.introduce_url,
                    background_img_url: this.circle.background_img_url === null ? undefined : this.circle.background_img_url,
                    link_urls: this.circle.link_urls === null ? undefined : this.circle.link_urls,
                    logo_url: this.circle.logo_url === null ? undefined : this.circle.logo_url,
                }).then(flag => {
                    if (flag) {
                        alert('성공적으로 수정했습니다.');
                        this.$router.go(-1);
                    }
                }, error => {
                    console.log(error);
                })
            }
        },
        deleteCircle () {
            if (confirm(`정말 ${this.circle.name}을 삭제하겠습니까?`)) {
                this.$store.dispatch('deleteCircle', {
                    token: this.$session.get('token'),
                    id: this.circle.id
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
        imageUpload (name, file, flag) {
            let formData = new FormData();
            formData.append('image[]', file[0]);
            api.uploadImage(this.$session.get('token'), formData).then(res => {
                if (flag === 0) this.circle.logo_url = res.data.url[0];
                else if (flag === 1) this.circle.background_img_url = res.data.url[0];
            }, error => {
                alert('이미지의 크기가 너무 큽니다.');
                return ;
            })
        },
        updateIsDeleted () {
            this.circle.is_deleted = !this.circle.is_deleted;
        }
    },
    created () {
        this.getSpecificCircle();
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
.circle-table {
  background-color: #fff;
  padding: 20px;
}
table { width: 100%; }
table th, table td { padding: 1rem 2rem;}
table td { border-top: 1px solid #eceeef; }
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
  background-image: url("./../../assets/check.png");
  background-size: cover;
}
.card table:first-child tr th { width: 10% }
.card table:first-child tr th:nth-child(2) { width: 20% }
.card table:first-child tr th:nth-child(3) { width: 30% }
.card table:first-child tr th:nth-child(4) { width: 20% }
.card table:first-child tr th:nth-child(5) { width: 20% }
.card table:nth-child(2) tr th{ width: 50% }
.card table:nth-child(3) tr th{ width: 50% }
.card table:nth-child(4) tr th { width: 25% }
.card table:nth-child(5) tr th:first-child { width: 80% }
textarea { resize: none; }
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
