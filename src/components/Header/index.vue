<template>
<header id="user-nav" class="header">
	<div class="e-notice" v-show='current'>
		<router-link  to="/blog" class="text" style='font-size:14px'>
			{{!data.length ? '暂无内容！' : data[0].notice}}
		</router-link>
		<i class="el-icon-close" @click='current = false'></i>
	</div>
	<div :class=" $route.path === '/' ? 'flags h-content' : 'h-content' ">
		<div class="h-box">
			<div class="subscription">
				<router-link to='/' style='font-size:14px'>
<!--					{{$t('menu["主页"]')}}-->
					<img :src="require('@/assets/xlogo.png')" alt="" style='height:50px;'>
				</router-link>
			</div>
			<div class="subscription" style="margin-left: 20px;">
				<a href="./trade"  style='font-size:14px'>{{$t('menu["专业交易"]')}}</a>
			</div>
			<div class="subscription" style="margin-left: 20px;" v-show='$store.state.isLogin'>
				<p role="button"><router-link to='/tender/buy' style='font-size:14px'>{{$t('account["法币交易"]')}}</router-link></p>
			</div>
			<div class="site-menu cart">
				<p role="button">{{$t('menu["网站导航"]')}}</p>
				<div class="site-menu-dropdown">
					<ul>
						<li><a href="javascript:;">{{$t('menu["上币申请"]')}}</a></li>
						<li><a href="javascript:;">{{$t('menu["帮助"]')}}</a></li>
						<li><router-link to="/blog">{{$t('menu["公告"]')}}</router-link></li>
						<li><a href="javascript:;">{{$t('menu["费率"]')}}</a></li>
						<li><a href="javascript:;">{{$t('menu["api"]')}}</a></li>
						<li><a href="javascript:;">{{$t('menu["app"]')}}</a></li>
						<li><a href="javascript:;">{{$t('menu["关于"]')}}</a></li>
					</ul>
				</div>
			</div>
		</div>
		<div class="h-box">
			<div class='subscription' v-show='$store.state.isLogin'>
				<router-link to='/subscription' style='font-size:14px'>{{$t('menu["认购"]')}}</router-link>
			</div>
			<div class="subscription" v-show='$store.state.isLogin'>
				<router-link to='/account' style='font-size:14px'>{{$t('menu["财务中心"]')}}</router-link>
				<!--<div class="finance-menu-dropdown">
					<div class="asset-drop" style="min-width: 400px;">
						<div class="asset-drop-head" style="padding-bottom: 0px;">
							<div class="onffflist"><a role="button" class=""><span>隐藏小额资产币种</span><i></i></a></div>
							<div class="info">
								<div class="num-info">
									账户资产价值
									<div class="drop">
										<p>CNY</p>
										<ul class="drop-box">
											<li>USD</li>
											<li class="active">CNY</li>
										</ul>
									</div>
								</div>
								<p class="num">0.000</p>
							</div>
						</div>
						<div style="margin: 10px; display: flex; justify-content: flex-end;">
							<div class="search-box"><input placeholder="搜索" type="text"> <i class="trading-icon trading-icon-search"></i></div>
						</div>
						<div class="asset-scrollbar" style="max-height: 288px; overflow: hidden; position: relative; touch-action: none;">
							<div class="asset-drop-table" style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
								<div class="tr head">
									<div class="td">币种</div>
									<div class="td">可用</div>
									<div class="td">冻结</div>
									<div class="td">操作</div>
								</div>
								<div class="tr">
									<div class="td">QTUM</div>
									<div class="td"><span aria-label="折合:0.0000 CNY" class="hint--top">0</span></div>
									<div class="td"><span aria-label="折合:0.0000 CNY" class="hint--top">0</span></div>
									<div class="td"><a role="button" href="/u/payin/qtum" target="_self">充值</a> <a role="button" href="/u/payout/qtum" target="_self">提币</a></div>
								</div>
							</div>
							<div class="iScrollVerticalScrollbar iScrollLoneScrollbar" style="overflow: hidden; pointer-events: none;">
								<div class="iScrollIndicator" style="transition-duration: 0ms; display: none; height: 8px; transform: translate(0px, -8px) translateZ(0px); transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1);"></div>
							</div>
						</div>
					</div>
				</div>-->
			</div>
			
			<div class="site-menu cart"  v-show='$store.state.isLogin'>
				<p role="button"><router-link to='/user/number' style='font-size:14px'>{{$store.state.user.nickName}}</router-link></p>
				<div class="site-menu-dropdown">
					<ul>
						<li v-for='item in $store.state.userAccount' @click='changLogin(item.id)'><a href='javascript:void(null)'>{{item.nickName}}</a></li>
						<li><a href='javascript:void(null)' @click='logout' style='font-size:14px'>{{$t('menu["退出登录"]')}}</a></li>
					</ul>
				</div>
			</div>
			<div class="user-menu" v-show='!$store.state.isLogin'>
			<router-link to="/login" class="flex flex-tb-center menu-head" style='font-size:14px'>{{$t('menu["登录"]')}}</router-link>
			<router-link to="/register" class="flex flex-tb-center menu-head" style='font-size:14px'>{{$t('menu["注册"]')}}</router-link></div>
			<div class="language">
				<p role="button" style='font-size:14px'>{{label}}</p>
				<ul>
					<li role="button" @click='choose("cn")'>{{$t('menu["简体中文"]')}}</li>
					<li role="button" @click='choose("en")'>{{$t('menu["英语"]')}}</li>
					<li role="button" @click='choose("jp")'>{{$t('menu["日语"]')}}</li>
					<li role="button" @click='choose("ko")'>{{$t('menu["韩语"]')}}</li>
					<li role="button" @click='choose("zh_TW")'>{{$t('menu["繁体中文"]')}}</li>
				</ul>
			</div>
			<div class="webchat-r">
				<div role="button">
					<p><i class="trading-icon trading-icon-kefu"></i><span class="newnum"></span></p>
				</div>
			</div>
		</div>
	</div>
