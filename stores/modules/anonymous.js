import * as api from "../../api/api";
import * as selected from "../../static/selected";

const defaultState = {
  totalPage: 0,
  articleList: [],
  articleInfo: {}
};

const actions = {
  setDataList(context, payload){
    return new Promise(
      (resolve, reject)=>{
        api.getAnonymousArticleList(payload.page, payload.limit).then(
          res=>{
            context.commit("totalPageUpdate", res.data.totalPage);
            context.commit("articleListUpdate", res.data.articles);
            resolve(true);
          }, err=>{
            reject(err);
          }
        )
      })
  },
  setDataInfo(context, index){
    return new Promise(
      (resolve, reject) => {
        api.getAnonymousArticle(context.state.articleList[index].id).then(
          res => {
            context.commit('articleInfoUpdate', res.data);
            resolve(res);
          }, err => {
            reject(err);
          }
        )
      })
  },
  createArticle(context, payload){
    let body={};
    selected.default.anonymous.editableData.map(
      value => {
        if(payload[value] !== null && payload[value] !== '')
          body[value]= payload[value]
      }
    );

    return new Promise(
      (resolve, reject) => {
        api.createAnonymousArticle(body).then(
          res=>{
            resolve(res);
          },err=>{
            reject(err);
          }
        )
      }
    )
  },
  updateArticle(context, payload) {
    let body={};
    selected.default.anonymous.editableData.map(
      value => {
        if(payload[value] === '' && value !== 'password')
        //password칸을 입력하지 않았으면 그대로 간다.
          body[value] = null;
        else if(payload[value] !== null)
          body[value] = payload[value];
      }
    );
    body.password = context.state.articleInfo.password;
    console.log(JSON.stringify(body))
    return new Promise(
      (resolve, reject) => {
        api.updateArticle(context.state.articleInfo.id, body ).then(
          res => {
            context.state.articleInfo = payload;
            resolve(res);
          }, err => {
            reject(err);
          }
        )
      })
  },
  deleteArticle(context){
    return new Promise(
      (resolve, reject) => {
        api.removeAnonymousArticle(context.state.articleInfo.id).then(
          res=>{
            context.state.articleInfo = null;
            resolve(res);
          },err=>{
            reject(err);
          }
        )
      }
    )
  },
  createComment({ state }, payload){
    let body={
      content: payload.content,
      nickname: payload.nickname,
      password: payload.password
    };
    return new Promise(
      (resolve, reject) => {
        api.createAnonymousComment(state.articleInfo.id, body).then(
          res=>{
            state.articleInfo.comments.push(res.data);
            resolve(res);
          },err=>{
            reject(err);
          }
        )
      }
    )
  },
  updateComment({ state }, payload) {
    let body = {};
    selected.default.anonymousComments.editableData.map(
      value => {
        if(payload.data[value] === '' && value !== 'password')
        //password칸을 입력하지 않았으면 그대로 간다.
          body[value] = null;
        else if(payload[value] !== null)
          body[value] = payload.data[value];
      }
    );
    console.log(body)
    return new Promise(
      (resolve, reject) => {
        api.updateAnonymousComment(state.articleInfo.id, payload.data.id, body ).then(
          res => {
            state.articleInfo.comments.splice(payload.index, 1, res.data);
            resolve(res);
          }, err => {
            reject(err);
          }
        )
      })
  },
  deleteComment({ state }, payload){
    return new Promise(
      (resolve, reject) => {
        api.removeAnonymousComment(
          state.articleInfo.id,
          state.articleInfo.comments[payload].id
        ).then(
          res=>{
            state.articleInfo.comments.splice(payload, 1);
            resolve(res);
          },err=>{
            reject(err);
          }
        )
      }
    )
  }
};

const mutations = {
  totalPageUpdate: (state, data) => {
    state.totalPage = data;
  },
  articleListUpdate: (state, data) => {
    state.articleList = data;
  },
  articleInfoUpdate: (state, data) => {
    state.articleInfo = data;
  }
};

const getters = {
  getDataList: state=> state.articleList,
  getAnonymousInfo: state => JSON.parse(JSON.stringify(state.articleInfo)),
  getTotalPage: state=>state.totalPage
};

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations,
};

