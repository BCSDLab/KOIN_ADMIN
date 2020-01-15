import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Auth from './modules/auth';
import User from './modules/user';
import Faq from './modules/faq';
import Shop from './modules/shop';
import CallVan from './modules/callvan';
import Board from './modules/board';
 import Market from './modules/used';
 import Lost from './modules/lost';
import Circle from './modules/circle';
import * as api from "../api/api";
import Land from './modules/land'
import Version from "./modules/version";
import Anonymous from "./modules/anonymous";


Vue.use(Vuex);
//store에 있는 getters와 actions는 재사용하기 위해 namespace를 받아 가져오거나 업데이트 합니다.
const getters = {
  getDataList: (state, getters) => (type) => {
    return getters[type + '/getDataList']
  },
  getTotalPage: (state, getters) => (type) => {
    return getters[type + '/getTotalPage']
  }
};

const actions = {
  async setDataList(context, payload) {
    return await context.dispatch(payload.dataType + '/setDataList', payload)
  },
  setDataInfo(context, payload) {
    return context.dispatch(payload.dataType + '/setDataInfo', payload.index)
  }
};

export const store = new Vuex.Store({
  getters,
  actions,
  modules: {
    auth: Auth,
    user: User,
    shop: Shop,
    callvan: CallVan,
    faq: Faq,
    land: Land,
    used: Market,
    board: Board,
    lost: Lost,
    circle: Circle,
    version: Version,
    anonymous: Anonymous
  }
});
