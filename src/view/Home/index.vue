<template>
	<div class='layout-home' style="margin-top:-50px" v-loading="fullscreenLoading">
  		<div class="swiper">
		  <el-carousel height="400px" trigger="click" indicator-position="inside" :interval='5000'>
			<el-carousel-item v-for="(i,v) in item" :key="v">
		  		<div class='swiper_img' :style="i">
		  			<div class="con cotent_swiper">
		  				<h3>{{$t('other["太空莲"]')}}（SPC）{{$t('other["独家首发"]')}}</h3>
		  				<p class="title_swiper">{{$t('other["交易市场"]')}}：SPC/BTC、SPC/QTUM</p>
						<p><el-button type="danger">{{$t('home["查看详情"]')}}</el-button></p>
		  			</div>
		  		</div>
			</el-carousel-item>
		  </el-carousel>
  		</div>
  		<div class="kline-trend con">
  			<div style='position:relative'>  
				<div class="con menu menu--prospero">
					<ul class="menu__list">
						<li v-for='(item,index) in nav_data'
							@click='change_nav(item,index)'
							:class="current === index ? 'menu__item menu__item--current':'menu__item'" >
							<a class="menu__link" style="line-height:25px"><img :src="item.markUrl" alt="" class="markUrl" v-if='item.vName !== "自选"'>{{item.vName}}</a>
						</li>
					</ul>
				</div>
				<div class='search_trade'>
					<el-input placeholder='搜索' v-model='select_son' size='small' @keyup.native='change_sel'></el-input>
				</div>
  			</div>
  			<div class="trend-chart">
				<el-table :data="list" 
				v-loading='loading'
				 fit highlight-current-row
				 @row-click='pushtrade'
				style="width: 100%;margin-top:20px">
<!--			   :default-sort = "{prop: 'trend', order: 'descending'}"-->
					<el-table-column align="center" width='100px'>
						<template slot-scope="scope" >
							<span style="color:rgb(247, 186, 42);font-size:16px;cursor:pointer" @click='add_my(scope.row,scope.$index)'>
								<i class='el-icon-star-on' v-show='showstart(scope.$index)'></i>
								<i class='el-icon-star-off' v-show='!showstart(scope.$index)'></i>
							</span>
						</template>
</el-table-column>
<el-table-column align="left" :label="$t(`home['市场']`)">
	<template slot-scope="scope">
						<span>
						<img :src="scope.row.markUrl" alt="" style='width:20px;margin-right:6px;vertical-align:top'>
							{{(scope.row.vName && (scope.row.vName.split('_')[0] + '/' + scope.row.vName.split('_')[1])) | filter_num}}
						</span>
						</template>
</el-table-column>
<el-table-column align="center" :label="$t(`home['最新单价']`)">
	<template slot-scope="scope">
		<span>{{scope.row.latestPrize | filter_num}} {{scope.row.vName && scope.row.vName.split('_')[1]}}</span>
	</template>
</el-table-column>

<el-table-column align="center" :label="$t(`home['24h最大价格']`)" width='170'>
	<template slot-scope="scope">
					<span style="color:rgb(253, 49, 91)">{{scope.row.maxprize | filter_num}} {{scope.row.vName && scope.row.vName.split('_')[1]}}</span>
					</template>
</el-table-column>
<el-table-column align="center" :label="$t(`home['24h最小价格']`)" width='170'>
	<template slot-scope="scope">
					<span style="color:rgb(48, 194, 150)">{{scope.row.minprize | filter_num}} {{scope.row.vName && scope.row.vName.split('_')[1]}}</span>
					</template>
</el-table-column>
<el-table-column align="center" :label="$t(`home['24h总金额']`)" width='200'>
	<template slot-scope="scope">
					<span>{{scope.row.sumAnout | filter_num}} {{scope.row.vName && scope.row.vName.split('_')[0]}}</span>
					</template>
</el-table-column>
<el-table-column align="center" :label="$t(`home['涨跌幅']`)" sortable prop='trend'>
	<template slot-scope="scope">
					<span :style='{color: scope.row.roseFall < 0 ? "rgb(48, 194, 150)" : "rgb(253, 49, 91)"}'>
						{{scope.row.roseFall > 0 ? '+' : null}}
						{{scope.row.roseFall && scope.row.roseFall.toFixed(2)}} %
					</span>
					</template>
