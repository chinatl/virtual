<template>
<div class="pay_panel" v-loading='vloading'>
	<div class="pay-content">
		<el-card class="box-card">
	    <div slot="header" class="clearfix">
		  	<span style="font-size:14px;font-weight:bold">{{$t('other["委托记录"]')}}</span>
		  	
			<div  style="float: right;margin-top:-9px">
				 <el-select v-model="formInline.lishi" 
				 style='width:240px;margin-right:20px'
				 @change='init'
				 size='small'
				 filterable>
				     <el-option value="0" label='全部委托'></el-option>
				     <el-option value="1" label='历史委托'></el-option>
				     <el-option value="2" label='当前委托'></el-option>
				  </el-select> 
				 <el-select v-model="formInline.teadeMarket" 
				 style='width:240px;margin-right:20px'
				 @change='init'
				 size='small'
				 filterable>
				     <el-option key="" value="" :label='$t(`other["全部市场"]`)'></el-option>
					<el-option
					  v-for="item in options"
					  :key="item.tradeMarket"
					  :label="item.tradeMarket"
					  :value="item.tradeMarket">
					</el-option>
				  </el-select> 
			</div>
		  </div>
		  <div class="select">
		 	<el-table :data="list" 
				 fit highlight-current-row
				 v-loading='loading'
				 sort-method='hello'
				 border
			   :default-sort = "{prop: 'date', order: 'descending'}"
				style="width: 100%;">
					<el-table-column align="center" :label='$t(`other["时间"]`)' width='160'>
						<template slot-scope="scope" >
						<span>{{scope.row.lastUpdateTime | parseTime('{y}-{m}-{d} {h}:{m}:{s}')}}</span>
						</template>
</el-table-column>
<el-table-column align="center" :label='$t(`other["市场"]`)'>
	<template slot-scope="scope">
						<span>{{scope.row.tradeMarket}}</span>
						</template>
</el-table-column>
<el-table-column align="center" :label='$t(`other["委托价/成交均价"]`)'>
	<template slot-scope="scope">
						<span>{{scope.row.prize + '/' + scope.row.averagePrize}}</span>
						</template>
</el-table-column>
<el-table-column align="center" :label='$t(`other["委托类型"]`)' prop='date'>
	<template slot-scope="scope">
							<span>{{scope.row.entrustType ? $t('other["卖出"]') : $t('other["买入"]')}}</span>
						</template>
</el-table-column>
<el-table-column align="center" :label='$t(`other["剩余可交易的数量"]`)'>
	<template slot-scope="scope">
							<span>{{scope.row.leftAmount | filter_num}}</span>
						</template>
</el-table-column>
<el-table-column align="center" :label='$t(`other["成交总金额"]`)'>
	<template slot-scope="scope">
							<span>{{scope.row.leftCount | filter_num}}</span>
						</template>
</el-table-column>
<el-table-column align="center" :label='$t(`other["订单状态"]`)'>
	<template slot-scope="scope">
            <span>
                {{scope.row.poolStatus === 0 ? $t('other["未成交"]') : null}}
                {{scope.row.poolStatus === 1 ? $t('other["完全成交"]') : null}}
                {{scope.row.poolStatus === 2 ? $t('other["部分成交"]') : null}}
                {{scope.row.poolStatus === 3 ? $t('other["用户撤销"]') : null}}
            </span>
						</template>
</el-table-column>
<el-table-column align="center" :label='$t(`other["操作"]`)'>
	<template slot-scope="scope">
           <el-button type='success' size='mini' @click='cancel(scope.row.id)'
            v-if='scope.row.poolStatus === 0 || scope.row.poolStatus === 2'>{{$t('other["撤销"]')}}</el-button>
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
	import Get from '@/api/get';
	import Post from '@/api/post';
	export default {
		data() {
			return {
				options: [],
				loading: false,
				vloading: false,
				formInline: {
					teadeMarket: '',
					pageNo: 1,
					pageSize: 5,
					lishi: '0'
				},
				total: 5,
				list: [],
				form: {
					value: '',
					btc: ''
				},
				vName:'',
				shortName:'',
			}
		},
		created() {
			var home_data = window.location.href.split('?')[1];
			if (home_data) {
				this.formInline.teadeMarket = home_data;
			}
			Get({
				url: 'pool/findAllTradeMarket',
				success: res => {
					if (res.code === 0) {
						this.options = res.data;
						this.init()
					}
				}
			})
		},
		methods: {
			cancel(id) {
				this.$confirm('确定撤销该委托?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.vloading = true;
					Get({
						url: 'pool/revocationPool',
						data: {
							id: id
						},
						success: res => {
							this.vloading = false;
							if (res.code === 0) {
								this.$message({
									message: res.data,
									type: 'success',
									duration: 3000
								});
								this.init()
							} else {
								this.$message({
									message: res.data,
									type: 'error',
									duration: 2000
								});
							}
						},
						fail: res => {
							this.vloading = false;
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			onSubmit() {

			},
			handleSizeChange(index) {
				this.formInline.pageSize = index;
				this.init()
			},
			handleCurrentChange(index) {
				this.formInline.pageNo = index;
				this.init()
			},
			init() {
				this.loading = true;
				Get({
					url: 'pool/selPool',
					data: {
						teadeMarket: this.formInline.teadeMarket,
						pageNo: this.formInline.pageNo,
						pageSize: this.formInline.pageSize,
						lishi: this.formInline.lishi,
					},
					success: res => {
						this.loading = false;
						if (res.code === 0) {
							this.list = res.data;
							this.total = res.extra.pageData.totalCount;
						}
					},
					fail: res => {
						this.loading = false;
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
