import { request } from '@/utils/request'
import env from '@/host'

export async function studentNumberLogin(params = {}) {
  try {
    return await request({
      url: `${env.api}/terminalPublic/wxLoginByUserName`,
      method: 'POST',
      data: params
    })
  } catch (err) {
    return {
      code: 500,
      msg: '登录失败'
    }
  }
}



export async function getLoginUserInfo(params = {}) {
  try {
    return await request({
      url: `${env.api}/terminalPublic/getLoginUserInfo`,
      method: 'POST',
      data: params
    })
  } catch (err) {
    return {
      code: 500,
      msg: '获取用户信息失败'
    }
  }
}