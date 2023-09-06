import { request } from '@/utils/request'
import env from '@/host'

/* *
 * 获取实训室信息
 */
export async function trainingroomInfo(params = {}) {
  try {
    return await request({
      url: `${env.api}/trainingroom/` + params.id,
      method: 'get'
    })
  } catch (err) {
    return {
      code: 500,
      msg: '登录失败'
    }
  }
}