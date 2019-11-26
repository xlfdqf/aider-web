import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权
import {
  setTitle
} from '@/utils/util' // 设置浏览器头部标题

function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}
const whiteList = ['/login'] // 不重定向白名单
var flag = 0;
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    // 设置浏览器头部标题
    const browserHeaderTitle = to.name
    store.commit('SET_BROWSERHEADERTITLE', {
      browserHeaderTitle: 'DSAI数据中台系统'
    })
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      // next();
      // store.dispatch('GenerateRoutes').then(() => {
      //   router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
      //   // router.addRoutes([{ path: '*', redirect: '/404', hidden: true }])
      //   // next({ ...to, replace: true }) // 不加判断出现死循环, hack方法:确保路由加载完毕,replace: true :导航不会留下历史记录
      // })
      // if (store.getters.roles.length === 0) {// 判断当前用户是否已拉取完user_info信息（没有获取用户信息）
      //   store.dispatch('GetInfo').then(res => { // 拉取用户信息
      //     const roles = res.roles // must：['editor','admin']
      //     store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
      //       router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
      //       next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
      //     })
      //   }).catch((err) => {
      //     store.dispatch('FedLogOut').then(() => {
      //       Message.error(err || 'Verification failed, please login again')
      //       next({ path: '/' })
      //     })
      //   })
      // } else { //当获取到用户信息后，直接next()
      //   // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
      //   if (hasPermission(store.getters.roles, to.meta.roles)) {
      //     console.log(store.getters.roles, to.meta.roles)
      //     next()//
      //   } else {
      //     alert('401')
      //     next({ path: '/401', replace: true, query: { noGoBack: true } })
      //   }
      // }
      if (flag === 0) {
        store.dispatch('GenerateRoutes').then(res => { // 根据userid查询动态路由
          flag++;
          // console.log("路由表", store.getters.addRouters);
          router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          router.addRoutes([{ path: '*', redirect: '/404', hidden: true }])
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    // 设置浏览器头部标题
    const browserHeaderTitle = to.name
    store.commit('SET_BROWSERHEADERTITLE', {
      browserHeaderTitle: 'DSAI数据中台系统'
    })
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
  setTimeout(() => {
    const browserHeaderTitle = store.getters.browserHeaderTitle
    setTitle(browserHeaderTitle)
  }, 0)
})

