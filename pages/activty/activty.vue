<template>
	<view>
		<!-- 头部 -->
		<cmd-nav-bar title="活动" backgroundColor="#ff595c" fontColor="#fff"></cmd-nav-bar>  
		<cmd-page-body type="top">
		<view>
			<!-- tab -->
			<scroll-view scroll-x class="bg-white nav text-center">
				<view class="cu-item" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in tabNav" :key="index" @tap="tabSelect" :data-id="index">
					{{tabNav[index]}}
				</view>
			</scroll-view>
			<!-- 切换窗口 -->
			<block v-if="TabCur==0">
				<view>
					<view class="banner">
						<view class="img">
							<image src="../../static/img/card/01.jpg"></image>
							<image src="../../static/img/card/02.jpg"></image>
							<image src="../../static/img/card/03.jpg"></image>
						</view>
					</view>
					<!-- <view class="banner" v-for="(row,index) in swiperList" :key="index">
						<view class="img">
							<image :src="row.bannerUrl"></image>
						</view>
						{{row.bannerUrl}}
					</view> -->
				</view>
			</block>	
			<block v-if="TabCur==1">
				<view class="media-item view bg-white" v-for="(row, index) in noticeList" :key="index">
				    <view class="view">
				        <text class="media-title media-title2">{{row.title}}</text>
				    </view>
				    <view class="media-foot flex-row">
				        <view class="media-info flex-row">
				            <text class="info-text">{{row.details}}</text>
				        </view>
						<view class="media-info flex-row">
							<text class="info-text">{{row.insertTime}}</text>
						</view>
				    </view>
				    <view class="media-item-line" style="position: absolute;"></view>
				</view>
			</block>	
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
				TabCur: 0,
				scrollLeft: 0,
				tabNav: ['活动', '公告'],
				swiperList: [],
				noticeList: [],
			};
		},
		onLoad() {
			//this.getIndexBanner()
			this.getIndexNotice()
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			getIndexBanner(){
				this.$apiconfig.getIndexBanner_f({}).then(res=>{
					this.swiperList = res.data.data.rows
				});
			},
			getIndexNotice(){
				this.$apiconfig.getIndexNotice_f({}).then(res=>{
					this.noticeList = res.data.data.rows
				});
			},
		}
	}
</script>

<style lang="scss">
		.banner {
			.img {
				height: 250upx;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
		.notice {
			.img {
				height: 250upx;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
		
		.info-text {
		    margin-right: 20upx;
		    color: #999999;
		    font-size: 24upx;
		}
		
		.media-foot {
		    margin-top: 25upx;
		    flex-direction: row;
		    align-items: center;
		    justify-content: space-between;
		}
		
		.view {
		    flex-direction: column;
		}
		
		.flex-row {
		    flex-direction: row;
		}
		
		.media-item {
		    position: relative;
		    flex: 1;
		    flex-direction: column;
		    padding: 20upx 30upx 21upx 30upx;
		}
		
		.media-item-line {
		    position: absolute;
		    left: 30upx;
		    right: 30upx;
		    bottom: 0;
		    height: 1upx;
		    background-color: #ebebeb;
		}
		
		.media-image-right {
		    flex-direction: row;
		}
		
		.media-image-left {
		    flex-direction: row-reverse;
		}
		
		.media-title {
		    flex: 1;
		}
		
		.media-title {
		    lines: 3;
		    text-overflow: ellipsis;
		    font-size: 30upx;
		    color: #555555;
		}
		
		.media-title2 {
		    flex: 1;
		    margin-top: 6upx;
		    line-height: 40upx;
		}
		
		.media-info {
		    flex-direction: row;
		    align-items: center;
		}
</style>
