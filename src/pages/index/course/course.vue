<template>
	<view v-show="isShow" class="course">
		<image class="none" v-if="list.length === 0" src="@/static/training/none.png"></image>
		<view v-else class="course__list">
			<view v-for="item in list" class="course__list-item" @click="toInfo(item)">
				<image class="course__list-img" :src="`${env.imgUrl}${item.courseCover}`" />
				<view class="course__list-info">
					<text class="course__list-title">{{item.courseName}}</text>
					<text class="course__list-desc">{{item.courseDesc}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'

	import {
		courseList
	} from '@/service/home'
	import env from '@/host'

	const list = ref([])
	const isShow = ref(false)
	async function init() {
		uni.showLoading({title: 'loading'});
		const {
			code,
			rows
		} = await courseList()
		if (code === 200 && rows) {
			list.value = rows
			isShow.value = true
			uni.hideLoading();
		}
	}
	init()

	function toInfo(item) {
		uni.navigateTo({
			url: '/pages/index/course/info?id=' + item.id
		})
	}
</script>

<style lang="scss" scoped>
	.course {
		background-color: #f2f4f5;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		position: fixed;
		overflow-y: scroll;
		overflow-x: hidden;

		&__list {
			box-sizing: border-box;
			margin-top: 42rpx;
			padding: 5rpx 38rpx 38rpx 38rpx;
			background-color: #ffffff;
			border-radius: 20rpx;
			min-height: calc(100vh - 42rpx);
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
			font-size: 31rpx;
			font-weight: bold;
			color: #2c2c2c;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		&__list-desc {
			font-size: 23rpx;
			font-weight: 400;
			color: #999999;
			line-height: 40rpx;
			margin-top: 20rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			text-indent: 50rpx;
		}
	}
</style>