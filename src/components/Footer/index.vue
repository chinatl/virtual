<template>
<div class="footer">
	<div class="footer-content">
		<div class="footer-menu">
			<dl>
				<dt>{{$t('footer["客户服务"]')}}</dt>
				<dd><a href="/help/display?cid=4012&amp;fid=4" target="_self">{{$t('footer["上币申请"]')}}</a></dd>
				<dd><a href="/help" target="_self">{{$t('footer["帮助"]')}}</a></dd>
				<dd><a href="/blog" target="_self">{{$t('footer["公告"]')}}</a></dd>
				<dd><a href="/help/rate" target="_self">{{$t('footer["费率"]')}}</a></dd>
				<dd><a href="/app" target="_self">{{$t('footer["APP"]')}}</a></dd>
			</dl>

			<dl>
				<dt>{{$t('footer["工具支持"]')}}</dt>
				<dd><a href="/help/restApi" target="_self">{{$t('footer["API"]')}}</a></dd>
			</dl>
			<dl>
				<dt>{{$t('footer["联系我们"]')}}</dt>
				<dd><span>工作日工作时间</span>：</dd>
				<dd><span>节假日工作时间</span>：</dd>
				<dd><span>联系QQ</span>：</dd>
				<dd><span>联系微博</span>：</dd>
				<dd><span>联系微博</span>：</dd>
				<dd><span>qq群</span>：</dd>
				<dd><span>联系微信</span>：</dd>
			</dl>
		</div>
		<div class="copyright">
			<a href="/" title="EXX.COM"></a>
			<p>Copyright © 2017~2018 - .COM</p>
		</div>
	</div>
</div>
</template>
<script>
	import Get from '@/api/get'
	export default {
		data() {
			return {

			}
		},
		created() {
			Get({
				url: 'work/selWork',
				success: res => {
					if (res.code === 0) {
						console.log(res.data)
					} else {
						this.$message({
							showClose: true,
							message: res.message,
							type: 'error'
						});
					}
				}
			})
		}
	}

</script>
<style>
	.footer {
		-webkit-box-flex: 0;
		-ms-flex: none;
		flex: none;
		background: #232731
	}

	.footer-content {
		width: 1200px;
		margin: 0 auto;
		padding: 50px 0;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
	}

	.footer-menu {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
	}

	.footer .copyright {
		text-align: right;
		color: rgba(255, 255, 255, .8);
	}

	.footer .copyright p {
		margin-top: 20px;
	}

	.footer dl {
		margin-right: 50px;
		padding-right: 50px;
	}

	.footer dl dt {
		color: #fff;
		margin-bottom: 20px;
	}

	.footer dl dd {
		margin-top: 15px;
	}

	.footer dl dd,
	.footer dl dd a {
		color: rgba(255, 255, 255, .7);
	}

</style>
