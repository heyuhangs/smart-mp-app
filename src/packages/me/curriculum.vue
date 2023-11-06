<template>
	<view>
		<ly-curriculumtable :weekTableState="true" :palette="palette" :weekTableNumber="weekNumbers"
			:controlWeek="controlWeek" :timetableType="timetableType" :timetables="timetables" :startdDate="startdDate"
			:weekButton="weekButton" :currentWeekObj="currentWeekObj" @nextWeekClick="nextWeekClick"
			@lastWeekClick="lastWeekClick" @courseClick="courseClick" @weekSelectClick="weekSelectClick"
			@weekOpenClick="weekOpenClick" @dateDetailsLi="dateDetailsLi">

		</ly-curriculumtable>
	</view>
</template>
<script setup>
	import {
		ref
	} from 'vue'
	import {
		scheduleList,
		getWxWeekList
	} from '@/service/mine'
	const weekNumbers = ref(20) //一共显示几周
	const controlWeek = ref(1) //显示的第几周
	const weekButton = ref(true) //开启上一周下一周按钮
	const startdDate = ref('') //开始时间  默认为当前时间
	const timetables = ref([
		['', '', '', '', '', '', '', ''],
		['', '', '', '', '', '', '', ''],
		['', '', '', '', '', '', '', ''],
		['', '', '', '', '', '', '', ''],
		['', '', '', '', '', '', '', '']
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
	const dateList = ref([])
	const currentWeek = ref(0) // 当前周
	const currentWeekObj = ref({})
	async function init() {
		const { code, data } = await getWxWeekList({ week: currentWeek.value })

		if (code === 200 && data) {
			currentWeek.value = data.week
			dateList.value = data.dateList.split(',')
			currentWeekObj.value = data
			const { code, rows } = await scheduleList({
				dateList: data.dateList,
				scheduleId: ''
			})
			if (code === 200 && rows) {
				let result = []
				rows.forEach((a, b) => {
				    result[a.scheduleDate] = a.scheduleVoList
				}) // 整理课程
				console.log(result)
				for (let date in dateList.value) {
					for (let i in result) {
						if (i === dateList.value[date]) {
							result[i].forEach((item, index) => {
								timetables.value[date][item.scheduleTime - 1] = item.courseName === null ? item.classRoomName : item.courseName
							})
						}
					}
				}
				console.log(timetables.value)
			}
		}
	}
	init()

	function lastWeekClick() {
		console.log('上周')
		currentWeek.value = currentWeek.value - 1
		init()
	}

	function nextWeekClick() {
		console.log('下周')
		currentWeek.value = currentWeek.value + 1
		init()
	}
</script>