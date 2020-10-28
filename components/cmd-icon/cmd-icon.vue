<template>
	<view :class="[prefixClass, prefixClass+'-'+type]" :style="setStyle" @tap="$_click"></view>
</template>

<script>
	/**  
	 * 图标组件  
	 * @description 用于展示 icon。该组件的 icon 图形基于 Webfont，因此可任意放大、改变颜色。  
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=175  
	 * @property {String} prefix-class 自定义字体图标库前缀 - 默认cmd-icon  
	 * @property {String} type 图标图案类型 - 列如：home、add  
	 * @property {String} color 图标颜色 - 默认白色  
	 * @property {Number} size 图标大小 - 默认24，单位px  
	 * @event {Function} click 图标组件点击事件  
	 * @example <cmd-icon type="bell" size="30" color="#654321"></cmd-icon>  
	 */
	export default {
		name: 'cmd-icon',

		props: {
			/**
			 * 自定义字体图标库前缀
			 */
			prefixClass: {
				type: String,
				default: 'icon'
			},
			/**
			 * 图标类型
			 */
			type: String,
			/**
			 * 图标颜色
			 */
			color: {
				type: String,
				default: '#fff'
			},
			/**
			 * 图标大小
			 */
			size: {
				type: [Number, String],
				default: '24'
			}
		},

		computed: {
			setStyle() {
				return `color:${this.color};
				font-size:${this.size}px;
				line-height:${this.size}px`
			}
		},

		methods: {
			$_click(e) {
				this.$emit('click', e)
			}
		}
	}
</script>

