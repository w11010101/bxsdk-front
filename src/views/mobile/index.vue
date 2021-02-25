<template>
	<div class="mobile-index">
		<!-- 头部搜索框 和 筛选条件 -->
		<SearchTool :hide='searchToolShow' @onSearchCallBack='onSearchCallBackFn'></SearchTool>
		<!-- 内容 -->
		<div class="content">
			<!-- 列表或tabs -->
			<div class='container'>
				<van-tabs v-model="active" color='#229FFF' title-active-color='#229FFF' class='container-tabs' @change='tabChangeFn'>
					<van-tab :title="tab.name" v-for='(tab,index) in tabs' :name='tab.active' :key='index'>
						<van-list class='list' v-model="loading" :finished="finished" :finished-text="finishedText" :error.sync="error" error-text="请求失败，点击重新加载" @load="pullUpFn" :immediate-check='false' :offset='0'>
							<van-pull-refresh v-model="isLoading" @refresh="pullDownFn">
								<!-- 多选容器 -->
								<!-- <van-checkbox-group v-model="checkboxGroup" ref='checkboxGroup' @change='checkChangeFn'> -->
								<van-swipe-cell v-for="(item,i) in $data['listData_'+active]" :key="i" :title="item">
									<div class='list-item'>
										<van-row type="flex">
											<!-- 多选框 -->
											<!-- <van-col span='4' class='checkbox-box'>
													<van-checkbox :name='i' class='checkbox-btn' shape="square"></van-checkbox>
												</van-col> -->
											<van-col span='24' @click='goDetailFn(item,i)'>
												<h2><label class='van-ellipsis'>{{getInvoiceTypeTextFn(item.invoiceTypeCode)}}</label><span>￥{{item.totalAmount}}</span></h2>
												<template v-if='VATsAllClass.includes(item.invoiceTypeCode)'>
													<div class='list-detial'>
														<div>
															<label>开票日期：</label>
															<span class='van-ellipsis'>{{formatDate(item.invoiceDate)}}</span>
														</div>
														<div>
															<label>销方信息：</label>
															<span class='van-ellipsis'>{{item.salerName}}</span>
														</div>
														<!-- <div>
															<label>查验状态：</label>
															<span class='van-ellipsis'>{{getCheckStateFn(item.checkState)}}</span>
														</div> -->
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
										<van-button square type="danger" text="删除" class="delete-button" @click='deleteInvoiceFn(item,i)' />
									</template>
								</van-swipe-cell>
								<!-- </van-checkbox-group> -->
							</van-pull-refresh>
						</van-list>
					</van-tab>
				</van-tabs>
			</div>
			<!-- 底部按钮 原版 -->
			<div class="floor-old">
				<van-button class='floor-btn' block  color='#229FFF' @click='addInvoiceShow=true'>添加发票</van-button>
			</div>
			<!-- <div class="floor">
				<van-row gutter="10">
					<van-col span='4'>
						<van-checkbox class='checkbox-btn' shape="square" v-model="allChecked" @click='allCheckedChangeFn'></van-checkbox>
					</van-col>
					<van-col span='10'>
						<van-button class='floor-btn' block>提交复核</van-button>
					</van-col>
					<van-col span='10'>
						<van-button class='floor-btn' block color='#229FFF' @click='addInvoiceShow=true'>添加发票</van-button>
					</van-col>
				</van-row>
			</div> -->
		</div>
		<!-- 添加发票 -->
		<van-action-sheet :round='false' v-model="addInvoiceShow" @select="onSelect" cancel-text="取消">
			<template v-for='item in addInvoiceType'>
				<van-button block v-if='item.value=="QRcode"' class='add-invoice-item'>{{item.name}}</van-button>
				<van-uploader class='add-invoice-item upload-item' :name='item.value' :max-size="maxSize * 1024" v-else-if='item.value=="camera"' capture='camera' :after-read='onAfterReadFn' @oversize="onOversize" :multiple='item.multiple'>
					<van-button block>{{item.name}}</van-button>
				</van-uploader>
				<van-uploader class='add-invoice-item upload-item' :name='item.value' :max-size="maxSize * 1024" v-else-if='item.value=="picture"' :after-read='onAfterReadFn' @oversize="onOversize" :multiple='item.multiple'>
					<van-button block>{{item.name}}</van-button>
				</van-uploader>
				<van-uploader class='add-invoice-item upload-item' :name='item.value' :max-size="maxSize * 1024" v-else accept='.pdf' :after-read='onAfterReadFn' @oversize="onOversize" :multiple='item.multiple'>
					<van-button block>{{item.name}}</van-button>
				</van-uploader>
			</template>
		</van-action-sheet>
		<!-- 跳转路由容器 -->
		<transition name="slide-fade">
			<router-view class='child-view' name='detailView' ref='child'></router-view>
		</transition>
	</div>
