import request from 'superagent'
import config from '@/config'

import {
    Message,
    MessageBox
} from 'element-ui'
export default obj => {
    request
        .get(config + obj.url)
        .query(obj.data)
        .then(function (res) {
            if (res.data + '' === 'null') {
                return
            }
            obj.success && obj.success(res.body)
        }).catch(res => {
            console.log(res)
            Message.error({
                title: '错误',
                message: '网络延迟'
            });
            obj.fail && obj.fail(res.body)
        })
}
