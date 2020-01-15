import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Dashboard from '@/components/Pages/Dashboard/Dashboard'
import Login from '@/components/Pages/Login/Login'
import User from '@/components/Pages/User/User'
import Shop from '@/components/Pages/Shop/Shop'
import FAQ from '@/components/Pages/FAQ/Faq'
import Lost from '@/components/Pages/Lost/Lost'
import Board from "../components/Pages/Board/Board";
import CallVan from "../components/Pages/CallVan/CallVan";
import Circle from "../components/Pages/Circle/Circle";
import Used from "@/components/Pages/Used/Used"
import Land from "@/components/Pages/Land/Land"
import Version from "../components/Pages/Version/Version";
Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      meta: { authRequired: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      meta: { authRequired: true }
    },
    {
      path: '/board/:type',
      name: 'Board',
      component: Board,
      meta: { authRequired: true }
    },
    {
      path: '/shop',
      name: 'Shop',
      component: Shop,
      meta: { authRequired: true }
    },
    {
      path: '/market',
      name: 'Market',
      component: Used,
      meta: { authRequired: true }
    },
    {
      path: '/faq',
      name: 'FAQ',
      component: FAQ,
      meta: { authRequired: true }
    },
    {
      path: '/circle',
      name: 'Circle',
      component: Circle,
      meta: { authRequired: true }
    },
    {
      path: '/land',
      name: 'Land',
      component: Land,
      meta: { authRequired: true }
    },
    {
      path: '/lost',
      name: 'LostAndFound',
      component: Lost,
      meta: { authRequired: true }
    },
    {
      path: '/callvan',
      name: 'CallVan',
      component: CallVan,
      meta: { authRequired: true }
    },
    {
      path: '/version',
      name: 'Version',
      component: Version,
      meta: { authRequired: true }
    },
    {
      path: '/survey',
      name: 'Survey',
      meta: { authRequired: true }
    },
    {
      path: '/bcsdlab',
      name: 'BCSDLab',
      meta: { authRequired: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const sessionStorage = JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem('sessionKey')));
  if (to.matched.some((routeInfo) => {
    return routeInfo.meta.authRequired;
  })) {
    // authRequired: true, 인증이 필요한 페이지 접근
    if (sessionStorage === null) {
      router.push('/login');
    } else if (sessionStorage.token === undefined || sessionStorage.token === null) {
      router.push('/login');
    } else {
      next();
    }
  } else {
    // authRequired: false, 인증이 필요없는 페이지 접근
    if (sessionStorage === null) {
      next();
    } else if (sessionStorage.token !== undefined || sessionStorage.token !== null) {
      alert("로그인 된 상태입니다.");
      router.go(-1);
    } else {
      next();
    }
  }
})
