import * as api from "../../api/api";
import * as selected from "../../static/selected";

const defaultState = {
  totalPage: 0,
  lostItemList:[],
  lostItemInfo:{}
};

const actions = {
  setDataList(context, payload){
    return new Promise(
      (resolve, reject)=>{
        api.getLostItems(payload.serviceType, payload.page, payload.limit).then(
          res=>{
            res.data.lostItems.map(
              value=>{
                let condition={};
                if(value.state === 2)
                  condition ={variant:'success', text:'완료'};
                else if(value.state === 1)
                  condition = {variant: 'secondary', text:'중지'};
                else
                  condition = {variant: 'primary', text: '진행 중'};
                return Object.assign(value, {condition: condition});
              }
            );
            context.commit("totalPageUpdate", res.data.totalPage);
          context.commit("lostItemListUpdate", res.data.lostItems);
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
        api.getLostItem(context.state.lostItemList[index].id).then(
          res=>{
            context.commit('lostItemInfoUpdate', res.data);
           resolve(res);
          },err=>{
            reject(err);
          })
      }
    )
  },
  getLostItemListComment(context, payload){
    return new Promise(
      (resolve, reject) => {
        api.getLostItemComment(context.state.lostItemInfo.id, payload).then(
          res=>{
            resolve(res);
          }, err=>{
            reject(err);
          }
        )
      }
    )
  },
  createLostItem(context, payload){
    let body={};
    selected.default.lost.editableData.map(
      value => {
        if(payload[value] !== null && payload[value] !== '')
          body[value]= payload[value];
      }
    );
    return new Promise(
       (resolve, reject) => {
         api.createLostItem(payload).then(
           res=>{
             this.lostItemInfo = null;
             resolve(res);
           },err=>{
             reject(err);
           }
         )
       }
    )
  },
  deleteLostItem(context){
    return new Promise(
      (resolve, reject) =>{
        api.removeLostItem(context.state.lostItemInfo.id).then(res=>{
          this.lostItemInfo = null;
          resolve(res);
        }, err=>{
          console.log(err);
          resolve(err)
        })
      }
    )
  },
  updateLostItem({state}, payload){
    let body={};
    selected.default.lost.editableData.map(
      value=>{
        if(payload[value] === '')
          body[value]= null;
        else if(payload[value] !== null)
          body[value]= payload[value];
      }
    );
    console.log(body)
    return new Promise(
      (resolve, reject) =>{
        api.updateLostItem(state.lostItemInfo.id, body).then(res=>{
          resolve(res);
        }, err=>{
          reject(err);
        })
      }
    )
  },
  createLostItemComment({ state }, payload){
    let body={
      content: payload.content
    };
    return new Promise(
      (resolve, reject) => {
        api.createLostItemComment(state.lostItemInfo.id, body).then(
          res=>{
            state.lostItemInfo.comments.push(res.data);
            resolve(res);
          },err=>{
            reject(err);
          }
        )
      }
    )
  },
  updateLostItemComment({ state }, payload) {
    let body={
      content: payload.data.content,
      is_deleted: payload.data.is_deleted
    };
    return new Promise(
      (resolve, reject) => {
        api.updateLostItemComment(state.lostItemInfo.id, payload.data.id, body).then(
          res => {
            state.lostItemInfo.comments.splice(payload.index, 1, res.data);
            resolve(res);
          }, err => {
            reject(err);
          }
        )
      })
  },
  deleteLostItemComment(context, payload){
    return new Promise(
      (resolve, reject) => {
        api.removeLostItemComment(
          context.state.lostItemInfo.id,
          context.state.lostItemInfo.comments[payload],id
        ).then(
          res=>{
            context.state.lostItemInfo.comments.splice(payload, 1);
            resolve(res);
        },err=>{
            reject(err)
        })
      }
    )
  },
  uploadThumbnailImage({ state }, payload) {
    return new Promise(
      (resolve, reject) => {
        api.uploadLostItemThumbnailImage(payload).then(
          res => {
            console.log(res);
            state.lostItemInfo.thumbnail = "https://" + res.data.url;
            resolve("https://" + res.data.url);
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
  lostItemListUpdate:(state, data)=>{
    state.lostItemList = data;
  },
  lostItemInfoUpdate:(state, data)=>{
    state.lostItemInfo = data;
  },
  totalPageUpdate: (state, data) => {
    state.totalPage = data
  }
};

const getters = {
  getDataList: state=>state.lostItemList,
  getTotalPage: state => state.totalPage,
  getLostItemInfo: state => JSON.parse(JSON.stringify(state.lostItemInfo))
};

export default {
  namespaced:true,
  state: defaultState,
  getters,
  actions,
  mutations,
};

