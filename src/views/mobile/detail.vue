<template>
	<div class="detail">
		<!-- 发票类型 和 发票图片 -->
		<div class="detail-header">
			<div class='detail-header-bg'>
				<van-row type="flex" justify="space-between">
					<van-col span='18'>
						<div class='select-invoice' @click='changeInvoiceTypeFn'>{{getInvoiceTypeText(localData.invoiceTypeCode)}}
							<van-icon name="arrow-down" class='select-arrow-down' :class='{"select-arrow-down-focus":selectState}' />
						</div>
					</van-col>
					<van-col span='6'>
						<van-image class='detail-header-img' width="60" height="60" lazy-load src="https://img.yzcdn.cn/vant/cat.jpeg" @click='previewImgFn' />
					</van-col>
				</van-row>
			</div>
		</div>
		<!-- 查验状态 -->
		<div class='check-status' :class='localData.checkState!="2"?"check-success":"check-fail"' v-if='localData.checkState!="0"'>
			<van-icon name="checked" v-if='localData.checkState!="2"' />
			<van-icon name="clear" v-else />
			查验结果(<span>{{getCheckStateFn(localData.checkState)}}</span>)
		</div>
		<!-- 表单 -->
		<div class='detail-form'>
			<!-- :rules="" -->
			<van-form :validate-first='true' @failed='onFailedFn' ref='formData'>
				<!-- formData 分类：增票类、费增票（火车，飞机，定额，等） -->
				<template v-if='localData.invoiceTypeCode == "92"'>
					<FormDataItem :showOptions='trainShowOptions' :data='localData' :key='localData.uuid+new Date().getTime()' :isReadOnly='isReadOnly' @onBlurFn='onBlurFn'></FormDataItem>
				</template>
				<template v-else-if='localData.invoiceTypeCode == "91"'>
					<FormDataItem :showOptions='taxiShowOptions' :data='localData' :key='localData.uuid+new Date().getTime()' :isReadOnly='isReadOnly' @onBlurFn='onBlurFn'></FormDataItem>
				</template>
				<template v-else-if='invoiceCodeClass.normalAddTaxValue.includes(localData.invoiceTypeCode)'>
					<FormDataItem :showOptions='normalAddTaxValueShowOptions' :key='localData.uuid+new Date().getTime()' :data='localData' :isReadOnly='isReadOnly' @onBlurFn='onBlurFn'></FormDataItem>
				</template>
				<template v-else>
					<FormDataItem :showOptions='showOptions' :data='localData' :key='localData.uuid+new Date().getTime()' :isReadOnly='isReadOnly' @onBlurFn='onBlurFn'></FormDataItem>
				</template>
				<div class='form-submit'>
					<van-button block color='#229FFF' @click='onSubmitFn' v-if='validateState'>保存</van-button>
					<van-button block color='#ccc' @click='onSubmitFn' v-else>保存</van-button>
					<!-- <van-button block color='#229FFF'>返回</van-button> -->
					<!-- <van-button block color='#229FFF' native-type="submit">保存</van-button> -->
				</div>
			</van-form>
		</div>
		<!-- 发票选择 -->
		<van-popup v-model="selectInvoiceShow" position="bottom" :style="{ height: '50%' }" get-container="body">
			<van-picker show-toolbar :columns="invoiceType" @confirm="onConfirm" @cancel="onCancel" />
		</van-popup>
		<!-- 图片浏览 -->
		<van-image-preview v-model="previewShow" :images="images" :showIndex="false" @change="onpPreviewImgChangeFn"></van-image-preview>
	</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import FormDataItem from '@/components/formDataItem'
