export const buildEnv = import.meta.env.VITE_BUILD_ENV

const devEnv = {
  api: 'https://www.beisuo0451.com:8299/api',
  imgUrl: 'https://www.beisuo0451.com:8299/api'
}

const productionEnv = {
  api: 'https://www.beisuo0451.com:8299/api',
  imgUrl: 'https://www.beisuo0451.com:8299/api'
}

const env = (function getEnv() {
  if (buildEnv === 'dev') return devEnv

  return productionEnv
})()

export default env
