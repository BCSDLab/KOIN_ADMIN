<template>
  <div class="col-sm-12">
    <div class="row page-title">
      <div class="col-md-6 col-8 align-self-center">
        <h3 class="mb-0 mt-0">FAQ Register</h3>
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
            <a>FAQ Register</a>
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
                        <th>질문 <span style="color: red">*</span></th>
                        <th>답변 <span style="color: red">*</span></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><textarea class="form-control" cols="30" rows="10" v-model="question"></textarea></td>
                        <td><textarea class="form-control" cols="30" rows="10" v-model="answer"></textarea></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FaqRegister',
    data() {
      return {
          question: '',
          answer: ''
      }
    },
    methods: {
        createFaq () {
            if (confirm(`정말 ${this.question}을 생성하겠습니까?`)) {
                this.$store.dispatch('createFaq', {
                    token: this.$session.get('token'),
                    question: this.question,
                    answer: this.answer
                }).then(flag => {
                    if (flag) {
                        alert('성공적으로 생성했습니다.');
                        this.$router.go(-1);
                    }
                }, error => {
                    console.log(error);
                })
            }
        }
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
.faq-table {
  background-color: #fff;
  padding: 20px;
}
table { width: 100%; }
table thead tr th:first-child { width: 40%; }
table th, table td { padding: 1rem 2rem;}
table td { border-top: 1px solid #eceeef; }
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
