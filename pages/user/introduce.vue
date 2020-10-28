<template>
	<view>
		<cmd-nav-bar title="平台介绍" backgroundColor="#ff595c" fontColor="#fff" :back="true"></cmd-nav-bar>
		 <cmd-page-body type="top">
			<view class="article-meta">
				<text class="article-meta-text article-author">1.开放收益</text>
			</view>
			<view class="article-content">
				<rich-text nodes="自由开放无门槛" style="font-size: 14px;"></rich-text>
			</view>
			<view class="article-meta">
				<text class="article-meta-text article-author">2.玩家邀请返佣</text>
			</view>
			<view class="article-content">
				<rich-text nodes="1级返50%" style="font-size: 14px;"></rich-text>
				<rich-text nodes="2级返50%" style="font-size: 14px;"></rich-text>
			</view>
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
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	/* #ifndef APP-PLUS */
	page {
		min-height: 100%;
	}

	/* #endif */

	.banner {
		height: 360upx;
		position: relative;
		background-color: #ccc;
		flex-direction: row;
		overflow: hidden;
	}

	.banner-img {
		flex: 1;
	}

	.title-area {
		position: absolute;
		left: 30upx;
		right: 30upx;
		bottom: 30upx;
		z-index: 11;
	}

	.title-text {
		font-size: 32upx;
		font-weight: 400;
		line-height: 42upx;
		lines: 2;
		color: #ffffff;
		overflow: hidden;
	}

	.article-meta {
		padding: 20upx 30upx;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
	}

	.article-meta-text {
		color: gray;
	}

	.article-text {
		font-size: 26upx;
		line-height: 50upx;
		margin: 0 20upx;
	}

	.article-author {
		font-size: 30upx;
	}

	.article-time {
		font-size: 30upx;
	}

	.article-content {
		font-size: 30upx;
		padding: 0 30upx;
		margin-bottom: 30upx;
		overflow: hidden;
	}
</style>
