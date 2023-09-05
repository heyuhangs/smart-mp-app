import { request } from '@/utils/request'
import env from '@/host'

/* *
 * 基地简介&基地要闻列表
 */
export async function elegantList(params = {}) {
  try {
    return await request({
      url: `${env.api}/elegant/list?doorCustomType=` + params.doorCustomType,
      method: 'get'
    })
  } catch (err) {
    return {
      code: 500,
      msg: '登录失败'
    }
  }
}

/* *
 *获取详情
 */
export async function elegantInfo(params = {}) {
  try {
    return await request({
      url: `${env.api}/elegant/` + params.doorCustomId,
      method: 'get'
    })
  } catch (err) {
    return {
      code: 500,
      msg: '登录失败'
    }
  }
}