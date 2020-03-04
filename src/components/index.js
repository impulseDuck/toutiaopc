import LayoutLeft from './home/layout-Left'
import layoutTop from './home/layout-Top'

export default {
  install: function (Vue) {
    Vue.component('layout-Left', LayoutLeft)
    Vue.component('layout-Top', layoutTop)
  }
}
