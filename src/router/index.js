import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/SpaComponents/Login/Login'
import Dashboard from '@/SpaComponents/Dashboard/Dashboard'

import UserPlatform from '@/SpaComponents/UserPlatform/UserPlatform'
import UserDetail from '@/SpaComponents/UserPlatform/UserDetail/UserDetail'
import UserRegister from '@/SpaComponents/UserPlatform/UserRegister/UserRegister'

import SchoolInfo from '@/SpaComponents/SchoolInfo/SchoolInfo'

import Faq from '@/SpaComponents/SchoolInfo/Faq/Faq'
import FaqDetail from '@/SpaComponents/SchoolInfo/FaqDetail/FaqDetail'
import FaqRegister from '@/SpaComponents/SchoolInfo/FaqRegister/FaqRegister'

import Community from '@/SpaComponents/Community/Community'

import Board from '@/SpaComponents/Community/Board/Board'
import BoardDetail from '@/SpaComponents/Community/BoardDetail/BoardDetail'
import BoardRegister from '@/SpaComponents/Community/BoardRegister/BoardRegister'

import UsedMarket from '@/SpaComponents/UsedMarket/UsedMarket'

import Store from '@/SpaComponents/SchoolInfo/Store/Store'
import StoreDetail from '@/SpaComponents/SchoolInfo/StoreDetail/StoreDetail'
import StoreRegister from '@/SpaComponents/SchoolInfo/StoreRegister/StoreRegister'

import Items from '@/SpaComponents/UsedMarket/Items/Items'
import ItemDetail from '@/SpaComponents/UsedMarket/ItemDetail/ItemDetail'
import ItemRegister from '@/SpaComponents/UsedMarket/ItemRegister/ItemRegister'

import Circle from '@/SpaComponents/Circle/Circle';
import CircleDetail from '@/SpaComponents/CircleDetail/CircleDetail';
import CircleRegister from '@/SpaComponents/CircleRegister/CircleRegister';

import RoomList from '@/SpaComponents/Room/RoomList';
import RoomAdd from '@/SpaComponents/Room/RoomAdd';
import RoomAdjust from '@/SpaComponents/Room/RoomAdjust';

Vue.use(Router);

