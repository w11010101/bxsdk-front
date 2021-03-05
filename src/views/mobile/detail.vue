<template>
	<div class="detail">
		<!-- 发票类型 和 发票图片 -->
		<div class="detail-header">
			<div class='detail-header-bg'>
				<van-row type="flex" justify="space-between">
					<van-col span='18'>
						<div class='select-invoice' @click='changeInvoiceTypeFn'>{{transformInvoiceTypeTextFn(activeInvoiceType)}}
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
		<div class='check-status' :class='localData.checkState=="1"?"check-success":"check-fail"' v-if='VATsAllClass.includes(localData.invoiceTypeCode)'>
			<van-icon name="checked" v-if='localData.checkState=="1"' />
			<van-icon name="clear" v-else />
			查验结果(<span>{{getCheckStateFn(localData.checkState)}}{{validateState}}{{localDataList.length}}</span>)
		</div>
		<!-- 表单 -->
		<div class='detail-form'>
			<!--  -->
			<van-form @failed='onFailedFn' ref='formData' :show-error-message='false' :show-error='false'>
				<FormDataItem ref='formDataItem' v-if='showOptions.length' :showOptions='showOptions' :uuid='localData.uuid' :data='localData' :isReadOnly='isReadOnly' @onInputFn='onInputFn'  @onDateConfirmFn='onDateConfirmFn' @afterFileFn='onAfterFileFn' @deleteFile='onSaveDelFileFn'></FormDataItem>
				<div class='form-submit'>
					<van-row gutter='10'>
						<van-col span='6'>
							<van-button block color='#229FFF' native-type="button" @click='onShareFn'>分享</van-button>
						</van-col>
						<van-col :span='localDataList.length?12:18'>
							<!-- <template v-if='!localDataList.length && !requireState && validateState'>
								<van-button block color='#229FFF' @click='goBackFn'>返回</van-button>
							</template>
							<template v-else> -->
							<van-button block color='#229FFF' @click='onSubmitFn' v-if='validateState'>保存</van-button>
							<van-button block color='#ccc' @click='onSubmitFn' v-else>保存</van-button>
							<!-- </template> -->
						</van-col>
						<van-col span='6' v-if='localDataList.length'>
							<van-button block type='danger' native-type="button" @click='onDeleteFn'>删除</van-button>
						</van-col>
					</van-row>
				</div>
			</van-form>
		</div>
		<!-- 多张发票的表单（隐藏状态） -->
		<div class='detail-multiple-form' v-if='requireState'>
			<!-- {{localDataListShowOptions}} -->
			<div v-for='(item,index) in localDataList'>
				<van-form @failed='onFailedFn' :ref='"multipleFormData"+item.uuid' :show-error-message='false' :show-error='false'>
					<FormDataItem ref='formDataItem' :showOptions='localDataListShowOptions[index].showOption' :uuid='item.uuid' :data='item' :isReadOnly='isReadOnly'></FormDataItem>
				</van-form>
			</div>
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
		<!-- 详情提示 -->
		<div class='multiple-tips' v-if='tipsShowState' @click='changeTipsShowFn'>
			<img src="../../assets/tips.png" alt="">
		</div>
	</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import FormDataItem from '@/components/formDataItem'
