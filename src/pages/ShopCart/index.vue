<template>
	<div class="cart">
		<h4>全部商品</h4>
		<div class="cart-main">
			<div class="cart-th">
				<div class="cart-th1">全部</div>
				<div class="cart-th2">商品</div>
				<div class="cart-th3">单价（元）</div>
				<div class="cart-th4">数量</div>
				<div class="cart-th5">小计（元）</div>
				<div class="cart-th6">操作</div>
			</div>
			<div class="cart-body">
				<ul class="cart-list" v-for="(cart) in cartInfoList" :key="cart.id">
					<li class="cart-list-con1">
						<input
							type="checkbox"
							name="chk_list"
							:checked="cart.isChecked==1"
							@change="updateChecked(cart,$event)"
						/>
					</li>
					<li class="cart-list-con2">
						<img :src="cart.imgUrl" />
						<div class="item-msg">{{cart.skuName}}</div>
					</li>
					<li class="cart-list-con4">
						<span class="price">{{cart.skuPrice}}.00</span>
					</li>
					<li class="cart-list-con5">
						<a href="javascript:void(0)" class="mins" @click="handler('min',-1,cart)">-</a>
						<input
							autocomplete="off"
							type="text"
							minnum="1"
							class="itxt"
							:value="cart.skuNum"
							@change="handler('change',$event.target.value*1,cart)"
						/>
						<a href="javascript:void(0)" class="plus" @click="handler('add',1,cart)">+</a>
					</li>
					<li class="cart-list-con6">
						<span class="sum">{{cart.skuNum * cart.skuPrice}}</span>
					</li>
					<li class="cart-list-con7">
						<a href="#none" class="sindelet" @click="deleteCartById(cart)">删除</a>
						<br />
						<a href="#none">移到收藏</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="cart-tool">
			<div class="select-all">
				<input
					class="chooseAll"
					type="checkbox"
					:checked="isAllchecked&&cartInfoList.length>0"
					@change="updateAllCartChecked"
				/>
				<span>全选</span>
			</div>
			<div class="option">
				<a @click="deleteAllcheckedcart">删除选中的商品</a>
				<a href="#none">移到我的关注</a>
				<a href="#none">清除下柜商品</a>
			</div>
			<div class="money-box">
				<div class="chosed">
					已选择
					<span>0</span>件商品
				</div>
				<div class="sumprice">
					<em>总价（不含运费） ：</em>
					<i class="summoney">{{totalPrice}}.00</i>
				</div>
				<div class="sumbtn">
					<router-link class="sum-btn" to="/trade">结算</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// import throttle from "lodash/throttle";
import debounce from "lodash/debounce";
import { mapGetters } from "vuex";

export default {
	name: "shopCart",
	mounted() {
		this.getData();
	},
	methods: {
		getData() {
			this.$store.dispatch("getCartList");
		},
		//修改某一个产品的个数
		/**
		想了想还是告诉你们，用一个data接收所有skunum，是个数组，下标和原数据对应，
		函数里加个index参数，一减这个数组对应数据也减，会好很多，同时网卡也不怕了，具体自己思考，思路给你们了
		 这里要加防抖的原因是因为防止用户点击过快，服务器数据还没来得及返回渲染页面的数据，
		 使得页面中cart.skuNum在服务器数据回来之前一直是>1的，因此不断点击就有不断地向后台发送-1的请求，
		 导致最终渲染回来的cart.skuNum<0,因此要加个防抖，并且防抖的时间设定要合理，必须大于服务器返回数据的时间
		 大概是500ms，可以做个测试 
		 */
		handler: debounce(async function (type, disNum, cart) {
			//防抖和节流的回调不能写成箭头函数，因为会造成this指向错乱

			//type:为了区分三个元素
			//disNum:变化量
			//cart：哪一个产品
			switch (type) {
				case "add":
					disNum = 1;
					break;
				case "min":
					if (cart.skuNum <= 1) return;
					disNum = cart.skuNum > 1 ? -1 : 0;
					break;
				case "change":
					//用户输入进来的最终量，非法的（带有汉字的），带给服务器的数字
					if (isNaN(disNum) || disNum < 1) {
						disNum = 0;
					} else {
						//属于正常情况，带给服务器变化的量，用户输入进来的-产品的起始个数
						disNum = parseInt(disNum) - cart.skuNum;
					}
					break;
			}
			//派发action
			try {
				await this.$store.dispatch("addOrUpdateShopCart", {
					skuId: cart.skuId,
					//这边将这个数作为skuNum传过去，后端做的工作是在原来的基础上加减，加减由传入的值的正负决定
					skuNum: disNum,
				});

				//再次获取服务器新的数据进行展示
				this.getData();
			} catch (error) {
				console.log(error.message);
			}
		}, 600),
		async deleteCartById(cart) {
			try {
				await this.$store.dispatch("deleteCartList", cart.skuId);
				//删除成功，再次发送请求
				this.getData();
			} catch (error) {
				alert(error.message);
			}
		},
		//修改某个产品的勾选状态
		async updateChecked(cart, event) {
			//带给服务器的isChecked，不是布尔值，应该是0|1
			try {
				//如果修改数据成功，则再次获取服务器数据
				let isChecked = event.target.checked ? "1" : "0";
				await this.$store.dispatch("UpdateCartList", {
					skuId: cart.skuId,
					isChecked,
				});
				this.getData();
			} catch (error) {
				alert(error.message);
			}
		},
		//删除所有选中的商品
		async deleteAllcheckedcart() {
			try {
				await this.$store.dispatch("deleteAllcheckedcart");
				//派发完action，如果请求发起成功，则发起重新渲染页面的请求
				this.getData();
			} catch (error) {
				alert(error.message);
			}
		},
		//点击全选框选中购物车所有商品
		async updateAllCartChecked(event) {
			try {
				let isChecked = event.target.checked ? "1" : "0";
				//派发action
				await this.$store.dispatch("updateAllCartChecked", isChecked);
				this.getData();
			} catch (error) {
				alert(error.message);
			}
		},
	},
	computed: {
		...mapGetters(["cartList"]),
		//购物车数据
		cartInfoList() {
			return this.cartList.cartInfoList || [];
		},
		//计算购买产品的总价
		totalPrice() {
			let sum = 0;
			this.cartInfoList.forEach((element) => {
				sum += element.skuNum * element.skuPrice;
			});
			return sum;
		},
		//计算购物车复选框是否全选
		isAllchecked() {
			//遍历数组，只要有一个不为1，则返回假
			return this.cartInfoList.every((item) => item.isChecked == 1);
		},
	},
};
</script>

