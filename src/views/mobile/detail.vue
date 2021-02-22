<template>
	<div class="detail">
		<!-- 发票类型 和 发票图片 -->
		<div class="detail-header">
			<div class='detail-header-bg'>
				<van-row type="flex" justify="space-between">
					<van-col span='18'>
						<div class='select-invoice' @click='changeInvoiceTypeFn'>{{getInvoiceTypeTextFn(localData.invoiceTypeCode)}}
							<van-icon name="arrow-down" class='select-arrow-down' :class='{"select-arrow-down-focus":selectState}' />
						</div>
					</van-col>
					<van-col span='6' class='detail-thumbnail-box'>
						<img class='detail-header-img detail-thumbnail-image' :src="image" alt="">
						<van-image class='detail-header-img' width="60" height="60" lazy-load :src="image" @click='previewImgFn' />
					</van-col>
				</van-row>
			</div>
		</div>
		<!-- 查验状态 -->
		<!-- v-if='localData.checkState!="0"&&VATsAllClass.includes(localData.invoiceTypeCode)' -->
		<div class='check-status' :class='localData.checkState!="2"?"check-success":"check-fail"' v-if='localData.checkState!="0"&&VATsAllClass.includes(localData.invoiceTypeCode)'>
			<van-icon name="checked" v-if='localData.checkState!="2"' />
			<van-icon name="clear" v-else />
			查验结果(<span>{{getCheckStateFn(localData.checkState)}}</span>)
		</div>
		<!-- 表单 -->
		<div class='detail-form'>
			<van-form @failed='onFailedFn' ref='formData' :show-error-message='false' :show-error='false'>
				<FormDataItem ref='formDataItem' v-if='showOptions.length' :showOptions='showOptions' :uuid='localData.uuid' :data='localData' :isReadOnly='isReadOnly' @onInputFn='onInputFn' @onBlurFn='onBlurFn' @onDateConfirmFn='onDateConfirmFn'></FormDataItem>
				<!--  -->
				<div class='form-submit'>
					<template v-if='localData.checkState ==="1"'>
						<van-button block color='#229FFF' @click='goBackFn'>返回</van-button>
					</template>
					<template v-else>
						<van-button block color='#229FFF' @click='onSubmitFn' v-if='validateState'>保存</van-button>
						<van-button block color='#ccc' @click='onSubmitFn' v-else>保存</van-button>
					</template>
				</div>
			</van-form>
		</div>
		<!-- 发票选择 -->
		<van-popup v-model="selectInvoiceShow" position="bottom" get-container="body">
			<van-picker show-toolbar :columns="localInvoiceType" @confirm="onConfirm" @cancel="onCancel" />
		</van-popup>
		<!-- 图片浏览 -->
		<van-image-preview v-model="previewShow" :images="images" :showIndex="false"></van-image-preview>
	</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import FormDataItem from '@/components/formDataItem'
