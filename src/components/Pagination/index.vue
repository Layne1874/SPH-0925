<template>
	<div class="pagination">
		<button :disabled="pageNo==1" @click="$emit('getpageNo',pageNo-1)">上一页</button>

		<button
			v-show="startandEndpage.start>1"
			@click="$emit('getpageNo',1)"
			:class="{active:pageNo==1}"
		>1</button>
		<button v-show="startandEndpage.start>2">···</button>

		<!-- 中间部分 -->
		<!-- 将需要展示的情况--分类讨论--，就可以得到需要的条件是page>=start -->
		<!-- v-show="page>=startandEndpage.start" -->
		<button
			v-for="(page,index) in startandEndpage.end"
			:key="index"
			v-show="page>=startandEndpage.start"
			@click="$emit('getpageNo',page)"
			:class="{active:pageNo==page}"
		>{{page}}</button>

		<button v-show="startandEndpage.end<totalPage-1">···</button>
		<button
			v-show="startandEndpage.end<totalPage"
			@click="$emit('getpageNo',totalPage)"
			:class="{active:pageNo==totalPage}"
		>{{totalPage}}</button>
		<button :disabled="pageNo==totalPage" @click="$emit('getpageNo',pageNo+1)">下一页</button>

		<button style="margin-left: 30px">共 {{total}} 条</button>
	</div>
</template>

<script>
export default {
	name: "pagiNation",
	props: ["pageNo", "pageSize", "total", "continues"],
	computed: {
		totalPage() {
			return Math.ceil(this.total / this.pageSize);
		},
		startandEndpage() {
			const { continues, pageNo, totalPage } = this;
			let start = 0,
				end = 0;
			//连续页码数至少是5，如果出现不正常现象，即不够5页
			if (continues > totalPage) {
				start = 1;
				end = totalPage;
			} else {
				//正常现象
				//起始数字
				start = pageNo - parseInt(continues / 2);
				//结束数字
				end = pageNo + parseInt(continues / 2);
				//出现不正常现象，start小于1或者end大于最大分页数
				if (start < 1) {
					start = 1;
					end = continues;
				}
				//end大于最大分页数的情况
				if (end > totalPage) {
					start = totalPage - continues + 1;
					end = totalPage;
				}
			}
			//把定义的变量返回
			return { start, end };
		},
	},
};
</script>

<style lang="less" scoped>
.pagination {
	text-align: center;
	button {
		margin: 0 5px;
		background-color: #f4f4f5;
		color: #606266;
		outline: none;
		border-radius: 2px;
		padding: 0 4px;
		vertical-align: top;
		display: inline-block;
		font-size: 13px;
		min-width: 35.5px;
		height: 28px;
		line-height: 28px;
		cursor: pointer;
		box-sizing: border-box;
		text-align: center;
		border: 0;

		&[disabled] {
			color: #c0c4cc;
			cursor: not-allowed;
		}

		&.active {
			cursor: not-allowed;
			background-color: #409eff;
			color: #fff;
		}
	}
}
</style>
