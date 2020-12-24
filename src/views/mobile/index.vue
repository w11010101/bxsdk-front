<template>
	<div class="mobile-index">
		<!-- 头部搜索框 和 筛选条件 -->
		<SearchTool></SearchTool>
		<!-- 内容 -->
		<div class="content">
			<!-- 列表或tabs -->
			<div class='container'>
				<van-tabs v-model="active" color='#229FFF' title-active-color='#229FFF' class='container-tabs' @change='tabChangeFn'>
					<van-tab :title="tab.name" v-for='(tab,index) in tabs' :name='tab.active' :key='index'>
						<van-list v-model="loading" :finished="finished" class='list' finished-text="没有更多了" @load="pullUpFn" >
							<van-pull-refresh v-model="isLoading" @refresh="pullDownFn">
								<van-checkbox-group v-model="checkboxGroup" ref='checkboxGroup' @change='checkChangeFn'>
									<van-swipe-cell v-for="(item,i) in list" :key="item" :title="item" >
										<div class='list-item' @click='toDetailFn'>
											<van-row type="flex">
												<van-col span='4' class='checkbox-box'>
													<van-checkbox :name='i' class='checkbox-btn' shape="square" ></van-checkbox>
												</van-col>
												<van-col span='20'>
													<h2><label class='van-ellipsis'>发票名称{{tab.active}}</label><span>￥123456789.99</span></h2>
													<div class='list-detial'>
														<div><label>购方信息：</label><span class='van-ellipsis'>购方信息购方信息购方信息购方信息购方信息购方信息购方信息购方信息购方信息购方信息购方信息</span></div>
														<div><label>销方信息：</label><span class='van-ellipsis'>销方信息销方信息销方信息销方信息销方信息销方信息销方信息销方信息销方信息销方信息：销方信息：</span></div>
														<div><label>查验状态：</label><span class='van-ellipsis'>查验状态查验状态查验状态查验状态查验状态查验状态查验状态查验状态查验状态查验状态查验状态</span></div>
													</div>
												</van-col>
											</van-row>
										</div>
										<template #right>
											<van-button square type="danger" text="删除" class="delete-button" />
										</template>
									</van-swipe-cell>
									<!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
								</van-checkbox-group>
							</van-pull-refresh>
						</van-list>
					</van-tab>
				</van-tabs>
			</div>
			<!-- 底部按钮 原版 -->
			<!-- <div class="floor-old">
				<van-row type="flex" justify="center">
					<van-col span='4'><van-checkbox class='checkbox-btn' shape="square" v-model="allChecked"></van-checkbox></van-col>
					<van-col span='10'><van-button class='floor-btn floor-btn-000' block color='#ddd'>提交复核</van-button></van-col>
					<van-col span='10'><van-button class='floor-btn' block type="info">添加发票</van-button></van-col>
				</van-row>
			</div> -->
			<div class="floor">
				<van-row gutter="10">
					<van-col span='4'>
						<van-checkbox class='checkbox-btn' shape="square" v-model="allChecked" @click='allCheckedChangeFn'></van-checkbox>
					</van-col>
					<van-col span='10'>
						<van-button class='floor-btn' block>提交复核</van-button>
					</van-col>
					<van-col span='10'>
						<van-button class='floor-btn' block color='#229FFF'>添加发票</van-button>
					</van-col>
				</van-row>
			</div>
		</div>
		<!--  -->
		<transition name="slide-fade">
            <router-view class='child-view' name='detailView' ref='child'></router-view>
        </transition>
	</div>
</template>
<script>
// @ is an alias to /src
import SearchTool from '@/components/search'

export default {
	name: 'Home',
	components: { SearchTool },
	data() {
		return {
			checked: '',
			allChecked: false, // 全选按钮状态
			checkboxGroup: [], // 全选集合
			list: [],
			// 上划和下划
			loading: false, // 上划加载状态
			finished: false, // 上划完成状态
			count: 0, //
			isLoading: false, // 下划加载状态
			// 
			tabs: [{
				name: '未报销',
				active: 1
			}, {
				name: '报销中',
				active: 2
			}, {
				name: '已报销',
				active: 3
			}],
			active: 1
		}
	},
	methods: {
		// 上划加载
		pullUpFn() {
			// 异步更新数据
			// setTimeout 仅做示例，真实场景中一般为 ajax 请求
			setTimeout(() => {
				for (let i = 0; i < 5; i++) {
					this.list.push(this.list.length + 1);
				}
				// 加载状态结束
				this.loading = false;

				// 数据全部加载完成
				if (this.list.length >=5) {
					this.finished = true;
				}
			}, 1000);
		},
		// 下划刷新
		pullDownFn() {
			setTimeout(() => {
				this.$toast('刷新成功');
				this.isLoading = false;
				this.count++;
			}, 1000);
		},
		// 单选
		checkChangeFn(arr) {
			this.checkboxGroup = arr;
			if(arr.length == this.list.length){
				this.allChecked = true;
			}else{
				this.allChecked = false;
			}
		},
		// 全选切换
		allCheckedChangeFn() {
			// console.log(1,this.allChecked, this.checkboxGroup);
			this.$refs.checkboxGroup[0].toggleAll(this.allChecked);
		},
		// 选项卡切换
		tabChangeFn(index){
			this.list = [];
			this.finished = false;
			this.pullUpFn();
		},
		toDetailFn(){
			console.log('toDetailFn')
			this.$router.push({
				name:'detail',
				params:{
					type:'detail',
				}
			})
		}
		
	},
	mounted() {
		this.pullUpFn();
	}
}
</script>
<style>
@import '../../common/css/index.css';
@import '../../common/css/list.css';
</style>