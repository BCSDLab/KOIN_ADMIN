<template>
  <div class="col-sm-12">
    <div class="row page-title">
        <div class="col-md-6 col-8 align-self-center">
            <h3 class="mb-0 mt-0">Circle Register</h3>
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <a>Home</a>
                </li>
                <li class="breadcrumb-item">
                    <a class="">Circle</a>
                </li>
                <li class="breadcrumb-item">
                    <a class="">Circle Register</a>
                </li>
            </ol>
        </div>
        <div class="col-md-6 col-4 align-self-center">
            <a class="btn btn-create fa-pull-right" @click="createCircle">동아리 생성</a>
        </div>
    </div>
    <div class="card">
        <div class="circle-table">
            <table>
                <thead>
                    <tr>
                        <th>이름 <span style="color: red">*</span></th>
                        <th>카테고리 <span style="color: red">*</span></th>
                        <th>위치</th>
                        <th>담당교수</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input class="form-control" type="text" v-model="name"></td>
                        <td class="category">
                            <label class="btn" :class="{ active: category === 'C001' }" for="C001">예술</label>
                            <input id="C001" type="radio" :checked="category==='C001'" @click="setCategory('C001')">
                            <label class="btn" :class="{ active: category === 'C002' }" for="C002">공연</label>
                            <input id="C002" type="radio" :checked="category==='C002'" @click="setCategory('C002')">
                            <label class="btn" :class="{ active: category === 'C003' }" for="C003">운동</label>
                            <input id="C003" type="radio" :checked="category==='C003'" @click="setCategory('C003')">
                            <label class="btn" :class="{ active: category === 'C004' }" for="C004">학술</label>
                            <input id="C004" type="radio" :checked="category==='C004'" @click="setCategory('C004')">
                            <label class="btn" :class="{ active: category === 'C005' }" for="C005">종교</label>
                            <input id="C005" type="radio" :checked="category==='C005'" @click="setCategory('C005')">
                            <label class="btn" :class="{ active: category === 'C006' }" for="C006">봉사</label>
                            <input id="C006" type="radio" :checked="category==='C006'" @click="setCategory('C006')">
                            <label class="btn" :class="{ active: category === 'C007' }" for="C007">준</label>
                            <input id="C007" type="radio" :checked="category==='C007'" @click="setCategory('C007')">
                        </td>
                        <td><input class="form-control" type="text" v-model="location"></td>
                        <td><input class="form-control" type="text" v-model="professor"></td>
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
                        <td><input class="form-control" type="text" v-model="line_description"></td>
                        <td><textarea class="form-control" cols="30" rows="10" v-model="description"></textarea></td>
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
                        <td><input class="form-control" type="text" v-model="major_business"></td>
                        <td><input class="form-control" type="text" v-model="introduce_url"></td>
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
                            <span>{{ logo_url }}</span>
                        </td>
                        <td><input class="form-control" accept="image/*" enctype='multipart/form-data' type="file" @change="imageUpload($event.target.name, $event.target.files, 1)">
                            <span>{{ background_img_url }}</span>
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
                            <input id="is_deleted" class="form-control" type="checkbox" :checked="is_deleted" @click="setIsDeleted">
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
    name: 'Circles',
    data() {
      return {
          name: undefined,
          category: undefined,
          location: undefined,
          line_description: undefined,
          description: undefined,
          major_business: undefined,
          professor: undefined,
          introduce_url: undefined,
          background_img_url: undefined,
          link_urls: '[{"type": "facebook", "link": ""}, {"type": "naver", "link": ""}, {"type": "cyworld", "link": ""}]',
          logo_url: undefined,
          is_deleted: false
      }
    },
    methods: {
        setCategory (category) {
            this.category = category;
        },
        setIsDeleted () {
            this.is_deleted = !this.is_deleted;
        },
        createCircle () {
            if (confirm(`정말 ${this.name}을 생성하겠습니까?`)) {
                this.$store.dispatch('createCircle', {
                    token: this.$session.get('token'),
                    name: this.name,
                    category: this.category,
                    location: this.location,
                    line_description: this.line_description,
                    description: this.description,
                    logo_url: this.logo_url,
                    background_img_url: this.background_img_url,
                    major_business: this.major_business,
                    introduce_url: this.introduce_url,
                    link_urls: this.link_urls,
                    professor: this.professor,
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
        imageUpload (name, file, flag) {
            let formData = new FormData();
            formData.append('image[]', file[0]);
            api.uploadImage(this.$session.get('token'), formData).then(res => {
                if (flag === 0) this.logo_url = res.data.url[0];
                else if (flag === 1) this.background_img_url = res.data.url[0];
            }, error => {
                alert('이미지의 크기가 너무 큽니다.');
                return ;
            })
        },
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
.card table:first-child tr th { width: 20% }
.card table:first-child tr th:nth-child(2) { width: 25% }
.card table:first-child tr th:nth-child(3) { width: 25% }
.card table:first-child tr th:nth-child(4) { width: 25% }
.card table:nth-child(2) tr th{ width: 50% }
.card table:nth-child(3) tr th{ width: 50% }
.card table:nth-child(4) tr th { width: 25% }
.card table:nth-child(5) tr th:first-child { width: 80% }
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
