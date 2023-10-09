import { getToken } from '@/store/token'

function getHeader(params) {
  const token = getToken()

  const header = {
    Authorization: 'Bearer ' + token
  }

  return header
}

export async function request(params) {
  try {
    const data = {
      ...params.data
    }

    const header = getHeader(params)

    const requestClient = uni.request
    const response = await new Promise(function r(resolve, reject) {
      requestClient({
        url: params.url,
        data,
        method: params.method || 'GET',
        header,
        success: (res) => {
          if (res && res.data && res.data.code === 401) {
            uni.showToast({ title: '登录失效', icon: 'none' })
            setTimeout(()=>{
              uni.reLaunch({
                url: `/pages/login/login`
              })
            }, 800)
          }
          resolve(res)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })

    return response.data
  } catch (err) {
    throw err
  }
}
