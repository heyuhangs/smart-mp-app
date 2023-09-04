<template>
	<view>
		<ly-curriculumtable :weekTableState="true" :palette="palette" :weekTableNumber="weekNumbers"
			:controlWeek="controlWeek" :timetableType="timetableType" :timetables="timetables" :startdDate="startdDate"
			:weekButton="weekButton" @nextWeekClick="nextWeekClick" @lastWeekClick="lastWeekClick"
			@courseClick="courseClick" @weekSelectClick="weekSelectClick" @weekOpenClick="weekOpenClick">

		</ly-curriculumtable>
		<!-- 课程详情 -->
		<!-- 		<u-modal class="modal" :show="showMyModal" title="课程详情" :closeOnClickOverlay="true" :showConfirmButton="false"
			@close="closeModal">
			<view class="slot-content">
				<u-cell-group>
					<u-cell v-for="(item,index) in modalItem" :key="index" :title="item" :icon="modalIcon[index]"
						:iconStyle="{color: colorList()[index+1]}" size="large"></u-cell>
				</u-cell-group>
			</view>
		</u-modal> -->
	</view>
</template>
<script>
	export default {
		data() {
			return {

				weekNumbers: 20, //一共显示几周
				controlWeek: 1, //显示的第几周
				weekButton: true, //开启上一周下一周按钮
				startdDate: '', //开始时间  默认为当前时间
				timetables: [
					['工业机器人系统拆装','工业机器人系统拆装','','','','工业机器人应用编程','工业机器人应用编程'],
					[''],
					['','','工坊楼314(自动化生产线实训室)','工坊楼314(自动化生产线实训室)'],
					['','','','','工业机器人应用编程','工业机器人应用编程'],
					['','工业机器人应用编程','工业机器人应用编程','','','','工业机器人应用编程','工业机器人应用编程'],
				],
				timetableType: [{
						index: '第一节',
						name: '08:00-08:40'
					},
					{
						index: '第二节',
						name: '08:50-09:30'
					},
					{
						index: '第三节',
						name: '09:40-10:20'
					},
					{
						index: '第四节',
						name: '10:30-11:10'
					},
					{
						index: '第五节',
						name: '11:20-12:00'
					},
					{
						index: '第六节',
						name: '14:00-14:40'
					},
					{
						index: '第七节',
						name: '15:50-16:30'
					},
					{
						index: '第八节',
						name: '16:40-17:20'
					}
				],
				palette: [
					"13, 115, 249",
					"255, 165, 30",
					"76, 206, 146",
					"125, 126, 250",
					"47, 189, 220",
					"242, 86, 95"
				]
			}

		},
		methods: {
			courseClick(re) {
				console.log(re)

				//console.log(JSON.stringify(re))
				this.modalItem[0] = "课程: " + re.name;
				this.modalItem[1] = "教室: 213"
				this.modalItem[2] = "教师: 吴老师"
				this.modalItem[3] = "时间: 9:00-9:40";
				this.showMyModal = true;
				//console.log(",",JSON.stringify(this.modalItem))

			},
			nextWeekClick(e) {
				console.log("下一周", e)
			},
			lastWeekClick(e) {
				console.log("上一周", e)
			},
			weekOpenClick() {
				console.log("点击了第几周")
			},
			weekSelectClick(e) {
				console.log("您选择了", e)
			},
			//关闭弹窗
			closeModal() {
				this.showMyModal = this.showMyModal == true ? false : true;
			},
			//返回颜色
			colorList() {
				return [
					"#0D73F9", //0
					"#FFA51E", //1
					"#4CCE92",
					"#8485FB", //3
					"#F2565F" //4
				]
			},

		},
	}
</script>