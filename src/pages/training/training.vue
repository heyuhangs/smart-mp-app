<template>
  <view class="training">
    <view class="training__content">
      <view class="training__list">
        <view v-for="(item, index) in 4" class="training__list-item" @click="toInfo(item)">
          <image class="training__img" src="https://tse4-mm.cn.bing.net/th/id/OIP-C.cRT6RCVvwHTayfPtBx1GOAHaE8?w=266&h=180&c=7&r=0&o=5&dpr=2&pid=1.7"
            lazy-load="true" />
          <view class="training__c" :class="index%2===0 ? 'training__c__left' : 'training__c__right'">
            <span>算力中心实验室</span>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
  function toInfo(item) {
    console.log(item)
    uni.navigateTo({url: '/pages/training/info'})
  }
</script>

<style lang="scss" scoped>
  .training {
    &__content {
      background-color: #f2f4f5;
      top: 80rpx;
      left: 0;
      right: 0;
      bottom: 0;
      position: fixed;
      overflow-y: scroll;
      overflow-x: hidden;
      padding-bottom: 100rpx;
    }

    &__list {
      display: flex;
      align-items: center;
      flex-direction: column;
      overflow-y: scroll;
      height: 100%;

      ::-webkit-scrollbar {
        width: 0;
        height: 0;
        background-color: transparent;
      }
    }

    &__list-item {
      position: relative;
      width: 700rpx;
      height: 300rpx;
      margin-top: 25rpx;
    }

    &__img {
      border-radius: 13rpx;
      width: 700rpx;
      height: 300rpx;
    }

    &__c {
      box-sizing: border-box;
      border-top-left-radius: 13rpx;
      border-bottom-left-radius: 13rpx;
      position: absolute;
      top: 0;
      background-image: url('../../../static/home/ju_bg.png');
      width: 500rpx;
      height: 300rpx;
      background-size: cover;
      background-repeat: no-repeat;
      display: flex;
      align-items: center;
      padding-left: 30rpx;
      font-size: 36rpx;
      font-weight: 400;
      color: #ffffff;

      &__left {
        left: 0;
      }

      &__right {
        right: 0;
        transform: rotateY(180deg);

        span {
          transform: rotateY(180deg);
        }
      }
    }
  }
</style>
