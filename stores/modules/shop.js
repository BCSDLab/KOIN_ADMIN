import * as api from "../../api/api"
import * as selected from "../../static/selected";

const defaultState={
  totalPage:0,
  shopList:[],
  shopInfo:{}
};

const actions = {
  setDataList(context, payload){
    return new Promise(
      (resolve, reject)=>{
        api.getShopList(payload.page, payload.limit).then(res=>{
          res.data.shops.map(
            value => {
              let opening_time = value['open_time'] && value['close_time'] ?
                value['open_time'] + ' ~ ' + value['close_time'] :
                "";
              let condition = {};
              if(!(value['is_deleted']))
                condition = {variant: 'success', text: '정상 영업'};
              else
                condition = {variant: 'secondary', text: '삭제됨'};
              return Object.assign(value, {
                condition: condition,
                "opening_time": opening_time
              })
            }
          );
          context.commit("totalPageUpdate", res.data.totalPage);
          context.commit("shopListUpdate", res.data.shops);
          resolve(res);
        }, error=>{
          reject(error);
        })
      }
    )
  },
  createShop(context, payload) {
    let body = {};
    selected.default.shop.editableData.map(
      value => {
        if(payload[value] !== null && payload[value] !== '')
          body[value]= payload[value]
      }
    );

    return new Promise(
      (resolve, reject)=>{
        api.createShop(payload).then(
          res=>{
            resolve(res);
          },err=>{
            reject(err);
        })
      }
    )
  },
  deleteShop(context){
    return new Promise(
      (resolve, reject)=>{
        api.removeShop(context.state.shopInfo.id).then(res=>{
          this.shopInfo = null;
          resolve(res);
        },err=>{
          reject(err);
        })
      }
    )
  },
  updateShop({state}, payload){
    let body={};
    selected.default.shop.editableData.map(
      value => {
        if(payload[value] === '')
          body[value]= null;
        else if(payload[value] !== null)
          body[value]= payload[value];
      }
    );
    return new Promise(
      (resolve, reject)=>{
        api.updateShop(payload.id, body).then(
          res=>{
            resolve(res);
          },
          err=>{
            reject(err)
          }
        )
      }
    )
  },
  setDataInfo(context, index) {
    return new Promise(
      (resolve,reject)=>{
        api.getShop(context.state.shopList[index].id).then(res => {
            context.commit('shopInfoUpdate', res.data);
            resolve(context.shop);
          }, error => {
            reject(error.status);
          }
        )
      }
    )
  },
  createMenu(context, payload){
    let body ={
      name: payload.data.name,
      "price_type": JSON.stringify(payload.data['price_type'])
    };
    return new Promise(
      (resolve, reject) => {
        api.createMenu(context.state.shopInfo.id, body).then(res =>{
          resolve(res);
        },err=>{
          reject(err)
        })
      }
    )
  },
  updateMenu(context, payload) {
    let body ={
      name: payload.data.name,
      "price_type": JSON.stringify(payload.data['price_type'])
    };
    return new Promise(
      (resolve, reject) => {
        api.updateMenu(payload.data['shop_id'], payload.data['id'], body)
          .then(
            res =>{
              resolve(res);
            }, err=>{
              reject(err)
            }
        )
      }
    )
  },
  deleteMenu(context, payload){
    return new Promise(
      (resolve, reject) => {
        api.removeMenu(context.state.shopInfo.id, payload).then(res=>{
          resolve(res);
          console.log(res)
        },err=>{
          reject(err)
        })
      }
    )
  },
  uploadImage({ state }, payload) {
    return new Promise(
      (resolve, reject) => {
        api.uploadMarketImage(payload).then(
          res => {
            if(state.shopInfo['image_urls'] === null)
              state.shopInfo['image_urls'] = [res.data.url[0]];
            else
              state.shopInfo['image_urls'].push(res.data.url[0]);
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
const mutations={
  shopListUpdate:(state, data)=>{
    state.shopList = data;
  },
  shopInfoUpdate: (state, data) => {
    state.shopInfo = data;
  },
  totalPageUpdate: (state, data) => {
    state.totalPage = data
  }
};
const getters={
  getDataList: state=>state.shopList,
  getTotalPage: state=>state.totalPage,
  getShopInfo: state => JSON.parse(JSON.stringify(state.shopInfo))
};

export default {
  namespaced:true,
  state:defaultState,
  getters,
  mutations,
  actions
}

