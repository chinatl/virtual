<template>
<div class="pan-currency" v-loading="fullscreenLoading">
	<div class="pay-content">
		<el-card class="box-card">
	    <div slot="header" class="clearfix">
		  	<span style="font-size:14px;font-weight:bold">{{$t('other["提币"]')}}</span>
			<div  style="float: right;margin-top:-9px">
			</div>
		  </div>
			<div class="select">
				<el-table :data="table_data" fit highlight-current-row border style="width: 100%">
					<el-table-column align="center" :label='$t(`other["币种名称"]`)'>
						<template slot-scope="scope">
						<span>{{scope.row}}</span>
						</template>
</el-table-column>
<el-table-column align="center" :label='$t(`other["地址管理"]`)'>
	<template slot-scope="scope">
							<span><el-button type='success' @click.native='address(scope.row)' size='mini'>{{$t('other["详情"]')}}</el-button></span>
						</template>
</el-table-column>

<!--
<el-table-column align="center" label="更新时间">
	<template slot-scope="scope">
						<span>{{scope.row}}</span>
						</template>
</el-table-column>
-->
<el-table-column align="center" :label="$t(`other['操作']`)" width='200'>
	<template slot-scope="scope">
<span><el-button type='success' @click.native='Withdrawals(scope.row)' size='mini'>{{$t('other["提现"]')}}</el-button></span>
</template>
</el-table-column>
</el-table>
</div>
</el-card>
</div>
<div class="pay-content">
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span style="font-size:14px;font-weight:bold">{{$t('other["提币记录"]')}}</span>
		</div>
		<div class="select">
			<el-table :data="record_data" v-loading='loading' fit highlight-current-row border style="width: 100%">
				<el-table-column align="center" :label="$t(`account['币种标识']`)">
					<template slot-scope="scope">
						<span>{{scope.row.shortName}}</span>
						</template>
				</el-table-column>
				<el-table-column align="center" :label="$t(`account['类型']`)">
					<template slot-scope="scope">
						<span>{{scope.row.type === 1 ? $t(`other["类型"]`) : $t(`other["类型"]`)}}</span>
						</template>
				</el-table-column>
				<el-table-column align="center" :label="$t(`account['确认次数']`)">
					<template slot-scope="scope">
						<span>{{scope.row.confirmationNum}}</span>
						</template>
				</el-table-column>
				<el-table-column align="center" :label="$t(`account['到账状态']`)">
					<template slot-scope="scope">
						<span>{{scope.row.accountStatus == 0 ?  $t(`else['未到账']`) : $t(`else['已到账']`) }}</span>
						</template>
				</el-table-column>
				<el-table-column align="center" :label="$t(`account['充值金额']`)">
					<template slot-scope="scope">
						<span>{{scope.row.rechargeNum | filter_num}}</span>
						</template>
				</el-table-column>
				<el-table-column align="center" :label="$t(`account['处理时间']`)">
					<template slot-scope="scope">
						<span>{{scope.row.time}}</span>
						</template>
				</el-table-column>
			</el-table>
			<div class="block" style="text-align:right;margin:10px 0">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="formInline.pageNo" :page-sizes="[5, 10, 15, 20]" :page-size="formInline.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
	</el-card>
</div>
<el-dialog :title="$t(`account['提现']`)" :visible.sync="dialogFormVisible" width='30%' :close='close'>
	<el-form ref="form" :model="form" label-width="120px">
		<el-form-item :label="$t(`account['冲向地址']`)">
			<el-select v-model="form.address" style='width:100%'>
				<el-option :label='item.address' :value='item.address' v-for='item in options'></el-option>
			</el-select>
		</el-form-item>
		<el-form-item :label="$t(`account['金额']`)">
			<el-input v-model="form.value"></el-input>
		</el-form-item>
		<el-form-item :label="$t(`user['手机验证码']`)">
			<el-input v-model="form.phone"></el-input>
		</el-form-item>
		<el-form-item :label="$t(`user['邮箱验证码']`)">
			<el-input v-model="form.email"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button @click='cancel'>{{$t(`account['取消']`)}}</el-button>
			<el-button type="primary" @click="onSubmit">{{$t(`account['确定']`)}}</el-button>
		</el-form-item>
	</el-form>
</el-dialog>

