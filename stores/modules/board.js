import * as api from "../../api/api";
import * as selected from "../../static/selected";

const defaultState = {
  totalPage: 0,
  boardList: [],
  parentBoardOptions: null,
  boardInfo: {},
  articleList: [],
  articleInfo: {}
};

const actions = {
  setBoardList(context) {
    return new Promise(
      (resolve, reject)=>{
        //limit가 50보다 커지는 경우 바꿔야 함
        api.getBoardList(1, 50).then(
          res =>{
            res.data.boards.map(
              (value, index, array) => {
                if(value['parent_id'] !== null) {
                  let targetIndex = array.findIndex(
                    value1 => value1.id === value['parent_id']
                  );
                  if(array[targetIndex].children === null)
                    array[targetIndex].children = [value];
                  else
                    array[targetIndex].children.push(value)
                }
              }
            );
            context.commit("boardListUpdate", res.data.boards);
            resolve(res.data.boards);
          }, err=>{
            reject(err);
          }
        )
      })
  },
  setParentBoardOptions(context, id) {
    return new Promise(
      async (resolve, reject) => {
        if(!context.state.boardList.length)
          await context.dispatch("setBoardList");
        let index = context.state.boardList.findIndex(
          value => value.id === id
        );
        if(index === -1)
          reject(false);
        context.commit('parentBoardOptionsUpdate', index);

        resolve(true);
      }
    )
  },
  setBoardInfo(context, id){
    return new Promise(
      resolve => {
        let index = context.state.boardList.findIndex(
          value => value.id === id
        );
        //get /boards/{id}와 /baords의 요소가 달라질 경우 바꿔야 한다.
        context.commit('boardInfoUpdate', index);
        resolve(true);
      })
  },
  createBoard(context, payload){
    let body={};
    selected.default.boards.editableData.map(
      value => {
        if(payload[value] !== null && payload[value] !== '')
          body[value]= payload[value];
      }
    );
    return new Promise(
      (resolve, reject) => {
        api.createBoard(body).then(
          res=>{
            resolve(res);
          },err=>{
            reject(err);
          }
        )
      }
    )
  },
  updateBoard(context, payload){
    let body={ };
    selected.default.boards.editableData.map(
      value => {
        if(payload[value] === '')
          body[value]= null;
        else if(payload[value] !== null)
          body[value]= payload[value];
      }
    );
    return new Promise(
      (resolve, reject) => {
        api.updateBoard(context.state.boardInfo['id'], body ).then(
          res => {
            resolve(res);
          }, err => {
              reject(err);
          }
        )
      })
  },
  deleteBoard(context){
    return new Promise(
      (resolve, reject) => {
        api.removeBoard(context.state.boardInfo.id).then(
          res=>{
            context.state.boardInfo = {};
            resolve(res);
          },err=>{
            reject(err);
          }
        )
      }
    )
  },
  //articleList를 가져오기 위한 함수
  setDataList(context, payload){
    return new Promise(
      (resolve, reject)=>{
        api.getArticleList(payload.serviceType, payload.page, payload.limit).then(
          res=>{
            console.log(res.data.board.id)
            context.commit("totalPageUpdate", res.data.totalPage);
            context.commit("articleListUpdate", res.data.articles);
            //해당 값과 admin/boards/{id}의 값이 달라질 경우 따로 setBoardInfo를 만들어야 함
            context.dispatch("setBoardInfo", res.data.board.id);
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
        api.getArticle(context.state.articleList[index].id).then(
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
    selected.default.board.editableData.map(
      value => {
        if(payload[value] !== null && payload[value] !== '')
          body[value]= payload[value];
      }
    );

    return new Promise(
      (resolve, reject) => {
        api.createArticle(body).then(
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
    selected.default.board.editableData.map(
      value => {
        if(payload[value] === '')
          body[value]= null;
        else if(payload[value] !== null)
          body[value]= payload[value];
      }
    );

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
        api.removeArticle(context.state.articleInfo.id).then(
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
      is_deleted: payload['is_deleted']
    };
    return new Promise(
      (resolve, reject) => {
        api.createComment(state.articleInfo.id, body).then(
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
    let body={
      content: payload.data.content,
      is_deleted: payload.data['is_deleted']
    };

    return new Promise(
      (resolve, reject) => {
        api.updateComment(state.articleInfo.id, payload.data.id, body ).then(
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
        api.removeComment(
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
  boardListUpdate:(state, data)=>{
    state.boardList = data;
  },
  parentBoardOptionsUpdate: (state, index) => {
    if(state.boardList[index].children === null)
      state.parentBoardOptions = state.boardList[index].id;
    else {
      let list = [{
        text: state.boardList[index].name,
        value: state.boardList[index].id
      }];
      state.boardList[index].children.map(
        value => {
          list.push({
            text: value.name,
            value: value.id
          })
        }
      );
      state.parentBoardOptions = list;
    }
  },
  boardInfoUpdate: (state, index) => {
    state.boardInfo = state.boardList[index];
  },
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
  //side-nav를 위한 getter
  getDisplayBoardList: state => {
    let displayBoardList = [];
    for(let i = 0; i < state.boardList.length; i++)
      if(state.boardList[i]['parent_id'] === null)
        displayBoardList.push({
          name: state.boardList[i].tag,
          title: state.boardList[i].name,
          link: '/' + state.boardList[i].id,
          seq: state.boardList[i].seq
        });
    //현재 익명게시판 push
    displayBoardList.push({
      name: 'Anonymous',
      title: '익명게시판(현재)',
      link: '/anonymous',
      seq: 99,
      disabled: true
    });
    displayBoardList.sort((lhs, rhs) => lhs.seq - rhs.seq);
    return displayBoardList;
  },
  getBoardListOption: state => {
    let boardListOption = [];
    for(let i = 0; i < state.boardList.length; i++)
      boardListOption.push({
        text: state.boardList[i].name,
        value: state.boardList[i].id
      });

    return boardListOption
  },
  getParentBoardOptions: state => state.parentBoardOptions,
  getBoardInfo: state => JSON.parse(JSON.stringify(state.boardInfo)),
  getDataList: state=> state.articleList,
  getArticleInfo: state => JSON.parse(JSON.stringify(state.articleInfo)),
  getTotalPage: state=>state.totalPage
};

export default {
  namespaced: true,
  state: defaultState,
  getters,
  actions,
  mutations,
};

