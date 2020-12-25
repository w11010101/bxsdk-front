<template>
	<div class="detail">
		<!-- 发票类型 和 发票图片 -->
		<div class="detail-header">
			<div class='detail-header-bg'>
				<van-row type="flex" justify="space-between">
					<van-col span='18'>
						<div class='select-invoice' @click='selectInvoiceFn'>{{getInvoiceTypeText(activeInvoiceType.invoiceTypeCode)}}
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
		<div class='check-status'>
			查验结果：<span>查验成功</span>
		</div>
		<!-- 表单 -->
		<div class='detail-form'>
			<van-form @submit="onSubmit" :validate-first='true'>
				<FormDataItem :showOptions='showOptions'></FormDataItem>
				<!--  -->
				<!-- <van-uploader :before-read="beforeRead" multiple /> -->
				<!--  -->
				<div class='form-submit'>
					<van-button block color='#229FFF' native-type="submit">保存</van-button>
				</div>
			</van-form>
		</div>
		<!-- 发票选择 -->
		<van-popup v-model="selectInvoiceShow" position="bottom" :style="{ height: '50%' }" get-container="body" >
			<van-picker show-toolbar :columns="invoiceType" @confirm="onConfirm" @cancel="onCancel" />
		</van-popup>
		<!-- 图片浏览 -->
		<van-image-preview v-model="previewShow" :images="images" :showIndex="false" @change="onpPreviewImgChange"></van-image-preview>
	</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import FormDataItem from '@/components/formDataItem'
import { uploadFileFn, getInvoiceTypeText } from '@/common/js/common.js';

export default {
	name: '',
	mixins: [],
	components: {
		FormDataItem
	},
	props: {},
	data() {
		return {
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

			// 要渲染的表单字段
			showOptions: [
				{ key: 'invoiceCode', required: true },
				{ key: 'invoiceNo', required: true },
				{ key: 'invoiceDate', required: true, type: 'date' },

				{ key: 'buyerName', required: false },
				{ key: 'goodsName', required: false },
				{ key: 'salerName', required: false },
				{ key: 'taxRate', required: false, unit: '%' },

				{ key: 'fare', required: true },
				{ key: 'invoiceAmount', required: true },
				{ key: 'deductTaxAmount', required: true },
				{ key: 'reimbursementNote', required: true },
				{ key: 'sourceFile', required: false },
				{ key: 'files', required: false, type: 'files' },

			],

			// 压缩有的图片集合
			uploadFileList: [],

		}
	},
	computed: {
		...mapState(['invoiceType']),
	},
	watch: {
		selectInvoiceShow(newVal, oldVal) {
			this.selectState = newVal
		}
	},
	created() {},
	mounted() {
		this.formatInvoiceOption()

	},
	methods: {
		// 格式化发票类型
		formatInvoiceOption() {
			this.invoiceType.forEach(item => {
				item.text = item.invoiceTypeName
				this.localInvoiceType.push(item)
			})
		},
		selectInvoiceFn() {
			this.selectState = false;
			this.selectInvoiceShow = true;
		},
		onConfirm(item) {
			console.log(item)
			this.activeInvoiceType = item;
			this.selectInvoiceShow = false;
		},
		onCancel() {

		},
		previewImgFn() {
			this.previewShow = true;
		},
		onpPreviewImgChange() {

		},
		// 发票保存
		onSubmit() {

		},
		// vant上传组件
		beforeRead(files) {
			console.log(0, files)
			let that = this;
			uploadFileFn(files).then(resolve => {
				console.log(3, resolve)
			})
		},
		// 发票类型转换
		getInvoiceTypeText

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
	font-size: 14px;
	border-bottom: 1px solid #ddd;
	box-sizing: border-box;
}

.check-status span {}

.check-status span.check-success {
	color: #52C41A;
}

.check-status span.check-fail {
	color: #FF3737;
}

.detail-form {
	position: absolute;
	width: 100%;
	top: 140px;
	bottom: 0;
	left: 0;
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
</style>