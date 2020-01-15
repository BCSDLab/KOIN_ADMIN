<template>
  <div class="col-sm-12">
    <div class="row page-title">
      <div class="col-md-6 col-8 align-self-center">
        <h3 class="mb-0 mt-0" v-show="item.type === 0">Sell Market Detail</h3>
        <h3 class="mb-0 mt-0" v-show="item.type === 1">Buy Market Detail</h3>
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a>Home</a>
          </li>
          <li class="breadcrumb-item">
            <a>Used Market</a>
          </li>
          <li class="breadcrumb-item">
            <a v-show="item.type === 0">Sell Market</a>
            <a v-show="item.type === 1">Buy Market</a>
          </li>
          <li class="breadcrumb-item">
            <a>Detail</a>
          </li>
        </ol>
      </div>
      <div class="col-md-6 col-4 align-self-center">
        <a class="btn btn-delete fa-pull-right" @click="deleteItem(item)">게시글 삭제</a>
        <a class="btn btn-update fa-pull-right" @click="updateItem(item)">게시글 수정</a>
      </div>
    </div>
    <div class="card">
      <div class="market-table">
        <table>
          <thead>
            <tr>
              <th>uid <span style="color: red">*</span></th>
              <th>가격</th>
              <th>상태 <span style="color: red">*</span></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input class="form-control" type="text" v-model="item.id"></td>
              <td><input class="form-control" type="number" v-model="item.price"></td>
              <td class="state">
                <input id="ing" type="radio" @click="updateState(0)" :checked="item.state === 0">
                <label class="btn" :class="{ active: item.state === 0 }" for="ing" v-show="item.type===0">판매중</label>
                <label class="btn" :class="{ active: item.state === 0 }" for="ing" v-show="item.type===1">구매중</label>
                <input id="stop" type="radio" @click="updateState(1)" :checked="item.state === 1">
                <label class="btn" :class="{ active: item.state === 1 }" for="stop" v-show="item.type===0">판매중지</label>
                <label class="btn" :class="{ active: item.state === 1 }" for="stop" v-show="item.type===1">구매중지</label>
                <input id="complete" type="radio" @click="updateState(2)" :checked="item.state === 2">
                <label class="btn" :class="{ active: item.state === 2 }" for="complete" v-show="item.type===0">판매완료</label>
                <label class="btn" :class="{ active: item.state === 2 }" for="complete" v-show="item.type===1">구매완료</label>  
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
              <td><input class="form-control" type="text" v-model="item.phone"></td>
              <td>
                <input id="is_phone_open" class="form-control" type="checkbox" :chekced="item.is_phone_open" @click="updateIsPhoneOpen">
                <label for="is_phone_open"></label>
              </td>
              <td>
                <input id="is_deleted" class="form-control" type="checkbox" :checked="item.is_deleted" @click="updateIsDeleted">
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
                <div>{{ item.thumbnail }}</div>
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
              <td><input class="form-control" type="text" v-model="item.title"></td>
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
              <td><textarea class="form-control" cols="30" rows="10" v-model="item.content"></textarea></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="card comment">
      <table>
        <thead>
          <tr>
            <th>댓글 uid</th>
            <th>닉네임</th>
            <th>내용</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td><input class="form-control" type="text" v-model="commentContent"></td>
            <td><a class="btn btn-create" @click="createComment">댓글 생성</a></td>
            <td></td>
          </tr>
          <tr v-for="comment in comments" :key="comment.id">
            <td>{{ comment.id }}</td>
            <td>{{ comment.nickname }}</td>
            <td><input class="form-control" type="text" v-model="comment.content"></td>
            <td><a class="btn btn-update" @click="updateComment(comment)">댓글 수정</a></td>
            <td><a class="btn btn-delete" @click="deleteComment(comment)">댓글 삭제</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import * as api from '../../../api/api';
  export default {
    name: 'ItemDetail',
    data() {
      return {
        item: '',
        comments: '',
        commentContent: ''
      }
    },
    methods: {
      getSpecificItem () {
        this.$store.dispatch('getSpecificItem', {
          token: this.$session.get('token'),
          id: this.$router.history.current.path.split('/')[4]
        }).then(res => {
          this.item = res.data;
          this.comments = res.data.comments
        }, error => {
          console.log(error);
        })
      },
      updateState (state) {
        this.item.state = state;
      },
      updateIsPhoneOpen () {
        this.item.is_phone_open = !this.item.is_phone_open;
      },
      updateIsDeleted () {
        this.item.is_deleted = !this.item.is_deleted;
      },
      updateItem (item) {
        if (item.price === null || item.price === '') item.price = undefined;
        if (item.phone === null || item.phone === '') item.phone = undefined;
        if (item.title === '' || item.title === undefined) { 
            alert('제목을 입력해주세요.');
            return ;
        }
        if (item.content === null || item.content === '') item.content = undefined;
        if (item.thumbnail === null) item.thumbnail = undefined;
        if (confirm(`정말 ${item.title}을 수정하겠습니까?`)) {
          this.$store.dispatch('updateItem', {
            token: this.$session.get('token'),
            id: item.id,
            title: item.title,
            content: item.content,
            phone: item.phone,
            is_phone_open: item.is_phone_open,
            price: item.price,
            state: item.state,
            thumbnail: item.thumbnail,
            is_deleted: item.is_deleted
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
      deleteItem (item ) {
        if (confirm(`정말 ${item.title}을 삭제하겠습니까?`)) {
            this.$store.dispatch('deleteItem', {
                token: this.$session.get('token'),
                id: item.id
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
      createComment () {
        if (confirm(`정말 ${this.commentContent}을 생성하겠습니까?`)) {
          this.$store.dispatch('createItemComment', {
            token: this.$session.get('token'),
            itemId: this.item.id,
            content: this.commentContent
          }).then(flag => {
            if (flag) {
              alert('성공적으로 생성했습니다.');
              this.$router.go(0);
            }
          }, error => {
            console.log(error);
          })
        }
      },
      updateComment (comment) {
        if (confirm(`정말 ${this.commentContent}을 수정하겠습니까?`)) {
          this.$store.dispatch('updateItemComment', {
            token: this.$session.get('token'),
            itemId: this.item.id,
            id: comment.id,
            content: comment.content
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
      deleteComment (comment) {
        if (confirm(`정말 ${comment.id}번 댓글을 삭제하겠습니까?`)) {
          this.$store.dispatch('deleteItemComment', {
            token: this.$session.get('token'),
            itemId: this.item.id,
            id: comment.id
          }).then(flag => {
            if (flag) {
              alert('성공적으로 삭제했습니다.');
              this.$router.go(0);
            }
          }, error => {
            console.log(error);
          })
        }
      },
      thumbnailImageUpload (name, file) {
          let formData = new FormData();
          formData.append('image', file[0]);
          api.uploadThumbnailImage(this.$session.get('token'), formData).then(res => {
            this.item.thumbnail = res.data.url;
          }, error => {
              alert('이미지의 크기가 너무 큽니다.');
              return ;
          })
      }
    },
    created () {
      this.getSpecificItem();
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
.card table:first-child thead tr th:first-child { width: 20% }
.card table:first-child thead tr th:nth-child(2) { width: 40% }
.card table:nth-child(2) thead tr th:first-child { width: 50% }
table th, table td { padding: 1rem 2rem;}
table td { border-top: 1px solid #eceeef; }
textarea { resize: none; }
.comment table thead tr th:first-child { width: 15%!important; }
.comment table thead tr th:nth-child(2) { width: 15%!important; }
.comment table thead tr th:nth-child(3) { width: 55%!important; }
.comment table thead tr th:nth-child(4) { width: 7.5%!important; }
.comment table thead tr th:nth-child(5) { width: 7.5%!important; }
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
