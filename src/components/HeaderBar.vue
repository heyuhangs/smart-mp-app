<template>
  <view class="header-bar" v-if="props.show">
    <view class="header-bar__block" :style="height"></view>
    <view class="header-bar__fixed" :style="headerComputedStyle">
      <view class="header-bar__nav" :style="headerBarStyle">
        <slot name="headerBar">
          <view class="header-bar__content" :style="headerBarContentStyle">
            <!-- 返回按钮 -->
            <!-- <view v-if="props.isShowBack" class="header-bar__back" @click="back">
              <image class="header-bar__img" :src="backImageUrl" />
            </view> -->

            <slot name="headerTitle">
              <view class="header-bar__center">
                <text :style="headerBarTitleStyle" class="header-bar__title">{{ props.title }}</text>
              </view>
            </slot>
          </view>
        </slot>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
/**
 * @component 自定义导航栏
 * @description 自定义导航栏组件
 * @props show 是否展示当前组件
 * @props disableBackDefaultBehavior 是否禁点击自动返回
 * @props isShowBack 是否显示返回按钮
 * @props title 标题
 * @props titleStyle 标题样式
 * @props isCompatibleMenubarArea 是否兼容胶囊宽度
 * @props clearCount 需要杀死的页面数量
 */

import { reactive, computed, ref } from 'vue'

import { getSafeAreaInsertInfo } from '../utils/index'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  pageCode: {
    type: String,
    default: ''
  },
  show: {
    type: Boolean,
    default: true
  },
  headerStyle: {
    type: Object,
    default: () => {}
  },
  // backImageUrl: {
  //   type: String,
  //   default: `${imageServerURl}/wx-header-back-new.png`
  // },
  // menuImage: {
  //   type: String,
  //   default: `${imageServerURl}/wx-header-menu.png`
  // },
  titleStyle: {
    type: Object,
    default: () => {}
  },
  disableBackDefaultBehavior: {
    type: Boolean,
    default: false
  },
  isShowBack: {
    type: Boolean,
    default: true
  },
  isCompatibleMenubarArea: {
    type: Boolean,
    default: false
  },
  clearCount: {
    type: Number,
    default: 1
  },
  isToHome: {
    type: Boolean,
    default: false
  },
  isHideMenu: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['back'])

const safeAreaInsertState = reactive({
  navHeight: 0,
  navigationBarHeight: 0,
  customHeight: 0,
  menubarLeft: 0,
  statusBarHeight: 0,
  menubarRight: 0
})

const init = () => {
  /* 获取设备信息 */
  const safeAreaInsertInfo = getSafeAreaInsertInfo()
  /* 通用平台 */
  safeAreaInsertState.statusBarHeight = safeAreaInsertInfo.statusBarHeight //状态栏高度

  /* 微信小程序平台 */
  // #ifdef MP-WEIXIN
  safeAreaInsertState.navHeight = safeAreaInsertInfo.navHeight
  safeAreaInsertState.navigationBarHeight = safeAreaInsertInfo.navHeight //头部导航栏高度
  safeAreaInsertState.customHeight = safeAreaInsertInfo.menuButtonHeight //胶囊高度
  safeAreaInsertState.menubarLeft = safeAreaInsertInfo.menuButtonLeft //胶囊左边界距离左上角的距离
  safeAreaInsertState.menubarRight = safeAreaInsertInfo.menuButtonWidth
  // #endif
}

init()

const height = computed(() => {
  return {
    height: `${safeAreaInsertState.navHeight}rpx`
  }
})

const headerComputedStyle = computed(() => {
  return {
    ...props.headerStyle,
    height: `${safeAreaInsertState.navHeight}rpx`
  }
})

const headerBarStyle = computed(() => {
  const paddingRight = props.isCompatibleMenubarArea ? `${safeAreaInsertState.menubarRight}rpx` : '0rpx'

  return {
    height: `${safeAreaInsertState.navigationBarHeight}rpx`,
    top: `${safeAreaInsertState.statusBarHeight}rpx`,
    paddingRight
  }
})

const headerBarContentStyle = computed(() => {
  return {
    height: `${safeAreaInsertState.customHeight}rpx`,
    lineHeight: `${safeAreaInsertState.customHeight}rpx`
  }
})

const headerBarTitleStyle = computed(() => {
  return {
    ...props.titleStyle
  }
})

// const onBackOff = ref(false)

// const back = () => {
//   if (onBackOff.value) return

//   // 狂点限制逻辑
//   onBackOff.value = true

//   emit('back')

//   setTimeout(() => {
//     onBackOff.value = false
//   }, 1500)

//   if (props.disableBackDefaultBehavior) return

//   uni.navigateBack({
//     delta: props.clearCount
//   })
// }
</script>

<style lang="scss" scoped>
.header-bar {
  &__fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
  }

  &__nav {
    box-sizing: border-box;
    width: 100%;
    position: relative;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__center {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__content {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    // padding-left: 32rpx;
  }

  &__back {
    box-sizing: border-box;
    width: 50rpx;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: left;
  }

  &__menu {
    position: relative;
    box-sizing: border-box;
    width: 50rpx;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: left;

    &-content {
      position: absolute;
      bottom: -440rpx;
      left: -48rpx;
    }

    &-dot {
      border-radius: 50%;
      background-color: #ec6056;
      position: absolute;
      top: 8rpx;
      right: -4rpx;
      width: 12rpx;
      height: 12rpx;
    }
  }

  &__back + &__menu {
    margin-left: 12rpx;
  }

  &__title {
    box-sizing: border-box;
    height: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 30rpx;
    font-weight: 500;
    color: #fff;
  }

  &__back + &__title,
  &__menu + &__title {
    margin-left: 30rpx;
  }

  &__img {
    width: 48rpx;
    height: 48rpx;
  }
}
</style>
