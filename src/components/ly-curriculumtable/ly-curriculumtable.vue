<template>
	<view class="timetable">
		<view class="cu-bar" v-if="weekButton">
			<view class="action" @click="lastWeek">
				<text class="cuIcon-back" style="margin-right: unset;"></text>
				<text class="text-lg">上周</text>
			</view>
			<view class="content" @click="weekOpen">
				<view>{{ dateDetailsLi[0] }}至{{ dateDetailsLi[6] }}</view>
				<uni-icons type="bottom" size="15"></uni-icons>
			</view>
			<view class="action" @click="nextWeek">
				<text class="text-lg">下周</text>
				<text class="cuIcon-right"></text>
			</view>
		</view>
		<view class="header-wrap">
			<view class="left-text">
				<view class="month-text">时间</view>
				<view class="text-content" v-for="i in 5" :key="i">
					<text class="week-txt">周{{ week[i-1]}}</text>
				</view>
			</view>
			<u-line></u-line>
		</view>
		<!-- 课件时段 -->
		<view class="main">
			<view class="row" v-for="(item,index) in timetableType" :key="index">
				<view class="time-item">
					<view class="index">{{ item.index }}</view>
					<view class="time">{{ item.name }}</view>
				</view>
			</view>
			<!-- 课程内容框 -->
			<view class="course-container">
				<view class="week" v-for="(week, weekIndex) in courseData" :key="weekIndex">
					<view class="courseList" v-for="(course, courseIndex) in week" :key="courseIndex">
						<view v-if="course.length==1">
							<view @click="handleCourseClick(course, weekIndex, courseIndex)" class="course"
								:style="{ height: (course.length * 75 ) + 'px', background: 'rgba(' + course.backgroundColor + ', 0.2)', color:  'rgba(' + course.backgroundColor + ')'}"
								v-if="course.length > 0">{{ course.name }}</view>
						</view>
						<view v-else="course.length!=1">
							<view @click="handleCourseClick(course, weekIndex, courseIndex)" class="course"
								:style="{ height: (course.length * 76 + course.length) + 'px', background: 'rgba(' + course.backgroundColor + ', 0.2)', color:  'rgba(' + course.backgroundColor + ')'}"
								v-if="course.length > 0">{{ course.name }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'Timetable',
		props: {
			controlWeek: { //控制显示第几周
				type: [Number, String],
				default: 1
			},
			weekTableNumber: { //控制底部弹出层显示多少周数值
				type: [Number, String],
				default: 1
			},
			weekTableState: { //点击第几周是 是否开启底部周表
				type: Boolean,
				default: () => {
					return false
				}
			},
			timetableType: {
				type: Array,
				default: () => {
					return [

					]
				}
			},
			week: {
				type: Array,
				default: () => {
					return ['一', '二', '三', '四', '五', '六', '日']
				}
			},
			timetables: {
				type: Array,
				default: () => {
					return [{
							index: '1',
							name: '08:00-08:40'
						},
						{
							index: '2',
							name: '08:50-09:30'
						},
						{
							index: '3',
							name: '09:40-10:20'
						},
						{
							index: '4',
							name: '10:30-11:10'
						},
						{
							index: '5',
							name: '11:20-12:00'
						},
						{
							index: '6',
							name: '14:00-14:40'
						},
						{
							index: '7',
							name: '15:50-16:30'
						},
						{
							index: '8',
							name: '16:40-17:20'
						},
						{
							index: '9',
							name: '17:30-18:10'
						},
						{
							index: '10',
							name: '19:00-19:40'
						},
						{
							index: '11',
							name: '20:50-21:30'
						},
						{
							index: '12',
							name: '21:40-22:20'
						}
					]
				}
			},
			palette: {
				type: Array,
				default: () => {
					return []
				}
			},
			startdDate: {
				type: String,
				default: () => {
					return ""
				}
			},
			weekButton: {
				type: Boolean,
				default: () => {
					return false
				}
			},
		},
		data() {
			return {
				//borderPalette: [...this.palette, '#fe9d9f', '#91dcfc', '#f4f1d4', '#b0efd3', '#def7f8', '#93f5e0', '#e3e8fb', '#edf3b0', '#bcfbfc', '#efe2f9', '#ffe4a0', '#c9edf1', '#b495e1', '#ffe4a0', '#edffec'],
				allPalette: [...this.palette],
				nowWeek: 0, // 当前周数下标 
				weekCurrent: 1, //当前周数
				weeky: 1,
				weekvalue: "", //星期几
				//weekNumber:0,//一共的周数 
				weekNumberList: [], //周数集合
				//week: ['周一','周二','周三','周四','周五','周六','周日'],
				dateLi: [12, 13, 14, 15, 16, 17, 18, 2],
				dateDetailsLi: [], //具体时间组
				date: 29, //当前日
				datetAndMonth: "",
				barHeight: 30,
				dMonth: 0, //当前月份 格式：08/09
				tMonth: 0, //左上角月份
				tMonthweeky: 0, //周期里面的月份
				frontDate: 0, //当前时间前 共有几天是这一周的下标数
				afterDate: 0, //当前时间后 共有几天是这一周的下标数

			}
		},
		created() {
			//获取当前日期
			this.dMonth = this.getWeek(0, "", 1)
			//this.weekNumber=10;
			for (let i = 0; i < this.weekTableNumber; i++) {
				this.weekNumberList.push({
					text: i + 1,
					value: i + 1
				})
			}
			//开始周日期 如：2022-08-28 通过这个时间计算离当前时间是第几周
			//计算多少天
			this.nowWeek = this.controlWeek - 1
			var index = this.nowWeek * 7
			//得到多少天之后日期
			let data2 = this.getfun_date(index)
			//console.log("这是上第",this.nowWeek+1,"周",index,"天以后",)
			//得到 data2 这一周的日期
			this.GetTime(data2)

		},
		computed: {
			courseData() {
				// 为数据标记背景颜色的函数
				let paletteIndex = 0
				const getBackgroundColor = () => {
					const backgroundColor = this.allPalette[paletteIndex]
					paletteIndex++
					if (paletteIndex >= this.allPalette.length) {
						paletteIndex = 0
					}
					return backgroundColor
				}
				// 合并
				const listMerge = []
				this.timetables.forEach(function(list, i) {
					if (!listMerge[i]) {
						listMerge[i] = []
					}
					list.forEach(function(item, index) {
						if (!index) {
							return listMerge[i].push({
								name: item,
								length: 1,
								backgroundColor: item === '' ? 'none' : getBackgroundColor()
							})
						}
						if (item === (listMerge[i][index - 1] || {}).name && item) {
							const sameIndex = (listMerge[i][index - 1] || {}).sameIndex
							if (sameIndex || sameIndex === 0) {
								listMerge[i][sameIndex].length++
								return listMerge[i].push({
									name: item,
									length: 0,
									sameIndex: sameIndex
								})
							}
							listMerge[i][index - 1].length++
							return listMerge[i].push({
								name: item,
								length: 0,
								sameIndex: index - 1
							})
						} else {
							return listMerge[i].push({
								name: item,
								length: 1,
								backgroundColor: item === '' ? 'none' : getBackgroundColor()
							})
						}
					})
				})
				return listMerge

			},
			todayWeekIndex() {
				let weekIndex = new Date().getDay() - 1
				if (weekIndex === -1) {
					weekIndex = 6
				}
				console.log(weekIndex)
				return weekIndex
			}
		},
		methods: {

			handleCourseClick(course, weekIndex, courseIndex) {
				const data = {
					index: courseIndex + 1,
					length: course.length,
					week: this.week[weekIndex],
					weekIndex: weekIndex,
					name: course.name
				}
				//console.log(`星期${data.week}; 第${data.index}节课; 课程名:${data.name}; 课节:${data.length}`)
				// console.log(data)
				this.$emit('courseClick', data)
			},
			//上一周
			lastWeek() {
				if (this.nowWeek == 0) {
					console.log("已经是第一周了")
					return
				}
				this.nowWeek -= 1
				var index = this.nowWeek * 7
				let data2 = this.getfun_date(index)
				//console.log("这是上第",this.nowWeek,"周",index,"以后")
				this.GetTime(data2)
				//子组件事件
				this.$emit('lastWeekClick', this.nowWeek + 1)
			},
			//下一周
			nextWeek() {
				this.nowWeek += 1
				var index = (this.nowWeek - 1) * 7
				let i = this.afterDate + 1 + index

				let data2 = this.getfun_date(i)
				// console.log("这是下第",this.nowWeek,"周",index,i ,"以后","时间是",data2)
				this.GetTime(data2)

				//子组件事件
				this.$emit('nextWeekClick', this.nowWeek + 1)
			},
			//计算一周日期
			GetTime(dateValue) {
				let date;
				if (dateValue != "") {
					date = new Date(dateValue)
					this.weekvalue = 0
				} else {
					date = new Date();
					var day = date.getDay();
					var arr_week = new Array("日", "一", "二", "三", "四", "五", "六");
					this.weekvalue = arr_week[day]
				}
				let weekIndex = date.getDay();
				let index = 0;
				let data = [] //日
				let dateDetails = [] //详细日期
				let dateList = [] // 传给父组件的参数
				//得到当前月份
				this.tMonth = date.getMonth() + 1;
				//得到当前日期以及之前的
				index = weekIndex
				if (weekIndex == 0) {
					index = 7
				}
				for (let i = index - 1; i >= 0; i--) {
					dateDetails.push(this.getWeek(-i, dateValue, 1))
					dateList.push(this.getWeek(-i, dateValue, 2))
					if (this.getWeek(-i, dateValue) == 1) {
						data.push(date.getMonth() + 1 + "月")
						this.tMonth = date.getMonth();
					} else {
						data.push(this.getWeek(-i, dateValue))
					}
					this.frontDate = i;
					// console.log("得到当前日期以及之前的",this.getWeek(-i,dateValue))
				}
				//当前日期之后的
				if (weekIndex != 0) {
					for (let i = 1; i <= 7 - weekIndex; i++) {
						dateDetails.push(this.getWeek(i, dateValue, 1))
						dateList.push(this.getWeek(i, dateValue, 2))
						if (this.getWeek(i, dateValue) == 1) {
							data.push(date.getMonth() + 2 + "月")
							this.tMonth = date.getMonth() + 1;
						} else {
							data.push(this.getWeek(i, dateValue))
						}
						this.afterDate = i;
						// console.log("当前日期之后的",this.getWeek(-i,dateValue))
					}
				}

				//赋值 一周的日期
				this.dateDetailsLi = dateDetails;
				this.$emit('dateDetailsLi', dateList)
				this.dateLi = data;
			},
			//根据传的时间返回单个年 月 日
			getWeek(day, dateValue, state) {
				let today;
				if (dateValue != "") {
					today = new Date(dateValue)
				} else {
					today = new Date();
				}
				//var today = new Date();
				var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
				today.setTime(targetday_milliseconds);
				var tYear = today.getFullYear();
				var tMonth = today.getMonth();
				var tDate = today.getDate();
				tMonth = tMonth + 1;
				tDate = tDate;
				if (state == 1) {
					return tMonth + "月" + tDate + '日';
				} else if (state == 2) {
					return tYear + "-" + (tMonth < 10 ? '0'+tMonth : tMonth) + "-" + (tDate < 10 ? '0'+tDate : tDate);
				} else {
					return tDate;
				}
				//return  tMonth + "/" + tDate;
			},
			//查看 当前时间之前或者之后第几天的时间
			getfun_date(num) {

				let date1;
				if (this.startdDate != "") {
					date1 = new Date(this.startdDate)
				} else {
					date1 = new Date();

				}
				//var date1 = new Date();
				//今天时间
				var time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate()
				var date2 = new Date(date1);
				date2.setDate(date1.getDate() + num);
				//num是正数表示之后的时间，num负数表示之前的时间，0表示今天
				var time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
				// console.log(time2,'当前日期');
				return time2;
			},
			//日期相加减得到天数
			getDateDays(date1) {
				let a1 = Date.parse(new Date(date1))
				let a2 = Date.parse(new Date())
				let day = parseInt((a2 - a1) / (1000 * 60 * 60 * 24))
				return day;
			}
		},
		watch: {
			//nowWeek 为接收参数的名称
			nowWeek: {
				handler(item, index) {
					// console.log(item,index)
					this.weekCurrent = item + 1
				},
				deep: true // 深度监听父组件传过来对象变化
			}
		},


	}
