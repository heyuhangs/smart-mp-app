<template>
  <view v-if="list && list.length" class="brief-introduction">
    <view class="title">
      <view class="title__left">
        <view class="title__mark"></view>
        <text class="title__text">基地简介</text>
      </view>
      <view class="title__right" @click="toBriefIntroduction()">
        <text class="title__arrow-text">查看更多</text>
        <image class="title__arrow-icon" src="@/static/basic/back.png" />
      </view>
    </view>

    <view class="brief-introduction__list">
      <view v-for="(item, index) in list" :key="index" class="brief-introduction__list-item" @click="toInfo(item)">
        <image class="brief-introduction__img" 
		:src="(item.resourceUrl && item.resourceUrl.indexOf(`${env.imgUrl}`) === -1) ? `${env.imgUrl}${item.resourceUrl}` : `${item.resourceUrl}`" 
		lazy-load="true" />

        <view class="brief-introduction__c" v-html="item.content" />
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

import { elegantList } from '@/service/home'
import env from '@/host'

const list = ref([])

function toBriefIntroduction() {
  uni.navigateTo({ url: '/packages/other/briefIntroduction/briefIntroduction' })
}

async function init() {
  const { code, data } = await elegantList({doorCustomType: 2})

  if (code === 200 && data) {
    list.value = data
  }
}

init()

function toInfo(item) {
	uni.navigateTo({
		url: '/packages/other/briefIntroduction/info?doorCustomId=' + item.doorCustomId
	})
}
</script>

<style lang="scss" scoped>
.brief-introduction {
  position: relative;
  z-index: 2;
  border-radius: 15rpx;
  margin-top: -20rpx;
  background-color: #fff;
  padding-bottom: 38rpx;

  &__list {
    display: flex;
	  padding-left: 26rpx;
    align-items: center;
    flex-direction: row;
    overflow-y: hidden;
    overflow-x: scroll;
    
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
      background-color: transparent;
    }
  }

  &__list-item {
    position: relative;
    width: 438rpx;
    height: 200rpx;
    margin-right: 23rpx;
  }

  &__img {
    width: 438rpx;
    height: 200rpx;
	  background-color: #f2f2f2;
	  border-radius: 13rpx;
  }

  &__c {
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    background-image: url('../../../static/home/ju_bg.png');
    width: 304rpx;
    height: 200rpx;
    background-size: cover;
    background-repeat: no-repeat;
	border-top-left-radius: 10rpx;
	border-bottom-left-radius: 10rpx;
    display: flex;
    align-items: center;
    padding-left: 18.5rpx;
    font-size: 24rpx;
    font-weight: 400;
    color: #ffffff;
  }
}
</style>