</template>
<script>
// @ is an alias to /src
import SearchTool from '@/components/search'
import { getInvoiceTypeTextFn, getCheckStateFn, formatDate, invoiceCodeClass, compressFilesFn, isToString } from '@/common/js/common';
import { mapState, mapMutations } from 'vuex';
import httpApi from '@/common/js/httpApi.js';

export default {
	name: 'Home',
	components: {
		SearchTool
	},
	computed: {

	},
	data() {
		return {
			...invoiceCodeClass,
			checked: '',
			allChecked: false, // 全选按钮状态
			checkboxGroup: [], // 全选集合
			listData_0: [], // 未报销
			listData_2: [], // 报销中
			listData_3: [], // 已报销
			// reimbursementListData_1: [], // 报销中
			// reimbursedListData: [], // 已报销
			// 上划和下划
			loading: false, // 上划加载状态
			finished: false, // 上划完成状态
			count: 0, //
			isLoading: false, // 下划加载状态
			error: false,
			finishedText: '没有更多数据',
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
			active: 0, // tab 下标
			height: window.innerHeight,
			searchToolShow: false,
			searchObj: {

			},
			page: 1,
			rows: 20,
			dateRank: 2,
			addInvoiceShow: false,
			addInvoiceType: [{
					name: '扫一扫',
					value: 'QRcode',
					className: 'add-invoiceType'
				},
				{
					name: '拍照',
					value: 'camera',
					className: 'add-invoiceType',
					multiple: false
				},
				{
					name: '相册',
					value: 'picture',
					className: 'add-invoiceType',
					multiple: true
				},
				{
					name: 'PDF',
					value: 'PDF',
					className: 'add-invoiceType',
					multiple: false
				}
			],
			maxSize: 5000,

		}
	},
	watch: {
		'$route'(to, form) {
			if (to.name == 'mobileIndex') {
				this.appSelectFn(true);
			}

		}
	},
	created() {
		
		let mobileCss = require('@/common/css/mobile.css');
		let listCss = require('@/common/css/list.css');
	},
	mounted() {
		this.appSelectFn();
	},
	methods: {
		...mapMutations(['getDetailListUuidFn']),
		getInvoiceTypeTextFn,
		getCheckStateFn,
		formatDate,
		compressFilesFn,
		appSelectFn(isRefresh = false) {
			this.loading = true;
			if (isRefresh) {
				this.page = 1;
			}
			this.axios({
				url: httpApi.app.appSelect,
				data: {
					startTime: this.searchObj.searchStartDate || '', //发票开始时间
					endTime: this.searchObj.searchEndDate || '', //发票结束时间
					reimburseState: this.active, //报销状态
					invoiceTypeCode: this.searchObj.searchInvoiceType || '', //发票类型串
					dateRank: this.dateRank, //开票时间排序
					dimParam: this.searchObj.searchVal || '', //模糊参数
					page: this.page, //页码
					rows: this.rows //条数
				}
			}).then(resolve => {
				let activeListDate = 'listData_' + this.active;
				if (resolve.data.length) {
					if (isRefresh) {
						console.log('刷新 赋值');
						this.$set(this.$data, activeListDate, resolve.data);
					} else {
						this.$set(this.$data, activeListDate, this[activeListDate].concat(resolve.data));

					}
					this.page++;
					this.getDetailListUuidFn(this[activeListDate].map(item => item.uuid))
					this.finished = false;
					this.isLoading = false;
					this.loading = false;
				} else {
					console.log('无数据')
					this.$toast('无更多数据')
					this.$set(this.$data, activeListDate, this[activeListDate].concat(resolve.data));
					// 数据全部加载完成
					this.loading = false;
					this.isLoading = false;
					this.finished = true;
				}
			}).catch(reject => {
				console.log('reject = ', reject);
				this.$toast('数据请求失败')
				this.error = true;
				// 数据全部加载完成
				this.loading = false;
				this.isLoading = true;
				this.finished = true;
				this.finishedText = '';
			});
		},
		// 上划加载
		pullUpFn() {
			// 异步更新数据
			this.appSelectFn();
		},
		// 下划刷新
		pullDownFn() {
			this.finished = false;
			this.loading = true;
			this.appSelectFn(true);
		},
		// 单选切换
		checkChangeFn(arr) {
			this.checkboxGroup = arr;
			if (arr.length == this.listData_0.length) {
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
			
			this.finished = false;
			if (!this['listData_' + this.active].length) {
				this.appSelectFn(true);
			}
		},
		/**
		 * [goDetailFn 跳转详情页面方法]
		 * @param  {[type]}  item    [发票信息]
		 * @param  {[type]}  index   [发票下标]
		 * @param  {Boolean} require [是请求信息（true），还是详情信息（false）]
		 * @return {[type]}          []
		 */
		goDetailFn(item, index, require = false) {
			this.$router.push({
				name: 'detail',
				params: {
					type: 'detail',
					index: isToString(arguments[1]) == 'Number' ? index : void 0,
					item,
					require: isToString(arguments[1]) == 'Number' ? arguments[2] === void 0 ? false : arguments[2] : arguments[1],
				}
			})
		},

		onSearchCallBackFn(obj) {
			this.searchObj = obj;
			this.appSelectFn(true);
		},
		onSelect(item, index) {

			this.addInvoiceShow = false;
			switch (item.value) {
				case 'QRcode':

					break;
				case 'camera':

					break;
				case 'picture':

					break;
				case 'PDF':

					break;
			}
		},
		// 添加图片后，返回图片压缩结果，类型是file
		onAfterReadFn(file, item) {

			this.compressFilesFn(file).then(resolve => {
				this.addInvoiceShow = false;
				// resolve.file : 单张时是Object，多张时是Array 
				// resolve.type : true：单张；false：多张
				this.collectInvoiceFn(resolve,'file');
			});

		},
		/**
		 * [collectInvoiceFn 图片归集接口]
		 * @param  {[type]} filesRes   [压缩后的图片对象，不仅仅是包含file对象，还有base64]
		 * @param  {String} paramsType [上传方式：base、file]
		 * @return {[type]}            []
		 */
		collectInvoiceFn(filesRes, paramsType = 'base64') {
			let fd = '',
				data = {};
			if (paramsType == 'base64') {
				data = { picture: filesRes.file.base64.split(',')[1] }
			} else if (paramsType == 'file') {
				data = new FormData();
				if (filesRes.type) {
					data.append('files', filesRes.file.file);
				} else {
					filesRes.file.forEach(file => {
						data.append('files', filesRes.file.file);
					})
				}
			}

			this.axios({
				url: httpApi.app.collectInvoice,
				file: paramsType == 'base64' ? false : true,
				data
			}).then(resolve => {
				if (!resolve.code) {
					if (resolve.data.length > 1) {
						// 混扫
						this.goDetailFn(resolve.data, 0, true);
					} else {
						// 单张
						this.goDetailFn(resolve.data.invoice[0], true);
					}

				}

			})
		},

		onOversize() {
			this.$toast({
				message: `文件大小不能超过 ${this.maxSize/1000}M`,
				duration: 1500,
			});
		},
		deleteInvoiceFn(item, index) {
			this.axios({
				url: httpApi.app.deleteInvoice,
				data: {
					uuid: item.uuid
				}
			}).then(resolve => {
				console.log(99, resolve);
				if (resolve.status) {
					this['listData_' + this.active].splice(index, 1)
				}
			}).catch(reject => {
				console.log(98, reject);
			});

		}

	},

}
</script>
<style>
/*@import '../../common/css/index.css';
@import '../../common/css/list.css';*/
</style>