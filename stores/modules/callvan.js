import * as api from "../../api/api"
import * as selected from "../../static/selected"

const defaultState={
  companyList:[],
  companyInfo: {},
  totalPage: 0
};

const actions={
  setDataList(context, payload){
    return new Promise(
      (resolve, reject)=> {
        api.getCompanyList().then(
          res => {
            res.data.map(
              value => {
                let condition = {};
                if(!(value['is_deleted']))
                  condition = {variant: 'success', text: '정상 영업'};
                else
                  condition = {variant: 'secondary', text: '삭제됨'};

                return Object.assign(value, {condition: condition})
              }
            );

            context.commit(
              "companyListUpdate",
              res.data.slice(
                payload.limit * (payload.page - 1),
                payload.limit * payload.page));
            context.commit(
              "totalPageUpdate",
              Math.round(res.data.length / payload.limit)
            );
            resolve(res.data);
          }, error => {
            reject(error);
          }
        )
      })
  },
  deleteCompany(context){
    return new Promise(
      (resolve, reject) =>{
        api.removeCompany(context.state.companyInfo.id).then(
          res=> {
            resolve(res);
          },
          err=>{
            console.log(err);
            reject(err)
        })
      }
    )
  },
  updateCompany({ state }, payload){
    let body = {};

    selected.default.callvan.editableData.map(
      value => {
        if(payload[value] === '')
          body[value] = null;
        else if(payload[value] !== null)
          body[value] = payload[value];
      }
    );
    return new Promise(
      (resolve, reject)=>{
        api.updateCompany(state.companyInfo.id, body).then(
          res =>{
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
        if(index === -1) {
          let companyInfo = {};
          selected.default.callvan.editableData.map(
            value => {
              companyInfo[value] = null
            }
          );
          companyInfo['is_deleted'] = false;
          context.commit('companyInfoUpdate', companyInfo);
          resolve(companyInfo);
        } else
          api.getCompany(context.state.companyList[index].id).then(
            res=>{
              context.commit('companyInfoUpdate', res.data);
              resolve(res);
            },
            err=>{
              reject(err);
            }
          )
      })
  },
  createCompany(context, payload){
    let body={};

    selected.default.callvan.editableData.map(
      value=>{
        if(payload[value] !== null && payload[value] !== '')
          body[value]= payload[value]
      }
    );
    return new Promise(
      (resolve, reject) => {
        api.createCompany(body).then(
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
  companyListUpdate: (state, data) => {
    state.companyList = data;
  },
  companyInfoUpdate: (state, data) => {
    state.companyInfo = data
  },
  totalPageUpdate: (state, data) => {
    state.totalPage = data
  }
};
const getters={
  getDataList: state => state.companyList,
  getCompanyInfo: state => JSON.parse(JSON.stringify(state.companyInfo)),
  getTotalPage: state => state.totalPage
};

export default {
  namespaced: true,
  state:defaultState,
  getters,
  mutations,
  actions
}
