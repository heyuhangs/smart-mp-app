<template>
  <view class="notice-info">
    <view class="notice-info__main">
      <view class="notice-info__title">{{ obj.mainTitle }}</view>
      <view class="notice-info__msg">
        <view>{{ obj.createTime }}</view>
      </view>
      <view class="notice-info__content">
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
  .notice-info {
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
    }

    &__msg {
      color: #879098;
      font-size: 22rpx;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      view {
        margin: 0 5rpx;
      }
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
