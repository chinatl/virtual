<template>
	<div>
		<div class="exx-title">
			<h2>买入</h2>
		</div>
		<div class="select"></div>
		<el-table :data="list" border fit highlight-current-row v-loading="loading"
		  style="width: 100%;margin-top:20px">
<el-table-column align="center" label="用户名">
	<template slot-scope="scope" >
		<span>{{scope.row.userName}}</span>
	</template>
</el-table-column>
<el-table-column align="center" label="币种名称">
	<template slot-scope="scope">
		<span>{{scope.row.shortName}}</span>
	</template>
</el-table-column>
<el-table-column align="center" label="单价">
	<template slot-scope="scope">
		<span>{{scope.row.prize}}</span>
	</template>
</el-table-column>
<el-table-column align="center" label="订单建立时间" width='125'>
	<template slot-scope="scope">
					<span>{{scope.row.createTime | parseTime('{y}-{m}-{d}')}}</span>
				</template>
</el-table-column>
<el-table-column align="center" label="剩余可交易数量">
	<template slot-scope="scope">
					<span>{{scope.row.leftAmount}}</span>
				</template>
</el-table-column>
<el-table-column align="center" label="订单状态" width='120'>
	<template slot-scope="scope">
		<span>
			{{scope.row.poolStatus === 0 ?'未成交':null}}<!-- 上传图片-->
			{{scope.row.poolStatus === 1 ?'完全成交':null}}<!-- 无操作表头 -->
			{{scope.row.poolStatus === 2 ?'部分成交':null}}<!-- 无操作表头 -->
			{{scope.row.poolStatus === 3 ?'用户撤销':null}}<!--无操作表头 -->
			{{scope.row.poolStatus === 4 ?'后台撤销':null}}<!-- 无操作表头 -->
			{{scope.row.poolStatus === 5 ?'买方已付款':null}}<!--显示按钮 （申请后台确认） -->
			{{scope.row.poolStatus === 6 ?'卖方确认交易':null}}<!-- 无操作 -->
			{{scope.row.poolStatus === 7 ?'后台确认交易':null}}<!-- 无操作 -->
			{{scope.row.poolStatus === 8 ?'买方付款后选择后台确认交易':null}}<!-- 无操作 -->
		</span>
	</template>
</el-table-column>
<el-table-column align="center" label="最后更新时间" width='125'>
	<template slot-scope="scope">
		<span>{{scope.row.createTime | parseTime('{y}-{m}-{d}')}}</span>
	</template>
</el-table-column>
<el-table-column align="center" label="操作" width='80'>
	<template slot-scope="scope">
		<el-button type='success' size='mini' @click='buy(scope.row)'>购买</el-button>
	</template>
</el-table-column>
</el-table>
<div class="pagination-container page_size">
	<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-sizes="[5, 10, 15, 20]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
	</el-pagination>
</div>

<el-dialog title="买入" :visible.sync="dialogFormVisible">
	<el-form :model="form" label-width="120px">
		<el-form-item label="交易币种：">
			<el-input v-model="form.shortName" auto-complete="off" disabled></el-input>
		</el-form-item>
		<el-form-item label="单价：">
			<el-input v-model="form.prize" auto-complete="off" disabled></el-input>
		</el-form-item>
		<el-form-item label="交易数量：">
			<el-input v-model="form.amount" auto-complete="off"></el-input>
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
					url: 'legalTender/findAll',
					data: {
						sellBuy: 1,
						pageNo:this.listQuery.pageNo,
						pageSize:this.listQuery.pageSize,
					},
					success: res => {
						this.list = res.data;
						this.loading = false,
						this.total = res.total;

					}
				})
			},
			buy(redact) {
				this.form = redact;
				this.form.amount = 0;
				this.dialogFormVisible = true;
			},
			agree() {
				this.dialogFormVisible = false;
				Post({
					url: 'legalTender/addLegalTender',
					data: {
						redact: this.form.redact,
						prize: this.form.prize,
						amount: this.form.amount,
						legalTendreId: this.form.id,
					},
					success: res => {
						if(res.code === 0){
							this.$message.success('买入成功');
							this.init()
						}else {
							this.$notice.error(res.data);
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
