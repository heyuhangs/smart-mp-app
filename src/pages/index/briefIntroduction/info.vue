<template>
  <view class="briefIntroduction-info">
    <view class="briefIntroduction-info__main">
      <view class="briefIntroduction-info__title">{{ obj.mainTitle }}</view>
      <image class="briefIntroduction-info__img" :src="`${env.imgUrl}${obj.resourceUrl}`" />
      <view class="briefIntroduction-info__content">
        {{ obj.content }}
      </view>
    </view>
  </view>
</template>

<script setup>
	import {ref, onMounted} from 'vue'
	import {elegantInfo} from '@/service/home'
	import env from '@/host'
	import {onLoad} from "@dcloudio/uni-app";
	const obj = ref({})
	let doorCustomId = null;
	onLoad((option) => {
		doorCustomId=option.doorCustomId
	});
	onMounted(()=>{
		init()
	})
	
	async function init() {
		const {code, data} = await elegantInfo({doorCustomId: doorCustomId})
			
		if (code === 200 && data) {
			obj.value = data
		}
	}
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
      min-height: calc(100vh - 42rpx);
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
