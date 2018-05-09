<template>
	<div id="app-apply" v-loading = 'loading'>
	<div class="exx-title" >
		<h2>申请成为认证商家</h2>
	</div>
	<div class="seller-content">
		<el-steps :active="0" finish-status="success" align-center>
			<el-step title="申请中"></el-step>
			<el-step title="提交资料"></el-step>
			<el-step title="发送邮件"></el-step>
			<el-step title="审核通过"></el-step>
		</el-steps>
	</div>
	<div class="seller-content">
		<div class="seller-tip-box">
			<p>认证商家状态：<span style="color: rgb(255, 157, 17);">已申请，请耐心等候审核结果</span></p>
		</div>
		<div class="seller-tip-box">
			<p>请准备好如下材料，我们将尽快对您的申请进行审核。</p>
			<div class="seller-info-group">
				<p>EXC2C账户名</p>
				<p>联系电话</p>
				<p>个人QQ</p>
				<p>个人微信</p>
				<p>是否有相应的风控策略</p>
				<p>是否从事过数字资产的场外交易</p>
				<p>个人资产(数字资产情况，近一个月银行流水情况)</p>
			</div>
		</div>
		<!---->
	</div>
</div>
</template>
<script>
	import Post from '@/api/post'
	export default {
		data() {
			return {
				loading: false
			}
		},
		created() {
			if (this.$store.state.user.isMerchant === 1) {
				return
			}
			this.loading = true;
			Post({
				url: 'log/applyFor',
				success: res => {
					this.loading = false;
					if (res.code === 0) {
						this.$message({
							showClose: true,
							message: '申请商家成功，请等待',
							type: 'success'
						});
					} else {
						this.$message({
							showClose: true,
							message: '申请商家失败',
							type: 'error'
						});
					}
				}
			})
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

	.seller-content {
		padding: 20px 50px;
		background: #fff;
	}

	.seller-tip-box {
		padding: 30px 40px;
		background: #fff;
		margin-bottom: 30px;
		line-height: 2em;
		-webkit-box-shadow: 0 1px 6.79px 0.21px rgba(71, 78, 115, 0.15);
		box-shadow: 0 1px 6.79px 0.21px rgba(71, 78, 115, 0.15);
	}

	.seller-info-group {
		margin-top: 10px;
		line-height: 3em;
	}

	.seller-info-group p {
		text-indent: 2em;
		color: #636881;
	}

	.seller-info-group p:before {
		content: counter(section) ". ";
	}

</style>
