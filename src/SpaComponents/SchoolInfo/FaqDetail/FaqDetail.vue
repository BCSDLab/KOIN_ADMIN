<template>
  <div class="col-sm-12">
    <div class="row page-title">
      <div class="col-md-6 col-8 align-self-center">
        <h3 class="mb-0 mt-0">FAQ Detail</h3>
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
          <li class="breadcrumb-item">
            <a>FAQ Detail</a>
          </li>
        </ol>
      </div>
      <div class="col-md-6 col-4 align-self-center">
        <a class="btn btn-delete fa-pull-right" @click="deleteFaq(faq)">FAQ 삭제</a>
        <a class="btn btn-update fa-pull-right" @click="updateFaq(faq)">FAQ 수정</a>
      </div>
    </div>
    <div class="card">
        <div class="faq-table">
            <table>
                <thead>
                    <tr>
                        <th>uid <span style="color: red">*</span></th>
                        <th>질문 <span style="color: red">*</span></th>
                        <th>답변 <span style="color: red">*</span></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input class="form-control" type="text" v-model="faq.id"></td>
                        <td><textarea class="form-control" cols="30" rows="10" v-model="faq.question"></textarea></td>
                        <td><textarea class="form-control" cols="30" rows="10" v-model="faq.answer"></textarea></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FaqDetail',
    data() {
      return {
          faq: ''
      }
    },
    methods: {
        getSpecificFaq () {
            this.$store.dispatch('getSpecificFaq', {
                id: this.$router.history.current.path.split('/')[4]
            }).then(res => {
                this.faq = res.data;
            }, error => {
                console.log(error);
            })
        },
        updateFaq (faq) {
            if (confirm(`정말 ${faq.question}을 수정하겠습니까?`)) {
                this.$store.dispatch('updateFaq', {
                    token: this.$session.get('token'),
                    id: faq.id,
                    question: faq.question,
                    answer: faq.answer
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
        deleteFaq (faq) {
            if (confirm(`정말 ${faq.question}을 삭제하겠습니까?`)) {
                this.$store.dispatch('deleteFaq', {
                    token: this.$session.get('token'),
                    id: faq.id
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
    },
    created () {
        this.getSpecificFaq();
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
table { width: 100%; }
table thead tr th:first-child { width: 10%; }
table th, table td { padding: 1rem 2rem;}
table td { border-top: 1px solid #eceeef; }
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
