<template>
  <view v-show="isShow" class="notice">
    <image class="none" v-if="list.length === 0" src="@/static/training/none.png"></image>
    <view v-else class="notice__list">
      <view v-for="(item, index) in list" :key="index" class="notice__list__item" @click="toInfo(item)">
        <view class="notice__list__content">
          <view class="notice__list__title">{{ item.mainTitle }}</view>
          <text class="notice__list__time">{{ item.createTime }}</text>
        </view>
        <image class="notice__list__icon" src="@/static/basic/back.png" />
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

import { elegantList } from '@/service/home'
import env from '@/host'

const list = ref([])
const isShow = ref(false)
async function init() {
  uni.showLoading({
    title: ''
  })
  const { code, data } = await elegantList({
    doorCustomType: 5
  })
  if (code === 200 && data) {
    list.value = data
    isShow.value = true
    uni.hideLoading()
  }
}
init()

function toInfo(item) {
  uni.navigateTo({
    url: '/packages/other/notice/info?doorCustomId=' + item.doorCustomId
  })
}
</script>

<style lang="scss" scoped>
.notice {
  background-color: #f2f4f5;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  overflow-y: scroll;
  overflow-x: hidden;

  &__list {
    background-color: #fff;
    padding: 0 25rpx;
    margin-top: 42rpx;
    border-radius: 15rpx;
    min-height: calc(100vh - 42rpx);

    &__item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1rpx solid #f2f2f2;
      padding: 15rpx 0;
    }

    &__content {
      height: 98rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__title {
      font-size: 32rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #222;
      width: 650rpx;
      max-width: 650rpx;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis
    }

    &__time {
      padding-top: 14rpx;
      font-size: 27rpx;
      font-weight: 400;
      color: #a6a7a9;
    }

    &__icon {
      width: 13rpx;
      height: 23rpx;
    }
  }
}
</style>
