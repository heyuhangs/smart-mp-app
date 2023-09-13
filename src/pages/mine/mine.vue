<template>
  <view class="mine">
    <view class="mine__top">
      <image class="mine__top__bg" src="@/static/mine/bg.png" />
      <view class="mine__top__user">
        <image class="mine__top__img" :src="`${env.imgUrl}${obj.txUrl}`"
          lazy-load="true" />
        <view>
          <view class="mine__top__name">{{obj.nickName}}(缺专业字段)</view>
          <view class="mine__top__address">缺学院字段还有左边头像 </view>
        </view>
      </view>
    </view>
    <view class="mine__menu">

      <view class="mine__menu__item" @click="toCurriculum()">
        <view class="mine__menu__left">
          <image class="mine__menu__icon" src="@/static/mine/curriculum.png" />
          <view class="mine__menu__name">课程课表</view>
        </view>
        <image class="mine__menu__back" src="@/static/basic/back.png" />
      </view>

      <view class="mine__menu__item" @click="toBiographicalNotesList()">
        <view class="mine__menu__left">
          <image class="mine__menu__icon" src="@/static/mine/biographicalNotes.png" />
          <view class="mine__menu__name">个人简历</view>
        </view>
        <image class="mine__menu__back" src="@/static/basic/back.png" />
      </view>

    </view>
  </view>
</template>

<script setup>
	import { ref } from 'vue'
	import { getUser } from '@/store/token'
	import env from '@/host'
	
	const obj = ref(getUser())

  function toBiographicalNotesList() {
    uni.navigateTo({url: '/pages/mine/biographicalNotesList'})
  }
  function toCurriculum() {
    uni.navigateTo({url: '/pages/mine/curriculum'})
  }
</script>

<style lang="scss" scoped>
  .mine {
    background-color: #f2f4f5;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    overflow-y: scroll;
    overflow-x: hidden;

    &__top {
      position: relative;
      &__bg {
        width: 100%;
      }

      &__user{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        position: absolute;
        bottom: 50rpx;
        margin-left: 32rpx;
      }

      &__img {
        border-radius: 50% 50%;
        width: 178rpx;
        height: 178rpx;
      }

      &__name {
        color: #ffffff;
        font-size: 36rpx;
        margin-left: 42rpx;
      }

      &__address {
        color: #ffffff;
        font-size: 24rpx;
        margin-top: 31rpx;
        margin-left: 42rpx;
      }
    }

    &__menu {
      background-color: #ffffff;
      margin-top: 42rpx;

      &__item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 30rpx;
        padding: 40rpx 0;
        border-bottom: 1rpx solid #F2F2F2;
      }

      &__left {
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }

      &__icon {
        width: 50rpx;
        height: 51rpx;
        margin-right: 20rpx;
      }

      &__name {
        color: #000000;
        font-size: 30rpx;
      }

      &__back {
        width: 17rpx;
        height: 30rpx;
      }
    }
  }
</style>
