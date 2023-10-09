<template>
	<view class="mine">
		<view class="mine__top">
			<image class="mine__top__bg" src="@/static/mine/bg.png" />
			<view class="mine__top__user">
				<image class="mine__top__img" :src="avatar" lazy-load="true" />
				<view>
					<view class="mine__top__name">{{ obj.nickName }}({{ obj.majorName }})</view>
					<view class="mine__top__address"> {{ obj.schoolName }} </view>
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

			<view class="mine__menu__item" @click="toDevice()">
				<view class="mine__menu__left">
					<image class="mine__menu__icon" src="@/static/mine/deviceIcon.png" />
					<view class="mine__menu__name">设备存取</view>
				</view>
				<image class="mine__menu__back" src="@/static/basic/back.png" />
			</view>
		</view>
		
		<view class="logout">退出登录</view>
	</view>
</template>

<script setup>
	import {
		computed,
		ref
	} from 'vue'
	import {
		getUser
	} from '@/store/token'
	import env from '@/host'

	import avatarFemaleImage from '@/static/mine/avatar-female.png'
	import avatarMaleImage from '@/static/mine/avatar-male.png'

	const obj = ref(getUser())

	const avatar = computed(() => {
		const {
			avatar,
			sex
		} = obj.value
		if (avatar) {
			return `${env.imgUrl}${obj.avatar}`
		}
		if (`${sex}` === `0`) {
			return avatarMaleImage
		}
		return avatarFemaleImage
	})

	function toBiographicalNotesList() {
		uni.navigateTo({
			url: '/pages/mine/biographicalNotesList'
		})
	}

	function toCurriculum() {
		uni.navigateTo({
			url: '/pages/mine/curriculum'
		})
	}
	
	function toDevice() {
		uni.navigateTo({
			url: '/pages/mine/device'
		})
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
				height: 215px;
			}

			&__user {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				position: absolute;
				bottom: 50rpx;
				margin-left: 32rpx;
			}

			&__img {
				border-radius: 50%;
				width: 148rpx;
				height: 148rpx;
				border: 2px solid #fff;
			}

			&__name {
				color: #ffffff;
				font-size: 35rpx;
				margin-left: 38rpx;
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
			margin-top: 26rpx;

			&__item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 0 30rpx;
				padding: 40rpx 0;
				border-bottom: 1rpx solid #f2f2f2;
			}

			&__left {
				display: flex;
				justify-content: flex-start;
				align-items: center;
			}

			&__icon {
				width: 42rpx;
				height: 42rpx;
				margin-right: 20rpx;
			}

			&__name {
				color: #222;
				font-size: 27rpx;
			}

			&__back {
				width: 12rpx;
				height: 22rpx;
			}
		}
	    
		.logout {
			background-color: #E2E2E2;
			color: #000000;
			text-align: center;
			line-height: 100rpx;
			border-radius: 10rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			position: absolute;
			bottom: 120rpx;
			width: calc(100% - 60rpx);
			margin: 0 30rpx;
		}
	}
</style>