<template>
  <div class="col-sm-12">
    <div class="row page-title">
        <div class="col-md-6 col-8 align-self-center">
            <h3 class="mb-0 mt-0" v-show="boardId === 1">Free Board Register</h3>
            <h3 class="mb-0 mt-0" v-show="boardId === 2">Job Board Register</h3>
            <h3 class="mb-0 mt-0" v-show="boardId === 3">Anonymous Board Register</h3>
            <h3 class="mb-0 mt-0" v-show="boardId === 4">Notice Board Register</h3>
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <a>Home</a>
                </li>
                <li class="breadcrumb-item">
                    <a class="">Community</a>
                </li>
                <li class="breadcrumb-item">
                    <a v-show="boardId === 1">Free Board</a>
                    <a v-show="boardId === 2">Job Board</a>
                    <a v-show="boardId === 3">Anonymous Board</a>
                    <a v-show="boardId === 4">Notice Board</a>
                </li>
                <li class="breadcrumb-item">
                  <a>Register</a>
                </li>
            </ol>
      </div>
      <div class="col-md-6 col-4 align-self-center">
        <a class="btn btn-create fa-pull-right" @click="createArticle">게시글 생성</a>
      </div>
    </div>
    <div class="card">
        <div class="board-table">
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
                        <th>내용 <span style="color: red">*</span></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                      <td><textarea class="form-control" cols="30" rows="10" v-model="content"></textarea></td>
                    </tr>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                        <th>숨김</th>
                        <th>해결</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                      <td>
                          <input id="is_deleted" class="form-control" type="checkbox" :checked="is_deleted" @click="setIsDeleted">
                          <label for="is_deleted"></label>
                      </td>
                      <td>
                          <input id="is_solved" class="form-control" type="checkbox" :checked="is_solved" @click="setIsSolved">
                          <label for="is_solved"></label>
                      </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BoardRegister',
    data() {
      return {
        title: '',
        content: '',
        boardId: '',
        is_deleted: false,
        is_solved: false
      }
    },
    methods: {
        createArticle () {
            if (confirm(`정말 ${this.title}을 생성하겠습니까?`)) {
                this.$store.dispatch('createArticle', {
                    token: this.$session.get('token'),
                    board_id: this.boardId,
                    title: this.title,
                    content: this.content,
                    is_deleted: this.is_deleted,
                    is_solved: this.is_solved
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
        setIsDeleted () {
            this.is_deleted = !this.is_deleted;
        },
        setIsSolved () {
            this.is_solved = !this.is_solved;
        }
    },
    created () {
        if(this.$router.history.current.path.split('/')[3] === 'free') this.boardId = 1;
        else if(this.$router.history.current.path.split('/')[3] === 'job') this.boardId = 2;
        else if(this.$router.history.current.path.split('/')[3] === 'anonymous') this.boardId = 3;
        else if(this.$router.history.current.path.split('/')[3] === 'notice') this.boardId = 4;
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
.card table:first-child thead tr th:first-child { width: 50% }
.card table:first-child thead tr th:nth-child(2) { width: 50% }
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
