<template>
<div class="exx-entrance">
	<div class="bgc_canvas">
		<my-canvas></my-canvas>
	</div>
<div class="exx-entrance-main" v-loading.fullscreen.lock="fullscreenLoading">
	<div class="exx-entrance-head">
		<h3 class="login-title">
			<span :class="!userCode ? 'title-current' :''" @click='click_nouse_code'>{{$t('login["账密登录"]')}}</span>
			<span :class="userCode ? 'title-current' :''" @click='click_use_code'>{{$t('login["验证码登录"]')}}</span>
		</h3>
	</div>
	<div id="logBox" class="exx-entrance-body">
		<div class="form-box">
			<div class="form-group">
				<div id="nikeForm" class="form-control">
					<input autocomplete="off" :placeholder="$t(`login['手机/邮箱/用户名']`)"type="text" v-model='form.userName'/>
					<!---->
				</div>
			</div>
			<div class="form-group" v-if='!userCode'>
				<div id="passwordForm" class="form-control">
					<input autocomplete="new-password" :placeholder="$t(`login['登录密码']`)" @keypress.enter='submit' type="password"  v-model='form.password'/>
				 </div>
			</div>
			<div  class="form-group" v-if='user.isphone'>
				<div  class="form-control">
					<input autocomplete="off" :placeholder="$t(`login['输入手机验证码']`)" type="text" v-model='form.phone'/>
					<el-button type='success' :disabled='form.get' style='position:absolute;top:1px;right:0;' :class='phone.get ? "getwait-message":""' @click='get_phone_number'
					>{{$t('login["获取验证码"]')}}</el-button>
				</div>
			</div>
			<div  class="form-group" v-if='user.isemail'>
				<div  class="form-control">
					<input autocomplete="off" :placeholder="$t(`login['输入邮箱验证码']`)" type="text" v-model='form.email'/>
					<!---->
					<el-button type='success' :disabled='form.get' style='position:absolute;top:1px;right:0' :class='email.get ? "getwait-message":""' @click='get_email_number'>{{$t('login["获取验证码"]')}}</el-button>
				</div>
			</div>
			<div  class="form-group" v-if='user.isgoogle'>
				<div  class="form-control">
					<input autocomplete="off" :placeholder="$t(`login['输入google验证码']`)" type="text" v-model='form.google'/>
					<!---->
				</div>
			</div>	
			<div  class="form-group" >
				<div  class="form-control">
					<input autocomplete="off" :placeholder="$t(`login['输入图形验证码']`)" type="text" v-model='indent' @keypress.enter='submit'/>
					<div class="identity-input" @click="refreshCode" :contentHeight='44' :fontSizeMin='18'>
						<identity :identifyCode="identifyCode"></identity>
					</div>
					<!---->
				</div>
			</div>
			<div  class="form-group" v-if='userCode'>
				<div  class="form-control">
					<input autocomplete="off" :placeholder="$t(`login['输入手机验证码']`)" type="text" v-model='form.loginphone' />
					<!---->
					<el-button type='success' :disabled='form.get' style='position:absolute;top:1px;right:0;' :class='phone.get ? "getwait-message":""' @click='get_lophone_number'>{{$t('login["获取验证码"]')}}</el-button>
				</div>
			</div>
			<div class="form-button"><button type="button" class="button" @click='login'><span>{{$t('login["登录"]')}}</span></button></div>
			<div class="form-other"><span style="float:left"><router-link to="/forget">忘记密码</router-link></span><span style="float:right">{{$t('login["还没账号"]')}}？<router-link to="/register">{{$t('login["立即注册"]')}}</router-link></span></div>
		</div>
	</div>
