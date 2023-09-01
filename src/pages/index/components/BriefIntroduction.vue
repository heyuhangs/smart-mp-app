<template>
  <view class="brief-introduction">
    <view class="title">
      <view class="title__left">
        <view class="title__mark"></view>
        <text class="title__text">基地简介</text>
      </view>
      <view class="title__right">
        <text class="title__arrow-text">查看更多</text>
        <image class="title__arrow-icon" src="@/static/basic/back.png" />
      </view>
    </view>

    <view class="brief-introduction__list">
      <view v-for="item in 4" class="brief-introduction__list-item">
        <image
          class="brief-introduction__img"
          src="https://tse4-mm.cn.bing.net/th/id/OIP-C.cRT6RCVvwHTayfPtBx1GOAHaE8?w=266&h=180&c=7&r=0&o=5&dpr=2&pid=1.7"
          lazy-load="true" />

        <view class="brief-introduction__c">算力中心实验室</view>
      </view>
    </view>
  </view>
</template>

<script setup></script>

<style lang="scss">
.brief-introduction {
  position: relative;
  z-index: 2;
  padding-left: 26rpx;
  border-radius: 15rpx;
  margin-top: -20rpx;
  background-color: #fff;
  padding-bottom: 38rpx;

  &__list {
    display: flex;
    align-items: center;
    flex-direction: row;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
      background-color: transparent;
    }
  }

  &__list-item {
    position: relative;
    width: 438rpx;
    height: 200rpx;
    margin-right: 23rpx;
  }

  &__img {
    border-radius: 13rpx;
    width: 438rpx;
    height: 200rpx;
  }

  &__c {
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    background-image: url('../../../static/home/ju_bg.png');
    width: 304rpx;
    height: 196rpx;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    padding-left: 18.5rpx;
    font-size: 24rpx;
    font-weight: 400;
    color: #ffffff;
  }
}
</style>
