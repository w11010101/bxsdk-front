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
						<!-- <img class='detail-header-img detail-thumbnail-image' :src="image" alt=""> -->
						<van-image class='detail-header-img' width="60" height="60" :src="image" @click='previewImgFn'>
							<template v-slot:loading>
								<van-loading type="spinner" size="20" />
							</template>
						</van-image>
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
				<FormDataItem ref='formDataItem' v-if='showOptions.length' :showOptions='showOptions' :uuid='localData.uuid' :data='localData' :isReadOnly='isReadOnly' @onInputFn='onInputFn' @onBlurFn='onBlurFn' @onDateConfirmFn='onDateConfirmFn' @afterFileFn='onAfterFileFn' @deleteFile='onSaveDelFileFn'></FormDataItem>
				<!--  -->
				<div class='form-submit'>
					<van-row gutter='10'>
						<van-col span='6'>
							<van-button block color='#229FFF' @click='onShareFn'>分享</van-button>
						</van-col>
						<van-col span='18'>
							<template v-if='localData.checkState ==="1"'>
								<van-button block color='#229FFF' @click='goBackFn'>返回</van-button>
							</template>
							<template v-else>
								<van-button block color='#229FFF' @click='onSubmitFn' v-if='validateState'>保存</van-button>
								<van-button block color='#ccc' @click='onSubmitFn' v-else>保存</van-button>
							</template>
						</van-col>
					</van-row>
				</div>
			</van-form>
		</div>
		<!-- 发票选择 -->
		<van-popup v-model="selectInvoiceShow" position="bottom" get-container="body">
			<van-picker show-toolbar :columns="localInvoiceType" @confirm="onConfirm" @cancel="onCancel" />
		</van-popup>
		<!-- 图片浏览 -->
		<van-image-preview class='detial-preview-box' v-model="previewShow" :images="images" :showIndex="false">
			<van-loading type="spinner" size="20" />
		</van-image-preview>
		<!-- 分享面板（旧） -->
		<van-dialog v-model="shareDialogShow" class='share-dialog' :show-confirm-button='false' :close-on-click-overlay='true' width='240'>
			<van-button color='#229FFF' @click='onQRCodeFn'>二维码</van-button><br>
			<van-button color='#229FFF'>好友分享</van-button>
		</van-dialog>
		<van-dialog v-model="QRCodeShow" class='share-dialog-QRCode' :show-confirm-button='false' :close-on-click-overlay='true' width='128'>
			<van-loading v-if='!qrcode' />
			<div id='QRCode-box'></div>
		</van-dialog>
		<!-- 分享面板（新） -->
		<van-share-sheet v-model="showShare" title="立即分享给好友" :options="shareOptions" @select="onShareSelectFn" />
	</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import FormDataItem from '@/components/formDataItem'
