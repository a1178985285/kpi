import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


import baseFun from './utils/base'
Vue.use(baseFun);

import axios from './utils/http'
import api from  './api'
import commonFn from './utils/commit'
Vue.prototype.commonFn = commonFn;
import '@babel/polyfill'
Vue.prototype.axios = axios
Vue.prototype.api= api
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),  
}).$mount('#app')



