import { getInfo } from '@/api/login'
import { constantRouterMap, routerMap } from '@/router'
import store from '..';

//假设后端返回的路由表
// export const serverRouterMap = [
// {
//   path: '/superAdminSet',
//   component: 'layout',
//   // name: 'superAdminSet',
//   redirect: '/superAdminSet/rightsManagement',
//   meta: {
//     title: '系统管理',
//     icon: 'characteristics',
//     // roles: ['admin', 'editor']
//   },
//   children: [
//     {
//       path: 'rightsManagement',//权限管理
//       // name: 'rightsManagement',
//       component: 'rightsManagement',
//       meta: { title: '权限管理' }
//     }, {
//       path: 'systemLog',//系统日志
//       component: 'systemLog',
//       // name: 'systemLog',
//       meta: { title: '系统日志' },
//       // roles: ['admin']//仅管理员可见
//     }
//   ]
// }
// ]

// 将本地routerMap映射到获取到后端的serverRouterMap;
function generateAsyncRouter(routerMap, serverRouterMap) {
  serverRouterMap.forEach(function (item, index) {
    // console.log("映射：", routerMap[item.component])
    item.component = routerMap[item.component];
    if (item.children && item.children.length > 0) {
      generateAsyncRouter(routerMap, item.children)
    }
  })
  return serverRouterMap;
}

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 通过递归过滤异步路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    // if (hasPermission(roles, tmp)) {
    if (tmp.children) {
      tmp.children = filterAsyncRoutes(tmp.children)
    }
    res.push(tmp)
    // }
  })
  return res
}

const permission = {
  state: {
    routers: [],//全部路由
    addRouters: [],//动态路由
  },
  mutations: {
    // 添加动态路由
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers //动态路由
      state.routers = constantRouterMap.concat(routers) //动态+静态路由
      // console.log("静态+动态路由:", state.routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }) {
      return new Promise((resolve, reject) => {
        let params = { userId: localStorage.getItem('user_id') }
        getInfo(params).then(response => {
          // console.log("路由信息:", response)
          let serverRouterMap = response.data.act;
          let accessedRouters
          let asyncRouterMap = generateAsyncRouter(routerMap, serverRouterMap);
          accessedRouters = asyncRouterMap
          // if (roles.includes('admin')) {
          //   accessedRouters = asyncRouterMap
          // } else {
          //   accessedRouters = filterAsyncRoutes(asyncRouterMap, roles)
          // }
          accessedRouters = filterAsyncRoutes(asyncRouterMap)
          commit('SET_ROUTERS', accessedRouters)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default permission