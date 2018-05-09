<template>
<div class="section">
	<div id="app-sider" class="trading-slider">
		<div class="trading-filter">
			<div class="search"><i class="trading-icon trading-icon-search"></i> <input placeholder="搜索" type="text"></div>
			<div class="drop">
				<p>价格显示:<span>USD</span></p>
				<ul class="drop-box">
					<li class="active">USD</li>
					<li class="">CNY</li>
				</ul>
			</div>
		</div>
		<div class="trading-market">
			<div class="trading-tab">
				<ul>
					<!---->
					<li role="button" class="active"><img src="/src/images/icon/market-icon/market-qc.png">
						<p>QC</p>
					</li>
					<li role="button" class=""><img src="/src/images/icon/market-icon/market-usdt.png">
						<p>USDT</p>
					</li>
					<li role="button" class=""><img src="/src/images/icon/market-icon/market-btc.png">
						<p>BTC</p>
					</li>
					<li role="button" class=""><img src="/src/images/icon/market-icon/market-eth.png">
						<p>ETH</p>
					</li>
					<li role="button" class=""><img src="/src/images/icon/market-icon/market-qtum.png">
						<p>QTUM</p>
					</li>
					<li role="button" class=""><img src="/src/images/icon/market-icon/market-hsr.png">
						<p>HSR</p>
					</li>
				</ul>
			</div>
			<div class="market-list">
				<div class=""></div>
				<ul>
					<li class="head">
						<p role="button" class="coin-name"><span class="filter">市场</span></p>
						<p role="button"><span class="filter">最新价</span></p>
						<p role="button" class="rose"><span class="filter down">涨跌幅</span></p>
					</li>
					<!---->
					<li role="button" class="">
						<p class="coin-name"><img src="/src/images/icon/market-icon/market-epc.png">EPC/QC
							<!---->
						</p>
						<p aria-label="折合:0.049 USD" class="hint--top"><b class="trading-redcolor">0.31</b></p>
						<p class="rose trading-redcolor">
							+3.34%
						</p>
						<!---->
					</li>
					<li role="button" class="">
						<p class="coin-name"><img src="/src/images/icon/market-icon/market-ubtc.png">UBTC/QC
							<!---->
						</p>
						<p aria-label="折合:20.147 USD" class="hint--top"><b class="trading-redcolor">126.56</b></p>
						<p class="rose trading-redcolor">
							+0.00%
						</p>
						<!---->
					</li>
					<li role="button" class="">
						<p class="coin-name"><img src="/src/images/icon/market-icon/market-bds.png">BDS/QC
							<!---->
						</p>
						<p aria-label="折合:0.014 USD" class="hint--top"><b class="trading-redcolor">0.09</b></p>
						<p class="rose trading-redcolor">
							+0.00%
						</p>
						<!---->
					</li>
					<li role="button" class="">
						<p class="coin-name"><img src="/src/images/icon/market-icon/market-vlc.png">VLC/QC
							<!---->
						</p>
						<p aria-label="折合:0.046 USD" class="hint--top"><b class="trading-redcolor">0.29</b></p>
						<p class="rose trading-redcolor">
							+0.00%
						</p>
						<!---->
					</li>
					<li role="button" class="">
						<p class="coin-name"><img src="/src/images/icon/market-icon/market-qash.png">QASH/QC
							<!---->
						</p>
						<p aria-label="折合:0.485 USD" class="hint--top"><b class="trading-redcolor">3.05</b></p>
						<p class="rose trading-redcolor">
							+0.00%
						</p>
						<!---->
					</li>
					<li role="button" class="">
						<p class="coin-name"><img src="/src/images/icon/market-icon/market-sexc.png">SEXC/QC
							<!---->
						</p>
						<p aria-label="折合:0.007 USD" class="hint--top"><b class="trading-redcolor">0.05</b></p>
						<p class="rose trading-redcolor">
							+0.00%
						</p>
						<!---->
					</li>
					<li role="button" class="">
						<p class="coin-name"><img src="/src/images/icon/market-icon/market-etf.png">ETF/QC
							<!---->
						</p>
						<p aria-label="折合:4.775 USD" class="hint--top"><b class="trading-redcolor">30.00</b></p>
						<p class="rose trading-redcolor">
							+0.00%
						</p>
						<!---->
					</li>
					<li role="button" class="">
						<p class="coin-name"><img src="/src/images/icon/market-icon/market-tv.png">TV/QC
							<!---->
						</p>
						<p aria-label="折合:0.114 USD" class="hint--top"><b class="trading-redcolor">0.72</b></p>
						<p class="rose trading-redcolor">
							+0.00%
						</p>
						<!---->
					</li>
					<li role="button" class="">
						<p class="coin-name"><img src="/src/images/icon/market-icon/market-hsr.png">HSR/QC
							<!---->
						</p>
						<p aria-label="折合:6.678 USD" class="hint--top"><b class="trading-greencolor">41.95</b></p>
						<p class="rose trading-greencolor">
							-2.89%
						</p>
						<!---->
					</li>
					<li role="button" class="">
						<p class="coin-name"><img src="/src/images/icon/market-icon/market-btc.png">BTC/QC
							<!---->
						</p>
						<p aria-label="折合:8456.053 USD" class="hint--top"><b class="trading-greencolor">53117.54</b></p>
						<p class="rose trading-greencolor">
							-3.42%
						</p>
						<!---->
					</li>
					<li role="button" class="">
						<p class="coin-name"><img src="/src/images/icon/market-icon/market-ltc.png">LTC/QC
							<!---->
						</p>
						<p aria-label="折合:155.466 USD" class="hint--top"><b class="trading-greencolor">976.58</b></p>
						<p class="rose trading-greencolor">
							-6.12%
						</p>
						<!---->
					</li>
					<li role="button" class="">
						<p class="coin-name"><img src="/src/images/icon/market-icon/market-eth.png">ETH/QC
							<!---->
						</p>
						<p aria-label="折合:502.424 USD" class="hint--top"><b class="trading-greencolor">3156.03</b></p>
						<p class="rose trading-greencolor">
							-6.82%
						</p>
						<!---->
					</li>
					<li role="button" class="">
						<p class="coin-name"><img src="/src/images/icon/market-icon/market-can.png">CAN/QC
							<!---->
						</p>
						<p aria-label="折合:0.020 USD" class="hint--top"><b class="trading-greencolor">0.13</b></p>
						<p class="rose trading-greencolor">
							-7.14%
						</p>
						<!---->
					</li>
					<li role="button" class="">
						<p class="coin-name"><img src="/src/images/icon/market-icon/market-xwc.png">XWC/QC
							<!---->
						</p>
						<p aria-label="折合:0.085 USD" class="hint--top"><b class="trading-greencolor">0.54</b></p>
						<p class="rose trading-greencolor">
							-8.47%
						</p>
						<!---->
					</li>
					<li role="button" class="">
						<p class="coin-name"><img src="/src/images/icon/market-icon/market-ink.png">INK/QC
							<!---->
						</p>
						<p aria-label="折合:0.065 USD" class="hint--top"><b class="trading-greencolor">0.41</b></p>
						<p class="rose trading-greencolor">
							-8.88%
						</p>
						<!---->
					</li>
					<li role="button" class="">
						<p class="coin-name"><img src="/src/images/icon/market-icon/market-qbt.png">QBT/QC
							<!---->
						</p>
						<p aria-label="折合:0.208 USD" class="hint--top"><b class="trading-greencolor">1.31</b></p>
						<p class="rose trading-greencolor">
							-11.48%
						</p>
						<!---->
					</li>
					<li role="button" class="">
						<p class="coin-name"><img src="/src/images/icon/market-icon/market-qtum.png">QTUM/QC
							<!---->
						</p>
						<p aria-label="折合:16.651 USD" class="hint--top"><b class="trading-greencolor">104.60</b></p>
						<p class="rose trading-greencolor">
							-11.67%
						</p>
						<!---->
					</li>
					<li role="button" class="">
						<p class="coin-name"><img src="/src/images/icon/market-icon/market-etc.png">ETC/QC
							<!---->
						</p>
						<p aria-label="折合:16.358 USD" class="hint--top"><b class="trading-greencolor">102.76</b></p>
						<p class="rose trading-greencolor">
							-12.68%
						</p>
						<!---->
					</li>
					<li role="button" class="">
						<p class="coin-name"><img src="/src/images/icon/market-icon/market-spc.png">SPC/QC
							<!---->
						</p>
						<p aria-label="折合:0.063 USD" class="hint--top"><b class="trading-greencolor">0.40</b></p>
						<p class="rose trading-greencolor">
							-13.04%
						</p>
						<!---->
					</li>
					<li role="button" class="">
						<p class="coin-name"><img src="/src/images/icon/market-icon/market-tsl.png">TSL/QC
							<!---->
						</p>
						<p aria-label="折合:0.015 USD" class="hint--top"><b class="trading-greencolor">0.10</b></p>
						<p class="rose trading-greencolor">
							-16.66%
						</p>
						<!---->
					</li>
					<li role="button" class="">
						<p class="coin-name"><img src="/src/images/icon/market-icon/market-gram.png">GRAM/QC
							<!---->
						</p>
						<p aria-label="折合:0.002 USD" class="hint--top"><b class="trading-greencolor">0.0129</b></p>
						<p class="rose trading-greencolor">
							-28.05%
						</p>
						<!---->
					</li>
				</ul>
			</div>
		</div>
	</div>
	<div id="app-trade-pro" class="trading-content">
	<div class="trading-count">
		<div class="l-area">
			<div class="current-price">
				<div class="coin-icon"><img src="/src/images/icon/market-icon/market-qtum.png"></div>
				<h2>QTUM/BTC <span class="text-second trading-greencolor">0.001927</span></h2>
				<p>≈ 15.309 USD</p>
			</div>
			<div class="num">24H涨跌幅<br><span class="text-second trading-greencolor">-8.62%</span></div>
			<div class="num">24H最高价<br><span aria-label="折合:16.977 USD" class="trading-redcolor hint--bottom">0.002137</span></div>
			<div class="num">24H最低价<br><span aria-label="折合:15.309 USD" class="trading-greencolor hint--bottom">0.001927</span></div>
			<div class="num">24H交易量<br><span class="trading-darkcolor">38344.99 QTUM</span></div>
		</div>
		<div class="r-area"><a role="button" onclick="$('.trading-chart').toggle()" style="margin-right: 15px;">收起/展开K线</a></div>
	</div>
	<div class="trading-chart">
		<!---->
		<div class="chart-area">
			<div class="common-box chart-box">
				<div class="chart-box-head">
					<div class="l-area">
						<div class="item">
							<p class="active">K线图</p>
						</div>
						<div class="item">
							<p class="">深度图</p>
						</div>
						<div class="line"></div>
						<div class="item">
							<p aria-label="K线价格显示单位设置" class="hint--bottom">BTC</p>
						</div>
						<div class="item">
							<p aria-label="K线价格显示单位设置" class="hint--bottom active">USD</p>
						</div>
					</div>
					<div class="r-area">
						<div class="item arrow">
							<p>价格显示：<span>USD</span></p>
							<ul class="item-list">
								<li role="button">默认</li>
								<li role="button" class="active">USD</li>
								<li role="button">CNY</li>
							</ul>
						</div>
						<div class="item">
							<p><a href="/trade/qtum_btc" target="_self" role="button"> K线交易</a></p>
						</div>
					</div>
				</div>
				<div class="chart-box-body" id="chart-box-body">
					<iframe src="/static/index.html" frameborder="0" width="100%" height="100%" scrolling ='no'></iframe>
					<!---->
				</div>
			</div>
		</div>
	</div>
	<div class="trading-hotspot">
		<div class="trading-form">
			<div class="form-tab">
				<ul>
					<li class="active">限价委托</li>
					<li class="">批量委托</li>
					<!---->
				</ul>
				<div class="operation"><a role="button" class="switch">价格输入转换<i></i></a>
					<!---->
				</div>
			</div>
			<div class="form-lever-panel">
				<!---->
				<!---->
			</div>
			<div class="form-content">
				<div class="box trading-buy">
					<h2>买入QTUM</h2>
					<p class="form-assets">
						可用BTC：<span aria-label="可买：-- QTUM" class="trading-redcolor hint--top">--</span>
						<!---->
						<!---->
					</p>
					<!---->
					<!---->
					<!---->
					<div class="form-group">
						<div class="form-control"><input type="text" class="buyColor"> <label>买入价BTC</label>
							<!----><span>≈<b class="sellColor">14.981</b> USD</span></div>
					</div>
					<!---->
					<div class="form-group active">
						<div class="form-control"><input type="text" class="sellColor"> <label>买入量QTUM</label></div>
						<div class="form-proportion hide">
							<p role="button"><span>1/5</span></p>
							<p role="button"><span>1/4</span></p>
							<p role="button"><span>1/3</span></p>
							<p role="button"><span>1/2</span></p>
							<p role="button"><span>3/4</span></p>
							<p role="button"><span>1/1</span></p>
						</div>
						<div class="bk-trans-form">
							<div id="rangeSlider_1" class="range range_buy"><span class="sliderPercent">0.00%</span>
								<div class="range_wrap" data-ratio="0" tabindex="0">
									<div class="range_paths_wrap">
										<div class="range_path"></div>
									</div>
									<div class="range_track_wrap">
										<div class="range_track" style="width: 0%;"></div>
										<div class="range_handle" style="left: 0%;"></div>
									</div>
									<div class="range_points_wrap">
										<div class="range_point active" data-point-ratio="0" style="left: 0%;"></div>
										<div class="range_point" data-point-ratio="20" style="left: 20%;"></div>
										<div class="range_point" data-point-ratio="40" style="left: 40%;"></div>
										<div class="range_point" data-point-ratio="60" style="left: 60%;"></div>
										<div class="range_point" data-point-ratio="80" style="left: 80%;"></div>
										<div class="range_point" data-point-ratio="100" style="left: 100%;"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<p class="form-assets">预计交易额：<span class="trading-redcolor hint--top-left" aria-label="折合:17287.410 USD">2.17602515</span> BTC</p>
					<!---->
					<div class="form-button"><button type="button" role="button" class="trading-redbg disabled">登录/注册</button></div>
				</div>
				<div class="box trading-sell">
					<h2>卖出QTUM</h2>
					<p class="form-assets">
						可用QTUM：<span aria-label="可卖：-- BTC" class="trading-greencolor hint--top">--</span>
						<!---->
						<!---->
					</p>
					<!---->
					<div class="form-group">
						<div class="form-control"><input type="text" class="sellColor"> <label>卖出价BTC</label>
							<!----><span>≈<b class="sellColor">14.981</b> USD</span></div>
					</div>
					<!---->
					<!---->
					<!---->
					<div class="form-group">
						<div class="form-control"><input type="text" class="sellColor"> <label>卖出量QTUM</label></div>
						<div class="form-proportion hide">
							<p role="button"><span>1/5</span></p>
							<p role="button"><span>1/4</span></p>
							<p role="button"><span>1/3</span></p>
							<p role="button"><span>1/2</span></p>
							<p role="button"><span>3/4</span></p>
							<p role="button"><span>1/1</span></p>
						</div>
						<div class="bk-trans-form">
							<div id="rangeSlider_0" class="range range_sell"><span class="sliderPercent">0.00%</span>
								<div class="range_wrap" data-ratio="0" tabindex="0">
									<div class="range_paths_wrap">
										<div class="range_path"></div>
									</div>
									<div class="range_track_wrap">
										<div class="range_track"></div>
										<div class="range_handle"></div>
									</div>
									<div class="range_points_wrap">
										<div class="range_point" data-point-ratio="0" style="left: 0%;"></div>
										<div class="range_point" data-point-ratio="20" style="left: 20%;"></div>
										<div class="range_point" data-point-ratio="40" style="left: 40%;"></div>
										<div class="range_point" data-point-ratio="60" style="left: 60%;"></div>
										<div class="range_point" data-point-ratio="80" style="left: 80%;"></div>
										<div class="range_point" data-point-ratio="100" style="left: 100%;"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<p class="form-assets">预计交易额：<span class="trading-greencolor hint--top-left" aria-label="折合:17287.410 USD">2.17602515</span> BTC</p>
					<!---->
					<div class="form-button"><button type="button" role="button" class="trading-greenbg disabled">登录/注册</button></div>
				</div>
			</div>
		</div>
		<div class="trading-disc" assist-price="[object Object]">
			<div class="disc-head">
				<p class="stall"><span>档位</span></p>
				<p><span>价格(BTC)</span></p>
				<p><span>折价(USD)</span></p>
				<p class="last"><span>数量(QTUM)</span></p>
			</div>
			<div class="disc-list">
				<div id="asksDish" class="sell-disc disc-inner" style="touch-action: none;">
					<ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 500ms; <!--transform: translate(0px, -952px) translateZ(0px);-->">
						<li role="button">
							<p class="stall trading-greencolor">卖9</p>
							<p class="trading-greencolor">0.001981</p>
							<p>15.738</p>
							<p class="last">10.25</p>
							<p class="progress" style="width: 0.92%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-greencolor">卖8</p>
							<p class="trading-greencolor">0.001975</p>
							<p>15.690</p>
							<p class="last">1.96</p>
							<p class="progress" style="width: 0.17%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-greencolor">卖7</p>
							<p class="trading-greencolor">0.001971</p>
							<p>15.658</p>
							<p class="last">1.70</p>
							<p class="progress" style="width: 0.15%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-greencolor">卖6</p>
							<p class="trading-greencolor">0.001966</p>
							<p>15.618</p>
							<p class="last">12.20</p>
							<p class="progress" style="width: 1.09%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-greencolor">卖5</p>
							<p class="trading-greencolor">0.001950</p>
							<p>15.491</p>
							<p class="last">1.82</p>
							<p class="progress" style="width: 0.16%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-greencolor">卖4</p>
							<p class="trading-greencolor">0.001949</p>
							<p>15.483</p>
							<p class="last">0.51</p>
							<p class="progress" style="width: 0.04%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-greencolor">卖3</p>
							<p class="trading-greencolor">0.001947</p>
							<p>15.467</p>
							<p class="last">1112.99</p>
							<p class="progress" style="width: 100%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-greencolor">卖2</p>
							<p class="trading-greencolor">0.001945</p>
							<p>15.452</p>
							<p class="last">9.90</p>
							<p class="progress" style="width: 0.88%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-greencolor">卖1</p>
							<p class="trading-greencolor">0.001929</p>
							<p>15.324</p>
							<p class="last">150.69</p>
							<p class="progress" style="width: 13.53%;"></p>
						</li>
					</ul>
					<div class="iScrollVerticalScrollbar iScrollLoneScrollbar" style="overflow: hidden; pointer-events: none;">
						<div class="iScrollIndicator" style="transition-duration: 500ms; display: block; height: 19px; transform: translate(0px, 125px) translateZ(0px); transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1);"></div>
					</div>
				</div>
			</div>
			<div class="disc-line"></div>
			<div class="disc-price">
				<div class="price">
					<h3><span class="text-second trading-greencolor">0.001927 <b style="font-size: 12px; vertical-align: middle;">BTC</b></span></h3>
					≈ 15.309 USD
				</div>
				<div class="control">
					<a role="button"><img src="/src/images/icon/show_bids.jpg"></a>
					<a role="button"><img src="/src/images/icon/show_asks.jpg"></a>
				</div>
			</div>
			<div class="disc-line"></div>
			<div class="disc-list">
				<div id="bidsDish" class="buy-disc disc-inner" style="touch-action: none;">
					<ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 0ms; transform: translate(0px, 0px) translateZ(0px);">
						<li role="button">
							<p class="stall trading-redcolor">买1</p>
							<p class="trading-redcolor">0.001900</p>
							<p>15.094</p>
							<p class="last">30.00</p>
							<p class="progress" style="width: 0.8%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买2</p>
							<p class="trading-redcolor">0.001899</p>
							<p>15.086</p>
							<p class="last">2.80</p>
							<p class="progress" style="width: 0.07%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买3</p>
							<p class="trading-redcolor">0.001898</p>
							<p>15.078</p>
							<p class="last">9.30</p>
							<p class="progress" style="width: 0.24%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买4</p>
							<p class="trading-redcolor">0.001893</p>
							<p>15.038</p>
							<p class="last">0.14</p>
							<p class="progress" style="width: 0%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买5</p>
							<p class="trading-redcolor">0.001886</p>
							<p>14.983</p>
							<p class="last">8.70</p>
							<p class="progress" style="width: 0.23%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买6</p>
							<p class="trading-redcolor">0.001884</p>
							<p>14.967</p>
							<p class="last">10.30</p>
							<p class="progress" style="width: 0.27%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买7</p>
							<p class="trading-redcolor">0.001868</p>
							<p>14.840</p>
							<p class="last">1112.99</p>
							<p class="progress" style="width: 29.83%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买8</p>
							<p class="trading-redcolor">0.001867</p>
							<p>14.832</p>
							<p class="last">14.00</p>
							<p class="progress" style="width: 0.37%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买9</p>
							<p class="trading-redcolor">0.001866</p>
							<p>14.824</p>
							<p class="last">10.80</p>
							<p class="progress" style="width: 0.28%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买10</p>
							<p class="trading-redcolor">0.001865</p>
							<p>14.816</p>
							<p class="last">14.40</p>
							<p class="progress" style="width: 0.38%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买11</p>
							<p class="trading-redcolor">0.001863</p>
							<p>14.800</p>
							<p class="last">1.32</p>
							<p class="progress" style="width: 0.03%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买12</p>
							<p class="trading-redcolor">0.001861</p>
							<p>14.784</p>
							<p class="last">2.06</p>
							<p class="progress" style="width: 0.05%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买13</p>
							<p class="trading-redcolor">0.001859</p>
							<p>14.768</p>
							<p class="last">1112.99</p>
							<p class="progress" style="width: 29.83%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买14</p>
							<p class="trading-redcolor">0.001845</p>
							<p>14.657</p>
							<p class="last">12.50</p>
							<p class="progress" style="width: 0.33%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买15</p>
							<p class="trading-redcolor">0.001842</p>
							<p>14.633</p>
							<p class="last">13.80</p>
							<p class="progress" style="width: 0.36%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买16</p>
							<p class="trading-redcolor">0.001837</p>
							<p>14.594</p>
							<p class="last">11.30</p>
							<p class="progress" style="width: 0.3%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买17</p>
							<p class="trading-redcolor">0.001834</p>
							<p>14.570</p>
							<p class="last">8.40</p>
							<p class="progress" style="width: 0.22%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买18</p>
							<p class="trading-redcolor">0.001823</p>
							<p>14.482</p>
							<p class="last">6.00</p>
							<p class="progress" style="width: 0.16%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买19</p>
							<p class="trading-redcolor">0.001806</p>
							<p>14.347</p>
							<p class="last">13.50</p>
							<p class="progress" style="width: 0.36%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买20</p>
							<p class="trading-redcolor">0.001724</p>
							<p>13.696</p>
							<p class="last">13.10</p>
							<p class="progress" style="width: 0.35%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买21</p>
							<p class="trading-redcolor">0.001707</p>
							<p>13.561</p>
							<p class="last">6.00</p>
							<p class="progress" style="width: 0.16%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买22</p>
							<p class="trading-redcolor">0.001653</p>
							<p>13.132</p>
							<p class="last">13.61</p>
							<p class="progress" style="width: 0.36%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买23</p>
							<p class="trading-redcolor">0.001600</p>
							<p>12.711</p>
							<p class="last">3.08</p>
							<p class="progress" style="width: 0.08%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买24</p>
							<p class="trading-redcolor">0.001573</p>
							<p>12.496</p>
							<p class="last">13.30</p>
							<p class="progress" style="width: 0.35%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买25</p>
							<p class="trading-redcolor">0.001557</p>
							<p>12.369</p>
							<p class="last">5.10</p>
							<p class="progress" style="width: 0.13%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买26</p>
							<p class="trading-redcolor">0.001552</p>
							<p>12.329</p>
							<p class="last">5.90</p>
							<p class="progress" style="width: 0.15%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买27</p>
							<p class="trading-redcolor">0.001538</p>
							<p>12.218</p>
							<p class="last">18.31</p>
							<p class="progress" style="width: 0.49%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买28</p>
							<p class="trading-redcolor">0.001532</p>
							<p>12.170</p>
							<p class="last">25.73</p>
							<p class="progress" style="width: 0.68%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买29</p>
							<p class="trading-redcolor">0.001530</p>
							<p>12.155</p>
							<p class="last">15.07</p>
							<p class="progress" style="width: 0.4%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买30</p>
							<p class="trading-redcolor">0.001493</p>
							<p>11.861</p>
							<p class="last">6.80</p>
							<p class="progress" style="width: 0.18%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买31</p>
							<p class="trading-redcolor">0.001474</p>
							<p>11.710</p>
							<p class="last">5.90</p>
							<p class="progress" style="width: 0.15%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买32</p>
							<p class="trading-redcolor">0.001452</p>
							<p>11.535</p>
							<p class="last">17.20</p>
							<p class="progress" style="width: 0.46%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买33</p>
							<p class="trading-redcolor">0.001445</p>
							<p>11.479</p>
							<p class="last">5.20</p>
							<p class="progress" style="width: 0.13%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买34</p>
							<p class="trading-redcolor">0.001425</p>
							<p>11.320</p>
							<p class="last">5.00</p>
							<p class="progress" style="width: 0.13%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买35</p>
							<p class="trading-redcolor">0.001276</p>
							<p>10.137</p>
							<p class="last">1.50</p>
							<p class="progress" style="width: 0.04%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买36</p>
							<p class="trading-redcolor">0.001271</p>
							<p>10.097</p>
							<p class="last">0.41</p>
							<p class="progress" style="width: 0.01%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买37</p>
							<p class="trading-redcolor">0.001267</p>
							<p>10.065</p>
							<p class="last">5.90</p>
							<p class="progress" style="width: 0.15%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买38</p>
							<p class="trading-redcolor">0.001266</p>
							<p>10.057</p>
							<p class="last">6.30</p>
							<p class="progress" style="width: 0.16%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买39</p>
							<p class="trading-redcolor">0.001264</p>
							<p>10.041</p>
							<p class="last">0.70</p>
							<p class="progress" style="width: 0.01%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买40</p>
							<p class="trading-redcolor">0.001073</p>
							<p>8.524</p>
							<p class="last">1.00</p>
							<p class="progress" style="width: 0.02%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买41</p>
							<p class="trading-redcolor">0.000970</p>
							<p>7.706</p>
							<p class="last">6.00</p>
							<p class="progress" style="width: 0.16%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买42</p>
							<p class="trading-redcolor">0.000550</p>
							<p>4.369</p>
							<p class="last">1.01</p>
							<p class="progress" style="width: 0.02%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买43</p>
							<p class="trading-redcolor">0.000421</p>
							<p>3.344</p>
							<p class="last">92.43</p>
							<p class="progress" style="width: 2.47%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买44</p>
							<p class="trading-redcolor">0.000194</p>
							<p>1.541</p>
							<p class="last">5.20</p>
							<p class="progress" style="width: 0.13%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买45</p>
							<p class="trading-redcolor">0.000191</p>
							<p>1.517</p>
							<p class="last">613.05</p>
							<p class="progress" style="width: 16.43%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买46</p>
							<p class="trading-redcolor">0.000063</p>
							<p>0.500</p>
							<p class="last">200.00</p>
							<p class="progress" style="width: 5.36%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买47</p>
							<p class="trading-redcolor">0.000002</p>
							<p>0.015</p>
							<p class="last">364.56</p>
							<p class="progress" style="width: 9.77%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">买48</p>
							<p class="trading-redcolor">0.000001</p>
							<p>0.007</p>
							<p class="last">3730.00</p>
							<p class="progress" style="width: 100%;"></p>
						</li>
					</ul>
					<div class="iScrollVerticalScrollbar iScrollLoneScrollbar" style="overflow: hidden; pointer-events: none;">
						<div class="iScrollIndicator" style="transition-duration: 0ms; display: block; height: 20px; transform: translate(0px, 0px) translateZ(0px); transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1);"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="trading-record">
		<div class="entrust-record">
			<div class="current-entrust">
				<div class="entrust-head">
					<h3>正在进行的委托</h3>
					<!---->
				</div>
				<div class="record-list">
					<ul>
						<li class="head">
							<div class="item time">
								<p>时间</p>
							</div>
							<div class="item">
								<p><span>委托价</span>成交均价(BTC)</p>
							</div>
							<div class="item">
								<p><span>委托量</span>成交量(QTUM)</p>
							</div>
							<div class="item">
								<p><span>成交额</span>(BTC)</p>
							</div>
							<div class="item last">
								<p>操作</p>
							</div>
						</li>
						<!---->
						<li>
							<div class="bk-norecord">
								<p><i class="bk-ico info"></i>您还没有登录，请 <a href="/login" style="color: rgb(222, 33, 29); margin: 0px 5px;">登录</a> 或 <a href="/register" style="color: rgb(61, 193, 142); margin: 0px 5px;">注册</a> 后再尝试。</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="current-entrust">
				<div class="entrust-head">
					<h3>历史委托</h3>
					<!---->
				</div>
				<div class="record-list">
					<ul>
						<li class="head">
							<div class="item time">
								<p>时间</p>
							</div>
							<div class="item">
								<p><span>委托价</span>成交均价(BTC)</p>
							</div>
							<div class="item">
								<p><span>委托量</span>成交量(QTUM)</p>
							</div>
							<div class="item">
								<p><span>成交额</span>(BTC)</p>
							</div>
							<div class="item last">
								<p>操作</p>
							</div>
						</li>
						<!---->
						<li>
							<div class="bk-norecord">
								<p><i class="bk-ico info"></i>您还没有登录，请 <a href="/login" style="color: rgb(222, 33, 29); margin: 0px 5px;">登录</a> 或 <a href="/register" style="color: rgb(61, 193, 142); margin: 0px 5px;">注册</a> 后再尝试。</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="newest-record">
			<div class="newest-top">
				<h3>最新成交</h3>
			</div>
			<div class="newest-head">
				<p class="time"><span>成交时间</span></p>
				<p><span>成交价(BTC)</span></p>
				<p><span>折价(USD)</span></p>
				<p class="last"><span>交易量(QTUM)</span></p>
			</div>
			<div id="tradeRecord" class="newest-list">
				<div class=""></div>
				<ul class="tradeNew-table">
					<li class="tr body" style="display: list-item;">
						<p class="td time">10:43:08</p>
						<p class="td price trading-greencolor ">0.001927</p>
						<p class="td foldPrice">15.309</p>
						<p class="td num last">3.89</p>
					</li>
					<li class="tr body" style="display: list-item;">
						<p class="td time">10:42:52</p>
						<p class="td price trading-greencolor ">0.001927</p>
						<p class="td foldPrice">15.309</p>
						<p class="td num last">8.70</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<!---->
	<!---->
	<!---->
</div>
</div>
</template>
<script>
	export default {
		name: 'transaction',
		data() {
			return {}
		},
		created() {},
		mounted() {

		}
	}

</script>

<style scoped>
	@import '../../assets/css/transaction.css';
	.section {
		display: flex;
		width: 100%;
	}
	
	#chart_updated_time {
		display: none
	}

</style>
