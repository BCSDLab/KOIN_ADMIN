<template>
  <div class="col-sm-12">
    <div class="row page-title">
      <div class="col-md-6 col-8 align-self-center">
        <h3 class="mb-0 mt-0">FAQ</h3>
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a>Home</a>
          </li>
          <li class="breadcrumb-item">
            <a>School Information</a>
          </li>
          <li class="breadcrumb-item">
            <a>FAQ</a>
          </li>
        </ol>
      </div>
      <div class="col-md-6 col-4 align-self-center">
        <a class="btn btn-create fa-pull-right" @click="createFaq">FAQ 생성</a>
      </div>
    </div>
    <div class="card">
        <div class="faq-table">
            <table>
                <thead>
                    <tr>
                        <th>uid</th>
                        <th>질문</th>
                        <th>답변</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="faq in faqs" :key="faq.id" @click="readSpecificFaq(faq)">
                        <td>{{ faq.id }}</td>
                        <td>{{ faq.question }}</td>
                        <td>{{ faq.answer }}</td>
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
    name: 'Faq',
    data() {
      return {
          faqs: '',
          pageNum: 1,
          currentBlock: 1,
          maxPageNum: '',
          question: '',
          answer: ''
      }
    },
    methods: {
        getFaqs () {
            this.$store.dispatch('getFaqs', {
                page: this.pageNum
            }).then(res => {
                this.faqs = res.data.faqs;
                this.maxPageNum = res.data.totalPage;
            }, error => {
                console.log(error);
            })
        },
        readSpecificFaq (faq) {
            this.$router.push(`/school-info/faq/detail/${faq.id}`);
        },
        createFaq () {
            this.$router.push('/school-info/faq/register');
        },
        setPage (n) {
          this.pageNum = n;
          this.$session.set('nowPageNum', this.pageNum);
          this.getFaqs();
        },
        prev () {
            if (this.currentBlock === 1) {
                alert('제일 첫 블록입니다.');
            } else {
                this.currentBlock--;
                this.pageNum = this.currentBlock * 5 - 4;
                this.$session.set('nowPageNum', this.pageNum);
                this.getFaqs();
            }
        },
        next () {
            if (this.currentBlock === Math.ceil(this.maxPageNum / 5)) {
             alert('마지막 블록입니다.');
            } else {
                this.currentBlock++;
                this.pageNum = this.currentBlock * 5 - 4;
                this.$session.set('nowPageNum', this.pageNum);
                this.getFaqs();
            }
        },
    },
    created () {
      this.pageNum = this.$session.get('nowPageNum') !== undefined ? this.$session.get('nowPageNum') : 1;
      this.getFaqs();
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        if(from.path.match(to.path) === null) {
          vm.pageNum = 1;
          vm.$session.set('nowPageNum', 1);
          vm.getFaqs();
        } else {
          vm.currentBlock = Math.ceil(vm.pageNum / 5);
          vm.getFaqs();
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
.faq-table {
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