</el-table-column>
<el-table-column align="center" :label="$t(`home['6小时走势']`)">
	<template slot-scope="scope">
			<trend
					:data="getRound(scope.row.maxPrize,scope.row.prizeList)"
					auto-draw
					:padding='5'
					:radius='20'
					:height='50'
					:gradient="getColor()"
					smooth>
					</trend>
					</template>
</el-table-column>
</el-table>
</div>
</div>
<div class="advantage con">
	<h2>{{$t('home["专注"]')}}</h2>
	<ul>
		<li>
			<div class="icon">
				<p><span>1<em>‰</em></span><i class="trading-icon trading-icon-jiaoyi"></i></p>
			</div>
			<h3>{{$t('home["交易title"]')}}</h3>
			<p class="text">{{$t('home["交易content"]')}}</p>
		</li>
		<li>
			<div class="icon">
				<p><span>3<em>×</em></span><i class="trading-icon trading-icon-ganggan"></i></p>
			</div>
			<h3>{{$t('home["杠杆title"]')}}</h3>
			<p class="text">{{$t('home["杠杆content"]')}}</p>
		</li>
		<li>
			<div class="icon">
				<p><span>10<em>+</em></span><i class="trading-icon trading-icon-yonghu"></i></p>
			</div>
			<h3>{{$t('home["子账号title"]')}}</h3>
			<p class="text">{{$t('home["子账号content"]')}}</p>
		</li>
		<li>
			<div class="icon">
				<p><span>24<em>H</em></span><i class="trading-icon trading-icon-kefu"></i></p>
			</div>
			<h3>{{$t('home["服务title"]')}}</h3>
			<p class="text">{{$t('home["服务content"]')}}</p>
		</li>
	</ul>
</div>
</div>
</template>

<script>
	import Post from '@/api/post'
	import Get from '@/api/get'
	export default {
		data() {
			return {
				fullscreenLoading: false,
				select_son: '',
				loading: false,
				current: 0,
				list: [],
				radio2: 3,
				active: {
					activeName: 'second'
				},
				item: [{
						backgroundImage: "url(" + require("@/assets/img/banner.jpg") + ")",
					},
					{
						backgroundImage: "url(" + require("@/assets/img/banner1.jpg") + ")",
					},
					{
						backgroundImage: "url(" + require("@/assets/img/banner2.jpg") + ")"
					}
				],
				nav_data: [],
				nav: {},
				myArr: [],
				current_data: []
			}
		},
		computed: {},
		methods: {
			change_sel(e) {
				var res = e.target.value;
				if (res) {
					res = res.toUpperCase()
					var newArr = [];
					for (var i = 0; i < this.current_data.length; i++) {
						if (this.current_data[i].vName.includes(res)) {
							newArr.push(this.current_data[i]);
						}
					}
					this.list = JSON.parse(JSON.stringify(newArr));
				} else {
					this.list = JSON.parse(JSON.stringify(this.current_data));
				}
			},
			pushtrade(row, event, column) {
				if (!column.label) {
					return
				}
				window.location.href = "./trade?" + row.vName;
			},
			showstart(index) {
				return this.list[index].show
			},
			add_my(item, index) {
				var arr = JSON.parse(JSON.stringify(this.list));
				if (this.nav_data[this.current].vName === '自选') {
					this.myArr.splice(index, 1);
					this.list.splice(index, 1);
					localStorage.setItem('myscope', JSON.stringify(this.myArr));
					return
				}
				if (this.list[index].show) {
					this.myArr = this.myArr.filter(res => {
						return res.vName !== item.vName
					})
					localStorage.setItem('myscope', JSON.stringify(this.myArr));
					arr[index].show = false;
					this.list = arr;
				} else {
					item.show = true;
					this.myArr.push(item);
					localStorage.setItem('myscope', JSON.stringify(this.myArr));
					arr[index].show = true;
					this.list = arr;
				}
			},
			getColor() {
				var arr = ['#aaaaaa', 'red', 'blue', 'black', 'green'];//在这配置
//				return [arr[Math.floor(Math.random() * 5)]]
				return ['red']
			},
			getRound(maxPrice, list) {
				if (!list || list.length === 0 || list.length === 1) {
					return [0, 0, 0, 0]
				}
				return list.map(res => {
					return res.prize / maxPrice * 35
				})
			},
			change_nav(item, index) {
				if (this.loading) {
					return
				}
				this.current = index;
				if (item.vName === '自选') {
					return this.list = JSON.parse(JSON.stringify(this.myArr))
				};
				this.init(item)
			},
			init(item) {
				let bId = item.bId;
				let vName = item.vName;
				this.loading = true;
				Get({
					url: 'basisMarket/findHomepageData',
					data: {
						bId,
						vName
					},
					success: res => {
						if (res.code === 0) {
							for (var i = 0; i < res.data.length; i++) {
								res.data[i].show = false;
								for (var k = 0; k < this.myArr.length; k++) {
									if (this.myArr[k].vName === res.data[i].vName) {
										res.data[i].show = true;
									}
								}
							}
							this.list = res.data;
							this.current_data = res.data;
						} else {
							this.$message({
								showClose: true,
								message: res.data,
								type: 'error'
							});
						}
						this.loading = false;
					},
					fail: res => {
						this.loading = false;
					}
				})
			},
		},
		created() {
			this.fullscreenLoading = true;
			var local = localStorage.getItem('myscope');
			this.myArr = JSON.parse(local) || [];
			Get({
				url: 'basisMarket/selBasisMarket',
				success: res => {
					this.fullscreenLoading = false;
					if (res.code === 0) {
						this.nav_data = res.data;
						this.nav_data.push({
							vName: '自选',
						})
						this.nav = res.data[this.current];
						this.init(res.data[this.current]);
					} else {
						this.$message({
							showClose: true,
							message: res.message,
							type: 'error'
						});
					}
				},
				fail: res => {
					this.fullscreenLoading = false;
				}
			})
			/*初始化用户*/
			/*获取客服配置*/


		}
	}

