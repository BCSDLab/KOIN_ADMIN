import sha256 from "sha256";
import * as api from "../../api/api";

const defaultState = {
  token: "",
  permissionInfo: {}
};

const actions = {
  refresh: (context, payload) => {
    return new Promise(
      (resolve, reject) => {
        api.refresh(payload.token).then((res) => {
          console.log(res);
          context.commit("tokenUpdate", res.data.token);
          resolve(res.data.token);
        }, (err) => {
          reject(false);
        })
      })
  },
  login: (context, payload) => {

    let body = {
      portal_account: payload.userId,
      password: sha256(payload.userPw)
    };

    return new Promise((resolve, reject) => {
      api.login(body).then(
        (res) => {
          context.commit("tokenUpdate", res.data.token);
          context.dispatch("setUserPermissionInfo", res.data.user.id);
          resolve(res);
        },
        (err) => {
          reject(err.response.status)
        })
    })
  },
  setUserPermissionInfo: (context, payload) => {
    return new Promise((resolve, reject) => {
      api.getPermission(payload).then(
        res => {
          context.commit("permissionInfoUpdate", res.data)
          resolve(res.data);
        },
        error => {
          reject(error);
        }
      )
    })
  },
  resetUserPermissionInfo: (context) => {
    return context.dispatch("setUserPermissionInfo",
      JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey'))).userInfo.id);
  }
};

const mutations = {
  tokenUpdate: (state, data) => {
    state.token = data;
  },
  permissionInfoUpdate: (state, data) => {
    state.permissionInfo = data;
  }
};

const getters = {
  getUserPermissionInfo: state => state.permissionInfo,
  nicknameFlag: state => state.nicknameFlag
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};

//인증용 vuex 모듈
const Auth = {
  state: {},
  getters: {},
  actions: {}
}
