<template>
	<view>
		<cmd-nav-bar title="房间成员" backgroundColor="#ff595c" fontColor="#fff" :back="true"></cmd-nav-bar>
		<cmd-page-body type="top">
			<view>
				<view class="category-list" v-for="(row,index) in members" :key="index">
					<view class="category">
						<view class="img"><image :src="row.avatar"></image></view>
						<view class="text" v-html="row.userName"></view>
					</view>
				</view>
			</view>
		</cmd-page-body>
	</view>
</template>

<script>
    import cmdNavBar from "@/components/cmd-nav-bar/cmd-nav-bar.vue"
    import cmdPageBody from "@/components/cmd-page-body/cmd-page-body.vue"
    export default {
        components:{
            cmdNavBar,
            cmdPageBody
        },
        name:'member',
        data() {
            return {
                members:[],
                roomId:'',
            };
        },
        methods:{
            getMembers() {
                let req = {
                    roomId:this.roomId
                }
                this.$apiconfig.getMembers_f({data:req}).then(res=>{
                    // if (!res.data.success){
                    //     uni.showToast({
                    //         icon:'none',
                    //         title:res.data.errorHint
                    //     })
                    //     return
                    // }
                    this.members = res.data.data
                });
            }
        },
        onLoad(option) {
			this.roomId = option.roomId
            this.getMembers()
        }
    }
</script>

<style lang="scss">
	.category-list {
		width: 92%;
		margin: 0 4%;
		padding: 0 0 30upx 0;
		border-bottom: solid 2upx #f6f6f6;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.category {
			width: 15%;
			margin-top: 20upx;
			display: flex;
			flex-wrap: wrap;
			.img {
				width: 100%;
				display: flex;
				justify-content: center;
				image {
					width: 14vw;
					height: 14vw;
				}
			}
			.text {
				margin-top: 16upx;
				width: 100%;
				display: flex;
				justify-content: center;
				font-size: 24upx;
				color: #3c3c3c;
			}
		}
	}
</style>
