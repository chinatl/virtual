<template>
	<div class="layout">
		<div class="con user-sidebar">
			<div class="s-content">
				<div class="user-crumbs">
					<h2>{{$t('user["用户中心"]')}}</h2>
					<p class="active">
						{{ current === 0 ? $t('user["账号管理"]') :null}}
						{{ current === 1 ? $t('user["推荐人"]') :null}}
						{{ current === 2 ? $t('user["API"]') :null}}
					</p>
				</div>
				<ul id="user-menu" class="menu">
					<li @click='current = 0' :class="current ===0?'active':''" >
						<router-link to='/user/number'>{{$t('user["账号"]')}}</router-link>
					</li>
					<li @click='current = 1' :class="current ===1?'active':''" >
						<router-link to='/user/referee'>{{$t('user["推荐人"]')}}</router-link>
					</li>
					<li  @click='current = 2' :class="current ===2?'active':''" >
						<router-link to='/user/api'>{{$t('user["API"]')}}</router-link>
					</li>
				</ul>
			</div>
			<transition name="fade" mode="out-in">
			  <router-view></router-view>
			</transition>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				current: 0
			}
		},
		created() {
			var this_path = this.$route.path;
			if (this_path === '/user/referee') {
				this.current = 1
			} else if (this_path === '/user/api') {
				this.current = 2
			} else {
				this.current = 0
			}
		}
	}

</script>
<style>
	.layout {
		background-color: #f2f3f5;
		padding: 30px 0;
	}
	
	.account {}
	
	.user-sidebar {
		overflow: hidden;
		padding-bottom: 8px;
		margin-bottom: -8px;
		background-color: #fff;
		width: 1200px;
		position: relative;
		margin: 0 auto;
		background: #fff;
		border-radius: 5px;
		padding: 10px;
		box-sizing: border-box;
		-webkit-box-shadow: 0 0 5px rgba(0, 0, 0, .08);
		box-shadow: 0 0 5px rgba(0, 0, 0, .08);
	}
	
	.user-sidebar .s-content {
		background-color: #fff;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		padding-left: 20px;
	}
	
	.user-sidebar .menu {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
	}
	
	.user-sidebar .menu li:nth-of-type(n+2):before {
		content: "";
		position: absolute;
		height: 12px;
		width: 2px;
		background: #e8eaec;
		left: 0;
		top: 50%;
		-webkit-transform: translateY(-50%);
		transform: translateY(-50%);
	}
	
	.user-sidebar .menu li.active a {
		color: #ff9d11;
	}
	
	.user-sidebar .menu li a {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		height: 70px;
		color: #333;
		padding: 0 25px;
		font-size: 14px;
		font-weight: 600
	}
	
	ul.hide {
		display: none
	}
	
	.user-crumbs {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}
	
	.user-crumbs h2 {
		color: #000;
		font-size: 16px;
		font-weight: bold
	}
	
	.user-crumbs p {
		margin-left: 22px;
		position: relative;
		font-size: 14px;
		font-weight: bold;
		color: #000;
	}
	
	.user-crumbs p:before {
		content: "/";
		display: block;
		position: absolute;
		left: -13px;
		color: #ccc;
		-webkit-transform: scale(.8);
		transform: scale(.8);
	}
	
	.user-sidebar .menu li {
		position: relative;
	}
	
	.user-sidebar .router-link-active {
		color: #ff9d11
	}

</style>
