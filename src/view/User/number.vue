<template>
<div class="pay_panel"  v-loading="fullscreenLoading">
	<div class="pay-content">
		<el-card class="box-card">
	    <div slot="header" class="clearfix">
		  	<span style="font-size:14px;font-weight:bold">{{$t('user["账号管理"]')}}</span>
		  </div>
			<div class="select">
				<div :class="'user' === nowUser ? 'users current':'users'">
					<div class="avatar">
						<img src="" alt="">
					</div>
					<div class="info">
						<p>{{$store.state.user.nickName}}<span class="orange" @click.stop='edit_user($store.state.user,$event)'>{{$t('user["编辑"]')}}</span></p>
						<p>{{$store.state.user.phone}}</p>
					</div>
				</div>
				<div :class="index === nowUser ? 'users current':'users'" v-for='(item,index) in $store.state.userAccount' style='cursor: pointer;' @click='check_login(item.id,$event)'>
					<div class="avatar">
						<img src="" alt="">
					</div>
					<div class="info">
						<p>{{item.nickName}}<span class="orange" @click.stop='edit_user(item,$event)'>{{$t('user["编辑"]')}}</span></p>
						<p>{{item.phone}}</p>
					</div>
				</div>	
				<div class="new-account" @click='open_dialog("add_user_dialog")' v-if='!$store.state.user.mainUsersId'>
					<h4>{{$t('user["新建独立账户"]')}}</h4>
					<p>{{$t('user["新账号说明"]')}}</p>
				</div>
			</div>	
		</el-card>
	</div>
	<div class="pay-content">
		<el-card class="box-card">
	    <div slot="header" class="clearfix">
		  	<span style="font-size:14px;font-weight:bold">{{$t('user["安全设置"]')}}</span>
		  </div>
			<div class="select">
				<div class="safe-info">
					<ul>
						<li>
							<div class="l">
								<h3>{{$t('user["登录密码"]')}}</h3>
								<p>
									<!----><span class="auth">{{$t('user["已设置"]')}}</span>
									<!---->
									<!---->
								</p>
							</div>
							<div class="r" @click='open_dialog("centerDialogVisible")'><a>{{$t('user["修改"]')}}</a></div>
						</li>
						<li>
							<div class="l">
								<h3>{{$t('user["交易密码"]')}}</h3>
								<p>
									<!---->
									<span class="auth" v-if='$store.state.user.tradPassword'>{{$t('user["已设置"]')}}</span> 
									<span class="not-auth" v-if='!$store.state.user.tradPassword'>{{$t('user["未认证"]')}}</span> 
									
									<!---->
									<!---->
								</p>
							</div>
							<div class="r" @click='open_dialog("trade_dialog")'><a>{{ $store.state.user.tradPassword ? $t('user["修改"]') : $t('user["认证"]')}}</a></div>
						</li>
						<li  v-if='!$store.state.user.mainUsersId'>
							<div class="l">
								<h3>{{$t('user["邮箱"]')}}<span></span></h3>
								<p>
									<span class="auth" v-if='$store.state.user.email'>{{$t('user["已设置"]')}}</span> 
									<span class="not-auth" v-if='!$store.state.user.email'>{{$t('user["未认证"]')}}</span> 
									
									<!---->
								</p>
								<div class="onffflist"  v-if='$store.state.user.email'><a @click='open_dialog("oc_email_dialog")'><span>{{$t('user["登录验证"]')}}：{{ !$store.state.user.isemail ? $t('user["关闭"]') : $t('user["开启"]')}}</span><i></i></a></div>
								<!---->
							</div>
							<div class="r" @click='open_dialog("email_dialog")'><a>{{ $store.state.user.email ? $t('user["修改"]') : $t('user["认证"]')}}</a></div>
						</li>
						<li  v-if='!$store.state.user.mainUsersId'>
							<div class="l">
								<h3>{{$t('user["手机"]')}}<span>{{$store.state.user.phone}}</span></h3>
								<p>
			<!---->					<span class="auth" v-if='$store.state.user.phone'>{{$t('user["已设置"]')}}</span> 
									<span class="not-auth" v-if='!$store.state.user.phone'>{{$t('user["未认证"]')}}</span>
								</p>
								<div class="onffflist" v-if='$store.state.user.phone'><a @click='open_dialog("oc_phone_dialog") '><span>{{$t('user["登录验证"]')}}：{{ !$store.state.user.isphone ? $t('user["关闭"]') : $t('user["开启"]')}}</span><i></i></a></div>
							</div>
							<div class="r" @click=' open_dialog("phone_dialog")'>
								<!----><a>{{ $store.state.user.phone ? $t('user["修改"]') : $t('user["认证"]')}}</a>
								<!---->
							</div>
						</li>	
						<li  v-if='!$store.state.user.mainUsersId'>
							<div class="l">
								<h3>Google{{$t('user["验证"]')}}</h3>
								<p>
			<!---->					<span class="auth" v-if='$store.state.user.googleAuthenticator'>{{$t('user["已设置"]')}}</span> 
									<span class="not-auth" v-if='!$store.state.user.googleAuthenticator'>{{$t('user["未认证"]')}}</span>
								</p>
								<div class="onffflist" v-if='$store.state.user.googleAuthenticator'><a @click='open_dialog("oc_google_dialog") '><span>{{$t('user["登录验证"]')}}：{{ !$store.state.user.isgoogle ? $t('user["关闭"]') : $t('user["开启"]')}}</span><i></i></a></div>
							</div>
							<div class="r">
								<!----><a @click='open_google'>{{ $store.state.user.googleAuthenticator ? $t('user["修改"]') : $t('user["认证"]')}}</a>
								<!---->
							</div>
						</li>
					</ul>
				</div>
			</div>	
		</el-card>
	</div>
	<div class="pay-content" v-if='!$store.state.user.mainUsersId'>
		<el-card class="box-card">
	    	<div slot="header" class="clearfix">
		  		<span style="font-size:14px;font-weight:bold">{{$t('user["实名认证"]')}}</span>
		  	</div>
			<div class="select">
				<div class="safe-info">
					<ul>
						<li>
							<div class="l">
								<h3>{{$t('user["初级认证"]')}}</h3>
								<p>
							    	<span class="auth" v-if='check1()'>{{$t('user["已设置"]')}}</span> 
									<span class="not-auth" v-if='!check1()'>{{$t('user["未认证"]')}}</span>
									<!---->
									<!---->
								</p>
							</div>
							<div class="r" @click='open_primary'><a>{{ check1() ? $t('user["查看"]') : $t('user["认证"]')}}</a></div>
						</li>
						<li>
							<div class="l">
								<h3>{{$t('user["高级认证"]')}}</h3>
								<p>
							    	<span class="auth" v-if='check2()'>{{$t('user["已设置"]')}}</span>
									<span class="not-auth" v-if='!check2()'>{{$t('user["未认证"]')}}</span>
									<!---->
									<!---->
								</p>
							</div>
							<div class="r" @click='open_senior'><a>{{ check2()? $t('user["查看"]') : $t('user["认证"]')}}</a></div>
						</li>
					</ul>
				</div>
			</div>
		</el-card>
	</div>
