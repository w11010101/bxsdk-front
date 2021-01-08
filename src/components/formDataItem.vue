<template>
	<div class="form-items">
		<!-- 可编辑 -->
		<template v-if='!isReadOnly'>
			<template v-for='(item,index) in showOptions'>
				<!-- 日期 -->
				<template v-if='item.type == "date"'>
					<van-field v-model="data[item.key]" label-width='100' :label="item.label||formData[item.key].label" :placeholder="formData[item.key].placeholder" :rules="formData[item.key].rules" clearable :required='formData[item.key].required' input-align='right' readonly @click='selectDateFn' :key='index' />
				</template>
				<!-- 附件 -->
				<template v-else-if='item.type == "files"'>
					<van-cell label-width='100' :title="item.label||formData[item.key].label" title-class='cell-label-style' :key='index'>
						<template #right-icon>
							<van-icon name="photo-o" size='24' color='#ccc'>
								<van-uploader v-model="fileList" class='upload-btn' multiple>
									<template #preview-cover="{ file }">
										<div class="preview-cover van-ellipsis">{{ file?file.name:null }}</div>
									</template>
								</van-uploader>
							</van-icon>
						</template>
					</van-cell>
				</template>
				<!-- 其他 -->
				<template v-else>
					<van-field v-model="data[item.key]" label-width='100' :label="item.label||formData[item.key].label" :placeholder="formData[item.key].placeholder" :rules="formData[item.key].rules" clearable :required='formData[item.key].required' input-align='right' :readonly='formData[item.key].readonly' :maxLength='formData[item.key].maxLength' @input='onInputFn(item.key)' :type='formData[item.key].type||"text"' :key='index' />
				</template>
			</template>
		</template>
		<!-- 只读 -->
		<template v-else>
			<!-- 附件 -->
			<template v-for='(item,index) in showOptions'>
				<template v-if='item.type == "files"'>
					<van-cell label-width='100' :title="item.label||formData[item.key].label" title-class='cell-label-style' :key='index'>
						<div class='readonly-fileList'>
							<div class='readonly-fileList-item' v-for='file in fileList'>
								<label class='van-ellipsis'>{{ file.split('.')[0] }}</label><span>.{{file.split('.')[1]}}</span>
							</div>
						</div>
					</van-cell>
				</template>
				<!-- 其他 -->
				<van-cell label-width='100' :title="item.label||formData[item.key].label" :key='index' :value='data[item.key]' title-class='cell-label-style' value-class='cell-value-style' v-else></van-cell>
			</template>
		</template>
		<!-- 开票日期 -->
		<van-popup v-model="calendarShow" position="bottom" :style="{ height: '50%' }" get-container="body">
			<van-datetime-picker v-model="currentDate" type="date" :min-date="minDate" :max-date="maxDate" @confirm='confirmFn' @cancel='onCancelFn' />
		</van-popup>
	</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { isToString, compress, base64ToFile, formatDate } from '@/common/js/common';
import { formData } from '@/common/js/formData';