import { invoiceCodeClass, getCheckStateFn, filterInvoiceClassFn, isToString } from '@/common/js/common.js';
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
			localDataList: [], // 归集多张时的数据集合
			localDataListValidateState: [], // 归集多张时，记录各个发票的校验状态
			localDataListShowOptions: [], // 归集多张时，记录各个发票类型的配置

			// 当前选择的发票类型
			activeInvoiceType: "01",
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
			showOptions: [], // 发票类型的配置
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
			deleteFileList: [],
			multipleTips: false, // 混扫的提示
			requireState: false, // 是否是归集状态

		}
	},
	computed: {
		...mapState(['invoiceType', 'detailListUuid', 'resetFormDataConfig', 'tipsShowState', 'listDateImgs']),
	},
	watch: {
		selectInvoiceShow(newVal, oldVal) {
			this.selectState = newVal;
		},
		initialSwipe(newVal, oldVal) {
			document.title = ++newVal + '/' + (this.localDataList.length||this.detailListUuid.length);
		}
	},
	created() {

	},
	beforeRouteLeave(to, from, next) {
		console.log(6, this.requireState);
		if (this.requireState) {
			this.$dialog.confirm({
				width: 300,
				message: '发票未保存，确定返回吗？',
				showCancelButton: true,
				closeOnPopstate: false,
				className: 'back-tips'
			}).then(() => {
				// on confirm
				next();
			}).catch(() => {
				// on cancel
				next(false);
			});

		} else {
			next();
		}
	},
	mounted() {
		this.formatInvoiceOptionFn();
		if (this.$route.query.uuid) {
			this.appFindFn(this.$route.query.uuid);
			return;
		}
		// item：发票信息；
		// index：发票对应下标；
		// require：是否是归集的（true/false）；
		let { item, require, multiple, index, } = { ...this.$route.params };
		console.log(100, item, require ? '归集' : '非归集', multiple ? '多张' : '单张', index);
		if (!item) {
			this.$router.back();
			return;
		}

		if (require) {
			this.requireState = require;
			// 归集
			if (multiple) {
				this.setTipsShowStateFn(true);
				// 多张
				this.multipleTips = true;
				item.invoice.forEach(invoice => {
					this.swipteListUuids.push(invoice.uuid);
				});
				// 归集发票的混扫情况，默认去第一条信息
				this.setDataFn(item.invoice[0]);
				this.onZeptoEventFn(require);
				// this.localDataList = item.invoice;
				// 归集多张时的状态存储，用于点击保存时的标点校验判断
				item.invoice.forEach(even => {
					console.log(2, even);
					this.localDataList.push(even);
					this.localDataListShowOptions.push({
						uuid: even.uuid,
						showOption: this.setShowOptionsFn(even.invoiceTypeCode)
					});
					console.log(3, "multipleFormData" + even.uuid)
					console.log(this.$refs["multipleFormData" + even.uuid])
					this.formDataInitValidateFn("multipleFormData" + even.uuid, (state) => {
						this.localDataListValidateState.push({
							uuid: even.uuid,
							validateState: state
						})
					})


				});
				document.title = '1/' + this.localDataList.length;
				console.log(4, this.$refs)
				this.$nextTick().then(() => {
					console.log(4, this.localDataListShowOptions)
					console.log(4, this.localDataListValidateState)
				});

			} else {
				// 单张

				this.setDataFn(item);
			}
		} else {
			// 非归集
			// document.title = ++newVal + '/' + (this.localDataList.length||this.detailListUuid.length);
			this.multipleTips = true;
			this.appFindFn(item.uuid);
			this.detailListUuid.forEach(item => {
				this.swipteListUuids.push(item);
			})
			this.onZeptoEventFn(require);
		}

		if (this.VATsAllClass.includes(item.invoiceTypeCode) && item.checkState === "1") {
			this.isReadOnly = true;
		}
	},
	methods: {
		...mapMutations(['setTipsShowStateFn', 'saveListDataImgsFn']),
		// 获取查验结果
		getCheckStateFn,
		// 过滤当前发票属于哪种类
		filterInvoiceClassFn,
		// 发票类型转换
		transformInvoiceTypeTextFn(code) {
			return this.invoiceType.filter(item => item.invoiceTypeCode == code)[0].invoiceTypeName;
		},
		// 设置当前显示的发票信息
		setDataFn(item) {
			this.localData = {};
			let keys = Object.keys(item);
			keys.forEach(key => {
				this.$set(this.localData, key, item[key]);
			});
			this.activeInvoiceType = item.invoiceTypeCode;

			this.showOptions = this.setShowOptionsFn(this.localData.invoiceTypeCode);

			this.$nextTick().then(() => {
				this.formDataInitValidateFn();
				if (this.localData.uuid) {

					this.getImg(this.localData.uuid);
				}
			});

		},
		// 表单初始化验证
		formDataInitValidateFn(refName = 'formData', callback) {
			let cb = callback || function() {};
			this.$nextTick().then(() => {
				console.log('表单初始化验证', refName, this.$refs[refName]);
				let ref = isToString(this.$refs[refName]) === 'Array' ? this.$refs[refName][0] : this.$refs[refName];
				console.log(5, refName, ref)
				ref.validate().then(state => {
					console.log(1);
					this.validateState = true;
					cb(true);
				}).catch(error => {
					console.log(2);
					if (isToString(error) == 'Array') {
						if (error.length) {
							this.validateState = false;
							cb(false);
						}
					} else {
						this.validateState = false;
						cb(false);
					}
				});
			})


		},
		// 格式化发票类型(下拉选择)
		formatInvoiceOptionFn() {
			this.invoiceType.forEach(item => {
				this.localInvoiceType.push({
					text: item.invoiceTypeName,
					code: item.invoiceTypeCode
				});
			})
		},
		// 修改发票类型
		changeInvoiceTypeFn() {
			this.selectState = false;
			this.selectInvoiceShow = true;
		},
		// 修改发票类型的弹窗确定方法
		onConfirm(item) {
			this.$set(this.localData, 'invoiceTypeCode', item.code);
			this.selectInvoiceShow = false;
			console.log(item)
			this.showOptions = this.setShowOptionsFn(item.code);
			this.activeInvoiceType = item.code;
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
				this.formDataInitValidateFn();
			});
		},
		// 提交表单
		onSubmitFn() {
			let _this = this;
			console.log(this.localDataList)
			this.formDataInitValidateFn();
			console.log('onSubmitFn', arguments);
			if (this.validateState) {
				this.invoiceComplianceCheckFn(this.localData)
			}

		},
		// 多张归集时，删除方法
		onDeleteFn() {
			
			let uuid = this.localData.uuid;
			console.log('多张归集时，删除方法',uuid);
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
			this.$router.go(-1);
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
			let baseImObj = this.listDateImgs.filter(item=>item.uuid == uuid);
			if(baseImObj.length){
				this.setBase64InvoiceImgFn(baseImObj[0].base64);
				return;
			}
			this.axios({
				url: httpApi.app.getImg,
				data: {
					uuid,
				},
				loading: false
			}).then(resolve => {
				if (resolve.status) {
					if (uuid === this.localData.uuid) {
						this.setBase64InvoiceImgFn('data:image/png;base64,' + resolve.data);
						this.saveListDataImgsFn({
							uuid,
							base64: 'data:image/png;base64,' + resolve.data
						});
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
				this.image = base64 || '';
				this.images.push(base64);
			} else {
				this.image = null;
				this.images = [];
			}

		},
		// 表单输入后赋值
		onInputFn(key, value) {
			console.log(7, key, value)
			this.$set(this.localData, key, value);

			this.formDataInitValidateFn();
		},
		// 日期类型选择
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
					console.log('left = ', this.initialSwipe, require, this.activeUuid, this.activeInvoiceType);

					if (!require) {

						this.appFindFn(this.activeUuid);
					} else {
						this.activeInvoiceType = this.localDataList[this.initialSwipe].invoiceTypeCode;
						this.setDataFn(this.localDataList[this.initialSwipe]);

					}
					this.showOptions = this.setShowOptionsFn(this.localData.invoiceTypeCode);
					this.image = null;
					this.images = [];
				} else {
					this.$toast('已是最后一条');
				}
			});
			zeptoEvent.on('swipeRight', (event) => {

				if (this.initialSwipe > 0) {

					this.activeUuid = this.swipteListUuids[--this.initialSwipe];

					console.log('right = ', this.initialSwipe, require, this.activeUuid, this.activeInvoiceType);

					if (!require) {
						this.appFindFn(this.activeUuid);
					} else {
						this.activeInvoiceType = this.localDataList[this.initialSwipe].invoiceTypeCode;
						this.setDataFn(this.localDataList[this.initialSwipe]);
					}
					this.showOptions = this.setShowOptionsFn(this.localData.invoiceTypeCode);
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
			console.log(invoiceTypeCode)
			// this.showOptions = [];
			if (this.VATGClass.includes(invoiceTypeCode)) {
				// console.log('增值税专用发票、机动车销售统一发票、货运运输业增值税专用发票')
				return this.VATGOptions;
			} else if (this.VATSElectcClass.includes(invoiceTypeCode)) {
				// console.log('增值税普通发票、增值税普通发票(电子)、增值税普通发票(卷式)、增值税电子普通发票(通行费)')
				return this.VATSElectcOption;
			} else if (this.aviationClass.includes(invoiceTypeCode)) {
				// console.log('航空')
				return this.aviationShowOptions;
			} else if (this.taxiClass.includes(invoiceTypeCode)) {
				// console.log('出租车票')
				return this.taxiShowOptions;
			} else if (this.trainAndRealNameClass.includes(invoiceTypeCode)) {
				// console.log('火车票、公路、水路、其他（实名）')
				return this.trainAndRealNameShowOptions;
			} else if (this.carClass.includes(invoiceTypeCode)) {
				// console.log('汽车票')
				return this.carShowOptions;
			} else if (this.QCGClass.includes(invoiceTypeCode)) {
				// console.log('定额发票、通用、政府非税收')
				return this.QCGShowOptions;
			} else if (invoiceTypeCode === "00") {
				// console.log('其他')
				return this.otherShowOptions;
			} else {
				return [];
				// console.log('匹配失败',invoiceTypeCode)
			}

		},
		// 发票查验
		invoiceComplianceCheckFn() {
			this.localData.invoiceDate = this.localData.invoiceDate.replace(/\-/g, '')
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
		// 分享类型选择
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
		// 删除附件
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
		},
		// 隐藏全局状态的左右滑动提示
		changeTipsShowFn() {
			this.setTipsShowStateFn(false);
		}

	},

};
</script>
<style scoped="scoped" src='../../common/css/detial.css'>
</style>