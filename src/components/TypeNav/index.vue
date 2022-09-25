<template>
	<!-- 商品分类导航 -->
	<div class="type-nav">
		<div class="container">
			<!-- 事件委派|事件委托，把事件给父亲div,然后影响h2和sort这个盒子 -->
			<div @mouseleave="leaveShow" @mouseenter="enterShow">
				<h2 class="all">全部商品分类</h2>
				<!-- 加过渡动画 -->
				<transition name="sort">
					<div class="sort" v-show="show">
						<div class="all-sort-list2" @click="goSearch">
							<!-- 数据多的，用categoryList.slice(0,16) -->
							<div
								class="item"
								v-for="(c1,index) in categoryList"
								:key="c1.categoryId"
								:class="{cur:currentIndex==index}"
							>
								<h3 @mouseenter="changeIndex(index)">
									<a
										:data-categoryName="c1.categoryName"
										:data-category1Id="c1.categoryId"
									>{{c1.categoryName}}</a>
								</h3>
								<!-- 二级,三级分类 -->
								<div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
									<div class="subitem" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
										<dl class="fore">
											<dt>
												<a
													:data-categoryName="c2.categoryName"
													:data-category2Id="c2.categoryId"
												>{{c2.categoryName}}</a>
											</dt>
											<dd>
												<em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
													<a
														:data-categoryName="c3.categoryName"
														:data-category3Id="c3.categoryId"
													>{{c3.categoryName}}</a>
												</em>
											</dd>
										</dl>
									</div>
								</div>
							</div>
						</div>
					</div>
				</transition>
			</div>
			<nav class="nav">
				<a href="###">服装城</a>
				<a href="###">美妆馆</a>
				<a href="###">尚品汇超市</a>
				<a href="###">全球购</a>
				<a href="###">闪购</a>
				<a href="###">团购</a>
				<a href="###">有趣</a>
				<a href="###">秒杀</a>
			</nav>
		</div>
	</div>
</template>
<script>
import { mapState } from "vuex";
//按需加载引入throttle
import throttle from "lodash/throttle";

export default {
	name: "typeNav",
	components: {},
	mixins: [],
	props: {},
	data() {
		return {
			//存储用户鼠标移上哪一个一级分类
			currentIndex: -1,
			show: true,
		};
	},
	computed: {
		...mapState({
			//右侧需要的是一个函数，当使用计算属性时，右侧函数会立即执行一次
			//注入一个参数为state，其实即为大仓库中的数据
			categoryList: (state) => {
				return state.home.categoryList;
			},
		}),
	},
	watch: {},
	mounted() {
		// console.log(this);
		// console.log(this.$router);
		// console.log(this.$route);

		//当组件挂载完毕，让show属性变为false
		//如果不是home路由组件，那么将typeNav隐藏
		if (this.$route.path != "/home") {
			this.show = false;
		}
	},
	methods: {
		// changeIndex(index) {
		// 	//index:鼠标经过某一个一级分类的元素的索引值
		// 	this.currentIndex = index;
		// },
		changeIndex: throttle(function (index) {
			this.currentIndex = index;
		}, 50),
		/*这里用的是ES5的写法，changeIndex是key，throttle()的调用结果作为值value，
		index则是从(@mouseenter="changeIndex(index)) 传进throttle函数的*/

		// leaveIndex() {
		// 	this.currentIndex = -1;
		// },
		goSearch(e) {
			/*
			2.关于h5的自定义属性，操作的时候要注意看是否符合规范(怎么用的我猜你已经忘了，大家应该都学过，翻翻笔记复习下)
			4.跳转到search的时候，确实跳转了，但是又立刻返回主页了。把a标签的href属性给删了就行
			5.其他没啥问题，但是url那里就是死活不出现传的参数，同4，把a标签的href属性删了就行。
			*/

			//@@@！！！@@@@！！！@@@@ 下面这一步是导航栏的 query参数传递的源头，最终传递到对应的路由组件route身上
			//路由传递参数

			let element = e.target;
			// console.log(element.dataset);
			//节点有一个属性dataset，可以获取节点的自定义属性与属性值
			let { categoryname, category1id, category2id, category3id } =
				element.dataset;
			if (categoryname) {
				//整理路由跳转的参数
				let location = { name: "search" };
				let query = { categoryName: categoryname };
				//一级分类，二级分类、三级分类的a标签
				if (category1id) {
					query.category1id = category1id;
				} else if (category2id) {
					query.category2id = category2id;
				} else {
					query.category3id = category3id;
				}
				if (this.$route.params) {
					//整理完合并参数
					location.query = query;
					location.params = this.$route.params;
					//路由跳转
					this.$router.push(location);
				}
			}
		},
		//鼠标移入，让商品分类列表进行展示
		enterShow() {
			this.show = true;
		},
		//鼠标离开，让商品分类列表进行隐藏
		leaveShow() {
			this.currentIndex = -1;
			if (this.$route.path != "/home") {
				this.show = false;
			}
		},
	},
};
</script>
<style lang='less' scoped>
.type-nav {
	border-bottom: 2px solid #e1251b;
	.container {
		width: 1200px;
		margin: 0 auto;
		display: flex;
		position: relative;

		.all {
			width: 210px;
			height: 45px;
			background-color: #e1251b;
			line-height: 45px;
			text-align: center;
			color: #fff;
			font-size: 14px;
			font-weight: bold;
		}

		.nav {
			a {
				height: 45px;
				margin: 0 22px;
				line-height: 45px;
				font-size: 16px;
				color: #333;
			}
		}

		.sort {
			position: absolute;
			left: 0;
			top: 45px;
			width: 210px;
			height: 461px;
			position: absolute;
			background: #fafafa;
			z-index: 999;

			.all-sort-list2 {
				.item {
					h3 {
						line-height: 27px;
						font-size: 14px;
						font-weight: 400;
						overflow: hidden;
						padding: 0 20px;
						margin: 0;

						a {
							text-decoration: none;
							color: #333;
						}
					}
					// :hover {
					// 	background-color: rgb(230, 186, 183);
					// }
					.item-list {
						display: none;
						position: absolute;
						width: 734px;
						min-height: 460px;
						background: #f7f7f7;
						left: 210px;
						border: 1px solid #ddd;
						top: 0;
						z-index: 9999 !important;

						.subitem {
							float: left;
							width: 650px;
							padding: 0 4px 0 8px;

							dl {
								border-top: 1px solid #eee;
								padding: 6px 0;
								overflow: hidden;
								zoom: 1;

								&.fore {
									border-top: 0;
								}

								dt {
									float: left;
									width: 54px;
									line-height: 22px;
									text-align: right;
									padding: 3px 6px 0 0;
									font-weight: 700;
								}

								dd {
									float: left;
									width: 415px;
									padding: 3px 0 0;
									overflow: hidden;

									em {
										float: left;
										height: 14px;
										line-height: 14px;
										padding: 0 8px;
										margin-top: 5px;
										border-left: 1px solid #ccc;
									}
								}
							}
						}
					}
				}
				.cur {
					background-color: rgb(250, 220, 225);
				}
				// .item:hover {
				// 	background-color: thistle;
				// }
			}
		}
		//过渡动画开始状态
		.sort-enter {
			opacity: 0;
		}
		//过渡动画结束状态（进入）
		.sort-enter-to {
			opacity: 1;
		}
		//定义动画时间、速率
		.sort-enter-active {
			transition: all 0.4s linear;
			//让文字不一开始就展示出来，使文字渲染和动画保持一致
			overflow: hidden;
		}
	}
}
</style>