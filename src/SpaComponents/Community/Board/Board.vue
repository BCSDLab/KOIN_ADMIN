<template>
  <div class="col-sm-12">
    <div class="row page-title">
        <div class="col-md-6 col-8 align-self-center">
            <h3 class="mb-0 mt-0" v-show="boardId === 1">Free Board</h3>
            <h3 class="mb-0 mt-0" v-show="boardId === 2">Job Board</h3>
            <h3 class="mb-0 mt-0" v-show="boardId === 3">Anonymous Board</h3>
            <h3 class="mb-0 mt-0" v-show="boardId === 4">Notice Board</h3>
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
            </ol>
      </div>
      <div class="col-md-6 col-4 align-self-center">
        <a class="btn btn-create fa-pull-right" @click="createArticle(boardId)">게시글 생성</a>
      </div>
    </div>
    <div class="card">
        <div class="board-table">
            <table>
                <thead>
                    <tr>
                        <th>uid</th>
                        <th>카테고리</th>
                        <th>닉네임</th>
                        <th>제목</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="article in articles" :key="article.id" @click="readSpecificArticle(article, boardId)">
                        <td>{{ article.id }}</td>
                        <td>{{ getBoardCategory(article.board_id) }}</td>
                        <td>{{ article.nickname }}</td>
                        <td>{{ article.title }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="pagination">
        <button class="arrow" @click="prev">이전</button>
        <button class="num" :class="{ active: n===pageNum }" v-for="n in maxPageNum" :key="n.id" @click="setPage(n)" v-if="Math.ceil(n / 5) === currentBlock">
            <span>{{ n }}</span>
        </button>
        <button class="arrow" @click="next">다음</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Board',
    data() {
      return {
        articles: '',
        currentBlock: 1,
        pageNum: 1,
        maxPageNum: '',
        numberOfItems: '',
        boardId: '',
        title: '',
        content: '',
      }
    },
    methods: {
        getArticles (boardId) {
          this.$store.dispatch('getArticles', {
            token: this.$session.get('token'),
            boardId: boardId,
            page: this.pageNum
          }).then(res => {
              this.articles = res.data.articles;
              this.maxPageNum = res.data.totalPage;
          }, error => {
              console.log(error);
          })
        },
        setPage (n) {
          this.pageNum = n;
          this.$session.set('nowPageNum', this.pageNum);
          this.getArticles(this.boardId);
        },
        prev () {
            if (this.currentBlock === 1) {
                alert('제일 첫 블록입니다.');
            } else {
                this.currentBlock--;
                this.pageNum = this.currentBlock * 5 - 4;
                this.$session.set('nowPageNum', this.pageNum);
                this.getArticles(this.boardId)
            }
        },
        next () {
            if (this.currentBlock === Math.ceil(this.maxPageNum / 5)) {
                alert('마지막 블록입니다.');
            } else {
                this.currentBlock++;
                this.pageNum = this.currentBlock * 5 - 4;
                this.$session.set('nowPageNum', this.pageNum);
                this.getArticles(this.boardId);
            }
        },
        updateBoardId (article, boardId) {
            article.board_id = boardId;
        },
        readSpecificArticle (article, boardId) {
            if(article.is_deleted) {
                alert('숨겨진 게시글은 조회할 수 없습니다.');
                return;
            }
            if (boardId === 1) this.$router.push(`/community/board/free/detail/${article.id}`);
            else if (boardId === 2) this.$router.push(`/community/board/job/detail/${article.id}`);
            else if (boardId === 3) this.$router.push(`/community/board/anonymous/detail/${article.id}`);
            else if (boardId === 4) this.$router.push(`/community/board/notice/detail/${article.id}`);
        },
        createArticle (boardId) {
            if (boardId === 1) this.$router.push(`/community/board/free/register`);
            else if (boardId === 2) this.$router.push(`/community/board/job/register`);
            else if (boardId === 3) this.$router.push(`/community/board/anonymous/register`);
            else if (boardId === 4) this.$router.push(`/community/board/notice/register`);
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
                        this.$router.go(0);
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
        getBoardCategory (board_id) {
            if (board_id === 1) return '자유';
            else if (board_id === 2) return '취업';
            else if (board_id === 3) return '익명';
            else if (board_id === 4) return '공지';
        }
    },
    created () {
        console.log('1');
        if(this.$router.history.current.path.split('/')[3] === 'free') this.boardId = 1;
        else if(this.$router.history.current.path.split('/')[3] === 'job') this.boardId = 2;
        else if(this.$router.history.current.path.split('/')[3] === 'anonymous') this.boardId = 3;
        else if(this.$router.history.current.path.split('/')[3] === 'notice') this.boardId = 4;
        this.pageNum = this.$session.get('nowPageNum') !== undefined ? this.$session.get('nowPageNum') : 1;
        this.getArticles(this.boardId);
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        if(from.path.match(to.path) === null) {
          vm.pageNum = 1;
          vm.$session.set('nowPageNum', 1);
          vm.getArticles(vm.boardId);
        } else {
          vm.currentBlock = Math.ceil(vm.pageNum / 5);
          vm.getArticles(vm.boardId);
        }
      });
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
.pagination { 
  margin: 20px auto;
  justify-content: center;
}
.arrow { 
  width: 60px;
  height: 40px;
  background-color: transparent;
  border: 1px solid #666666;
  color: #666666;
  cursor: pointer;
  font-size: 13px;
}
.num { 
  margin: 0 1px;
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: 1px solid #666666;
  color: #666666;
  cursor: pointer;
  font-size: 13px;
}
.active { background-color: #175c8e!important; color: #fff!important; }

table { width: 100%; }
thead tr th:first-child { width: 5%; }
thead tr th:nth-child(2) { width: 5% }
thead tr th:nth-child(1n + 3) { width: 15%; }
table th, table td { padding: 1rem 2rem;}
table td { border-top: 1px solid #eceeef; }
table tbody tr { cursor: pointer; }
table tbody tr:hover { background: #dbdcdd; }
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
