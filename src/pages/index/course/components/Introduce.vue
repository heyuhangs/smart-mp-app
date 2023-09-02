<template>
  <view class="training-info-introduce">
    <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
      <view>
        数控机床是数字控制机床（Computer numerical control machine
        tools）的简称，是一种装有程序控制系统的自动化机床。该控制系统能够逻辑地处理具有控制编码或其他符号指令规定的程序，并将其译码，用代码化的数字表示，通过信息载体输入数控装置。经运算处理由数控装置发出各种控制信号，控制机床的动作，按图纸要求的形状和尺寸，自动地将零件加工出来。
        数控机床较好地解决了复杂、精密、小批量、多品种的零件加工问题，是一种柔性的、高效能的自动化机床，代表了现代机床控制技术的发展方向，是一种典型的机电一体化产品。
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
</script>

<style lang="scss" scoped>
  .training-info-introduce {
    color: #13161A;
    font-size: 35rpx;
    font-weight: 400;
    line-height: 75rpx;
    text-indent: 80rpx;
    margin: 20rpx 30rpx;
  }
</style>
