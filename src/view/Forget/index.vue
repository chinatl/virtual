<template>
	<div class='forget-password' v-loading='full_loading'>
		<h3>找回登录密码</h3>
		<div class="forget-form">
			<el-form :model="form" :rules="rules" ref="form">
			  <el-form-item label="手机号码/邮箱" prop="username">
				<el-input v-model="form.username" ></el-input>
			  </el-form-item>
			  <el-form-item label="图形验证码" prop="img_code">
				<div style="display:flex;width:100%">
					<el-input v-model="form.img_code"></el-input>
					<div class="identity-input" @click="refreshCode" :contentHeight='44' :fontSizeMin='18' style="cursor:pointer">
						<my-identity :identifyCode="identifyCode"></my-identity>
					</div>
				</div>
			  </el-form-item>
			  <el-form-item label="动态验证码" prop="code">
			 	 	<div style="display:flex;width:100%">
						<el-input v-model='form.code' maxlength='6' ></el-input>
						<button :class='!isSend ? "erp-btn" : "erp-btn info"' @click.stop.prevent='get_validate'>{{email_message}}</button>
                	</div>
			  </el-form-item>
			  <el-form-item label="设置新的登录密码" prop="password">
				<el-input  v-model="form.password" type='password'></el-input>
			  </el-form-item>
			  <el-form-item label="重复输入密码" prop="re_password">
				<el-input  v-model="form.re_password" type='password'></el-input>
			  </el-form-item>
			  <el-form-item>
				<el-button type="primary" @click="submitForm('form')">提交</el-button>
			  </el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import myIdentity from '@/components/identity'
	import md5 from 'js-md5'
	import Get from '@/api/post'
	export default {
		components: {
			myIdentity
		},
		data() {
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.form.password) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			var validate = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入手机号码或邮箱'));
				} else {
					if (!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value) &&
						!/^(0|86|17951)?(13[0-9]|198|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(value)) {
						callback(new Error('手机号码或邮箱格式错误'));
					} else {
						callback();
					}
				}
			}
			return {
				form: {
					username: '', //用户名
					img_code: '', //图形验证码
					code: '', //动态验证码
					password: '', //新的登录密码
					re_password: '' //确认新的登录密码
				},
				isSend: false,
				rules: {
					username: [{
						//						required: true,
						//						message: '请输入手机号码或者邮箱',
						trigger: 'blur',
						validator: validate
					}],
					img_code: [],
					code: [],
					password: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					re_password: [{
						validator: validatePass2,
						trigger: 'change'
					}]
				},
				email_message: '发送验证码',
				email_regular: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
				phone_regular: /^(0|86|17951)?(13[0-9]|198|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
				identifyCodes: "1234567890",
				identifyCode: "",
				full_loading: false
			};
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
			validatePhone(value) {
				if (this.phone_regular.test(value)) {
					return true
				} else {
					return false
				}
			},
			validateEmail(value) {
				if (this.email_regular.test(value)) {
					return true
				} else {
					return false
				}
			},
			submitForm(formName) {
				if (this.form.img_code != this.identifyCode) {
					this.$message({
						message: '图形验证码错误',
						type: 'error'
					})
					return
				}
				this.$refs[formName].validate((valid) => {
					if (valid) {
						Get({
							url: 'log/forgetPassWord',
							data: {
								userName: this.form.username,
								verification: this.form.code,
								pass: md5(this.form.password),
							},
							success: res => {
								if (res.code == 0) {
									this.$message({
										message: '密码修改成功，请重新登录',
										type: 'success'
									})
									this.$router.push({
										'path': '/login'
									})
									this.form = {
										username: '', //用户名
										img_code: '', //图形验证码
										code: '', //动态验证码
										password: '', //新的登录密码
										re_password: '' //确认新的登录密码
									}
								}
							}
						})
					} else {
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			get_validate() {
				if (this.form.img_code != this.identifyCode) {
					this.$message({
						message: '图形验证码错误',
						type: 'error'
					})
					return
				}
				if (this.isSend) {
					this.$message({
						message: '您已发送验证码，请稍后再发',
						type: 'error'
					})
					return
				}
				if (this.email_regular.test(this.form.username) || this.phone_regular.test(this.form.username)) {
					this.full_loading = true;
					Get({
						url: 'log/getPhoneOrEmailVerification',
						data: {
							userName: this.form.username,
							title: '忘记密码'
						},
						success: res => {
							clearInterval(this.timer);
							this.full_loading = false;
							this.$message({
								message: res.data,
								type: 'success'
							});
							this.isSend = true;
							var a = 0;
							this.timer = setInterval(res => {
								a++;
								this.email_message = (60 - a) + '后再次发送';
								if (a == 60) {
									this.email_message = 'email_message';
									this.isSend = false;
									clearInterval(this.timer);
								}
							}, 1000)
						},
						fail: res => {
							this.full_loading = false;
						}
					})
				} else {
					this.$message({
						message: '邮箱格式错误',
						type: 'error'
					})
				}
			}
		}
	}

</script>
<style>
	.erp-btn {
		font-family: "Montserrat-Regular";
		background-color: #00C1DE;
		color: #fff;
		padding: 0px 20px;
		outline: none;
		border: none;
		border-radius: 4px;
		font-size: 14px;
		cursor: pointer;
		white-space: nowrap;
	}

	.erp-btn:hover {
		background-color: #00C1DE;
		opacity: .8
	}

	.erp-btn:active {
		background-color: #00C1DE;
		opacity: 1
	}

	.erp-btn.info {
		background-color: #f5f5f6;
		color: #000;

	}

	.erp-btn.info:hover {
		background-color: #f5f5f6;
		opacity: .8
	}

	.erp-btn.info:active {
		background-color: #f5f5f6;
		opacity: .1
	}

	.forget-password {
		margin: 0 auto;
		width: 1200px;
		padding: 20px;
		text-align: center;
	}

	.forget-password h3 {
		font-size: 20px;
	}

	.forget-form {
		width: 600px;
		margin: 0 auto;
	}

</style>
