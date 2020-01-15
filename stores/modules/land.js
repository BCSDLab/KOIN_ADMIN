import axios from "axios/index";
import * as api from "../../api/api";
import * as selected from "../../static/selected";

const defaultState = {
  totalPage:0,
  landList:[],
  landInfo:{},
};
const actions = {
  setDataList(context, payload){
    return new Promise(
      (resolve, reject)=>{
        api.getLandList().then(res=>{
          res.data.lands.map(
            value => Object.assign(
              value,
              {location: value.latitude + ' , ' + value.longitude}
            )
          );
          context.commit(
            "landListUpdate",
            res.data.lands.slice(
              payload.limit * (payload.page - 1),
              payload.limit * payload.page));
          context.commit(
            "totalPageUpdate",
            Math.round(res.data.lands.length / payload.limit)
          );
          resolve(true);
        },error=>{
          reject(false);
        })
      }
    )
  },
  setDataInfo(context, index){
    return new Promise(
      (resolve, reject) => {
        api.getLand(context.state.landList[index].id).then(
          res=>{
            context.commit('landInfoUpdate', res.data);
            resolve(context.state.landList[index].id);
          },err=>{
            reject(err.status);
          }
        )
      }
    )
  },
  createLand(context, payload){
    let body={};
    selected.default.land.editableData.map(
      value => {
        if(payload[value] !== null && payload[value] !== '')
          body[value]= payload[value]
      }
    );
    return new Promise(
      (resolve, reject) => {
        api.createLand(body).then(
          res=>{
            resolve(res);
          },err=>{
            reject(err);
          }
        )
      }
    )
},
  deleteLand(context){
    return new Promise(
      (resolve, reject) => {
        api.removeLand(context.state.landInfo.id).then(
          res=>{
            console.log(
              context.state.landInfo.id)
            resolve(res);
          },err=>{
            reject(err);
          }
        )
      }
    )
  },
  updateLand(context, payload){
    let body={};
    selected.default.land.editableData.map(
      value => {
        if(payload[value] === '')
          body[value]= null;
        else if(payload[value] !== null)
          body[value]= payload[value];
      }
    );
    if(body['image_urls'].length !== 0) {
      body['image_urls'].map(value => "'" + value + "'");
      body['image_urls'] = `[${body['image_urls'].toString()}]`
    }
    return new Promise(
      (resolve, reject) => {
        api.updateLand(context.state.landInfo.id, body).then(
          res=>{
            console.log(context.state.landInfo.id);
            resolve(res);
          },err=>{
            reject(err);
          }
        )
      }
    )
  },
  uploadImage({ state }, payload) {
    return new Promise(
      (resolve, reject) => {
        api.uploadMarketImage(payload).then(
          res => {
            if (state.landInfo['image_urls'] === null)
              state.landInfo['image_urls'] = [res.data.url[0]];
            else
              state.landInfo['image_urls'].push(res.data.url[0]);
            resolve(res.data.url[0]);
          },
          err => {
            alert('이미지의 크기가 너무 큽니다.');
            reject(err);
          }
        )
      }
    )
  }
};

const mutations = {
  landListUpdate:(state, data)=>{
    state.landList = data;
  },
  landInfoUpdate:(state, data)=>{
    state.landInfo = data;
  },
  totalPageUpdate: (state, data) => {
    state.totalPage = data
  }

};

const getters = {
  getDataList: state=>state.landList,
  getTotalPage: state => state.totalPage,
  getLandInfo: state => JSON.parse(JSON.stringify(state.landInfo))
};

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations
};
