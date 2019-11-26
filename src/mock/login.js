import { param2Obj } from '@/utils'

const userMap = {
  admin: {
    code: 0,
    token: '111',
    introduction: '超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'admin'
  },
  editor: {
    code: 0,
    token: '222',
    introduction: '普通用户',
    avatar: 'https://mgbq.github.io/nx-admin-site/home.png',
    name: 'editor'
  },
  payee: {
    code: 0,
    token: '333',
    introduction: 'VIP',
    avatar: 'https://mgbq.github.io/nx-admin-site/home.png',
    name: 'payee'
  }
}

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    return userMap[username]
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  logout: () => {
    return {
      code: 0,
      Message: 'success'
    }
  }
}
