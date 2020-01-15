import * as api from "../../api/api";
import * as selected from "../../static/selected";

const defaultState = {
  totalPage:0,
  faqList:[],
  faqInfo:{}
};

const actions = {
  setDataList(context, payload) {
    return new Promise(
      (resolve, reject) => {
        api.getFaqList(payload.page, payload.limit).then(res => {
          res.data.faqs.map(
            value => {
              let condition = {};
              if(!value['is_deleted'])
                condition = {variant: 'success', text: '활성화'};
              else
                condition = {variant: 'secondary', text: '비활성화'};

              return Object.assign(value, {condition: condition})
            }
          );

          context.commit("totalPageUpdate", res.data.totalPage);
          context.commit("faqListUpdate", res.data.faqs);
          resolve(res);
        }, error => {
          reject(error)
        })
      }
    )
  },
  deleteFaq(context) {
    return new Promise(
      (resolve, reject) => {
        api.removeFaq(context.state.faqInfo.id).then(res => {
            this.faqInfo = null;
            resolve(res);
          }, err => {
            reject(err);
          }
        )
      }
    )
  },
  updateFaq({state}, payload) {
    let body = {};
    selected.default.faq.editableData.map(
      value => {
        body[value] = payload[value]
      }
    );

    return new Promise(
      (resolve, reject) => {
        api.updateFaq(state.faqInfo.id, body).then(
          res => {
            state.faqInfo = res.data;
            resolve(res);
          },
          error => {
            reject(error);
          }
        )
      }
    )
  },
  //만약 getDataList의 요소와 getDataInfo의 값이 달라질 경우 이 함수를 api에서 받아오는 형시으로 바꿔야 한다.
  setDataInfo(context, index){
    return new Promise(
      (resolve, reject) => {
        if(index < context.state.faqList.length && index >= 0) {
          context.commit('faqInfoUpdate', context.state.faqList[index]);
          resolve(true);
        } else if (index === -1) {
          let faqInfo = {};
          selected.default.faq.editableData.map(
            value => {
              faqInfo[value] = null
            }
          );
          faqInfo['is_deleted'] = false;

          context.commit('faqInfoUpdate', faqInfo);
          resolve(faqInfo);
        } else
          reject();
      }
    )
  },
  createFaq(context, payload){
    let body={};

    selected.default.faq.editableData.map(
      value => {
        body[value]= payload[value]
      }
    );

    return new Promise(
      (resolve, reject) => {
        api.createFaq(body).then(
          res=>{
            resolve(res);
          }
        )
      }
    )
  }
};
const mutations = {
  faqListUpdate: (state, data) => {
    state.faqList = data;
  },
  faqInfoUpdate: (state, data) => {
    state.faqInfo = data
  },
  totalPageUpdate: (state, data) => {
    state.totalPage = data
  }
};

const getters = {
  getDataList: state => state.faqList,
  getTotalPage: state => state.totalPage,
  getFaqInfo: state => JSON.parse(JSON.stringify(state.faqInfo))
};

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations,
};

