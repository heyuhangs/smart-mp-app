<template>
	<view class="device">
		<image class="device__none" v-if="deviceList === ''" src="@/static/mine/device.png"></image>
		<view v-else>
			<view class="device__item">
				<view class="device__item__title">归属柜门编号</view>
				<view class="device__item__msg">06</view>
			</view>
			<view class="device__item">
				<view class="device__item__title">取用时间</view>
				<view class="device__item__msg">2023-09-03 11:49:49</view>
			</view>
		</view>
		<view class="device__button">
			<view class="device__button__left">取设备</view>
			<view class="device__button__right">存设备</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				deviceList: ''
			};
		}
	}
</script>

<style lang="scss" scoped>
	.device {
		background-color: #f2f4f5;
		top: 80rpx;
		left: 0;
		right: 0;
		bottom: 0;
		position: fixed;
		overflow-y: scroll;
		overflow-x: hidden;

		&__none {
			width: 100%;
			height: 50%;
			object-fit: cover;
			object-position: center;
			position: absolute;
		}

		&__item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: #879098;
			line-height: 150rpx;
			border-bottom: 2rpx solid #F2F2F2;
			background-color: #ffffff;
			padding: 0 30rpx;
			font-size: 36rpx;

			&__title {
				color: #000000;
			}
		}

		&__button {
			bottom: 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #ffffff;
			font-size: 32rpx;
			line-height: 80rpx;
			text-align: center;
			position: absolute;
			bottom: 50rpx;
			width: 100%;

			&__left {
				width: 45%;
				border-bottom-left-radius: 80rpx;
				border-top-left-radius: 80rpx;
				background: linear-gradient(90deg, #7595FF, #3573FF)
			}

			&__right {
				width: 45%;
				border-bottom-right-radius: 80rpx;
				border-top-right-radius: 80rpx;
				background: linear-gradient(90deg, #3573FF, #2061FF)
			}
		}
	}
</style>