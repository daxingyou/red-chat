<template>
	<view class="content">
		<button type="primary" @tap="shareInfo">分享</button>
	</view>
</template>

<script>
	import share from "@/common/share.js";
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		onBackPress() {
			//监听back键，关闭弹出菜单
			if (this.shareObj.shareMenu.isVisible()) {
				this.shareObj.shareMenu.hide();
				this.shareObj.alphaBg.hide();
				return true
			}
		},
		methods: {
			shareInfo(){
				let shareInfo={
					href:"https://uniapp.dcloud.io",
					title:"分享测试",
					desc:"分享测试",
					imgUrl:"/static/logo.png"
				};
				let shareList=[
					{
						icon:"/static/sharemenu/wx.png",
						text:"微信好友",
					},
					{
						icon:"/static/sharemenu/pyq.png",
						text:"朋友圈"
					},
					{
						icon:"/static/sharemenu/weibo.png",
						text:"微博"
					},
					{
						icon:"/static/sharemenu/qq.png",
						text:"QQ"
					},
					{
						icon:"/static/sharemenu/copy.png",
						text:"复制"
					},
					{
						icon:"/static/sharemenu/more.png",
						text:"更多"
					},
				];
				this.shareObj=share(shareInfo,shareList,function(index){
					console.log("点击按钮的序号: " + index);
					let shareObj={
						href:shareInfo.href||"",
						title:shareInfo.title||"",
						summary:shareInfo.desc||"",
						success:(res)=>{
							console.log("success:" + JSON.stringify(res));
						},
						fail:(err)=>{
							console.log("fail:" + JSON.stringify(err));
						}
					};
					switch (index) {
						case 0:
							shareObj.provider="weixin";
							shareObj.scene="WXSceneSession";
							shareObj.type=0;
							shareObj.imageUrl=shareInfo.imgUrl||"";
							uni.share(shareObj);
							break;
						case 1:
							shareObj.provider="weixin";
							shareObj.scene="WXSenceTimeline";
							shareObj.type=0;
							shareObj.imageUrl=shareInfo.imgUrl||"";
							uni.share(shareObj);
							break;
						case 2:
							shareObj.provider="sinaweibo";
							shareObj.type=0;
							shareObj.imageUrl=shareInfo.imgUrl||"";
							uni.share(shareObj);
							break;
						case 3:
							shareObj.provider="qq";
							shareObj.type=1;
							shareObj.imageUrl=shareInfo.imgUrl||"";
							uni.share(shareObj);
							break;
						case 4:
							uni.setClipboardData({
								data:shareInfo.href,
								complete() {
									uni.showToast({
										title: "已复制到剪贴板"
									})
								}
							})
							break;
						case 5:
							plus.share.sendWithSystem({
								type:"web",
								title:shareInfo.title||"",
								thumbs:[shareInfo.imgUrl||""],
								href:shareInfo.href||"",
								content: shareInfo.desc||"",
							})
							break;
					};
				});
				this.$nextTick(()=>{
					this.shareObj.alphaBg.show();
					this.shareObj.shareMenu.show();
				})
			}
		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
