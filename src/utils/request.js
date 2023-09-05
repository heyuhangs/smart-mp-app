function getHeader(params) {
  // const host = params.url.match(/https?:\/\/([^/]+)\//i)[1]

  const header = {}

  return header
}

export async function request(params) {
  try {
    // let { at = '', rt = '' } = getToken() || {}

    // if (params?.data?.at) {
    //   at = params?.data?.at ?? ''
    //   rt = params?.data?.rt ?? ''
    // }

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
          resolve(res)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })

    return response.data
  } catch (err) {
    console.log(err)
    debugger
    throw err
  }
}
