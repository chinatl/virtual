import request from 'superagent'
import {
	Message,
	MessageBox
} from 'element-ui'
import Vue from 'vue'
export default obj => {
	request
		.post('/' + obj.url)
		.set('Content-type', 'application/x-www-form-urlencoded')
		.send(obj.data)
		.then(res => {
			obj.success && obj.success(res.body)
		}).catch(res => {
			console.log(res)
			obj.fail && obj.fail(res.body)
			Message.error('网页延迟');
		})
}
