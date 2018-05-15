<template>
	<div class="subs" v-loading.fullscreen.lock="fullscreenLoading">
		<div class='title'>
			<div class="con">
				<h3 :style='{fontSize:new_page_data.fontSize+"px"}'>{{new_page_data.timu}}</h3>
				<p :style='{fontSize:new_page_data.fontSize*.6+"px"}'>{{new_page_data.timuTime}}</p>
			</div>
			<canvas id="space" height="500"></canvas>
		</div>
		<div class="intrdouce">
			<div class="desc_con">
				<div class="desc_buy">
					<h3 class="desc_title">{{$t('subscription["抢购详情"]')}}</h3>
					<div class="blife">
						<div class="fl blife-msessage">
							<ul>
								<li v-for='(item,index) in arr_data' @click='check(index)' 
								:class='current === index ? "current":null'>
								{{$t('subscription["抢购项目"]')}}：{{item.vName}}{{$t('subscription["官方代币"]')}}</li>
							</ul>
						</div>
						<div class="fr blife-projess">
							<p>{{$t('subscription["已认购份数"]')}}：<span class="blue">{{(page_data.surplusNumber/ 10000).toFixed(2)}}{{$t('subscription["万份枚"]')}}</span><span class="arrow">↑</span></p>
<!--							<p><el-progress :percentage="200"></el-progress></p>-->
							<div><p></p></div>
							<div class="fast-buy margin">
								<div>{{$t('subscription["购买份数"]')}}</div>
								<el-button :disabled=' isStart=== "距离抢购开始还剩" || isStart=== "抢购已结束" '
                                @click='ex_change(item.subscriptionId,item.subscriptionName,item.currencyRatio)'
                                :class=" index == i ? 'border current' : 'border'" v-for='(item,i) in virtualArr' 
                                size='nimi'
                                >
								{{$t('subscription["使用"]')}}{{item.subscriptionName}}{{$t('subscription["抢购"]')}}
                                </el-button>
							</div>
							<div class='margin qianggou'>
								<el-button type='primary'
									size='mini' 
									@click='go_exchange'
								 :disabled=' isStart=== "距离抢购开始还剩" || isStart=== "抢购已结束" '>{{$t('subscription["立即抢购"]')}}</el-button>
								<div>{{isStart}}<span class="blue">{{leftTime}}</span></div>
							</div>
							<p>{{$t('subscription["备注"]')}}：{{page_data.remark}}</p>
						</div>
					</div>
				</div>
				<div class="suggest">
					<div class="suggest-item fl">
						<h3 class="desc_title">{{$t('subscription["项目介绍"]')}}</h3>
						<div class="blife">
							{{page_data.proIntroduce}}
						</div>
					</div>
					<div class="suggest-rule fr">
						<h3 class="desc_title">{{$t('subscription["兑换规则"]')}}</h3>
						<div class="blife">
							{{page_data.rule}}
						</div>
					</div>
				</div>
			</div>
		</div>
<div class="t-dialog">
	<el-dialog title="立即抢购" :visible.sync="dialogFormVisible"  label-width="80px">
		  <el-form :model="form">
			<el-form-item label="认购币种：">
			  <el-input v-model="form.virtualName" auto-complete="off" style='width:300px' disabled></el-input>
			</el-form-item>
		  </el-form> 
		  <el-form :model="form">
			<el-form-item label="交易币种：">
			  <el-input v-model="form.subscriptionName" auto-complete="off" style='width:300px' disabled></el-input>
			</el-form-item>
		  </el-form> 
		  <el-form :model="form">
			<el-form-item label="输入份数：">
			  <el-input v-model="form.virtualCopies"
			  	@change.native='get_vTotal'
			  	@keyup.native='get_vTotal'
				type='number'
			   	placeholder='请输入整数' style='width:300px'></el-input>
			   <br />
			  <span style='margin-left:82px'>预计{{vTotal}}{{form.subscriptionName}}</span>
			</el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
			<el-button @click="dialogFormVisible = false">取 消</el-button>
			<el-button type="primary" @click="agree">确 定</el-button>
		  </div>
	</el-dialog>
</div>
</div>
</template>

