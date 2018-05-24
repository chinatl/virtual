<template>
<div class="pay_panel">
	<div class="pay-content">
		<el-card class="box-card">
	    <div slot="header" class="clearfix">
		  	<span style="font-size:14px;font-weight:bold">{{$t('user["推荐人"]')}}</span>
		  	<span style="font-size:12px;color:#aaa;margin-left:15px">{{$t('user["推荐人说明"]')}}</span>
		  </div>
			<div class="select">
				<div style="margin-bottom:10px">
					<el-input :placeholder="$t(`other['请输入内容']`)" v-model="copyData" disabled>
						<template slot="append">
							<el-button type="primary" icon="document"
							 v-clipboard="copyData"
							 @success="handleSuccess" @error="handleError">{{$t('user["复制你的地址"]')}}</el-button>
						</template>
</el-input>
</div>
<div class="explain">
    <vue-qr :text="copyData" height="200" width="200"></vue-qr>
</div>
<div class="explain explain_con" style="wdith:444px">
    <h3>{{$t('user["推荐人关系"]')}}</h3>
    <p v-for='(item,index) in explain_con'>{{index + 1}}. {{item.retailStoreRelation}}</p>
<!--
    <p>2. {{$t('user["推荐人关系2"]')}}</p>
    <p>3. {{$t('user["推荐人关系3"]')}}</p>
    <p>4. {{$t('user["推荐人关系4"]')}}</p>
    <p>5. {{$t('user["推荐人关系5"]')}}</p>
-->
</div>
<div class="explain explain_con" style="wdith:334px">
    <h3>{{$t('user["活动介绍"]')}}</h3>
     <p v-for='(item,index) in explain_con'>{{index + 1}}. {{item.serviceChargeAward}}</p>
<!--    <p>1. {{$t('user["活动介绍1"]')}}</p>-->
<!--
    <p>2. {{$t('user["活动介绍2"]')}}</p>
    <p>3. {{$t('user["活动介绍3"]')}}</p>
    <p>4. {{$t('user["活动介绍4"]')}}</p>
    <p>5. {{$t('user["活动介绍5"]')}}</p>
-->
</div>
</div>
</el-card>
</div>
<div class="pay-content">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span style="font-size:14px;font-weight:bold">{{$t('user["我推荐的人"]')}}</span>
        </div>
        <div class="select">
            <el-table :data="table_data1" fit highlight-current-row border style="width: 100%" v-loading='loading1'>
                <el-table-column align="center" :label="$t(`user['用户名']`)">
                    <template slot-scope="scope">
						<span>{{scope.row.nickName}}</span>
						</template>
                </el-table-column>
                <el-table-column align="center" :label="$t(`user['注册时间']`)">
                    <template slot-scope="scope">
						<span>{{scope.row.registerTime | parseTime('{y}-{m}-{d}')}}</span>
						</template>
                </el-table-column>
                <el-table-column align="center" :label="$t(`user['TA推荐的人']`)">
                    <template slot-scope="scope">
						<span>{{scope.row.invalidateIntroCount}}</span>
						</template>
                </el-table-column>
                <!--
                <el-table-column align="center" :label="$t(`user['一级奖励']`)">
                    <template slot-scope="scope">
						<span>{{scope.row.time}}</span>
						</template>
                </el-table-column>
                <el-table-column align="center" :label="$t(`user['二级奖励']`)">
                    <template slot-scope="scope">
						<span>{{scope.row.times}}</span>
						</template>
                </el-table-column>
-->
            </el-table>
            <!--
            <div class="pagination-container page_size">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-sizes="[5, 10, 15, 20]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
-->
        </div>
    </el-card>