</script>
<style>
	@import '../../assets/css/line.css';
	.layout-home {
		width: 100%;

	}

	.search_trade {
		position: absolute;
		right: 0;
		top: 24px;
	}

	.markUrl {
		width: 24px;
		height: 24px;
		vertical-align: sub;
		margin-right: 10px;


	}

	div.el-carousel {
		width: 100%;
	}


	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}

	.swiper_img {
		width: 100%;
		height: 500px;
	}

	.cotent_swiper {
		text-align: center;
		overflow: hidden;
		font-family: "微软雅黑"
	}

	.cotent_swiper h3 {
		font-size: 40px;
		color: #fff;
		margin-bottom: 15px;
		margin-top: 130px;
	}

	.cotent_swiper p.title_swiper {
		font-size: 20px;
		color: #fff;
		margin-bottom: 25px;
		font-weight: bold
	}

	.advantage {
		text-align: center;
		padding: 80px 0 100px 0;
		overflow: hidden
	}

	.advantage h2 {
		font-size: 24px;
		margin-bottom: 100px;
	}

	.advantage ul {
		text-align: center;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		-ms-flex-pack: justify;
		justify-content: space-between;
	}

	.advantage li {
		-webkit-box-flex: 0;
		-ms-flex: 0 0 calc((100% - 120px) / 4);
		flex: 0 0 calc((100% - 120px) / 4);
	}

	.advantage li .icon {
		width: 100px;
		height: 100px;
		margin: 0 auto;
	}

	.advantage li .icon p {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		border: 1px dashed #ffc000;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		color: #ffc000;
		font-size: 40px;
		font-weight: 600;
		position: relative;
	}

	.advantage li .icon i {
		position: absolute;
		margin: auto;
		color: #ffc000;
		font-size: 40px !important;
		font-weight: normal;
		background: #fff;
		top: -18px;
		left: 50%;
		-webkit-transform: translateX(-50%);
		transform: translateX(-50%);
	}

	.advantage li h3 {
		font-size: 18px;
		color: #333;
		margin: 20px 0;
	}

	.advantage li p.text {
		color: #999;
		line-height: 1.5;
		font-size: 12px
	}

	.advantage li .icon span em {
		font-size: 12px;
		font-weight: normal;
		display: inline-block;
		margin-left: 3px;
	}

	.kline-trend {
		margin: 0 auto;
	}

	.trend-chart .el-table td,
	.el-table th {
		padding: 4px 0
	}

	.trend-chart .has-gutter {
		color: #fff;
		background-color: #232731!important
	}

	.trend-chart .has-gutter th {
		background-color: #232731!important
	}

</style>
