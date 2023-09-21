import { request } from '@/utils/request'
import env from '@/host'

/* *
 * 获取当前周数
 */
export async function getWxWeekList(params = {}) {
  try {
    return await request({
      url: `${env.api}/course/schedule/getWxWeekList?week=` + params.week,
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
 * 获取课程日历列表
 */
export async function scheduleList(params = {}) {
  try {
    return await request({
      url: `${env.api}/course/schedule/list?dateList=` + params.dateList + `&scheduleId=` + params.scheduleId,
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

/* *
 * 设备存取-- 存储列表
 */
export async function getListSave(params = {}) {
  try {
    return await request({
      url: `${env.api}/box/info/list-save`,
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
 * 设备存取-- 取用列表
 */
export async function getListOpen(params = {}) {
  try {
    return await request({
      url: `${env.api}/box/info/list-open`,
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
 * 设备存取-- 开门请求
 */
export async function open(params = {}) {
  try {
    return await request({
      url: `${env.api}/box/info/open`,
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