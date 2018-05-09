<template>
<div class="exx-entrance">
	<div class="bgc_canvas">
		<my-canvas></my-canvas>
	</div>
    <div class="exx-entrance-main"  v-loading.fullscreen.lock="fullscreenLoading">
        <div class="exx-entrance-head">
            <h3>{{$t('login["注册"]')}}</h3>
        </div>
        <div id="logBox" class="exx-entrance-body">
            <div class="form-box">
                <div class="form-group">
                    <div id="nikeForm" class="form-control">
                        <input autocomplete="off" :placeholder="$t(`login['手机/邮箱/用户名']`)" type="text" v-model='form.userName'/>
                    </div>
                </div>
                <div class="form-group">
                    <div id="passwordForm" class="form-control">
                    <input autocomplete="new-password" :placeholder="$t(`login['登录密码']`)" type="password"  v-model='form.password'/>
                    </div>
                </div>
                <div class="form-group">
                    <div id="passwordForm" class="form-control">
                    <input autocomplete="new-password" :placeholder="$t(`login['确认密码']`)" type="password"  v-model='form.else_password'/>
                    </div>
                </div>
                <div  class="form-group">
                    <div id="nikeForm" class="form-control">
                        <input autocomplete="off" :placeholder="$t(`login['输入验证码']`)" type="text" v-model='form.verficationCode'/>
                        <!---->
                        <el-button type='success' :disabled='form.get' style='position:absolute;top:1px;right:0' @click='get_number'>{{$t('login["获取验证码"]')}}</el-button>
                    </div>
                </div>	
                <div class="form-button"><button type="button" class="button" @click='register'><span>{{$t('login["注册"]')}}</span></button></div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
    import myCanvas from './canvas'
    import Post from '@/api/post'
    import MD5 from 'js-md5'
    import {
        Loading
    } from 'element-ui';
    export default {
        components: {
            myCanvas
        },
        data() {
            return {
                form: {
                    userName: '',
                    password: '',
                    else_password: '',
                    verficationCode: '',
                    get: false,
                    introUser: ''
                },
                email_regular: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
                phone_regular: /^(0|86|17951)?(13[0-9]|15[012356789]|198|17[678]|18[0-9]|14[57])[0-9]{8}$/,
                fullscreenLoading: false,
                oc_email_dialog: true
            }
        },
        created() {
            
        },
        methods: {
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
                if (!this.email_regular.test(this[str]['userName']) && !this.phone_regular.test(this[str]['userName'])) {
                    this.$message({
                        showClose: true,
                        message: '手机或邮箱格式有误',
                        type: 'error'
                    });
                    return
                }
                if (this.phone_regular.test(this[str]['userName'])) {
                    Post({
                        url: 'log/phoneIsRepeat',
                        data: {
                            phone: data.userName,
                            a: 1
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
                if (this.email_regular.test(this[str]['userName'])) {
                    Post({
                        url: 'log/emailIsRepeat',
                        data: {
                            email: data.userName,
                            a: 1
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
            submit_verification(url, data, dialog) {
                for (var k in data) {
                    if (k !== 'introUser') {
                        if (data[k] === '') {
                            this.$message({
                                showClose: true,
                                message: '输入内容有误',
                                type: 'error'
                            });
                            return
                        }
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
                            this.$router.push({
                                path: '/user/number'
                            })
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
            get_number() {
                this.get_verification('getPhoneOrEmailVerification', {
                    userName: this.form.userName,
                    title: '注册账户'
                }, 'form');
            },
            register() {
                if (this.form.else_password !== this.form.password) {
                    this.$message({
                        showClose: true,
                        message: '两次密码不一致',
                        type: 'error'
                    });
                    return
                }
                this.submit_verification('registerUser', {
                    userName: this.form.userName,
                    password: MD5(this.form.password),
                    verficationCode: this.form.verficationCode,
                    introUser: this.$route.query.id || '',
                }, 'oc_email_dialog')
            }
        }
    }

</script>
<style scoped="true">
    .exx-entrance {
        height: 600px;
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
