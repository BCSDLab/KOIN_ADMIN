import * as api from "../../api/api";
import * as selected from "../../static/selected";

const defaultState = {
  totalPage: 0,
  marketItemList: [],
  marketItemInfo: {},
};

const actions = {
  setDataList(context, payload) {
    return new Promise(
      (resolve, reject) => {
        api.getMarketItems(payload.serviceType, payload.page, payload.limit).then(res => {
          res.data.items.map(
            value => {
              let condition = {};
              if(value.state === 2)
                condition ={variant:'success', text:'완료'};
              else if(value.state === 1)
                condition = {variant: 'secondary', text:'중지'};
              else
                condition = {variant: 'primary', text: '진행 중'};
              return Object.assign(value, {condition: condition});
            }
          );
          console.log(res.data.items);
          context.commit("totalPageUpdate", res.data.totalPage);
          context.commit("marketItemListUpdate", res.data.items);
          resolve(true);
        }, error => {
          reject(false);
        })
      }
    )
  },
  deleteMarketItem(context) {
    return new Promise(
      (resolve, reject) => {
        api.removeMarketItem(context.state.marketItemInfo.id).then(res => {
          this.marketItemInfo = null;
          resolve(res);
        }, err => {
          console.log(err);
          resolve(err)
        })
      }
    )
  },
  setDataInfo(context, index) {
    return new Promise(
      (resolve, reject) => {
        api.getMarketItem(context.state.marketItemList[index].id).then(res => {
            context.commit('marketItemInfoUpdate', res.data);
            resolve(context.state.marketItemList[index].id);
          }, error => {
            reject(error.status);
          }
        )
      })
  },
  updateMarketItem({state}, payload) {
    let body = {};
    selected.default.used.editableData.map(
      value => {
        if(payload[value] === '')
          body[value]= null;
        else if(payload[value] !== null)
          body[value]= payload[value];
      }
    );
    console.log(body)
    return new Promise(
      (resolve, reject) => {
        api.updateMarketItem(state.marketItemInfo.id, body).then(
          res => {
            console.log(res)
            resolve(res);
          },
          err => {
            reject(err);
          })
      }
    )
  },
  createMarketItem(context, payload) {
    console.log(payload)
    let body = {};
    selected.default.used.editableData.map(
      value => {
        if (payload[value] !== null && payload[value] !== '')
          body[value] = payload[value]
      }
    );

    return new Promise(
      (resolve, reject) => {
        api.createMarketItem(payload).then(res => {
          this.marketItemInfo = null;
          resolve(res);
        }, err => {
          reject(err);
        })
      }
    )
  },
  createMarketItemComment(context, payload) {
    let body = {
      content: payload.content
    };
    return new Promise(
      (resolve, reject) => {
        api.createMarketItemComment(context.state.marketItemInfo.id, body).then(
          res => {
            context.state.marketItemInfo.comments.push(res.data);
            resolve(res);
          }, err => {
            reject(err);
          }
        )
      }
    )
  },
  updateMarketItemComment(context, payload) {
    let body = {
      content: payload.data.content,
      is_deleted: payload.data.is_deleted
    };
    return new Promise(
      (resolve, reject) => {
        api.updateMarketItemComment(context.state.marketItemInfo.id, payload.data.id, body).then(
          res => {
            context.state.marketItemInfo.comments.splice(payload.index, 1, res.data);
            resolve(res);
          }, err => {
            reject(err);
          }
        )
      }
    )
  },
  deleteMarketItemComment(context, payload) {
    return new Promise(
      (resolve, reject) => {
        api.removeMarketItemComment(
          context.state.marketItemInfo.id,
          context.state.marketItemInfo.comments[payload],id
        ).then(
          res => {
            context.state.marketItemInfo.comments.splice(payload, 1);
            resolve(res);
          }, err => {
            reject(err);
          }
        )
      }
    )
  },
  uploadThumbnailImage({ state }, payload) {
    return new Promise(
      (resolve, reject) => {
        api.uploadMarketImage(payload).then(
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
  marketItemListUpdate: (state, data) => {
    state.marketItemList = data;
  },
  marketItemInfoUpdate: (state, data) => {
    state.marketItemInfo = data;
  },
  totalPageUpdate: (state, data) => {
    state.totalPage = data
  }
};

const getters = {
  getDataList: state => state.marketItemList,
  getTotalPage: state => state.totalPage,
  getMarketItemInfo: state => JSON.parse(JSON.stringify(state.marketItemInfo))
};

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations,
};

