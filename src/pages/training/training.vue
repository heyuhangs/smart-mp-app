<template>
  <view class="training">
    <view v-show="isShow" class="training__content">
	  <image class="none" v-if="list.length === 0" src="@/static/training/none.png"></image>
      <view v-else class="training__list">
        <view v-for="(item, index) in list" class="training__list-item" @click="toInfo(item)">
			<image class="training__img"
			:src="(item.resourceUrl && item.resourceUrl.indexOf(`${env.imgUrl}`) === -1) ? `${env.imgUrl}${item.resourceUrl}` : `${item.resourceUrl}`" 
			lazy-load="true" />
          <view class="training__c" :class="index%2===0 ? 'training__c__left' : 'training__c__right'">
            <span>{{ item.mainTitle }}</span>
          </view>
        </view>
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
	function toBriefIntroduction() {
	  uni.navigateTo({ url: '/packages/other/briefIntroduction/briefIntroduction' })
	}
	
	async function init() {
	  uni.showLoading({title: ''});
	  const { code, data } = await elegantList({doorCustomType: 2})
	  if (code === 200 && data) {
	    list.value = data
		isShow.value = true
		uni.hideLoading();
	  }
	}
	
	init()
	
  function toInfo(item) {
    uni.navigateTo({url: '/pages/training/info?trainId=' + item.trainId})
  }
</script>

<style lang="scss" scoped>
  .training {
    &__content {
      background-color: #f2f4f5;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      position: fixed;
      overflow-y: scroll;
      overflow-x: hidden;
    }

    &__list {
      display: flex;
      align-items: center;
      flex-direction: column;
      overflow-y: scroll;
	  box-sizing: border-box;
	  background-color: #ffffff;
      height: 100%;
      min-height: calc(100vh - 42rpx);
	  padding-bottom: 50rpx;
	  
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
			background-color: #f2f2f2;
    }

    &__c {
      box-sizing: border-box;
      border-top-left-radius: 13rpx;
      border-bottom-left-radius: 13rpx;
      position: absolute;
      top: 0;
      background-image: url('../../static/home/ju_bg.png');
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
