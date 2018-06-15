<template>
<div class="pay_panel" >
	<div class="pay-content">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span style="font-size:14px;font-weight:bold">{{$t('account["资金"]')}}	</span>
				<div style="float: right;">
					<span style='margin-right:20px;font-size:14px'>{{$t('other["账户资产价值"]')}}：{{now_money}} CNY</span>
<!--					折算总金额(CNY) <span style='margin-left:20px'>VIP等级</span>-->
					<el-switch v-model='show0'  @change='checkout'></el-switch><span style="margin-left:10px">{{$t('other["隐藏小额资产"]')}}</span>
				</div>
			</div>
			<div class="select">
				<el-table :data="list" fit highlight-current-row border 
				v-loading="fullscreenLoading"
				style="width: 100%;">
					<el-table-column align="center" :label="$t(`account['币种']`)">
						<template slot-scope="scope">
							<span style='text-align:left;width:60px;display:inline-block'>
								<img :src="scope.row.markUrl" alt="" style='width:25px;vertical-align:bottom;margin-right:10px'><span>{{scope.row.shortName && scope.row.shortName.toUpperCase()}}</span>
							</span>
						</template>
</el-table-column>
<el-table-column align="center" :label="$t(`account['总额']`)" width='200'>
	<template slot-scope="scope">
						<span>{{(scope.row.vTotal + scope.row.frozenTotal) | filter_num}}</span>
						</template>
</el-table-column>
<!--
<el-table-column align="center" :label="$t(`account['折算总金额']`)">
    <template slot-scope="scope">
	<span>{{scope.row.vTotal}}</span>
	</template>
</el-table-column>
-->
<el-table-column align="center" :label="$t(`account['可用']`)" prop='date' width='150'>
	<template slot-scope="scope">
		<span>{{scope.row.vTotal | filter_num}}</span>
	</template>
</el-table-column>
<el-table-column align="center" :label="$t(`account['冻结']`)">
	<template slot-scope="scope">
		<span>{{scope.row.frozenTotal | filter_num}}</span>
	</template>
</el-table-column>
<el-table-column align="center" :label="$t(`account['操作']`)" width='250'>
	<template slot-scope="scope">
        <span class="cap_current" @click='included(scope.row)' v-if='$store.state.userAccount.length'>{{$t('account["划入"]')}}</span>
        
        <span class="cap_current" @click='draw(scope.row)' v-if='scope.row.vTotal && $store.state.userAccount.length'>{{$t('account["划出"]')}}</span>
        <span class="cap_no_current" v-if='!scope.row.vTotal || !$store.state.userAccount.length'>{{$t('account["划出"]')}}</span>
        <span :class="scope.row.isTopUp || $store.state.user.mainUsersId ? 'cap_no_current' : 'cap_current' ">
                <router-link :to='"/account/rechange?shortName="+scope.row.shortName' v-if='!scope.row.isTopUp &&  !$store.state.user.mainUsersId '>{{$t('account["充值"]')}}</router-link>
                <span v-if='scope.row.isTopUp || $store.state.user.mainUsersId'>{{$t('account["充值"]')}}</span>
        </span>
        <span :class="scope.row.isWithdrawal || $store.state.user.mainUsersId || !scope.row.vTotal ? 'cap_no_current' : 'cap_current' ">
            <router-link to='/account/currency' v-if='!scope.row.isWithdrawal && !$store.state.user.mainUsersId '>{{$t('account["提币"]')}}</router-link>
            <span v-if='scope.row.isWithdrawal  || $store.state.user.mainUsersId'>{{$t('account["提币"]')}}</span>
        </span>
        <span class="cap_current">
             <router-link :to='"/account/bill?shortName="+scope.row.shortName'>{{$t('account["账单"]')}}</router-link>
         </span>
    </template>
</el-table-column>
</el-table>
</div>
</el-card>
</div>
<el-dialog :title='$t(`other["内部划账"]`)' :visible.sync="dialogFormVisible" width='60%' @close='clearInput'>
	<div class='included'>
		<div class="include-item">
			<div class="img"></div>
			<div class="introduce">
				<el-dropdown @command="handleCommand">
					<div class="el-dropdown-link">
						<h3 style="width:100%;z-index:100">{{included_moren.nickName}}</h3>
						<p>可用{{now_market}}：{{number | filter_num}}</p>
						<i class="el-icon-arrow-down el-icon--right" style="position:absolute;right:-80px;top:0;z-index:20"></i>
					</div>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item :command="index" v-for='(item,index) in userArr'>{{item.nickName}}</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
		<div class="include-arrow">{{$t('other["转入"]')}}{{now_market}}{{$t('other["到"]')}}</div>
		<div class="include-item" style="border:2px dashed #d7d9dc">
			<div class="img"></div>
			<div class="introduce">
				<h3>{{$store.state.user.nickName}}</h3>
				<p>{{$t('other["可用"]')}}{{now_market}}：{{my_money | filter_num}}</p>
			</div>
		</div>
	</div>
	<el-form ref="form" :model="included_form" label-width="80px">
		<el-form-item :label='$t(`other["转入金额"]`)'>
			<el-input v-model="included_form.value"></el-input>
		</el-form-item>
		<el-form-item :label='$t(`other["登录密码"]`)'>
			<el-input v-model="included_form.password" type='password' :placeholder='$t(`other["请输入登陆密码"]`)'></el-input>
		</el-form-item>
		<el-form-item align='right'>
			<el-button type="primary" @click="onSubmit">{{$t('other["确定"]')}}</el-button>
		</el-form-item>
	</el-form>