<el-dialog
	:title="$t(`user['高级认证']`)"
	:visible.sync="SeniorVisible"
	@close='primary_form={}'
	width="40%"
>
	<el-form  label-width="200px">
		<el-form-item label='身份证人像面:'>
			<div class="upload-imgList" v-show='headPortrait'>
				<i class="el-icon-close"  @click='delimg1' v-if='!check2()'></i>
				<img :src="headPortrait" alt="">
			</div>
			<el-upload
			ref='upload1'
				v-show='!headPortrait'
			  action="/log/addUserIDCard"
			  :auto-upload='true'
			  list-type="picture-card"
			  :limit='1'
			  :on-change='pushImg1'
			  name='headPortrait'>
			  <i class="el-icon-plus"></i>
			</el-upload>
		</el-form-item>
		<el-form-item label='身份证国徽面:'>
			<div class="upload-imgList" v-show='nationalEmblem'>
				<i class="el-icon-close" @click='delimg2' v-if='!check2()'></i>
				<img :src="nationalEmblem" alt="">
			</div>
			<el-upload
		  ref='upload2'
			  v-show='!nationalEmblem'
			  action="/log/addUserIDCard"
			  :auto-upload='true'
			  list-type="picture-card"
			  :limit='1'
			  :on-change='pushImg2'
			  name='nationalEmblem'>
			  <i class="el-icon-plus"></i>
			</el-upload>
		</el-form-item>
		<el-form-item label='身份证人像面:'>
			<div class="upload-imgList" v-show='people'>
				<i class="el-icon-close" @click='delimg3' v-if='!check2()'></i>
				<img :src="people" alt="">
			</div>
			<el-upload
			  ref='upload3'
			  v-show='!people'
			  action="/log/addUserIDCard"
			  :auto-upload='true'
			  list-type="picture-card"
			  :limit='1'
			  :on-change='pushImg3'
			  name='people'>
			  <i class="el-icon-plus"></i>
			</el-upload>
		</el-form-item>
		<el-form-item v-if='!check2()'>
			<el-button @click="cancel_pwd">{{$t('user["取消"]')}}</el-button>
			<el-button type="primary" @click="submit_upload_img">{{$t('user["提交"]')}}</el-button>
		</el-form-item>
	</el-form>
	
