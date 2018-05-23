<template>
	<div  v-loading.fullscreen.lock='allloading'>
		<div class="exx-title">
			<h2>{{$t(`footer['买入']`)}} </h2>
		</div>
		<div class="select"></div>
		<el-table :data="list" border fit highlight-current-row  v-loading.fullscreen.lock="loading"
		  style="width: 100%;margin-top:20px">
<el-table-column align="center" :label="$t(`footer['用户昵称']`)">
	<template slot-scope="scope" >
		<span>{{scope.row.nickname}}</span>
	</template>
</el-table-column>
<el-table-column align="center" :label="$t(`footer['状态']`)" width='60'>
	<template slot-scope="scope">
		<span :style="{color:scope.row.fb_is_open  ? 'green':'#ccc'}">{{scope.row.fb_is_open  ? $t(`footer['在线']`) :$t(`footer['离线']`) }}</span>
	</template>
</el-table-column>
<el-table-column align="center" :label="$t(`footer['单价']`)">
	<template slot-scope="scope">
		<span>{{scope.row.fb_price}}</span>
	</template>
</el-table-column>
<el-table-column align="center" :label="$t(`footer['交易额度限制']`)">
	<template slot-scope="scope">
		<span>{{scope.row.fb_min_value + '-' + scope.row.fb_max_value}}</span>
	</template>
</el-table-column>
<el-table-column align="center"  :label="$t(`footer['支付方式']`)">
	<template slot-scope="scope">
		<span>
			<img :src="require('@/assets/card.svg')" alt="" v-show='scope.row.user_bank_card' style='width:20px'>
			<img :src="require('@/assets/wechat.svg')" alt="" v-show='scope.row.user_wechar' style='width:20px'>
			<img :src="require('@/assets/Alipay.svg')" alt="" v-show='scope.row.user_alipay' style='width:20px'>
		</span>
	</template>
</el-table-column>
<!--
<el-table-column align="center" label="订单建立时间" width='125'>
	<template slot-scope="scope">
					<span>{{scope.row.createTime | parseTime('{y}-{m}-{d}')}}</span>
				</template>
</el-table-column>
-->
<el-table-column align="center" :label="$t(`footer['剩余可交易数量']`)">
	<template slot-scope="scope">
					<span>{{scope.row.v_total}}</span>
				</template>
</el-table-column>

<el-table-column align="center" :label="$t(`footer['操作']`)"  width='80' v-if='isnormal !== "true"'>
	<template slot-scope="scope">
		<el-button type='success' size='mini' @click='buy(scope.row)' v-if='scope.row.fb_is_open '>{{$t(`footer['购买']`)}}</el-button>
		<el-button type='info' size='mini'  v-if='!scope.row.fb_is_open'>{{$t(`footer['暂停']`)}}</el-button>
	</template>
</el-table-column>
</el-table>
<div class="pagination-container page_size">
	<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-sizes="[5, 10, 15, 20]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
	</el-pagination>
</div>

<el-dialog :title="$t(`footer['请确认你的买入订单信息']`)" :visible.sync="dialogFormVisible" width='40%' align='center'>
	<el-form :model="form" label-width="120px">
		<el-form-item :label="$t(`footer['买入数量']`)+'：'">
			<el-input size='small' v-model='form.amount' type='number' @keyup.native='changeNum'></el-input>
		</el-form-item>
		<el-form-item :label="$t(`footer['金额']`)+'：'">
			<el-input size='small' v-model='allprize' disabled></el-input>
		</el-form-item>
		<el-form-item :label="$t(`footer['交易方式']`)+'：'" align='left'>
			<el-radio-group v-model="form.payment">
				<el-radio label="0" v-show='form.user_bank_card'>{{$t(`footer['银行卡']`)}}</el-radio>
				<el-radio label="1" v-show='form.user_wechar'>{{$t(`footer['支付宝']`)}}</el-radio>
				<el-radio label="2" v-show='form.user_alipay'>{{$t(`footer['微信']`)}}</el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item align='left'>
			<el-button type='info' @click='canel_trade'>{{$t(`footer['取消下单']`)}}</el-button>
			<el-button type='success' @click='agree_title'>{{$t(`footer['确认下单']`)}}</el-button>
		</el-form-item>
	</el-form>
</el-dialog>

