<template>
	<div v-loading.fullscreen.lock='allloading'>
		<div class="exx-title" style='margin-bottom:20px'>
			<h2>{{$t(`footer['我的订单']`)}}</h2>
		</div>
<!--
		<div class="select">
			<el-form :inline="true" :model="listQuery" class="demo-form-inline">
				  <el-form-item label="交易类型">
					<el-select v-model="listQuery.sellBuy"  size='mini' @change='init'>
					  <el-option label="全部" value=""></el-option>
					  <el-option label="卖出" value="1"></el-option>
					  <el-option label="买入" value="0"></el-option>
					</el-select>
				  </el-form-item>
				  <el-form-item label="交易状态">
					<el-select v-model="listQuery.poolStatus" size='mini' @change='init'>
					  <el-option label="全部状态" value=""></el-option>
					  <el-option label="未成交" value="0"></el-option>
					  <el-option label="完全成交" value="1"></el-option>
					  <el-option label="部分成交" value="2"></el-option>
					  <el-option label="用户撤销" value="3"></el-option>
					  <el-option label="后台撤销" value="4"></el-option>
					  <el-option label="买方已付款" value="5"></el-option>
					  <el-option label="卖方确认交易" value="6"></el-option>
					  <el-option label="后台确认交易" value="7"></el-option>
					  <el-option label="买方付款后选择后台确认交易" value="8"></el-option>
					</el-select>
				  </el-form-item>
				</el-form>
		</div>
-->
		<el-table :data="list" border fit highlight-current-row v-loading="loading"
		  style="width: 100%;margin-top:10px">
<el-table-column align="center" :label="$t(`footer['用户']`)" width='100' v-if='isnormal === "true"'>
	<template slot-scope="scope" >
		<span>{{scope.row.nickName}}</span>
	</template>
</el-table-column>
<el-table-column align="center" :label="$t(`footer['商户']`)" width='100' v-if='isnormal === "false"'>
	<template slot-scope="scope">
		<span>{{scope.row.nickName}}</span>
	</template>
</el-table-column>
<el-table-column align="center" :label="$t(`footer['支付方式']`)" width='80'>
	<template slot-scope="scope">
		<span>
			<img :src="require('@/assets/card.svg')" alt="" v-show='scope.row.payment=== "0"' style='width:20px'>
			<img :src="require('@/assets/wechat.svg')" alt="" v-show='scope.row.payment === "2"' style='width:20px'>
			<img :src="require('@/assets/Alipay.svg')" alt="" v-show='scope.row.payment === "1"' style='width:20px'>
		</span>
	</template>
</el-table-column>
<el-table-column align="center" :label="$t(`footer['买/卖']`)"  width='80'>
	<template slot-scope="scope">
		<span :style='{color:!scope.row.sell_buy? "green":"red"}'>{{ !scope.row.sell_buy ? $t(`footer['买入']`) : $t(`footer['卖出']`)}}</span>
	</template>
</el-table-column>
<el-table-column align="center" :label="$t(`footer['凭证']`)" width='60'>
	<template slot-scope="scope">
		<img :src="scope.row.deal_img" alt="" style='width:30px' @click='$store.commit("open_img",scope.row.deal_img)'>
	</template>
</el-table-column>
<el-table-column align="center" :label="$t(`footer['订单数量']`)" width='120'>
	<template slot-scope="scope">
		<span>{{scope.row.amount}}</span>
	</template>
</el-table-column>
<el-table-column align="center"  :label="$t(`footer['单价']`)"  width='60'>
	<template slot-scope="scope">
		<span>{{scope.row.prize}}</span>
	</template>
</el-table-column>
<el-table-column align="center" :label="$t(`footer['订单金额']`)">
	<template slot-scope="scope">
		<span>{{scope.row.amount * scope.row.prize}}</span>
	</template>
</el-table-column>
<el-table-column align="center"  :label="$t(`footer['订单状态']`)"  width='120'>
	<template slot-scope="scope">
		<span>
			{{scope.row.pool_status === 0 ?'未成交':null}}<!-- 上传图片-->
			{{scope.row.pool_status === 1 ?'完全成交':null}}<!-- 无操作表头 -->
			{{scope.row.pool_status === 2 ?'部分成交':null}}<!-- 无操作表头 -->
			{{scope.row.pool_status === 3 ?'用户撤销':null}}<!--无操作表头 -->
			{{scope.row.pool_status === 4 ?'后台撤销':null}}<!-- 无操作表头 -->
			{{scope.row.pool_status === 5 ?'买方已付款':null}}<!--显示按钮 （申请后台确认） -->
			{{scope.row.pool_status === 6 ?'卖方确认交易':null}}<!-- 无操作 -->
			{{scope.row.pool_status === 7 ?'后台确认交易':null}}<!-- 无操作 -->
			{{scope.row.pool_status === 8 ?'买方付款后选择后台确认交易':null}}<!-- 无操作 -->
			{{scope.row.pool_status === 9 ?'取消交易':null}}<!-- 无操作 -->
		</span>
	</template>
