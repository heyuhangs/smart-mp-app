<template>
	<view class="biographicalNotes">
		<view class="biographicalNotes__part">
			<view class="biographicalNotes__part__top">
				<view>
					<view class="biographicalNotes__title__name">{{ obj.name }}</view>
					<view class="biographicalNotes__msg">{{ obj.sex == 0 ? '男' : '女' }} · {{ obj.age }}岁</view>
				</view>
				<image class="biographicalNotes__icon__img" :src="avatarPath" lazy-load="true" />
			</view>
			<view class="biographicalNotes__msg">
				<image class="biographicalNotes__icon__phone" src="@/static/mine/phone.png" />
				<view>{{ obj.tel }}</view>
				<image class="biographicalNotes__icon__email" src="@/static/mine/email.png" />
				<view>{{ obj.email }}</view>
			</view>
		</view>

		<view class="biographicalNotes__part">
			<view class="biographicalNotes__title__mainTitle">实习经历</view>
			<view v-for="(item, index) in obj.internshipList" :key="index" class="biographicalNotes__item">
				<view class="biographicalNotes__title">
					<view class="biographicalNotes__title__title">{{item.company}}</view>
					<view class="biographicalNotes__title__msg_date">{{item.startDate}}~{{item.endDate}}</view>
				</view>
				<view class="biographicalNotes__msg">
					{{item.content}}
				</view>
			</view>
		</view>

		<view class="biographicalNotes__part">
			<view class="biographicalNotes__title__mainTitle">教育经历</view>
			<view v-for="(item, index) in obj.educationList" :key="index" class="biographicalNotes__item">
				<view class="biographicalNotes__title">
					<view class="biographicalNotes__title__title">{{ item.company }}</view>
					<view class="biographicalNotes__title__msg_date">{{item.startDate}}~{{item.endDate}}</view>
				</view>
				<view class="biographicalNotes__msg">
					{{ item.majorName }}
				</view>
			</view>
		</view>

		<view class="biographicalNotes__part">
			<view class="biographicalNotes__title__mainTitle">技能证书</view>
			<view v-for="(item, index) in obj.certificateList" :key="index" class="biographicalNotes__card">
				{{ item.title }}
			</view>
		</view>

		<view class="biographicalNotes__part">
			<view class="biographicalNotes__title__mainTitle">自我评价</view>
			<view class="biographicalNotes__msg">
				{{obj.selfEvaluation}}
			</view>
		</view>

		<view class="biographicalNotes__button" @click="handleDownload()">
			<image class="biographicalNotes__icon__annex" src="@/static/mine/annex.png" />
			<view>导出pdf</view>
		</view>

	</view>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	import { download, getResumeInfo } from '@/service/mine'
	import env from '@/host'
	import {onLoad} from "@dcloudio/uni-app";
	import avatarFemaleImage from '@/static/mine/avatar-female.png'
	import avatarMaleImage from '@/static/mine/avatar-male.png'
	const obj = ref({})
	let resumeId = null;
	onLoad((option) => {
		resumeId=option.resumeId
	});
	onMounted(()=>{
		init()
	})
	
	const avatarPath = ref('')
	
	
	async function init() {
	  const { code, data } = await getResumeInfo({resumeId: resumeId})
	
	  if (code === 200 && data) {
		  if(data.birth) {
			  data.age = jsGetAge(data.birth)
		  }
	    obj.value = data
		
		if (obj.value.avatar) { // 头像
			avatarPath.value = `${env.imgUrl}${obj.avatar}`
		} else {
			if (obj.value.sex === 0) {
				avatarPath.value =  avatarMaleImage
			} else {
				avatarPath.value =  avatarFemaleImage
			}
		}
	  }
	}
	
	/* *
	 * 导出 PDF
	 * */
	 async function handleDownload() {
		 const { code, data } = await download({resumeId: resumeId})
		 
		 if (code === 200 && data) {
			uni.downloadFile({
			 	url: env.imgUrl + data.ossFilePath, //文件链接   
			 	success: (res) => {
					var tempFilePath = res.tempFilePath
					
					uni.saveFile({
						tempFilePath: tempFilePath,
						success: (rep) => {
							var savedFilePath = rep.savedFilePath

							uni.showToast({
							    icon: 'none',
								mask: true,
								title: '已下载至' + savedFilePath,
							});
							setTimeout(() => {
								uni.openDocument({
									filePath: tempFilePath,
									success: (m) => {}
								})
							}, 3000)
						},
						fail: () => {
							uni.showToast({
							    icon: 'none',
								mask: true,
								title: '保存失败',
							});
						}
					})
			    },
			 	fail: (err) => {
			 		uni.showToast({
			 		    icon: 'none',
			 			mask: true,
			 			title: '下载失败',
			 		});
			 	},
			})
		 }
	 }
	
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
				margin-bottom: 20rpx;
			}
			
			&__mainTitle {
				font-size: 36rpx;
				font-weight: bold;
				margin: 30rpx 0 30rpx 0;
			}

			&__title {
				font-size: 36rpx;
				width: 50%;
				font-weight: bold;
				margin-top: 30rpx;
			}

			&__msg {
				color: #5E5E5E;
				font-size: 25rpx;
				line-height: 58rpx;
				
				&_date {
					font-size: 28rpx;
					margin-top: 30rpx;
					color: #858585;
				}
			}
		}

		&__msg {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			color: #5E5E5E;
			margin: 15rpx 0;
			font-size: 30rpx;
			line-height: 50rpx;
		}

		&__card {
			display: inline-block;
			color: #5E5E5E;
			background-color: #F5F5F5;
			padding: 5rpx 20rpx;
			margin: 50rpx 5rpx 5rpx 5rpx;
		}

		&__icon {
			&__phone {
				width: 30rpx;
				height: 40rpx;
				margin-right: 10rpx;
			}

			&__email {
				width: 42rpx;
				height: 30rpx;
				margin-right: 10rpx;
				margin-left: 15rpx;
			}

			&__img {
				border-radius: 50% 50%;
				width: 148rpx;
				height: 148rpx;
				background-color: #f2f2f2;
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