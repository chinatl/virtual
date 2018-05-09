<template>
	<div class='test'>
		<el-collapse v-model="$store.state.name" accordion>
		  <el-collapse-item 
			:title="item.title"
			:name="item.name"
			v-for='(item,index) in $store.state.data'>
			  <el-carousel :interval="4000" height="200px" :autoplay='false' @change='change(index,$event)' :initial-index='$store.state.arr[index]'>
				<el-carousel-item v-for="(item_list,i) in item.list">
				 	<div class='test-flex'>
				 		<div v-for='(card,inxs) in item_list.card' style='width:20%;height:180px'>
				 			<img src="/static/hamburger.png" alt="">
							<p>{{card.msg}}<el-button type='success' size='mini' @click='push(inxs)'>编辑</el-button></p>
				 		</div>
				 	</div>
				</el-carousel-item>
			  </el-carousel>
		  </el-collapse-item>
		</el-collapse>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeName: '1',
				currentDate: new Date(),
				
			}
		},
		methods:{
			change(index,b){
				this.$store.state.arr[index] = b;
			},
			push(index){
				console.log(this.$store.state.arr)
				this.$router.push({'path':'test1',query:{index:index}});
			}
		},
		created(){
			
		}
		
	}

</script>

<style>
	.test {
		padding: 20px
	}
	
	.test-flex {
		display: flex;
		justify-content: space-around;
		align-items: center;
		text-align: center
	}
	
	.test-flex img {
		height: 150px;
	}
	
	.test-flex p {
		margin-top: 10px;
	}

</style>
