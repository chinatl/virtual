<template>
<div id="ex-account">
	<div class="exx-title">
		<h2>我的资料</h2>
	</div>
	<div class="ex-account">
		<div class="account-info">
			<div class="user-info">
				<div class="user-avatar">
					<div class="user-face"><span class="unick"><img  style="border-radius: 50%;"></span></div>
					<div class="user-box">
						<p class="uname">王XX</p>
					</div>
				</div>
				<div class="circle-box">
					<div class="circle"><span class="num">0</span> <span>交易次数</span></div>
					<div class="circle"><span class="num">0分钟</span> <span>平均放行</span></div>
				</div>
				<div class="auth-box">
					<div class="auth-item">
						<p>邮箱认证</p>
						 <router-link to='/user/number' class="nobind"  v-if='!$store.state.user.email'>未认证</router-link> 
						 <span class="bind" v-if='$store.state.user.email'>已认证</span>
						 </div>
					<div class="auth-item">
						<p>手机号认证</p> <span class="bind">已认证</span></div>
					<div class="auth-item">
						<p>首次交易时间</p> <span>尚未交易</span></div>
				</div>
			</div>
		</div>
		<div class="account-bind">
			<div class="bind-item">
				<div class="bind-in"><span class="bind-title">实名认证</span>
					<p class="bind-desc">您已经通过高级实名认证，实名认证后不能更改。</p> <span class="btn bind">已认证</span></div>
				<!---->
			</div>
			<div class="bind-item">
				<div class="bind-in"><span class="bind-title">昵称</span>
					<p class="bind-desc">王XX</p> <a class="btn bind">已设置</a></div>
			</div>
			<!---->
			<div class="bind-item">
				<div class="bind-in"><span class="bind-title">银行卡账号</span>
                <p class="bind-desc">{{ $store.state.user.lt.userBankCard ? $store.state.user.lt.userBankCard :  '个人银行卡信息未绑定' }}</p>
					 <a class="btn nobind" 
                        v-if='!$store.state.user.lt.userBankCard'
					 @click='open_auth_card'>未绑定</a>
					 <a class="btn bind" v-if='$store.state.user.lt.userBankCard'>已绑定</a>
                 </div>
			</div>
			<div class="bind-item">
				<div class="bind-in"><span class="bind-title">支付宝账号</span>
					<p class="bind-desc"  v-if='!$store.state.user.lt.userWechar'>支付宝账号未绑定</p>
                    <p class="bind-desc"  v-if='$store.state.user.lt.userWechar'>支付宝账号已绑定</p> 
					    <a class="btn nobind" @click='open_auth_ant' 
					     v-if='!$store.state.user.lt.userAlipay'>未绑定</a>
					    <a class="btn bind" @click='open_auth_ant' 
					     v-if='$store.state.user.lt.userAlipay'>已绑定</a>
					</div>
			</div>
			<div class="bind-item">
				<div class="bind-in"><span class="bind-title">微信账号</span>
					<p class="bind-desc"   v-if='!$store.state.user.lt.userWechar'>微信账号未绑定</p> 
					<p class="bind-desc"   v-if='$store.state.user.lt.userWechar'>微信账号已绑定</p> 
                    <a class="btn nobind" 
                     v-if='!$store.state.user.lt.userWechar'
					@click='open_auth_wechat'>未绑定</a>
                    <a class="btn nobind" 
                     v-if='$store.state.user.lt.userWechar'
					@click='open_auth_wechat'>已绑定</a>
                </div>
			</div>
		</div>
	</div>
	<!-- 银行卡信息绑定 -->
	<el-dialog title="银行卡账号绑定" 
	@close='form_card={}'
	:visible.sync="email_dialog" width="40%" center>
		<el-form ref="form" :model="form_card" label-width='140px'>
			<el-form-item label='银行卡开户名：'>
				<el-input v-model="form_card.userBankUse" placeholder='银行卡开户名'></el-input>
			</el-form-item>
			<el-form-item label='开户银行：'>
				  <el-select v-model="form_card.userBank" filterable placeholder="请选择" style='width:100%'>
					<el-option value='中国邮政银行' label='中国邮政银行'></el-option>
					<el-option value='中国建设银行' label='中国建设银行'></el-option>
					<el-option value='中国农业银行' label='中国农业银行'></el-option>
					<el-option value='中国招商银行' label='中国招商银行'></el-option>
					<el-option value='中国银行' label='中国银行'></el-option>
					<el-option value='交通银行' label='交通银行'></el-option>
					<el-option value='广东发展银行' label='广东发展银行'></el-option>
					<el-option value='中信银行' label='中信银行'></el-option>
					<el-option value='光大银行' label='光大银行'></el-option>
					<el-option value='浦发银行' label='浦发银行'></el-option>
					<el-option value='中国民生银行' label='中国民生银行'></el-option>
					<el-option value='兴业银行' label='兴业银行'></el-option>
					<el-option value='平安银行' label='平安银行'></el-option>
					<el-option value='华夏银行' label='华夏银行'></el-option>
				  </el-select>
			</el-form-item>
			<el-form-item label='银行卡卡号 ：'>
				<el-input v-model="form_card.userBankCard" placeholder='银行卡卡号 '></el-input>
			</el-form-item>
			<el-form-item label='银行预留手机号码：'>
				<el-input v-model="form_card.userBankPhone" placeholder='银行预留手机号码'></el-input>
			</el-form-item>
