import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Authentification from './modules/auth';
import User from './modules/user';
import Store from './modules/store';
import Used from './modules/used';
import Faq from './modules/faq';
import Board from './modules/board';
import Circle from './modules/circle';
import Room from './modules/room';
Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    Authentification: Authentification,
    User: User,
    Store: Store,
    Used: Used,
    Faq: Faq,
    Board: Board,
    Circle: Circle,
    Room: Room
  }
});
