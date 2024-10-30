<template>
  <view class="biographicalNotes">
    <view class="biographicalNotes__part">
      <view class="biographicalNotes__part__top">
        <view>
          <view class="biographicalNotes__title__name">{{ obj.name }}</view>
          <view class="biographicalNotes__msg">{{ infoText }}</view>
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

    <view v-if="obj.internshipList && obj.internshipList.length" class="biographicalNotes__part">
      <view class="biographicalNotes__title__mainTitle">实习经历</view>
      <view v-for="(item, index) in obj.internshipList" :key="index" class="biographicalNotes__item">
        <view class="biographicalNotes__title">
          <view class="biographicalNotes__title__title">{{ item.company }}</view>
          <view class="biographicalNotes__title__msg_date">{{ item.startDate }}~{{ item.endDate }}</view>
        </view>
        <view class="biographicalNotes__msg">
          {{ item.content }}
        </view>
      </view>
    </view>

    <view v-if="obj.educationList && obj.educationList.length" class="biographicalNotes__part">
      <view class="biographicalNotes__title__mainTitle">教育经历</view>
      <view v-for="(item, index) in obj.educationList" :key="index" class="biographicalNotes__item">
        <view class="biographicalNotes__title">
          <view class="biographicalNotes__title__title">{{ item.company }}</view>
          <view class="biographicalNotes__title__msg_date">{{ item.startDate }}~{{ item.endDate }}</view>
        </view>
        <view class="biographicalNotes__msg">
          {{ item.majorName }}
        </view>
      </view>
    </view>

    <view v-if="obj.certificateList && obj.certificateList.length" class="biographicalNotes__part">
      <view class="biographicalNotes__title__mainTitle">技能证书</view>
      <view v-for="(item, index) in obj.certificateList" :key="index" class="biographicalNotes__card">
        {{ item.title }}
      </view>
    </view>

    <view v-if="obj.selfEvaluation" class="biographicalNotes__part">
      <view class="biographicalNotes__title__mainTitle">自我评价</view>
      <view class="biographicalNotes__msg">
        {{ obj.selfEvaluation }}
      </view>
    </view>

    <view class="biographicalNotes__button" @click="handleDownload()">
      <image class="biographicalNotes__icon__annex" src="@/static/mine/annex.png" />
      <view>生成附件简历</view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { download, getResumeInfo } from '@/service/mine'
import env from '@/host'
import { onLoad } from '@dcloudio/uni-app'
import avatarFemaleImage from '@/static/mine/avatar-female.png'
import avatarMaleImage from '@/static/mine/avatar-male.png'
const obj = ref({})
let resumeId = null
onLoad((option) => {
  resumeId = option.resumeId
})
onMounted(() => {
  init()
})

const avatarPath = ref('')

const infoText = computed(() => {
  let text = `${obj.sex == 0 ? '男' : '女'}`
  if (obj.age) {
    text += `· ${obj.age} 岁`
  }

  return text
})

async function init() {
  const { code, data } = await getResumeInfo({ resumeId: resumeId })

  if (code === 200 && data) {
    if (data.birth) {
      data.age = jsGetAge(data.birth)
    }
    obj.value = data
    let newAvatar = ''
    if (obj.value.txUrl) {
      // 头像
      if (obj.value.txUrl.indexOf(`${env.imgUrl}`) === -1) {
        newAvatar = obj.value.txUrl[0] === '/' ?  obj.value.txUrl : `/${obj.value.txUrl}`
        avatarPath.value = `${env.imgUrl}${newAvatar}`
      } else {
        avatarPath.value = `${obj.txUrl}`
      }
    } else {
      if (obj.value.sex === 0) {
        avatarPath.value = avatarMaleImage
      } else {
        avatarPath.value = avatarFemaleImage
      }
    }
  }
}

/* *
 * 导出 PDF
 * */
async function handleDownload() {
  const { code, data } = await download({ resumeId: resumeId })

  if (code === 200 && data) {
    uni.downloadFile({
      url: env.imgUrl + data.ossFilePath, //文件链接
      success: (downloadFileRes) => {
        if (downloadFileRes.statusCode === 200) {

          uni.saveFile({
            tempFilePath: downloadFileRes.tempFilePath,
            success: (saveRes) => {
              uni.showToast({
                icon: 'none',
                mask: true,
                title: '已下载至' + saveRes.savedFilePath
              })
              setTimeout(() => {
                uni.openDocument({
                  filePath: saveRes.savedFilePath,
                  success: (m) => {
                    console.log('文件打开成功')
                  },
                  fail: (e) => {
                    console.log('文件打开失败')
                  }
                })
              }, 3000)
            },
            fail: () => {
              uni.showToast({
                icon: 'none',
                mask: true,
                title: '保存失败'
              })
            }
          })
        }
      },
      fail: (err) => {
        uni.showToast({
          icon: 'none',
          mask: true,
          title: '下载失败'
        })
      }
    })
  }
}

/* *
 * 通过生日算年龄
 */
function jsGetAge(strBirthday) {
  var returnAge
  var strBirthdayArr = strBirthday.split('-')
  var birthYear = strBirthdayArr[0]
  var birthMonth = strBirthdayArr[1]
  var birthDay = strBirthdayArr[2]

  var d = new Date()
  var nowYear = d.getFullYear()
  var nowMonth = d.getMonth() + 1
  var nowDay = d.getDate()

  if (nowYear == birthYear) {
    returnAge = 0 //同年 则为0岁
  } else {
    var ageDiff = nowYear - birthYear //年之差
    if (ageDiff > 0) {
      if (nowMonth == birthMonth) {
        var dayDiff = nowDay - birthDay //日之差
        if (dayDiff < 0) {
          returnAge = ageDiff - 1
        } else {
          returnAge = ageDiff
        }
      } else {
        var monthDiff = nowMonth - birthMonth //月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1
        } else {
          returnAge = ageDiff
        }
      }
    } else {
      returnAge = -1 //返回-1 表示出生日期输入错误 晚于今天
    }
  }
  return returnAge //返回周岁年龄
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
    border-bottom: 1rpx solid #f2f2f2;
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
      font-size: 52rpx;
      padding-top: 20rpx;
      margin-bottom: 20rpx;
    }

    &__mainTitle {
      font-size: 34rpx;
      font-weight: bold;
      margin: 30rpx 0 30rpx 0;
    }

    &__title {
      font-size: 34rpx;
      font-weight: bold;
      margin-top: 30rpx;
    }

    &__msg {
      color: #5e5e5e;
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
    color: #5e5e5e;
    margin: 15rpx 0;
    font-size: 30rpx;
    line-height: 50rpx;
  }

  &__card {
    display: inline-block;
    color: #5e5e5e;
    background-color: #f5f5f5;
    padding: 6rpx 20rpx;
    margin: 5rpx;
    font-size: 28rpx;
    border-radius: 10rpx;
  }

  &__icon {
    &__phone {
      width: 22rpx;
      height: 32rpx;
      margin-right: 10rpx;
    }

    &__email {
      width: 34rpx;
      height: 25rpx;
      margin-right: 10rpx;
      margin-left: 20rpx;
    }

    &__img {
      border-radius: 50% 50%;
      width: 148rpx;
      height: 148rpx;
      background-color: #f2f2f2;
    }
  }

  &__button {
    background-color: #4574e0;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20rpx 50rpx;
    margin: 50rpx 60rpx;
    border-radius: 65rpx;
    font-size: 32rpx;

    image {
      width: 30rpx;
      height: 35rpx;
      margin-right: 18rpx;
    }
  }
}
</style>
