import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
// 状态
// 初始化的时候从缓存中读取状态 并赋值到初始化的状态上
// Vuex的持久化 如何实现? => Vuex和前端缓存相结合
const state = {
  token: getToken(), // 色湖之token初始状态 token持久化 => 放到缓存中
  userInfo: {} // 定义一个空的对象 不是null 因为后边我要开发userInfo的属性给别人用  userInfo.name
}
// 修改状态
const mutations = {
  // 设置token
  setToken(state, token) {
    state.token = token // 设置token 只是修改state的数据 123 => 1234
    // Vuex变化 => 缓存数据
    setToken(token) // Vuex和缓存数据的同步
  },

  // 删除token 并删除缓存中的token
  removeToken(state) {
    state.token = null // 删除Vuex的token
    removeToken() // 先清除 Vuex 再清除缓存 Vuex和缓存数据的同步
  },

  // 设置用户信息
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo // 这个方法也能触发组件的更新 实现响应式
    // state.userInfo = { ...userInfo } // 用浅拷贝的方式去赋值对象 因为这样数据更新之后，才会触发组件的更新
    // state.userInfo['username'] = result // 这样才不是响应式 触发组件更新
  },

  // 删除用户信息
  reomveUserInfo(state) {
    state.userInfo = {}
  }
}
// 执行异步
const actions = {
  // 定义登录login action 也需要参数 调用action时 传递过来的参数
  async login(context, data) {
    const result = await login(data) // 实际上就是一个promise  result就是执行的结果
    // axios默认给数据加了一层data
    // 表示登录接口调用成功 也就是意味着你的用户名和密码是正确的
    // 现在有用户token
    // actions 修改state 必须通过mutations
    context.commit('setToken', result)
  },

  // 获取用户资料getUserInfo action
  async getUserInfo(context) {
    const result = await getUserInfo() // 获取返回值 result就是用户的基本资料
    const baseInfo = await getUserDetailById(result.userId) // 为了获取头像
    const baseResult = { ...result, ...baseInfo } // 将两个接口结果合并
    // 此时已经获取到了用户的基本资料 迫不得已 为了头像再次调用一个接口

    context.commit('setUserInfo', baseResult) // 提交mutations
    // 加一个点睛之笔  这里这一步，暂时用不到，但是请注意，这给我们后边会留下伏笔
    return baseResult
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