export default {
	name: 'formDataItem',
	mixins: [],
	components: {},
	props: {
		showOptions: {
			type: Array,
			default: [],
		},
		isReadOnly: {
			type: Boolean,
			default: false,
		},
		data: {
			type: Object,
			default: {},
		},
		// index: {
		// 	type: Number,
		// 	default: 0,
		// }
	},
	data() {
		return {
			formData,
			// localFormData: {},
			photo: '图片',
			photoValue: '', //图片src base64
			photoUrl: '', //压缩后图片base64
			bigPhotoSrc: '', //放大图片url

			// 日期控件显示
			calendarShow: false,
			minDate: new Date(2017, 0, 1),
			maxDate: new Date(2030, 10, 1),
			currentDate: new Date(),
			// 
			fileList: [],


		}
	},
	computed: {
		...mapState(['invoiceType']),
	},
	watch: {
		fileList(newVal) {
			console.log(newVal)
		}
	},
	created() {},
	mounted() {
		let img1 = document.createElement("img");
		let img2 = document.createElement("img");

		img1.src = require('@/assets/E3767164-FC3A-49B2-9717-E131179E1291_1_105_c.jpeg');
		img2.src = require('@/assets/F7BD5EC2-58BF-4C13-8E93-D61808FAC18E_1_105_c.jpeg');

		let baseImg1 = compress(img1);
		let baseImg2 = compress(img2);
		setTimeout(() => {
			this.fileList.push({
				content: compress(img1),
				file: base64ToFile(baseImg1, 'E3767164-FC3A-49B2-9717-E131179E1291_1_105_c.jpeg'),
				message: "",
				status: ""
			});
			this.fileList.push({
				content: compress(img1),
				file: base64ToFile(baseImg2, 'F7BD5EC2-58BF-4C13-8E93-D61808FAC18E_1_105_c.jpeg'),
				message: "",
				status: ""
			});

		}, 2000);

		this.initFormDataItem();
		// this.voluationFormData();

		console.log(3, this.data);

	},
	methods: {
		isToString,

		// 初始化表单参数
		initFormDataItem() {
			let keys = Object.keys(this.formData);
			keys.forEach(k => {
				this.showOptions.forEach(item => {
					if (item.key == k) {
						if ('invoiceDate' == k) {
							this.$set(this.data, 'invoiceDate', formatDate(this.data.invoiceDate));
						}
						this.$set(this.formData[k], 'required', this.isReadOnly ? this.isReadOnly : item.required);
						// console.log(this.formData[k].rules)
						if (this.formData[k].rules) {
							this.$set(this.formData[k].rules[0], 'required', this.isReadOnly ? this.isReadOnly : item.required);
						}
					}
				});
			});
		},

		// 日期选择
		selectDateFn() {
			this.calendarShow = true;
		},
		// 开票日期选择
		confirmFn(date) {
			console.log(date)
			this.$set(this.data, 'invoiceDate', new Date(date).toLocaleDateString());
			this.calendarShow = false;
		},
		onCancelFn() {
			this.calendarShow = false;
		},
		// 表单正则输入验证 ,表单数据（data）、表单配置（formData）
		onInputFn(key) {
			if (this.formData[key].reg) {
				if (this.data[key]) {
					this.data[key] = this.data[key].replace(this.formData[key].reg, '$1');
				}
			}
		}
	},

};
</script>
<style scoped="scoped">
.form-items {
	position: absolute;
	width: 100%;
	top: 0;
	bottom: 50px;
	left: 0;
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;
}

.cell-label-style {
	text-align: left;
	color: #595959;
}

/* 附件 样式重置 */
.preview-cover {
	color: #595959;
	font-size: 12px;
	text-align: center;
	line-height: 20px
}

.cell-label-style {
	width: 100px;
	position: relative;
}

.cell-label-style+.van-icon {
	flex: 1;
}

.cell-value-style span {
	color: #595959;
}

.upload-btn {
	width: 100%;
}

.preview-cover {
	width: 70%;
	display: inline-block;
	text-align: right;
	padding-right: 10px
}

.van-icon-photo-o {
	display: inline-block;
	width: calc(100% - 50px);
}

.van-icon-photo-o::before {
	position: absolute;
	bottom: 0;
	right: 0;
}

.upload-btn /deep/ .van-uploader__wrapper {
	padding-bottom: 30px
}

.upload-btn /deep/ .van-image img {
	display: none;
}

.upload-btn /deep/ .van-uploader__preview-delete {
	position: static;
	background: none;
	display: inline-block;
	width: 30px;
	height: 20px;
	line-height: 20px;
	vertical-align: middle;
}

.upload-btn /deep/ .van-uploader__preview-delete-icon {
	transform: scale(1);
	position: static;
	width: 30px;
	height: 20px;
}

.upload-btn /deep/ .van-uploader__preview-delete i {
	float: left;
}

.upload-btn /deep/ .van-uploader__preview-delete i:before {
	content: '删除';
	font-size: 12px;
	height: 20px;
	color: #595959;
}

.upload-btn /deep/ .van-uploader__preview {
	width: 100%;
	margin: 0;
	text-align: right
}

.upload-btn /deep/ .van-uploader__preview-cover {
	position: static;
}

.upload-btn /deep/ .van-uploader__preview-image {
	width: calc(100% - 30px);
	display: inline-block;
	height: 20px;
	line-height: 20px;
	vertical-align: middle;
}

.upload-btn /deep/ .van-uploader__upload {
	height: 100%;
	width: 24px;
	height: 24px;
	margin: 0;
	float: right;
	position: absolute;
	right: 0;
	bottom: 0;
	z-index: 2;
	opacity: 0;
}

.readonly-fileList-item {
	display: flex;
	color: #595959;
}

.readonly-fileList-item>* {
	display: inline-block;
}

.readonly-fileList-item label {
	flex: 1;
}

.readonly-fileList-item span {
	min-width: 30px;
}

/* 附件 样式重置 end */
</style>