</el-dialog>
<!--转出到-->
<el-dialog :title='$t(`other["内部划账"]`)' :visible.sync="draw_dialog" width='60%' @close='clearInput'>
	<div class='included'>
		<div class="include-item" style="border:2px dashed #d7d9dc">
			<div class="img"></div>
			<div class="introduce">
				<h3>{{$store.state.user.nickName}}</h3>
				<p>{{$t('other["可用"]')}}{{now_market}}：{{my_money | filter_num}}</p>
			</div>
		</div>
		<div class="include-arrow">{{$t('other["转入"]')}}{{now_market}}{{$t('other["到"]')}}</div>
		<div class="include-item">
			<div class="img"></div>
			<div class="introduce">
				<el-dropdown @command="handleCommand1">
					<div class="el-dropdown-link">
						<h3>{{included_moren.nickName}}</h3>
						<p>{{$t('other["可用"]')}}{{now_market}}：{{number}}</p>
						<i class="el-icon-arrow-down el-icon--right" style="position:absolute;right:-80px;top:0;z-index:20"></i>
					</div>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item :command="index" v-for='(item,index) in userArr'>{{item.nickName}}</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
	</div>
	<el-form :model="draw_form" label-width="80px">
		<el-form-item :label='$t(`other["转出金额"]`)'>
			<el-input v-model="draw_form.value"></el-input>
		</el-form-item>
		<el-form-item :label='$t(`other["登录密码"]`)'>
			<el-input v-model="draw_form.password" type='password' :placeholder='$t(`other["请输入登陆密码"]`)'></el-input>
		</el-form-item>
		<el-form-item align='right'>
			<el-button @click.native="submit_draw_form" type='success'>{{$t('other["确认"]')}}</el-button>
		</el-form-item>
	</el-form>
