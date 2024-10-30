<template>
	<view class="training-info">
		<image class="training-info__img" :src="imageUrlPath" lazy-load="true" />
		<view class="training-info__title">{{ obj.name }}</view>


		<view v-if="displayState" class="training-info__setting">
			<view class="training-info__setting-item training-info__setting-item-right">
				<view class="training-info__setting-left">
					<image class="training-info__setting-icon" :src="lamplightImage" />
				</view>
				<view class="training-info__setting-desc">
					<text class="training-info__setting-title">照明</text>
					<text>照明开关</text>
				</view>
				<u-switch size="45" space="2" activeColor="#007aff" v-model="lampGate" asyncChange :loading="switchLoading"
					@change="switchLamplightChange"></u-switch>
			</view>
			<view class="training-info__setting-item training-info__setting-item-left">
				<view class="training-info__setting-left">
					<image class="training-info__setting-icon" :src="controlImage" />
				</view>
				<view class="training-info__setting-desc">
					<text class="training-info__setting-title">总控</text>
					<text>总控开关</text>
				</view>
				<u-switch size="45" space="2" activeColor="#007aff" v-model="mainGate" asyncChange :loading="switchLoading"
					@change="switchControlChange"></u-switch>
			</view>
		</view>

		<view v-if="isShow" class="training-info__content">
			<!--tab-->
			<scroll-view class="scroll-view" scroll-x="true" @scroll="scroll">
				<view class="scroll-view-item" v-for="(tab, index) in tabBars" :key="index"
					:class="navIndex == index ? 'activite' : ''" @tap="checkIndex(index)">
					{{ tab }}
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
	ref
} from 'vue'
import uSwitch from "uview-plus/components/u-switch/u-switch.vue";

import controlImage from '@/static/training/control.png'
import lamplightImage from '@/static/training/lamplight.png'
import { trainingroomInfo, trainingSwitchList, trainingSwitch } from '@/service/training'
import env from '@/host'
import {
	onLoad,
	onUnload
} from "@dcloudio/uni-app";

import Introduce from './components/Introduce.vue'
import Information from './components/Information.vue'


var tabBars = ref([
	'实训室介绍',
	'实训室信息'
])
const obj = ref({})
let lampGateList = []
const displayState = ref(false)
const mainGate = ref(0)
const lampGate = ref(0)
const switchLoading = ref(false)
const imageUrlPath = ref('')

let trainId = null;
let timer = null;

onLoad((option) => {
	trainId = option.trainId
	init()
});

async function init() {
	const [{ code, data }] = await Promise.all([trainingroomInfo({ id: trainId }), getSwitchList()])

	if (code === 200 && data) {
		let newAvatar = ''
		if (data.imageUrl) {
			// 头像
			if (data.imageUrl.indexOf(`${env.imgUrl}`) === -1) {
				newAvatar = data.imageUrl[0] === '/' ? data.imageUrl : `/${data.imageUrl}`
				imageUrlPath.value = `${env.imgUrl}${data.imageUrl}`
			} else {
				imageUrlPath.value = data.imageUrl
			}
		}
		if (data.state === 'using') {
			item.stateName = '在用'
		} else if (data.state === 'appointed') {
			data.stateName = '已约'
		} else if (data.state === 'free') {
			data.stateName = '空闲'
		} else {
			data.stateName = ''
		}
		obj.value = data
		isShow.value = true

		trainingData()
	}
}

async function getSwitchList() {
	const { code, data } = await trainingSwitchList(trainId)

	if (code === 200 && data) {
		lampGateList = data.lampGateList || []
		lampGate.value = Boolean(data.lampGate)
		mainGate.value = Boolean(data.mainGate)
		displayState.value = data.displayState
	}
}


function trainingData() {
	timer = setInterval(() => {
		getSwitchList()
	}, 2000)
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

// 照明开关
function switchLamplightChange(e) {
	// 开关类型 0-总闸 1-灯控
	switchControl({
		switchType: 1,
		switchState: e ? 1 : 0
	})
}

// 总控开关
function switchControlChange(e) {
	// 开关类型 0-总闸 1-灯控
	switchControl({
		switchType: 0,
		switchState: e ? 1 : 0
	})
}

async function switchControl({
	switchType,
	switchState
}) {
	try {
		uni.showLoading()

		switchLoading.value = true

		const { code, data } = await trainingSwitch({
			eduTrainingId: trainId,
			switchType,
			switchState,
			lampGateList
		})

		if (code === 200 && data) {
			uni.showToast({
				icon: 'none',
				title: '操作成功'
			})
			setSwitchStatus(switchType, true)
			return
		}

		setSwitchStatus(switchType, false)
	} finally {
		switchLoading.value = false
		uni.hideLoading()
	}

}

function setSwitchStatus(type, status) {
	if (type === 0) mainGate.value = status
	if (type === 1) lampGate.value = status
}

onUnload(() => {
	timer && clearInterval(timer);
})
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

	&__setting {
		display: flex;
		flex-direction: row;
		align-items: center;
		box-sizing: border-box;
		background-color: #fff;
		border-top: 1px solid #eee;
	}

	&__setting-item-right {
		border-right: 0.5rpx solid #eee;
	}

	&__setting-item-left {
		border-left: 0.5rpx solid #eee;
	}

	&__setting-item {
		padding: 26rpx 22rpx;
		display: flex;
		align-items: center;
		flex-direction: row;
		padding-right: 16rpx;
		width: 50%;
		justify-content: center;
	}

	&__setting-left {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 18rpx;
		background-color: #eee;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	&__setting-icon {
		width: 41rpx;
		height: 41rpx;
	}

	&__setting-desc {
		display: flex;
		flex-direction: column;
		color: #888;
		font-size: 28rpx;
		margin-right: 12rpx;
	}

	&__setting-title {
		color: #555;
		font-size: 32rpx;
	}
}
</style>