</div>
</div>
</template>
<script>
	import myCanvas from './canvas'
	import Post from '@/api/post'
	import MD5 from 'js-md5'
	import identity from '@/components/identity'
	import {
		Loading
	} from 'element-ui';
	export default {
		components: {
			myCanvas,
			identity
		},
		data() {
			return {
				userCode: false, //验证码登录
				indent: '',
				form: {
					userName: '',
					password: '',
					email: '',
					phone: '',
					google: '',
					loginphone: ''
				},
				email: {
					get: false
				},
				phone: {
					get: false
				},
				fullscreenLoading: false,
				email_regular: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
				phone_regular: /^\d*_?\d*$/,
				user: {
					isemail: null,
					isgoogle: null,
					isphone: null,
				},
				get_user: false, //来判断是第几次登录
				user_phone: null,
				identifyCodes: "1234567890",
				identifyCode: "",
				isAddress: false,
				willSendPhone: '', //将要发送的手机
				willSendEmail: '', //将要发送的邮箱

			}
		},
		mounted() {
			this.identifyCode = "";
			this.makeCode(this.identifyCodes, 4);
		},
		methods: {
			randomNum(min, max) {
				return Math.floor(Math.random() * (max - min) + min);
			},
			refreshCode() {
				this.identifyCode = "";
				this.makeCode(this.identifyCodes, 4);
			},
			makeCode(o, l) {
				for (let i = 0; i < l; i++) {
					this.identifyCode += this.identifyCodes[
						this.randomNum(0, this.identifyCodes.length)
					];
				}
			},
			click_nouse_code() {
				this.userCode = false;
				this.user = {
					isemail: null,
					isgoogle: null,
					isphone: null,
				};
				this.isAddress = false;
				this.get_user = false;
				this.form = {
					userName: '',
					password: '',
					email: '',
					phone: '',
					google: '',
					loginphone: ''
				};
			},
			click_use_code() {
				this.userCode = true;
				this.user = {
					isemail: null,
					isgoogle: null,
					isphone: null,
				};
				this.isAddress = false;
				this.get_user = false;
				this.form = {
					userName: '',
					password: '',
					email: '',
					phone: '',
					google: '',
					loginphone: ''
				};
			},
			get_verification(url, data, str, type) {
				if (this[str]['get']) {
					this.$message({
						showClose: true,
						message: '验证码已发送,请' + (60 - (this[str]['time'])) + '后重试',
						type: 'error'
					});
					return
				}
				if (JSON.stringify(data) === '{}') {
					this.fullscreenLoading = true;
					Post({
						url: 'log/' + url,
						data: data,
						success: res => {
							this.fullscreenLoading = false;
							if (res.code == 0) {
								this[str]['get'] = true;
								this.$message({
									showClose: true,
									message: res.data,
									type: 'success'
								});
								clearInterval(timer);
								let a = 0;
								this[str]['time'] = a;

								let timer = setInterval(res => {
									a++;
									this[str]['time'] = a;
									if (a == 60) {
										clearInterval(timer);
										this[str]['get'] = false;
									}
								}, 1000)
							}
						},
						fail: res => {
							this.fullscreenLoading = true;
						}
					})
					return
				}
				if (!this.email_regular.test(data.userName) && !this.phone_regular.test(data.userName)) {
					this.$message({
						showClose: true,
						message: this.$t(`login['手机或邮箱格式有误']`),
						type: 'error'
					});
					return
				}
				if (this.phone_regular.test(data.userName)) {
					this.fullscreenLoading = true;
					Post({
						url: 'log/' + url,
						data: data,
						success: res => {
							this.fullscreenLoading = false;
							if (res.code == 0) {
								this[str]['get'] = true;
								this.$message({
									showClose: true,
									message: this.$t(`login['验证码已发送你的手机，请注意查收']`),
									type: 'success'
								});
								clearInterval(timer);
								let a = 0;
								this[str]['time'] = a;
								let timer = setInterval(res => {
									a++;
									this[str]['time'] = a;
									if (a == 60) {
										clearInterval(timer);
										this[str]['get'] = false;
									}
								}, 1000)
							}
						},
						fail: res => {
							this.fullscreenLoading = true;
						}
					})
				}
				if (this.email_regular.test(data.userName)) {
					this.fullscreenLoading = true;
					Post({
						url: 'log/' + url,
						data: data,
						success: res => {
							this.fullscreenLoading = false;
							if (res.code == 0) {
								this[str]['get'] = true;
								this.$message({
									showClose: true,
									message: this.$t(`login['验证码已发送你的邮箱，请注意查收']`),
									type: 'success'
								});
								clearInterval(timer);
								let a = 0;
								this[str]['time'] = a;
								let timer = setInterval(res => {
									a++;
									this[str]['time'] = a;
									if (a == 60) {
										clearInterval(timer);
										this[str]['get'] = false;
									}
								}, 1000)
							}
						},
						fail: res => {
							this.fullscreenLoading = false;
						}
					})
				}
			},
			get_lophone_number() {
				if (this.identifyCode !== this.indent) {
					this.$message({
						showClose: true,
						message: '验证码输入错误',
						type: 'error'
					});
					this.indent = '';
					this.refreshCode();
					return
				}
				this.get_verification('getPhoneOrEmailVerification', {
					userName: this.form.userName,
					title: '登录验证'
				}, "phone", "phone")
			},
			get_phone_number() {
				var url = '';
				var str = '';
				if (this.isAddress && this.phone_regular.test(this.form.userName)) {
					url = 'getPhoneOrEmailVerification';
					str = this.form.userName
				} else {
					url = 'getVerificationCode';
					str = this.willSendPhone
				}
				this.get_verification(url, {
					userName: str,
					title: '登录验证'
				}, "phone", "phone")
			},
			get_email_number() {
				var url = '';
				var str = '';
				if (this.isAddress && this.email_regular.test(this.form.userName)) {
					url = 'getPhoneOrEmailVerification';
					str = this.form.userName;
				} else {
					url = 'getEmailVerificationCode';
					str = this.willSendEmail;
				}
				this.get_verification(url, {
					userName: str
				}, "email", "email")
			},
			submit(e) {
				this.login()
			},
			login() {
				if (!this.form.userName) {
					this.$message({
						showClose: true,
						message: '输入内容有误',
						type: 'error'
					});
					return
				}
				if (this.identifyCode !== this.indent) {
					this.$message({
						showClose: true,
						message: '验证码输入错误',
						type: 'error'
					});
					this.indent = '';
					this.refreshCode();
					return
				}
				if (this.userCode && !this.form.loginphone) {
					this.$message({
						showClose: true,
						message: '输入内容有误',
						type: 'error'
					});
					return
				}
				if (!this.userCode && !this.form.password) {
					this.$message({
						showClose: true,
						message: '输入内容有误',
						type: 'error'
					});
					return
				}
				const loading = this.$loading({
					lock: true,
					text: 'Loading',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				});
				if (this.userCode) {
					Post({
						url: 'log/loginByPhoneVerificationCode',
						data: {
							userName: this.form.userName,
							title: this.form.loginphone,
						},
						success: res => {
							if (res.code === 0) {
								sessionStorage.setItem('isAddress', 'false');
								this.$store.state.isAddress = 'false';
								this.$store.commit('SET_TYPEN', res.data);
								loading.close();
								this.$router.push({
									'path': '/'
								})
								this.$message({
									showClose: true,
									message: '登录成功',
									type: 'success'
								});
							} else {
								this.$message.warning(res.data);
								loading.close();
							}
						},
						fail: res => {
							loading.close();
						}
					})
					return
				}

				if (!this.get_user) { //第一次登录走这
					Post({
						url: 'log/login',
						data: {
							userName: this.form.userName,
							password: MD5(this.form.password),
						},
						success: res => {
							loading.close();
							if (res.code === 0) {
								var data = res.data;
								this.isAddress = data.isAddress;
								this.willSendPhone = data.data.phone;
								this.willSendEmail = data.data.email;
								if (data.isAddress) { //异地
									this.get_user = true;
									var str = res.data.isAddress + '';
									sessionStorage.setItem('isAddress', str);
									this.$store.state.isAddress = str;
									this.$message({
										showClose: true,
										message: '您当前是异地登录，请输入验证码',
										type: 'warning'
									});
									if (data.data.isemail) {
										this.user.isemail = true;
									}
									if (data.data.isphone) {
										this.user.isphone = true;
									}
									this.user.isphone = true;
									if (this.email_regular.test(this.form.userName)) {
										this.user.isemail = true;
										return
									} else {
										this.user.isphone = true;
									}
									return
								}
								if (!data.data.isemail && !data.data.isphone && !data.data.isgoogle) {
									Post({
										url: 'log/login',
										data: {
											userName: this.form.userName,
											password: MD5(this.form.password),
											isLogin: 'login'
										},
										success: res => {
											if (res.code === 0) {
												var str = res.data.isAddress + '';
												sessionStorage.setItem('isAddress', str);
												this.$store.state.isAddress = str;
												this.$store.commit('SET_TYPEN', res.data.data);
												loading.close();
												this.$router.push({
													'path': '/'
												});
												this.$message({
													showClose: true,
													message: '登录成功',
													type: 'success'
												});
											} else {
												this.$message.warning(res.data);
												loading.close();
											}
										},
										fail: res => {
											loading.close();
										}
									})
								} else {
									this.get_user = true;
									this.user.isemail = data.data.isemail;
									this.user.isphone = data.data.isphone;
									this.user.isgoogle = data.data.isgoogle;
								}
							} else {
								this.$message({
									showClose: true,
									message: res.data,
									type: 'error'
								});
							}
						},
						fail: res => {
							loading.close();
						}
					})
				} else {
					//第二次登录走这
					if (this.user.isemail && !this.form.email) {
						this.$message({
							showClose: true,
							message: "请输入邮箱验证码",
							type: 'warning'
						});
						loading.close();
						return
					}
					if (this.user.isgoogle && !this.form.google) {
						this.$message({
							showClose: true,
							message: "请输入google验证码",
							type: 'warning'
						});
						loading.close();
						return
					}
					if (this.user.isphone && !this.form.phone) {
						this.$message({
							showClose: true,
							message: "请输入手机验证码",
							type: 'warning'
						});
						loading.close();

						return
					}
					var str = '';
					var obj = {
						userName: this.form.userName,
						password: MD5(this.form.password),
						isLogin: 'login',
						phone: this.form.phone,
						email: this.form.email,
						google: this.form.google,
						yidi: str
					};
					if (this.phone_regular.test(this.form.userName) && this.isAddress) {
						obj = {
							userName: this.form.userName,
							password: MD5(this.form.password),
							isLogin: 'login',
							phone: '',
							email: this.form.email,
							google: this.form.google,
							yidi: this.form.phone
						}
					}

					if (this.email_regular.test(this.form.userName) && this.isAddress) {
						obj = {
							userName: this.form.userName,
							password: MD5(this.form.password),
							isLogin: 'login',
							phone: this.form.phone,
							email: '',
							google: this.form.google,
							yidi: this.form.email
						}
					}
					Post({
						url: 'log/login',
						data: obj,
						success: res => {
							loading.close();
							if (res.code === 0) {
								var str = res.data.isAddress + '';
								sessionStorage.setItem('isAddress', str);
								this.$store.state.isAddress = str;
								this.$store.commit('SET_TYPEN', res.data.data);
								this.$router.push({
									'path': '/'
								})
							} else {
								this.$message.warning(res.data);
							}
						},
						fail: res => {
							loading.close();
						}
					})
				}
			}
		}
	}

