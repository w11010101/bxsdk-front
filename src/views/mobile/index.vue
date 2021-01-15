<template>
	<div class="mobile-index">
		<!-- 头部搜索框 和 筛选条件 -->
		<SearchTool @onSearchCallBack='onSearchCallBackFn'></SearchTool>
		<!-- 内容 -->
		<div class="content">
			<!-- 列表或tabs -->
			<div class='container'>
				<van-tabs v-model="active" color='#229FFF' title-active-color='#229FFF' class='container-tabs' @change='tabChangeFn'>
					<van-tab :title="tab.name" v-for='(tab,index) in tabs' :name='tab.active' :key='index'>
						<van-list v-model="loading" :finished="finished" class='list' finished-text="没有更多了" @load="pullUpFn" :immediate-check='false' :offset='0' >
							<van-pull-refresh v-model="isLoading" @refresh="pullDownFn">
								<van-checkbox-group v-model="checkboxGroup" ref='checkboxGroup' @change='checkChangeFn'>
									<van-swipe-cell v-for="(item,i) in listData" :key="i" :title="item">
										<div class='list-item' @click='goDetailFn(item,i)'>
											<van-row type="flex">
												<van-col span='4' class='checkbox-box'>
													<van-checkbox :name='i' class='checkbox-btn' shape="square"></van-checkbox>
												</van-col>
												<van-col span='20'>
													<h2><label class='van-ellipsis'>{{getInvoiceTypeText(item.invoiceTypeCode)}}</label><span>￥{{item.totalAmount}}</span></h2>
													<template v-if='invoiceCodeClass.ZZSInvoiceCodes.includes(item.invoiceTypeCode)'>
														<div class='list-detial'>
															<div>
																<label>购方信息：</label>
																<span class='van-ellipsis'>{{item.buyerName}}</span>
															</div>
															<div>
																<label>销方信息：</label>
																<span class='van-ellipsis'>{{item.salerName}}</span>
															</div>
															<div>
																<label>查验状态：</label>
																<span class='van-ellipsis'>{{getCheckStateFn(item.checkState)}}</span>
															</div>
														</div>
													</template>
													<div class='list-detial list-detial-other' v-else>
														<div>
															<label>开票日期</label>
															<span class='van-ellipsis'>{{formatDate(item.invoiceDate)}}</span>
														</div>
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

import { getInvoiceTypeText, getCheckStateFn, formatDate } from '@/common/js/common';
import { mapState, mapMutations } from 'vuex';
import httpApi from '@/common/js/httpApi.js'
export default {
	name: 'Home',
	components: {
		SearchTool
	},
	computed: {
		...mapState(['invoiceCodeClass']),
	},
	data() {
		return {
			checked: '',
			allChecked: false, // 全选按钮状态
			checkboxGroup: [], // 全选集合
			listData: [],
			// 上划和下划
			loading: false, // 上划加载状态
			finished: false, // 上划完成状态
			count: 0, //
			isLoading: false, // 下划加载状态
			// 
			tabs: [{
				name: '未报销',
				active: 0
			}, {
				name: '报销中',
				active: 2
			}, {
				name: '已报销',
				active: 3
			}],
			active: 0,
			height: window.innerHeight,
			
			searchObj: {

			},
			page: 1,
			rows: 20,
			dateRank:2
		}
	},
	created(){
		let mobileCss = require('@/common/css/mobile.css');
		let listCss = require('@/common/css/list.css');
	},
	mounted() {
		
		console.log(1, this.invoiceCodeClass);
		console.log(2, this.axios);
		console.log(3, httpApi);
		
		this.selectList();
	},
	methods: {
		...mapMutations(['getDetailListUuidFn']),
		selectList(isRefresh = false){
			this.loading = true;
            if (this.finished) return false;
			this.axios({
				url: httpApi.mobile.selectList,
				data: {
					startTime: this.searchObj.searchStartDate||'', //发票开始时间
					endTime: this.searchObj.searchEndDate||'', //发票结束时间
					reimburseState: this.active, //报销状态
					invoiceTypeCode: this.searchObj.searchInvoiceType||'', //发票类型串
					dateRank: this.dateRank, //开票时间排序
					dimParam: this.searchObj.searchVal||'', //模糊参数
					page: this.page, //页码
					rows: this.rows //条数	
				}
			}).then(resolve => {
				console.log('resolve = ', resolve);
				if (resolve.data.length) {
					if (isRefresh) {
                        console.log(' 刷新 赋值');
                        this.$set(this.$data, 'listData', []);
                    }else{
                    	this.$set(this.$data, 'listData', this.listData.concat(resolve.data));
						this.page++;
                    }
					this.getDetailListUuidFn(this.listData.map(item=>item.uuid))
					this.finished = false;
					this.isLoading = false;
                    this.loading = false;
				} else {
					this.$toast({
						message: '暂无数据',
						duration: 1500,
					});
					// 数据全部加载完成
	                this.loading = false;
	                this.isLoading = false;
	                this.isRefresh = false;
				}
			}).catch(reject => {
				console.log('reject = ', reject);
				// 数据全部加载完成
                this.loading = false;
                this.isLoading = false;
                this.isRefresh = false;
			});
		},
		// 上划加载
		pullUpFn() {
			// 异步更新数据
			this.selectList();
		},
		// 下划刷新
		pullDownFn() {
			this.isRefresh = true;
            this.finished = false;
            this.page = 1;
            this.finished = false;
			this.selectList(true);
		},
		// 单选
		checkChangeFn(arr) {
			this.checkboxGroup = arr;
			if (arr.length == this.listData.length) {
				this.allChecked = true;
			} else {
				this.allChecked = false;
			}
		},
		// 全选切换
		allCheckedChangeFn() {
			// console.log(1,this.allChecked, this.checkboxGroup);
			this.$refs.checkboxGroup[0].toggleAll(this.allChecked);
		},
		// 选项卡切换
		tabChangeFn(index) {
			this.listData = [];
			this.finished = false;
			this.pullUpFn();
		},
		//
		goDetailFn(item, index) {
			console.log('goDetailFn')
			this.$router.push({
				name: 'detail',
				params: {
					type: 'detail',
					index,
					item
				}
			})
		},
		getInvoiceTypeText,
		getCheckStateFn,
		formatDate,
		onSearchCallBackFn(obj) {
			console.log(obj)
			this.searchObj = obj;
		}

	},

}
</script>
<style>
/*@import '../../common/css/index.css';
@import '../../common/css/list.css';*/
</style>