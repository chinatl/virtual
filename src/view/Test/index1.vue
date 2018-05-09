<template>
	<div style="padding:20px">
		<p style="color:#000">{{value}}</p>
		<el-form >
		  <el-form-item>
			<el-input v-model="form.name"></el-input>
		  </el-form-item>
			<el-button type="primary" @click="onSubmit">立即创建</el-button>
			<el-button>取消</el-button>
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
					value: ''
				}
			}
		},
		methods: {
			onSubmit() {
				var index = this.$route.query.index;
				var state = this.$store.state;
				state.data[state.name].list[state.arr[state.name]].card[index].msg = this.form.name;
				this.$router.push({
					'path': 'test'
				})

			}
		},
		created() {
			var index = this.$route.query.index;
			var state = this.$store.state;
			this.value = state.data[state.name].title;
			this.form.name = state.data[state.name].list[state.arr[state.name]].card[index].msg;
		}
	}

</script>