</el-dialog>

<el-dialog
:title="$t(`user['初级认证']`)"
:visible.sync="PrimaryVisible"
align='center'
@close='primary_form={}'
width="30%"
>
	<el-form :model="primary_form" label-width="0px">
		<el-form-item>
			<el-input v-model="primary_form.realName" :placeholder="$t(`user['真实姓名']`)" :disabled='check1()'></el-input>
		</el-form-item>
		<el-form-item>
			<el-input v-model="primary_form.iDCardNo" :placeholder="$t(`user['身份证号']`)" :disabled='check1()'></el-input>
		</el-form-item>
		<p style="color:red;text-align:left;margin:-10px 0 10px 0" v-if='!check1()'>请确认填写信息的真实性，否则后果自负！</p>
		<el-form-item align='center' v-if='!check1()'>
			<el-button @click="cancel_pwd">{{$t('user["取消"]')}}</el-button>
			<el-button type="primary" @click="submit_primary_email">{{$t('user["提交"]')}}</el-button>
		</el-form-item>
	</el-form>
</el-dialog>
<!--个人账户修改-->
<el-dialog
	  :title="$t(`user['修改用户名']`)"
	  :visible.sync="user_dialog"
	  @close='username_form={}'
	  width="30%"
	  center>
	  <el-form :model="username_form" label-width="0px">
			<el-form-item>
				<el-input v-model="username_form.nickName"  :placeholder="$t(`user['用户昵称']`)" :maxlength='6'></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="username_form.pass" type='password' :placeholder="$t(`user['主账户密码']`)"></el-input>
			</el-form-item>
<el-form-item align='center'>
	<el-button @click="cancel_pwd">{{$t('user["取消"]')}}</el-button>
	<el-button type="primary" @click="submit_username">{{$t('user["提交"]')}}</el-button>
</el-form-item>
</el-form>
</el-dialog>
<!--登录密码修改-->
<el-dialog :title="$t(`user['登录密码设置']`)"
@close='edit_form={}'
 :visible.sync="centerDialogVisible" width="30%" center>
	<el-form :model="edit_form" label-width="0px">
		<el-form-item>
			<el-input v-model="edit_form.old_password" type='password' :placeholder="$t(`user['旧登录密码']`)"></el-input>
		</el-form-item>
		<el-form-item>
			<el-input v-model="edit_form.new_password" type='password':placeholder="$t(`user['新登录密码']`)"></el-input>
		</el-form-item>
		<el-form-item>
			<el-input v-model="edit_form.password" type='password' :placeholder="$t(`user['确认登录密码']`)"></el-input>
		</el-form-item>
		<el-form-item>
			<el-input v-model="edit_form.verificationPhone" :placeholder="$t(`user['动态验证码']`)">
			<template slot="append" :disabled='edit_form.get'>
				<el-button @click='get_pwd_verification'>{{$t('user["获取验证码"]')}}</el-button>
			</template>
</el-input>
</el-form-item>
<el-form-item align='center'>
	<el-button @click="cancel_pwd">{{$t('user["取消"]')}}</el-button>
	<el-button type="primary" @click="submit_pwd">{{$t('user["提交"]')}}</el-button>
</el-form-item>
</el-form>
</el-dialog>
<!-- 交易密码设置 -->
<el-dialog :title="$t(`user['交易密码设置']`)" @close='trade_form={}' :visible.sync="trade_dialog" width="40%" center>
	<el-form :model="trade_form" label-width="0px">
		<el-form-item>
			<el-input v-model="trade_form.login_password" type='password' :placeholder="$t(`user['旧交易密码']`)"></el-input>
		</el-form-item>
		<el-form-item>
			<el-input v-model="trade_form.tradPassword" type='password' :placeholder="$t(`user['新交易密码']`)"></el-input>
		</el-form-item>
		<el-form-item>
			<el-input v-model="trade_form.new_tradPassword" type='password' :placeholder="$t(`user['确认新交易密码']`)"></el-input>
		</el-form-item>
		<el-form-item>
			<el-input v-model="trade_form.pass" type='password' :placeholder="$t(`user['主账户密码']`)"></el-input>
		</el-form-item>
		<el-form-item align='center'>
			<el-button @click="cancel_pwd">{{$t('user["取消"]')}}</el-button>
			<el-button type="primary" @click="submit_trade">{{$t('user["提交"]')}}</el-button>
		</el-form-item>
	</el-form>