<style lang="less" scoped>
.cart {
	width: 1200px;
	margin: 0 auto;

	h4 {
		margin: 9px 0;
		font-size: 14px;
		line-height: 21px;
	}

	.cart-main {
		.cart-th {
			background: #f5f5f5;
			border: 1px solid #ddd;
			padding: 10px;
			overflow: hidden;

			& > div {
				float: left;
			}

			.cart-th1 {
				width: 25%;

				input {
					vertical-align: middle;
				}

				span {
					vertical-align: middle;
				}
			}

			.cart-th2 {
				width: 25%;
			}

			.cart-th3,
			.cart-th4,
			.cart-th5,
			.cart-th6 {
				width: 12.5%;
			}
		}

		.cart-body {
			margin: 15px 0;
			border: 1px solid #ddd;

			.cart-list {
				padding: 10px;
				border-bottom: 1px solid #ddd;
				overflow: hidden;

				& > li {
					float: left;
				}

				.cart-list-con1 {
					width: 15%;
				}

				.cart-list-con2 {
					width: 35%;

					img {
						width: 82px;
						height: 82px;
						float: left;
					}

					.item-msg {
						float: left;
						width: 150px;
						margin: 0 10px;
						line-height: 18px;
					}
				}

				.cart-list-con4 {
					width: 10%;
				}

				.cart-list-con5 {
					width: 17%;

					.mins {
						border: 1px solid #ddd;
						border-right: 0;
						float: left;
						color: #666;
						width: 6px;
						text-align: center;
						padding: 8px;
					}

					input {
						border: 1px solid #ddd;
						width: 40px;
						height: 33px;
						float: left;
						text-align: center;
						font-size: 14px;
					}

					.plus {
						border: 1px solid #ddd;
						border-left: 0;
						float: left;
						color: #666;
						width: 6px;
						text-align: center;
						padding: 8px;
					}
				}

				.cart-list-con6 {
					width: 10%;

					.sum {
						font-size: 16px;
					}
				}

				.cart-list-con7 {
					width: 13%;

					a {
						color: #666;
					}
				}
			}
		}
	}

	.cart-tool {
		overflow: hidden;
		border: 1px solid #ddd;

		.select-all {
			padding: 10px;
			overflow: hidden;
			float: left;

			span {
				vertical-align: middle;
			}

			input {
				vertical-align: middle;
			}
		}

		.option {
			padding: 10px;
			overflow: hidden;
			float: left;

			a {
				float: left;
				padding: 0 10px;
				color: #666;
			}
		}

		.money-box {
			float: right;

			.chosed {
				line-height: 26px;
				float: left;
				padding: 0 10px;
			}

			.sumprice {
				width: 200px;
				line-height: 22px;
				float: left;
				padding: 0 10px;

				.summoney {
					color: #c81623;
					font-size: 16px;
				}
			}

			.sumbtn {
				float: right;

				a {
					display: block;
					position: relative;
					width: 96px;
					height: 52px;
					line-height: 52px;
					color: #fff;
					text-align: center;
					font-size: 18px;
					font-family: "Microsoft YaHei";
					background: #e1251b;
					overflow: hidden;
				}
			}
		}
	}
}
</style>