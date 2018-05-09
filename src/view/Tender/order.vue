<template>
	<div>
		<div class="exx-title">
			<h2>我的订单</h2>
		</div>
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
		<el-table :data="list" border fit highlight-current-row v-loading="loading"
		  style="width: 100%;margin-top:10px">
<el-table-column align="center" label="用户名" width='100'>
	<template slot-scope="scope" >
		<span>{{scope.row.userName}}</span>
	</template>
</el-table-column>
<el-table-column align="center" label="币种名称" width='80'>
    <template slot-scope="scope">
		<span>{{scope.row.shortName}}</span>
	</template>
</el-table-column>
<el-table-column align="center" label="交易类型" width='80'>
    <template slot-scope="scope">
		<span>{{ !scope.row.sellBuy ? '买入' : '卖出'}}</span>
	</template>
</el-table-column>
<el-table-column align="center" label="单价" width='65'>
    <template slot-scope="scope">
		<span>{{scope.row.prize}}</span>
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

<el-table-column align="center" label="订单建立时间" width='125'>
    <template slot-scope="scope">
		<span>{{scope.row.createTime | parseTime('{y}-{m}-{d}')}}</span>
	</template>
</el-table-column>
<el-table-column align="center" label="最后更新时间" width='125'>
    <template slot-scope="scope">
		<span>{{scope.row.createTime | parseTime('{y}-{m}-{d}')}}</span>
	</template>
</el-table-column>
<el-table-column align="center" label="操作" width='120'>
    <template slot-scope="scope">
		<el-button type='success' size='mini' @click='cancel(scope.row.id)' v-if='(scope.row.poolStatus === 0 || scope.row.poolStatus === 2) && scope.row.sellBuy === 1 '>撤销</el-button>
		<el-button type='success' size='mini' @click='revoke(scope.row.id)' v-if='scope.row.poolStatus === 5 && scope.row.sellBuy === 1'>商家确认</el-button>
		<el-button type='success' size='mini' @click='upload(scope.row.id)' v-if='(scope.row.poolStatus === 0 || scope.row.poolStatus === 2) && scope.row.sellBuy === 0'>上传图片</el-button> 
		<el-button type='success' size='mini' @click='apply(scope.row.id)' v-if='scope.row.poolStatus === 8 && scope.row.sellBuy === 0'>申请确认</el-button>
	</template>
</el-table-column>
</el-table>
<div class="pagination-container page_size">
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-sizes="[5, 10, 15, 20]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
</div>

<el-dialog title="图片上传" :visible.sync="dialogFormVisible">
    <div style="margin-bottom:10px">
       <span>请选择付款方式：</span>
        <el-select size='mini' v-model='data.payment'>
            <el-option label='微信付款' value='微信付款'></el-option>
            <el-option label='支付宝付款' value='支付宝付款'></el-option>
            <el-option label='银行卡' value='银行卡'></el-option>
        </el-select>
    </div>
    <el-upload class="upload-demo" ref='upload' action="/legalTender/buyerIsDeal" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList2" :auto-upload="false" :data='data' name='file1' :on-success='successload' list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
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
        methods: {
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
            revoke(id) {
                Post({
                    url: 'legalTender/sellerIsDeal',
                    data: {
                        id: id
                    },
                    success: res => {
                        if (res.code === 0) {
                            this.$message.success('确认交易成功');
                            this.init()
                        } else {
                            this.$notice.error(res.data);
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
                Post({
                    url: 'legalTender/findAll',
                    data: {
                        sellBuy: this.listQuery.sellBuy,
                        poolStatus: this.listQuery.poolStatus,
                        pageNo: this.listQuery.pageNo,
                        pageSize: this.listQuery.pageSize,
                    },
                    success: res => {
                        this.list = res.data;
                        this.loading = false;
                        this.total = res.total;
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
