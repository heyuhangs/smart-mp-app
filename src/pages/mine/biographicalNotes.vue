<template>
	<view class="biographicalNotes">
		<view class="biographicalNotes__part">
			<view class="biographicalNotes__part__top">
				<view>
					<view class="biographicalNotes__title__name">{{ obj.name }}</view>
					<view class="biographicalNotes__msg">{{ obj.sex }} · {{ obj.age }}岁</view>
				</view>
				<image class="biographicalNotes__icon__img"
					src="https://tse4-mm.cn.bing.net/th/id/OIP-C.cRT6RCVvwHTayfPtBx1GOAHaE8?w=266&h=180&c=7&r=0&o=5&dpr=2&pid=1.7"
					lazy-load="true" />
			</view>
			<view class="biographicalNotes__msg">
				<image class="biographicalNotes__icon__phone" src="@/static/mine/phone.png" />
				<view>{{ obj.tel }}</view>
				<image class="biographicalNotes__icon__email" src="@/static/mine/email.png" />
				<view>{{ obj.email }}</view>
			</view>
		</view>

		<view class="biographicalNotes__part">
			<view class="biographicalNotes__title__title">实习经历</view>
			<view v-for="(item, index) in obj.internshipList" :key="index" class="biographicalNotes__item">
				<view class="biographicalNotes__title">
					<view class="biographicalNotes__title__title">{{item.company}}</view>
					<view class="biographicalNotes__title__msg">{{item.startDate}}-{{item.endDate}}</view>
				</view>
				<view class="biographicalNotes__msg">
					{{item.content}}
				</view>
			</view>
		</view>

		<view class="biographicalNotes__part">
			<view class="biographicalNotes__title__title">教育经历</view>
			<view v-for="(item, index) in obj.educationList" :key="index" class="biographicalNotes__item">
				<view class="biographicalNotes__title">
					<view class="biographicalNotes__title__title">{{ item.company }}</view>
					<view class="biographicalNotes__title__msg">{{item.startDate}}-{{item.endDate}}</view>
				</view>
				<view class="biographicalNotes__msg">
					{{ item.majorName }}
				</view>
			</view>
		</view>

		<view class="biographicalNotes__part">
			<view class="biographicalNotes__title__title">技能证书</view>
			<view v-for="(item, index) in obj.certificateList" :key="index" class="biographicalNotes__card">
				{{ item.title }}
			</view>
		</view>

		<view class="biographicalNotes__part">
			<view class="biographicalNotes__title__title">自我评价</view>
			<view class="biographicalNotes__msg">
				{{obj.selfEvaluation}}
			</view>
		</view>

		<view class="biographicalNotes__button">
			<image class="biographicalNotes__icon__annex" src="@/static/mine/annex.png" />
			<view>导出pdf</view>
		</view>

	</view>
</template>

<script setup>
	import { ref } from 'vue'
	
	import { getResumeInfo } from '@/service/mine'
	import env from '@/host'
	
	const obj = ref({})
	
	async function init() {
	  const { code, data } = await getResumeInfo()
	
	  if (code === 200 && data) {
		  if(data.birth) {
			  data.age = jsGetAge(data.birth)
		  }
	    obj.value = data
	  }
	}
	
	init()
	
	/* *
	 * 通过生日算年龄
	 */
	function jsGetAge(strBirthday){         
	    var returnAge;  
	    var strBirthdayArr=strBirthday.split("-");  
	    var birthYear = strBirthdayArr[0];  
	    var birthMonth = strBirthdayArr[1];  
	    var birthDay = strBirthdayArr[2];  
	      
	    var d = new Date();  
	    var nowYear = d.getFullYear();  
	    var nowMonth = d.getMonth() + 1;  
	    var nowDay = d.getDate();  
	      
	    if(nowYear == birthYear){  
	        returnAge = 0;//同年 则为0岁  
	    }  
	    else{  
	        var ageDiff = nowYear - birthYear ; //年之差  
	        if(ageDiff > 0){  
	            if(nowMonth == birthMonth) {  
	                var dayDiff = nowDay - birthDay;//日之差  
	                if(dayDiff < 0)  
	                {  
	                    returnAge = ageDiff - 1;  
	                }  
	                else  
	                {  
	                    returnAge = ageDiff ;  
	                }  
	            }  
	            else  
	            {  
	                var monthDiff = nowMonth - birthMonth;//月之差  
	                if(monthDiff < 0)  
	                {  
	                    returnAge = ageDiff - 1;  
	                }  
	                else  
	                {  
	                    returnAge = ageDiff ;  
	                }  
	            }  
	        }  
	        else  
	        {  
	            returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天  
	        }  
	    }  
	    return returnAge;//返回周岁年龄  
	}
</script>

<style lang="scss" scoped>
	.biographicalNotes {
		background-color: #ffffff;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		position: fixed;
		overflow-y: scroll;
		overflow-x: hidden;

		&__part {
			border-bottom: 1rpx solid #F2F2F2;
			margin: 0 32rpx;
			padding: 30rpx 0;

			&__top {
				display: flex;
				justify-content: space-between;
				word-wrap: break-word;
			}
		}

		&__title {
			color: #292929;
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			margin: 10rpx 0;

			&__name {
				font-size: 60rpx;
				padding-top: 20rpx;
			}

			&__title {
				font-size: 36rpx;
				width: 55%;
				font-weight: bold;
				margin-bottom: 52rpx;
			}

			&__msg {
				color: #5E5E5E;
				font-size: 25rpx;
			}
		}

		&__msg {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			color: #5E5E5E;
			margin: 10rpx 0;
		}

		&__card {
			display: inline-block;
			color: #5E5E5E;
			background-color: #F5F5F5;
			padding: 5rpx 20rpx;
			margin: 5rpx;
		}

		&__icon {
			&__phone {
				width: 38rpx;
				height: 48rpx;
				margin-right: 10rpx;
			}

			&__email {
				width: 47rpx;
				height: 35rpx;
				margin-right: 10rpx;
				margin-left: 10rpx;
			}

			&__img {
				border-radius: 50% 50%;
				width: 148rpx;
				height: 148rpx;
			}
		}

		&__button {
			background-color: #4574E0;
			color: #ffffff;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 20rpx 50rpx;
			margin: 50rpx 60rpx;
			border-radius: 65rpx;
			font-size: 40rpx;

			image {
				width: 45rpx;
				height: 50rpx;
				margin-right: 20rpx;
			}
		}
	}
</style>