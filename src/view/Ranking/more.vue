<template>
<div>
	<div class="loading-six">
		<div></div>
		<div></div>
		<div></div>
		<div></div>
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
</div>
</template>

<style scoped="true">
	.loading-six {
		width: 40px;
		height: 40px;
		position: relative;
	}
	.loading-six div {
		width: 40px;
		height: 40px;
		position: absolute;
		left: 0;
		top: 0;
	}
	.loading-six div:nth-child(2) {
		transform: rotate(30deg)
	}
	
	.loading-six div:nth-child(3) {
		transform: rotate(60deg)
	}
	
	.loading-six div:nth-child(4) {
		transform: rotate(90deg)
	}
	
	.loading-six div:nth-child(5) {
		transform: rotate(120deg)
	}
	
	.loading-six div:nth-child(6) {
		transform: rotate(150deg)
	}
	
	.loading-six div:nth-child(7) {
		transform: rotate(180deg)
	}
	
	.loading-six div:nth-child(8) {
		transform: rotate(210deg)
	}
	
	.loading-six div:nth-child(9) {
		transform: rotate(240deg)
	}
	
	.loading-six div:nth-child(10) {
		transform: rotate(270deg)
	}
	
	.loading-six div:nth-child(11) {
		transform: rotate(300deg)
	}
	
	.loading-six div:nth-child(12) {
		transform: rotate(330deg)
	}
	
	.loading-six div:before {
		content: '';
		display: block;
		width: 10px;
		height: 10px;
		background-color: #666;
		border-radius: 100%;
		animation: l6 1.2s infinite both;
	}
	
	.loading-six div:nth-child(2):before {
		animation-delay: -1.1s;
	}
	
	.loading-six div:nth-child(3):before {
		animation-delay: -1s;
	}
	
	.loading-six div:nth-child(4):before {
		animation-delay: -.9s;
	}
	
	.loading-six div:nth-child(5):before {
		animation-delay: -.8s;
	}
	
	.loading-six div:nth-child(6):before {
		animation-delay: -.7s;
	}
	
	.loading-six div:nth-child(7):before {
		animation-delay: -.6s;
	}
	
	.loading-six div:nth-child(8):before {
		animation-delay: -.5s;
	}
	
	.loading-six div:nth-child(9):before {
		animation-delay: -.4s;
	}
	
	.loading-six div:nth-child(10):before {
		animation-delay: -.3s;
	}
	
	.loading-six div:nth-child(11):before {
		animation-delay: -.2s;
	}
	
	.loading-six div:nth-child(12):before {
		animation-delay: -.1s;
	}
	
	@keyframes l6 {
		0%,
		80%,
		100% {
			transform: scale(0)
		}
		40% {
			transform: scale(1)
		}
	}

</style>
