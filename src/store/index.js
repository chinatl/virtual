import Vue from 'vue'
import Vuex from 'vuex'
import kline from './kline'
import user from './user'

Vue.use(Vuex)
import Post from '@/api/post'
const store = new Vuex.Store({
	state: {
		user: {
			lt: {

			}
		},
		imgloading: false,
		bigimg: '',
		isLogin: null,
		userAccount: [],
		name: '0',
		index: 0,
		arr: [],
		data: [{
			title: '这是标题1',
			name: '0',
			list: [{
					card: [{
							msg: '这是一段内容描述1'
								},
						{
							msg: '这是一段内容描述2'
								},
						{
							msg: '这是一段内容描述3'
								},
						{
							msg: '这是一段内容描述4'
								},
							]
						},
				{
					card: [{
							msg: '这是一段内容描述5'
								},
						{
							msg: '这是一段内容描述6'
								},
						{
							msg: '这是一段内容描述7'
								},
						{
							msg: '这是一段内容描述8'
								},
							]
						},
				{
					card: [{
							msg: '这是一段内容描述9'
								},
						{
							msg: '这是一段内容描述10'
								},
						{
							msg: '这是一段内容描述11'
								},
						{
							msg: '这是一段内容描述12'
								},
							]
						},
					]
				}, {
			title: '这是标题2',
			name: '1',
			list: [{
					card: [{
							msg: '这是一段内容描述1'
								},
						{
							msg: '这是一段内容描述2'
								},
						{
							msg: '这是一段内容描述3'
								},
						{
							msg: '这是一段内容描述4'
								},
							]
						},
				{
					card: [{
							msg: '这是一段内容描述5'
								},
						{
							msg: '这是一段内容描述6'
								},
						{
							msg: '这是一段内容描述7'
								},
						{
							msg: '这是一段内容描述8'
								},
							]
						},
				{
					card: [{
							msg: '这是一段内容描述9'
								},
						{
							msg: '这是一段内容描述10'
								},
						{
							msg: '这是一段内容描述11'
								},
						{
							msg: '这是一段内容描述12'
								},
							]
						},
					]
				}, {
			title: '这是标题3',
			name: '2',
			list: [{
					card: [{
							msg: '这是一段内容描述1'
								},
						{
							msg: '这是一段内容描述2'
								},
						{
							msg: '这是一段内容描述3'
								},
						{
							msg: '这是一段内容描述4'
								},
							]
						},
				{
					card: [{
							msg: '这是一段内容描述5'
								},
						{
							msg: '这是一段内容描述6'
								},
						{
							msg: '这是一段内容描述7'
								},
						{
							msg: '这是一段内容描述8'
								},
							]
						},
				{
					card: [{
							msg: '这是一段内容描述9'
								},
						{
							msg: '这是一段内容描述10'
								},
						{
							msg: '这是一段内容描述11'
								},
						{
							msg: '这是一段内容描述12'
								},
							]
						},
					]
				}]
	},
	mutations: {
		open_img: (state, src) => {
			state.bigimg = src;
			state.imgloading = true;
		},
		SET_TYPEN: (state, data) => {
			state.isLogin = true;
			state.user.mainUsersId = data.mainUsersId + '';
			state.user = data;
			if (data.mainUsersId + '' === 'null') {
				Post({
					url: 'log/getKidUsers',
					success: res => {
						if (res.code === 0) {
							state.userAccount = res.data;
						}
					}
				})
			} else {
				state.userAccount = [];
			}
		}
	}
})

export default store