<el-dialog :title="$t(`account['我的地址']`)" :visible.sync="editVisible" width='50%' :close='close'>
	<div style="margin:10px 0">
		<el-button @click='add' type='primary' size='small'>{{$t(`account['添加地址']`)}}</el-button>
	</div>
	<el-table :data="add_data" v-loading='addloading' fit highlight-current-row border style="width: 100%">
		<el-table-column align="center" :label="$t(`account['币种']`)">
			<template slot-scope="scope">
				<span>{{scope.row.type}}</span>
				</template>
		</el-table-column>
		<el-table-column align="center" :label="$t(`account['冲向地址']`)">
			<template slot-scope="scope">
				<span>{{scope.row.address}}</span>
				</template>
		</el-table-column>
		<el-table-column align="center" :label="$t(`account['备注']`)">
			<template slot-scope="scope">
				<span>{{scope.row.remark}}</span>
				</template>
		</el-table-column>
		<el-table-column align="center" :label="$t(`account['创建时间']`)">
			<template slot-scope="scope">
				<span>{{scope.row.createtime | parseTime('{y}-{m}-{d}')}}</span>
				</template>
		</el-table-column>
		<el-table-column align="center" :label="$t(`account['操作']`)">
			<template slot-scope="scope">
					<el-button @click='del(scope.row.id)' type='danger' size='small'>{{$t(`account['删除']`)}}</el-button>
				</template>
		</el-table-column>
	</el-table>
	<el-dialog :title="$t(`account['添加地址']`)" :visible.sync="addVisible" width='30%' @close='close' append-to-body :close='close'>
		<el-form ref="form" :model="add_form" label-width="120px">
			<el-form-item :label='$t(`other["冲向地址:"]`)'>
				<el-input v-model="add_form.address"></el-input>
			</el-form-item>
			<el-form-item :label='$t(`other["备注:"]`)'>
				<el-input v-model="add_form.remark"></el-input>
			</el-form-item>
			<el-form-item align='right'>
				<el-button @click='agree_add' type='success' size='small'>{{$t(`account['确定']`)}}</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
</el-dialog>

