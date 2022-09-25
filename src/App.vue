<template>
	<div id="app">
		<Header />
		<!-- 路由组件出口的地方 -->
		<router-view></router-view>
		<Footer v-show="$route.meta.show" />
	</div>
</template>

<script>
import Header from "./components/Header/index.vue";
import Footer from "./components/Footer/index.vue";
export default {
	name: "App",
	components: {
		Header,
		Footer,
	},
	mounted() {
		//通知Vuex发送请求，获取数据，存储于仓库当中
		this.$store.dispatch("getcategoryList");
		//
	},
};
</script>

<style>

</style>
