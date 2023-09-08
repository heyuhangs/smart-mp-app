<template>
  <view class="home">
    <!-- <HeaderBar
      :title="'首页'"
      :headerStyle="{
        backgroundColor: 'rgba(0,0,0,0)'
      }" /> -->

    <div class="home__content">
      <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
        <image class="home__bg" src="@/static/home/home_banner.png" />

        <BriefIntroduction />

        <Notice />

        <Course />
      </scroll-view>
    </div>
  </view>
</template>

<script setup>
import HeaderBar from '@/components/HeaderBar.vue'
import BriefIntroduction from './components/BriefIntroduction.vue'
import Notice from './components/Notice.vue'
import Course from './components/Course.vue'
</script>

<style lang="scss">
.home {
  width: 750rpx;
  background-color: #f2f4f5;

  &__bg {
    width: 100%;
    height: 530rpx;
  }

  &__content {
    background-color: #f2f4f5;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-bottom: 32rpx;
  }
}

.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80rpx;
  padding: 0 26rpx;

  &__left,
  &__right {
    display: flex;
    align-items: center;
    flex-direction: row;
  }

  &__mark {
    width: 10rpx;
    height: 22rpx;
    background: #4574e0;
    border-radius: 5rpx;
    margin-right: 12rpx;
  }

  &__text {
    font-size: 31rpx;
    font-weight: bold;
    color: #000000;
  }

  &__arrow-text {
    width: 100rpx;
    font-size: 23rpx;
    font-weight: 400;
    color: #888;
    padding-right: 16rpx;
  }

  &__arrow-icon {
    width: 11rpx;
    height: 21rpx;
  }
}
</style>
