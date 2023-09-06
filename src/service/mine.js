import { request } from '@/utils/request'
import env from '@/host'

/* *
 * 获取课程日历列表
 */
export async function scheduleList(params = {}) {
  try {
    return await request({
      url: `${env.api}/course/schedule/list`,
      method: 'get'
    })
  } catch (err) {
    return {
      code: 500,
      msg: '登录失败'
    }
  }
}