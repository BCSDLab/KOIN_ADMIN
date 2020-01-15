import * as api from "../../api/api";

const defaultState = {
  roomList: [],
  specificRoom: Object,
};

const actions = {
  getRoomList: (context, payload) => {
    return new Promise((resolve, reject)=> {
      api.getLandList().then((res)=>{
        let sortedData = []

        sortedData = res.data.lands.sort(function (a, b) {
          return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        });

        context.commit("roomListUpdate", sortedData)
      })
    })
  },
  getSpecificRoom: (context, payload) => {
    return new Promise((resolve, reject)=> {
      api.getSpecificLand(payload.id).then((res)=>{
        context.commit("specificRoomUpdate", res.data)
        resolve(res.data);
      })
    })
  },

  registerRoom: (context, payload) => {
    return new Promise((resolve, reject)=> {
      let body = payload.roomData;
      console.log(body);
      api.postLand(payload.token, body).then((res)=>{
        context.commit("specificRoomUpdate", res.data)
        resolve(res.data);
      }).catch((err)=>{
        if(err.response.status===412){
          alert("형식이 잘못됬습니다.");
          context.commit("trackSurveyAboutUpdate", []);
        }
        if(err.response.status===401 || err.response.status===403){
          alert("로그인을 다시 해주세요");
          context.commit("trackSurveyAboutUpdate", []);
        }
        if(err.response.status===500){
          alert("status 500 server error");
          context.commit("trackSurveyAboutUpdate", []);
        }
      })
    })
  },

  adjustRoom: (context, payload) => {
    return new Promise((resolve, reject)=> {
      let body = payload.roomData;
      console.log(body);

      api.putSpecificLand(payload.token,payload.id, body).then((res)=>{
        context.commit("specificRoomUpdate", res.data)
        resolve(res.data);
      }).catch((err)=>{
        if(err.response.status===412){
          alert("형식이 잘못됬습니다.");
          context.commit("trackSurveyAboutUpdate", []);
        }
        if(err.response.status===401 || err.response.status===403){
          alert("로그인을 다시 해주세요");
          context.commit("trackSurveyAboutUpdate", []);
        }
        if(err.response.status===500){
          alert("status 500 server error");
          context.commit("trackSurveyAboutUpdate", []);
        }
      })
    })


  },

  deleteRoom: (context, payload) => {
    return new Promise((resolve, reject)=> {
      let body = payload.roomData;
      console.log(body);

      api.deleteSpecificLand(payload.token,payload.id).then((res)=>{
        console.log("res ", res)
        context.dispatch("getRoomList");
        resolve(res.data);
      }).catch((err)=>{
        if(err.response.status===412){
          alert("형식이 잘못됬습니다.");
          context.commit("trackSurveyAboutUpdate", []);
        }
        if(err.response.status===401 || err.response.status===403){
          alert("로그인을 다시 해주세요");
          context.commit("trackSurveyAboutUpdate", []);
        }
        if(err.response.status===500){
          alert("status 500 server error");
          context.commit("trackSurveyAboutUpdate", []);
        }
      })
    })
  },
};

const mutations = {
  roomListUpdate: (state, data) => {
    state.roomList = data;
  },
  specificRoomUpdate: (state, data) => {
    state.specificRoom = data;
  }
};

const getters = {
  roomList: state => state.roomList,
  specificRoom: state => state.specificRoom
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
