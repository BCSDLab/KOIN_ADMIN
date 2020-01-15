<template>
  <div class="col-sm-12">
    <div class="row page-title">
        <div class="col-md-6 col-8 align-self-center">
            <h3 class="mb-0 mt-0">Circle</h3>
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <a>Home</a>
                </li>
                <li class="breadcrumb-item">
                    <a class="">Circle</a>
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
                        <th>uid</th>
                        <th>이름</th>
                        <th>카테고리</th>
                        <th>위치</th>
                        <th>담당교수</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="circle in circles" :key="circle.id" @click="readSpecificCircle(circle)">
                        <td>{{ circle.id }}</td>
                        <td>{{ circle.name }}</td>
                        <td>{{ getCircleCategory(circle.category) }}</td>
                        <td>{{ circle.location }}</td>
                        <td>{{ circle.professor }}</td>
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
    name: 'Circles',
    data() {
      return {
          currentBlock: 1,
          pageNum: 1,
          maxPageNum: '',
          circles: '',
          name: '',
          category: undefined,
          location: undefined,
          line_description: undefined,
          professor: undefined
      }
    },
    methods: {
        getCircles () {
            this.$store.dispatch('getCircles', {
                token: this.$session.get('token'),
                page: this.pageNum
            }).then(res => {
                this.circles = res.data.circles;
                this.maxPageNum = res.data.totalPage;
            }, error => {
                console.log(error);
            });
        },
        setCategory (category) {
            this.category = category;
        },
        readSpecificCircle (circle) {
            this.$router.push(`/circles/detail/${circle.id}`);
        },
        updateCategory(circle, category) {
            circle.category = category;
        },
        createCircle () {
            this.$router.push('/circles/register');
            // if (confirm(`정말 ${this.name}을 생성하겠습니까?`)) {
            //     this.$store.dispatch('createCircle', {
            //         token: this.$session.get('token'),
            //         name: this.name,
            //         category: this.category,
            //         location: this.location,
            //         line_description: this.line_description,
            //         professor: this.professor
            //     }).then(flag => {
            //         if (flag) {
            //             alert('성공적으로 생성했습니다.');
            //             this.$router.go(0);
            //         }
            //     }, error => {
            //         console.log(error);
            //     })
            // }
        },
        updateCircle (circle) {
            console.log(circle);
            if (confirm(`정말 ${circle.name}을 수정하겠습니까?`)) {
                this.$store.dispatch('updateCircle', {
                    token: this.$session.get('token'),
                    id: circle.id,
                    name: circle.name,
                    category: circle.category === null ? undefined : circle.category,
                    location: circle.location === null ? undefined : circle.location,
                    line_description: circle.line_description === null ? undefined : circle.line_description,
                    professor: circle.professor === null ? undefined : circle.professor,
                    is_deleted: circle.is_deleted,
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
        deleteCircle (circle) {
            if (confirm(`정말 ${circle.name}을 삭제하겠습니까?`)) {
                this.$store.dispatch('deleteCircle', {
                    token: this.$session.get('token'),
                    id: circle.id
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
        updateIsDeleted (circle) {
            if(circle.is_deleted) circle.is_deleted = 0;
            else circle.is_deleted = 1;
        },
        setPage (n) {
            this.pageNum = n;
            this.$session.set('nowPageNum', this.pageNum);
            this.getCircles();
        },
        prev () {
            if (this.currentBlock === 1) {
                alert('제일 첫 블록입니다.');
            } else {
                this.currentBlock--;
                this.pageNum = this.currentBlock * 5 - 4;
                this.$session.set('nowPageNum', this.pageNum);
                this.getCircles();
            }
        },
        next () {
            if (this.currentBlock === Math.ceil(this.maxPageNum / 5)) {
                alert('마지막 블록입니다.');
            } else {
                this.currentBlock++;
                this.pageNum = this.currentBlock * 5 - 4;
                this.$session.set('nowPageNum', this.pageNum);
                this.getCircles();
            }
        },
        getCircleCategory (category) {
            if (category === 'C001') return '예술';
            else if (category === 'C002') return '공연';
            else if (category === 'C003') return '운동';
            else if (category === 'C004') return '학술';
            else if (category === 'C005') return '종교';
            else if (category === 'C006') return '봉사';
            else if (category === 'C007') return '준';
        }
    },
    created () {
        this.pageNum = this.$session.get('nowPageNum') !== undefined ? this.$session.get('nowPageNum') : 1;
        this.getCircles();
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        if(from.path.match(to.path) === null) {
          vm.pageNum = 1;
          vm.$session.set('nowPageNum', 1);
          vm.getCircles();
        } else {
          vm.currentBlock = Math.ceil(vm.pageNum / 5);
          vm.getCircles();
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
.circle-table {
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
