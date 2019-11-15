// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Echarts from 'echarts'
import BaiduMap from 'vue-baidu-map'


Vue.prototype.$echarts = Echarts
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(BaiduMap,{
  // ak:'SXFCPcXhHdpmzL58MZ1EB8M7iA2Shqq1'
  ak:'t5V65uI40HHELDWqTbQXucWA'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
