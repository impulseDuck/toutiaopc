import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import '@/styles/index.less'
import 'element-ui/lib/theme-chalk/index.css' // 引入模块
import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios
Vue.config.productionTip = false // 引入样式
Vue.use(ElementUI) // 全局注册，一旦全局注册，所有的位置都可以使用
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