</el-dialog>
<!--手机号验证码登录验证-->
<el-dialog @close='oc_form_phone={}' :title="user_account.isphone ? $t(`user['关闭手机号验证']`) : $t(`user['开启手机号验证']`)" :visible.sync="oc_phone_dialog" width="40%" center>
	<el-form :model="oc_form_phone" label-width="0px">
		<el-form-item>
			<el-input v-model="oc_form_phone.verificationPhone" :placeholder="$t(`user['动态验证码']`)">
				<template slot="append" :disabled='oc_form_phone.get'>
						<el-button @click='oc_get_phone_verification'>{{$t('user["获取验证码"]')}}</el-button>
					</template>
			</el-input>
		</el-form-item>
		<el-form-item align='center'>
			<el-button @click="cancel_pwd">{{$t('user["取消"]')}}</el-button>
			<el-button type="primary" @click="oc_submit_phone">{{$t('user["提交"]')}}</el-button>
		</el-form-item>
	</el-form>
</el-dialog>
<!--手机号修改-->
<el-dialog :title="$t(`user['手机号修改']`)" @close='form_phone={}' :visible.sync="phone_dialog" width="30%" center>
	<el-form :model="form_phone" label-width="0px">
		<el-form-item>
			<el-input v-model="form_phone.phone" :placeholder="$t(`user['新手机号']`)"></el-input>
		</el-form-item>
		<el-form-item>
			<el-input v-model="form_phone.verificationPhone" :placeholder="$t(`user['动态验证码']`)">
				<template slot="append" :disabled='form_phone.get'>
						<el-button @click='get_phone_verification'>{{$t('user["获取验证码"]')}}</el-button>
					</template>
			</el-input>
		</el-form-item>
		<el-form-item align='center'>
			<el-button @click="cancel_pwd">{{$t('user["取消"]')}}</el-button>
			<el-button type="primary" @click="submit_phone">{{$t('user["提交"]')}}</el-button>
		</el-form-item>
	</el-form>
</el-dialog>
<!--邮箱登录验证-->
<el-dialog @close='oc_form_email={}' :title="user_account.isemail ? $t(`user['关闭邮箱登录验证']`) : $t(`user['开启邮箱登录验证']`)" :visible.sync="oc_email_dialog" width="40%" center>
	<el-form :model="oc_form_email" label-width="0px">
		<el-form-item>
			<el-input v-model="oc_form_email.verificationPhone" :placeholder="$t(`user['动态验证码']`)">
				<template slot="append">
					<el-button @click='oc_get_email_verification'>{{$t('user["获取验证码"]')}}</el-button>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item align='center'>
			<el-button @click="cancel_pwd">{{$t('user["取消"]')}}</el-button>
			<el-button type="primary" @click="oc_submit_email">{{$t('user["提交"]')}}</el-button>
		</el-form-item>
	</el-form>
</el-dialog>
<!--邮箱认证-->
<el-dialog @close='form_email={}' :title="$t(`user['邮箱设置']`)" :visible.sync="email_dialog" width="30%" center>
	<el-form :model="form_email" label-width="0px">
		<el-form-item>
			<el-input v-model="form_email.mail" :placeholder="$t(`user['邮箱地址']`)"></el-input>
		</el-form-item>
		<el-form-item>
			<el-input v-model="form_email.emaila" :placeholder="$t(`user['邮箱验证码']`)">
				<template slot="append">
						<el-button type='success' @click='get_email_verification' :disabled='form_email.get'>{{$t('user["获取验证码"]')}}</el-button>
					</template>
			</el-input>
		</el-form-item>
		<el-form-item align='center'>
			<el-button @click="cancel_pwd">{{$t('user["取消"]')}}</el-button>
			<el-button type="primary" @click="submit_auth_email">{{$t('user["提交"]')}}</el-button>
		</el-form-item>
	</el-form>
</el-dialog>
<!--新建子账户-->
<el-dialog title="新建子账户" @close='addKidUsers={}' :visible.sync="add_user_dialog" width="30%" center>
	<el-form :model="addKidUsers" label-width="0px">
		<el-form-item>
			<el-input v-model="addKidUsers.kidName" :placeholder="$t(`user['子账户昵称']`)"></el-input>
		</el-form-item>
		<el-form-item>
			<el-input v-model="addKidUsers.kidPassword" type='password' :placeholder="$t(`user['子账户登录']`)"></el-input>
		</el-form-item>
		<el-form-item>
			<el-input v-model="addKidUsers.kidMainPass" type='password' :placeholder="$t(`user['主账户登录密码']`)"></el-input>
		</el-form-item>
		<el-form-item align='center'>
			<el-button @click="cancel_pwd">{{$t('user["取消"]')}}</el-button>
			<el-button type="primary" @click="submit_addKidUsers">{{$t('user["提交"]')}}</el-button>
		</el-form-item>
	</el-form>
