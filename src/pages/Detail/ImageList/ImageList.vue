<template>
	<div class="swiper-container" ref="floor1Swiper">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="(jpg,index) in skuImageList" :key="jpg.id">
				<img :src="jpg.imgUrl" :class="{active:currentIndex==index}" @click="changeIndex(index)" />
			</div>
		</div>
		<!-- 如果需要分页器 -->
		<!-- <div class="swiper-pagination"></div> -->

		<div class="swiper-button-next"></div>
		<div class="swiper-button-prev"></div>
	</div>
</template>

<script>
import Swiper from "swiper";
export default {
	data() {
		return {
			currentIndex: 0,
		};
	},
	methods: {
		changeIndex(index) {
			this.currentIndex = index;
			//通知兄弟组件的索引值
			this.$bus.$emit("getIndex", this.currentIndex);
		},
	},
	mounted() {
		console.log(this.$refs.floor1Swiper);
	},
	name: "imagesVue",
	props: ["skuImageList"],
	watch: {
		list: {
			/*immediate: true,开启初始化，使得数据不管有没有变化，一上来都会先执行handler函数一次，
			而watch监听不到list属性的原因是list是父亲home组件给的，从头到尾都没有发生变化，因此监听不到
			 */
			immediate: true,
			handler() {
				if (this.skuImageList.length === 0) return;
				this.$nextTick(() => {
					var mySwiper = new Swiper(this.$refs.floor1Swiper, {
						// direction: "vertical", // 垂直切换选项
						loop: true, // 循环模式选项
						//多少张图片一起展示
						slidesPerView: 3,
						//每次切换图片的个数
						slidesPerGroup: 1,
						// 如果需要分页器
						pagination: {
							el: ".swiper-pagination",
							clickable: true,
						},

						// 如果需要前进后退按钮
						navigation: {
							nextEl: ".swiper-button-next",
							prevEl: ".swiper-button-prev",
						},

						// 如果需要滚动条
						// scrollbar: {
						// 	el: ".swiper-scrollbar",
						// },
					});
					mySwiper;
					// console.log(mySwiper);
				});
			},
		},
	},
};
</script>

<style lang="less" scoped>
.swiper-container {
	height: 56px;
	width: 412px;
	box-sizing: border-box;
	padding: 0 12px;

	.swiper-slide {
		width: 56px;
		height: 56px;

		img {
			width: 100%;
			height: 100%;
			border: 1px solid #ccc;
			padding: 2px;
			width: 50px;
			height: 50px;
			display: block;

			&.active {
				border: 2px solid #f60;
				padding: 1px;
			}
		}
	}

	.swiper-button-next {
		left: auto;
		right: 0;
	}

	.swiper-button-prev {
		left: 0;
		right: auto;
	}

	.swiper-button-next,
	.swiper-button-prev {
		box-sizing: border-box;
		width: 12px;
		height: 56px;
		background: rgb(235, 235, 235);
		border: 1px solid rgb(204, 204, 204);
		top: 0;
		margin-top: 0;
		&::after {
			font-size: 12px;
		}
	}
}
</style>