</el-table-column>

<el-table-column align="center" :label="$t(`footer['订单时间']`)" width='165'>
	<template slot-scope="scope">
		<span>{{scope.row.create_time | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
	</template>
</el-table-column>
<!--
<el-table-column align="center" label="最后更新时间" width='165'>
	<template slot-scope="scope">
		<span>{{scope.row.last_update_time | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
	</template>
</el-table-column>
-->
<el-table-column align="center"  :label="$t(`footer['操作']`)" width='98' v-if='isnormal === "true"'>
	<template slot-scope="scope">
<!--		<el-button type='danger' size='mini' @click='revoke(scope.row)' v-if='scope.row.pool_status === 0 '>取消交易</el-button>-->
		<el-button type='success' size='mini' @click='revoke(scope.row)' v-if='scope.row.pool_status === 0 '>{{$t(`footer['确认交易']`)}}</el-button>
<!--		<el-button type='success' size='mini' @click='upload(scope.row.id)' v-if='(scope.row.pool_status === 0 || scope.row.pool_status === 2) && scope.row.sell_buy === 0'>上传图片</el-button> -->
<!--		<el-button type='success' size='mini' @click='apply(scope.row.id)' v-if='scope.row.poolStatus === 0 && scope.row.sellBuy === 0'>申请确认</el-button>-->
	</template>
</el-table-column>
</el-table>
<div class="pagination-container page_size">
	<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-sizes="[5, 10, 15, 20]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
	</el-pagination>
</div>


<el-dialog :title="$t(`footer['请确认']`) + (this.big.sell_buy ? $t(`footer['卖出']`) : $t(`footer['买入']`) ) + $t(`footer['订单信息']`)" :visible.sync="cancel_form" align='center' width='40%'>
	<div class="adsadasda">
		<div class="sssstitlesa">
			<!--实在写的恶习的没话说了-->
			<div class="content_div">
				<p>
					<span>{{$t(`footer['用户昵称']`)}}：</span>
					<span class="dsadasd">{{this.big.Mnickname}}</span>
				</p>
				<p>
					<span>{{$t(`footer['订单数量']`)}}：</span>
					<span class="dsadasd">{{this.big.amount}} QC</span>
				</p>
				<p>
					<span>{{$t(`footer['转账金额']`)}} ：</span>
					<span class="dsadasd">{{getPirce}}CNY</span>
				</p>
				<p>
					<span>交易方式：</span>
					<span>
						{{ this.big.payment === '0' ? $t(`footer['银行卡']`) : null}}
						{{ this.big.payment === '1' ? $t(`footer['支付宝']`) : null}}
						{{ this.big.payment === '2' ? $t(`footer['微信']`) : null}}
					</span>
				</p>
			</div>
			<div class="ddadasd"></div>
			<div class="content_div">
				<p>
					<span>{{$t(`footer['卖家电话']`)}}：</span>
					<span class="dsadasd">
						{{this.big.Mphone}}
					</span>
				</p>
				<p>
					<span>{{$t(`footer['付款状态']`)}}：</span>
					<span class="dsadasd">
						{{$t(`footer['已付款']`)}}
					</span>
				</p>
				<p>
					<span>{{$t(`footer['买家备注']`)}}：</span>
					<span class="dsadasd">{{this.big.order_number}}</span>
				</p>
				<p>
					<span>{{$t(`footer['用户姓名']`)}}：</span>
					<span class="dsadasd">{{this.big.Mrealname}}</span>
				</p>
			</div>
		</div>
		<div class="zhuyiyixa">{{$t(`footer['请注意一下']`)}}</div>
		<div style="text-align:center;margin:20px">
			<el-button type='info' @click.native='cancel_trade'>{{$t(`footer['取消交易']`)}}</el-button>
			<el-button type='success' @click.native='agree_trade'>{{$t(`footer['完成交易']`)}}</el-button>
		</div>
	</div>
</el-dialog>
</el-dialog>
</div>
</template>


<script>
	import Post from '@/api/post.js'
	import Get from '@/api/get.js'
	import request from 'superagent'
	export default {
		data() {
			return {
				allloading: false,
				big: {},
				form_type: '买入',
				cancel_form: false,
				isnormal: 'false',
				fileList2: [],
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
					payment: '支付宝付款'
				},
				listQuery: {
					pageNo: 1,
					pageSize: 5,
					sellBuy: '',
					poolStatus: '',
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
		computed: {
			getPirce() {
				if (!this.big.sell_buy) {
					return this.big.amount * this.big.prize
				} else {
					return ((this.big.amount - this.big.fees / 2) * this.big.prize).toFixed(3)
				}
			}
		},
		methods: {
			cancel_trade() {
				var url = '';
				if (!this.big.sell_buy) { //商家的卖出 1是 in
					url = 'cancelOrderOut'
				} else { //商家的卖出
					url = 'cancelOrderIn'
				}
				this.allloading = true;
				Post({
					url: 'fb/' + url,
					data: {
						orderid: this.big.id
					},
					success: res => {
						this.allloading = false;
						this.cancel_form = false;
						if (res.code === 0) {
							this.$message({
								message: res.data,
								type: 'success'
							});
							this.init()
						} else {
							this.$message({
								message: res.data,
								type: 'error'
							});
						}
					},
					fail: res => {
						this.allloading = false;
					}
				})
			},
			agree_trade() {
				var url = '';
				if (!this.big.sell_buy) { //商家的卖出 1是 in
					url = 'orderOkOut'
				} else { //商家的卖出
					url = 'orderOkIn'
				}
				this.allloading = true;
				Post({
					url: 'fb/' + url,
					data: {
						orderid: this.big.id
					},
					success: res => {
						this.allloading = false;
						this.cancel_form = false;
						if (res.code === 0) {
							
							this.$message({
								message: res.data,
								type: 'success'
							});
							this.init()
						} else {
							this.$message({
								message: res.data,
								type: 'error'
							});
						}
					},
					fail: res => {
						this.allloading = false;
					}
				})
			},
			apply(id) {
				Post({
					url: 'legalTender/BuyerCheckService',
					data: {
						id: id
					},
					success: res => {
						if (res.code === 0) {
							this.$message.success('申请后台确认交易成功');
							this.init()
						} else {
							this.$notice.error(res.data);
						}
					}
				})
			}, //买家申请后台确认交易
			revoke(data) {
				Get({
					url: 'fb/findByIdOrder',
					data: {
						orderid: data.id
					},
					success: res => {
						if (res.code === 0) {
							this.cancel_form = true;
							this.big = res.data;
						} else {
							this.$message.error(res.data);
						}
					}
				})
			}, //商家确认交易	
			cancel(id) {
				Post({
					url: 'legalTender/cancleDeal',
					data: {
						id: id
					},
					success: res => {
						if (res.code === 0) {
							this.$message.success('取消交易成功');
							this.init()
						} else {
							this.$message.error(res.data);
						}
					}
				})
			}, //商家确认交易
			upload(id) {
				this.dialogFormVisible = true;
				this.data.id = id;
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			agree() {
				this.$refs.upload.submit();
			},
			successload(e) {
				console.log(e)
				this.dialogFormVisible = false;
				this.$message.success('图片上传成功');
				this.init();
			},
			init() {
				this.loading = true;
				Get({
					url: 'fb/lookOrder',
					data: {
						//                        sellBuy: this.listQuery.sellBuy,
						//                        poolStatus: this.listQuery.poolStatus,
						pageNo: this.listQuery.pageNo,
						pageSize: this.listQuery.pageSize,
					},
					success: res => {
						this.loading = false;
						if (res.code === 0) {
							this.list = res.data.data.list;
							this.total = res.data.data.pageData.totalCount;
							//							this.isnormal = 'true';
							this.isnormal = res.data.isnormal;
						} else {
							this.$message({
								message: res.data,
								type: 'error'
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
	.zhuyiyixa {
		color: #f56c6c;
		margin: 10px 0;
	}

	.adsadasda {
		padding: 0px 30px;
		text-align: left;
	}

	.el-dialog__body {
		padding: 10px 20px
	}

	.sssstitlesa {
		display: flex;
	}

	.content_div {
		width: 300px;
		text-align: left;
	}

	.ddadasd {
		margin: 16px 20px;
		width: 1px;
		background-color: #ccc;
		height: 120px;
	}

	.content_div p {
		margin: 10px 0;
	}

	.dsadasd {
		color: #000;
		font-weight: bold
	}

	.exx-title {
		text-align: left;
		font-weight: bold
	}

	.exx-title h2 {
		font-size: 18px;
		color: #000;
	}

	.select {
		margin-top: 20px;
	}

	.select div.el-form-item {
		margin-bottom: 0;
	}

	.select .el-form-item__label {
		font-weight: bold;
		color: #000
	}

</style>
