<template>
	<view class="briefIntroduction">
    <view class="briefIntroduction__list">
      <view v-for="item in 10" class="briefIntroduction__list-item" @click="toInfo()">
        <view class="briefIntroduction__list-info">
          <text class="briefIntroduction__list-title">算力中心实验室</text>
          <text class="briefIntroduction__list-desc">
            实训中心管理采取图样化，即使用二维或3D效果将中心布局....</text>
        </view>
        <image class="briefIntroduction__list-img" src="https://tse1-mm.cn.bing.net/th/id/OIP-C.IrIqGdXe5UmEmWJEfllakwHaFj?w=269&h=201&c=7&r=0&o=5&dpr=2&pid=1.7" />
      </view>
    </view>
	</view>
</template>

<script setup>
 function toInfo() {
     uni.navigateTo({url: '/pages/index/briefIntroduction/info'})
  }
</script>

<style lang="scss" scoped>
.briefIntroduction {
  background-color: #f2f4f5;
  top: 80rpx;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  overflow-y: scroll;
  overflow-x: hidden;

  &__list {
    box-sizing: border-box;
    margin-top: 42rpx;
    padding: 5rpx 38rpx 0 38rpx;
    background-color: #ffffff;
    border-radius: 20rpx;
    min-height: calc(100vh - 122rpx);
  }

  &__list-item {
    padding: 40rpx 0 45rpx 0;
    display: flex;
    align-items: center;
    flex-direction: row;
    border-bottom: 1rpx solid #F2F2F2;
  }

  &__list-img {
    width: 168rpx;
    height: 112rpx;
    margin-right: 28rpx;
  }

  &__list-info {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__list-title {
    font-size: 31rpx;
    font-weight: bold;
    color: #13161A;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__list-desc {
    font-size: 23rpx;
    font-weight: 400;
    color: #879098;
    line-height: 40rpx;
    margin-top: 16rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
