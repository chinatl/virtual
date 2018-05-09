import Post from '@/api/post'
const user = {
	state: {
		id: '',
		type: '',
		isLogin: false,
		mainUsersId: null,
		userAccount: [],
		nickName: null
	},

	mutations: {
		SET_TYPEN: (state, data) => {
			state.type = data.isMerchant;
			state.nickName = data.nickName;
			state.mainUsersId = data.mainUsersId + '';
			state.isLogin = true;
			sessionStorage.setItem('type', data.isMerchant)
			sessionStorage.setItem('isLogin', 'true');
			sessionStorage.setItem('mainUsersId', data.mainUsersId + '');
			if (state.mainUsersId + '' === 'null') {
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
		},
		POST_ACCOUNT: state => {
			Post({
				url: 'log/getKidUsers',
				success: res => {
					if (res.code === 0) {
						console.log(1)
						state.userAccount = res.data;
					}
				}
			})
		},
		SET_ACCOUNT: (state, data) => {

		},
	}
}

export default user
