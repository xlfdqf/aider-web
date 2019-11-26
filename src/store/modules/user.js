import { login, logout, getLogin } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { message } from "@/utils/util.js";
import {
  setStore,
  getStore,
  removeStore
} from '@/utils/store'
let Base64 = require('js-base64').Base64;
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    browserHeaderTitle: 'DSAI数据中台系统',
    roles: [],
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, { token, name, avatar }) => {
      state.token = token;
      state.name = name;
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    // 设置浏览器标题
    SET_BROWSERHEADERTITLE: (state, action) => {
      state.browserHeaderTitle = action.browserHeaderTitle
    }
  },

  actions: {
    // 登录 获取用户信息
    Login({ commit }, userInfo) {
      let param = {
        username: userInfo.username,
        password: Base64.encode(userInfo.password),
        randomStr: "051307229000357",
        code: "aaa8" //验证码
      }
      return new Promise((resolve, reject) => {
        getLogin(param).then(response => {
          const data = response
          // console.log("登录返回信息：", data);
          if (data.code !== 0) {
            message(data.msg, "error");
          } 
          setToken(data.data.access_token)
          localStorage.setItem("user_id", data.data.user_id)
          commit('SET_TOKEN', data.data.access_token)
          commit('SET_USERINFO', { token: data.data.access_token, name: data.data.username })
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息(存储权限)
    // GetInfo({ commit, state }) { //根据token获取拉去用户信息（roles）
    //   return new Promise((resolve, reject) => {
    //     getInfo(state.token).then(response => {
    //       const data = response
    //       console.log("用户信息:", data)
    //       if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
    //         commit('SET_ROLES', data.roles)
    //       } else {
    //         reject('getInfo: roles must be a non-null array !')
    //       }
    //       resolve(response)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          removeToken()
          resetRouter()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
  }
}

export default user
