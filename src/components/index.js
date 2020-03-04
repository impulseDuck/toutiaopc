import LayoutLeft from './home/layout-Left'
import layoutTop from './home/layout-Top'
import BreadCrumb from './common/bread-crumb'

export default {
  install: function (Vue) {
    Vue.component('layout-Left', LayoutLeft)// 注册侧边栏组件
    Vue.component('layout-Top', layoutTop)// 注册顶部组件
    Vue.component('bread-crumb', BreadCrumb)// 注册面包屑
  }
}
