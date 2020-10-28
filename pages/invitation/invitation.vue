<template>
	<view>
		<cmd-nav-bar title="邀请码" backgroundColor="#ff595c" fontColor="#fff"></cmd-nav-bar>  
		<cmd-page-body type="top">
		<view class="none-bg text-white bg-img" :style="style">
			<text style="position: relative; top: 702upx; left: 392upx; color: #f3cb8c;">{{mine.promotionCode}}</text>
			<tki-qrcode v-if="ifShow" cid="qrcode1" ref="qrcode" 
				:val="mine.promotionCode" :size="size" :unit="unit" 
				:background="background" :foreground="foreground" 
				:pdground="pdground" :icon="icon" :iconSize="iconsize" 
				:lv="lv" :onval="onval" :loadMake="loadMake" 
				:usingComponents="true" @result="qrR" 
			/>
			<text style="position: relative; top: 706upx; left: 352upx; color: #f3cb8c;">www.qq.com</text>
		</view>	
		</cmd-page-body>
	</view>
</template>
 
<script>
	import { mapState } from 'vuex'; 
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
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
			cmdAvatar,
			tkiQrcode
		},
		computed: {
			...mapState(['hasLogin','userInfo']),
			style() {
				var StatusBar= this.StatusBar;
				var CustomBar= this.CustomBar;
				let _this = this;
				var style;
				uni.getSystemInfo({
				    success(res) {
				        _this.phoneHeight = res.windowHeight + CustomBar;
				       style = `height:${_this.phoneHeight}px;padding-top:${StatusBar}px;background-image: url(/static/img/card/inv.jpg)`;
				    }
				});      
				
				return style
			}
		},
		onShow() {
			this.mine = this.userInfo.user;
		},
		data() {
			return {
				mine:{
					promotionCode:'xxxxx'
				},
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				ifShow: true,
				val: '二维码', // 要生成的二维码值
				size: 228, // 二维码大小
				unit: 'upx', // 单位
				background: '#ffffff', // 背景色
				foreground: '#000000', // 前景色
				pdground: '#ffffff', // 角标色
				icon: '', // 二维码图标
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: true, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				src: '' // 二维码生成后的图片地址或base64
			};
		},
		methods:{
			sliderchange(e) {
				this.size = e.detail.value
			},
			creatQrcode() {
				this.$refs.qrcode._makeCode()
			},
			saveQrcode() {
				this.$refs.qrcode._saveCode()
			},
			qrR(res) {
				this.src = res
			},
			clearQrcode() {
				this.$refs.qrcode._clearCode()
				this.val = ''
			},
			ifQrcode() {
				this.ifShow = !this.ifShow
			},
			selectIcon() {
				let that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function (res) {
						that.icon = res.tempFilePaths[0]
						setTimeout(() => {
							that.creatQrcode()
						}, 100);
						// console.log(res.tempFilePaths);
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.qrimg {
		display: flex;
		justify-content: center;
	}
	.qrimg-i{
		margin-right: 10px;
	}
	slider {
		width: 100%;
	}
	.btns {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
</style>
