<template>
	<div class="con exx-blog">
	<h2>{{data.notice }}
		<p class="time">
			发布时间：{{data.notime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}
		</p>
	</h2>
	<div class="blog-info">
		<p></p>
		<p>尊敬的用户：&nbsp; &nbsp;</p>
		<div v-html='data.noticenr'></div>
	</div>
</div>
</template>

<script>
	export default {
		data() {
			return {
				data: {}
			}
		},
		created() {
			this.data = this.$route.query;
		}
	}

</script>
<style>
	.exx-blog {
		padding: 30px 20px;
		/*		background: #f2f3f5;*/
	}

	p.p1 {
		margin: 0.0px 0.0px 0.0px 0.0px;
		line-height: 19.0px;
		font: 13.0px 'Helvetica Neue'
	}

	span.s1 {
		color: #00a2ff
	}

	.exx-blog h2 {
		border-bottom: 1px solid #f1f3f8;
		padding-bottom: 30px;
		font-size: 24px;
		color: #000;
		text-align: center;
	}

	.exx-blog h2 p {
		color: #999;
		font-size: 12px;
		margin-top: 15px;
	}

	.blog-info p {
		font-size: 14px !important;
		margin-bottom: 15px;
		line-height: 1.8;
	}

</style>
