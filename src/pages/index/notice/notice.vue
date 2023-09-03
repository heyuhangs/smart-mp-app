<template>
	<view class="notice">
		<view class="notice__list">
      <view v-for="(item, index) in 12" :key="index" class="notice__list__item" @click="toInfo(item)">
        <view class="notice__list__content">
          <text class="notice__list__title">机器人啊时间快到家啊深刻的教科书</text>
          <text class="notice__list__time">2019-21-32</text>
        </view>
        <image class="notice__list__icon" src="@/static/basic/back.png" />
      </view>
    </view>
	</view>
</template>

<script setup>
  function toInfo(item) {
    uni.navigateTo({url: '/pages/index/notice/info'})
  }
</script>

<style lang="scss" scoped>
.notice {
  background-color: #f2f4f5;
  top: 80rpx;
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
  min-height: calc(100vh - 122rpx);

    &__item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1rpx solid #F2F2F2;
      padding: 15rpx 0;
    }

    &__content {
      height: 98rpx;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__title {
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 25rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #000000;
    }

    &__time {
      padding-top: 10rpx;
      font-size: 23rpx;
      font-weight: 400;
      color: #a6a7a9;
    }

    &__icon {
      width: 12rpx;
      height: 21rpx;
    }
  }
}
</style>