import { uploadFileFn, getInvoiceTypeTextFn, invoiceCodeClass, getCheckStateFn, filterInvoiceClassFn, isToString } from '@/common/js/common.js';
import httpApi from '@/common/js/httpApi.js'
import { formDataConfig } from '@/common/js/formDataConfig';
import config from '@/common/js/config'
// import 'vant/lib/index.less';
export default {
	name: '',
	mixins: [],
	components: {
		FormDataItem
	},
	props: {},
	data() {
		return {
			...config,
			...invoiceCodeClass, // 发票类型分类
			localData: {

			},
			// 当前选择的发票类型
			activeInvoiceType: {
				invoiceTypeCode: "01"
			},
			localInvoiceType: [],
			selectState: false,
			selectInvoiceShow: false,
			// 图片预览图片
			previewShow: false,
			image: '',
			images: [],

			isReadOnly: false,
			// 压缩有的图片集合
			uploadFileList: [],
			// 
			list: [],

			initialSwipe: 0, // 左右滑动的下标
			activeUuid: '',
			rules: [],
			validateState: true,

			name: '',
			password: '',
			swipteListUuids: [], // 从vuex（首页列表数据）或混扫归集的列表中提取
			currentInvoiceClass: '', // 当前发票分类
			random: '',
			showOptions: []
		}
	},
	computed: {
		...mapState(['invoiceType', 'detailListUuid', 'resetFormDataConfig']),
	},
	watch: {
		selectInvoiceShow(newVal, oldVal) {
			this.selectState = newVal;
		}
	},
	created() {

	},
	mounted() {

		this.formatInvoiceOptionFn();
		// item：发票信息；
		// index：发票对应下标；
		// require：是否是请求的（true/false）；
		let { item, index, require } = { ...this.$route.params };
		console.log(item, index, require)
		if (index != void 0) { // 如果index 不等于 undefined,表明是从详情进来的，就可以左右切换
			console.log('混扫 或 详情', item);
			this.swipteListUuids = [];
			if (isToString(item) == 'Array') {

				if (!require) { // 非归集
					this.appFindFn(item[index].uuid);
					this.detailListUuid.forEach(item => {
						this.swipteListUuids.push(item);
					})
				} else {
					item.forEach(item => {
						this.swipteListUuids.push(item.uuid);
					});
					// 归集发票的混扫情况，默认去第一条信息
					this.setDataFn(item[0]);
				}

			} else {
				this.detailListUuid.forEach(item => {
					this.swipteListUuids.push(item);
				});
				this.activeUuid = item.uuid;
				this.appFindFn(item.uuid);

			}
			this.onZeptoEventFn(require);

		} else {
			console.log('单张', item, require)
			// 单张
			if (!require) {

				this.detailListUuid.forEach(item => {
					this.swipteListUuids.push(item);
				})
				this.appFindFn(item.uuid)
			} else {
				this.setDataFn(item);

			}
		}
		console.log(this.VATsAllClass)
		if (this.VATsAllClass.includes(item.invoiceTypeCode) && item.checkState === "1") {
			this.isReadOnly = true;
		}
	},
	methods: {
		// 发票类型转换
		getInvoiceTypeTextFn,
		// 获取查验结果
		getCheckStateFn,
		// 过滤当前发票属于哪种类
		filterInvoiceClassFn,
		setBase64Fn(base64) {
			this.images = [];
			if (base64) {
				this.image = base64;
				this.images.push(base64);
			} else {
				this.image = '';
				this.images = [];
			}

		},
		// 设置当前显示的发票信息
		setDataFn(item) {
			this.localData = {};
			let keys = Object.keys(item);
			keys.forEach(key => {
				this.$set(this.localData, key, item[key]);
			});
			this.setShowOptionsFn(this.localData.invoiceTypeCode);
			this.$nextTick().then(() => {
				this.formDataInitValidateFn();
				if (this.localData.uuid) this.getInvoiceImg(this.localData.uuid);
			});

		},
		// 表单初始化验证
		formDataInitValidateFn(key = '') {
			// this.currentInvoiceClass = this.filterInvoiceClassFn(this.localData.invoiceTypeCode);
			console.log('表单初始化验证', this.$refs.formData);
			// let keys = Object.keys(this.resetFormDataConfig);
			// keys.forEach(key => {
			// 	if (this.resetFormDataConfig[key].required) {
			// 		this.rules.push(this.resetFormDataConfig[key].rules[0])
			// 	}
			// });

			this.$refs.formData.validate().then(state => {
				// console.log('arguments = ', arguments);
				console.log('state = ', state);
				this.validateState = true;
			}).catch(error => {
				console.log('error = ', error);
				if (isToString(error) == 'Array') {
					if (error.length) {
						this.validateState = false;
					}
				} else {
					this.validateState = false;
					// console.log()
				}
			});

		},
		// 格式化发票类型
		formatInvoiceOptionFn() {
			this.invoiceType.forEach(item => {
				item.text = item.invoiceTypeName;
				this.localInvoiceType.push(item);
			})
		},
		// 修改发票类型
		changeInvoiceTypeFn() {
			this.selectState = false;
			this.selectInvoiceShow = true;
		},
		// 修改发票类型的弹窗确定方法
		onConfirm(item) {
			
			this.$set(this.localData, 'invoiceTypeCode', item.invoiceTypeCode);
			this.selectInvoiceShow = false;
			this.setShowOptionsFn(this.localData.invoiceTypeCode);
			this.onResetFormDataFn();

		},
		// 弹窗 发票类型 取消
		onCancel() {
			this.selectInvoiceShow = false;
		},
		// 图片预览
		previewImgFn() {
			this.previewShow = true;
		},
		// 修改发票类型时表单变化，并重置表单必填项和校验状态
		onResetFormDataFn() {
			this.$nextTick().then(() => {
				this.$refs.formDataItem.initFormDataItem();
				this.$refs.formData.resetValidation();
			});
		},
		// 提交表单
		onSubmitFn() {
			let _this = this;
			this.formDataInitValidateFn();
			console.log('onSubmitFn', arguments);
			if (this.validateState) {
				this.invoiceComplianceCheckFn(this.localData)
			}
			// this.$refs.formData.validate().then(state=>{
			// 	console.log('state = ',state)
			// })
			// if (this.isReadOnly) {
			// 	_this.$router.back();
			// } else {
			// 	this.$toast({
			// 		message: '保存成功',
			// 		onClose() {
			// 			_this.$router.back();
			// 		}
			// 	});
			// }

		},
		// 表单验证失败
		onFailedFn(item) {
			console.log('表单验证失败', item);
			if (item.errors.length) {
				this.$toast(item.errors[0].message);
			}

		},
		// vant上传组件
		beforeRead(files) {
			let that = this;
			uploadFileFn(files).then(resolve => {
				console.log(3, resolve)
			})
		},
		// 返回
		goBackFn() {
			this.$router.back()
		},
		// 查询详情
		appFindFn(uuid) {
			this.axios({
				url: httpApi.app.appFind,
				data: {
					uuid,
				}
			}).then(resolve => {
				// console.log('resolve = ', resolve.data);
				this.setDataFn(resolve.data)
				// 定位当前显示发票uuid的下标
				this.swipteListUuids.forEach((item, index) => {
					if (item == this.localData.uuid) {
						this.initialSwipe = index;
					}
				});
				// this.onResetFormDataFn();
			}).catch(reject => {

			});
		},
		// 获取发票图片
		getInvoiceImg(uuid) {
			this.axios({
				url: httpApi.app.getInvoiceImg,
				data: {
					uuid,
				}
			}).then(resolve => {
				// console.log('resolve = ', resolve);
				if (resolve.status) {
					this.setBase64Fn('data:image/png;base64,' + resolve.data);
				} else {
					this.setBase64Fn();
				}

			}).catch(reject => {

			});
		},
		onInputFn(key, value) {
			this.$set(this.localData, key, value);
			this.formDataInitValidateFn(key);
			console.log(5)
		},
		onBlurFn(key, config) {
			// this.formDataInitValidateFn();
		},
		onDateConfirmFn(key, value) {
			this.$set(this.localData, key, value);
			this.formDataInitValidateFn();
		},
		// 左右滑动事件
		onZeptoEventFn(require) {
			let zeptoEvent = this.$zepto('.detail.child-view');
			zeptoEvent.on('swipeLeft', (event) => {

				if (this.initialSwipe < this.swipteListUuids.length - 1) {

					this.activeUuid = this.swipteListUuids[++this.initialSwipe];
					console.log('left = ', this.initialSwipe, require, this.activeUuid);
					this.setShowOptionsFn(this.localData.invoiceTypeCode);
					if (!require) {
						this.appFindFn(this.activeUuid);
					}

				} else {
					this.$toast('已是最后一条');
				}
			});
			zeptoEvent.on('swipeRight', (event) => {

				if (this.initialSwipe > 0) {

					this.activeUuid = this.swipteListUuids[--this.initialSwipe];
					console.log('right = ', this.initialSwipe, require, this.activeUuid);
					this.setShowOptionsFn(this.localData.invoiceTypeCode);
					if (!require) {
						this.appFindFn(this.activeUuid);
					}

				} else {
					this.$toast('已是第一条');
				}
			});
		},
		// 根据类型区分表单显示字段
		setShowOptionsFn(invoiceTypeCode) {
			this.isReadOnly = this.localData.checkState === '1' ? true : false;
			console.log(12, invoiceTypeCode)
			this.showOptions = [];
			if (this.VATGClass.includes(invoiceTypeCode)) {
				// console.log('增值税专用发票、机动车销售统一发票、货运运输业增值税专用发票')
				this.showOptions = this.VATGOptions;
			} else if (this.VATSElectcClass.includes(invoiceTypeCode)) {
				// console.log('增值税普通发票、增值税普通发票(电子)、增值税普通发票(卷式)、增值税电子普通发票(通行费)')
				this.showOptions = this.VATSElectcOption;
			} else if (invoiceTypeCode === "90") {
				// console.log('航空')
				this.showOptions = this.aviationShowOptions;
			} else if (invoiceTypeCode === "91") {
				// console.log('出租车票')
				this.showOptions = this.taxiShowOptions;
			} else if (this.trainAndRealNameClass.includes(invoiceTypeCode)) {
				// console.log('火车票、公路、水路、其他（实名）')
				this.showOptions = this.trainAndRealNameShowOptions;
			} else if (invoiceTypeCode === "94") {
				// console.log('汽车票')
				this.showOptions = this.carShowOptions;
			} else if (this.QCGClass.includes(invoiceTypeCode)) {
				// console.log('定额发票、通用、政府非税收')
				this.showOptions = this.QCGShowOptions;
			} else if (invoiceTypeCode === "00") {
				// console.log('其他')
				this.showOptions = this.otherShowOptions;
			}
		},
		// 发票查验
		invoiceComplianceCheckFn() {
			console.log(90, this.localData);
			this.axios({
				url: httpApi.app.invoiceComplianceCheck,
				data: this.localData
			}).then(resolve => {
				console.log(99, resolve);
				if (resolve.status) {
					this.$toast('查验成功');
					this.updateInvoiceFn(this.localData);
				} else {
					this.$toast(resolve.message);
				}
			}).catch(reject => {
				console.log(98, isToString(reject), reject)
				if (isToString(reject) === 'Object' && !reject.status) {
					this.$toast(reject.message);
				}
			});
		},
		// 发票保存或更新
		updateInvoiceFn(data) {
			this.axios({
				url: httpApi.app.updateInvoice,
				data
			}).then(resolve => {
				console.log(99, resolve);
				if (resolve.status) {
					this.$toast({
						message: '保存成功',
						duration: 1000,
						onClose: () => {
							this.$router.back();
						}
					});
				} else {
					this.$toast(resolve.message);
				}
			}).catch(reject => {
				console.log(98, isToString(reject), reject)
				if (isToString(reject) === 'Object' && !reject.status) {
					this.$toast(reject.message);
				}
			});
		}

	},

};
</script>

