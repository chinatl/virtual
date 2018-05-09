<template>
<div class="pay_panel">
	<div class="pay-content">
		暂未开启
	</div>
</div>
</template>
<script>
	export default {
		data() {
			return {
				formInline: {
					currency: 'BTC',
				},
				options: [ {
					value: 'BTC',
					label: 'BTC'
				}, {
					value: 'HSR',
					label: 'HSR'
				}, {
					value: 'QTUM',
					label: 'QTUM'
				}, {
					value: 'ETH',
					label: 'ETH'
				}],
				table_data: [{
					date: '2018-12-13',
					type: '类型',
					money: '金额',
					times: '次数',
					time: '处理时间',
					status: '状态'
				}, {
					date: '2018-12-13',
					type: '类型',
					money: '金额',
					times: '次数',
					time: '处理时间',
					status: '状态'
				}, {
					date: '2018-12-13',
					type: '类型',
					money: '金额',
					times: '次数',
					time: '处理时间',
					status: '状态'
				}, {
					date: '2018-12-13',
					type: '类型',
					money: '金额',
					times: '次数',
					time: '处理时间',
					status: '状态'
				} ],
				form: {
					value: '',
					btc: ''
				},
				select_data: [1, 231, 1, 2, 2, 12312, 321, 1, 1, 1, 1, 1, 1, 1, 1, 1]
			}
		}
	}

</script>
<style scoped="true">
	.pay_panel {
		padding: 18px;
	}
	
	.select ul {
		border-left: 1px solid #ccc;
		border-top: 1px solid #ccc;
		overflow: hidden
	}
	
	.select ul li {
		border-right: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
		width: 100px;
		padding-left: 20px;
		float: left;
		height: 40px;
		line-height: 40px;
		cursor: pointer;
		font-weight: bold
	}
	
	.pay-content {
		margin-bottom: 20px;
	}
	
	.address {
		text-align: center
	}
	
	.address p {
		margin-top: 12px;
		color: #aaa;
	}
	
	.address .add {
		font-size: 16px;
		font-weight: bold;
		color: #000;
		margin-bottom: 10px
	}
	
	.address h5 {
		font-weight: 700;
		color: #666;
	}
	
	.address .orange {
		color: #ff9d11;
		cursor: pointer
	}

</style>
