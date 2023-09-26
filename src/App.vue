<script setup>
import { getToken } from '@/store/token'

import { initUserStore } from '@/modules/login'

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
</script>

<style>
/*每个页面公共css */
</style>