<el-form-item align='right'>
<!--    <el-button @click="cancel_pwd">取消</el-button>-->
    <el-button type="primary" @click="submit_auth_card">提交</el-button>
</el-form-item>
</el-form>
</el-dialog>
<!--支付宝信息-->
<el-dialog title="支付宝账号绑定" :visible.sync="ant_dialog" width="40%" center>
    <el-form label-width='160px'>
        <el-form-item label='支付宝收款二维码：'>
            <el-upload class="avatar-uploader" ref="upload_ant" :auto-upload="false" :data="ant_data" 
              :limit='1'
                 :on-error = 'handleerror'
                 name='userAlipay'
               action="/legalTender/addLegalTenderUser" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item align='right'>
            <el-button @click="cancel_pwd">取消</el-button>
            <el-button type="primary" @click="submit_auth_ant">提交</el-button>
        </el-form-item>
    </el-form>
</el-dialog>
<!--微信认证-->
<el-dialog title="微信账号绑定" :visible.sync="wechat_dialog" width="40%" center>
    <el-form label-width='160px'>
        <el-form-item label='微信收款二维码：'>
            <el-upload class="avatar-uploader"
                name='userBankCard'
              ref="upload_wechat" :auto-upload="false" :data="wechat_data" action="/legalTender/addLegalTenderUser" :show-file-list="true" :on-success="handleAvatarSuccess"
              :on-error = 'handleerror'
               :limit='1'
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item align='right'>
            <el-button @click="cancel_pwd">取消</el-button>
            <el-button type="primary" @click="submit_auth_wechat">提交</el-button>
        </el-form-item>
    </el-form>
