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
 *获取基地详情
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

/* *
 *课程列表
 */
export async function courseList(params = {
  pageNum: 1,
  pageSize: 10,
}) {
  try {
    return await request({
      url: `${env.api}/edu/course/list?pageNum=` + params.pageNum + `&pageSize=` + params.pageSize,
      method: 'get',
			params: params
    })
  } catch (err) {
    return {
      code: 500,
      msg: '登录失败'
    }
  }
}

/* *
 *获取课程详情
 */
export async function courseInfo(params = {}) {
  try {
    return await request({
      url: `${env.api}/edu/course/` + params.id,
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
 * 获取师资介绍列表
 */
export async function introList(params = {}) {
  try {
    return await request({
      url: `${env.api}/edu/intro/list?courseId=` + params.courseId,
      method: 'get'
    })
  } catch (err) {
    return {
      code: 500,
      msg: '登录失败'
    }
  }
}