import { getInvoiceTypeTextFn, invoiceCodeClass, getCheckStateFn, filterInvoiceClassFn, isToString } from '@/common/js/common.js';
import httpApi from '@/common/js/httpApi.js'
import { formDataConfig } from '@/common/js/formDataConfig';
import config from '@/common/js/config'

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
			image: null,
			images: [],
			uploadfiles: [], // 上传的附件base64
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
			showOptions: [],
			shareDialogShow: false,
			showShare: false,
			shareOptions: [
				[
					{ name: '微信', icon: 'wechat' },
					{ name: '朋友圈', icon: 'wechat-moments' },
					{ name: '微博', icon: 'weibo' },
					{ name: 'QQ', icon: 'qq' },
				],
				[
					{ name: '复制链接', icon: 'link' },
					{ name: '分享海报', icon: 'poster' },
					{ name: '二维码', icon: 'qrcode' },
					{ name: '小程序码', icon: 'weapp-qrcode' },
				],
			],
			QRCodeShow: false,
			qrcode: null,
			deleteFileList: []
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
		if (this.$route.query.uuid) {
			this.appFindFn(this.$route.query.uuid);
			return;
		}

		// item：发票信息；
		// index：发票对应下标；
		// require：是否是请求的（true/false）；
		let { item, index, require } = { ...this.$route.params };
		console.log(item, index, require)
		if (!item ) {
			this.$router.back()
			return;
		}
		if (index != void 0) { // 如果index 不等于 undefined,表明是从详情进来的，就可以左右切换
			console.log('混扫 或 详情', item.invoice);
			this.swipteListUuids = [];
			// if (isToString(item) == 'Array') {

				if (!require) { // 非归集
					this.appFindFn(item[index].uuid);
					this.detailListUuid.forEach(item => {
						this.swipteListUuids.push(item);
					})
				} else {
					item.invoice.forEach(invoice => {
						this.swipteListUuids.push(invoice.uuid);
					});
					// 归集发票的混扫情况，默认去第一条信息
					this.setDataFn(item.invoice[0]);
				}

			// } else {
			// 	this.detailListUuid.forEach(item => {
			// 		this.swipteListUuids.push(item);
			// 	});
			// 	this.activeUuid = item.uuid;
			// 	this.appFindFn(item.uuid);
			// }
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
				if (this.localData.uuid) {

					this.getImg(this.localData.uuid);
				}
			});

		},
		// 表单初始化验证
		formDataInitValidateFn(key = '') {
			console.log('表单初始化验证', this.$refs.formData);

			this.$refs.formData.validate().then(state => {
				this.validateState = true;
			}).catch(error => {
				if (isToString(error) == 'Array') {
					if (error.length) {
						this.validateState = false;
					}
				} else {
					this.validateState = false;
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

		},
		// 表单验证失败
		onFailedFn(item) {
			console.log('表单验证失败', item);
			if (item.errors.length) {
				this.$toast(item.errors[0].message);
			}

		},
		// // vant上传组件
		// beforeRead(files) {
		// 	let that = this;
		// 	uploadFileFn(files).then(resolve => {
		// 		console.log(3, resolve)
		// 	})
		// },
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
		getImg(uuid) {
			this.axios({
				url: httpApi.app.getImg,
				data: {
					uuid,
				},
				loading: false
			}).then(resolve => {
				if (resolve.status) {
					if(uuid === this.localData.uuid){
						this.setBase64InvoiceImgFn('data:image/png;base64,' + resolve.data);
					}
				} else {
					this.setBase64InvoiceImgFn();
				}

			}).catch(reject => {
				this.$toast('发票图片加载失败');
				this.image = '';
			});
		},
		// 
		setBase64InvoiceImgFn(base64) {
			this.images = [];
			if (base64) {
				this.image = base64||'';
				this.images.push(base64);
			} else {
				this.image = null;
				this.images = [];
			}

		},
		onInputFn(key, value) {
			this.$set(this.localData, key, value);
			this.formDataInitValidateFn(key);
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
					this.image = null;
					this.images = [];
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
					this.image = null;
					this.images = [];
				} else {
					this.$toast('已是第一条');
				}
			});
		},
		// 根据类型区分表单显示字段
		setShowOptionsFn(invoiceTypeCode) {
			this.isReadOnly = this.localData.checkState === '1' ? true : false;

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
			this.localData.invoiceDate = this.localData.invoiceDate.replace(/\-/g,'')
			this.axios({
				url: httpApi.app.invoiceComplianceCheck,
				data: this.localData
			}).then(resolve => {
				if (resolve.status) {
					this.$toast('查验成功');
					this.updateInvoiceFn(this.localData);
				} else {
					this.$toast(resolve.message);
				}
			}).catch(reject => {
				if (isToString(reject) === 'Object' && !reject.status) {
					this.$toast(reject.message);
				}
			});
		},
		// 发票保存或更新
		updateInvoiceFn(data) {
			if (this.uploadfiles.length) {
				this.uploadFileFn();
			}
			if (this.deleteFileList.length) {
				this.deleteInvoiceFilesFn()
			}
			this.axios({
				url: httpApi.app.updateInvoice,
				data
			}).then(resolve => {
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
				if (isToString(reject) === 'Object' && !reject.status) {
					this.$toast(reject.message);
				}
			});
		},
		// 上传附件接口
		uploadFileFn() {
			let data = new FormData();
			data.append('uuid', this.localData.uuid);
			this.uploadfiles.forEach(file => {
				data.append('files', file);
			})
			this.axios({
				url: httpApi.uploadFile,
				file: true,
				data
			}).then(resolve => {

			}).catch(reject => {
				this.$toast(reject.message);
			});
		},
		// 分享
		onShareFn() {
			this.shareDialogShow = true;
			// this.showShare = true;
		},
		onShareSelectFn(option) {
			this.$toast(option.name);
			this.showShare = false;
		},
		// 生成二维码
		onQRCodeFn() {
			this.QRCodeShow = true;
			let href = window.location.href + '?uuid=' + this.localData.uuid;
			if (this.qrcode) {
				this.qrcode.clear();
				this.qrcode.makeCode(href); // 生成另外一个二维码
			} else {
				setTimeout(() => {
					this.qrcode = new QRCode("QRCode-box", {
						text: href,
						width: 128,
						height: 128,
						colorDark: "#000000",
						colorLight: "#ffffff",
						correctLevel: QRCode.CorrectLevel.H
					});
				}, 500)
			}


		},
		// 附件选择后的回调
		onAfterFileFn({ file }) {
			if (isToString(file) == 'Array') {
				file.forEach(item => {
					this.uploadfiles.push(item.file)
				})
			} else {
				this.uploadfiles.push(file.file)
			}
		},
		// 删除附件时，过滤原本可能新增加的文件
		onSaveDelFileFn(file) {
			this.deleteFileList.push(file.id);
			this.$set(this.$data, 'uploadfiles', this.uploadfiles.filter(item => !this.deleteFileList.includes(item.id)));
		},
		// 删除附件接口
		deleteInvoiceFilesFn(id) {

			let deleteFilePromise = [];
			this.deleteFileList.forEach(item => {
				deleteFilePromise.push(this._deleteInvoiceFilesFn(item))
			});
			this.$axios.all(deleteFilePromise.map(promiseItem => {
				return promiseItem.catch(reject => {
					return reject;
				});
			})).then(resolve => {

			}).catch(rejcet => {
				this.$toast(reject.message);
			})
		},
		// 删除附件接口
		_deleteInvoiceFilesFn(id) {
			return this.axios({
				url: httpApi.app.deleteInvoiceFiles,
				data: {
					ids: id
				}
			})
		}

	},

};
</script>
<style scoped="scoped" src='../../common/css/detial.css'>
</style>