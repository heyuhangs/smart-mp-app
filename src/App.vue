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
/* 列表--暂无数据 */
.none {
	width: 400rpx;
	height: 400rpx;
	position: absolute;
	top: 50%;
    left: 50%;
	transform: translate(-50%, -50%);
}
</style>
