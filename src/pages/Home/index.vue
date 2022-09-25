<template>
	<div>
		<typeNav />
		<ListContainer />
		<Recommend />
		<Rank />
		<Like />
		<!-- Floor这个组件，自己在组件内部是没有发送请求的，数据是父组件给的 -->
		<Floor v-for="(floor) in floorList" :key="floor.id" :list="floor" />
		<Brand />
	</div>
</template>
<script>
//引入ListContainer组件
import ListContainer from "@/pages/Home/ListContainer";
//引入recommend组件
import Recommend from "@/pages/Home/Recommend";
//引入Rank组件
import Rank from "@/pages/Home/Rank";
//引入Like组件
import Like from "@/pages/Home/Like";
//引入Floor组件
import Floor from "@/pages/Home/Floor";
//引入Brand组件
import Brand from "@/pages/Home/Brand";
import { mapState } from "vuex";

export default {
	name: "homeVue",
	components: {
		ListContainer,
		Recommend,
		Rank,
		Like,
		Floor,
		Brand,
	},
	mixins: [],
	props: {},
	data() {
		return {};
	},
	computed: {
		//读写仓库里的数据
		...mapState({
			floorList: (state) => {
				return state.home.floorList;
			},
		}),
	},
	watch: {},
	mounted() {
		//派发action
		/*在这一步派发action需要在home组件派发，因为如果在floor组件派发的话，
		会导致floor身上的数据是完全一样的，这样呈现在页面也是两个相同的结构，不符合组件的复用性*/
		this.$store.dispatch("getFloorList");
		// this.$store.dispatch("getUserInfo");
		//获取用户信息
		// try {
		// } catch (error) {
		// 	alert(error.message);
		// }
	},
	methods: {},
};
</script>
<style lang='less' scoped>
</style>