</script>

<style scoped lang="scss">
	.bottom {
		background-color: white;
		padding: 15px 0px;

		h4 {
			text-align: center;
			padding-bottom: 10px;
		}

		border-radius: 15px 15px 0px 0px;
	}



	//上一周，下一周控件
	.cu-bar {
		display: flex;
		position: relative;
		align-items: center;
		min-height: 70upx;
		justify-content: space-between;
		margin: 0px 60rpx;
		font-size: 20rpx;

		.action {
			background-color: #4574E0;
			color: #ffffff;
			width: 120rpx;
			line-height: 40rpx;
			text-align: center;
			border-radius: 10rpx;
		}
	}

	//内容
	.timetable {
		background: white;
		border-radius: 8rpx;
		margin: 0 15rpx;

		//日期
		.header-wrap {
			width: 100%;
			height: 40px;
			border-bottom: 1rpx dashed #E4E7ED;

			.left-text {
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				font-size: 28rpx;
				margin-bottom: 5px;
				color: #292929;
			}

			.month-text {
				width: 150rpx;
				height: 40%;
				text-align: center;
				font-size: 28rpx;
			}

			.week-txt {
				width: 80%;
				height: 60%;
				text-align: center;
				font-size: 28rpx;
				margin-top: 5px;
				border-radius: 16rpx 16rpx 0px 0px;
			}

			.date-txt {
				width: 80%;
				height: 40%;
				text-align: center;
				font-size: 28rpx;
				padding-bottom: 5px;
				border-radius: 0px 0px 16rpx 16rpx;
			}

			.text-content {
				height: 100%;
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				margin-left: 3rpx;
			}

			.text-content-today {
				height: 100%;
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				margin-left: 3rpx;
			}
		}

		.main {
			position: relative;
			// margin-top: 2px;
			padding-bottom: 160rpx;

			.row {
				height: 80px;
				position: relative;

				&:after {
					content: '';
					height: 0;
					width: 100%;
					position: absolute;
					bottom: 0;
					left: 0;
					border-bottom: 1rpx dashed #E4E7ED;
				}

				.time-item {
					height: 100%;
					width: 150rpx;
					text-align: center;

					.index {
						padding-bottom: 8rpx;
						padding-top: 32rpx;
						font-size: 28rpx;
					}

					.time {
						font-size: 24rpx;
						color: $uni-text-color-grey;
					}
				}
			}

			.course-container {
				position: absolute;
				top: 0;
				left: 160rpx;
				width: calc(100% - 160rpx);
				height: 100%;
				display: flex;
				margin: 0 0 80rpx 0;

				.week {
					margin: 0 13rpx 0 0;
					.courseList {
						width: 100rpx;
						word-break: break-all;
						color: white;
						overflow: hidden;
						font-size: 24rpx;

						.course {
							text-align: center;
							border-style: solid;
							border-width: 0;
							opacity: 0.8;
							line-height: 45rpx;
							padding: 5rpx 6rpx;
							width: 90rpx;
						}
					}
				}
			}
		}
	}
</style>