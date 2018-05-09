<template>
<div class="pay_blog con" v-loading='loading'>
	<div class="pay-content">
		<el-card class="box-card">
	    <div slot="header" class="clearfix">
		  	<span style="font-size:14px;font-weight:bold">公告</span>
		  </div>
		  <div class="select">
		 		<ul>
		 			<li v-for='item in arr'>
		 				<h3>{{item.notice}}</h3>
						<p>{{item.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</p>
		 			</li>
		 		</ul>
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
                arr: [],
            }
        },
        methods: {

        },
        created() {
            this.loading = true;
            Get({
                url: 'notice/findAll',
                success: res => {
                    this.loading = false;
                    if (res.code === 0) {
                        this.arr = res.data;
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
        }

    }

</script>
<style>
    .pay_blog {
        padding: 18px;
    }

    .pay_blog .el-card__body {
        padding: 0 20px 10px 20px
    }

    .pay_blog .select ul {
        overflow: hidden;
    }

    .pay_blog .select ul li {
        height: 76px;
        padding: 25px;
        border-bottom: 1px solid #eee;
    }

    .pay_blog .select ul li h3 a {
        color: #333;
        font-size: 14px;
        cursor: pointer
    }

    .pay_blog .select ul li h3 a:hover {
        color: #ff9d11
    }

    .pay_blog .select ul li p {
        color: #999;
        display: block;
        font-size: 12px;
        margin-top: 6px;
    }

    .pay_blog .pay-content {
        margin-bottom: 20px;
    }

</style>
