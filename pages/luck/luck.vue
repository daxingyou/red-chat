<template>
    <view class="conbox">
		<cmd-nav-bar title="幸运转盘" backgroundColor="#ff595c" fontColor="#fff" :back="true"></cmd-nav-bar>
        <cmd-page-body type="top">
			<view class="container">
				<!-- 背景 -->
				<image src="../../static/img/luck/bg.png" class="cont" mode=""></image>
				<image src="../../static/img/luck/caidai.png" class="caidai" mode=""></image>
				<view class="padding-sm">
					<!-- <view class="bg-grey2 padding radius text-center shadow-blur"> -->
					<view class="bg-gradual-red padding radius text-center shadow-blur">
						<view class="text-lg">剩余机会</view>
						<view class="margin-top-sm text-Abc">{{surplusChance}}</view>
					</view>
				</view>
				<view class="main" style="padding-top: 150upx;">
					<view class="canvas-container">
						<view :animation="animationData" class="canvas-content" id="zhuanpano" style="">
							<view class="canvas-line">
								<view class="canvas-litem" v-for="(item, index) in list" :key="index" :style="{transform:'rotate('+(index * width + width / 2)+'deg)', zIndex:index,}"></view>
							</view>
							<view class="canvas-list">
								<view class="canvas-item" :style="{transform: 'rotate('+(index * width)+'deg)', zIndex:index, }" v-for="(iteml, index) in list" :key="index">
									<view class="canvas-item-text" :style="'transform:rotate('+(index)+')'">
										<text class="b" style="font-size: 32upx;">{{iteml.msg}}</text>
										<text class="icon-awrad iconfont"></text>
									</view>
								</view>
							</view>
						</view>
						<view @tap="playReward" class="canvas-btn" v-bind:class="btnDisabled">开始 </view>
					</view>
				</view>
				<!-- 规则 -->
				<view class="guize" style="margin-top: 100upx;">
					<view class="title">
						规则说明
					</view>
					<view class="g_item">
						<text class="text-red">当前流水：{{expendMoney}}/1000</text>
					</view>
					<view class="g_item">
						当流水达到1000即可抽奖1次
					</view>
				</view>
			</view>
		</cmd-page-body>
    </view>
</template>

<script>
	import cmdNavBar from "@/components/cmd-nav-bar/cmd-nav-bar.vue"
	import cmdPageBody from "@/components/cmd-page-body/cmd-page-body.vue"
	import { mapState } from 'vuex'
	export default {
		components:{
			cmdNavBar,
			cmdPageBody,
		},
		data() {
			return {
				expendMoney: 0,
				mine:'',
				userNum: '',
				surplusChance: 0,
				list: '',
				width: 0,
				animationData: {},
				btnDisabled: '',
			}
		},
		onShow() {
			this.init()
		},
		computed:{
			...mapState(['hasLogin','userInfo'])
		},
		onLoad: function() {
			// 获取奖品列表
			this.getLuckInfoList()
		},
		methods: {
			init(){
				this.mine = this.userInfo.user
				this.expendMoney = this.mine.expendMoney
				this.getLuckInfo()
			},
			getLuckInfoList(){
				this.$apiconfig.getLuckInfoList_f({}).then(res=>{
					this.list = res.data.data.rows
					this.width = 360 / this.list.length
				});
			},
			getLuckInfo(){
				this.$apiconfig.getLuckLog_f({data:{id:this.mine.id,userName:this.mine.userName}}).then(res=>{
					var num = Math.floor(this.mine.expendMoney / 1000)
					this.surplusChance = num - res.data.data.rows
				});
			},
			animation(index, duration) {
				//中奖index
				var list = this.list;
				// var awardIndex = 1 || Math.round(Math.random() * (awardsNum.length - 1)); //随机数
				var runNum = 4; //旋转8周
				// 旋转角度
				this.runDeg = this.runDeg || 0;
				this.runDeg = this.runDeg + (360 - this.runDeg % 360) + (360 * runNum - index * (360 / list.length)) +1
				//创建动画
				var animationRun = uni.createAnimation({
					duration: duration,
					timingFunction: 'ease'
				})
				animationRun.rotate(this.runDeg).step();
				this.animationData = animationRun.export();
				this.btnDisabled = 'disabled';
			},
			//发起抽奖
			playReward(){
				if(0 >= this.surplusChance){
					uni.showToast({  
						title:'没有可用机会',  
						icon:'none',  
					})
					return
				}
				let index = this.getRandom(), duration = 4000
				this.animation(index, duration)
				setTimeout(() => {
					uni.showModal({content: this.list[index].showTitle ? '抱歉，您未中奖' : '恭喜，中奖'})
					this.btnDisabled = ''
				}, duration + 1000)
				this.$apiconfig.addLuckLog_f({data:{userId:this.mine.id,luckId:index,showTitle:this.list[index].showTitle,money:this.list[index].money}}).then(res=>{
					this.init();
				});
			},
			getRandom(){
				var sumDeg = 1000
				var index = -1
				// deg 为中奖的总概率
				// for(var i = 0; i < this.list.length; i++){
				// 	sumDeg += this.list[i].deg
				// }
				// 保证随机数不为0
				var random = Math.floor(Math.random() * sumDeg) + 1;
				for(var i = 0; i < this.list.length; i++){
					random -= this.list[i].deg
					if (random <= 0) {
						index = i
						return index
					}
				}
				return index
			},
		}
	}
