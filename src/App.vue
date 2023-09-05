<script setup>
import { getToken, setUser } from '@/store/token'

import { getLoginUserInfo } from '@/service/login'
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'

onLaunch(() => {
  const chain = Promise.resolve()

  chain.then(checkLoginState).then(initUserStore)
  console.log('App Launch')
})

onShow(() => {
  console.log('App Show')
})

onHide(() => {
  console.log('App Hide')
})

const checkLoginState = async () => {
  const token = getToken()
  if (token) {
    return true
  }

  uni.reLaunch({
    url: `/pages/login/login`
  })
  return false
}

const initUserStore = async () => {
  const { code, data } = await getLoginUserInfo()
  if (code === 200 && data) {
    setUser(data)
    return true
  }

  return false
}
</script>

<style>
/*每个页面公共css */
</style>
