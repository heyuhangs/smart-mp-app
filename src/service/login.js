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
      message: 'a'
    }
  }
}
