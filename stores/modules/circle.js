import * as api from "../../api/api";
import * as selected from "../../static/selected";

const defaultState = {
  totalPage:0,
  circleList:[],
  circleInfo:{}
};

const actions = {
  setDataList(context, payload){
    return new Promise(
      (resolve, reject)=>{
        api.getCircleList(payload.page, payload.limit).then(
          res=> {
            res.data.circles.map(
              value => {
                let condition = {};
                if(!(value['is_deleted']))
                  condition = {variant: 'success', text: '활동 중'};
                else
                  condition = {variant: 'secondary', text: '폐쇄'};

                return Object.assign(value, {condition: condition})
              }
            );

            context.commit("totalPageUpdate", res.data.totalPage);
            context.commit("circleListUpdate", res.data.circles);
            resolve(true);
          }, error => {
            reject(false)
          }
        )
      }
    )
  },
  deleteCircle(context){
    return new Promise(
      (resolve, reject) => {
        api.removeCircle(context.state.circleInfo.id).then(res=>{
          this.circleInfo =null;
          resolve(res);
        },err=>{
          resolve(err)
        })
      }
    )
  },
  updateCircle({ state }, payload){
    let body={};

    selected.default.circle.editableData.map(
      value => {
        if(payload[value] === '')
          body[value] = null;
        else if(payload[value] !== null)
          body[value] = payload[value];
      }
    );
    return new Promise(
      (resolve, reject) => {
        api.updateCircle(payload.id, body).then(
          res =>{
            state.circleInfo = res.data;
            resolve(res);
          },
          err=>{
            reject(err)
          }
        )
      }
    )
  },
  setDataInfo(context, index){
    return new Promise(
      (resolve, reject) => {
        if(index < context.state.circleList.length && index >= 0){
          context.commit('circleInfoUpdate', context.state.circleList[index]);
          resolve(true);
        } else if (index === -1) {
          let circleInfo = {};
          selected.default.circle.editableData.map(
            value => {
              circleInfo[value] = null;
            }
          );
          circleInfo['is_deleted'] = false;

          context.commit('circleInfoUpdate', circleInfo);
          resolve(circleInfo);
        } else
          reject();
      }
    )
  },
  createCircle(context, payload){
    let body={};

    selected.default.circle.editableData.map(
      value=>{
        if(payload[value] !== null && payload[value] !== '')
          body[value]= payload[value]
      }
    );

    return new Promise(
      (resolve, reject) => {
        api.createCircle(payload).then(
          res=>{
            this.circleInfo = null;
            resolve(res);
          },err=>{
            reject(err);
          }
        )
      }
    )
  },
  getCircle(context, index){
    return new Promise(
      (resolve, reject) => {
        api.getCircle(context.state.circleList[index].id).then(
          res=>{
            resolve(res);
          },err=>{
            reject(err);
          }
        )
      }
    )
  },
  uploadImage(context, payload) {
    return api.uploadImage(payload.formData).then(res => {
      if(payload.flag === 0)
        context.state.circleInfo['logo_url'] = "https://" + res.data;
      else if(payload.flag === 1)
        context.state.circleInfo['background_img_url'] = "https://" + res.data;
      return res.data;
    }, error => {
      alert('이미지의 크기가 너무 큽니다.');
      return '';
    })

  }

};

const mutations = {
  circleListUpdate:(state, data)=>{
    state.circleList = data;
  },
  circleInfoUpdate:(state, data) => {
    state.circleInfo = data;
  },
  totalPageUpdate:(state, data)=>{
    state.totalPage = data
  }
};

const getters = {
  getDataList: state => state.circleList,
  getTotalPage: state => state.totalPage,
  getCircleInfo: state =>  JSON.parse(JSON.stringify(state.circleInfo))
};

export default {
  namespaced: true,
  state:defaultState,
  getters,
  mutations,
  actions
}


