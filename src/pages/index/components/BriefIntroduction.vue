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
        <image class="brief-introduction__img" :src="`${env.imgUrl}${item.resourceUrl}`" lazy-load="true" />

        <view class="brief-introduction__c">{{ item.content }}</view>
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
  uni.navigateTo({ url: '/pages/index/briefIntroduction/briefIntroduction' })
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
		url: '/pages/index/briefIntroduction/info?doorCustomId=' + item.doorCustomId
	})
}
</script>

<style lang="scss" scoped>
.brief-introduction {
  position: relative;
  z-index: 2;
  padding-left: 26rpx;
  border-radius: 15rpx;
  margin-top: -20rpx;
  background-color: #fff;
  padding-bottom: 38rpx;

  &__list {
    display: flex;
    align-items: center;
    flex-direction: row;
    overflow-y: scroll;
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
    border-radius: 13rpx;
    width: 438rpx;
    height: 200rpx;
  }

  &__c {
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    background-image: url('../../../static/home/ju_bg.png');
    width: 304rpx;
    height: 196rpx;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    padding-left: 18.5rpx;
    font-size: 24rpx;
    font-weight: 400;
    color: #ffffff;
  }
}
</style>
