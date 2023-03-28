// 导入 element-ui 的 message 组件
import { Message } from 'element-ui'

// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'

// 导入 Vuex store
import store from '@/store'

const service = axios.create({
  // 如果执行npm run dev的值为/api 正确 /api这个代理知识给开发环境配置的代理
  // 如果执行npm run build的值为/prod-api 没关系 运维应该在上线的时候 给你配置上/prod-api的代理
  baseURL: process.env.VUE_APP_BASE_API, // 设置axios请求的基础的基础地址
  timeout: 5000 // 定义5秒超时
}) // 创建一个axios的实例

service.interceptors.request.use(config => {
  // 在这个位置需要统一的去注入token
  if (store.getters.token) {
    // 如果token存在,注入token
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config // 必须返回配置 不然相当于没有配置
}, error => {
  return Promise.reject(error)
}
) // 请求拦截器

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
  Message.error(error.message) // 提示错误消息
  return Promise.reject(error) // 返回执行错误让当前的执行链跳出成功 直接进入catch
}) // 响应拦截器
export default service // 导出axios实例
