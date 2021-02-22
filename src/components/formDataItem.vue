<template>
	<div class="form-items">
		<!-- 可编辑 -->
		<template v-if='!isReadOnly'>
			<template v-for='(item,index) in showOptions'>
				<!-- 日期 -->
				<template v-if='item.type == "date"'>
					<van-field v-model="localItemData[item.key]" :name='item.key' label-width='100' :label="item.label||formDataConfig[item.key].label" :placeholder="formDataConfig[item.key].placeholder" :rules="formDataConfig[item.key].rules" clearable :required='formDataConfig[item.key].required' input-align='right' :readonly='formDataConfig[item.key].readonly' @click='selectDateFn(item.key)' :key='index' />
				</template>
				<!-- 附件 -->
				<template v-else-if='item.type == "files"'>
					<van-cell label-width='100' :title="item.label||formDataConfig[item.key].label" title-class='cell-label-style' :key='index'>
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
				<template v-else-if='item.type == "state"'>
					<!-- 报销状态 -->
					<van-cell label-width='100' :title="item.label||formDataConfig[item.key].label" :key='index' :value='getReimburseStateFn(localItemData[item.key])' title-class='cell-label-style' value-class='cell-value-style' v-if='item.key == "reimburseState"'></van-cell>
				</template>
				<!-- 其他 -->
				<template v-else>
					<van-field v-model="localItemData[item.key]" :name='item.key' label-width='100' :label="item.label||formDataConfig[item.key].label" :placeholder="formDataConfig[item.key].placeholder" :rules="formDataConfig[item.key].rules" clearable :required='formDataConfig[item.key].required' input-align='right' :readonly='formDataConfig[item.key].readonly' :maxLength='formDataConfig[item.key].maxLength' :type='formDataConfig[item.key].type||"text"' :key='index' @input='onInputFn(item.key)' @blur='onBlurFn(item.key)' />
				</template>
			</template>
		</template>
		<!-- 只读 -->
		<template v-else>
			<template v-for='(item,index) in showOptions'>
				<!-- 货物或应税劳务 -->
				<van-collapse v-if='item.key == "goodsName"' v-model="activeCollapse" class='list-collapse' :border='false'>
					<van-collapse-item :title="item.label||formDataConfig[item.key].label" :key='index' name="1" :value='localItemData.detailList?localItemData.detailList[0].goodsName:""'>
						<div class='collapse-content'>
							<van-row v-for='(todo,index) in localItemData.detailList'>
								<van-col span="10">
									<div v-if='index == 0'>名称</div>
									<div>{{todo.goodsName}}</div>
								</van-col>
								<van-col span="6">
									<div v-if='index == 0'>金额</div>
									<div>{{todo.noTaxAmount}}</div>
								</van-col>
								<van-col span="4">
									<div v-if='index == 0'>税率</div>
									<div>{{todo.taxRate+'%'}}</div>
								</van-col>
								<van-col span="4">
									<div v-if='index == 0'>税额</div>
									<div>{{todo.taxAmount}}</div>
								</van-col>
							</van-row>
						</div>
					</van-collapse-item>
				</van-collapse>
				<!-- 附件 -->
				<template v-else-if='item.type == "files"'>
					<van-cell label-width='100' :title="item.label||formDataConfig[item.key].label" title-class='cell-label-style' :key='index' :border='false'>
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
				<!-- 报销状态 -->
				<template v-else-if='item.type == "state"'>
					<van-cell label-width='100' :title="item.label||formDataConfig[item.key].label" :key='index' :value='getReimburseStateFn(localItemData[item.key])' title-class='cell-label-style' value-class='cell-value-style' v-if='item.key == "reimburseState"' :border='false'></van-cell>
				</template>
				<!-- 其他 -->
				<van-cell label-width='100' v-else :title="item.label||formDataConfig[item.key].label" :key='index' :value='localItemData[item.key]' title-class='cell-label-style' value-class='cell-value-style' :border='false'></van-cell>
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
import { isToString, compress, base64ToFile, formatDate, getCheckStateFn, getReimburseStateFn, inputDebounce } from '@/common/js/common';
import { formDataConfig } from '@/common/js/formDataConfig';

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
		uuid: {
			type: String,
			default: 0,
		}
	},

	data() {
		return {
			formDataConfig,
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
			currentType: '',
			// 
			fileList: [],
			localItemData: {},
			activeCollapse: [1]

		}
	},
	computed: {
		...mapState(['invoiceType']),
	},
	watch: {
		uuid() {
			// 由于传data是Object类型，可能导致表单数据无法重新刷新渲染，所以通过监听uuid的变化重置localData;
			this.resetLocalDataFn();
		}
	},
	created() {

	},
	mounted() {
		console.log('调用', this.showOptions);
		// let img1 = document.createElement("img");
		// let img2 = document.createElement("img");
		// img1.src = require('@/assets/E3767164-FC3A-49B2-9717-E131179E1291_1_105_c.jpeg');
		// img2.src = require('@/assets/F7BD5EC2-58BF-4C13-8E93-D61808FAC18E_1_105_c.jpeg');
		// let baseImg1 = compress(img1);
		// let baseImg2 = compress(img2);
		// setTimeout(() => {
		// 	this.fileList.push({
		// 		content: compress(img1),
		// 		file: base64ToFile(baseImg1, 'E3767164-FC3A-49B2-9717-E131179E1291_1_105_c.jpeg'),
		// 		message: "",
		// 		status: ""
		// 	});
		// 	this.fileList.push({
		// 		content: compress(img1),
		// 		file: base64ToFile(baseImg2, 'F7BD5EC2-58BF-4C13-8E93-D61808FAC18E_1_105_c.jpeg'),
		// 		message: "",
		// 		status: ""
		// 	});
		// }, 2000);

		this.resetLocalDataFn();
		this.initFormDataItem();
	},
	methods: {
		...mapMutations(['setResetFormDataConfig']),
		isToString,
		getCheckStateFn,
		getReimburseStateFn,
		// 初始化表单参数
		initFormDataItem() {
			let keys = Object.keys(this.formDataConfig);
			keys.forEach(k => {
				this.showOptions.forEach(item => {
					if (item.key == k) {
						if (item.type == 'date') {
							this.$set(this.localItemData, item.key, formatDate(this.localItemData[item.key]));
						}
						// 必填项根据config.js的自定义配置进行重新设置
						// 如果有 required 属性，则进行重新配置，如果没有 required 属性，则按照formDataConfig.js的默认配置
						if (item.required !== void 0) {
							if (this.formDataConfig[k].rules) {
								this.$set(this.formDataConfig[k].rules[0], 'required', item.required);
							}
							// 星号必填项标识
							this.$set(this.formDataConfig[k], 'required', this.isReadOnly ? this.isReadOnly : (item.required === void 0 ? this.formDataConfig[k].required : item.required));
						}
					}
				});
			});
			this.setResetFormDataConfig(this.formDataConfig);
		},
		resetLocalDataFn() {
			for (let key in this.data) {
				this.$set(this.localItemData, key, this.data[key] === void 0 || this.data[key] === null ? '' : this.data[key]);
			}
		},
		// 日期选择
		selectDateFn(type) {
			this.calendarShow = true;
			this.currentType = type;
		},
		// 日期选择
		confirmFn(date) {
			let key = this.currentType,
				value = formatDate(new Date(date).toLocaleDateString());
			this.$set(this.localItemData, key, value);
			this.calendarShow = false;
			this.$emit('onDateConfirmFn', key, value);
		},
		onCancelFn() {
			this.calendarShow = false;
		},
		// 表单正则输入验证 ,表单数据（data）、表单配置（ formDataConfig ）
		onInputFn(key) {
			if (this.formDataConfig[key].reg) {
				if (this.localItemData[key]) {
					this.localItemData[key] = this.localItemData[key].replace(this.formDataConfig[key].reg, '$1');
				}
			}
			inputDebounce(() => {
				this.$emit('onInputFn', key, this.localItemData[key])
			}, this.localItemData[key], 1000);

		},
		onBlurFn(key) {
			this.$emit('onBlurFn', key, this.formDataConfig[key])
		},
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
	vertical-align: top;
	width: 70%;
	display: inline-block;
	text-align: right;
	padding-right: 10px;
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

.list-collapse /deep/ .van-cell__title {
	text-align: left
}

.list-collapse /deep/ .van-collapse-item__content {
	padding: 0 !important;
}

.collapse-content {
	padding: 5px;
	background: #eee
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
	color: red;
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