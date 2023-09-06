<template>
	<view>
		<ly-curriculumtable :weekTableState="true" :palette="palette" :weekTableNumber="weekNumbers"
			:controlWeek="controlWeek" :timetableType="timetableType" :timetables="timetables" :startdDate="startdDate"
			:weekButton="weekButton" @nextWeekClick="nextWeekClick" @lastWeekClick="lastWeekClick"
			@courseClick="courseClick" @weekSelectClick="weekSelectClick" @weekOpenClick="weekOpenClick">

		</ly-curriculumtable>
	</view>
</template>
<script setup>
	import { ref } from 'vue'
	import {scheduleList} from '@/service/mine'
	const weekNumbers = ref(20)//一共显示几周
	const controlWeek = ref(1)//显示的第几周
	const weekButton = ref(true)//开启上一周下一周按钮
	const startdDate = ref('')//开始时间  默认为当前时间
	const timetables = ref([
					['工业机器人系统拆装','工业机器人系统拆装','','','','工业机器人应用编程','工业机器人应用编程'],
					[''],
					['','','工坊楼314(自动化生产线实训室)','工坊楼314(自动化生产线实训室)'],
					['','','','','工业机器人应用编程','工业机器人应用编程'],
					['','工业机器人应用编程','工业机器人应用编程','','','','工业机器人应用编程','工业机器人应用编程'],
				])
	const timetableType = ref([{
						index: '第一节',
						name: '08:00-08:45'
					},
					{
						index: '第二节',
						name: '09:00-09:45'
					},
					{
						index: '第三节',
						name: '10:00-10:45'
					},
					{
						index: '第四节',
						name: '11:00-11:45'
					},
					{
						index: '第五节',
						name: '14:00-14:45'
					},
					{
						index: '第六节',
						name: '15:00-14:45'
					},
					{
						index: '第七节',
						name: '16:00-16:45'
					},
					{
						index: '第八节',
						name: '17:00-17:45'
					}
				])
	const palette = ref([
					"13, 115, 249",
					"255, 165, 30",
					"76, 206, 146",
					"125, 126, 250",
					"47, 189, 220",
					"242, 86, 95"
				]) // 课程颜色
				
	const list = ref([])
	async function init() {
	  const { code, rows } = await scheduleList({scheduleId: 1})
	
	  if (code === 200 && rows) {
	    let result = rows.reduce((a, b) => {
	      if (a[b.scheduleDate]) {
	        a[b.scheduleDate].push(b);
	      } else {
	        a[b.scheduleDate] = [b];
	      }
	        return a;
	    }, {});
		console.log(result)
		console.log(controlWeek.value)
	  }
	}
	init()
	
	function lastWeekClick() {
		console.log('上周')
	}
	
	function nextWeekClick() {
		console.log('下周')
	}
</script>