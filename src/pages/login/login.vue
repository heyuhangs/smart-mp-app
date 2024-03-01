<template>
  <view class="t-login">
    <!-- 页面装饰图片 -->
    <image class="img-a" src="@/static/login/login_bg.png" />
    <form class="cl">
      <view class="t-a">
        <input type="number" name="studentNumber" placeholder="请输入学号" maxlength="99" v-model="studentNumber" />
      </view>
      <view class="t-a">
        <input type="password" name="password" maxlength="18" placeholder="请输入密码" v-model="password" />
      </view>
      <button @tap="login()" :loading="loading">登 录</button>
    </form>
  </view>
</template>

<script setup>
import { ref } from 'vue'

import { setToken } from '@/store/token'
import { studentNumberLogin } from '@/service/login'
import { initUserStore } from '@/modules/login'

const studentNumber = ref('')//admin
const password = ref('') //1Q2w3e4r5t
const loading = ref(false)

async function login() {
  try {
    if (!studentNumber.value) {
      uni.showToast({ title: '请输入学号', icon: 'none' })
      return
    }

    if (!password.value) {
      uni.showToast({ title: '请输入密码', icon: 'none' })
      return
    }

    loading.value = true

    const { data, msg, code } = await studentNumberLogin({
      userName: studentNumber.value,
      password: password.value
    })

    if (code === 200 && data.token) {
      setToken(data.token)
      await initUserStore()
      uni.showToast({ title: '登录成功！', icon: 'none' })

      uni.switchTab({
        url: `/pages/index/index`
      })
      return
    }

    uni.showToast({ title: msg, icon: 'none' })
  } catch (e) {
    uni.showToast({ title: '登录失败', icon: 'none' })
  } finally {
    loading.value = false
  }
}
</script>

<style>
.img-a {
  width: 100%;
  height: 530rpx;
}

.t-login {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-size: 28rpx;
  color: #000;
}

.t-login button {
  font-size: 30rpx;
  font-weight: 600;
  margin-top: 120rpx;
  background: #4574e0;
  color: #fff;
  height: 98rpx;
  line-height: 98rpx;
  border-radius: 50rpx;
  box-shadow: 0 5px 7px 0 rgba(86, 119, 252, 0.2);
}

.t-login input {
  box-sizing: border-box;
  padding: 0 20rpx 0 46rpx;
  width: 641rpx;
  height: 98rpx;
  line-height: 98rpx;
  margin-bottom: 50rpx;
  background: #f5f5fa;
  color: #333;
  font-size: 28rpx;
  border-radius: 50rpx;
}

.t-login .t-a {
  position: relative;
}

.t-login .t-a image {
  width: 40rpx;
  height: 40rpx;
  position: absolute;
  left: 40rpx;
  top: 28rpx;
  border-right: 2rpx solid #dedede;
  padding-right: 20rpx;
}

.t-login .t-b {
  text-align: left;
  font-size: 46rpx;
  color: #000;
  padding: 300rpx 0 120rpx 0;
  font-weight: bold;
}

.t-login .t-c {
  position: absolute;
  right: 22rpx;
  top: 22rpx;
  background: #5677fc;
  color: #fff;
  font-size: 24rpx;
  border-radius: 50rpx;
  height: 50rpx;
  line-height: 50rpx;
  padding: 0 25rpx;
}

.t-login .t-d {
  text-align: center;
  color: #999;
  margin: 80rpx 0;
}

.t-login .t-e {
  text-align: center;
  width: 250rpx;
  margin: 80rpx auto 0;
}

.t-login .t-g {
  float: left;
  width: 50%;
}

.t-login .t-e image {
  width: 50rpx;
  height: 50rpx;
}

.t-login .t-f {
  text-align: center;
  margin: 200rpx 0 0 0;
  color: #666;
}

.t-login .t-f text {
  margin-left: 20rpx;
  color: #aaaaaa;
  font-size: 27rpx;
}

.t-login .uni-input-placeholder {
  color: #000;
}

.cl {
  zoom: 1;
  margin-top: 38rpx;
}

.cl:after {
  clear: both;
  display: block;
  visibility: hidden;
  height: 0;
  content: '\20';
}
</style>
