<template>
  <view class="notice">
    <image class="notice__icon" src="@/static/home/notice_icon.png" @click="toNotice()" />

    <swiper class="notice__swiper" :circular="true" vertical="true" :autoplay="true" :interval="50000" :duration="1000">
      <swiper-item style="display: table" @touchmove.stop="stopTouchMove" v-for="(item, index) in 5" :key="index">
        <view class="notice__item">
          <view class="notice__item-left">
            <text class="notice__item-title">机器人啊时间快到家啊深刻的教科书</text>
            <text class="notice__item-time">2019-21-32</text>
          </view>
          <image class="notice__arrow-icon" src="@/static/basic/back.png" />
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script setup>
  function toNotice() {
    uni.navigateTo({url: '/pages/index/notice/notice'})
  }
</script>

<style lang="scss" scoped>
.notice {
  display: flex;
  align-items: center;
  flex-direction: row;
  background-color: #fff;
  padding: 0 25rpx;
  margin: 26rpx 0;
  border-radius: 15rpx;

  &__swiper {
    flex: 1;
    height: 98rpx;
  }

  &__icon {
    width: 78rpx;
    height: 67rpx;
    margin-right: 14rpx;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 98rpx;
  }

  &__item-left {
    height: 98rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__item-title {
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 23rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #000000;
  }

  &__item-time {
    padding-top: 4rpx;
    font-size: 23rpx;
    font-weight: 400;
    color: #a6a7a9;
  }

  &__arrow-icon {
    width: 12rpx;
    height: 21rpx;
  }
}
</style>