</div>
</template>
<script>
	import Post from '@/api/post'
	import Get from '@/api/get'
	export default {
		data() {
			return {
				phone: '',
				email: '',
				add_form: {},
				editVisible: false,
				options: [],
				addloading: false,
				addVisible: false,
				loading: false,
				dialogFormVisible: false,
				fullscreenLoading: false,
				table_data: [],
				record_data: [],
				add_data: [],
				form: {
					value: '',
					btc: ''
				},
				userName: '',
				total: 0,
				formInline: {
					pageNo: 1,
					pageSize: 5,
				},
				type: '',
				phoneCode: '',
				emailCode: '',
			}
		},
		created() {
			this.fullscreenLoading = true;
			Get({
				url: 'wallet/selVcWithdrawal',
				data: {
					userName: this.userName
				},
				success: res => {
					this.fullscreenLoading = false;
					if (res.code === 0) {
						this.table_data = res.data;
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
			this.record();
		},
		methods: {
			findAllCashAddress(type) {
				this.addloading = true;
				Get({
					url: 'CashAddress/findAllCashAddress',
					data: {
						type: type
					},
					success: res => {
						this.addloading = false;
						this.add_data = res.data;
					},
					fail: res => {
						this.addloading = false;
					}
				})
			},
			agree_add() {
				this.fullscreenLoading = true;
				Post({
					url: 'CashAddress/addCashAddress',
					data: {
						address: this.add_form.address, //地址     自己输入
						type: this.type, //地址     自己输入
						remark: this.add_form.remark, //地址     自己输入
					},
					success: res => {
						this.fullscreenLoading = false;
						this.addVisible = false;

						if (res.code === 0) {
							this.$message({
								showClose: true,
								message: '添加成功',
								type: 'success'
							});
							this.add_form.remark = '';
							this.add_form.address = '';
							this.findAllCashAddress(this.type);
						} else {
							this.$message({
								showClose: true,
								message: res.message,
								type: 'error'
							});
						}
					},
					fail: res => {
						this.addVisible = false;
						this.fullscreenLoading = false;
					}
				})
			},
			del(id) {
				this.fullscreenLoading = true;
				Get({
					url: 'CashAddress/delCashAddress',
					data: {
						id: id, //地址     自己输入
					},
					success: res => {
						this.fullscreenLoading = false;
						if (res.code === 0) {
							this.$message({
								showClose: true,
								message: '删除',
								type: 'success'
							});
							this.findAllCashAddress(this.type);
						} else {
							this.$message({
								showClose: true,
								message: res.message,
								type: 'error'
							});
						}
					},
					fail: res => {
						this.addVisible = false;
						this.fullscreenLoading = false;
					}
				})
			},
			add() {
				this.addVisible = true;
			},
			address(row) {
				this.type = row;
				this.editVisible = true;
				this.findAllCashAddress(row);
			},
			handleSizeChange() {
				this.record()
			},
			handleCurrentChange() {
				this.record()
			},
			record() {
				this.loading = true;
				Get({
					url: 'recharge/selRechargeRecord',
					data: {
						pageNo: this.formInline.pageNo,
						pageSize: this.formInline.pageSize,
						type: 2,
					},
					success: res => {
						this.loading = false;
						if (res.code === 0) {
							this.record_data = res.data
							this.total = res.total
						} else {
							this.$message({
								showClose: true,
								message: res.data,
								type: 'error'
							});
						}
					},
					fail: res => {
						this.loading = false;
					}
				})
			},
			close() {
				this.dialogFormVisible = false;
				this.add_form.address = '';
				this.add_form.remark = '';
				this.form = {};
			},
			cancel() {
				this.dialogFormVisible = false;
				this.form = {}
			},
			Withdrawals(data) {
				if (!this.$store.state.user.email || !this.$store.state.user.phone) {
					this.$message({
						showClose: true,
						message: '请去个人中心页面完成手机号或邮箱验证',
						type: 'error'
					});
					return
				}
				this.fullscreenLoading = true;
				Get({
					url: 'fb/getTXCode',
					data: {
						phoneCode: '86' + this.$store.state.user.phone,
						emailCode: this.$store.state.user.email,
						phone: true,
						email: true,
					},
					success: res => {
						if (res.code === 0) {
							this.type = data;
							Get({
								url: 'CashAddress/findAllCashAddress',
								data: {
									type: data
								},
								success: res => {
									this.fullscreenLoading = false;
									this.options = res.data;
									this.dialogFormVisible = true;
								},
								fail: res => {
									this.fullscreenLoading = false;
								}
							})
							this.$message({
								showClose: true,
								message: res.data,
								type: 'success'
							});
						} else {
							this.fullscreenLoading = false;
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
			onSubmit() {
				if (!this.form.email) {
					this.$message({
						showClose: true,
						message: '请输入邮箱验证码',
						type: 'error'
					});
					return
				};
				if (!this.form.phone) {
					this.$message({
						showClose: true,
						message: '请输入手机验证码',
						type: 'error'
					});
					return
				};
				this.fullscreenLoading = true;
				Get({
					url: 'fb/okTXCode',
					data: {
						phoneCode: this.form.phone,
						emailCode: this.form.email,
						phone: true,
						email: true,
					},
					success: res => {
						if (res.code === 0) {
							Post({
								url: 'wallet/outTransaction',
								data: {
									//						virtualId: this.form.virtualId,
									virtualId: this.type,
									address: this.form.address,
									value: this.form.value
								},
								success: res => {
									this.fullscreenLoading = false;
									if (res.code === 0) {
										this.dialogFormVisible = false;
										this.form = {};
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
						} else {
							this.$message({
								showClose: true,
								message: res.data,
								type: 'error'
							});
							this.fullscreenLoading = false;
						}
					},
					fail: res => {
						this.fullscreenLoading = false;
					}
				})
			}
		}
	}

</script>
<style>
	.pan-currency {
		padding: 18px;
	}

	.pan-currency .el-dialog__body {
		padding: 10px 30px 30px 30px
	}

	.pan-currency .select ul {
		border-left: 1px solid #ccc;
		border-top: 1px solid #ccc;
		overflow: hidden
	}

	.pan-currency .select ul li {
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

	.pan-currency .pay-content {
		margin-bottom: 20px;
	}

	.pan-currency .address {
		text-align: center
	}

	.pan-currency .address p {
		margin-top: 12px;
		color: #aaa;
	}

	.pan-currency .address .add {
		font-size: 16px;
		font-weight: bold;
		color: #000;
		margin-bottom: 10px
	}

	.pan-currency .address h5 {
		font-weight: 700;
		color: #666;
	}

	.pan-currency .address .orange {
		color: #ff9d11;
		cursor: pointer
	}

</style>
