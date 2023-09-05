<template>
  <view class="briefIntroduction-info">
    <view class="briefIntroduction-info__main">
      <view class="briefIntroduction-info__title">算力中心实验室</view>
      <image class="briefIntroduction-info__img" src="https://tse4-mm.cn.bing.net/th/id/OIP-C.cRT6RCVvwHTayfPtBx1GOAHaE8?w=266&h=180&c=7&r=0&o=5&dpr=2&pid=1.7" />
      <view class="briefIntroduction-info__content">
        算力中心是指专门用于提供高性能计算和处理能力的设施，通常包含大量的计算资源，如服务器、GPU、FPGA等。算力中心的主要任务是为各种计算密集型任务提供强大的计算能力，例如科学计算、数据分析、人工智能训练等。它通常注重计算设备的配置和性能，以提供高效的计算服务。

        数据中心则更侧重于存储、管理和处理大量的数据。它是一个集中管理和维护大规模服务器和存储设备的场所，用于存储和处理各种类型的数据，包括企业数据、用户数据、应用程序数据等。数据中心通常拥有稳定可靠的网络连接和大容量的存储设备，用于保证数据的安全性、可靠性和高速访问。

        总的来说，算力中心和数据中心在功能上有所区别，算力中心注重提供高性能计算能力，而数据中心则注重存储和处理大规模数据。然而，在实际应用中，两者通常是相互关联和互相支持的，因为高性能计算往往需要处理大量的数据，而数据中心也需要强大的计算能力来处理和分析存储的数据。
      </view>
    </view>
  </view>
</template>

<script setup>
</script>

<style lang="scss" scoped>
  .briefIntroduction-info {
    background-color: #f2f4f5;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    overflow-y: scroll;
    overflow-x: hidden;

    &__main {
      background-color: #fff;
      padding: 0 25rpx;
      margin-top: 42rpx;
      border-radius: 15rpx;
      min-height: calc(100vh - 122rpx);
    }

    &__title {
      font-size: 37rpx;
      font-weight: bold;
      padding: 40rpx 0;
      color: #13161A;
      text-align: center;
    }

    &__img {
      width: 100%;
      border-radius: 25rpx;
    }

    &__content {
      color: #13161A;
      margin-top: 40rpx;
      font-size: 26rpx;
      line-height: 50rpx;
      text-indent: 50rpx;
    }
  }
</style>
