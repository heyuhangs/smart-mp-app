<template>
  <view class="course">
    <view class="title">
      <view class="title__left">
        <view class="title__mark"></view>
        <text class="title__text">课程介绍</text>
      </view>
      <view class="title__right" @click="toCourse()">
        <text class="title__arrow-text">查看更多</text>
        <image class="title__arrow-icon" src="@/static/basic/back.png" />
      </view>
    </view>

    <view class="course__list">
      <view v-for="item in list" class="course__list-item" @click="toInfo(item)">
        <image
          class="course__list-img"
          :src="
            item.courseCover && item.courseCover.indexOf(`${env.imgUrl}`) === -1
              ? `${env.imgUrl}${item.courseCover}`
              : `${item.courseCover}`
          "
          lazy-load="true" />
        <view class="course__list-info">
          <text class="course__list-title">{{ item.courseName }}</text>
          <text class="course__list-desc" >{{ item.courseDesc }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

import { courseList } from '@/service/home'
import env from '@/host'

const list = ref([])
async function init() {
  const { code, rows } = await courseList()

  if (code === 200 && rows) {
    list.value = rows.slice(0, 2)
  }
}
init()

function toCourse() {
  uni.navigateTo({
    url: '/packages/course/course'
  })
}

function toInfo(item) {
  uni.navigateTo({
    url: '/packages/course/info?id=' + item.id
  })
}
</script>

<style lang="scss" scoped>
.course {
  background-color: #fff;
  border-radius: 15rpx;
  overflow: hidden;
  padding-bottom: 68rpx;

  &__list {
    box-sizing: border-box;
    margin-top: 32rpx;
    padding: 0 38rpx;
  }

  &__list-item {
    margin-top: 42rpx;
    display: flex;
    align-items: center;
    flex-direction: row;
    align-items: flex-start;
  }

  &__list-img {
    width: 140rpx;
    min-width: 140rpx;
    height: 140rpx;
    margin-right: 28rpx;
    background-color: #f2f2f2;
    border-radius: 13rpx;
  }

  &__list-info {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__list-title {
    width: 535rpx;
    font-size: 31rpx;
    font-weight: bold;
    color: #2c2c2c;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 10rpx;
    word-wrap: break-word;
    text-overflow: ellipsis;
  }

  &__list-desc {
    width: 535rpx;
    font-size: 24rpx;
    font-weight: 400;
    color: #999999;
    line-height: 34rpx;
    margin-top: 10rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