</header>
</template>
<script>
	import Post from '@/api/post'
	import Get from '@/api/get'
	export default {
		data() {
			return {
				fullscreenLoading: false,
				current: true,
				label: '',
				language: [{
					value: 'cn',
					label: this.$t('menu["简体中文"]')
				}, {
					value: 'en',
					label: this.$t('menu["英语"]')
				}, {
					value: 'jp',
					label: this.$t('menu["日语"]')
				}, {
					value: 'ko',
					label: this.$t('menu["韩语"]')
				}, {
					value: 'zh_TW',
					label: this.$t('menu["繁体中文"]')
				}],
				data:[]
			}
		},
		created() {
			Get({
				url: 'notice/findAll',
				success: res => {
					if (res.code === 0) {
						this.data = res.data;
					} 
				},
				fail: res => {
					this.loading = false;
				}
			})
			this.label = this.language.filter(res => {
				if (res.value == this.$i18n.locale) {
					return true
				}
			})[0].label;
		},
		methods: {
			changLogin(id) {
				const loading = this.$loading({
					lock: true,
					text: 'Loading',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				Post({
					url: 'log/changLogin',
					data: {
						id: id
					},
					success: res => {
						loading.close()
						if (res.code == 0) {
							this.init();
						}
					}
				})
			},

			init() {
				this.fullscreenLoading = true;
				Post({
					url: 'log/getSessionUser',
					success: res => {
						if (res.code === 0) {
							this.$store.commit('SET_TYPEN', res.data);
							this.fullscreenLoading = false;
						}
					}
				});
			},
			choose(value, txt) {
				this.$i18n.locale = value;
				localStorage.setItem('lang', value);
				if (value === 'cn') {
					this.label = this.$t('menu["简体中文"]');
				} else if (value === 'en') {
					this.label = this.$t('menu["英语"]');
				} else if (value === 'jp') {
					this.label = this.$t('menu["日语"]');
				} else if (value === 'ko') {
					this.label = this.$t('menu["韩语"]');
				} else {
					this.label = this.$t('menu["繁体中文"]');
				}
			},
			logout() {
				Get({
					url: 'log/logout',
					success: res => {
						this.$store.state.isLogin = null;
						this.$store.state.user = {};
						sessionStorage.setItem('isLogin', 'null');
						this.$message({
							message: '登出成功',
							type: 'success'
						});
						this.$router.push({
							'path': '/'
						})
					}
				})

			}
		}
	}

</script>
<style>
	.e-notice {
		background-color: #ff9d11;
		color: #fff;
		text-align: center;
		padding: 6px;
		position: relative
	}
	
	.e-notice .el-icon-close {
		position: absolute;
		right: 4px;
		top: 4px;
		font-size: 14px;
	}
	
	.header {
		-webkit-box-flex: 0;
		-ms-flex: none;
		flex: none;
		position: relative;
		z-index: 500;
		-webkit-transition: all .3s ease;
		transition: all .3s ease;
	}
	
	.header .h-content {
		position: relative;
		background-color: rgb(31, 33, 38);
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
	}
	
	.header .flags {
		background-color: rgba(31, 33, 38, .5);
	}
	
	.home .header .h-content {
		background: transparent;
	}
	/*.home .header.sticky,.home .header:hover {*/
	/*background: #232731;*/
	/*}*/
	
	.header .h-box {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}
	
	.header .logo {
		padding-left: 15px;
	}
	
	.header .logo a {
		display: block;
	}
	
	.header .logo a img {
		width: 90px;
	}
	/*.trading-menu{
    margin-left: 20px;
}*/
	
	.trading-menu>p {
		color: rgba(255, 255, 255, .8);
		font-size: 14px;
		height: 50px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		position: relative;
		padding: 0 30px 0 20px;
	}
	
	.trading-menu>p:after {
		content: "";
		position: absolute;
		right: 20px;
		top: 24px;
		height: 0;
		width: 0;
		border: 3px solid transparent;
		border-top-color: currentColor;
	}
	
	.trading-menu>p em {
		margin: 0 3px;
		-webkit-transform: scale(.8);
		transform: scale(.8);
	}
	
	.trading-menu>p .img-icon {
		width: 16px;
		margin-right: 5px;
	}
	
	.site-menu:hover>p,
	.site-menu>p.active,
	.trading-menu:hover>p,
	.trading-menu>p.active {
		color: #ff9d11;
	}
	
	.trading-menu .trading-menu-dropdown {
		display: none;
		position: absolute;
		top: 50px;
		left: 0;
		right: 0;
		background: #fff;
		-webkit-box-shadow: 0 0 10px rgba(0, 0, 0, .2);
		box-shadow: 0 0 10px rgba(0, 0, 0, .2);
	}
	
	.trading-menu:hover .trading-menu-dropdown {
		display: block;
	}
	/*----------------------------------*/
	
	.account {
		position: absolute;
	}
	
	.trading-menu:hover .account {
		display: block;
	}
	
	.group-list {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
	}
	
	.group-tab {
		-webkit-box-flex: 0;
		-ms-flex: none;
		flex: none;
		width: 160px;
		border-right: 1px solid #eeeff1;
		padding: 20px 0;
	}
	
	.group-tab li {
		padding: 0 30px;
		height: 50px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: end;
		-ms-flex-pack: end;
		justify-content: flex-end;
		color: #333;
		font-size: 14px;
		position: relative;
	}
	
	.group-tab li.active {
		color: #ff9d11;
	}
	
	.group-tab li.active:after {
		content: "";
		position: absolute;
		right: -2px;
		top: 8px;
		bottom: 8px;
		width: 3px;
		background: #ff9d11;
		;
	}
	
	.group-box {
		-webkit-box-flex: 1;
		-ms-flex: 1;
		flex: 1;
		padding: 40px 30px;
	}
	
	.group-box ul {
		display: none;
		-ms-flex-wrap: wrap;
		flex-wrap: wrap;
	}
	
	.group-box ul.block {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
	}
	
	.group-box li {
		-webkit-box-flex: 0;
		-ms-flex: none;
		flex: none;
		border: 1px solid #f2f3f5;
		margin: -1px 0 0 -1px;
	}
	
	.group-box li a {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		color: #888;
		padding-left: 10px;
		height: 42px;
		font-size: 14px;
		width: 155px;
		position: relative;
		white-space: nowrap;
	}
	
	.group-box li a b {
		color: #333;
	}
	
	.group-box li a em {
		margin: 0 3px;
		-webkit-transform: scale(.8);
		transform: scale(.8);
	}
	
	.group-box li a span.coinimg {
		width: 16px;
		margin-right: 5px;
		-webkit-box-flex: 0;
		-ms-flex: none;
		flex: none;
	}
	
	.group-box li a:hover b {
		color: #ff9d11;
	}
	
	.group-box li a span.text-icon {
		position: absolute;
		right: 10px;
		top: 50%;
		-webkit-transform: translateY(-50%);
		transform: translateY(-50%);
	}
	
	.group-box li a span.text-icon i {
		display: inline-block;
		font-size: 12px;
		border: 1px solid #e1e3e6;
		background: #fff;
		padding: 2px;
		color: #ff9c11;
		border-radius: 2px;
		-webkit-transform: scale(0.8);
		transform: scale(0.8);
	}
	
	.group-box li a span.text-icon i+i {
		margin-left: 3px;
	}
	
	.site-menu {
		position: relative;
	}
	
	.site-menu>p {
		color: rgba(255, 255, 255, .8);
		font-size: 14px;
		height: 50px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		position: relative;
		padding: 0 30px 0 20px;
	}
	
	.site-menu.cart>p:after {
		content: "";
		position: absolute;
		right: 20px;
		top: 24px;
		height: 0;
		width: 0;
		border: 3px solid transparent;
		border-top-color: currentColor;
	}
	
	.site-menu:hover>p {
		color: #ff9d11;
	}
	
	.site-menu .site-menu-dropdown {
		position: absolute;
		left: 50%;
		min-width: 100%;
		-webkit-transform: translateX(-50%);
		transform: translateX(-50%);
		display: none;
		background: #fff;
		-webkit-box-shadow: 0 0 10px rgba(0, 0, 0, .2);
		box-shadow: 0 0 10px rgba(0, 0, 0, .2);
	}
	
	.site-menu:hover .site-menu-dropdown {
		display: block;
	}
	
	.site-menu .site-menu-dropdown ul {
		padding: 5px 0;
	}
	
	.site-menu .site-menu-dropdown ul li a {
		display: block;
		padding: 14px 0;
		text-align: center;
		white-space: nowrap;
		color: #888;
	}
	
	.site-menu .site-menu-dropdown ul li a:hover {
		color: #ff9d11;
	}
	
	.user-menu {
		height: 50px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		margin-right: 10px;
	}
	
	.user-menu a {
		color: rgba(255, 255, 255, .8);
		padding: 0 10px;
	}
	
	.user-menu a:hover {
		color: #ff9d11;
	}
	
	.header .language {
		position: relative;
	}
	
	.header .language p {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		color: rgba(255, 255, 255, .8);
		padding: 0 20px;
	}
	
	.header .language p:before,
	.header .language p:after {
		content: "";
		position: absolute;
		left: 0;
		top: 50%;
		-webkit-transform: translateY(-50%);
		transform: translateY(-50%);
		height: 10px;
		width: 1px;
		background: rgba(255, 255, 255, .3);
		;
	}
	
	.header .language p:after {
		left: auto;
		right: 0;
	}
	
	.header .language:hover p {
		color: #ff9d11;
	}
	
	.header .language img {
		width: 20px;
		min-width: 20px;
		margin-right: 3px;
	}
	
	.header .language ul {
		position: absolute;
		left: 50%;
		padding: 5px 0;
		display: none;
		-webkit-transform: translateX(-50%);
		transform: translateX(-50%);
		background: #fff;
		-webkit-transition: all .3s ease;
		transition: all .3s ease;
		-webkit-box-shadow: 0 0 10px rgba(0, 0, 0, .2);
		box-shadow: 0 0 10px rgba(0, 0, 0, .2);
	}
	
	.header .language:hover ul {
		display: block;
	}
	
	.header .language ul li {
		width: 80px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		padding: 10px;
		color: #333;
		justify-content: center
	}
	
	.header .language ul li img {
		margin-right: 5px;
	}
	
	.header .language ul li:hover {
		color: #ff9d11;
	}
	
	.webchat-r [role="button"] {
		color: rgba(255, 255, 255, .8);
		height: 50px;
		padding: 0 20px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}
	
	.finance-menu>a,
	.subscription a {
		color: rgba(255, 255, 255, .8);
		height: 50px;
		padding: 0 30px 0 20px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		position: relative;
	}
	
	.finance-menu>a:after {
		content: "";
		position: absolute;
		right: 19px;
		top: 24px;
		height: 0;
		width: 0;
		border: 3px solid transparent;
		border-top-color: currentColor;
	}
	
	.finance-menu>a:hover,
	.subscription a:hover,
	.subscription a.active,
	.finance-menu>a.active {
		color: #ff9d11;
	}
	
	.finance-menu .finance-menu-dropdown {
		display: none;
		position: absolute;
		top: 50px;
		right: 0;
		background: #fff;
		-webkit-box-shadow: 0 0 10px rgba(0, 0, 0, .2);
		box-shadow: 0 0 10px rgba(0, 0, 0, .2);
	}
	
	.finance-menu:hover .finance-menu-dropdown {
		display: block;
	}
	
	.asset-drop-head {
		padding: 20px;
		position: relative;
		z-index: 1;
	}
	
	.asset-drop-head .onffflist {
		position: absolute;
		right: 20px;
		top: 32px;
	}
	
	.asset-drop-head .onffflist a {
		display: block;
		text-decoration: none;
		display: -ms-flexbox;
		display: -webkit-box;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-transition: all .3s ease;
		transition: all .3s ease
	}
	
	.asset-drop-head .onffflist a span {
		margin-right: 5px;
		color: #b0b7c7;
	}
	
	.asset-drop-head .onffflist a i {
		display: block;
		height: 18px;
		background: #edeef1;
		border-radius: 30px;
		width: 40px;
		position: relative;
		overflow: hidden;
		-webkit-transition: all .3s ease;
		transition: all .3s ease
	}
	
	.asset-drop-head .onffflist a i:after {
		content: "";
		display: block;
		height: 14px;
		width: 14px;
		background: #fff;
		border-radius: 50%;
		margin: 2px 0 0 2px;
		-webkit-box-shadow: 0 0 3px rgba(0, 0, 0, .2);
		box-shadow: 0 0 3px rgba(0, 0, 0, .2);
		-webkit-transition: all .3s ease;
		transition: all .3s ease
	}
	
	.asset-drop-head .onffflist a.on i {
		background: #31C871
	}
	
	.asset-drop-head .onffflist a.on i:after {
		margin-left: 24px
	}
	
	.asset-drop-head .info {
		color: #b0b7c7;
	}
	
	.asset-drop-head .info .num-info {
		margin-bottom: 10px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: end;
		-ms-flex-align: end;
		align-items: flex-end;
	}
	
	.asset-drop-head .info .num-info .num {
		font-size: 20px;
		color: #555;
	}
	
	.asset-drop-head .info p.num {
		font-size: 20px;
		color: #000;
	}
	
	.asset-drop-head .drop {
		position: relative;
		margin-left: 5px;
	}
	
	.asset-drop-head .drop p {
		position: relative;
		padding-right: 10px;
		cursor: pointer;
		color: #ff9d11;
	}
	
	.asset-drop-head .drop p:after {
		content: "";
		display: block;
		height: 0;
		width: 0;
		position: absolute;
		top: 4px;
		right: 0;
		border: 3px solid transparent;
		border-top-color: #666;
	}
	
	.asset-drop-head .drop:hover p:after {
		-webkit-transform: rotate(180deg);
		transform: rotate(180deg);
		top: 1px;
	}
	
	.asset-drop-head .drop .drop-box {
		position: absolute;
		white-space: nowrap;
		left: 0;
		min-width: 100%;
		display: none;
		background: #fff;
		border-radius: 3px;
		-webkit-box-shadow: 0 0 10px rgba(0, 0, 0, .2);
		box-shadow: 0 0 10px rgba(0, 0, 0, .2);
		overflow: hidden
	}
	
	.asset-drop-head .drop .drop-box li {
		padding: 10px;
		color: #888;
		cursor: pointer;
		-webkit-transition: all .3s ease;
		transition: all .3s ease
	}
	
	.asset-drop-head .drop .drop-box li+li {
		border-top: 1px solid rgba(0, 0, 0, .05)
	}
	
	.asset-drop-head .drop .drop-box li.active {
		color: #ff9d11;
	}
	
	.asset-drop-head .drop .drop-box li:hover {
		background: #ff9d11;
		color: #fff
	}
	
	.asset-drop-head .drop:hover .drop-box {
		display: block
	}
	
	.asset-drop-table .tr {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		border-top: 1px solid #f5f5f5;
	}
	
	.asset-drop-table .tr .td {
		color: #9798ab;
		padding: 12px 0;
		min-width: 100px;
	}
	
	.asset-drop-table .tr .td:first-child {
		padding-left: 38px;
		position: relative;
		color: #333;
	}
	
	.asset-drop-table .tr .td:nth-child(3) {
		color: #f00;
	}
	
	.asset-drop-table .tr .td:last-child {
		text-align: right;
		padding-right: 15px;
		min-width: 100px;
	}
	
	.asset-drop-table .tr .td img {
		width: 16px;
		position: absolute;
		left: 15px;
		top: 0;
		bottom: 0;
		margin: auto
	}
	
	.asset-drop-table .tr .td a {
		color: #ff9d11;
	}
	
	.asset-drop-table .tr .td a.disabled {
		text-decoration: line-through !important;
		color: #ccc;
	}
	
	.asset-drop-table .tr.head {
		background: #f6f7f9;
	}
	
	.asset-drop-table .tr.head .td {
		padding-top: 8px;
		padding-bottom: 8px;
		color: #999 !important;
	}

</style>