<script>
	import Get from '@/api/get';
	import Post from '@/api/post';
	export default {
		data() {
			return {
				current: 0,
				fullscreenLoading: true,
				dialogFormVisible: false,
				form: {
					virtualCopies: '',
					subscriptionId: '',
					virtualId: '',
					subscriptionName: '',
					virtualName: '',
					currencyRatio: '',
				},
				page_data: {
					proIntroduce: '',
					rule: '',
					timu: '',
					timuTime: '',
					virtualId: "",
					startTime: '',
					endTime: '',
					maxCopies: '',
					vName: '',
					remark: '',
					surplusNumber: '',
					eachNumber: ''
				},
				arr_data: [],
				title: '',
				leftTime: '',
				virtualId: '',
				isStart: '',
				number: '',
				virtualArr: [],
				vTotal: '0',
				maxCopies: 0,
				exchnage_status: true, //认购状态
				index: 0,
				timer: null,
				new_page_data: {}
			}
		},
		methods: {
			check_number() {

			},
			check(index) {
				this.current = index;
				this.page_data = this.arr_data[index];
				this.init(this.page_data);
			},
			go_exchange() {
				//                if (this.exchnage_status) {
				//                    this.$message({
				//                        message: '今日已达最大认购数量',
				//                        type: 'warning'
				//                    });
				//                    return
				//                }
				var data = this.virtualArr[this.index];
				if (!data) {
					this.$message({
						message: '暂不支持币种认购',
						type: 'warning'
					});
					return
				}
				this.form.subscriptionId = data.subscriptionId;
				this.dialogFormVisible = true;
				this.form.subscriptionName = data.subscriptionName;
				this.form.currencyRatio = data.currencyRatio;
				this.form.virtualId = this.page_data.virtualId;
				this.form.virtualName = this.page_data.vName;
			},
			get_vTotal() {
				var v = this.form.virtualCopies;
				if ((v - 0) < 0) {
					this.$message({
						message: '至少认购1份',
						type: 'warning'
					});
					return
				}
				this.form.virtualCopies = Math.floor(v);
				this.vTotal = (this.form.currencyRatio * this.form.virtualCopies * this.page_data.eachNumber).toFixed(3);
			},
			end_time(startTime, endTime) {
				clearInterval(this.timer);
				var nowTime = Date.now();
				if (nowTime < startTime) {
					this.isStart = '距离抢购开始还剩';
					this.timer = setInterval(res => {
						var now = Date.now();
						//设置截止时间  
						var starTime = startTime;
						//时间差  
						var leftTime = starTime - now;
						//定义变量 d,h,m,s保存倒计时的时间  
						var d, h, m, s;
						if (leftTime >= 0) {
							d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
							h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
							m = Math.floor(leftTime / 1000 / 60 % 60);
							s = Math.floor(leftTime / 1000 % 60);
							this.leftTime = d + '天' + h + '时' + m + '分' + s + '秒'
						} else {
							clearInterval(this.timer)
						}
					}, 1000)
				}
				if (nowTime >= startTime && nowTime <= endTime) {
					this.isStart = '距离抢购结束还剩'
					this.timer = setInterval(res => {
						var now = Date.now();
						//设置截止时间  
						var starTime = endTime;
						//时间差  
						var leftTime = starTime - now;
						//定义变量 d,h,m,s保存倒计时的时间  
						var d, h, m, s;
						if (leftTime >= 0) {
							d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
							h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
							m = Math.floor(leftTime / 1000 / 60 % 60);
							s = Math.floor(leftTime / 1000 % 60);
							this.leftTime = d + '天' + h + '时' + m + '分' + s + '秒'
						} else {
							clearInterval(this.timer)
						}
					}, 1000)
				}
				if (nowTime > endTime) {
					this.isStart = '抢购已结束'
				}

				//获取当前时间  

			},
			ex_change(id, subscriptionName, currencyRatio) {
				this.form.subscriptionId = id;
				this.dialogFormVisible = true;
				this.form.subscriptionName = subscriptionName;
				this.form.currencyRatio = currencyRatio;
				this.form.virtualId = this.page_data.virtualId;
				this.form.virtualName = this.page_data.vName;
			},
			agree() {
				if (this.form.virtualCopies === '') {
					this.$message({
						message: '请输入抢购份数',
						type: 'error'
					});
					return
				}	
				if (this.form.virtualCopies === 0) {
					this.$message({
						message: '请输入至少一份抢购份数',
						type: 'error'
					});
					return
				}
				this.fullscreenLoading = true;
				Post({
					url: 'userSubscription/addUserSubscription',
					data: {
						virtualId: this.form.virtualId,
						subscriptionId: this.form.subscriptionId,
						virtualCopies: this.form.virtualCopies,
					},
					success: res => {
						this.fullscreenLoading = false;
						if (res.code === 0) {
							this.form = {
								virtualCopies: '',
								subscriptionId: '',
								virtualId: '',
								subscriptionName: '',
								virtualName: '',
								currencyRatio: ''
							};
							this.$notify({
								title: '成功',
								message: '抢购成功',
								type: 'success'
							});
							this.dialogFormVisible = false;
						} else {
							this.$notify.error({
								title: '失败',
								message: res.data
							});
							this.dialogFormVisible = false;
						}
					},
					fail: res => {
						this.fullscreenLoading = false;
					}
				})
			},
			init(push_data) {
				this.fullscreenLoading = true;
				this.end_time(push_data.startTime, push_data.endTime);
				Get({
					url: 'userSubscription/findSubscriptionCurrency',
					data: {
						id: push_data.virtualId,
					},
					success: res => {
						if (res.code === 0) {
							this.fullscreenLoading = false;
							this.virtualArr = [];
							for (var i = 0; i < res.data.length; i++) {
								var item = res.data[i]
								if (item.currencyId == push_data.virtualId && item.subscriptionName + '' !== 'null') {
									let obj = {};
									obj.subscriptionName = res.data[i].subscriptionName;
									obj.subscriptionId = res.data[i].subscriptionId;
									obj.currencyRatio = res.data[i].currencyRatio;
									this.virtualArr.push(obj)
								}
							}
							Get({
								url: 'userSubscription/findAll',
								success: res => {
									if (res.code === 0) {
										if (res.data.length === 0) {
											return
										}
										var data = res.data[0];
										this.exchnage_status = data.evrdayCopies >= push_data.maxCopies;
									}
								}
							})
						} else {
							this.fullscreenLoading = false;
							this.$notify.error({
								title: '失败',
								message: res.message
							});
						}
					},
					fail: res => {
						this.fullscreenLoading = false;
					}
				});
			}
		},
		created() {
			Get({
				url: 'subscription/findAll',
				success: res => {
					if (res.code === 0) {
						this.arr_data = res.data;
						this.page_data = res.data[0];
						this.init(this.page_data)
					} else {
						this.fullscreenLoading = false;
						this.$notify.error({
							title: '失败',
							message: res.message
						});
					}
				},
				fail: res => {
					this.fullscreenLoading = false;
				}
			});
			Get({
				url: 'prompt/findAll',
				success: res => {
					this.fullscreenLoading = false;
					if (res.code === 0) {
						this.new_page_data.timu = res.data[0].timu;
						this.new_page_data.timuTime = res.data[0].timuTime;
						this.new_page_data.fontSize = res.data[0].fontSize - 0;
					} else {
						this.fullscreenLoading = false;
						this.$notify.error({
							title: '失败',
							message: res.message
						});
					}
				},
				fail: res => {
					this.fullscreenLoading = false;
				}
			});
		},
		mounted() {
			//based on an Example by @curran
			window.requestAnimFrame = (function() {
				return window.requestAnimationFrame
			})();
			var canvas = document.getElementById("space");
			var c = canvas.getContext("2d");

			var numStars = 1900;
			var radius = '0.' + Math.floor(Math.random() * 9) + 1;
			var focalLength = canvas.width * 2;
			var warp = 0;
			var centerX, centerY;

			var stars = [],
				star;
			var i;

			var animate = true;

			initializeStars();

			function executeFrame() {

				if (animate)
					requestAnimFrame(executeFrame);
				moveStars();
				drawStars();
			}

			function initializeStars() {
				centerX = canvas.width / 2;
				centerY = canvas.height / 2;

				stars = [];
				for (i = 0; i < numStars; i++) {
					star = {
						x: Math.random() * canvas.width,
						y: Math.random() * canvas.height,
						z: Math.random() * canvas.width,
						o: '0.' + Math.floor(Math.random() * 99) + 1
					};
					stars.push(star);
				}
			}

			function moveStars() {
				for (i = 0; i < numStars; i++) {
					star = stars[i];
					star.z--;

					if (star.z <= 0) {
						star.z = canvas.width;
					}
				}
			}

			function drawStars() {
				var pixelX, pixelY, pixelRadius;

				// Resize to the screen
				if (canvas.width != window.innerWidth || canvas.width != window.innerWidth) {
					canvas.width = window.innerWidth;
					canvas.height = window.innerHeight;
					initializeStars();
				}
				if (warp == 0) {
					c.fillStyle = "rgba(0,10,20,1)";
					c.fillRect(0, 0, canvas.width, canvas.height);
				}
				c.fillStyle = "rgba(209, 255, 255, " + radius + ")";
				for (i = 0; i < numStars; i++) {
					star = stars[i];

					pixelX = (star.x - centerX) * (focalLength / star.z);
					pixelX += centerX;
					pixelY = (star.y - centerY) * (focalLength / star.z);
					pixelY += centerY;
					pixelRadius = 1 * (focalLength / star.z);

					c.fillRect(pixelX, pixelY, pixelRadius, pixelRadius);
					c.fillStyle = "rgba(209, 255, 255, " + star.o + ")";
					//c.fill();
				}
			}

			/*document.getElementById('warp').addEventListener("click", function(e) {
				window.c.beginPath();
				window.c.clearRect(0, 0, window.canvas.width, window.canvas.height);
				window.warp = warp ? 0 : 1;
				executeFrame();
			});*/

			executeFrame();

		}
	}

