<template>
	<div class="layout">
		<div class="con tender">
			<div class="fl item">
				<ul>
					<li class="title">{{$t(`footer['交易']`)}}</li>
					<li><router-link to='/tender/buy'>{{$t(`footer['买入']`)}}</router-link></li>
					<li><router-link to='/tender/sell'>{{$t(`footer['买出']`)}}</router-link></li>
<!--					<li><router-link to='/tender/resolve'>确认订单</router-link></li>-->
					<li class="title">{{$t(`footer['个人中心']`)}}</li>
					<li><router-link to='/tender/order'>{{$t(`footer['我的订单']`)}}</router-link></li>
					<li><router-link to='/tender/data'>{{$t(`footer['我的资料']`)}}</router-link></li>
				</ul>
				<el-button @click.native='push_data' v-if='$store.state.user.isMerchant === 1 || $store.state.user.isMerchant === 0|| $store.state.user.isMerchant === 3' style='width:100%;margin-top:10px;background-color:orange;color:#fff;font-weight:bold'>{{$t(`footer['申请商家']`)}}</el-button>
			</div>
			<div class="fr item-page">
				<transition name="fade" mode="out-in">
			  		<router-view></router-view>
				</transition>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return {
			
		}
	},
	created(){
		console.log(this.$store.state.user)	
	},
	methods:{
		push_data(){
			this.$router.push({path:'/tender/apply'})
		}
	}
}

</script>
<style>
	.layout {
		background-color: #f2f3f5;
		padding: 30px 0;
	}
	
	.tender {
		overflow: hidden;
	}
	
	.tender .item {
		overflow: hidden;
		width: 180px;
		border-radius: 5px
	}
	
	.tender .item ul {
		overflow: hidden;
		background-color: #fff;
		text-align: center
	}
	
	.tender ul li {
		cursor: pointer;
		font-size: 10px;
		color: #000;
		height: 45px;
		line-height: 45px;
	}
	
	.tender ul li a {
		width: 100%;
		height: 100%;
		cursor: pointer;
		font-size: 10px;
		color: #000;
		display: block;
		padding: 0 20px;
	}
	
	.tender ul li.title {
		font-size: 14px;
		font-weight: bold;
	}
	
	.item-page {
		width: 1000px;
		padding: 20px;
		box-sizing: border-box;
		background-color: #fff;
		border-radius: 5px;
	}
	
	.tender .router-link-active {
		color: orange;
		font-weight: bold;
		background: #f9f9f9;
	}

</style>
