<template>
  <div class="col-sm-12">
    <div class="row page-title">
      <div class="col-md-6 col-8 align-self-center">
        <h3 class="mb-0 mt-0">Stores</h3>
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
              <th>uid</th>
              <th>이름</th>
              <th>전화번호</th>
              <th>카테고리</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="store in stores" :key="store.id" @click="readSpecificStore(store)">
              <td>{{ store.id }}</td>
              <td>{{ store.name }}</td>
              <td>{{ store.phone }}</td>
              <td>{{ getStoreCategory(store.category) }}</td>
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
    name: 'Store',
    data() {
      return {
        currentBlock: 1,
        pageNum: 1,
        maxPageNum: '',
        stores: '',
        id: undefined,
        name: undefined,
        phone: undefined,
        category: undefined,
        open_time: undefined,
        close_time: undefined,
        delivery: false,
        pay_card: false,
        pay_bank: false,
      }
    },
    methods: {
      getStores () {
        this.$store.dispatch('getStores', {
          token: this.$session.get('token'),
          page: this.pageNum
        }).then((res) => {
          this.stores = res.data.shops;
          this.maxPageNum = res.data.totalPage;
        }, (error) => {
          console.log(error);
        })
      },
      createStore () {
        this.$router.push('/school-info/stores/register');
      },
      setPage (n) {
          this.pageNum = n;
          this.$session.set('nowPageNum', this.pageNum);
          this.getStores();
      },
      prev () {
        if (this.currentBlock === 1) {
          alert('제일 첫 블록입니다.');
        } else {
          this.currentBlock--;
          this.pageNum = this.currentBlock * 5 - 4;
          this.$session.set('nowPageNum', this.pageNum);
          this.getStores();
        }
      },
      next () {
        if (this.currentBlock === Math.ceil(this.maxPageNum / 5)) {
          alert('마지막 블록입니다.');
        } else {
          this.currentBlock++;
          this.pageNum = this.currentBlock * 5 - 4;
          this.$session.set('nowPageNum', this.pageNum);
          this.getStores();
        }
      },
      readSpecificStore (store) {
        this.$router.push(`/school-info/stores/detail/${store.id}`);
      },
      getStoreCategory (category) {
        if (category === 'S001') return '콜밴';
        else if(category === 'S002') return '도시락';
        else if(category === 'S003') return '족발';
        else if(category === 'S004') return '중식';
        else if(category === 'S005') return '치킨';
        else if(category === 'S006') return '피자';
        else if(category === 'S007') return '탕수육';
        else if(category === 'S008') return '일반식당';
        else if(category === 'S009') return '미용실';
      }
    },
    created () {
      this.pageNum = this.$session.get('nowPageNum') !== undefined ? this.$session.get('nowPageNum') : 1;
      this.getStores();
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        if(from.path.match(to.path) === null) {
          vm.pageNum = 1;
          vm.$session.set('nowPageNum', 1);
          vm.getStores();
        } else {
          vm.currentBlock = Math.ceil(vm.pageNum / 5);
          vm.getStores();
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
.store-table {
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