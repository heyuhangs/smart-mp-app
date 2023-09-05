<template>
	<view class="biographicalNotes">
		<view class="biographicalNotes__part">
			<view class="biographicalNotes__part__top">
				<view>
					<view class="biographicalNotes__title__name">唐雪见</view>
					<view class="biographicalNotes__msg">女 · 21岁</view>
				</view>
				<image class="biographicalNotes__icon__img"
					src="https://tse4-mm.cn.bing.net/th/id/OIP-C.cRT6RCVvwHTayfPtBx1GOAHaE8?w=266&h=180&c=7&r=0&o=5&dpr=2&pid=1.7"
					lazy-load="true" />
			</view>
			<view class="biographicalNotes__msg">
				<image class="biographicalNotes__icon__phone" src="@/static/mine/phone.png" />
				<view>13845678910</view>
				<image class="biographicalNotes__icon__email" src="@/static/mine/email.png" />
				<view>123456789@163.com</view>
			</view>
		</view>

		<view class="biographicalNotes__part">
			<view class="biographicalNotes__title__title">实习经历</view>
			<view v-for="(item, index) in 1" :key="index" class="biographicalNotes__item">
				<view class="biographicalNotes__title">
					<view class="biographicalNotes__title__title">中国石油天然气集团有限公司</view>
					<view class="biographicalNotes__title__msg">2023.04-2023.07</view>
				</view>
				<view class="biographicalNotes__msg">
					1、按照公司及政府有关部门要求及时编制各种财务报表并报送相关部门；
					2、负责员工报销费用的审核，核算工资及奖金；
					3、定期清理往来账户，及时催收和清偿款项；
					4、向上级汇报公司经营状况、财务收支及计划的具体情况，提出建设性的的建议；
					5、与财务、税务、银行等相关政府部门建立并保持良好的关系；
				</view>
			</view>
		</view>

		<view class="biographicalNotes__part">
			<view class="biographicalNotes__title__title">教育经历</view>
			<view v-for="(item, index) in 1" :key="index" class="biographicalNotes__item">
				<view class="biographicalNotes__title">
					<view class="biographicalNotes__title__title">智能制造技术学院</view>
					<view class="biographicalNotes__title__msg">2019-2023</view>
				</view>
				<view class="biographicalNotes__msg">
					工业机器人技术
				</view>
			</view>
		</view>

		<view class="biographicalNotes__part">
			<view class="biographicalNotes__title__title">技能证书</view>
			<view v-for="(item, index) in 2" :key="index" class="biographicalNotes__card">
				大学英语四级
			</view>
		</view>

		<view class="biographicalNotes__part">
			<view class="biographicalNotes__title__title">自我评价</view>
			<view class="biographicalNotes__msg">
				本人乐观、自信、为人正直，坚信“学会做人”是做好一切事情的根本，诚实是的智慧。有很强的适应能力和学习能力，反应迅捷，沟通能力及文笔较好，团队合作精神强。
			</view>
		</view>

		<view class="biographicalNotes__button">
			<image class="biographicalNotes__icon__annex" src="@/static/mine/annex.png" />
			<view>生成附件简历</view>
		</view>

	</view>
</template>

<script setup>

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
				width: 65%;
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