import { uploadFileFn, getInvoiceTypeText, invoiceCodeClass, getCheckStateFn } from '@/common/js/common.js';
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
			images: [
				require('../../assets/logo.png'),
			],
			...config,
			// // 要渲染的表单字段
			// showOptions: [
			// 	{ key: 'invoiceCode', required: true },
			// 	{ key: 'invoiceNo', required: true },
			// 	{ key: 'invoiceDate', required: true, type: 'date' },

			// 	{ key: 'buyerName', required: false },
			// 	{ key: 'goodsName', required: false },
			// 	{ key: 'salerName', required: false },
			// 	{ key: 'taxRate', required: false, unit: '%' },

			// 	{ key: 'fare', required: true },
			// 	{ key: 'invoiceAmount', required: true },
			// 	{ key: 'totalAmount', required: true },
			// 	{ key: 'deductTaxAmount', required: true },
			// 	{ key: 'reimbursementNote', required: true },
			// 	{ key: 'sourceFile', required: false },
			// 	{ key: 'files', required: false, type: 'files' },

			// ],
			// // 火车票
			// trainShowOptions: [

			// 	{ key: 'invoiceNo', required: true },
			// 	{ key: 'invoiceDate', required: true, type: 'date' },

			// 	{ key: 'departCity', },
			// 	{ key: 'arriveCity', },
			// 	{ key: 'trainNumber', },
			// 	{ key: 'riderValue', },
			// 	{ key: 'taxRate', required: false, unit: '%' },
			// 	{ key: 'idNumber' },
			// 	{ key: 'startDate' },
			// 	{ key: 'endDate' },
			// 	{ key: 'fare', required: true },
			// 	{ key: 'invoiceAmount', required: true },
			// 	{ key: 'deductTaxAmount', required: true },
			// 	{ key: 'reimbursementNote', required: true },
			// 	{ key: 'sourceFile', required: false },
			// 	{ key: 'files', required: false, type: 'files' },

			// ],
			// // 出租车
			// taxiShowOptions: [

			// 	{ key: 'totalAmount', required: true, label: '总金额' },
			// 	{ key: 'totalNum', required: true, label: '总张数' },
			// 	{ key: 'reimbursementNote', required: true },
			// 	{ key: 'sourceFile', required: false },
			// 	{ key: 'files', required: false, type: 'files' },

			// ],
			// // 普通增值税类型
			// normalAddTaxValueShowOptions: [
			// 	{ key: 'invoiceCode', required: true },
			// 	{ key: 'invoiceNo', required: true },
			// 	{ key: 'invoiceDate', required: true, type: 'date' },
			// 	{ key: 'verifyCode', },
			// 	{ key: 'deductTaxAmount', required: true },
			// 	{ key: 'reimbursementNote', },
			// 	{ key: 'sourceFile', required: false },
			// 	{ key: 'files', required: false, type: 'files' },
			// ],
			isReadOnly: false,
			// 压缩有的图片集合
			uploadFileList: [],
			// 
			list: [],
			invoiceCodeClass,
			initialSwipe: 0,
			activeUuid: '',
			rules: [],
			validateState: true
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
		console.log(5)
		for (let key in this.$route.params.item) {
			this.$set(this.localData, key, this.$route.params.item[key]);
		}
		this.detailListUuid.forEach((item, index) => {
			if (item == this.localData.uuid) {
				this.initialSwipe = index;
			}
		})
	},
	mounted() {
		console.log(6)
		this.findDetail(this.$route.params.item.uuid)
		// 左右滑动事件
		let zeptoEvent = this.$zepto('.detail.child-view');

		zeptoEvent.on('swipeLeft', (event) => {

			if (this.initialSwipe < this.detailListUuid.length - 1) {
				this.activeUuid = this.detailListUuid[++this.initialSwipe];
				this.findDetail(this.activeUuid);
			} else {
				this.$toast('已是最后一条');
			}
		});
		zeptoEvent.on('swipeRight', (event) => {

			if (this.initialSwipe > 0) {
				this.activeUuid = this.detailListUuid[--this.initialSwipe];
				this.findDetail(this.activeUuid);
			} else {
				this.$toast('已是第一条');
			}
		});


	},
	methods: {
		// 发票类型转换
		getInvoiceTypeText,
		// 获取查验结果
		getCheckStateFn,
		// 表单初始化验证
		formDataInitValidateFn() {
			// console.log(3,this.resetFormDataConfig)
			// let keys = Object.keys(this.resetFormDataConfig);
			// console.log(4,keys)
			// keys.forEach(key=>{
			// 	if(this.resetFormDataConfig[key].required){
			// 		this.rules.push(this.resetFormDataConfig[key].rules[0])
			// 	}
			// });
			// console.log(5,'rules = ',this.rules);

			this.$refs.formData.validate().then(state => {
				console.log('state = ', state);
				// this.validateState = true;
				// return false;
			}).catch(error => {
				console.log('error = ', error);
				// this.validateState = false;

			})
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
		// 弹窗 发票类型 确定
		onConfirm(item) {
			this.$set(this.localData, 'invoiceTypeCode', item.invoiceTypeCode);
			this.selectInvoiceShow = false;
		},
		// 弹窗 发票类型 取消
		onCancel() {
			this.selectInvoiceShow = false;
		},
		// 图片预览
		previewImgFn() {
			this.previewShow = true;
		},
		onpPreviewImgChangeFn() {

		},
		// 提交表单
		onSubmitFn() {
			let _this = this;
			console.log('onSubmitFn');
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
		onFailedFn() {
			console.log('表单验证失败');
			// this.$toast('表单验证失败');
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
			this.$route.back()
		},
		// 查询详情
		findDetail(uuid) {
			this.axios({
				url: httpApi.mobile.findDetail,
				data: {
					uuid,
				}
			}).then(resolve => {
				console.log('resolve = ', resolve.data);
				this.$set(this.$data, 'localData', resolve.data);
				this.formDataInitValidateFn()
			}).catch(reject => {

			});
		},
		onBlurFn() {
			this.formDataInitValidateFn()
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