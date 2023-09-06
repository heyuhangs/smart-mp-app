<template>
  <view class="training-info-introduce">
    <scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
      <view>
       {{ obj.courseDesc }}
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import {ref, defineProps, toRefs, onMounted} from 'vue'
const props = defineProps({
	obj: Object,
	required: true,
	default: {}
});
const obj = ref({})
onMounted(() => {
  obj.value = props.obj
});
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
