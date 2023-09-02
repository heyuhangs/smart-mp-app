<template>
	<view class="training-info-information">
    <view class="training-info-information__line">
      <view class="training-info-information__title">
        <view class="training-info-information__icon">
          <image src="@/static/course/college.png"></image>
        </view>
        <view>学院</view>
      </view>
      <view>智能制造技术学院</view>
    </view>

    <view class="training-info-information__line">
      <view class="training-info-information__title">
        <view class="training-info-information__icon">
          <image src="@/static/course/speciality.png"></image>
        </view>
        <view>专业</view>
      </view>
      <view>工业机器人技术</view>
    </view>

    <view class="training-info-information__line">
      <view class="training-info-information__title">
        <view class="training-info-information__icon">
          <image src="@/static/course/period.png"></image>
        </view>
        <view>课时</view>
      </view>
      <view>2023.03.13-2023.05.01(13课时)</view>
    </view>

    <view class="training-info-information__line">
      <view class="training-info-information__title">
        <view class="training-info-information__icon">
          <image src="@/static/course/director.png"></image>
        </view>
        <view>负责人</view>
      </view>
      <view>范振铎</view>
    </view>


	</view>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.training-info-information {
  margin: 20rpx 30rpx;

  &__line{
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #879098;
    line-height: 98rpx;
    border-bottom: 2rpx solid #F2F2F2;
  }

  &__title{
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  &__icon{
    background-color: #F8F9F9;
    border-radius: 50% 50%;
    width: 60rpx;
    height: 60rpx;
    justify-content: center;
    display: flex;
    align-items: center;
    margin-right: 20rpx;

    image{
      width: 32rpx;
      height: 32rpx;
    }
  }
}
</style>
