export const buildEnv = import.meta.env.VITE_BUILD_ENV

const devEnv = {
  api: 'http://api.spincloud.cn:8099/api',
  imgUrl: 'http://124.70.178.58:9000/'
}

const productionEnv = {
  api: 'http://api.spincloud.cn:8099/api',
  imgUrl: 'http://124.70.178.58:9000/'
}

const env = (function getEnv() {
  if (buildEnv === 'dev') return devEnv

  return productionEnv
})()

export default env