export var router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: Login,
      name: '404'
    },
    {
      path: '',
      component: Login,
      name: 'Login'
    },
    {
      path: '/dashboard',
      component: Dashboard,
      name: 'Dashboard',
      meta: { authRequired: true }
    },
    {
      path: '/user-platform',
      component: UserPlatform,
      name: 'UserPlatform',
      meta: { authRequired: true }
    },
    {
      path: '/user-platform/detail/:id',
      component: UserDetail,
      name: 'UserDetail',
      meta: { authRequired: true }
    },
    {
      path: '/user-platform/register',
      component: UserRegister,
      name: 'UserRegister',
      meta: { authRequired: true }
    },
    {
      path: '/school-info',
      component: SchoolInfo,
      name: 'SchoolInfo',
      meta: { authRequired: true }
    },
    {
      path: '/school-info/faq',
      component: Faq,
      name: 'FAQ',
      meta: { authRequired: true }
    },
    {
      path: '/school-info/faq/register',
      component: FaqRegister,
      name: 'FaqRegister',
      meta: { authRequired: true }
    },
    {
      path: '/school-info/faq/detail/:id',
      component: FaqDetail,
      name: 'FaqDetail',
      meta: { authRequired: true }
    },
    {
      path: '/community',
      component: Community,
      name: 'Community',
      meta: { authRequired: true }
    },
    {
      path: '/used-market',
      component: UsedMarket,
      name: 'UsedMarket',
      meta: { authRequired: true }
    },
    {
      path: '/school-info/stores',
      component: Store,
      name: 'Store',
      meta: { authRequired: true }
    },
    {
      path: '/school-info/stores/detail/:id',
      component: StoreDetail,
      name: 'StoreDetail',
      meta: { authRequired: true }
    },
    {
      path: '/school-info/stores/register',
      component: StoreRegister,
      name: 'StoreRegister',
      meta: { authRequired: true }
    },
    {
      path: '/used-market/buy',
      component: Items,
      name: 'BuyItems',
      meta: { authRequired: true }
    },
    {
      path: '/used-market/sell',
      component: Items,
      name: 'SellItems',
      meta: { authRequired: true }
    },
    {
      path: '/used-market/buy/detail/:id',
      component: ItemDetail,
      name: 'ItemDetail',
      meta: { authRequired: true }
    },
    {
      path: '/used-market/sell/detail/:id',
      component: ItemDetail,
      name: 'ItemDetail',
      meta: { authRequired: true }
    },
    {
      path: '/used-market/sell/register',
      component: ItemRegister,
      name: 'SellRegister',
      meta: { authRequired: true }
    },
    {
      path: '/used-market/buy/register',
      component: ItemRegister,
      name: 'BuyRegister',
      meta: { authRequired: true }
    },
    {
      path: '/community/board/free',
      component: Board,
      name: 'FreeBoard',
      meta: { authRequired: true }
    },
    {
      path: '/community/board/job',
      component: Board,
      name: 'JobBoard',
      meta: { authRequired: true }
    },
    {
      path: '/community/board/anonymous',
      component: Board,
      name: 'AnonymousBoard',
      meta: { authRequired: true }
    },
    {
      path: '/community/board/notice',
      component: Board,
      name: 'NoticeBoard',
      meta: { authRequired: true }
    },
    {
      path: '/community/board/free/detail/:id',
      component: BoardDetail,
      name: 'FreeBoardDetail',
      meta: { authRequired: true }
    },
    {
      path: '/community/board/job/detail/:id',
      component: BoardDetail,
      name: 'JobBoardDetail',
      meta: { authRequired: true }
    },
    {
      path: '/community/board/anonymous/detail/:id',
      component: BoardDetail,
      name: 'AnonymousBoardDetail',
      meta: { authRequired: true }
    },
    {
      path: '/community/board/notice/detail/:id',
      component: BoardDetail,
      name: 'NoticeBoardDetail',
      meta: { authRequired: true }
    },
    {
      path: '/community/board/free/register',
      component: BoardRegister,
      name: 'FreeBoardRegister',
      meta: { authRequired: true }
    },
    {
      path: '/community/board/job/register',
      component: BoardRegister,
      name: 'JobBoardRegister',
      meta: { authRequired: true }
    },
    {
      path: '/community/board/anonymous/register',
      component: BoardRegister,
      name: 'AnonymousBoardRegister',
      meta: { authRequired: true }
    },
    {
      path: '/community/board/notice/register',
      component: BoardRegister,
      name: 'NoticeBoardRegister',
      meta: { authRequired: true }
    },
    {
      path: '/circles',
      component: Circle,
      name: 'Circle',
      meta: { authRequired: true }
    },
    {
      path: '/circles/detail/:id',
      component: CircleDetail,
      name: 'CircleDetail',
      meta: { authRequired: true }
    },
    {
      path: '/circles/register',
      component: CircleRegister,
      name: 'CircleRegister',
      meta: { authRequired: true }
    },
    {
      path: '/rooms',
      component: RoomList,
      name: 'RoomList',
      meta: { authRequired: true }
    },
    {
      path: '/rooms/register',
      component: RoomAdd,
      name: 'RoomAdd',
      meta: { authRequired: true }
    },
    {
      path: '/rooms/adjust/:id',
      component: RoomAdjust,
      name: 'RoomAdjust',
      meta: { authRequired: true }
    }
  ]
});
router.beforeEach(function(to, from, next) {
  if (to.matched.some(function (routeInfo) {
    return routeInfo.meta.authRequired;
  })) {
    let sessionStorage = JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey')));
    if (sessionStorage['token'] === undefined) {
      router.push('/');
    } else next();
  } else {
    next();
  }
})
