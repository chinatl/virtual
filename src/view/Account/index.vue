<template>
	<div class="layout">
		<div class="con user-sidebar">
			<div class="s-content">
				<div class="user-crumbs">
					<h2>{{$t('account["财务中心"]')}}</h2>
					<p class="active">
						{{ current === 0 ? $t(`account['资金']`) :null}}
						{{ current === 1 ? $t(`account['法币交易']`) :null}}
						{{ current === 3 ? $t(`account['充值']`) :null}}
						{{ current === 4 ? $t(`account['提币']`) :null}}
						{{ current === 5 ? $t(`account['综合账单']`) :null}}
						{{ current === 6 ? $t(`account['委托记录']`) :null}}
						{{ current === 7 ? $t(`account['认购记录']`) :null}}
					</p>
				</div>
				<ul id="user-menu" class="menu">
					<li @click='current = 0' :class="current ===0?'active':''" >
						<router-link to='/account/capital'>{{$t('account["资金"]')}}</router-link>
					</li>
					<li @click='current = 1' :class="current ===1?'active':''" >
						<router-link to='/tender/buy'  style="color: rgb(255, 0, 0);" >{{$t('account["法币交易"]')}}</router-link>
					</li>
					<li @click='current = 3' :class="current ===3?'active':''" >
						<router-link to='/account/rechange'>{{$t('account["充值"]')}}</router-link>
					</li>
					<li @click='current = 4' :class="current ===4?'active':''" >
						<router-link to='/account/currency'>{{$t('account["提币"]')}}</router-link>
					</li>
					<li @click='current = 5' :class="current ===5?'active':''" >
						<router-link to='/account/bill'>{{$t('account["综合账单"]')}}</router-link>
					</li>
					<li @click='current = 6' :class="current ===6?'active':''" >
						<router-link to='/account/log'>{{$t('account["委托记录"]')}}</router-link>
					</li>
					<li @click='current = 7' :class="current === 7?'active':''" >
						<router-link to='/account/sublog'>{{$t('account["认购记录"]')}}</router-link>
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
		watch:{
			
		},
        created() {
            var this_path = this.$route.path;
            if (this_path === '/account/capital') {
                this.current = 0
            } else if (this_path === '/tender/buy') {
                this.current = 1
            } else if (this_path === '/account/rechange') {
                this.current = 3
            } else if (this_path === '/account/currency') {
                this.current = 4
            } else if (this_path === '/account/bill') {
                this.current = 5
            } else if (this_path === '/account/log') {
                this.current = 6
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

</style>
