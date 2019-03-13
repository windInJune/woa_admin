import axios from "axios";
import {
  Message,
  Loading,
  MessageBox
} from 'element-ui'
import router from '@/router';
import {
  setCookie,
  getCookie
} from "../assets/js/cookie.js";
let baseUrl
if (process.env.NODE_ENV == 'development') {
    baseUrl = 'http://172.16.1.165/ibox/';
} else {
    baseUrl = 'http://172.16.1.165/ibox/';
    // baseUrl = 'http://47.110.226.59/ibox/'; //线上url
}
const axiosfn = (url = '', data = {}, type = 'GET') => {
  console.log()
  type = type.toUpperCase();
  url = baseUrl + url;
  let dataStr = ''; //数据拼接字符串
  Object.keys(data).forEach(key => {
    dataStr += key + '=' + data[key] + '&';
  })
  if (dataStr !== '') {
    dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
    url = url + '?' + dataStr;
  }
  let requestConfig = {
    method: type,
    timeout: 10000,
    headers: {
      userToken: getCookie("userToken")
    },
    data: type == 'GET' ? {} : data
  }
  let _promise = new Promise(function (resolve, reject) {
    axios(url, requestConfig).then(res => {
      let _data = res.data ? res.data : res.body;
      if (_data.status === 200) {
        resolve(res)
      } else if (_data.status === 511) {
        router.push({
          path: "/"
        })
        resolve(res)
      } else {
        Message({
          type: 'error',
          message: `${_data.errorMessage}`
        })
        resolve(res)
      }
    },err => resolve(err))
  });
  return _promise;
}
export {
  axiosfn
}
