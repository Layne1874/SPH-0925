<template>
	<div class="swiper-container" ref="floor1Swiper">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="(jpg) in list" :key="jpg.id">
				<img :src="jpg.imgUrl" />
			</div>
		</div>
		<!-- 如果需要分页器 -->
		<div class="swiper-pagination"></div>

		<!-- 如果需要导航按钮 -->
		<div class="swiper-button-prev"></div>
		<div class="swiper-button-next"></div>
	</div>
</template>

<script>
import Swiper from "swiper";
export default {
	name: "carouSel",
	props: ["list"],
	data() {
		return {};
	},

	mounted() {},

	methods: {},
	watch: {
		list: {
			/*immediate: true,开启初始化，使得数据不管有没有变化，一上来都会先执行handler函数一次，
			而watch监听不到list属性的原因是list是父亲home组件给的，从头到尾都没有发生变化，因此监听不到
			 */
			immediate: true,
			handler() {
				if (this.list.length === 0) return;
				this.$nextTick(() => {
					var mySwiper = new Swiper(this.$refs.floor1Swiper, {
						// direction: "vertical", // 垂直切换选项
						loop: true, // 循环模式选项

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

<style lang="scss" scoped>
</style>