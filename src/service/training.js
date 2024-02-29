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


/* *
 * 获取开关列表
 */
export async function trainingSwitchList(id) {
  try {
    return await request({
      url: `${env.api}/trainingroom/selectSwitch/${id}`,
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
 * 开关控制
 */
export async function trainingSwitch(data = {}) {
  try {
    return await request({
      url: `${env.api}/trainingroom/switchControl`,
      method: 'put',
      data
    })
  } catch (err) {
    return {
      code: 500,
      msg: '登录失败'
    }
  }
}