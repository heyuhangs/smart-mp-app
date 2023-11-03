<template>
	<view class="training-info">
		<image class="training-info__img"
			:src="(obj.resourceUrl && obj.resourceUrl.indexOf(`${env.imgUrl}`) === -1) ? `${env.imgUrl}${obj.resourceUrl}` : `${obj.resourceUrl}`"
			lazy-load="true" />
		<view class="training-info__title">{{ obj.trainName }}</view>

		<view v-if="isShow" class="training-info__content">
			<!--tab-->
			<scroll-view class="scroll-view" scroll-x="true" @scroll="scroll">
				<view class="scroll-view-item" v-for="(tab,index) in tabBars" :key="index"
					:class="navIndex==index ? 'activite' : ''" @tap="checkIndex(index)">
					{{tab}}
				</view>
			</scroll-view>
			<!-- 内容 -->
			<swiper :current="navIndex" @change="tabChange" class="tab_content">
				<swiper-item class="swiper_item">
					<Introduce class="etmHights" :obj="obj"></Introduce>
				</swiper-item>
				<swiper-item class="swiper_item">
					<Information class="etmHights" :obj="obj"></Information>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'
	import {
		elegantInfo
	} from '@/service/home'
	import env from '@/host'
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import Introduce from './components/Introduce.vue'
	import Information from './components/Information.vue'
	var tabBars = ref([
		'实训室介绍',
		'实训室信息'
	])
	const obj = ref({})
	let doorCustomId = null;
	onLoad((option) => {
		doorCustomId = option.doorCustomId
	});
	onMounted(() => {
		init()
	})
	async function init() {
		const {
			code,
			data
		} = await elegantInfo({
			doorCustomId: doorCustomId
		})

		if (code === 200 && data) {
			obj.value = data
			isShow.value = true
		}
	}

	var navIndex = ref(0)
	var scrollTop = ref(0)
	var isShow = ref(false)

	const tabChange = (e) => {
		navIndex.value = e.detail.current
	}

	function checkIndex(index) {
		navIndex.value = index
	}

	function scroll(e) {
		scrollTop.value = e.detail.scrollTop
	}
</script>

<style lang="scss" scoped>
	.training-info {
		background-color: #f2f4f5;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		position: fixed;
		overflow-y: scroll;
		overflow-x: hidden;

		&__img {
			width: 100%;
			background-color: #f2f2f2;
		}

		&__title {
			background-color: #ffffff;
			color: #13161A;
			font-weight: bold;
			font-size: 30rpx;
			padding: 40rpx 30rpx;
		}

		&__content {
			margin-top: 20rpx;
			background-color: #ffffff;

			.scroll-view {
				white-space: nowrap;
				width: 100%;
				color: #879098;
			}

			.scroll-view-item {
				display: inline-block;
				width: 24%;
				margin: 0 13%;
				text-align: center;
				line-height: 90rpx;
				font-size: 32rpx;
			}

			.activite {
				color: #13161A;
				border-bottom: 5rpx solid #4574E0;
				font-weight: bold;
			}

			.tab_content {
				color: #13161A;
				min-height: calc(100vh - 600rpx);
			}
		}
	}
</style>