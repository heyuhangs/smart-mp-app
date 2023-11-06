<template>
  <view v-if="showPage" class="course">
    <image class="none" v-if="list.length === 0" src="@/static/training/none.png"></image>
    <view v-else class="course__list">
      <scroll-view
        scroll-y="true"
        :show-scrollbar="false"
        :refresher-enabled="scrollViewOptions.refresherEnabled"
        :refresher-triggered="scrollViewOptions.isRefresh"
        class="course__list__scroll"
        @refresherrefresh="onRefresh"
        @scrolltolower="onLoadMore">
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
      </scroll-view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

import { courseList } from '@/service/home'
import env from '@/host'

const list = ref([])
const pageNum = ref(1)
const pageSize = ref(10)
const pageTotal = ref(0)
const showPage = ref(false)
const scrollViewOptions = ref({
  refresherEnabled: true,
  isRefresh: false
})
async function init() {
  const { code, rows, total } = await courseList({ pageNum: pageNum.value, pageSize: pageSize.value })
  if (code === 200 && rows) {
    list.value = pageNum.value === 1 ? rows : list.value.concat(rows)
    pageTotal.value = Math.ceil(total / pageSize.value)
    uni.hideLoading()
  }
}

async function onRefresh() {
  scrollViewOptions.value.isRefresh = true
  await refreshTalkList()
  setTimeout(() => {
    scrollViewOptions.value.isRefresh = false
  }, 500)
}

async function onLoadMore() {
  if (pageNum.value === pageTotal.value) {
    return
  } else {
    pageNum.value = pageNum.value + 1
  }
  await init()
}

function refreshTalkList() {
  pageNum.value = 1
  init()
}

function toInfo(item) {
  uni.navigateTo({
    url: '/packages/course/info?id=' + item.id
  })
}

uni.showLoading()
init().finally(() => {
  showPage.value = true
})
</script>

<style lang="scss" scoped>
.course {
  background-color: #f2f4f5;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &__list {
    box-sizing: border-box;
    padding: 5rpx 0 38rpx 0;
    background-color: #ffffff;
    border-radius: 20rpx;
    min-height: calc(100vh - 42rpx);

    &__scroll {
      box-sizing: border-box;
      display: flex;
      flex: 1;
      overflow: auto;
      height: 100%;
    }
  }

  &__list-item {
    margin-top: 42rpx;
    display: flex;
    align-items: center;
    flex-direction: row;
    align-items: flex-start;
    padding: 0 38rpx;
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
    align-items: start;
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