</el-dialog>
<!-- google 认证 -->
<el-dialog title="Google 设置" @close='add_google_form={}' :visible.sync="add_google_dialog" width="50%" center>
	<div class="qcrode_intr">
		<div class="qcrode">
			<vue-qrs :text="qcrode_text" height="200" width="200"></vue-qrs>
		</div>
		<div class="introduce">
			<h3>{{$t("user['使用帮助']")}}</h3>
			<p>1.{{$t("user['使用帮助2']")}}</p>
			<p>2.{{$t("user['使用帮助3']")}}</p>
			<p>3.{{$t("user['使用帮助4']")}}</p>
			<p>4.{{$t("user['使用帮助4']")}}：{{qcrode_text}}</p>
			<p class="red">5.{{$t("user['使用帮助5']")}}</p>
		</div>
	</div>
	<el-form :model="add_google_form" label-width="0px">
		<el-form-item>
			<el-input v-model="add_google_form.txt" disabled></el-input>
		</el-form-item>
		<el-form-item>
			<el-input v-model="add_google_form.googlephone" :placeholder="$t(`user['google验证码']`)"></el-input>
		</el-form-item>
		<el-form-item>
			<el-input v-model="add_google_form.googlestartNum" :placeholder="$t(`user['手机验证码']`)">
				<template slot="append">
						<el-button type='success' @click='get_google_verification' :disabled='add_google_form.get'>{{$t('user["获取验证码"]')}}</el-button>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item align='center'>
			<el-button @click="cancel_pwd">{{$t('user["取消"]')}}</el-button>
			<el-button type="primary" @click="submit_google">{{$t('user["提交"]')}}</el-button>
		</el-form-item>
	</el-form>
</el-dialog>
<!--登录 + google 验证-->
<el-dialog @close='oc_form_google={}' :title="user_account.isgoogle ? $t(`user['关闭google登录验证']`) : $t(`user['开启google登录验证']`)" :visible.sync="oc_google_dialog" width="40%" center>
	<el-form :model="oc_form_google" label-width="0px">
		<el-form-item>
			<el-input v-model="oc_form_google.googlephone" :placeholder="$t(`user['goole动态验证码']`)">
			</el-input>
		</el-form-item>
		<el-form-item align='center'>
			<el-button @click="cancel_pwd">{{$t('user["取消"]')}}</el-button>
			<el-button type="primary" @click="oc_submit_google">{{$t('user["提交"]')}}</el-button>
		</el-form-item>
	</el-form>
