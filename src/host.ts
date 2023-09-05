export const buildEnv = import.meta.env.VITE_BUILD_ENV

const devEnv = {
  api: 'http://api.spincloud.cn:8099/api',
}

const productionEnv = {
  api: 'http://api.spincloud.cn:8099/api',
}

const env = (function getEnv() {
  if (buildEnv === 'dev') return devEnv

  return productionEnv
})()

export default env
