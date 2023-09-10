import { request } from '@/utils/request'
import env from '@/host'

/* *
 * 获取课程日历列表
 */
export async function scheduleList(params = {}) {
  try {
    return await request({
      url: `${env.api}/course/schedule/list?scheduleId=` + params.scheduleId,
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
 * 获取简历列表
 */
export async function getResumeList(params = {}) {
  try {
    return await request({
      url: `${env.api}/studentTerminal/resume/getResumeList`,
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
 * 获取简历
 */
export async function getResumeInfo(params = {}) {
  try {
    return await request({
      url: `${env.api}/studentTerminal/resume/getResumeInfo/` + params.resumeId,
      method: 'get'
    })
  } catch (err) {
    return {
      code: 500,
      msg: '登录失败'
    }
  }
}