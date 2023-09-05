<template>
  <view class="course">
    <view class="course__list">
      <view v-for="item in 10" class="course__list-item" @click="toInfo()">
        <image class="course__list-img" src="https://tse1-mm.cn.bing.net/th/id/OIP-C.IrIqGdXe5UmEmWJEfllakwHaFj?w=269&h=201&c=7&r=0&o=5&dpr=2&pid=1.7" />
        <view class="course__list-info">
          <text class="course__list-title">工业机器人应用编程</text>
          <text class="course__list-desc">
            2本课程旨在引领学生了解安全用电，善用电工仪表及工具，实现电工的基本作业，作...</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
  function toInfo() {
    uni.navigateTo({
      url: '/pages/index/course/info'
    })
  }
</script>

<style lang="scss" scoped>
  .course {
    background-color: #f2f4f5;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    overflow-y: scroll;
    overflow-x: hidden;

    &__list {
      box-sizing: border-box;
      margin-top: 42rpx;
      padding: 5rpx 38rpx 38rpx 38rpx;
      background-color: #ffffff;
      border-radius: 20rpx;
      min-height: calc(100vh - 122rpx);
    }

    &__list-item {
      margin-top: 42rpx;
      display: flex;
      align-items: center;
      flex-direction: row;
    }

    &__list-img {
      width: 140rpx;
      height: 140rpx;
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
      color: #2c2c2c;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__list-desc {
      font-size: 23rpx;
      font-weight: 400;
      color: #999999;
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
