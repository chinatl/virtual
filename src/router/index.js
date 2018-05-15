import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld';
import Home from '@/view/Home';
import Login from '@/view/Login';
import Register from '@/view/Register'; //注册

import Subscription from '@/view/Subscription'; //认购
import Ranking from '@/view/Ranking'; //认购
import Test from '@/view/Test'; //认购
import Test1 from '@/view/Test/index1'; //认购

import Account from '@/view/Account';
import capital from '@/view/Account/capital';
import candy from '@/view/Account/candy';
import bill from '@/view/Account/bill';
import currency from '@/view/Account/currency';
import log from '@/view/Account/log';
import rechange from '@/view/Account/rechange';
import sublog from '@/view/Account/sublog';
/*法币交易*/
import Tender from '@/view/Tender';
import sell from '@/view/Tender/sell';
import buy from '@/view/Tender/buy';
import order from '@/view/Tender/order';
import data from '@/view/Tender/data';
import apply from '@/view/Tender/apply';
//import resolve from '@/view/Tender/resolve';

/*账户中心*/
import User from '@/view/User';
import User_number from '@/view/User/number';
import User_referee from '@/view/User/referee';
import User_api from '@/view/User/api';

/*公告*/
import Blog from '@/view/Blog'
import BlogDesc from '@/view/Blog/desc'

Vue.use(Router)

export default new Router({
    //	mode:'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
    }, {
            path: '/account',
            name: 'account',
            redirect: '/account/capital',
            component: Account,
            meta: {
                requireAuth: true
            },
            children: [
                {
                    path: '/account/capital',
                    name: 'capital',
                    component: capital,
                    meta: {
                        requireAuth: true
                    },
			}, {
                    path: '/account/candy',
                    name: 'candy',
                    component: candy,
                    meta: {
                        requireAuth: true
                    },
			}, {
                    path: '/account/bill',
                    name: 'bill',
                    component: bill,
                    meta: {
                        requireAuth: true
                    },
			}, {
                    path: '/account/currency',
                    name: 'currency',
                    component: currency,
                    meta: {
                        requireAuth: true
                    },
			}, {
                    path: '/account/log',
                    name: 'log',
                    component: log,
                    meta: {
                        requireAuth: true
                    },
			}, {
                    path: '/account/rechange',
                    name: 'rechange',
                    component: rechange,
                    meta: {
                        requireAuth: true
                    }
			},
				{
                    path: '/account/sublog',
                    name: 'sublog',
                    component: sublog,
                    meta: {
                        requireAuth: true
                    }
				}
				,
		
		]
    }, {
            path: '/tender',
            name: 'Tender',
            component: Tender,
            meta: {
                requireAuth: true
            },
            children: [
                {
                    path: '/tender/sell',
                    name: 'sell',
                    component: sell,
                    meta: {
                        requireAuth: true
                    },
				}, {
                    path: '/tender/buy',
                    name: 'buy',
                    component: buy,
                    meta: {
                        requireAuth: true
                    },
				}, {
                    path: '/tender/order',
                    name: 'Order',
                    component: order,
                    meta: {
                        requireAuth: true
                    },
				}, {
                    path: '/tender/data',
                    name: 'data',
                    component: data,
                    meta: {
                        requireAuth: true
                    },
				}, {
                    path: '/tender/apply',
                    name: 'apply',
                    component: apply,
                    meta: {
                        requireAuth: true
                    },
				}
//					,{
//					path: '/tender/resolve',
//					name: 'resolve',
//					component: resolve,
//				}

		]
    }, {
            path: '/user',
            name: 'user',
            component: User,
            meta: {
                requireAuth: true
            },
            children: [
                {
                    path: '/user/api',
                    name: 'User_api',
                    component: User_api,
                    meta: {
                        requireAuth: true
                    },
				}, {
                    path: '/user/number',
                    name: 'User_number',
                    component: User_number,
                    meta: {
                        requireAuth: true
                    },
				}, {
                    path: '/user/referee',
                    name: 'User_referee',
                    component: User_referee,
                    meta: {
                        requireAuth: true
                    },
				},
		]
    }, {
            path: '/subscription',
            name: 'Subscription',
            component: Subscription,
            meta: {
                requireAuth: true
            },
    }, {
            path: '/ranking',
            name: 'Ranking',
            component: Ranking
    }, {
            path: '/login',
            name: 'Login',
            component: Login
    }, {
            path: '/register',
            name: 'Register',
            component: Register
    }, {
            path: '/blog',
            name: 'blog',
            component: Blog
    }, {
            path: '/blogdesc',
            name: 'BlogDesc',
            component: BlogDesc
    }, {
            path: '/test',
            name: 'test',
            component: Test
    }, {
            path: '/test1',
            name: 'test',
            component: Test1
    }
  ]
})
