<template>
  <view v-show="isShow" class="device">
    <image class="device__none" v-if="deviceList.length === 0" src="@/static/mine/device.png"></image>
    <view v-else>
      <view v-for="(item, index) in deviceList" :key="index" class="device__content">
        <view class="device__item">
          <view class="device__item__title">归属柜门编号</view>
          <view class="device__item__msg">{{ item.gzbh }}</view>
        </view>
        <view v-if="isActive === 0" class="device__item">
          <view class="device__item__title">取用时间</view>
          <view class="device__item__msg">2023-09-03 11:49:49</view>
        </view>
        <view v-if="isActive === 1" class="device__item">
          <view class="device__item__title">箱子编码</view>
          <view class="device__item__msg">{{ item.xmbh }}</view>
        </view>
        <view class="device__item device__item__switch">
          <switch @change="onChange(item)" />
        </view>
      </view>
    </view>
    <view class="device__button">
      <view class="device__button__left" :class="isActive === 0 ? 'isActive' : ''" @click="handleTab(0)">取设备</view>
      <view class="device__button__right" :class="isActive === 1 ? 'isActive' : ''" @click="handleTab(1)">存设备</view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { getListSave, getListOpen, open } from '@/service/mine'
import env from '@/host'

const deviceList = ref([])
const isShow = ref(false)
const isActive = ref(0) // 0  取   1  存

const saveDevice = async () => {
  try {
    const { code, data } = await getListSave()
    if (code === 200 && data) {
      deviceList.value = data
      isShow.value = true
      uni.hideLoading()
      return
    }
    uni.showToast({
      icon: 'none',
      title: '存入设备接口超时'
    })
  } catch (e) {
    uni.showToast({
      icon: 'none',
      title: '存入设备接口超时'
    })
  } finally {
    isShow.value = true
    uni.hideLoading()
  }
}

async function init(index) {
  uni.showLoading({ title: '' })
  isShow.value = false
  if (index === 1) {
    saveDevice()
  } else if (index === 0) {
    const { code, data } = await getListOpen()
    if (code === 200 && data) {
      deviceList.value = data
      isShow.value = true
      uni.hideLoading()
    }
    if (data && data.length === 0) {
      uni.showToast({
        icon: 'none',
        title: '暂无设备'
      })
    }
  }
}
init(isActive.value)

//  设备开门
async function onChange(item) {
  const { code, data } = await open({ gzbh: item.gzbh, xmbh: item.xmbh, boxId: item.boxId })

  if (code === 200 && data) {
    uni.showToast({ title: '成功!', icon: 'none' })
  }
}

// 切换存取设备列表
function handleTab(index) {
  isActive.value = index
  init(index)
}
</script>

<style lang="scss" scoped>
.device {
  background-color: #f2f4f5;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  overflow-y: scroll;
  overflow-x: hidden;

  &__none {
    width: 100%;
    height: 50%;
    object-fit: cover;
    object-position: center;
    position: absolute;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #879098;
    line-height: 100rpx;
    border-bottom: 2rpx solid #f2f2f2;
    background-color: #ffffff;
    padding: 0 30rpx;
    font-size: 28rpx;

    &__title {
      color: #000000;
    }

    &__switch {
      display: flex;
      justify-content: flex-end;
      flex-direction: row;
    }
  }

  &__content {
    margin: 10rpx 0;
  }

  &__button {
    bottom: 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 32rpx;
    line-height: 80rpx;
    text-align: center;
    position: absolute;
    bottom: 50rpx;
    width: 100%;

    &__left {
      width: 45%;
      border-bottom-left-radius: 80rpx;
      border-top-left-radius: 80rpx;
      background: linear-gradient(90deg, #3573ff, #2061ff);
    }

    &__right {
      width: 45%;
      border-bottom-right-radius: 80rpx;
      border-top-right-radius: 80rpx;
      background: linear-gradient(90deg, #3573ff, #2061ff);
    }

    .isActive {
      background: linear-gradient(90deg, #7595ff, #618aff);
    }
  }
}
</style>
