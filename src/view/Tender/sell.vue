<template>
	<div>
		<div class="exx-title">
			<h2>卖出</h2>
		</div>
		<div class="select"></div>
		<el-table :data="list" border fit highlight-current-row v-loading="loading"
		  style="width: 100%;margin-top:20px">

<el-table-column align="center" label="币种名称">
	<template slot-scope="scope">
		<span>{{scope.row.shortName}}</span>
	</template>
</el-table-column>
<el-table-column align="center" label="货币总数量">
	<template slot-scope="scope">
		<span>{{scope.row.vTotal}}</span>
	</template>
</el-table-column>
<el-table-column align="center" label="冻结货币数量">
	<template slot-scope="scope">
		<span>{{scope.row.frozenTotal}}</span>
	</template>
</el-table-column>
<el-table-column align="center" label="最后更新时间" width='125'>
	<template slot-scope="scope">
					<span>{{scope.row.lastUpdateTime | parseTime('{y}-{m}-{d}')}}</span>
				</template>
</el-table-column>
<el-table-column align="center" label="操作" width='100'>
	<template slot-scope="scope">
		<el-button type='success' size='mini' @click='add(scope.row)'>发布</el-button>
	</template>
</el-table-column>
</el-table>

<el-dialog title="新建订单" :visible.sync="dialogFormVisible">
	<el-form :model="form" label-width="120px">
		<el-form-item label="交易币种：">
			<el-input v-model="form.shortName" auto-complete="off" disabled></el-input>
		</el-form-item>
		<el-form-item label="单价：">
			<el-input v-model="form.prize" auto-complete="off"></el-input>
		</el-form-item>
		<el-form-item label="交易数量：">
			<el-input v-model="form.amount" auto-complete="off" placeholder='请输入大于0的数'></el-input>
		</el-form-item>
	</el-form>
	<div slot="footer" class="dialog-footer">
		<el-button @click="dialogFormVisible = false">取 消</el-button>
		<el-button type="primary" @click="agree">确 定</el-button>
	</div>
</el-dialog>
</el-dialog>
</div>
</template>


<script>
	import Post from '@/api/post.js'
	import request from 'superagent'
	export default {
		data() {
			return {
				loading: true,
				formLabelWidth: 120,
				select_data: {

				},
				form: {
					redact: '',
					prize: "",
					amount: '',
					legalTendreId: ''
				},
				dialogFormVisible: false,
				data: {
					id: null,
					file2: 1
				},
				listQuery: {
					pageNo: 1,
					pageSize: 5,
				},
				total: 0,
				list: [
					/*{
										redact: '', //交易币种
										shortName: '', //交易币种名称
										userId: '', //用户id
										userName: '', //用户姓名
										sellBuy: '', //买方还是卖方(1:卖方;0:买方)
										createTime: '', //订单建立时间
										prize: '', //单价
										amount: '', //交易总数量
										leftAmount: '', //剩余可交易的数量
										poolStatus: '', //订单状态（0：未成交、1：完全成交，2：部分成交，3：用户撤销,4:后台撤销,5:买方已付款,6:卖方确认交易,7:后台确认交易,8:买方付款后选择后台确认交易）
										lastUpdateTime: '', //最后更新时间
										fees: '', //总手续费
										leftFees: '', //剩余手续费
										parentLeftFees: '', //发布者手续费
										legalTendreId: '', //本表交易id(如果本字段为null,表示当前数据为发布的,如果本字段不为null,表示本数据是选中当前表中的数据开始交易)
										dealImg: '', //买家上传交易图片
										dealImg2: '', //买家上传交易图片
										dealTime: '', //买家上传交易图片时间
										payment: '', //付款方式
									}*/
				]
			}
		},
		created() {
			this.init()
		},
		methods: {
			init() {
				Post({
					url: 'legalTender/findAllVirtualWallet',
					success: res => {
						this.list = res.data;
						this.loading = false;
					}
				})
			},
			add(redact) {
				this.form = redact;
				this.form.amount = 0;
				this.dialogFormVisible = true;
			},
			agree() {
				Post({
					url: 'legalTender/addLegalTender',
					data: {
						redact: this.form.virtualId,
						prize: this.form.prize,
						amount: this.form.amount,
						legalTendreId: null,
					},
					success: res => {
						if (res.code === 0) {
							this.$message.success('发布成功');
							this.dialogFormVisible = false;
							this.init()
						} else {
							this.$notify.error({
								title: '错误',
								message: res.data,
								duration: 3000

							});
						}
					}
				})
			},
			select_item() {
				this.listQuery.page = 1
				this.init();
			},
			handleSizeChange(val) {
				this.listQuery.pageSize = val
				this.init();
			},
			handleCurrentChange(val) {
				this.listQuery.pageNo = val
				this.init();
			},
		}
	}

</script>

<style>
	.exx-title {
		text-align: left;
		font-weight: bold
	}
	
	.exx-title h2 {
		font-size: 18px;
		color: #000;
	}

</style>
