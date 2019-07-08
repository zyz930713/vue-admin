import Axios from 'axios'
import qs from 'qs'
import table from './modules/table'

import Store from '../store'

// import {getUrlPara} from './common/index'
const modules = [table]
class GetData {
  // constructor() {}
  sendAjax(options, params) {
    this.initInterceptor()
    // let paramsObj = getUrlPara()
    // console.log('路径所带参数：')
    // console.log(paramsObj)
    Axios.interceptors.request.use(options.req || new Function())
    Axios.interceptors.response.use(options.res || new Function())
    if (options.method === 'post') {
      // options.data = options.data || params
      options.data = options.data || qs.stringify(params, { indices: false })
    } else {
      options.params = params
    }
    let source
    if (Store.getters.getSource) {
      source = Store.getters.getSource
    } else {
      source = '1'
    }
    options.headers['Authorization'] = source
    if (sessionStorage.getItem('token')) {
      options.headers['token'] = sessionStorage.getItem('token')
    } else {
      options.headers['token'] = ''
    }
    if (sessionStorage.getItem('iUserID')) {
      options.headers['iUserID'] = sessionStorage.getItem('iUserID')
    } else {
      options.headers['iUserID'] = ''
    }
    // options.headers['token'] = sessionStorage.getItem('token');
    // options.headers['iUserID'] = sessionStorage.getItem('iUserID');
    // options.headers['source'] = source;
    // options.headers['station'] = 'MHD';
    // if(Store.getters.getSource&&Store.getters.getChannel){
    //     options.headers['Authorization'] = Store.getters.getSource+'&'+Store.getters.getChannel;
    // }
    // console.log('options',options);
    return Axios(options, params)
  }
  fetch(params) { // 基础方法
    this.initInterceptor()
    return Axios(params)
  }

  initInterceptor() {
    Axios.interceptors.request.handlers = []
    Axios.interceptors.response.handlers = []
  }
}
const injectFunction = function(constructor) {
  modules.forEach((value) => {
    for (const i in value) {
      constructor.prototype[i] = value[i]
    }
  })
}
// console.log('Store.getSource', Store.getters.getSource);
// console.log('Store.getChannel',Store.getters.getChannel);
injectFunction(GetData)

const api = function(Vue, options) {
  Vue.prototype.$getData = new GetData()
}

const getData = new GetData()
// export default { postObj }
export {
  // paramsId,
  api,
  getData
}