</script>

<style>
	.t-dialog .el-dialog {
		width: 422px
	}

	.t-dialog .el-dialog__body {
		padding: 30px 20px 0px 20px;
	}

	.subs {
		width: 100%;
	}

	.subs #space {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 300px;
	}

	.subs .title {
		height: 300px;
		position: relative;
		overflow: hidden
	}

	.subs .title .con {
		position: relative;
		z-index: 2;
		color: #fff;
		text-align: center;
		overflow: hidden
	}

	.subs .title .con h3 {
		color: #fff;
		margin-bottom: 30px;
		margin-top: 100px;
	}

	.subs .title .con p {
		color: #fff;
		margin-bottom: 25px;
		font-weight: bold;
		text-align: center
	}

	.subs .btn {
		border-radius: 50px;
		border: 2px solid #fff;
		color: #fff;
		overflow: hidden;
		font-family: inherit;
		font-size: inherit;
		background: none;
		cursor: pointer;
		padding: 15px 40px;
		display: inline-block;
		margin: 15px 30px;
		letter-spacing: 1px;
	}

	.subs .intrdouce {
		background-color: #fff;
		padding-top: 38px;
		padding-bottom: 38px;
		overflow: hidden;
	}

	.subs .desc_con {
		margin: 0 auto;
		width: 960px;
	}

	.subs .desc_title {
		height: 50px;
		line-height: 50px;
		padding-left: 30px;
		color: #000;
		font-weight: normal;
		font-size: 16px;
		border-bottom: 2px solid #efefef
	}

	.subs .blife {
		padding: 10px 20px;
		overflow: hidden
	}

	.subs .blife-msessage ul li {
		height: 36px;
		line-height: 36px;
		width: 320px;
		color: #000;
		padding-left: 10px;
		border-bottom: 2px solid #efefef;
		cursor: pointer
	}

	.subs .blife-msessage ul li.current {
		background-color: #efefef
	}

	.subs .suggest {
		overflow: hidden;
		margin-top: 20px;
	}

	.subs .suggest-item {
		width: 550px;
		border-radius: 8px;
		overflow: hidden;
		border: 1px solid #ebeef5;
		background-color: #fff;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
		color: #303133;
	}

	.subs .suggest-rule {
		width: 400px;
		border-radius: 8px;
		overflow: hidden;
		border: 1px solid #ebeef5;
		background-color: #fff;
		-webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
		color: #303133;
	}

	.subs .desc_buy {
		border-radius: 8px;
		overflow: hidden;
		border: 1px solid #ebeef5;
		background-color: #fff;
		-webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
		color: #303133;
	}

	.subs .blife-projess {
		width: 380px;
		color: #000
	}

	.subs .fast-buy {
		display: flex;
		align-items: center;
		height: 30px;
	}

	.subs .qianggou {
		display: flex;
		justify-content: space-between;
		align-items: center
	}

	.subs .borders {
		border: 1px solid #A8ADC6;
		height: 28px;
		line-height: 28px;
		padding: 0 40px;
		border-radius: 4px;
		color: #000
	}

	.subs .border {
		border: 1px solid #A8ADC6;
		height: 28px;
		line-height: 28px;
		padding: 0 10px;
		border-radius: 4px;
		color: #000;
		margin-left: 20px;
		cursor: pointer
	}

	.subs .current {
		background-color: #36D3FF;
		color: #273C63
	}

	.subs .blue {
		color: #36D3FF;
		font-size: 14px
	}

	.subs .margin {
		margin: 10px 0;
	}

	.subs .arrow {
		margin: 0 10px;
		transform: translate(0, 0);
		animation: mymove 1s infinite;
	}

	@keyframes mymove {
		from {
			transform: translate(0, 0)
		}
		to {
			transform: translate(0, -10px)
		}
	}

</style>