<style scoped="scoped">
.detail {
	background: #F5F5F5;
}

.detail-header {
	height: 110px;
	background: #229FFF;
	padding: 15px;
	box-sizing: border-box;
}

.detail-header .detail-header-bg {
	background: #fff;
	height: 100%;
	border-radius: 5px;
}

.detail-thumbnail-box {
	position: relative;
}

.detail-thumbnail-image {
	width: 60px;
	height: 60px;
}

.detail-thumbnail-image+.detail-header-img {
	position: absolute;
	left: 0;
	opacity: 0;
}

.select-invoice {
	font-size: 16px;
	line-height: 80px;
	color: #595959;
}

.select-arrow-down {
	transition: all .3s ease;
}

.select-arrow-down-focus {
	transform: rotateX(180deg);
}

.van-form {
	height: 100%;
	position: relative;
}

.check-status {
	height: 30px;
	line-height: 30px;
	text-align: center;
	background: #fff;
	font-size: 13px;
	border-bottom: 1px solid #ddd;
	box-sizing: border-box;
}

.check-status .van-icon {
	vertical-align: middle;
	margin-top: -4px;
}

.check-success {
	color: #52C41A;
}

.check-fail {
	color: #FF3737;
}

.detail-form {
	position: absolute;
	width: 100%;
	top: 110px;
	bottom: 0;
	left: 0;
	min-height: 50px;
}

.check-status+.detail-form {
	top: 140px;
}

.form-submit {
	position: absolute;
	width: 100%;
	bottom: 0;

}

.detail-header-img {
	margin: 10px;
	border-radius: 4px;
	overflow: hidden;
}

.my-swipe {
	height: 100%;
}
</style>