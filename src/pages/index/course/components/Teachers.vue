<template>
  <view class="teacher-list">
    <view v-for="item in 4" class="teacher-list__item">
      <image class="teacher-list__img" src="https://tse4-mm.cn.bing.net/th/id/OIP-C.cRT6RCVvwHTayfPtBx1GOAHaE8?w=266&h=180&c=7&r=0&o=5&dpr=2&pid=1.7" />
      <view class="teacher-list__info">
        <text class="teacher-list__title">范敬巍	（智能制造技术学院）</text>
        <text class="teacher-list__desc">
          江汉大学人工智能学院副教授，主要研究方向为数字化
          技术....</text>
      </view>
    </view>
  </view>
</template>

<script setup>
	import {ref, defineProps, toRefs, onMounted} from 'vue'
	const props = defineProps({
		obj: Object,
		required: true,
		default: {}
	});
	const obj = ref({})
	onMounted(() => {
	  obj.value = props.obj
	});
</script>

<style lang="scss" scoped>
  .teacher-list {
    background-color: #fff;
    box-sizing: border-box;
    margin-top: 32rpx;
    padding: 0 38rpx;

    &__item {
      margin-top: 42rpx;
      display: flex;
      align-items: flex-start;
      flex-direction: row;
    }

    &__img {
      width: 140rpx;
      height: 140rpx;
      border-radius: 50% 50%;
      margin-right: 28rpx;
    }

    &__info {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    &__title {
      font-size: 31rpx;
      font-weight: bold;
      color: #2c2c2c;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__desc {
      font-size: 23rpx;
      font-weight: 400;
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
