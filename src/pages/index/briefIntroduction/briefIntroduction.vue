<template>
	<view class="briefIntroduction">
		<image class="none" v-if="list.length === 0" src="@/static/training/none.png"></image>
		<view v-else class="briefIntroduction__list">
			<view v-for="item in list" class="briefIntroduction__list-item" @click="toInfo(item)">
				<view class="briefIntroduction__list-info">
					<text class="briefIntroduction__list-title">{{ item.mainTitle }}</text>
					<text class="briefIntroduction__list-desc">{{ item.content }}</text>
				</view>
				<image class="briefIntroduction__list-img" :src="`${env.imgUrl}${item.resourceUrl}`" />
			</view>
		</view>
	</view>
</template>

<script setup>
	import {ref} from 'vue'
	import {elegantList} from '@/service/home'
	import env from '@/host'

	const list = ref([])
	async function init() {
		const {code, data} = await elegantList({doorCustomType: 2})

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
	.briefIntroduction {
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
			padding: 5rpx 38rpx 0 38rpx;
			background-color: #ffffff;
			border-radius: 20rpx;
			min-height: calc(100vh - 42rpx);
		}

		&__list-item {
			padding: 40rpx 0 45rpx 0;
			display: flex;
			align-items: center;
			flex-direction: row;
			border-bottom: 1rpx solid #F2F2F2;
			align-items: flex-start;
		}

		&__list-img {
			width: 168rpx;
			height: 112rpx;
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
			color: #13161A;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		&__list-desc {
			font-size: 23rpx;
			font-weight: 400;
			color: #879098;
			line-height: 40rpx;
			margin-top: 16rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
	}
</style>