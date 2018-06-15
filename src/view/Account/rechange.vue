<template>
<div class="pay_panel" v-loading="fullscreenLoading">
	<div class="pay-content">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		  	<span style="font-size:14px;font-weight:bold">{{userName}}{{$t('account["充值"]')}}</span>
			<div  style="float: right;width:240px;margin-top:-9px">
				 <el-input
					placeholder="请输入内容"
				  	autosize
					suffix-icon="el-icon-search"
					size="small"
					@keyup.native='select_btc'
					v-model="form.value">
				  </el-input>
			</div>
		  </div>
		  <div class="select">
		  	<ul>
		  		<li v-for='(item,index) in select_data' @click='select(item)'>
		  			<img src="" alt=""><span>{{item.toUpperCase()}}</span>
		  		</li>
		  	</ul>
		  </div>
		</el-card>
	</div>
	<div class="pay-content">
		<el-card class="box-card">
			<div class="address">
				<p class="add">{{userName}}{{$t('account["钱包地址"]')}}</p>
				<p>{{address}}</p>
				<p class="orange" v-clipboard="address" @success="handleSuccess" @error="handleError">{{$t('account["复制地址"]')}}</p>
				<p><vue-qrs :text="address" height="200" width="200"></vue-qrs></p>
				<div><img src="" alt=""></div>
				<h5>{{$t('account["充值说明"]')}}：</h5>
				<p style='text-align:center'>{{$t('account["充值介绍1"]')}}</p>
				<p style='text-align:center'>{{$t('account["充值介绍2"]')}}</p>
			</div>
		</el-card>
	</div>
	<div class="pay-content">
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		  	<span style="font-size:14px;font-weight:bold">{{$t('account["充值记录"]')}}</span>
		  </div>
		  <div class="select">
		 	<el-table :data="table_data" 
		 	v-loading = 'loading'
				 fit highlight-current-row border
				style="width: 100%">
					<el-table-column align="center"  :label="$t(`account['币种标识']`)">
						<template slot-scope="scope" >
						<span>{{scope.row.shortName}}</span>
						</template>
</el-table-column>
<el-table-column align="center" :label="$t(`account['类型']`)">
	<template slot-scope="scope">
						<span>{{scope.row.type === 1 ? '类型' : '提现'}}</span>
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
</div>
</template>
<script>
	import VueQrs from 'vue-qr';
	import Post from '@/api/post';
	import Get from '@/api/get';
	export default {
		components: {
			VueQrs
		},
		data() {
			return {
				fullscreenLoading: false,
				loading: false,
				table_data: [{
					date: '2018-12-13',
					type: '类型',
					money: '金额',
					times: '次数',
					time: '处理时间',
					status: '状态'
				}, {
					date: '2018-12-13',
					type: '类型',
					money: '金额',
					times: '次数',
					time: '处理时间',
					status: '状态'
				}, {
					date: '2018-12-13',
					type: '类型',
					money: '金额',
					times: '次数',
					time: '处理时间',
					status: '状态'
				}, {
					date: '2018-12-13',
					type: '类型',
					money: '金额',
					times: '次数',
					time: '处理时间',
					status: '状态'
				}],
				form: {
					value: '',
					btc: ''
				},
				select_data: [],
				userName: '',
				copy: {

				},
				address: '',
				copyArr: [],
				formInline: {
					pageNo: 1,
					pageSize: 5,
				},
				total: 0,
				current_data: []

			}
		},
		created() {
			if (this.$route.query.shortName) {
				this.userName = this.$route.query.shortName;
			}
			this.fullscreenLoading = true;
			this.record()
			Get({
				url: 'wallet/selVcIstopUp',
				data: {
					userName: this.userName
				},
				success: res => {
					this.fullscreenLoading = false;
					if (res.code === 0) {
						this.select_data = res.data;
						this.current_data = res.data;
						if (this.userName) {
							this.copy = this.userName;
							this.init(this.userName);
							//							this.userName = res.data[0];
						} else {
							this.copy = res.data[0];
							this.init(res.data[0]);
							this.userName = res.data[0];
						}

					} else {
						this.$message({
							showClose: true,
							message: res.message,
							type: 'error'
						});
					}
				},
				fail: res => {
					this.fullscreenLoading = false;
				}
			})
		},
		methods: {
			select_btc(e) {
				var res = e.target.value;
				if (res) {
					res = res.toUpperCase()
					var newArr = [];
					for (var i = 0; i < this.current_data.length; i++) {
						if (this.current_data[i].includes(res)) {
							newArr.push(this.current_data[i]);
						}
					}
					this.select_data = JSON.parse(JSON.stringify(newArr));
				} else {
					this.select_data = JSON.parse(JSON.stringify(this.current_data));
				}
			},
			handleSuccess() {
				this.$message({
					message: '复制您的钱包地址成功，随处粘贴可用',
					type: 'success'
				});
			},
			handleError() {
				this.$message({
					message: '复制失败',
					type: 'error'
				});
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
						type: 1,
					},
					success: res => {
						this.loading = false;
						if (res.code === 0) {
							this.table_data = res.data
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
			select(item) {
				this.userName = item.toUpperCase();
				this.init(item);
			},
			init(id) {
				this.fullscreenLoading = true;
				Post({
					url: 'wallet/selWalletaddress',
					data: {
						shortName: id
					},
					success: res => {
						this.fullscreenLoading = false;
						if (res.code === 0) {
							this.address = res.data
						} else {
							this.address = res.data;
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

</style>
