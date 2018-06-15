<template>
<div class="pay_panel">
	<div class="pay-content">
		<el-card class="box-card">
	    <div slot="header" class="clearfix">
		  	<span style="font-size:14px;font-weight:bold">{{$t('other["认购记录"]')}}</span>
		  </div>
		  <div class="select">
		 	<el-table :data="list" 
				 fit highlight-current-row
				 v-loading='loading'
				 sort-method='hello'
				 border
			   :default-sort = "{prop: 'date', order: 'descending'}"
				style="width: 100%;">
				
<el-table-column align="center" :label="$t(`other['用户昵称']`)" width='200'>
    <template slot-scope="scope">
						<span>{{scope.row.nickName}}</span>
						</template>
</el-table-column>
<el-table-column align="center" :label="$t(`other['认购币名称']`)">
    <template slot-scope="scope">
						<span>{{scope.row.shortName}}</span>
						</template>
</el-table-column>
<el-table-column align="center" :label="$t(`other['每天认购份数']`)" prop='date' >
    <template slot-scope="scope">
							<span>{{scope.row.evrdayCopies}}</span>
						</template>
</el-table-column>
<el-table-column align="center" :label="$t(`other['认购份数']`)">
    <template slot-scope="scope">
							<span>{{scope.row.virtualCopies}}</span>
						</template>
</el-table-column>
<el-table-column align="center" :label="$t(`other['当天时间']`)">
    <template slot-scope="scope">
		<span>{{scope.row.subscriptionTime |parseTime( '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
	</template>
</el-table-column>
</el-table>

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
                loading:false,
                formInline: {
                    teadeMarket: '',
                    pageNo: 1,
                    pageSize: 5,
                    lishi: '1'
                },
                total: 5,
                list: [],
                form: {
                    value: '',
                    btc: ''
                },
            }
        },
        created() {
            this.init()
        },
        methods: {
            onSubmit() {

            },
            handleSizeChange() {
                this.init()
            },
            handleCurrentChange() {
                this.init()
            },
            init() {
                this.loading = true;
                Get({
                    url: 'userSubscription/findAllUserSubscriptionById',
                 
                    success: res => {
                        this.loading = false;
                        if (res.code === 0) {
                            this.list = res.data;
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
