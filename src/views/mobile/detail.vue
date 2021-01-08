<template>
	<div class="detail">
		<van-swipe class="my-swipe" indicator-color="white" ref='detailSwipe' :initial-swipe='initialSwipe' :show-indicators='false' :loop='false'>
			<van-swipe-item v-for='(item,index) in list' :key='index'>
				<!-- 发票类型 和 发票图片 -->
				<div class="detail-header">
					<div class='detail-header-bg'>
						<van-row type="flex" justify="space-between">
							<van-col span='18'>
								<div class='select-invoice' @click='selectInvoiceFn'>{{getInvoiceTypeText(item.invoiceTypeCode)}}
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
					<van-form :validate-first='true' @failed='onFailedFn' ref='formData'>
						<!-- formData 分类：增票类、费增票（火车，飞机，定额，等） -->
						<template v-if='item.invoiceTypeCode == "92"'>
							<FormDataItem :showOptions='trainShowOptions' :data='item' :index='index' :isReadOnly='isReadOnly'></FormDataItem>
						</template>
						<template v-if='item.invoiceTypeCode == "91"'>
							<FormDataItem :showOptions='taxiShowOptions' :data='item' :index='index' :isReadOnly='isReadOnly'></FormDataItem>
						</template>
						<template v-else-if='invoiceCodeClass.normalAddTaxValue.includes(item.invoiceTypeCode)'>
							<FormDataItem :showOptions='normalAddTaxValueShowOptions' :data='item' :index='index' :isReadOnly='isReadOnly'></FormDataItem>
						</template>
						<template v-else>
							<FormDataItem :showOptions='showOptions' :data='item' :index='index' :isReadOnly='isReadOnly'></FormDataItem>
						</template>
						<div class='form-submit'>
							<van-button block color='#229FFF' @click='onSubmitFn'>保存</van-button>
							<!-- <van-button block color='#229FFF'>返回</van-button> -->
							<!-- <van-button block color='#229FFF' native-type="submit">保存</van-button> -->
						</div>
					</van-form>
				</div>
			</van-swipe-item>
		</van-swipe>
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
import { uploadFileFn, getInvoiceTypeText, invoiceCodeClass } from '@/common/js/common.js';
import { exampleData, exampleData1 } from '@/common/js/formData';
export default {
	name: '',
	mixins: [],
	components: {
		FormDataItem
	},
	props: {},
	data() {
		return {
			localData:{

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
				{ key: 'totalAmount', required: true },
				{ key: 'deductTaxAmount', required: true },
				{ key: 'reimbursementNote', required: true },
				{ key: 'sourceFile', required: false },
				{ key: 'files', required: false, type: 'files' },

			],
			// 火车票
			trainShowOptions: [

				{ key: 'invoiceNo', required: true },
				{ key: 'invoiceDate', required: true, type: 'date' },

				{ key: 'departCity', },
				{ key: 'arriveCity', },
				{ key: 'trainNumber', },
				{ key: 'riderValue', },
				{ key: 'taxRate', required: false, unit: '%' },
				{ key: 'idNumber' },
				{ key: 'startDate' },
				{ key: 'endDate' },
				{ key: 'fare', required: true },
				{ key: 'invoiceAmount', required: true },
				{ key: 'deductTaxAmount', required: true },
				{ key: 'reimbursementNote', required: true },
				{ key: 'sourceFile', required: false },
				{ key: 'files', required: false, type: 'files' },

			],
			// 出租车
			taxiShowOptions: [

				{ key: 'totalAmount', required: true ,label:'总金额'},
				// { key: 'totalNum', required: true ,label:'总张数'},
				{ key: 'reimbursementNote', required: true },
				{ key: 'sourceFile', required: false },
				{ key: 'files', required: false, type: 'files' },

			],
			// 普通增值税类型
			normalAddTaxValueShowOptions: [
				{ key: 'invoiceCode', required: true },
				{ key: 'invoiceNo', required: true },
				{ key: 'invoiceDate', required: true, type: 'date' },
				{ key: 'verifyCode', },
				{ key: 'deductTaxAmount', required: true },
				{ key: 'reimbursementNote', },
				{ key: 'sourceFile', required: false },
				{ key: 'files', required: false, type: 'files' },
			],
			isReadOnly: false,
			// 压缩有的图片集合
			uploadFileList: [],
			// 
			list: [],
			invoiceCodeClass,
			initialSwipe:0

		}
	},
	computed: {
		...mapState(['invoiceType', 'detailList']),
	},
	watch: {
		selectInvoiceShow(newVal, oldVal) {
			this.selectState = newVal
		}
	},
	created() {},
	mounted() {
		this.formatInvoiceOptionFn()
		this.$set(this.$data,'list',this.detailList);
		
		this.$nextTick().then(()=>{
			console.log(13, this.$refs.formData[this.$route.params.index]);
			// console.log(13, this.$refs.formData[this.$route.params.index].validateAll())
			
		})
		this.changeSwipeIndexFn(this.$route.params.index);

	},
	methods: {
		// 从详情来切换到对应的index
		changeSwipeIndexFn(index){
			this.initialSwipe = index;
		},
		// 格式化发票类型
		formatInvoiceOptionFn() {
			this.invoiceType.forEach(item => {
				item.text = item.invoiceTypeName;
				this.localInvoiceType.push(item);
			})
		},
		selectInvoiceFn() {
			this.selectState = false;
			this.selectInvoiceShow = true;
		},
		onConfirm(item) {
			console.log(item);
			// this.
			// this.activeInvoiceType = item;
			this.selectInvoiceShow = false;
		},
		onCancel() {

		},
		previewImgFn() {
			this.previewShow = true;
		},
		onpPreviewImgChangeFn() {

		},
		// 表单验证成功
		onSubmitFn() {
			let _this = this;
			console.log('onSubmitFn');
			if (this.isReadOnly) {
				_this.$router.back();
			} else {
				this.$toast({
					message: '保存成功',
					onClose() {
						_this.$router.back();
					}
				});
			}


		},
		// 表单验证失败
		onFailedFn() {
			console.log('onFailedFn');
			this.$toast('表单验证失败');
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
		getInvoiceTypeText,

		goBackFn() {
			this.$route.back()
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

.my-swipe {
	height: 100%;

	/*height: 100vh;*/
}
</style>