<template>
  <div class="col-sm-12">
    <div class="row page-title">
        <div class="col-md-6 col-8 align-self-center">
            <h3 class="mb-0 mt-0" v-show="article.board_id === 1">Free Board Detail</h3>
            <h3 class="mb-0 mt-0" v-show="article.board_id === 2">Job Board Detail</h3>
            <h3 class="mb-0 mt-0" v-show="article.board_id === 3">Anonymous Board Detail</h3>
            <h3 class="mb-0 mt-0" v-show="article.board_id === 4">Notice Board Detail</h3>
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <a>Home</a>
                </li>
                <li class="breadcrumb-item">
                    <a class="">Community</a>
                </li>
                <li class="breadcrumb-item">
                    <a v-show="article.board_id === 1">Free Board</a>
                    <a v-show="article.board_id === 2">Job Board</a>
                    <a v-show="article.board_id === 3">Anonymous Board</a>
                    <a v-show="article.board_id === 4">Notice Board</a>
                </li>
                <li class="breadcrumb-item">
                  <a>Detail</a>
                </li>
            </ol>
      </div>
      <div class="col-md-6 col-4 align-self-center">
        <a class="btn btn-delete fa-pull-right" @click="deleteArticle(article)">게시글 삭제</a>
        <a class="btn btn-update fa-pull-right" @click="updateArticle(article)">게시글 수정</a>
      </div>
    </div>
    <div class="card">
        <div class="board-table">
            <table>
                <thead>
                    <tr>
                        <th>uid <span style="color: red">*</span></th>
                        <th>카테고리 <span style="color: red">*</span></th>
                        <th>닉네임</th>
                        <th>조회수</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                      <td><input class="form-control" type="text" v-model="article.id"></td>
                      <td class="category">
                        <input id="free" type="radio" :checked="article.board_id === 1" @click="updateBoardId(article, 1)">
                        <label for="free" class="btn" :class="{ active: article.board_id === 1 }">자유</label>
                        <input id="job" type="radio" :checked="article.board_id === 2" @click="updateBoardId(article, 2)">
                        <label for="job" class="btn" :class="{ active: article.board_id === 2 }">취업</label>
                        <input id="anonymous" type="radio" :checked="article.board_id === 3" @click="updateBoardId(article, 3)">
                        <label for="anonymous" class="btn" :class="{ active: article.board_id === 3 }">익명</label>
                        <input id="notice" type="radio" :checked="article.board_id === 4" @click="updateBoardId(article, 4)">
                        <label for="notice" class="btn" :class="{ active: article.board_id === 4 }">공지</label>
                      </td>
                      <td><span>{{ article.nickname }}</span></td>
                      <td><span>{{ article.hit }}</span></td>
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
                      <td><input class="form-control" type="text" v-model="article.title"></td>
                    </tr>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <th>내용 <span style="color: red">*</span></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                      <td><textarea class="form-control" cols="30" rows="10" v-model="article.content"></textarea></td>
                    </tr>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <th>숨김</th>
                        <th>해결</th>
                        <th>등록일</th>
                        <th>수정일</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                      <td>
                        <input id="is_deleted" class="form-control" type="checkbox" :checked="article.is_deleted" @click="updateIsDeleted(article)">
                        <label for="is_deleted"></label>
                      </td>
                      <td>
                        <input id="is_solved" class="form-control" type="checkbox" :checked="article.is_solved" @click="updateIsSolved(article)">
                        <label for="is_solved"></label>
                      </td>
                      <td><span>{{ article.created_at }}</span></td>
                      <td><span>{{ article.updated_at }}</span></td>
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
              <td><a class="btn btn-update" @click="updateComment(comment)"> 댓글 수정</a></td>
              <td><a class="btn btn-delete" @click="deleteComment(comment)">댓글 삭제</a></td>
            </tr>
          </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BoardDetail',
    data() {
      return {
        article: '',
        comments: '',
        commentContent: ''
      }
    },
    methods: {
      getSpecificArticle () {
        this.$store.dispatch('getSpecificArticle', {
          token: this.$session.get('token'),
          id: this.$router.history.current.path.split('/')[5]
        }).then(res => {
          this.article = res.data;
          this.comments = res.data.comments;
        }, error => {
          console.log(error);
        })
      },
      updateArticle (article) {
        if (confirm(`정말 ${article.id}번 글을 수정하겠습니까?`)) {
          this.$store.dispatch('updateArticle', {
            token: this.$session.get('token'),
            id: article.id,
            board_id: article.board_id,
            title: article.title,
            content: article.content,
            is_deleted: article.is_deleted,
            is_solved: article.is_solved,
          }).then(flag => {
            if (flag[0]) {
              alert('성공적으로 수정했습니다.');
              if (flag[1]) this.$router.go(-1);
              else this.$router.go(0);
            }
          }, error => {
            console.log(error);
          })
        }
      },
      deleteArticle (article) {
        if (confirm(`정말 ${article.id}번 글을 삭제하겠습니까?`)) {
          this.$store.dispatch('deleteArticle', {
            token: this.$session.get('token'),
            id: article.id
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
          this.$store.dispatch('createComment', {
            token: this.$session.get('token'),
            articleId: this.article.id,
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
        if (confirm(`정말 ${comment.content}을 수정하겠습니까?`)) {
          this.$store.dispatch('updateComment', {
            token: this.$session.get('token'),
            articleId: this.article.id,
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
          this.$store.dispatch('deleteComment', {
            token: this.$session.get('token'),
            articleId: this.article.id,
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
      updateIsDeleted (article) {
        article.is_deleted = !article.is_deleted;
      },
      updateIsSolved (article) {
        article.is_solved = !article.is_solved;
      },
      updateBoardId (article, boardId) {
        article.board_id = boardId;
      }
    },
    created () {
      this.getSpecificArticle();
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
.board-table {
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
.card table:first-child thead tr th:first-child { width: 15% }
.card table:first-child thead tr th:nth-child(2) { width: 35% }
.card table:first-child thead tr th:nth-child(3) { width: 35% }
.card table:first-child thead tr th:nth-child(4) { width: 15% }
.card table:nth-child(4) thead tr th { width: 25% }
table th, table td { padding: 1rem 2rem;}
table td { border-top: 1px solid #eceeef; }
.comment table thead tr th:first-child { width: 15%; }
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