<style>
	@font-face {font-family: "iconfont";
	  src: url('iconfont.eot?t=1581754205531'); /* IE9 */
	  src: url('iconfont.eot?t=1581754205531#iefix') format('embedded-opentype'), /* IE6-IE8 */
	  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
	  url('iconfont.woff?t=1581754205531') format('woff'),
	  url('iconfont.ttf?t=1581754205531') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
	  url('iconfont.svg?t=1581754205531#iconfont') format('svg'); /* iOS 4.1- */
	}
	
	.icon {
	  font-family: "iconfont" !important;
	  font-size: 16px;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	.icon-Incoming_call:before {
	  content: "\e6c5";
	}
	
	.icon-layered:before {
	  content: "\e6c6";
	}
	
	.icon-collection:before {
	  content: "\e6c7";
	}
	
	.icon-soundsize:before {
	  content: "\e6c8";
	}
	
	.icon-upward:before {
	  content: "\e6c9";
	}
	
	.icon-vision:before {
	  content: "\e6ca";
	}
	
	.icon-top:before {
	  content: "\e6cb";
	}
	
	.icon-history:before {
	  content: "\e6cc";
	}
	
	.icon-shopping:before {
	  content: "\e6cd";
	}
	
	.icon-turnvoice:before {
	  content: "\e6ce";
	}
	
	.icon-locking:before {
	  content: "\e6cf";
	}
	
	.icon-restore:before {
	  content: "\e6d0";
	}
	
	.icon-night:before {
	  content: "\e6d1";
	}
	
	.icon-safety:before {
	  content: "\e6d2";
	}
	
	.icon-phone:before {
	  content: "\e6d3";
	}
	
	.icon-relationship:before {
	  content: "\e6d4";
	}
	
	.icon-next:before {
	  content: "\e6d5";
	}
	
	.icon-timeout:before {
	  content: "\e6d6";
	}
	
	.icon-video:before {
	  content: "\e6d7";
	}
	
	.icon-refresh:before {
	  content: "\e6d8";
	}
	
	.icon-visible:before {
	  content: "\e6d9";
	}
	
	.icon-telephone:before {
	  content: "\e6da";
	}
	
	.icon-th_internet:before {
	  content: "\e6db";
	}
	
	.icon-callout:before {
	  content: "\e6dc";
	}
	
	.icon-withdraw:before {
	  content: "\e6dd";
	}
	
	.icon-call:before {
	  content: "\e6de";
	}
	
	.icon-video1:before {
	  content: "\e6df";
	}
	
	.icon-hangup:before {
	  content: "\e6e0";
	}
	
	.icon-mute:before {
	  content: "\e6e1";
	}
	
	.icon-eye_protection:before {
	  content: "\e6e2";
	}
	
	.icon-distance:before {
	  content: "\e6e3";
	}
	
	.icon-voice:before {
	  content: "\e6e4";
	}
	
	.icon-nickname:before {
	  content: "\e6e5";
	}
	
	.icon-payment:before {
	  content: "\e6e6";
	}
	
	.icon-privacy_closed:before {
	  content: "\e6e7";
	}
	
	.icon-movie:before {
	  content: "\e6e8";
	}
	
	.icon-wifi:before {
	  content: "\e6e9";
	}
	
	.icon-random:before {
	  content: "\e6ea";
	}
	
	.icon-problem:before {
	  content: "\e6eb";
	}
	
	.icon-address:before {
	  content: "\e6ec";
	}
	
	.icon-checkmore:before {
	  content: "\e6ed";
	}
	
	.icon-bookresource:before {
	  content: "\e6ee";
	}
	
	.icon-back:before {
	  content: "\e6ef";
	}
	
	.icon-checkmore1:before {
	  content: "\e6f0";
	}
	
	.icon-addresslist:before {
	  content: "\e6f1";
	}
	
	.icon-address1:before {
	  content: "\e6f2";
	}
	
	.icon-cancelwhite:before {
	  content: "\e6f3";
	}
	
	.icon-cancel1:before {
	  content: "\e6f4";
	}
	
	.icon-close1:before {
	  content: "\e6f5";
	}
	
	.icon-clock:before {
	  content: "\e6f6";
	}
	
	.icon-geniecalling:before {
	  content: "\e6f7";
	}
	
	.icon-entertainmentmark:before {
	  content: "\e6f8";
	}
	
	.icon-addmeteo:before {
	  content: "\e6f9";
	}
	
	.icon-evitaretraffic:before {
	  content: "\e6fa";
	}
	
	.icon-evitarepayment:before {
	  content: "\e6fb";
	}
	
	.icon-genieclock:before {
	  content: "\e6fc";
	}
	
	.icon-highwayfirst:before {
	  content: "\e6fd";
	}
	
	.icon-faimlyalbum:before {
	  content: "\e6fe";
	}
	
	.icon-genieSEC:before {
	  content: "\e6ff";
	}
	
	.icon-info:before {
	  content: "\e700";
	}
	
	.icon-geniecommunity:before {
	  content: "\e701";
	}
	
	.icon-housecare:before {
	  content: "\e702";
	}
	
	.icon-marks:before {
	  content: "\e703";
	}
	
	.icon-infopersonal:before {
	  content: "\e704";
	}
	
	.icon-callingrobort:before {
	  content: "\e705";
	}
	
	.icon-masterctrl:before {
	  content: "\e706";
	}
	
	.icon-messagewhite:before {
	  content: "\e707";
	}
	
	.icon-message:before {
	  content: "\e708";
	}
	
	.icon-lightctrl:before {
	  content: "\e709";
	}
	
	.icon-mirrorlightctrl:before {
	  content: "\e70a";
	}
	
	.icon-kidslock:before {
	  content: "\e70b";
	}
	
	.icon-evitarehighway:before {
	  content: "\e70c";
	}
	
	.icon-groupctrl:before {
	  content: "\e70d";
	}
	
	.icon-mutemode:before {
	  content: "\e70e";
	}
	
	.icon-search:before {
	  content: "\e70f";
	}
	
	.icon-huoyan:before {
	  content: "\e710";
	}
	
	.icon-paymentlife:before {
	  content: "\e711";
	}
	
	.icon-stepback:before {
	  content: "\e712";
	}
	
	.icon-skintest:before {
	  content: "\e713";
	}
	
	.icon-scanQR:before {
	  content: "\e714";
	}
	
	.icon-instruction:before {
	  content: "\e715";
	}
	
	.icon-respond:before {
	  content: "\e716";
	}
	
	.icon-maskclock:before {
	  content: "\e717";
	}
	
	.icon-MTR:before {
	  content: "\e718";
	}
	
	.icon-suggestion:before {
	  content: "\e719";
	}
	
	.icon-queenmirror:before {
	  content: "\e71a";
	}
	
	.icon-phonebill:before {
	  content: "\e71b";
	}
	
	.icon-voicememo:before {
	  content: "\e71c";
	}
	
	.icon-scanread:before {
	  content: "\e71d";
	}
	
	.icon-schedule:before {
	  content: "\e71e";
	}
	
	.icon-tipsmoney:before {
	  content: "\e71f";
	}
	
	.icon-voiceshopping:before {
	  content: "\e720";
	}
	
	.icon-togo:before {
	  content: "\e721";
	}
	
	.icon-voiceprint:before {
	  content: "\e722";
	}
	
	.icon-xiamimusic:before {
	  content: "\e723";
	}
	
	.icon-sleepmode:before {
	  content: "\e724";
	}
	
	.icon-QA:before {
	  content: "\e725";
	}
	
	.icon-volume:before {
	  content: "\e726";
	}
	
	.icon-cart:before {
	  content: "\e727";
	}
	
	.icon-checksurface:before {
	  content: "\e728";
	}
	
	.icon-check:before {
	  content: "\e729";
	}
	
	.icon-birthday:before {
	  content: "\e72a";
	}
	
	.icon-deviceoff:before {
	  content: "\e72b";
	}
	
	.icon-custom:before {
	  content: "\e72c";
	}
	
	.icon-diffuserstoparea:before {
	  content: "\e72d";
	}
	
	.icon-diffuserstop:before {
	  content: "\e72e";
	}
	
	.icon-diffuserplay:before {
	  content: "\e72f";
	}
	
	.icon-connectdevice:before {
	  content: "\e730";
	}
	
	.icon-cook:before {
	  content: "\e731";
	}
	
	.icon-diffuserplayarea:before {
	  content: "\e732";
	}
	
	.icon-deviceon:before {
	  content: "\e733";
	}
	
	.icon-dinner:before {
	  content: "\e734";
	}
	
	.icon-donework:before {
	  content: "\e735";
	}
	
	.icon-dislike:before {
	  content: "\e736";
	}
	
	.icon-getup:before {
	  content: "\e737";
	}
	
	.icon-disconnectdevice:before {
	  content: "\e738";
	}
	
	.icon-getout:before {
	  content: "\e739";
	}
	
	.icon-guests:before {
	  content: "\e73a";
	}
	
	.icon-feeding:before {
	  content: "\e73b";
	}
	
	.icon-like:before {
	  content: "\e73c";
	}
	
	.icon-mark:before {
	  content: "\e73d";
	}
	
	.icon-goodnight:before {
	  content: "\e73e";
	}
	
	.icon-meeting:before {
	  content: "\e73f";
	}
	
	.icon-housecleaning:before {
	  content: "\e740";
	}
	
	.icon-gohome:before {
	  content: "\e741";
	}
	
	.icon-hot:before {
	  content: "\e742";
	}
	
	.icon-radiobuttonunselect:before {
	  content: "\e743";
	}
	
	.icon-menu:before {
	  content: "\e744";
	}
	
	.icon-radiobuttonselect:before {
	  content: "\e745";
	}
	
	.icon-record:before {
	  content: "\e746";
	}
	
	.icon-meetingover:before {
	  content: "\e747";
	}
	
	.icon-microphoneoff:before {
	  content: "\e748";
	}
	
	.icon-share:before {
	  content: "\e749";
	}
	
	.icon-singing:before {
	  content: "\e74a";
	}
	
	.icon-seriesfinale:before {
	  content: "\e74b";
	}
	
	.icon-putbabytobed:before {
	  content: "\e74c";
	}
	
	.icon-washingroom:before {
	  content: "\e74d";
	}
	
	.icon-wakeupbaby:before {
	  content: "\e74e";
	}
	
	.icon-watchseries:before {
	  content: "\e74f";
	}
	
	.icon-takeabreak:before {
	  content: "\e750";
	}
	
	.icon-setting:before {
	  content: "\e751";
	}
	
	.icon-bluetoothoff:before {
	  content: "\e697";
	}
	
	.icon-bluetoothon:before {
	  content: "\e698";
	}
	
	.icon-camera:before {
	  content: "\e699";
	}
	
	.icon-course:before {
	  content: "\e69a";
	}
	
	.icon-bluetooth_link:before {
	  content: "\e69b";
	}
	
	.icon-addto:before {
	  content: "\e69c";
	}
	
	.icon-child:before {
	  content: "\e69d";
	}
	
	.icon-audio:before {
	  content: "\e69e";
	}
	
	.icon-delete:before {
	  content: "\e69f";
	}
	
	.icon-DND_mode:before {
	  content: "\e6a0";
	}
	
	.icon-edit:before {
	  content: "\e6a1";
	}
	
	.icon-child1:before {
	  content: "\e6a2";
	}
	
	.icon-settings:before {
	  content: "\e6a3";
	}
	
	.icon-bluray:before {
	  content: "\e6a4";
	}
	
	.icon-cancel:before {
	  content: "\e6a5";
	}
	
	.icon-down:before {
	  content: "\e6a6";
	}
	
	.icon-brightness:before {
	  content: "\e6a7";
	}
	
	.icon-musiclist:before {
	  content: "\e6a8";
	}
	
	.icon-home:before {
	  content: "\e6a9";
	}
	
	.icon-favoriteslist:before {
	  content: "\e6aa";
	}
	
	.icon-loop:before {
	  content: "\e6ab";
	}
	
	.icon-nextsong:before {
	  content: "\e6ac";
	}
	
	.icon-bottom:before {
	  content: "\e6ad";
	}
	
	.icon-guarantee:before {
	  content: "\e6ae";
	}
	
	.icon-agreement:before {
	  content: "\e6af";
	}
	
	.icon-prevent:before {
	  content: "\e6b0";
	}
	
	.icon-privacy:before {
	  content: "\e6b1";
	}
	
	.icon-play:before {
	  content: "\e6b2";
	}
	
	.icon-brightness1:before {
	  content: "\e6b3";
	}
	
	.icon-privac_open:before {
	  content: "\e6b4";
	}
	
	.icon-conversation:before {
	  content: "\e6b5";
	}
	
	.icon-information:before {
	  content: "\e6b6";
	}
	
	.icon-answer:before {
	  content: "\e6b7";
	}
	
	.icon-face:before {
	  content: "\e6b8";
	}
	
	.icon-protect:before {
	  content: "\e6b9";
	}
	
	.icon-close:before {
	  content: "\e6ba";
	}
	
	.icon-nosignal:before {
	  content: "\e6bb";
	}
	
	.icon-refuse:before {
	  content: "\e6bc";
	}
	
	.icon-selection:before {
	  content: "\e6bd";
	}
	
	.icon-previous:before {
	  content: "\e6be";
	}
	
	.icon-Privacy:before {
	  content: "\e6bf";
	}
	
	.icon-increase:before {
	  content: "\e6c0";
	}
	
	.icon-music:before {
	  content: "\e6c1";
	}
	
	.icon-save:before {
	  content: "\e6c2";
	}
	
	.icon-singlecycle:before {
	  content: "\e6c3";
	}
	
	.icon-prompt:before {
	  content: "\e6c4";
	}
</style>
