import * as api from "../../api/api";
import sha256 from "sha256";

const defaultState = {};

const actions = {
  getUsers: (context, payload) => {
    console.log(payload);
    return new Promise((resolve, reject) => {
      api.getUsers(payload.token, payload.page).then((res) => {
        console.log(res);
        resolve(res);
      }, (error) => {
        console.log(error);
        reject(false);
      })
    })
  },
  getSpecificUser: (context, payload) => {
    console.log(payload);
    return new Promise((resolve, reject) => {
      api.getSpecificUser(payload.token, payload.id).then((res) => {
        console.log(res);
        resolve(res);
      }, (error) => {
        console.log(error);
        reject(false);
      })
    })
  },
  createUser: (context, payload) => {
    console.log(payload);
    return new Promise((resolve, reject) => {
      let body = {
        portal_account: payload.portal_account,
        password: sha256(payload.password),
        nickname: payload.nickname,
        name: payload.name,
        major: payload.major,
        student_number: payload.student_number,
        phone_number: payload.phone_number,
        gender: payload.gender,
        identity: payload.identity,
        is_graduated: payload.is_graduated,
        is_authed: payload.is_authed
      }
      console.log(body);
      api.createUser(payload.token, body).then((res) => {
        console.log(res);
        resolve(true);
      }, (error) => {
        if (error.message.indexOf('409') !== -1) {
          alert('중복되는 계정명입니다.');
        }
        if (error.message.indexOf('412') !== -1) {
          alert('데이터 형식을 지켜주세요.');
        }
        if (error.message.indexOf('500') !== -1) {
          alert('서버에 이상이 있습니다.');
        }
        reject(false);
      })
    })
  },
  updateUser: (context, payload) => {
    console.log(payload);
    return new Promise((resolve, reject) => {
      let body = {
        portal_account: payload.portal_account,
        name: payload.name,
        major: payload.major,
        student_number: payload.student_number,
        gender: payload.gender,
        is_authed: payload.is_authed,
        is_graduated: payload.is_graduated,
        phone_number: payload.phone_number,
        // identitiy: payload.identitiy
      }
      if (!payload.originNickFlag) body['nickname'] = payload.nickname;
      else body['nickname'] = undefined;
      console.log(body);
      api.updateUser(payload.token, payload.id, body).then((res) => {
        console.log(res);
        resolve(true);
      }, (error) => {
        if (error.message.indexOf('412') !== -1) {
          alert('데이터 형식을 지켜주세요.');
        }
        if (error.message.indexOf('500') !== -1) {
          alert('서버에 이상이 있습니다.');
        }
        // console.log(error);
        reject(false);
      })
    })
  },
  deleteUser: (context, payload) => {
    console.log(payload);
    return new Promise((resolve, reject) => {
      api.deleteUser(payload.token, payload.id).then((res) => {
        console.log(res);
        resolve(true);
      }, (error) => {
        if (error.message.indexOf('500') !== -1) {
          alert('서버에 이상이 있습니다.');
        }
        reject(false);
      })
    })
  },
  nicknameCheck: (context, payload) => {
    console.log(payload);
    return new Promise((resolve, reject) => {
      api.nicknameCheck(payload.nickname).then((res) => {
        if (res.status === 200) {
          alert('사용가능한 닉네임입니다.');
          resolve(true);
        }
      }, (error) => {
        if (error.message.indexOf("412") !== -1) {
          alert("중복되는 닉네임 입니다.");
          reject(false);
        }
      })
    })
  },
  getAdminPermission: (context, payload) => {
    console.log(payload);
    return new Promise((resolve, reject) => {
      api.getAdminPermission(payload.id, payload.token).then((res) => {
        console.log(res);
        resolve(res);
      }, (error) => {
        console.log(error);
      })
    })
  },
  getAdminPermissions: (context, payload) => {
    return new Promise((resolve, reject) => {
      api.getAdminPermissions(payload.token).then((res) => {
        console.log(res);
        resolve(res);
      }, (error) => {
        console.log(error);
      })
    })
  },
  setAdminPermission: (context, payload) => {
    console.log(payload);
    return new Promise((resolve, reject) => {
      let body = {
        grant_callvan: payload.grant_callvan,
        grant_user: payload.grant_user,
        grant_shop: payload.grant_shop,
        grant_community: payload.grant_community,
        grant_version: payload.grant_version,
        grant_land: payload.grant_land,
        grant_market: payload.grant_market,
        grant_circle: payload.grant_circle,
        is_deleted: payload.is_deleted
      }
      api.setAdminPermission(payload.token, payload.userId, body).then((res) => {
        console.log(res);
        resolve(res);
      }, (error) => {
        console.log(error);
      });
    })
  },
  updateAdminPermission: (context, payload) => {
    console.log(payload);
    return new Promise((resolve, reject) => {
      let body = {
        grant_callvan: payload.grant_callvan,
        grant_user: payload.grant_user,
        grant_shop: payload.grant_shop,
        grant_community: payload.grant_community,
        grant_version: payload.grant_version,
        grant_land: payload.grant_land,
        grant_market: payload.grant_market,
        grant_circle: payload.grant_circle,
        is_deleted: payload.is_deleted
      }
      api.updateAdminPermission(payload.token, payload.userId, body).then((res) => {
        console.log(res);
        resolve(res);
      }, (error) => {
        console.log(error);
      })
    })
  },
  withdrawAdminPermission: (context, payload) => {
    console.log(payload);
    return new Promise((resolve, reject) => {
      api.withdrawAdminPermission(payload.token, payload.userId).then((res) => {
        console.log(res);
        resolve(res);
      }, (error) => {
        console.log(error);
      })
    })
  }
};

const mutations = {};

const getters = {};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
