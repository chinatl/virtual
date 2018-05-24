<template>
<div class="section">
	<div id="app-sider" class="trading-slider">
		<div class="trading-filter">
			<div class="search"><i class="trading-icon trading-icon-search"></i> <input :placeholder="$t(`other['搜索']`)" type="text"></div>
			<div class="drop">
				<p>{{$t('other["价格显示"]')}}:<span>USD</span></p>
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
						<p role="button" class="coin-name"><span class="filter">{{$t('other["市场"]')}}</span></p>
						<p role="button"><span class="filter">{{$t('other["最新价"]')}}</span></p>
						<p role="button" class="rose"><span class="filter down">{{$t('other["涨跌幅"]')}}</span></p>
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
			<div class="num">{{$t('other["24H涨跌幅"]')}}<br><span class="text-second trading-greencolor">-8.62%</span></div>
			<div class="num">{{$t('other["24H最高价"]')}}<br><span aria-label="折合:16.977 USD" class="trading-redcolor hint--bottom">0.002137</span></div>
			<div class="num">{{$t('other["24H最低价"]')}}<br><span aria-label="折合:15.309 USD" class="trading-greencolor hint--bottom">0.001927</span></div>
			<div class="num">{{$t('other["24H交易量"]')}}<br><span class="trading-darkcolor">38344.99 QTUM</span></div>
		</div>
		<div class="r-area"><a role="button" onclick="$('.trading-chart').toggle()" style="margin-right: 15px;">{{$t('other["收起/展开K线"]')}}</a></div>
	</div>
	<div class="trading-chart">
		<!---->
		<div class="chart-area">
			<div class="common-box chart-box">
				<div class="chart-box-head">
					<div class="l-area">
						<div class="item">
							<p class="active">{{$t('other["K线图"]')}}</p>
						</div>
						<div class="item">
							<p class="">{{$t('other["深度图"]')}}</p>
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
							<p>{{$t('other["价格显示"]')}}：<span>USD</span></p>
							<ul class="item-list">
								<li role="button">{{$t('other["默认"]')}}</li>
								<li role="button" class="active">USD</li>
								<li role="button">CNY</li>
							</ul>
						</div>
						<div class="item">
							<p><a href="/trade/qtum_btc" target="_self" role="button"> {{$t('other["K线交易"]')}}</a></p>
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
					<li class="active">{{$t('other["限价委托"]')}}</li>
					<li class="">{{$t('other["批量委托"]')}}</li>
					<!---->
				</ul>
				<div class="operation"><a role="button" class="switch">{{$t('other["价格输入转换"]')}}<i></i></a>
					<!---->
				</div>
			</div>
			<div class="form-lever-panel">
				<!---->
				<!---->
			</div>
			<div class="form-content">
				<div class="box trading-buy">
					<h2>{{$t('other["买入"]')}}QTUM</h2>
					<p class="form-assets">
						{{$t('other["可用"]')}}BTC：<span aria-label="可买：-- QTUM" class="trading-redcolor hint--top">--</span>
						<!---->
						<!---->
					</p>
					<!---->
					<!---->
					<!---->
					<div class="form-group">
						<div class="form-control"><input type="text" class="buyColor"> <label>{{$t('other["买入价"]')}}BTC</label>
							<!----><span>≈<b class="sellColor">14.981</b> USD</span></div>
					</div>
					<!---->
					<div class="form-group active">
						<div class="form-control"><input type="text" class="sellColor"> <label>{{$t('other["买入量"]')}}QTUM</label></div>
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
					<p class="form-assets">{{$t('other["预计交易额"]')}}：<span class="trading-redcolor hint--top-left" aria-label="折合:17287.410 USD">2.17602515</span> BTC</p>
					<!---->
					<div class="form-button"><button type="button" role="button" class="trading-redbg disabled">{{$t('other["登录/注册"]')}}</button></div>
				</div>
				<div class="box trading-sell">
					<h2>{{$t('other["卖出"]')}}QTUM</h2>
					<p class="form-assets">
						{{$t('other["可用"]')}}QTUM：<span aria-label="可卖：-- BTC" class="trading-greencolor hint--top">--</span>
						<!---->
						<!---->
					</p>
					<!---->
					<div class="form-group">
						<div class="form-control"><input type="text" class="sellColor"> <label>{{$t('other["卖出价"]')}}BTC</label>
							<!----><span>≈<b class="sellColor">14.981</b> USD</span></div>
					</div>
					<!---->
					<!---->
					<!---->
					<div class="form-group">
						<div class="form-control"><input type="text" class="sellColor"> <label>{{$t('other["卖出量"]')}}QTUM</label></div>
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
					<p class="form-assets">{{$t('other["预计交易额"]')}}：<span class="trading-greencolor hint--top-left" aria-label="折合:17287.410 USD">2.17602515</span> BTC</p>
					<!---->
					<div class="form-button"><button type="button" role="button" class="trading-greenbg disabled">{{$t('other["登录/注册"]')}}</button></div>
				</div>
			</div>
		</div>
		<div class="trading-disc" assist-price="[object Object]">
			<div class="disc-head">
				<p class="stall"><span>{{$t('other["档位"]')}}</span></p>
				<p><span>{{$t('other["价格"]')}}(BTC)</span></p>
				<p><span>{{$t('other["折价"]')}}(USD)</span></p>
				<p class="last"><span>{{$t('other["数量"]')}}(QTUM)</span></p>
			</div>
			<div class="disc-list">
				<div id="asksDish" class="sell-disc disc-inner" style="touch-action: none;">
					<ul style="transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1); transition-duration: 500ms; <!--transform: translate(0px, -952px) translateZ(0px);-->">
						<li role="button">
							<p class="stall trading-greencolor">{{$t('other["卖"]')}}9</p>
							<p class="trading-greencolor">0.001981</p>
							<p>15.738</p>
							<p class="last">10.25</p>
							<p class="progress" style="width: 0.92%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-greencolor">{{$t('other["卖"]')}}8</p>
							<p class="trading-greencolor">0.001975</p>
							<p>15.690</p>
							<p class="last">1.96</p>
							<p class="progress" style="width: 0.17%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-greencolor">{{$t('other["卖"]')}}7</p>
							<p class="trading-greencolor">0.001971</p>
							<p>15.658</p>
							<p class="last">1.70</p>
							<p class="progress" style="width: 0.15%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-greencolor">{{$t('other["卖"]')}}6</p>
							<p class="trading-greencolor">0.001966</p>
							<p>15.618</p>
							<p class="last">12.20</p>
							<p class="progress" style="width: 1.09%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-greencolor">{{$t('other["卖"]')}}5</p>
							<p class="trading-greencolor">0.001950</p>
							<p>15.491</p>
							<p class="last">1.82</p>
							<p class="progress" style="width: 0.16%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-greencolor">{{$t('other["卖"]')}}4</p>
							<p class="trading-greencolor">0.001949</p>
							<p>15.483</p>
							<p class="last">0.51</p>
							<p class="progress" style="width: 0.04%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-greencolor">{{$t('other["卖"]')}}3</p>
							<p class="trading-greencolor">0.001947</p>
							<p>15.467</p>
							<p class="last">1112.99</p>
							<p class="progress" style="width: 100%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-greencolor">{{$t('other["卖"]')}}2</p>
							<p class="trading-greencolor">0.001945</p>
							<p>15.452</p>
							<p class="last">9.90</p>
							<p class="progress" style="width: 0.88%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-greencolor">{{$t('other["卖"]')}}1</p>
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
							<p class="stall trading-redcolor">{{$t('other["买"]')}}1</p>
							<p class="trading-redcolor">0.001900</p>
							<p>15.094</p>
							<p class="last">30.00</p>
							<p class="progress" style="width: 0.8%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}2</p>
							<p class="trading-redcolor">0.001899</p>
							<p>15.086</p>
							<p class="last">2.80</p>
							<p class="progress" style="width: 0.07%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}3</p>
							<p class="trading-redcolor">0.001898</p>
							<p>15.078</p>
							<p class="last">9.30</p>
							<p class="progress" style="width: 0.24%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}4</p>
							<p class="trading-redcolor">0.001893</p>
							<p>15.038</p>
							<p class="last">0.14</p>
							<p class="progress" style="width: 0%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}5</p>
							<p class="trading-redcolor">0.001886</p>
							<p>14.983</p>
							<p class="last">8.70</p>
							<p class="progress" style="width: 0.23%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}6</p>
							<p class="trading-redcolor">0.001884</p>
							<p>14.967</p>
							<p class="last">10.30</p>
							<p class="progress" style="width: 0.27%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}7</p>
							<p class="trading-redcolor">0.001868</p>
							<p>14.840</p>
							<p class="last">1112.99</p>
							<p class="progress" style="width: 29.83%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}8</p>
							<p class="trading-redcolor">0.001867</p>
							<p>14.832</p>
							<p class="last">14.00</p>
							<p class="progress" style="width: 0.37%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}9</p>
							<p class="trading-redcolor">0.001866</p>
							<p>14.824</p>
							<p class="last">10.80</p>
							<p class="progress" style="width: 0.28%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}10</p>
							<p class="trading-redcolor">0.001865</p>
							<p>14.816</p>
							<p class="last">14.40</p>
							<p class="progress" style="width: 0.38%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}11</p>
							<p class="trading-redcolor">0.001863</p>
							<p>14.800</p>
							<p class="last">1.32</p>
							<p class="progress" style="width: 0.03%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}12</p>
							<p class="trading-redcolor">0.001861</p>
							<p>14.784</p>
							<p class="last">2.06</p>
							<p class="progress" style="width: 0.05%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}13</p>
							<p class="trading-redcolor">0.001859</p>
							<p>14.768</p>
							<p class="last">1112.99</p>
							<p class="progress" style="width: 29.83%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}14</p>
							<p class="trading-redcolor">0.001845</p>
							<p>14.657</p>
							<p class="last">12.50</p>
							<p class="progress" style="width: 0.33%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}15</p>
							<p class="trading-redcolor">0.001842</p>
							<p>14.633</p>
							<p class="last">13.80</p>
							<p class="progress" style="width: 0.36%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}16</p>
							<p class="trading-redcolor">0.001837</p>
							<p>14.594</p>
							<p class="last">11.30</p>
							<p class="progress" style="width: 0.3%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}17</p>
							<p class="trading-redcolor">0.001834</p>
							<p>14.570</p>
							<p class="last">8.40</p>
							<p class="progress" style="width: 0.22%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}18</p>
							<p class="trading-redcolor">0.001823</p>
							<p>14.482</p>
							<p class="last">6.00</p>
							<p class="progress" style="width: 0.16%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}19</p>
							<p class="trading-redcolor">0.001806</p>
							<p>14.347</p>
							<p class="last">13.50</p>
							<p class="progress" style="width: 0.36%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}20</p>
							<p class="trading-redcolor">0.001724</p>
							<p>13.696</p>
							<p class="last">13.10</p>
							<p class="progress" style="width: 0.35%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}21</p>
							<p class="trading-redcolor">0.001707</p>
							<p>13.561</p>
							<p class="last">6.00</p>
							<p class="progress" style="width: 0.16%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}22</p>
							<p class="trading-redcolor">0.001653</p>
							<p>13.132</p>
							<p class="last">13.61</p>
							<p class="progress" style="width: 0.36%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}23</p>
							<p class="trading-redcolor">0.001600</p>
							<p>12.711</p>
							<p class="last">3.08</p>
							<p class="progress" style="width: 0.08%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}24</p>
							<p class="trading-redcolor">0.001573</p>
							<p>12.496</p>
							<p class="last">13.30</p>
							<p class="progress" style="width: 0.35%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}25</p>
							<p class="trading-redcolor">0.001557</p>
							<p>12.369</p>
							<p class="last">5.10</p>
							<p class="progress" style="width: 0.13%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}26</p>
							<p class="trading-redcolor">0.001552</p>
							<p>12.329</p>
							<p class="last">5.90</p>
							<p class="progress" style="width: 0.15%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}27</p>
							<p class="trading-redcolor">0.001538</p>
							<p>12.218</p>
							<p class="last">18.31</p>
							<p class="progress" style="width: 0.49%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}28</p>
							<p class="trading-redcolor">0.001532</p>
							<p>12.170</p>
							<p class="last">25.73</p>
							<p class="progress" style="width: 0.68%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}29</p>
							<p class="trading-redcolor">0.001530</p>
							<p>12.155</p>
							<p class="last">15.07</p>
							<p class="progress" style="width: 0.4%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}30</p>
							<p class="trading-redcolor">0.001493</p>
							<p>11.861</p>
							<p class="last">6.80</p>
							<p class="progress" style="width: 0.18%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}31</p>
							<p class="trading-redcolor">0.001474</p>
							<p>11.710</p>
							<p class="last">5.90</p>
							<p class="progress" style="width: 0.15%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}32</p>
							<p class="trading-redcolor">0.001452</p>
							<p>11.535</p>
							<p class="last">17.20</p>
							<p class="progress" style="width: 0.46%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}33</p>
							<p class="trading-redcolor">0.001445</p>
							<p>11.479</p>
							<p class="last">5.20</p>
							<p class="progress" style="width: 0.13%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}34</p>
							<p class="trading-redcolor">0.001425</p>
							<p>11.320</p>
							<p class="last">5.00</p>
							<p class="progress" style="width: 0.13%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}35</p>
							<p class="trading-redcolor">0.001276</p>
							<p>10.137</p>
							<p class="last">1.50</p>
							<p class="progress" style="width: 0.04%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}36</p>
							<p class="trading-redcolor">0.001271</p>
							<p>10.097</p>
							<p class="last">0.41</p>
							<p class="progress" style="width: 0.01%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}37</p>
							<p class="trading-redcolor">0.001267</p>
							<p>10.065</p>
							<p class="last">5.90</p>
							<p class="progress" style="width: 0.15%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}38</p>
							<p class="trading-redcolor">0.001266</p>
							<p>10.057</p>
							<p class="last">6.30</p>
							<p class="progress" style="width: 0.16%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}39</p>
							<p class="trading-redcolor">0.001264</p>
							<p>10.041</p>
							<p class="last">0.70</p>
							<p class="progress" style="width: 0.01%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}40</p>
							<p class="trading-redcolor">0.001073</p>
							<p>8.524</p>
							<p class="last">1.00</p>
							<p class="progress" style="width: 0.02%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}41</p>
							<p class="trading-redcolor">0.000970</p>
							<p>7.706</p>
							<p class="last">6.00</p>
							<p class="progress" style="width: 0.16%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}42</p>
							<p class="trading-redcolor">0.000550</p>
							<p>4.369</p>
							<p class="last">1.01</p>
							<p class="progress" style="width: 0.02%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}43</p>
							<p class="trading-redcolor">0.000421</p>
							<p>3.344</p>
							<p class="last">92.43</p>
							<p class="progress" style="width: 2.47%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}44</p>
							<p class="trading-redcolor">0.000194</p>
							<p>1.541</p>
							<p class="last">5.20</p>
							<p class="progress" style="width: 0.13%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}45</p>
							<p class="trading-redcolor">0.000191</p>
							<p>1.517</p>
							<p class="last">613.05</p>
							<p class="progress" style="width: 16.43%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}46</p>
							<p class="trading-redcolor">0.000063</p>
							<p>0.500</p>
							<p class="last">200.00</p>
							<p class="progress" style="width: 5.36%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}47</p>
							<p class="trading-redcolor">0.000002</p>
							<p>0.015</p>
							<p class="last">364.56</p>
							<p class="progress" style="width: 9.77%;"></p>
						</li>
						<li role="button">
							<p class="stall trading-redcolor">{{$t('other["买"]')}}48</p>
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
					<h3>{{$t('other["正在进行的委托"]')}}</h3>
					<!---->
				</div>
				<div class="record-list">
					<ul>
						<li class="head">
							<div class="item time">
								<p>{{$t('other["时间"]')}}</p>
							</div>
							<div class="item">
								<p><span>{{$t('other["委托价"]')}}</span>{{$t('other["成交均价"]')}}(BTC)</p>
							</div>
							<div class="item">
								<p><span>{{$t('other["委托量"]')}}</span>{{$t('other["成交量"]')}}(QTUM)</p>
							</div>
							<div class="item">
								<p><span>{{$t('other["成交额"]')}}</span>(BTC)</p>
							</div>
							<div class="item last">
								<p>{{$t('other["操作"]')}}</p>
							</div>
						</li>
						<!---->
						<li>
							<div class="bk-norecord">
								<p><i class="bk-ico info"></i>{{$t('other["您还没有登录，请"]')}} <a href="/login" style="color: rgb(222, 33, 29); margin: 0px 5px;">登录</a> 或 <a href="/register" style="color: rgb(61, 193, 142); margin: 0px 5px;">{{$t('other["注册"]')}}</a> {{$t('other["后再尝试"]')}}。</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="current-entrust">
				<div class="entrust-head">
					<h3>{{$t('other["历史委托"]')}}</h3>
					<!---->
				</div>
				<div class="record-list">
					<ul>
						<li class="head">
							<div class="item time">
								<p>{{$t('other["时间"]')}}</p>
							</div>
							<div class="item">
								<p><span>{{$t('other["委托价"]')}}</span>{{$t('other["成交均价"]')}}(BTC)</p>
							</div>
							<div class="item">
								<p><span>{{$t('other["委托量"]')}}</span>{{$t('other["成交量"]')}}(QTUM)</p>
							</div>
							<div class="item">
								<p><span>{{$t('other["成交额"]')}}</span>(BTC)</p>
							</div>
							<div class="item last">
								<p>{{$t('other["操作"]')}}</p>
							</div>
						</li>
						<!---->
						<li>
							<div class="bk-norecord">
								<p><i class="bk-ico info"></i>{{$t('other["您还没有登录，请"]')}} <a href="/login" style="color: rgb(222, 33, 29); margin: 0px 5px;">登录</a> 或 <a href="/register" style="color: rgb(61, 193, 142); margin: 0px 5px;">{{$t('other["注册"]')}}</a> {{$t('other["后再尝试"]')}}。</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="newest-record">
			<div class="newest-top">
				<h3>{{$t('other["最新成交"]')}}</h3>
			</div>
			<div class="newest-head">
				<p class="time"><span>{{$t('other["成交时间"]')}}</span></p>
				<p><span>{{$t('other["成交价"]')}}(BTC)</span></p>
				<p><span>{{$t('other["折价"]')}}(USD)</span></p>
				<p class="last"><span>{{$t('other["交易量"]')}}(QTUM)</span></p>
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
