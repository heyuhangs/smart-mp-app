<script setup>
import { onLaunch, onShow, onHide} from '@dcloudio/uni-app'

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
  const isLogin = uni.getStorageSync('isLogin') || false
  if (isLogin) {
    return true
  }

  uni.reLaunch({
    url: `pages/login/login`
  })
  return false
}

const initUserStore = async () => {}
</script>

<style>
/*每个页面公共css */
</style>
