<template>
	<view>
		<cmd-nav-bar title="下级管理" backgroundColor="#ff595c" fontColor="#fff"></cmd-nav-bar> 
		<cmd-page-body type="top">
			<cmd-transition name="fade-up">
			<view class="bg-white">
				<cmd-cell-item title="团队人数" slot-left addon="0">
				</cmd-cell-item>
				<cmd-cell-item title="直属人数" slot-left addon="0">
				</cmd-cell-item>
				<cmd-cell-item title="团队总充值" slot-left addon="0">
				</cmd-cell-item>
				<cmd-cell-item title="团队总提现" slot-left addon="0">
				</cmd-cell-item>
				<cmd-cell-item title="团队总余额" slot-left addon="0">
				</cmd-cell-item>
				<cmd-cell-item title="收益总金额" slot-left addon="0.00">
				</cmd-cell-item>
				<cmd-cell-item title="今日收益" slot-left addon="0">
				</cmd-cell-item>
			</view>
		</cmd-transition>
	</cmd-page-body>
	</view>
</template>

<script>
	 import cmdNavBar from "@/components/cmd-nav-bar/cmd-nav-bar.vue"
	 import cmdPageBody from "@/components/cmd-page-body/cmd-page-body.vue"
	 import cmdTransition from "@/components/cmd-transition/cmd-transition.vue"
	 import cmdCelItem from "@/components/cmd-cell-item/cmd-cell-item.vue"
	 import cmdAvatar from "@/components/cmd-avatar/cmd-avatar.vue"
	export default {
		components: {
		  cmdNavBar,
		  cmdPageBody,
		  cmdTransition,
		  cmdCelItem,
		  cmdAvatar
		},
		data() {
			return {
			};
		}
	}
</script>

<style lang="scss">

</style>