</script>
<style scoped>
    .icon-awrad {
        font-size: 50upx !important;
    }
    .conbox {
        width: 750upx;
        height: 100vh;
        overflow-x: hidden;
        overflow-y: scroll;
    }
	
    .container,
    image.cont {
        width: 750upx;
        min-height: 100vh;
        height: auto;
        position: relative;
    }

    image.cont {
        height: 100%;
        position: absolute;
        z-index: 0;
    }

    image.caidai {
        position: absolute;
        top: 0;
        left: 0;
        width: 750upx;
        height: 1024upx;
    }


    .header-title>view {
        padding: 8upx 16upx;
        border: 1px solid #d89720;
        color: #d89720;
        font-size: 28upx;
        border-radius: 26upx;
    }

    /* 转盘 */
    .canvas-container {
        margin: 0 auto;
        position: relative;
        width: 600upx;
        height: 600upx;
        background: url(../../static/img/luck/circle.png) no-repeat;
        background-size: cover;
        border-radius: 50%;
    }


    .canvas-content {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        display: block;
        width: 600upx;
        height: 600upx;
        border-radius: inherit;
        /* background-clip: padding-box; */
        /* background-color: #ffcb3f; */
    }

    .canvas-list {
        position: absolute;
        left: 0;
        top: 0;
        width: inherit;
        height: inherit;
        z-index: 9999;
    }

    .canvas-item {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        color: #e4370e;
        /* text-shadow: 0 1upx 1upx rgba(255, 255, 255, 0.6); */
    }

    .canvas-item-text {
        position: relative;
        display: block;
        padding-top: 46upx;
        margin: 0 auto;
        text-align: center;
        -webkit-transform-origin: 50% 300upx;
        transform-origin: 50% 300upx;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #FB778B;
    }

    .canvas-item-text text {
        font-size: 30upx;
    }

    /* 分隔线 */
    .canvas-line {
        position: absolute;
        left: 0;
        top: 0;
        width: inherit;
        height: inherit;
        z-index: 99;
    }

    .canvas-litem {
        position: absolute;
        left: 300upx;
        top: 0;
        width: 3upx;
        height: 300upx;
        background-color: rgba(228, 55, 14, 0.4);
        overflow: hidden;
        -webkit-transform-origin: 50% 300upx;
        transform-origin: 50% 300upx;
    }

    /**
* 抽奖按钮
*/
    .canvas-btn {
        position: absolute;
        left: 260upx;
        top: 260upx;
        z-index: 400;
        width: 80upx;
        height: 80upx;
        border-radius: 50%;
        color: #f4e9cc;
        background-color: #e44025;
        line-height: 80upx;
        text-align: center;
        font-size: 26upx;
        text-shadow: 0 -1px 1px rgba(0, 0, 0, 0.6);
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.6);
        text-decoration: none;
    }

    .canvas-btn::after {
        position: absolute;
        display: block;
        content: ' ';
        left: 12upx;
        top: -44upx;
        width: 0;
        height: 0;
        overflow: hidden;
        border-width: 30upx;
        border-style: solid;
        border-color: transparent;
        border-bottom-color: #e44025;
    }
    .canvas-btn.disabled {
        pointer-events: none;
        background: #b07a7b;
        color: #ccc;
    }

    .canvas-btn.disabled::after {
        border-bottom-color: #b07a7b;
    }


    .typecheckbox view {
        border: 1px solid #FF3637;
        background: transparent;
        color: #FF3637;
        display: flex;
        height: 60upx;
        width: 140upx;
        border-radius: 50upx;
        align-items: center;
        justify-content: center;
        display: flex;
        margin-left: 20upx;
    }


    .guize {
        width: 502upx;
        min-height: 300upx;
        display: flex;
        flex-direction: column;
        position: relative;
        z-index: 3;
        background-image: linear-gradient(-180deg, #F48549 0%, #F2642E 100%);
        border: 18upx solid #E4431A;
        border-radius: 16px;
        margin: 0 auto;
        margin-top: -104upx;
        padding: 48upx;
        /* box-sizing: border-box; */
        color: #fff;
    }

    .guize .title {
        text-align: center;
        margin-bottom: 28upx;
    }

    .guize .g_item {
        font-family: PingFang-SC-Medium;
        font-size: 24upx;
        color: #FFFFFF;
        letter-spacing: 0.5px;
        text-align: justify;
        line-height: 20px;
    }

    .myrewards .title {
        font-family: PingFang-SC-Bold;
        font-size: 16px;
        color: #E4431A;
        letter-spacing: 0.57px;
        display: flex;
        padding-top: 36upx;
        justify-content: center;
    }


</style>
