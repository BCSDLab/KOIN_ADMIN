<template>
<main role="main" class="col-sm-9 ml-sm-auto col-md-10 pt-3" id="main">
  <h1>Koin Admin Page</h1>
  <div class="row">
    <span class="col-md-5"><h2>{{title}} DB 추가하기</h2></span>
  </div>
  <div class="add">
    <div class="row" v-for="( dataHead, idx ) in datasHead" v-if="dataHead != 'imageLink'">
      <div class="col-md-3">{{dataHead}}</div>
      <div class="col-md-5"> <input class="col-md-12" v-model="bodyInput[idx]"></div>
    </div>
  </div>
  <div v-if="imageFlag" class="imageRegister">
    <div class="row">
      <div class="col-md-3">
        imageLink
      </div>
      <div class="col-md-3">
        <input type="file" id="files" ref="files" multiple v-on:change="handleFilesUpload()"/>
      </div>
      <div class="col-md-2">
        <button v-on:click="submitFiles()" class="btn btn-sm btn-primary col-md-12">Submit</button>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-8">
      <button type="button" @click="addDb" class="btn btn-sm btn-light col-md-12" name="button">추가하기</button>
    </div>
  </div>
</main>
</template>

<script>
import MenuBus from './MenuBus.vue';
import axios from 'axios';

export default {
  name: 'AddDb',
  data() {
    return {
      title: "",
      datas: "",
      url: "",
      datasHead: "",
      notInclude: ["_id", "__v", "createDate", "updateDate", "lastLoginDate"],
      numInclude: ["size", "floor", "administrativeExpense", "lat", "lng", "option"],
      bodyInput: [],
      imageLink: [],
      imageFlag: false,
      files: ''
    }
  },
  created: function() {
    if (this.$session.get("admin") == false) {
      this.$router.push({
        path: "./"
      });
      alert("허용되지 않은 접근입니다. 로그인 해주세요.");
    } else {
      MenuBus.$on('menu', this.init);
      this.init(this.$session.get("state"));

    }
  },
  methods: {
    init: function(nowMenu) {
      this.title = nowMenu;
      if (nowMenu == "users")
        this.url = "https://api.koreatech.in/" + nowMenu + "?token=" + this.$session.get("token");
      else
        this.url = "http://api.koreatech.in/" + nowMenu + "?token=" + this.$session.get("token");
      //key값 추출
      axios.get(this.url)
        .then((res) => {
          //키값만 추출
          this.head = res.data[0];
          var arr = new Array();
          for (var key in this.head) {
            if (!this.notInclude.includes(key))
              arr.push(key);
          }
          this.datasHead = arr;

          if (this.datasHead.includes("imageLink")) {
            this.imageFlag = true;
          }
        })
        .catch((ex) => {
          imageArray.log("error : ", ex);
        })
    },
    addDb: function(e) {
      //body 만들기
      var body = new Object();
      for (let i = 0; i < this.bodyInput.length; i++) {
        if (this.datasHead != "imageLink")
          if( this.numInclude.includes(this.datasHead[i]))
            body[this.datasHead[i]] = this.bodyInput[i]*1;
          else
            body[this.datasHead[i]] = this.bodyInput[i];
        else {
          body[this.datasHead[i]];
        }
      }
      if(this.imageFlag)
        body["imageLink"] = this.imageLink;
      //api호출부분
      axios.post(this.url, body)
        .then((res) => {
          alert("생성되었습니다.");
        })
        .catch((ex) => {
          console.log("error : ", ex);
        })
    },
    submitFiles() {
      alert("완료창이 될 때까지 기다려주세요.");
      let imageObject = new Object();
      let imageArray = new Array();
      for (var i = 0; i < this.files.length; i++) {
        let formData = new FormData();
        let file = this.files[i];
        formData.append('file', file);

        axios.post('https://api.koreatech.in/s3/images?token='+this.$session.get("token"),
            formData,{
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
            }
          ).then((res)=>{
            imageObject.url = res.data.imageLink;
            imageArray.push(imageObject);
            this.imageLink = imageArray;
          })
          .catch(function() {
            alert("실패. 다시 시도해주세요.");
          });
      }
      alert("완료");
    },
    handleFilesUpload() {
      this.files = this.$refs.files.files;
    }
  }
}
</script>

<style>
#main {
  margin-top: 4%;
}

.add {
  margin-top: 4%;
  margin-bottom: 1%;
}

.imageRegister {
  margin-top: 2%;
  margin-bottom: 4%;
}
</style>
