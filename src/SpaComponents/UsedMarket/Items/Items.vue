<template>
  <div class="col-sm-12">
    <div class="row page-title">
      <div class="col-md-6 col-8 align-self-center">
        <h3 class="mb-0 mt-0" v-show="type === 0">Sell Market</h3>
        <h3 class="mb-0 mt-0" v-show="type === 1">Buy Market</h3>
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
              <th>uid</th>
              <th>닉네임</th>
              <th>제목</th>
              <th>가격</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id" @click="readSpecificItem(item)">
              <td>{{ item.id }}</td>
              <td>{{ item.nickname }}</td>
              <td>{{ item.title | lengthLimit }}</td>
              <td>{{ item.price }}</td>
              <td>{{ getItemState(item.state) }}</td>
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
    name: 'Items',
    data() {
      return {
        items: '',
        currentBlock: 1,
        pageNum: 1,
        maxPageNum: '',
        numberOfItems: '',
        type: '',
        title: undefined,
        content: undefined,
        state: undefined,
        price: undefined,
      }
    },
    methods: {
      getItems (type) {
        this.$store.dispatch('getItems', {
          token: this.$session.get('token'),
          page: this.pageNum,
          type: type
        }).then(res => {
          this.items = res.data.items;
          this.maxPageNum = res.data.totalPage;
          this.numberOfItems = res.data.totalItemCount
        }, error => {
          console.log(error);
        })
      },
      setPage (n) {
          this.pageNum = n
          this.$session.set('nowPageNum', this.pageNum);
          this.getItems(this.type);
      },
      prev () {
        if (this.currentBlock === 1) {
          alert('제일 첫 블록입니다.');
        } else {
          this.currentBlock--;
          this.pageNum = this.currentBlock * 5 - 4;
          this.$session.set('nowPageNum', this.pageNum);
          this.getItems(this.type);
        }
      },
      next () {
        if (this.currentBlock === Math.ceil(this.maxPageNum / 5)) {
          alert('마지막 블록입니다.');
        } else {
          this.currentBlock++;
          this.pageNum = this.currentBlock * 5 - 4;
          this.$session.set('nowPageNum', this.pageNum);
          this.getItems(this.type);
        }
      },
      updateState(item, state) {
        item.state = state;
      },
      readSpecificItem (item) {
        if (this.type === 0) this.$router.push(`/used-market/sell/detail/${item.id}`);
        else this.$router.push(`/used-market/buy/detail/${item.id}`);
      },
      createItem () {
        if (this.type === 0) this.$router.push('/used-market/sell/register');
        else this.$router.push('/used-market/buy/register');
        // if (confirm(`정말 ${this.title}을 생성하겠습니까?`)) {
        //   this.$store.dispatch('createItem', {
        //     token: this.$session.get('token'),
        //     type: 0,
        //     title: this.title,
        //     content: this.content,
        //     state: this.state,
        //     price: this.price
        //   }).then(flag => {
        //     if (flag) {
        //       alert('성공적으로 생성했습니다.');
        //       this.$router.go(0);
        //     }
        //   }, error => {
        //     console.log(error);
        //   })
        // }
      },
      updateItem (item) {
        if (confirm(`정말 ${item.title}을 수정하겠습니까?`)) {
          this.$store.dispatch('updateItem', {
            token: this.$session.get('token'),
            id: item.id,
            title: item.title,
            state: item.state,
            price: item.price,
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
      deleteItem (item) {
        if (confirm(`정말 ${item.title}을 삭제하겠습니까?`)) {
          this.$store.dispatch('deleteItem', {
            token: this.$session.get('token'),
            id: item.id
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
      setState (state) {
        this.state = state;
      },
      getItemState (state) {
        if (this.type === 0) {
          if (state === 0) return '판매 중';
          else if (state === 1) return '판매 중지';
          else if (state === 2) return '판매 완료';
        } else {
          if (state === 0) return '구매 중';
          else if (state === 1) return '구매 중지';
          else if (state === 2) return '구매 완료';
        }
      }
    },
    created () {
      console.log(this.$router.history.current.path.split('/')[2]);
      if(this.$router.history.current.path.split('/')[2] === 'sell') this.type = 0
      else this.type = 1;
      this.pageNum = this.$session.get('nowPageNum') !== undefined ? this.$session.get('nowPageNum') : 1;
      this.getItems(this.type);
      this.currentPage = this.pageNum;
    },
    filters: {
      lengthLimit: function(msg) {
        if(msg.length > 25) return `${msg.substring(0, 25)}...`;
        else return msg;
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        if(from.path.match(to.path) === null) {
          vm.pageNum = 1;
          vm.$session.set('nowPageNum', 1);
          vm.getItems(vm.type);
        } else {
          vm.currentBlock = Math.ceil(vm.pageNum / 5);
          vm.getItems(vm.type);
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
.market-table {
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
thead tr th:nth-child(1n + 2) { width: 15%; }
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
