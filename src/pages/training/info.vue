<template>
  <view class="training-info">
    <image class="training-info__img" src="https://tse4-mm.cn.bing.net/th/id/OIP-C.cRT6RCVvwHTayfPtBx1GOAHaE8?w=266&h=180&c=7&r=0&o=5&dpr=2&pid=1.7"
      lazy-load="true" />
    <view class="training-info__title">产研融合实训室</view>

    <view class="training-info__content">
      <!--tab-->
      <scroll-view class="scroll-view" scroll-x="true" @scroll="scroll">
        <view class="scroll-view-item" v-for="(tab,index) in tabBars" :key="index" :class="navIndex==index ? 'activite' : ''"
          @tap="checkIndex(index)">
          {{tab}}
        </view>
      </scroll-view>
      <!-- 内容 -->
      <swiper :current="navIndex" @change="tabChange" class="tab_content" :style="{ height: swiperHeight + 'px' }">
        <swiper-item class="swiper_item">
          <Introduce class="etmHights"></Introduce>
        </swiper-item>
        <swiper-item class="swiper_item">
          <Information class="etmHights"></Information>
        </swiper-item>
      </swiper>

    </view>
  </view>
</template>

<script setup>
  import {
    ref,
    getCurrentInstance,
    onMounted
  } from 'vue'
  import Introduce from './components/Introduce.vue'
  import Information from './components/Information.vue'
  var tabBars = ref([
    '实训室介绍',
    '实训室信息'
  ])
  var navIndex = ref(0)
  var scrollTop = ref(0)
  const instance = getCurrentInstance() // 动态设置高度
  const swiperHeight = ref(0) // 窗口高度
  const windowHeight = ref() // 获取元素高度

  function getItemHeight() {
    let query = uni.createSelectorQuery().in(instance);
    query.select(".etmHights").boundingClientRect(data => {
      // 如果 窗口高度 - （顶部距离 + 底部距离 ）小于 100 则 元素本身高度 + 100
      if (windowHeight.value - (data.top + data.bottom) < 100) {
        swiperHeight.value = data.height + 100
      } // 如果 窗口高度 - （顶部距离 + 底部距离 ）大于 100 则 元素本身高度 加 剩余高度
      if (windowHeight.value - (data.top + data.bottom) > 100) {
        swiperHeight.value = data.height + (windowHeight.value - (data.top + data.bottom))
      }
    }).exec();
  }
  onMounted(async () => {
    uni.getSystemInfo({
      success(res) {
        //console.log('可使用窗口高度',res.windowHeight);
        windowHeight.value = res.windowHeight
      }
    })
    setTimeout(() => {
      getItemHeight()
    }, 800);
  })
  const tabChange = (e) => {
    navIndex.value = e.detail.current
    getItemHeight()
  }


  function checkIndex(index) {
    navIndex.value = index
  }

  function scroll(e) {
    this.old.scrollTop = e.detail.scrollTop
  }
</script>

<style lang="scss">
  .training-info {
    background-color: #f2f4f5;
    top: 80rpx;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    overflow-y: scroll;
    overflow-x: hidden;

    &__img {
      width: 100%;
      height: 400rpx;
    }

    &__title {
      background-color: #ffffff;
      color: #13161A;
      font-weight: bold;
      font-size: 30rpx;
      padding: 40rpx 30rpx;
    }

    &__content {
      margin-top: 20rpx;
      background-color: #ffffff;

      .scroll-view {
        white-space: nowrap;
        width: 100%;
        color: #879098;
      }

      .scroll-view-item {
        display: inline-block;
        width: 24%;
        margin: 0 13%;
        text-align: center;
        line-height: 90rpx;
        font-size: 32rpx;
      }

      .activite {
        color: #13161A;
        border-bottom: 5rpx solid #4574E0;
      }

      .tab_content {
        color: #13161A;
        min-height: calc(100vh - 730rpx);
      }
    }
  }
</style>
