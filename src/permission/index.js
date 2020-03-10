import router from '@/router'
import progress from 'nprogress'// 进度条包
import 'nprogress/nprogress.css'// 进度条样式文件

router.beforeEach(function (to, from, next) {
  progress.start()// 开启进度条
  if (to.path.startsWith('/home')) {
    const token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
  router.afterEach(() => {
    // setTimeout(() =>
    //   progress.done()
    // , 200)
    progress.done()
  })
})