</div>
<div class="pay-content">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span style="font-size:14px;font-weight:bold">{{$t('user["我的推荐奖励记录"]')}}</span>
        </div>
        <div class="select">
            <el-table :data="table_data" fit highlight-current-row border style="width: 100%" v-loading='loading2'>
                <el-table-column align="center" :label="$t(`user['赠送时间']`)">
                    <template slot-scope="scope">
						<span>{{scope.row.createTime |  parseTime('{y}-{m}-{d}')}}</span>
						</template>
                </el-table-column>
                <el-table-column align="center" :label="$t(`user['赠送类型']`)">
                    <template slot-scope="scope">
						<span>
						    {{scope.row.giveSource === 0 ? $t(`user['充值赠送']`):null}}
						    {{scope.row.giveSource === 1 ? $t(`user['市场交易赠送']`):null}}
						    {{scope.row.giveSource === 2 ? $t(`user['排行榜赠送']`):null}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$t(`user['奖励金额']`)">
                    <template slot-scope="scope">
						<span>{{scope.row.giveAmount}}</span>
						</template>
                </el-table-column>
                <el-table-column align="center" :label="$t(`user['赠送币种']`)">
                    <template slot-scope="scope">
						<span>{{scope.row.currShortName}}</span>
						</template>
                </el-table-column>
                <el-table-column align="center" :label="$t(`user['赠送类型']`)">
                    <template slot-scope="scope">
						<span>
						    {{scope.row.giveType === 0 ? $t(`user['用户自己赠送']`) : null}}
						    {{scope.row.giveType === 1 ? $t(`user['一级赠送']`) : null}}
						    {{scope.row.giveType === 2 ? $t(`user['二级赠送']`) : null}}
						    {{scope.row.giveType === 3 ? $t(`user['三级赠送']`) : null}}
						    </span>
						</template>
                </el-table-column>
            </el-table>
            <!--
            <div class="pagination-container page_size">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNo" :page-sizes="[5, 10, 15, 20]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
-->
        </div>
    </el-card>
</div>
</div>
</template>
<script>
    import VueQr from 'vue-qr';
    import Get from '@/api/get';
    import Logo from '@/assets/avtar.jpg';
    export default {
        components: {
            VueQr
        },
        data() {
            return {
                explain_con:[],
                copyData: 'https://www.baidu.com',
                text: 'https://www.baidu.com',
                src: Logo,
                listQuery: {
                    pageNo: 1,
                    pageSize: 5,
                },
                total: 5,
                formInline: {
                    currency: 'BTC',
                },
                options: [{
                    value: 'BTC',
                    label: 'BTC'
                }, {
                    value: 'HSR',
                    label: 'HSR'
                }, {
                    value: 'QTUM',
                    label: 'QTUM'
                }, {
                    value: 'ETH',
                    label: 'ETH'
                }],
                table_data1: [],
                table_data: [],
                form: {
                    value: '',
                    btc: ''
                },
                loading1: false,
                loading2: false,
            }
        },
        created() {
            this.copyData = (window.location.href + '?id=' + this.$store.state.user.id).replace('user/referee', 'register');
            this.init();
            Get({
                url: 'retailStore/findAll',
                success: res => {
                    console.log(res);
                    if(res.code === 0){
                        this.explain_con = res.data
                    }
                }
            })
        },
        methods: {
            handleSuccess() {
                this.$message({
                    message: '复制你的推荐人地址成功，随处粘贴可用',
                    type: 'success'
                });
            },
            handleError() {
                this.$message({
                    message: '复制失败',
                    type: 'error'
                });
            },
            init() {
                this.findUserGive()
            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val
                this.init();
            },
            handleCurrentChange(val) {
                this.listQuery.pageNo = val
                this.init();
            },
            findUserGive() {
                this.loading1 = true;
                this.loading2 = true;
                Get({
                    url: 'log/findUserGive',
                    data: {
                        type: 4
                    },
                    success: res => {
                        this.loading2 = false;
                        this.table_data = res.data;
                    }
                });
                Get({
                    url: 'log/findAllUser',
                    success: res => {
                        this.loading1 = false;
                        this.table_data1 = res.data
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

    .explain {
        float: left;
        margin-right: 25px;
    }

    .explain h3 {
        font-size: 14px;
        margin-bottom: 15px;
        margin-top: 20px;
    }

    .explain p {
        margin-bottom: 6px;
        color: #888;
        line-height: 22px;
    }

    .explain_con {
        width: 410px;
    }

</style>
