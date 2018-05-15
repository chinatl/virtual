<template>
	<div id="app-apply" v-loading = 'loading'>
	<div class="exx-title" >
		<h2>{{$t(`footer['申请成为认证商家']`)}}</h2>
	</div>
	<div class="seller-content">
		<el-steps :active="0" finish-status="success" align-center>
			<el-step :title="$t(`footer['申请中']`)"></el-step>
			<el-step :title="$t(`footer['提交资料']`)"></el-step>
			<el-step :title="$t(`footer['发送邮件']`)"></el-step>
			<el-step :title="$t(`footer['审核通过']`)"></el-step>
		</el-steps>
	</div>
	<div class="seller-content">
		<div class="seller-tip-box">
			<p>{{$t(`footer['认证商家状态']`)}}：<span style="color: rgb(255, 157, 17);">{{$t(`footer['已申请，请耐心等候审核结果']`)}}</span></p>
		</div>
		<div class="seller-tip-box">
			<p>{{$t(`footer['准备资料']`)}}。</p>
			<div>
				<p>1.{{$t(`footer['账户名']`)}} </p>
				<p>2.{{$t(`footer['联系电话']`)}} </p>
				<p>3.{{$t(`footer['个人']`)}}QQ </p>
				<p>4.{{$t(`footer['个人微信']`)}} </p>
				<p>5.{{$t(`footer['是否有相应的风控策略']`)}}</p>
				<p>6.{{$t(`footer['是否从事过数字资产的场外交易']`)}} </p>
				<p>7.{{$t(`footer['个人资产']`)}}</p>
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
							message: res.data,
							type: 'success'
						});
					} else {
						this.$message({
							showClose: true,
							message: res.data,
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