</el-dialog>
</div>
</template>
<script>
	import Post from '@/api/post';
	import VueQrs from 'vue-qr';
	import MD5 from 'js-md5'
	export default {
		components: {
			VueQrs
		},
		data() {
			return {
				headPortrait: '',
				nationalEmblem: '',
				people: '',
				primary_form: {},
				senior_form: {},
				PrimaryVisible: false,
				SeniorVisible: false,
				qcrode_text: '',
				nowUser: 'user',
				fullscreenLoading: false,
				/*--------  手机登录加验证码 B  -----------*/
				oc_phone_dialog: false,
				oc_form_phone: {
					verificationPhone: '',
					get: false
				},
				/*--------  手机登录加验证码 E  -----------*/
				/*--------  邮箱登录加验证码 B  -----------*/
				oc_email_dialog: false,
				oc_form_email: {
					verificationPhone: '',
					get: false
				},
				/*google 登录验证*/
				oc_google_dialog: false,
				oc_form_google: {
					googlephone: ''
				},
				trade_dialog: false,
				/*--------  邮箱登录加验证码 E  -----------*/
				phone_dialog: false,
				add_user_dialog: false,
				user_dialog: false,
				centerDialogVisible: false,
				email_dialog: false,
				form: {
					name: ''
				},
				trade_form: {
					tradPassword: '',
					old_tradPassword: '',
					agree_tradPassword: '',
					pass: '',
				},
				/*用户昵称修改*/
				username_form: {
					nickName: ''
				},
				form_email: {
					mail: '',
					emaila: '',
					get: false
				},
				form_phone: {
					phone: '',
					verificationPhone: "",
					get: false
				},
				edit_form: {
					password: "",
					verificationPhone: "",
					get: false
				},
				addKidUsers: {
					kidName: '',
					kidPassword: '',
					kidMainPass: '',
					get: false
				},
				add_google_dialog: false,
				add_google_form: {
					get: false,
					userName: '',
					googlephone: '',
					googlestartNum: ''
				},
				user_account: {}, //用户数组
				email_regular: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
				phone_regular: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
			}
		},
		methods: {
			check_login(id) {
				this.fullscreenLoading = true;
				Post({
					url: 'log/changLogin',
					data: {
						id: id
					},
					success: res => {
						this.fullscreenLoading = true;
						if (res.code == 0) {
							this.$message({
								showClose: true,
								message: '切换成功',
								type: 'success'
							});
							this.init();
						} else {
							this.$message({
								showClose: true,
								message: res.message,
								type: 'error'
							});
						}
					},
					fail: res => {
						this.fullscreenLoading = true;
					}
				})

			},
			check1() {
				var user = this.$store.state.user;
				if (user.realName && user.iDCardNo || this.check2()) {
					return true
				} else {
					return false
				}
			},
			check2() {
				var lt = this.$store.state.user;
				if (lt.certificatePath1 && lt.certificatePath2 && lt.certificatePath3) {
					return true
				} else {
					return false
				}
			},
			submit_upload_img() {
				if (!this.headPortrait || !this.nationalEmblem || !this.people) {
					this.$message({
						showClose: true,
						message: '资料不全',
						type: 'error'
					});
					return
				}
				this.SeniorVisible = false;
				this.init();
				this.$message({
					showClose: true,
					message: '资料提交成功',
					type: 'success'
				});
			},
			delimg1() {
				this.headPortrait = '';
				this.$refs.upload1.clearFiles();
			},
			delimg2() {
				this.nationalEmblem = '';
				this.$refs.upload2.clearFiles();
			},
			delimg3() {
				this.people = '';
				this.$refs.upload3.clearFiles();
			},
			/*初始化页面*/
			pushImg1(file, fileList) {
				this.headPortrait = file.url;
			},
			pushImg2(file, fileList) {
				this.nationalEmblem = file.url;
			},
			pushImg3(file, fileList) {
				this.people = file.url;
			},
			open_senior() {
				this.SeniorVisible = true;
				this.headPortrait = this.$store.state.user.certificatePath1 || '';
				this.nationalEmblem = this.$store.state.user.certificatePath2 || '';
				this.people = this.$store.state.user.certificatePath3 || '';
				this.$refs.upload1.clearFiles();
				this.$refs.upload2.clearFiles();
				this.$refs.upload3.clearFiles();
			},
			//高级认证
			open_primary() {
				this.PrimaryVisible = true;
				this.primary_form = JSON.parse(JSON.stringify(this.$store.state.user));
			},
			init() {
				this.fullscreenLoading = true;
				Post({
					url: 'log/getSessionUser',
					success: res => {
						this.fullscreenLoading = false;
						if (res.code === 0) {
							this.user_account = res.data;
							this.$store.commit('SET_TYPEN', res.data);
						} else {
							this.$router.push({
								'path': '/login'
							})
						}
					},
					fail: res => {
						this.fullscreenLoading = false;
					}

				})
			},
			/*封装打开遮罩*/
			open_dialog(dialog) {
				this[dialog] = true;
			},
			/*封装验证码获取*/
			get_verification(url, data, str, type) {
				if (this[str]['get']) {
					this.$message({
						showClose: true,
						message: '验证码已发送,' + '请' + (60 - (this[str]['time'])) + '后重试',
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
					Post({
						url: 'log/phoneIsRepeat',
						data: {
							phone: data.userName,
							a: 0
						},
						success: res => {
							if (res.code === 0) {
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
							} else {
								this.$message({
									showClose: true,
									message: res.data,
									type: 'error'
								});
							}
						}
					})
				}
				if (this.email_regular.test(data.userName)) {
					Post({
						url: 'log/emailIsRepeat',
						data: {
							email: data.userName,
							a: 0
						},
						success: res => {
							if (res.code === 0) {
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
							} else {
								this.$message({
									showClose: true,
									message: res.data,
									type: 'error'
								});
							}
						}
					})
				}
			},
			/*封装提交变更*/
			submit_verification(url, data, dialog) {
				for (var k in data) {
					if (data[k] === '') {
						this.$message({
							showClose: true,
							message: '输入内容有误',
							type: 'error'
						});
						return
					}
				}
				this.fullscreenLoading = true;
				Post({
					url: 'log/' + url,
					data: data,
					success: res => {
						this.fullscreenLoading = false;
						if (res.code == 0) {
							this.$message({
								showClose: true,
								message: res.data,
								type: 'success'
							});
							this[dialog] = false;
							this.init()
						} else {
							this.$message({
								showClose: true,
								message: res.data,
								type: 'error'
							});
						}
					},
					fail: res => {
						this.fullscreenLoading = false;
					}
				})
			},
			/**/
			submit_primary_email() {
				this.submit_verification('addUserIDCard', {
					realName: this.primary_form.realName,
					iDCardNo: this.primary_form.iDCardNo,
				}, 'PrimaryVisible')
			},
			submit_addKidUsers() {
				this.submit_verification('addKidUsers', {
					kidName: this.addKidUsers.kidName,
					kidPassword: MD5(this.addKidUsers.kidPassword),
					kidMainPass: MD5(this.addKidUsers.kidMainPass),
					leng: Math.floor(Math.random() * 10000),
				}, 'add_user_dialog');
			},
			cancel_pwd() {
				this.centerDialogVisible = false;
				this.email_dialog = false;
				this.oc_phone_dialog = false;
				this.oc_email_dialog = false;
				this.oc_form_email = false;
				this.phone_dialog = false;
				this.add_user_dialog = false;
				this.user_dialog = false;
				this.trade_dialog = false;
				this.add_google_dialog = false;
				this.oc_google_dialog = false;
				this.PrimaryVisible = false;
				this.SeniorVisible = false;
			},
			edit_user(data, event) {
				this.user_dialog = true;
				this.username_form.id = data.id;
				this.username_form.nickName = data.nickName;
				event.preventDefault = true; //阻止默认事件（原生方法）
				event.stop; //阻止冒泡（原声方法）
				return false
			},
			/*开启 or 关闭邮箱登录登录验证*/
			oc_get_email_verification() {
				this.get_verification('getEmailVerificationCode1', {
					userName: this.$store.state.user.email
				}, 'oc_form_email', 'email')
			},
			oc_submit_email() {
				this.submit_verification('updEmailStart', {
					userName: this.oc_form_email.verificationPhone
				}, 'oc_email_dialog')
			},
			/*开启 or 关闭手机号登录验证*/
			oc_get_phone_verification() {
				this.get_verification('getVerificationCode', {
					userName: this.$store.state.user.phone,
					title: '更改登录验证'
				}, 'oc_form_phone', 'phone');
			},
			oc_submit_phone() {
				this.submit_verification('updPhoneStart', {
					userName: this.oc_form_phone.verificationPhone
				}, 'oc_phone_dialog')
			},
			/*修改手机号*/
			get_phone_verification() {
				this.get_verification('getVerificationCode', {
					userName: this.form_phone.phone,
					title: '修改手机号码'
				}, 'form_phone', 'phone');
			},
			submit_phone() {
				this.submit_verification('updPhone', {
					id: this.user_account.id,
					phone: this.form_phone.phone,
					verificationPhone: this.form_phone.verificationPhone
				}, 'phone_dialog')
			},
			/*修改邮箱*/
			get_email_verification() {
				this.get_verification('getEmailVerificationCod', {
					userName: this.form_email.mail
				}, 'form_email', 'email');
			},
			submit_auth_email() {
				this.submit_verification('updEmail', {
					id: this.user_account.id,
					mail: this.form_email.mail,
					emaila: this.form_email.emaila
				}, 'email_dialog')
			},
			/*修改密码*/
			get_pwd_verification() {
				this.get_verification('getVerificationupdPass', {}, 'edit_form');
			},
			submit_pwd() {
				if (this.edit_form.new_password !== this.edit_form.password) {
					this.$message({
						showClose: true,
						message: '新密码2次输入不一致',
						type: 'error'
					});
					return
				}
				this.submit_verification('updPassword', {
					id: this.$store.state.user.id,
					oldpassword: MD5(this.edit_form.old_password),
					password: MD5(this.edit_form.password),
					verificationPhone: this.edit_form.verificationPhone,
				}, 'centerDialogVisible')
			},
			/*修改用户昵称*/
			submit_username() {
				this.submit_verification('updUserNickName', {
					nickName: this.username_form.nickName,
					pass: MD5(this.username_form.pass),
					id: this.username_form.id
				}, 'user_dialog')
			},
			/*修改交易密码*/
			submit_trade() {
				if (this.trade_form.tradPassword !== this.trade_form.new_tradPassword) {
					this.$message({
						showClose: true,
						message: '新密码2次输入不一致',
						type: 'error'
					});
					return
				}
				this.submit_verification('updUserNickName', {
					tradPassword: MD5(this.trade_form.tradPassword), //新交易密码
					login_password: MD5(this.trade_form.login_password), //旧交易密码
					pass: MD5(this.trade_form.pass),
					id: this.$store.state.user.id
				}, 'trade_dialog')
			},
			open_google() {
				this.add_google_dialog = true;
				Post({
					url: 'log/findgoogleNum',
					success: res => {
						console.log(res);
						if (res.code === 0) {
							this.qcrode_text = res.data.googleAuthenticator;
							this.add_google_form.txt = res.data.googleAuthenticator
						}
					}
				})
			},
			get_google_verification() {
				this.get_verification('getPhoneOrEmailVerification', {
					userName: this.$store.user.phone,
					title: 'google 认证'
				}, 'add_google_form', 'phone');
			},
			submit_google() {
				this.submit_verification('updUserNickName', {
					googlephone: this.add_google_form.googlephone,
					googlestartNum: this.add_google_form.googlestartNum,
				}, 'add_google_dialog')
			},
			/*谷歌 登录验证*/
			oc_submit_google() {
				this.submit_verification('updgoogleStart', {
					googlephone: this.oc_form_google.googlephone,
				}, 'oc_google_dialog')
			}
		},
		created() {
						this.init()
		}

	}

</script>
<style>
	.upload-imgList {
		width: 148px;
		height: 148px;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.upload-imgList img {
		width: 100%;
	}

	.upload-imgList .el-icon-close {
		position: absolute;
		top: 0;
		right: 0;
		font-size: 18px;
		color: #000;
		cursor: pointer;
	}

	.pay-content {
		margin-bottom: 20px;
	}

	.pay_panel {
		padding: 18px;
	}

	.users {
		width: 526px;
		height: 76px;
		display: -ms-flexbox;
		display: -webkit-box;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		border-radius: 3px;
		border: 3px solid #f2f2f2;
		padding: 10px;
		position: relative;
		overflow: hidden;
		float: left;
		margin: 8px 10px;
	}

	.avatar {
		margin-right: 10px;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		overflow: hidden;
		position: relative;
	}

	.info p {
		font-size: 14px;
		color: #000;
		margin: 8px 0
	}

	.orange {
		display: inline-block;
		margin-left: 8px;
		color: #ff9d11;
		font-size: 12px;
		cursor: pointer
	}

	.current {
		border-color: #ff9d11;
	}

	.pay_panel .safe-info {
		margin-top: -20px;
	}

	.pay_panel .safe-info li {
		display: -ms-flexbox;
		display: -webkit-box;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		padding: 25px 0;
		position: relative;
		color: #999;
		border-bottom: 1px solid #f2f3f5;
	}

	.safe-info li .l,
	.safe-info li .r {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}

	.safe-info li h3 {
		width: 250px;
		color: #000;
		font-size: 13px;
	}

	.safe-info li p {
		color: #999;
		width: 150px;
	}

	.safe-info li p .auth {
		color: #31C871;
	}

	.safe-info li p .ruo {
		color: red;
	}

	.pay_panel .safe-info li .r a {
		margin-left: 10px;
		color: #ff9d11;
	}

	.safe-info li .l,
	.safe-info li .r {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}

	.new-account {
		cursor: pointer;
		border: 1px dashed #ddd;
		width: 526px;
		height: 76px;
		border-radius: 3px;
		padding: 10px;
		position: relative;
		overflow: hidden;
		float: left;
		margin: 8px 10px;
		padding-left: 20px;
	}

	.new-account:hover {
		border-color: #ff9d11
	}

	.new-account h4 {
		margin-top: 10px;
		font-weight: 700;
		color: #555;
	}

	.new-account p {
		color: #aaa;
		margin-top: 8px;
	}

	.qcrode_intr {
		padding: 0 0px;
		display: -ms-flexbox;
		display: -webkit-box;
		display: flex;
		margin-top: -20px;
		margin-bottom: 10px;
		justify-content: center;
	}

	.qcrode {
		webkit-box-flex: 0;
		-ms-flex: none;
		flex: none;
		margin-right: 20px;
		width: 200px;
	}

	.qcrode img {
		width: 200px;
		height: 200px;
	}

	.introduce {
		width: 370px;
	}

	.introduce h3 {
		font-size: 14px;
		color: #333;
		font-weight: 700;
		margin-bottom: 5px;
	}

	.introduce p {
		line-height: 1.5;
		color: #888;
		font-size: 12px;
		margin-bottom: 4px;
	}

	.introduce p.red {
		color: rgb(255, 0, 0);

	}

</style>
