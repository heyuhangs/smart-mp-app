<template>
  <view class="notice-info">
    <view class="notice-info__main">
      <view class="notice-info__title">24支高校队伍角逐水下机器人大赛</view>
      <view class="notice-info__msg">
        <view>2023年08月09日08:31</view>|<view>来源：科技日报</view>
      </view>
      <view class="notice-info__content">
        8月初，由中国海洋发展基金会、中国海洋发展研究会等主办，鲁东大学、中国海洋发展研究会北海分会承办的2023中国国际海洋水下机器人大赛暨高端论坛在山东烟台举办。来自全国24支高校参赛队“同水竞技”、逐梦海洋。

        记者了解到，此次大赛分为AUV赛道、ROV赛道、创意概念赛道、水产捕捞机器人赛道等4个赛道，来自北京大学、浙江大学、上海交通大学等13所高校的24支参赛队的水下机器人，在海洋水底目标撞击、目标抓取与放置、海洋水下结构物检修、海洋落物采集、海洋精准作业等数个项目进行了“同水竞技”。

        当代海洋水下机器人是集新型材料、数字技术、智能技术等于一体的能在深海与海底从事极限学的奠基人之一、中国工程院院士金翔龙说。

        经过激烈的角逐，中国海洋大学与光同航队获得AUV赛道特等奖；鲁东大学蔚蓝水下机器人队等获得ROV赛道特等奖；聊城大学水域之眼队获AUV赛道一等奖；海军工程大学深海潜蛟队、山东理工大学大海无量一队获得ROV赛道一等奖。

        鲁东大学党委书记王庆表示，搭建海洋水下机器人大赛这个竞技交流与展示平台，就是为高校培养高素质水下机器人专业创新人才，推动海洋水下机器人领域科技进步，推动海洋装备智能化创新发展。
      </view>
    </view>
  </view>
</template>

<script setup>
</script>

<style lang="scss" scoped>
  .notice-info {
    background-color: #f2f4f5;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    overflow-y: scroll;
    overflow-x: hidden;

    &__main {
      background-color: #fff;
      padding: 0 25rpx;
      margin-top: 42rpx;
      border-radius: 15rpx;
      min-height: calc(100vh - 122rpx);
    }

    &__title {
      font-size: 37rpx;
      font-weight: bold;
      padding: 40rpx 0;
      color: #13161A;
    }

    &__msg {
      color: #879098;
      font-size: 22rpx;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      view {
        margin: 0 5rpx;
      }
    }

    &__content {
      color: #13161A;
      margin-top: 40rpx;
      font-size: 26rpx;
      line-height: 50rpx;
      text-indent: 50rpx;
    }
  }
</style>
