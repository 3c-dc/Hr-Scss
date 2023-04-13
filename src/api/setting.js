import request from '@/utils/request'

/**
 *
 * 获取角色列表
 * params是查询参数，里面需要携带分页信息
 * **/
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}

/**
 * 获取公司信息
 * **/
export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}