</script>
<style>
	.getwait-message {
		background-color: #ccc;
		border-color: #ccc
	}

	.getwait-message:active {
		background-color: #ccc;
		border-color: #ccc
	}

	.getwait-message:hover {
		background-color: #ccc;
		border-color: #ccc
	}

	.getwait-message:focus {
		background-color: #ccc;
		border-color: #ccc
	}

	.identity-input {
		position: absolute;
		top: 2px;
		right: 0;
		cursor: pointer
	}

	.login-title {}

	.login-title span {
		width: 40%;
		height: 42px;
		text-align: center;
		display: inline-block;
		cursor: pointer;
		font-size: 16px;
	}

	.title-current {
		color: #ff9d11;
	}

	.exx-entrance {
		height: 500px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		position: relative;
	}

	.exx-entrance-main {
		position: relative;
		width: 420px;
		background: rgb(255, 255, 255);
		border-radius: 3px;
		padding: 35px;
		z-index: 10;
		overflow: hidden;
	}

	.exx-entrance-head {
		margin-bottom: 30px;
		text-align: center;
	}

	.exx-entrance-head h3 {
		font-size: 20px;
		color: #333539;
	}

	.exx-entrance .form-other {
		color: #a5acbb;
		margin-top: 20px;
		text-align: center;
	}

	.exx-entrance .form-other a {
		color: #ff9d11;
	}

	.form-box .form-group {
		position: relative;
		margin-bottom: 20px;
	}

	.form-box .form-group .form-control {
		position: relative;
	}

	.form-box .form-group .form-control input {
		display: block;
		width: 100%;
		height: 42px;
		padding: 10px 12px;
		line-height: 1.42857143;
		outline: none;
		-webkit-box-shadow: none;
		box-shadow: none;
		background-color: transparent;
		color: #333;
		border: 1px solid #dde2ed;
		border-radius: 3px;
		-webkit-appearance: none;
		-webkit-backface-visibility: hidden;
		-webkit-transition: all 0.2s linear 0s;
		transition: all 0.2s linear 0s;
		/*-webkit-font-smoothing: antialiased;*/
		/*-moz-osx-font-smoothing: grayscale;*/
	}

	.form-box .form-group .form-control input::-moz-placeholder {
		color: #b0b7c7;
		opacity: 1;
	}

	.form-box .form-group .form-control input:-ms-input-placeholder {
		color: #b0b7c7;
	}

	.form-box .form-group .form-control input::-webkit-input-placeholder {
		color: #b0b7c7;
	}

	.form-box .form-group .form-control input::-ms-expand {
		background-color: transparent;
		border: 0;
	}

	.exx-entrance .form-group.error .form-control input {
		border-color: #f00;
	}

	.exx-entrance .form-group .input-alert,
	.exx-entrance .form-group .input-alert2 {
		color: #f00;
		white-space: nowrap;
		margin-top: 10px;
	}

	.exx-entrance .form-group .input-alert2 {
		color: #ff9d11;
	}

	.exx-entrance .form-group.prompt .input-alert,
	.exx-entrance .form-group.prompt .input-alert2 {
		display: block !important;
	}

	.form-box .form-group .form-control input:focus {
		border-color: #ff9d11;
	}

	.form-box .form-group .form-control .form-text {
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		padding: 0 10px;
		color: #b0b7c7;
	}

	.form-box .form-group .form-control .label-a {
		position: absolute;
		right: 1px;
		top: 1px;
		bottom: 1px;
		color: #a5acbb;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		padding: 0 10px;
	}

	.form-box .form-group .form-control .label-a:hover {
		color: #ff9d11;
	}

	.exx-entrance .form-group .form-control .code-img {
		position: absolute;
		right: 0;
		top: 0;
		cursor: pointer;
	}

	.form-box .form-group .form-control .code-img img {
		width: 100px;
		border-radius: 0 3px 3px 0;
	}

	.form-box .form-group .form-control .code-num {
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		color: #ff9d11;
		width: 100px;
		border-left: 1px solid #dde2ed;
		-webkit-transition: border 0.2s ease;
		transition: border 0.2s ease;
		border-radius: 0 3px 3px 0;
	}

	.form-box .form-group .form-control .code-num:hover {
		background: #ff9d11;
		color: #fff;
	}

	.form-box .form-group .form-control .code-num.disabled,
	.form-box .form-group .form-control .code-num.disabled:hover {
		color: #b5bdcf;
		cursor: no-drop;
		background: none !important;
	}

	.form-box .form-group .form-control input:focus~.code-num {
		border-left-color: #ff9d11;
	}

	.exx-entrance .form-group.error .form-control .code-num {
		border-left-color: #f00;
	}

	.form-box .form-button .button {
		width: 100%;
		border: none;
		outline: 0;
		color: #fff;
		background: transparent;
		padding: 13px 30px;
		background: #ff9d11;
		border-radius: 3px;
		-webkit-box-shadow: none;
		box-shadow: none;
		font-size: 14px;
		white-space: nowrap;
		-ms-touch-action: manipulation;
		touch-action: manipulation;
		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		position: relative;
	}

	.form-box .form-button .button:hover {
		background: #f39105;
	}

	.form-box .form-button .button.btn-loading {
		pointer-events: none;
	}

	.form-box .form-button .button.btn-loading span {
		opacity: 0;
		visibility: hidden;
	}

	.form-box .form-button .button.btn-loading:after {
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		height: 24px;
		width: 24px;
		background: url(/src/images/svg/oval.svg) no-repeat center center/cover
	}

	.form-login {
		text-align: center;
		padding: 15px 0 15px;
	}

	.form-login h3 {
		font-size: 14px;
		color: #333;
		position: relative;
		margin-bottom: 20px;
	}

	.form-login h3 span {
		background-color: #fff;
		padding: 0 20px;
		display: inline-block;
		position: relative;
		z-index: 5;
	}

	.form-login h3:after {
		content: '';
		display: block;
		height: 1px;
		width: 100%;
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		z-index: 1;
		border-bottom: 1px solid #ddd;
	}

	.form-login li {
		margin-bottom: 15px;
	}

	.form-login li a {
		display: inline-block;
		padding: 10px 20px;
		border: 1px dashed #ddd;
		cursor: pointer;
	}

	.form-login li a:hover {
		border-color: #ff9d11;
	}

	.form-login li img {
		height: 22px;
		width: auto;
		cursor: pointer;
	}

	.bgc_canvas {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

</style>
