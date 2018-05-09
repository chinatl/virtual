<template>
	<div class="loading1">
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</div>
</template>
<style scoped="true">
	.loading1 {
		list-style: none;
		display: flex;
		flex-flow: wrap;
		width: 60px;
		height: 60px;
	}
	
	.loading1 div {
		width: 20px;
		height: 20px;
		background-color: #fff;
		animation: l5 1.3s infinite ease-in-out;
	}
	
	.loading1 div:nth-child(1) {
		animation-delay: 0.2s;
	}
	
	.loading1 div:nth-child(2) {
		animation-delay: 0.2s;
	}
	
	.loading1 div:nth-child(3) {
		animation-delay: 0.4s;
	}
	
	.loading1 div:nth-child(4) {
		animation-delay: 0.1s;
	}
	
	.loading1 div:nth-child(5) {
		animation-delay: 0.2s;
	}
	
	.loading1 div:nth-child(6) {
		animation-delay: 0.3s;
	}
	
	.loading1 div:nth-child(7) {
		animation-delay: 0s;
	}
	
	.loading1 div:nth-child(8) {
		animation-delay: 0.1s;
	}
	
	.loading1 div:nth-child(9) {
		animation-delay: 0.2s;
	}
	
	@keyframes l5 {
		0%,
		70%,
		100% {
			transform: scale3D(1, 1, 1)
		}
		35% {
			transform: scale3D(0, 0, 1)
		}
	}

</style>
