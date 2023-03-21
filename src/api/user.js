import request from '@/utils/request'

export function login(data) {
  // 返回一个 axios 对象 => promise
  // 返回了一个 promise 对象
  return request({
    url: '/sys/login', // 因为所有的接口都要跨域,表示所有的接口要带/api
    method: 'post',
    data: data // 因为两个对象名字一样可以直接使用ES6语法直接解构赋值 data:data === data
  })
}

export function getInfo(token) {

}

export function logout() {

}
