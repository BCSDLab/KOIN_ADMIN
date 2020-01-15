import * as api from "../../api/api"
import * as selected from "../../static/selected"

const defaultState={
  versionList:[],
  versionInfo: {},
  totalPage: 1
};

const actions={
  setDataList(context){
    return new Promise(
      (resolve, reject)=> {
        api.getVersionList().then(
          res => {
            console.log(res)
            context.commit("versionListUpdate", res.data);
            resolve(res.data);
          }, error => {
            reject(error);
          }
        )
      })
  },
  deleteVersion(context){
    return new Promise(
      (resolve, reject) =>{
        api.removeVersion(context.state.versionInfo.type).then(
          res=>{
            context.state.versionInfo = null;
            resolve(res);
          }, err=>{
            reject(err)
        })
      }
    )
  },
  updateVersion({ state }, payload){
    let body = {
      version: payload
    };
    return new Promise(
      (resolve, reject) => {
        api.updateVersion(state.versionInfo.type, body).then(
          res =>{
            state.versionInfo = res.data;
            resolve(res);
          },
          err => {
            reject(err);
          })
      }
    )
  },
  setDataInfo(context, index){
    return new Promise(
      (resolve, reject) => {
        api.getVersion(context.state.versionList[index].type).then(
          res=>{
            context.commit('versionInfoUpdate', res.data);
            resolve(res);
          },
          err=>{
            reject(err);
          }
        )
      })
  },
  createVersion(context, payload){
    let body={
      version: payload.version,
      type: payload.type
    };
    return new Promise(
      (resolve, reject) => {
        api.createVersion(body).then(
          res=>{
            resolve(res);
          },err=>{
            reject(err);
          }
        )
      }
    )
  }
};

const mutations= {
  versionListUpdate: (state, data) => {
    state.versionList = data;
  },
  versionInfoUpdate: (state, data) => {
    state.versionInfo = data
  }
};
const getters={
  getDataList: state => state.versionList,
  getVersionInfo: state => JSON.parse(JSON.stringify(state.versionInfo)),
  isVersionSame: state => version => state.versionInfo.version === version
};

export default {
  namespaced: true,
  state:defaultState,
  getters,
  mutations,
  actions
}
