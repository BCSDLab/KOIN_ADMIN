import sha256 from "sha256";
import * as api from "../../api/api";

const defaultState = {
  token: ""
};

const actions = {
  login: (context, payload) => {
    console.log(payload);
    return new Promise(
      (resolve, reject) => {
        let body = {
          portal_account: payload.id,
          password: sha256(payload.pw)
        };
        api.login(body).then((res) => {
          console.log(res.status);
            if (res.status === 200) {
              context.commit("tokenUpdate", res.data.token);
              resolve([res.data.user, res.data.token])
            }
            else {
              reject(401);
              alert('허용되지 않은 계정입니다.');
            }
          },
          (err) => {
            console.log(err);
            if (err.message.indexOf("401") !== -1) {
              alert("ID와 비밀번호를 확인해주세요");
              reject(401)
            }
            else {
              alert("네트워크를 확인해주세요");
              reject(500)
            }
          }
        )
      })
  },
  logout: (context, payload) => {
    return new Promise((resolve, reject) => {
      api.logout(payload.token).then(res => {
        console.log("logout, res", res);
        if (res.status === 200) {
          context.commit("tokenUpdate", null);
          resolve(true);
        }
      }, error => {
        console.log(error);
        context.commit("tokenUpdate", null);
        resolve(false);
      })
    })
  }
};

const mutations = {
  tokenUpdate: (state, data) => {
    state.token = data;
  },
};

const getters = {
  token: state => state.token
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};

//인증용 vuex 모듈
// noinspection JSAnnotator
const Authentification = {
  state: {},
  getters: {},
  //TODO: session에 token userinfo 저장
  actions: {}
}
