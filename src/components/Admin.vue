<template>
<main role="main" class="col-sm-9 ml-sm-auto col-md-10 pt-3" id="main">
  <h1>Koin Admin Page</h1>
  <div class="row">
    <span class="col-md-2"><h2>{{title}} DB</h2></span>
    <span class="col-md-1"><button type="button" @click="addDb" class="btn btn-sm btn-primary" name="button">추가하기</button></span>
  </div>
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr>
          <th> - </th>
          <th v-for="dataHead in datasHead">{{dataHead}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in datas">
          <td>
            <button @click="removeDb(index)" type="button" class="btn btn-sm btn-danger" name="button">삭제</button>
          </td>
          <td style="width: 100%;" v-for="i in data" v-if="!notInclude.includes(i)">{{i}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</main>
</template>

<script>
import MenuBus from './MenuBus.vue';
import Sidebar from './Sidebar.vue';
import axios from 'axios';

export default {
  name: 'Admin',
  data() {
    return {
      title: "",
      datas: "",
      datasHead: "",
      notInclude: ["_id","userPw", "anonymousNickName", "__v", "identity", "isGraduate"],
      rawData: [],
      url: "",
    }
  },
  created: function() {
    if (this.$session.get("admin") == false) {
      this.$router.push({
        path: "./"
      });
      alert("허용되지 않은 접근입니다. 로그인 해주세요.");
    } else {
      MenuBus.$on('menu', this.change);
      this.change(this.$session.get("state"));
    }
  },
  destroyed: function() {
    //this.$session.set("admin", false);
  },
  methods: {
    change: function(nowMenu) {
      this.title = nowMenu;
      let url;
      if (nowMenu == "users")
        url = "https://api.koreatech.in/" + nowMenu;
      else
        url = "http://api.koreatech.in/" + nowMenu;
      this.url = url;
      url = url + "?token=" + this.$session.get("token");
      //호출부분
      axios.get(url)
        .then((res) => {
          //키값만 추출
          this.head = res.data[0];
          var arr = new Array();
          for (var key in this.head) {
            if (!this.notInclude.includes(key))
              arr.push(key);
          }
          this.datasHead = arr;
          //실제 데이터의 키 밸류 추출
          this.datas = res.data;
          this.rawData = res.data;
          var arr3 = new Array();
          for (let i = 0; i < res.data.length; i++) {
            var arr2 = new Array();
            for (var key in res.data[i]) {
              if (!this.notInclude.includes(key))
                arr2.push(res.data[i][key]);
            }
            arr3.push(arr2)
          }
          this.datas = arr3;
        })
        .catch((ex) => {
          console.log("error : ", ex);
        })
    },
    addDb: function(e) {
      this.$router.push("./admin/add");
    },
    removeDb: function(idx) {
      let url = this.url + "/" + this.rawData[idx]._id + "?token=" + this.$session.get("token");
      axios.delete(url)
        .then((res) => {
          this.change(this.$session.get("state"));
        })
        .catch((ex) => {
          console.log("error : ", ex);
        })
    }
  }
}
</script>

<style lang="css">
  #main{
    margin-top: 4%;
  }
</style>
