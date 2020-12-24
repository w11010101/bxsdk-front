<template>
	<div class="detail">
		<!-- 发票类型 和 发票图片 -->
		<div class="detail-header">
			<div class='detail-header-bg'>
				<van-row type="flex" justify="space-between">
					<van-col span='16'>
						<div class='select-invoice' @click='selectInvoiceFn'>{{activeInvoiceType.text}}
							<van-icon name="arrow-down" class='select-arrow-down' :class='{"select-arrow-down-focus":selectState}' />
						</div>
					</van-col>
					<van-col span='8'>
						<van-image width="80" height="80" lazy-load src="https://img.yzcdn.cn/vant/cat.jpeg" @click='previewImgFn' />
					</van-col>
				</van-row>
			</div>
		</div>
		<!-- 表单 -->
		<div>
			<van-form @submit="onSubmit" :validate-first='true'>
				<van-field v-model="formData.invoiceCode" name="发票代码" label="发票代码" placeholder="请输入发票代码" :rules="[{ required: true, }]" clearable required />
				<van-field v-model="formData.invoiceNo" name="发票号码" label="发票号码" placeholder="请输入发票号码" :rules="[{ required: true, }]" clearable required />
				<van-field readonly clickable name="calendar" :value="formData.invoiceDate" label="开票日期" placeholder="点击选择开票日期" @click="showCalendar = true" />
				<FormData :showOptions='showOptions'></FormData>
				<!--  -->
				<van-uploader :before-read="beforeRead" multiple />
				<div style="margin: 16px;">
					<van-button block type="info" native-type="submit">保存</van-button>
				</div>
			</van-form>
		</div>
		<!-- 发票选择 -->
		<van-popup v-model="selectInvoiceShow" position="bottom" :style="{ height: '40%' }">
			<van-picker show-toolbar :columns="invoiceType" @confirm="onConfirm" @cancel="onCancel" />
		</van-popup>
		<!-- 开票日期 -->
		<van-popup v-model="showCalendar" position="bottom" :style="{ height: '40%' }">
			<van-datetime-picker v-model="currentDate" type="date" :min-date="minDate" :max-date="maxDate" @confirm='selectDateFn' />
		</van-popup>
		<!-- 图片浏览 -->
		<van-image-preview v-model="previewShow" :images="images" :showIndex="false" @change="onpPreviewImgChange"></van-image-preview>
	</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import FormData from '@/components/formData'
import common from '@/common/js/common.js';

export default {
	name: '',
	mixins: [],
	components: {
		FormData
	},
	props: {},
	data() {
		return {
			activeInvoiceType: {
				text: "发票选择"
			},
			selectState: false,
			selectInvoiceShow: false,
			localInvoiceType: [],
			previewShow: false,
			images: [
				require('../../assets/logo.png'),
			],
			formData: {
				invoiceCode: "",
				invoiceNo: "",
				invoiceDate: "",
			},
			showCalendar: false,
			minDate: new Date(2020, 0, 1),
			maxDate: new Date(2025, 10, 1),
			currentDate: new Date(),

			showOptions: [ // 要渲染的表单字段
				'invoiceCode',
				'invoiceNo',
				'buyerName',
				'goodsName',
				'fare',
			],
			ZZSshowOptions: [ // 增值税发票票 要渲染的表单字段
				'invoiceCode',
				'invoiceNo',
				'buyerName',
				'goodsName',
				'fare',
			],
			uploadFileList:[]
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
		this.localInvoiceType = this.invoiceType.map(item => {
			item.text = item.invoiceTypeName;
			return item;
		})
	},
	methods: {
		selectInvoiceFn() {
			this.selectState = false;
			this.selectInvoiceShow = true;
			console.log(123)
		},
		onConfirm(item) {
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
		// 开票日期选择
		selectDateFn(date) {
			console.log(date)
			this.formData.invoiceDate = new Date(date).toLocaleDateString()
			this.showCalendar = false;
		},
		// 
		beforeRead(files) {
			console.log('files = ', files);
			console.log('common.compress = ', common.compress);

			let that = this;
			// 上传
			this.uploadFileFn(files).then(resolve => {
				console.log(3, resolve)
			})
		},
		async uploadFileFn(files) {
			let _files = await this.forEachFiles(files);
			console.log(1,_files)
			let uploaded = await this.uploadFn(_files);
			return uploaded;
		},
		// 循环压缩
		forEachFiles(files){
			return new Promise((res, reject) => {
				
				res(files.map(file => {
					return this.compressFileFn(file).then(resolve => {
						console.log(5,resolve)
						return resolve;
					});
					
					// let fr = new FileReader();
					// fr.readAsDataURL(file);
					// fr.onloadend = function(img) {
					// 	let imgObj = new Image();
					// 	imgObj.src = this.result;
					// 	imgObj.onload = function() {
					// 		// compress 图片压缩 
					// 		let data = common.compress(imgObj);
					// 		let _file = common.base64ToFile(data,file.name);
					// 		console.log(_file);
					// 		res(_file);
					// 	}

					// }

				}));
			})
			
		},
		// 文件压缩和转换
		compressFileFn(file) {
			return new Promise((resolve, reject) => {
				let fr = new FileReader();
				fr.readAsDataURL(file);
				fr.onloadend = function(img) {

					let imgObj = new Image();
					imgObj.src = this.result;
					imgObj.onload = function() {
						// compress 图片压缩 
						let data = common.compress(imgObj);
						let _file = common.base64ToFile(data,file.name);
						resolve(_file);
					}

				}
			})
		},
		
		uploadFn(files) {
			// axios
			console.log(2, files);
			// files.forEach(file=>{
			// 	file.then(res=>{
			// 		console.log(4,res)
			// 	})
			// })
			return new Promise((resolve, reject) => {
				console.log('finish')
				resolve('finish')
			})
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
	font-size: 14px;
	line-height: 80px;
	color: #595959;
}

.select-arrow-down {
	transition: all .3s ease;
}

.select-arrow-down-focus {
	transform: rotateX(180deg);
}
</style>