<el-dialog :title="$t(`footer['请确认你的买入订单信息']`)"  :visible.sync="titleForm" width='40%'>
	<div class="title-lox">
		<el-form :model="form" label-width="160px">
			<!--英航卡-->
			<el-form-item :label="$t(`footer['开户行']`)+'：'"  v-if='form.payment == "0"'>
				<span>{{form.user_bank}}</span>
			</el-form-item>
			<el-form-item :label="$t(`footer['户名']`)+'：'"  v-if='form.payment == "0"'>
				<span>{{form.user_bank_user}}</span>
			</el-form-item>
			<el-form-item :label="$t(`footer['银行卡号']`)+'：'" v-if='form.payment == "0"'>
				<span>{{form.user_bank_card}}</span>
			</el-form-item>
			<!-- 微信 -->
			<el-form-item :label="$t(`footer['微信收款码']`)+'：'" v-if='form.payment == "2"'>
				<img :src="form.user_wechar" alt="" style="width:250px">
			</el-form-item>
			<!--支付宝收款码-->
			<el-form-item :label="$t(`footer['支付宝收款码']`)+'：'"  v-if='form.payment == "1"'>
				<img :src="form.user_alipay" alt="" style="width:250px">
			</el-form-item>
			<!--支付宝收款码-->
			<el-form-item :label="$t(`footer['转账金额']`)+'：'">
				<span>{{form.amount * form.fb_price}} </span> CNY
			</el-form-item>
			<el-form-item :label="$t(`footer['上传付款截图']`)+'：'">
				<div class="upload-imgList" v-show='people'>
					<i class="el-icon-close" @click='delimg3'></i>
					<img :src="people" alt="">
				</div>
				<el-upload ref='upload3' v-show='!people' :action="config+'fb/addLegalTenderIn'" :data='data' :auto-upload='false' list-type="picture-card" :limit='1' :on-success='successload' :on-error='errorload' :on-change='pushImg' name='file'>
					<i class="el-icon-plus"></i>
				</el-upload>
			</el-form-item>
			<el-form-item :label="$t(`footer['备注信息']`)+'：'">
				<span style='color:red'>{{remark}}</span>（{{$t(`footer['转账时备注红色数字，以免造成无法及时到账的情况']`)}}）<br />
				<p style='color:rgb(255,197,0);'>{{$t(`footer['注意事项']`)}}</p>
			</el-form-item>
			<el-form-item>
				<el-button type='info' @click='canel_trade'>{{$t(`footer['取消交易']`)}}</el-button>
				<el-button type='success' @click='gotopay'>{{$t(`footer['已经付款']`)}}</el-button>
			</el-form-item>
		</el-form>
	</div>
</el-dialog>
</div>
</template>


<script>
	import config from '@/config'
	import Post from '@/api/post.js'
	import Get from '@/api/get.js'
	import request from 'superagent'
	export default {
		data() {
			return {
				config:config,
				people: '',
				loading: true,
				formLabelWidth: 120,
				select_data: {

				},
				form: {
					prize: '',
					amount: "",
					payment: '',
					sellerId: ''
				},
				dialogFormVisible: false,
				titleForm: false,
				remark: '',
				data: {
					id: null,
					file2: 1
				},
				listQuery: {
					pageNo: 1,
					pageSize: 5,
				},
				data: {

				},
				isnormal: 'true',
				fb_price: 0,
				allprize: 0,
				total: 0,
				allloading: false,
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
			gotopay() {
				if (!this.people) {
					this.$message({
						message: '请上传转账截图',
						type: 'error'
					});
					return
				}
				this.allloading = true;
				this.data.sellerId = this.form.user_id;
				this.data.payment = this.form.payment;
				this.data.amount = this.form.amount;
				this.data.prize = this.fb_price;
				this.data.order_number = this.remark;
				this.$refs.upload3.submit();

			},
			successload(res) {
				this.allloading = false;
				this.dialogFormVisible = false;
				this.titleForm = false;
				this.$message({
					message: res.data,
					type: 'success'
				});

				this.init();
			},
			errorload(res) {
				this.allloading = false;
				this.$message({
					message: res.data,
					type: 'error'
				});
			},
			delimg3() {
				this.people = '';
				this.$refs.upload3.clearFiles();
			},
			pushImg(file, fileList) {
				this.people = file.url;
			},

			canel_trade() {
				this.$message({
					message: '已取消交易',
					type: 'warning'
				});
				this.form = {};
				this.dialogFormVisible = false;
				this.titleForm = false;
			},
			agree_title() {
				if (!this.form.amount) {
					this.$message({
						message: '请输入买入数量',
						type: 'error'
					});
					return
				}
				if (this.form.amount <= 0) {
					this.$message({
						message: '请输入正确数量',
						type: 'error'
					});
					this.form.amount = '';
					return
				}
				if (!this.form.payment) {
					this.$message({
						message: '请至少选择一种付款方式',
						type: 'error'
					});
					return
				}
				
				this.dialogFormVisible = false;
				this.titleForm = true;
				this.remark = Math.floor(Math.random() * 90000 + 10000);
			},
			changeNum() {
				this.allprize = this.fb_price * this.form.amount;
			},
			init() {
				Get({
					url: 'fb/findUser',
					data: {
						//						sellBuy: 1,
						pageNo: this.listQuery.pageNo,
						pageSize: this.listQuery.pageSize,
					},
					success: res => {
						this.loading = false;
						if (res.code === 0) {
							this.list = res.data.data.list;
							this.total = res.data.data.pageData.totalCount;
							this.isnormal = res.data.isnormal;
						}
					}
				})
			},
			buy(redact) {
				this.form = redact;
				this.fb_price = redact.fb_price;
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
						if (res.code === 0) {
							this.$message.success('买入成功');
							this.init()
						} else {
							this.$message.error(res.data);
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
	.upload-imgList {
		width: 148px;
		height: 148px;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.upload-imgList img {
		width: 100%;
	}

	.upload-imgList .el-icon-close {
		position: absolute;
		top: 0;
		right: 0;
		font-size: 18px;
		color: #000;
		cursor: pointer;
	}

	.exx-title {
		text-align: left;
		font-weight: bold
	}

	.exx-title h2 {
		font-size: 18px;
		color: #000;
	}

	.title-lox .el-form-item {
		margin-bottom: 6px;
	}

</style>
