<template>
<div class="pay_panelss">
	<div class="pay-content">
		<el-card class="box-card">
	    <div slot="header" class="clearfix">
		  	<span style="font-size:14px;font-weight:bold">综合账单</span>
			<div  style="float: right;margin-top:-9px">
				 <el-select v-model="formInline.currId" 
				 style='width:240px;margin-right:20px'
				 size='small'
				 @change='init'
				 filterable>
					<el-option
					  v-for="item in options"
					  :key="item.value"
					  :label="item.label"
					  :value="item.value">
					</el-option>
				  </el-select> 
				  <el-select v-model="formInline.billType"
				   style='width:240px;margin-right:20px'
				   size='small'
				 	@change='init'
				   placeholder="请选择">
					<el-option
					  v-for="item in options1"
					  :key="item.value"
					  :label="item.label"
					  :value="item.value">
					</el-option>
				  </el-select>
			</div>
		  </div>
		  <div class="select">
		 	<el-table :data="list" 
				 fit highlight-current-row
				 sort-method='hello'
				 border
				   v-loading="loading"
			   :default-sort = "{prop: 'date', order: 'descending'}"
				style="width: 100%;">
					<el-table-column align="center" label="交易市场">
						<template slot-scope="scope" >
						<span>{{scope.row.tradeMarket}}</span>
						</template>
</el-table-column>
<el-table-column align="center" label="操作" width='200'>
	<template slot-scope="scope">
						<span>{{scope.row.billOperation}}</span>
						</template>
</el-table-column>
<el-table-column align="center" label="交易类型">
	<template slot-scope="scope">
						<span>{{scope.row.billType}}</span>
						</template>
</el-table-column>
<el-table-column align="center" label="时间" sortable prop='date' width='200'>
	<template slot-scope="scope">
							<span>{{scope.row.createTime}}</span>
						</template>
</el-table-column>
<el-table-column align="center" label="扣除/增加">
	<template slot-scope="scope">
							<span :style="{color: scope.row.currentAmount - scope.row.lastAmount >0 ? '#10fb0a' : '#fc0511'}">{{scope.row.currentAmount - scope.row.lastAmount}}</span>
						</template>
</el-table-column>
<el-table-column align="center" label="余额(交易前)">
	<template slot-scope="scope">
							<span>{{scope.row.currentAmount}}</span>
						</template>
</el-table-column>
<el-table-column align="center" label="余额(交易后)">
	<template slot-scope="scope">
							<span>{{scope.row.lastAmount}}</span>
						</template>
</el-table-column>
</el-table>
<div style="text-align:right;margin:10px 0">
	<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :current-page="pageNo" :page-sizes="[5, 10, 15, 20]" :page-size="formInline.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
	</el-pagination>
</div>
</div>
</el-card>
</div>
</div>
</template>
<script>
	import Get from '@/api/get'
	import Post from '@/api/post'
	export default {
		data() {
			return {
				loading: false,
				options: [],
				options1: [{
					label: '全部类型',
					value: ''
				}],
				list: [],
				pageNo: 1,
				pageSize: 5,
				formInline: {
					billType: '',
					currId: '',
					pageNo: 1,
					pageSize: 5,
				},
				total: 5
			}
		},
		methods: {
			handleSizeChange(index) {
				this.init()
			},
			handleCurrentChange(index) {
				this.pageNo = index;
				this.init()
			},
			onSubmit() {

			},
			init() {
				this.loading = true;
				Get({
					url: 'finance/seluserBill',
					data: {
						pageNo: this.pageNo,
						pageSize: this.pageSize,
						tradeMarket: this.formInline.currId,
						billType: this.formInline.billType,
					},
					success: res => {
						this.loading = false;
						if (res.code === 0) {
							this.list = res.data;
							if (res.extra.pageData) {
								this.total = res.extra.pageData.totalCount;
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
						this.loading = false;
					}
				})
			}

		},
		created() {
			Get({
				url: 'finance/selvirtualCurrency',
				success: res => {
					if (res.code === 0) {
						this.options = res.data.map(res => {
							return {
								value: res.tradeMarket,
								label: res.tradeMarket
							}
						});
						this.options.unshift({
							value: '',
							label: '全部市场'
						})
					} else {
						this.$message({
							showClose: true,
							message: res.message,
							type: 'error'
						});
					}
				}
			})
			Get({
				url: 'finance/selbillType',
				success: res => {
					if (res.code === 0) {
						var arr = Array.from(new Set(res.data));
						arr.forEach((v, i) => {
							this.options1[i + 1] = {};
							this.options1[i + 1].label = v;
							this.options1[i + 1].value = v;
						})
					} else {
						this.$message({
							showClose: true,
							message: res.message,
							type: 'error'
						});
					}
				}
			})
			this.init()
		}
	}

</script>
<style scoped="true">
	.pay_panelss {
		padding: 18px;
	}

	.pay_panelss .select ul {
		border-left: 1px solid #ccc;
		border-top: 1px solid #ccc;
		overflow: hidden
	}

	.pay_panelss .select ul li {
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

	.pay_panelss .pay-content {
		margin-bottom: 20px;
	}

	.pay_panelss .address {
		text-align: center
	}

	.pay_panelss .address p {
		margin-top: 12px;
		color: #aaa;
	}

	.pay_panelss .address .add {
		font-size: 16px;
		font-weight: bold;
		color: #000;
		margin-bottom: 10px
	}

	.pay_panelss .address h5 {
		font-weight: 700;
		color: #666;
	}

	.pay_panelss .address .orange {
		color: #ff9d11;
		cursor: pointer
	}

</style>
