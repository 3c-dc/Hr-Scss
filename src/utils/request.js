// 导入 element-ui 的 message 组件
import { Message } from 'element-ui'

// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'

// 导入 Vuex store
import store from '@/store'

// 导入 路由 router
import router from '@/router'
import { getTimeStamp } from '@/utils/auth'
const TimeOut = 5400 // 定义超时时间 一个半小时 60*90=5400 S

const service = axios.create({
  // 如果执行npm run dev的值为/api 正确 /api这个代理知识给开发环境配置的代理
  // 如果执行npm run build的值为/prod-api 没关系 运维应该在上线的时候 给你配置上/prod-api的代理
  baseURL: process.env.VUE_APP_BASE_API, // 设置axios请求的基础的基础地址
  timeout: 5000 // 定义5秒超时
}) // 创建一个axios的实例

service.interceptors.request.use(config => {
  // 在这个位置需要统一的去注入token
  // config 是请求的配置信息
  // 注入token
  if (store.getters.token) {
    // 如果token存在,注入token
    // 只有在有token的情况下 才有必要去检查时间戳是否超时
    // 只有在有token的情况下 才有必要去检查时间戳是否超时
    if (IsCheckTimeOut()) {
      // 如果它为true表示 过期了
      // token没用了 因为超时了
      store.dispatch('user/logout') // 登出操作
      // 跳转到登录页
      router.push('/login')
      return Promise.reject(new Error('token超时了'))
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config // 必须返回配置 不然相当于没有配置
}, error => {
  return Promise.reject(error)
}
) // 请求拦截器

// token超时的错误码是**`10002`** 通过查询接口文档得知

service.interceptors.response.use(response => {
  // axios默认添加了一层data
  const { success, message, data } = response.data
  // 要根据success的成功与否局决定下面的操作
  if (success) {
    return data
  } else {
    // 返回的一个promise对象 业务获取数据失败了 不能继续进入.then,后面页面使用catch接收
    Message.error(message) // 提示错误消息
    return Promise.reject(new Error(message))
  }
}, error => {
  //  error 信息 里面 response 的对象
  if (error.response && error.response.data && error.response.data.code === 10002) {
    // 当等于10002的时候 表示 后端告诉我token超时了
    store.dispatch('user/logout') // 登出action 删除token
    router.push('/login')
  } else {
    Message.error(error.message) // 提示错误消息
  }
  return Promise.reject(error) // 返回执行错误让当前的执行链跳出成功 直接进入catch
}) // 响应拦截器

// 是否超时
// 超时逻辑  (当前时间  - 缓存中的时间) 是否大于 时间差
function IsCheckTimeOut() {
  var currentTime = Date.now() // 当前时间戳
  var timeStamp = getTimeStamp() // 缓存时间戳
  // console.log((currentTime - timeStamp) / 1000)
  // 获取时间是 Date.now() = ms 毫秒转变为秒要除以1000
  return (currentTime - timeStamp) / 1000 > TimeOut
}

export default service // 导出axios实例