</el-dialog>
</div>
</template>
<script>
    import Get from '@/api/get';
    import Post from '@/api/post';
    export default {
        data() {
            return {
                loading: false,
                imageUrl: null,
                ant_data: {

                },
                wechat_data: {

                },
                email_dialog: false,
                wechat_dialog: false,
                ant_dialog: false,
                form_card: {
                    userBankCard: "", //银行卡卡号 
                    userBank: "", // 所在银行
                    userBankUser: "", //银行卡持有人
                    userBankPhone: "", //银行卡所绑定的手机号
                },
                form_ant: {

                },
                email_regular: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
                phone_regular: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
            }
        },
        methods: {

            /*封装验证码获取*/
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
            open_auth_ant() {
                this.ant_dialog = true;
            },
            /*提交支付宝图片上传*/
            submit_auth_ant() {
                this.loading = true;
                this.$refs.upload_ant.submit();
            },
            open_auth_wechat() {
                this.wechat_dialog = true
            },
            /*提交微信图片上传*/
            submit_auth_wechat() {
                this.loading = true;
                this.$refs.upload_wechat.submit();
            },
            open_auth_card() {
                this.email_dialog = true
            },
            submit_auth_card() {
                this.submit_verification('legalTender/addLegalTenderUser', {
                    userBankCard: this.form_card.userBankCard,
                    userBank: this.form_card.userBank,
                    userBankUser: this.form_card.userBankUser,
                    userBankPhone: this.form_card.userBankPhone,
                }, 'email_dialog')
            },
            cancel_pwd() {
                this.email_dialog = false;
                this.ant_dialog = false;
                this.wechat_dialog = false;
            },
            handleAvatarSuccess(res, file) {
                this.loading = false;
                this.wechat_dialog = false;
                this.ant_dialog = false;
                this.imageUrl = URL.createObjectURL(file.raw);
                this.$message({
                    showClose: true,
                    message: '上传成功',
                    type: 'success'
                });
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            handleerror() {
                this.loading = false;
                this.$message({
                    showClose: true,
                    message: '上传失败',
                    type: 'success'
                });
            }
        }
    }

</script>
<style>
    /*用户信息*/

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 150px;
        height: 150px;
        line-height: 150px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .bind {
        color: #31C871;
        font-size: 12px;
    }

    .nobind {
        color: #ff9d11;
        font-size: 12px;
    }

    .account-info {
        padding: 30px 30px;
        /*		margin-bottom: 20px;*/
        background: #fff;
        border-bottom: 1px dashed #ebeff5;
    }

    .account-info .bind {
        color: #31C871;
        font-size: 12px;
    }

    .account-info .nobind {
        color: #ff9d11;
        font-size: 12px;
    }

    .account-info .user-info {
        font-size: 12px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        line-height: 1.5;
    }

    .user-info .user-avatar {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        flex-grow: 1;
    }

    .user-info .user-avatar .user-face {
        height: 62px;
        width: 62px;
        box-shadow: 0 1px 5px 0 rgba(71, 78, 114, .24);
        position: relative;
        border-radius: 50%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .user-info .user-avatar .user-face,
    .user-info .user-avatar .user-face>.unick {
        border-radius: 50%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .user-info .user-avatar .user-face>.unick {
        background: #00b5f6;
        height: 56px;
        width: 56px;
        color: #fff;
    }

    .user-info .user-avatar .user-box {
        margin-left: 10px;
    }

    .user-info .user-avatar .user-box .uname {
        font-size: 14px;
        color: #242a4a;
    }

    .user-info .user-avatar .user-box .uid {
        color: #9194a5;
    }

    .user-info .circle-box {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        flex-grow: 1;
        justify-content: center;
    }

    .user-info .circle-box .circle {
        height: 76px;
        width: 76px;
        border-radius: 50%;
        border: 2px solid #ebeff5;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        color: #8994a3;
        margin-left: 10px;
        margin-right: 10px;
    }

    .user-info .circle-box .circle .num {
        color: #0d214e;
        font-weight: bolder;
    }

    .user-info .auth-box {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        justify-content: flex-end;
        flex-grow: 1;
    }

    .user-info .auth-box .auth-item {
        color: #8994a3;
        text-align: left;
        padding: 0 25px;
        border-left: 1px dotted #ddd;
    }

    .user-info .auth-box .auth-item p {
        margin-bottom: 4px;
    }

    /*其他信息*/

    .account-info .other-info {
        color: #8994a3;
        margin-top: 20px;
    }

    .account-info .other-info p {
        margin-bottom: 10px;
    }

    .account-bind .bind-item {
        margin-bottom: 10px;
    }

    .account-bind .bind-item .bind-in {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding: 15px 30px 15px 50px;
        background-color: white;
        -webkit-box-shadow: 0 2px 0 0 rgba(69, 112, 128, 0.06);
        box-shadow: 0 2px 0 0 rgba(69, 112, 128, 0.06);
        font-size: 14px;
        color: #242a4a;
    }

    .account-bind .bind-item .bind-in .bind-title {
        width: 142px;
        height: 40px;
        margin-right: 15px;
        border-right: 1px dashed #d0d5de;
        padding: 0 15px;
        line-height: 40px;
        text-align: left;
        display: inline-block;
    }

    .account-bind .bind-item .bind-in .bind-desc {
        width: 70%;
        color: grey;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .account-bind .bind-item .bind-in .btn {
        padding: 8px 10px;
        background: transparent;
        outline: none;
    }

    .account-bind .bind-item textarea {
        width: 100%;
        height: 120px;
        padding: 10px;
        border: 1px solid #e1e1e1;
    }

    .exx-form-box {
        width: 400px;
        margin: 15px auto;
    }

    .exx-form-group {
        position: relative;
        margin-bottom: 15px;
    }

    .exx-form-group label {
        color: #888;
        margin-bottom: 10px;
        display: block;
    }

    .exx-form-content {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        position: relative;
    }

    .exx-form-input {
        position: relative;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
    }

    .exx-form-input input:not([type=radio]):not([type=checkbox]) {
        width: 100%;
        display: block;
        height: 40px;
        padding: 0 8px;
        background: 0 0;
        outline: 0;
        color: #555;
        font-size: 14px;
        font-weight: 500;
        border: 1px solid #e1e1e1;
        border-radius: 0;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        -webkit-backface-visibility: hidden;
        -webkit-transition: -webkit-box-shadow .3s ease;
        transition: -webkit-box-shadow .3s ease;
        transition: box-shadow .3s ease;
        transition: box-shadow .3s ease, -webkit-box-shadow .3s ease;
    }

    .exx-form-group .code-num {
        position: absolute;
        top: 1px;
        right: 1px;
        bottom: 1px;
        width: 84px;
        border-left: 1px solid #e3e5e7;
        background-color: #f9f9f9;
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
    }

    .ex-upload-group .upload-item p {
        text-align: center;
        margin-bottom: 10px;
    }

    .exxbtn.btn-ok {
        background: #ff9d11;
    }

    .exxbtn {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        border: none;
        overflow: hidden;
        outline: 0;
        color: #fff;
        padding: 12px 15px;
        border-radius: 3px;
        display: inline-block;
        -webkit-box-shadow: none;
        box-shadow: none;
        font-size: 14px;
        text-align: center;
        white-space: nowrap;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

</style>
