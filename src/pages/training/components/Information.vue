<template>
	<view class="training-info-information">
    <view class="training-info-information__line">
      <view class="training-info-information__title">
        <view class="training-info-information__icon">
          <image src="../../../static/training/num.png"></image>
        </view>
        <view>实训室编号</view>
      </view>
      <view>L03</view>
    </view>

    <view class="training-info-information__line">
      <view class="training-info-information__title">
        <view class="training-info-information__icon">
          <image src="../../../static/training/admin.png"></image>
        </view>
        <view>实训室管理员</view>
      </view>
      <view>刘思思</view>
    </view>

    <view class="training-info-information__line">
      <view class="training-info-information__title">
        <view class="training-info-information__icon">
          <image src="../../../static/training/status.png"></image>
        </view>
        <view>实训室状态</view>
      </view>
      <view>空闲</view>
    </view>

    <view class="training-info-information__line">
      <view class="training-info-information__title">
        <view class="training-info-information__icon">
          <image src="../../../static/training/phone.png"></image>
        </view>
        <view>实训室管理员电话</view>
      </view>
      <view>15912345667</view>
    </view>

    <view class="training-info-information__line">
      <view class="training-info-information__title">
        <view class="training-info-information__icon">
          <image src="../../../static/training/size.png"></image>
        </view>
        <view>实训室容量</view>
      </view>
      <view>0</view>
    </view>

    <view class="training-info-information__line">
      <view class="training-info-information__title">
        <view class="training-info-information__icon">
          <image src="../../../static/training/address.png"></image>
        </view>
        <view>实训室地址</view>
      </view>
      <view>清华楼</view>
    </view>
	</view>
</template>

<script setup>
</script>

<style lang="scss">
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
