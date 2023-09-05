import { request } from '@/utils/request'
import env from '@/host'

export async function elegantList(params = {}) {
  try {
    return await request({
      url: `${env.api}/elegant/list?doorCustomType=2`,
      method: 'get'
    })
  } catch (err) {
    return {
      code: 500,
      msg: '登录失败'
    }
  }
}