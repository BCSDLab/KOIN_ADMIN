import * as api from "../../api/api"
import * as selected from "../../static/selected"

const defaultState={
  totalPage: 0,
  userList:[],
  userInfo: {},
  permissionInfo: {}
};

const actions={
  //getUserList and init userList
  setDataList(context, payload){
    return new Promise(
      (resolve, reject) => {
        api.getUserList(payload.page, payload.limit).then(
          res=> {
            res.data.items.map(
              value => {
                let condition = {};
                let nowDate = new Date();
                if(value['is_authed'])
                  condition = {variant: 'success', text: '로그인 가능'};
                else if (value['auth_expired_at'] < nowDate.getDate())
                  condition = {variant: 'warning', text: '인증 기간 만료'};
                else if (value['auth_token'] !== null)
                  condition = {variant: 'info', text: '인증 중'};
                else
                  condition = {variant: 'secondary', text: '로그인 차단'};

                return Object.assign(value, {condition: condition})
              }
            );
            context.commit("totalPageUpdate", res.data.totalPage);
            context.commit("userListUpdate", res.data.items);
            resolve(res);
          }, error => {
            reject(error)
          }
        )
      }
    )
  },
  createUser(context, payload) {
    let body = {};
    selected.default.user.editableData.map(
      value => {
        //빈칸이 있는 경우 보내지 않음
        if(payload[value] !== null && payload[value] !== '')
          body[value]= payload[value]
      }
    );

    return new Promise(
      (resolve, reject)=>{
        api.createUser(payload).then(
          res=>{
            resolve(res);
          },
          err=>{
            reject(err);
        })
      }
    )
  },
  deleteUser(context){
    return new Promise(
      (resolve, reject) =>{
            api.removeUser(context.state.userInfo.id).then(res=>{
              this.userInfo = null;
              resolve(res);
            }, err=>{
              console.log(err);
              reject(err)
        })
      }
    )
  },
  updateUser({ state }, payload){
    let body = {};

    selected.default.user.editableData.map(
      value => {
        if(payload[value] === '' && value !== 'password')
        //password칸을 입력하지 않았으면 그대로 간다.
          body[value] = null;
        else if(payload[value] !== null)
          body[value] = payload[value];
      }
    );
    return new Promise(
      (resolve, reject)=>{
        api.updateUser(payload.id, body).then(
          res =>{
            state.userInfo = Object.assign(res.data, state.userInfo);
            resolve(res);
          },
          err => {
            reject(err);
        })
      }
    )
  },
  //만약 getDataList의 요소와 getDataInfo의 값이 달라질 경우 이 함수를 api에서 받아오는 형식으로 바꿔야 한다.
  setDataInfo(context, index){
    return new Promise(
      (resolve, reject) => {
        if(index < context.state.userList.length && index >= 0) {
          api.getPermission(context.state.userList[index].id)
            .then(
              res => {
                if(res.status === 200) {
                  //getPermission을 했을 경우 권한에 대한 정보가 있는 경우
                  res.data.hasPermission = true;
                  return res.data
                }
              },
              error => {
                if(error.message.indexOf("404") !== -1) {
                  return {hasPermission: false};
                }
              }
            ).then(
              value => {
                context.commit('permissionInfoUpdate', value);
              }
            );

          context.commit('userInfoUpdate', index);
          resolve(true);
        } else
          reject();
      }
    )
  },
  //닉네임이 중복되는지 확인, 이후 nicknameState에 넣는다.
  checkNickname(context, payload) {
    return new Promise(
      (resolve) => {
        if(context.state.userInfo.nickname === payload)
          resolve(true);
        else
          api.checkNickname(payload).then(
            res => {
              if(res.status === 200) {
                alert('사용가능한 닉네임입니다.');
                resolve(true);
              }
            },
            error => {
              if(error.message.indexOf("409") !== -1) {
                alert('중복되는 닉네임입니다.');
                resolve(false);
              }
            }
          )
      }
    )
  },
  createPermission(context, payload) {
    let body = {};
    selected.default.permission.editableData.map(
      value => {
        body[value]= !!payload[value]
      }
    );

    return new Promise(
      (resolve, reject)=>{
        api.createPermission(context.state.userInfo.id, body).then(res=>{
          this.permissionInfo = res.data;
          resolve(res);
        },err=>{
          reject(err);
        })
      }
    )
  },
  updatePermission({ state }, payload){
    let body = {};

    selected.default.permission.editableData.map(
      value => {
          body[value] = payload[value];
      }
    );
    return new Promise(
      (resolve, reject)=>{
        api.updatePermission(state.userInfo.id, body).then(
          res =>{
            //res 데이터에 id / user_id가 없다
            resolve(res);
          },
          err => {
            reject(err);
          })
      }
    )
  },
  deletePermission(context){
    return new Promise(
      (resolve, reject) =>{
        api.removePermission(context.state.permission.id).then(res=>{
          this.permissionInfo = null;
          resolve(res);
        }, err=>{
          console.log(err);
          reject(err)
        })
      }
    )
  }
};

const mutations= {
  userListUpdate: (state, data) => {
    state.userList = data;
  },
  userInfoUpdate: (state, index) => {
    state.userInfo = state.userList[index]
  },
  totalPageUpdate: (state, data) => {
    state.totalPage = data
  },
  permissionInfoUpdate: (state, data) => {
    state.permissionInfo = data
  }
};
const getters={
  getDataList: state => state.userList,
  getTotalPage: state => state.totalPage,
  getUserInfo: state => JSON.parse(JSON.stringify(state.userInfo)),
  getPermissionInfo: state => JSON.parse(JSON.stringify(state.permissionInfo))
};

export default {
  namespaced : true,
  state:defaultState,
  getters,
  mutations,
  actions
}