</el-dialog>
</div>
</template>
<script>
	import Get from '@/api/get'
	import Post from '@/api/post'
	import MD5 from 'js-md5'
	export default {
		data() {
			return {
				show0: false,
				userArr: [],
				included_moren: {},
				draw_moren: {},
				draw_form: {
					password: '',
					value: '',
				},
				included_form: {
					password: '',
					value: '',
				},
				fullscreenLoading: false,
				dialogFormVisible: false,
				draw_dialog: false,
				list: [],
				current_data: [],
				number: 0,
				now_market: '',
				virtualId: '',
				my_money: 0,
				now_money: '--'
			}
		},
		created() {
			this.init()
		},
		methods: {
			init() {
				Get({
					url: 'finance/selUser',
					success: res => {
						//					this.fullscreenLoading = false;
						if (res.code === 0) {
							this.userArr = res.data;
							if (res.data.length === 0) {
								return
							}
							this.included_moren = res.data[0];
							this.draw_moren = res.data[0];
						} else {
							this.$message({
								showClose: true,
								message: res.data,
								type: 'error'
							});
						}
					},
					fail: res => {
						//					this.fullscreenLoading = false;
					}
				});
				this.fullscreenLoading = true;
				Get({
					url: 'finance/selvirtualWallet',
					success: res => {
						this.fullscreenLoading = false;
						if (res.code === 0) {
							this.list = res.data;
							this.current_data = res.data;
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
				});
				Get({
					url: 'giveConfig/findUserAsset',
					success: res => {
						//					this.fullscreenLoading = false;
						if (res.code === 0) {
							this.now_money = res.data;
							//						this.current_data = res.data;
						} else {
							this.$message({
								showClose: true,
								message: res.data,
								type: 'error'
							});
						}
					},
					fail: res => {
						//					this.fullscreenLoading = false;
					}
				})
			},
			checkout(e) {
				if (e) {
					var arr = this.current_data.filter(res => {
						return res.vTotal !== 0 || res.frozenTotal !== 0
					})
					this.list = JSON.parse(JSON.stringify(arr))
				} else {
					this.list = JSON.parse(JSON.stringify(this.current_data))
				}
				console.log(this.list)
			},
			clearInput() {
				this.draw_form = {
					password: '',
					value: '',
				};
				this.included_form = {
					password: '',
					value: '',
				}
			},
			submit_draw_form() {
				if (this.draw_form.value <= 0) {
					this.$message({
						showClose: true,
						message: "请转出大于0的数",
						type: 'error'
					});
					return
				}
				this.fullscreenLoading = true;
				Post({
					url: 'finance/updvirtualWalletIn',
					data: {
						toUserId: this.draw_moren.id,
						fromUserId: this.$store.state.user.id,
						virtualId: this.virtualId,
						value: this.draw_form.value,
						password: MD5(this.draw_form.password),
					},
					success: res => {
						this.fullscreenLoading = false;
						if (res.code === 0) {
							this.draw_dialog = false;
							this.init();
							this.$message({
								showClose: true,
								message: res.data,
								type: 'success'
							});
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
			onSubmit(e) {
				if (this.included_form.value <= 0) {
					this.$message({
						showClose: true,
						message: "请转出大于0的数",
						type: 'error'
					});
					return
				}
				this.fullscreenLoading = true;
				Post({
					url: 'finance/updvirtualWalletIn',
					data: {
						fromUserId: this.included_moren.id,
						toUserId: this.$store.state.user.id,
						virtualId: this.virtualId,
						value: this.included_form.value,
						password: MD5(this.included_form.password),
					},
					success: res => {
						this.fullscreenLoading = false;
						if (res.code === 0) {
							this.dialogFormVisible = false;
							this.init()
							this.$message({
								showClose: true,
								message: res.data,
								type: 'success'
							});
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

			handleCommand(i) {
				this.fullscreenLoading = true;
				this.included_moren = this.userArr[i];
				Get({
					url: 'finance/selWalletByv',
					data: {
						userId: this.userArr[i].id,
						virtualId: this.virtualId,
					},
					success: res => {
						this.fullscreenLoading = false;
						if (res.code === 0) {
							this.number = res.data;
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
			handleCommand1(i) {
				this.fullscreenLoading = true;
				this.draw_moren = this.userArr[i];
				Get({
					url: 'finance/selWalletByv',
					data: {
						userId: this.userArr[i].id,
						virtualId: this.virtualId,
					},
					success: res => {
						this.fullscreenLoading = false;
						if (res.code === 0) {
							this.number = res.data;
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
			sel_user_id(virtualId) {
				this.fullscreenLoading = true;
				this.virtualId = virtualId;
				Get({
					url: 'finance/selWalletByv',
					data: {
						userId: this.included_moren.id,
						virtualId: virtualId,
					},
					success: res => {
						this.fullscreenLoading = false;
						if (res.code === 0) {
							this.number = res.data;
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
			included(data) {
				this.my_money = data.vTotal
				this.now_market = data.shortName;
				this.sel_user_id(data.virtualId);
				this.dialogFormVisible = true
			},
			draw(data) {
				this.my_money = data.vTotal
				this.now_market = data.shortName;
				this.sel_user_id(data.virtualId);
				this.draw_dialog = true
			}
		}
	}

</script>
<style scoped="true">
	.pay_panel {
		padding: 18px;
	}

	.select ul {
		border-left: 1px solid #ccc;
		border-top: 1px solid #ccc;
		overflow: hidden
	}

	.select ul li {
		border-right: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
		width: 100px;
		padding-left: 20px;
		float: left;
		height: 40px;
		line-height: 40px;
		cursor: pointer;
		font-weight: bold
	}

	.pay-content {
		margin-bottom: 20px;
	}

	.address {
		text-align: center
	}

	.address p {
		margin-top: 12px;
		color: #aaa;
	}

	.address .add {
		font-size: 16px;
		font-weight: bold;
		color: #000;
		margin-bottom: 10px
	}

	.address h5 {
		font-weight: 700;
		color: #666;
	}

	.address .orange {
		color: #ff9d11;
		cursor: pointer
	}

	.cap_current {
		color: #ff9d11;
		margin: 0 5px;
		cursor: pointer;
		font-weight: normal
	}

	.cap_no_current {
		text-decoration: line-through;
		color: #aaa;
		margin: 0 5px;
		pointer-events: none;
		font-weight: normal
	}

	.included {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-bottom: 20px;
	}

	.include-item {
		padding: 15px 10px 15px 60px;
		height: 68px;
		position: relative;
		border-radius: 3px;
		border: 2px dashed #f9b23c;
		width: 300px;
		display: flex;
	}

	.include-item div.img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		overflow: hidden;
		position: absolute;
		left: 10px;
		top: 0;
		bottom: 0;
		margin: auto 0;
		border: 1px solid #ddd;
	}

	.include-item div.img img {
		width: 40px;
		border-radius: 50%;
	}

	.include-item div.introduce h3 {
		color: #666;
		font-size: 14px;
		margin-top: -5px;
	}

	.include-item div.introduce p {
		color: #b3b7be;
		font-size: 12px;
	}

	.include-arrow {
		color: #ff9d11;
		border-bottom: 1px dashed currentColor;
		border-top: 1px dashed currentColor;
		padding: 0px 0;
		position: relative
	}

	.include-arrow:before {
		top: -4px;
		-webkit-transform: rotate(-45deg);
		transform: rotate(-45deg);
		content: "";
		position: absolute;
		right: 0px;
		height: 8px;
		width: 8px;
		border-right: 1px solid currentColor;
	}

	.include-arrow:after {
		content: "";
		position: absolute;
		right: 0;
		height: 8px;
		width: 8px;
		border-right: 1px solid currentColor;
		bottom: -4px;
		-webkit-transform: rotate(45deg);
		transform: rotate(45deg);
	}

</style>
