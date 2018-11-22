<template>
  <div class="appContainer">
		<!-- header -->
    <mt-header fixed title="大风起兮云飞扬">
		<span slot="left" @click="goback" v-show="flag" >
			<mt-button icon="back">返回</mt-button>
		</span>
	</mt-header>

		<!-- main -->

		<transition mode="out-in">
			<!-- 切换路由时候的动画效果 -->
			<router-view></router-view>
		</transition>

		<!-- tabbar -->
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-ybx" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页a</span>
			</router-link>
			<router-link class="mui-tab-item-ybx" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-ybx" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<span class="mui-badge" id="badge">{{ $store.getters.carNum }}</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-ybx" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
  </div>
</template>

<script>
	export default {
		data(){
			return {
				flag:false
			}
		},
		methods:{
			goback() {  // 点击返回
				this.$router.go(-1)
			}
		},
		watch:{
			'$route.path':function(newVal){  // 监听路由改变
				if (newVal == '/home') {
					this.flag = false;
				} else {
					this.flag = true;
				}
			}
		}
	}
</script>


<style lang="less" scoped>
  .appContainer {
		padding-top: 40px;
		padding-bottom: 50px;
	}
	// 动画效果
	.v-enter {
		opacity: 0;
		transform: translateX(100%);
		position: absolute;
	}
	.v-enter-active,
	.v-leave-active {
		transform: translateX(0);
		transition: all 0.3s ease;
	}
	.v-leave-to {
		opacity: 0;
		transform: translateX(-100%);
	}

	// 解决用了区域滑动之后 tabbar失效的问题 把包含了 ` mui-tab-item ` 的类名改下名字
	.mui-bar-tab .mui-tab-item-ybx.mui-active {
    	color: #007aff !important;
	}
	.mui-bar-tab .mui-tab-item-ybx {
		display: table-cell;
		overflow: hidden;
		width: 1%;
		height: 50px;
		text-align: center;
		vertical-align: middle;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #929292;
	}
	.mui-bar-tab .mui-tab-item-ybx .mui-icon {
		top: 3px;
		width: 24px;
		height: 24px;
		padding-top: 0;
    	padding-bottom: 0;
	}
	.mui-bar-tab .mui-tab-item-ybx .mui-icon~.mui-tab-label {
		font-size: 11px;
		display: block;
		overflow: hidden;
    	text-overflow: ellipsis;
	}

	// 设置顶部公共区域定位层级
	.mint-header.is-fixed {
		top: 0;
		right: 0;
		left: 0;
		position: fixed;
		z-index: 999;
	}
</style>
