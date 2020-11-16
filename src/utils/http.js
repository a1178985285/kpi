import axios from 'axios'
import Vue from 'vue'
import base from '../api/base';
import { Message } from 'element-ui';
import { Loading } from "element-ui";
// import qs from 'qs'
// Vue.prototype.$qs = qs

var service = axios.create({
  baseURL: base.headerUrl + 'pfm.firstcare.com.cn',
  // baseURL: 'http://10.200.2.171:8081', 
  // baseURL: 'http://10.200.2.164:8081/hr_pfm',
  timeout: 20000,
  headers: { 'Content-Type': 'application/json;charset=UTF-8' }
});

Vue.prototype.service = service

export default {
  getWay(url, param) {
    return new Promise((cback, reject) => {
      // let loadingInstance = Loading.service({
      //   lock: true,
      //   text: "加载中",
      //   spinner: "el-icon-loading",
      //   background: "rgba(0, 0, 0, 0.7)",
      // });
      service({
        method: 'get',
        url,
        data: param,
      }).then(res => {
        if (res.data.status == '200') {
          cback(res)
          // loadingInstance.close();
        } else {
          Message({
            message: res.data.msg,
            type: 'error'
          })
          setTimeout(() => {
            // loadingInstance.close();
          }, 2000)
        }
      }).catch(err => {
        reject(err)
        Message({
          message: "请求错误",
          type: 'error'
        })
        setTimeout(() => {
          // loadingInstance.close();
        }, 2000)
        // window.location.href = base.tologinUrl;
      })
    })
  },

  getWayTwo(url, param) {
    return new Promise((cback, reject) => {
      // var  loadingInstances= Loading.service({
      //   lock: true,
      //   text: "加载中",
      //   spinner: "el-icon-loading",
      //   background: "rgba(0, 0, 0, 0.7)",
      // });
      service({
        method: 'get',
        url,
        data: param,
      }).then(res => {
        console.log(service)
        if (res.data.status == '200') {
          cback(res)
          // loadingInstances.close();
        } else {
          Message({
            message: res.data.msg,
            type: 'error'
          })
            // loadingInstance.close();
        }
      }).catch(err => {
        reject(err)
        Message({
          message: "请求错误",
          type: 'error'
        })
          // loadingInstances.close();
        // window.location.href = base.tologinUrl;
      })
    })
  },

  get(url, param) {
    return new Promise((cback, reject) => {
      service({
        method: 'get',
        url,
        data: param,
      }).then(res => {
        cback(res)
        if (res.data.status == '200') {
        } else {
          Message({
            message: res.data.msg,
            type: 'error'
          })
        }
      }).catch(err => {
        reject(err)
        Message({
          message: "请求错误",
          type: 'error'
        })
        // window.location.href = base.tologinUrl;
      })

    })
  },

  getWayTwo(url, param) {
    return new Promise((cback, reject) => {
      var  loadingInstance= Loading.service({
        lock: true,
        text: "加载中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      service({
        method: 'get',
        url,
        params: param,
        timeout: 180000,
      }).then(res => {
      console.log(service.method)
        cback(res)
        if (res.data.status == '200') {
          cback(res)
          loadingInstance.close();
        } else {
          Message({
            message: res.data.msg,
            type: 'error'
          })
          loadingInstance.close();
        }
      }).catch(err => {
        reject(err)
        Message({
          message: "请求错误",
          type: 'error'
        })
      })
    })
  },



  postWay(url, params) {
    return new Promise((cback, reject) => {
      // let loadingInstance = Loading.service({
      //   lock: true,
      //   text: "加载中",
      //   spinner: "el-icon-loading",
      //   background: "rgba(0, 0, 0, 0.7)",
      // });

      service({
        method: 'post',
        url,
        data: params,
      }).then(res => {
        cback(res)
        if (res.data.status == '200') {
          cback(res)
          // loadingInstance.close();
        } else {
          Message({
            message: res.data.msg,
            type: 'error'
          })
          setTimeout(() => {
            // loadingInstance.close();
          }, 2000)
        }
      }).catch(err => {
        reject(err)
        Message({
          message: "请求错误",
          type: 'error'
        })
        setTimeout(() => {
          // loadingInstance.close();
        }, 2000)
      })
    })
  },

  postCode(url, params) {
    return new Promise((cback, reject) => {
      service({
        method: 'post',
        url,
        data: params,
      }).then(res => {
        cback(res)
        if (res.data.status == '200') {
          cback(res)
        } else {
          Message({
            message: res.data.msg,
            type: 'error'
          })
        }
      }).catch(
        err => {
        reject(err)
        console.log(err.response)
        Message({
          showClose: true,
          message:err.response.data.message,
          type: 'error',
          duration:	5000
        })
      })

    })
  },

  post(url, params) {
    return new Promise((cback, reject) => {
      service({
        method: 'post',
        url,
        data: params,
      }).then(res => {

        if (res.data.status == '200') {
          cback(res)
        } else {
          Message({
            message: res.data.msg,
            type: 'error'
          })
        }
      }).catch(err => {
        reject(err)
        Message({
          message: "请求错误",
          type: 'error'
        })
      })
    })
  },


  deleWay(url, param) {
    return new Promise((cback, reject) => {
      service({
        method: 'delete',
        url,
        params: param,
      }).then(res => {
        cback(res)
        if (res.data.status == '200') {
          cback(res)
          Message({
            message: res.data.msg,
            type: 'success'
          })
        } else {
          Message({
            message: res.data.msg,
            type: 'error'
          })
        }
      }).catch(err => {
        reject(err)
        Message({
          message: "请求错误",
          type: 'error'
        })
      })
    })
  },

} 