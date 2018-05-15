// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/common.css';
import Post from '@/api/post'
/*国际化*/
import i18n from './i18n/i18n';
Vue.use(ElementUI);
/*走势图*/
import Trend from 'vuetrend';
Vue.use(Trend);
/*粘贴板*/
import VueClipboards from 'vue-clipboards';
Vue.use(VueClipboards);

import store from './store'
import * as filters from './filters' // 全局filter
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})
Vue.config.productionTip = false

for (var i = 0; i < store.state.data.length; i++) {
	store.state.arr[i] = 0;
}

/*初适化登录*/
router.afterEach((to, from) => {
	if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
		Post({
			url: 'log/getSessionUser',
			success: res => {
				if (res.code === 0) {
					store.state.isLogin = true;
					store.state.user.mainUsersId = res.data.mainUsersId + '';
					store.state.user = res.data;
					if (res.data.mainUsersId + '' === 'null') {
						Post({
							url: 'log/getKidUsers',
							success: res => {
								if (res.code === 0) {
									store.state.userAccount = res.data;
									//									next();
								}
							}
						})
					} else {
						store.state.userAccount = [];
						//						next();
					}
				} else {
					store.state.isLogin = false;
					//					store.state.userAccount = [];
					router.push({
						path: '/login',
						query: {
							redirect: to.fullPath
						} // 将跳转的路由path作为参数，登录成功后跳转到该路由
					})

				}
			}
		})
	} else {
		Post({
			url: 'log/getSessionUser',
			success: res => {
				if (res.code === 0) {
					store.state.isLogin = true;
					store.state.user.mainUsersId = res.data.mainUsersId + '';
					store.state.user = res.data;
					if (res.data.mainUsersId + '' === 'null') {
						Post({
							url: 'log/getKidUsers',
							success: res => {
								if (res.code === 0) {
									store.state.userAccount = res.data;
									//									next();
								}
							}
						})
					} else {
						store.state.userAccount = [];
						//						next();
					}
				} else {
					store.state.isLogin = false;
					//					next();
				}
			},
			fail: res => {
				//				next();
			}
		})
	}
})
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	i18n,
	components: {
		App
	},
	template: '<App/>'
})
