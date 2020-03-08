import LayoutLeft from './home/layout-Left'
import layoutTop from './home/layout-Top'
import BreadCrumb from './common/bread-crumb'
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  install: function (Vue) {
    Vue.component('layout-Left', LayoutLeft)// 注册侧边栏组件
    Vue.component('layout-Top', layoutTop)// 注册顶部组件
    Vue.component('bread-crumb', BreadCrumb)// 注册面包屑
    Vue.use(VueQuillEditor)// 注册富文本编辑器
  }
}
