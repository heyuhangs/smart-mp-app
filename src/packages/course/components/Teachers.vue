<template>
  <view class="teacher-list">
    <view v-for="item in list" class="teacher-list__item">
	  <image
	  class="teacher-list__img"
	  :src="(item.avatar && item.avatar.indexOf(`${env.imgUrl}`) === -1) ? `${env.imgUrl}${item.avatar}` : `${item.avatar}`" 
	  lazy-load="true"
	  />
      <view class="teacher-list__info">
        <text class="teacher-list__title">{{item.name}}	（{{item.schoolName}}）</text>
        <text class="teacher-list__desc">{{ item.intro }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
	import {ref, defineProps, toRefs, onMounted} from 'vue'
	import {introList} from '@/service/home'
	import env from '@/host'
	const props = defineProps({
		obj: Object,
		required: true,
		default: {}
	});
	const obj = ref({})
	const list = ref([])
	onMounted(() => {
	  obj.value = props.obj
	  init(obj.value.id)
	});
	async function init(courseId) {
	  const { code, rows } = await introList({courseId: courseId})
	
	  if (code === 200 && rows) {
		list.value = rows
	  }
	}
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
	  background-color: #f2f2f2;
    }

    &__info {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    &__title {
      font-size: 31rpx;
      font-weight: bold;
      margin-top: 10rpx;
      color: #2c2c2c;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &__desc {
      font-size: 24rpx;
      font-weight: 400;
      line-height: 35rpx;
      margin-top: 10rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #999999;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
</style>
