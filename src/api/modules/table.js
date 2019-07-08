// import request from '@/utils/request'

// export function getList(params) {
//   return request({
//     url: '/table/list',
//     method: 'get',
//     params
//   })
// }
import mainConfig from '../config/main'
export default {
  getList(params) {
    const config = {
      url: '/table/list',
      method: 'get',
      params
    }
    return this.sendAjax(Object.assign({}, mainConfig, config), params)
  }
}
