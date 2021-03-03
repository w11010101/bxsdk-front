<template>
	<div class="form-items">
		<!-- 可编辑 -->
		<template v-if='!isReadOnly'>
			<template v-for='(item,index) in showOptions'>
				<!-- 日期 -->
				<template v-if='item.type == "date"'>
					<van-field v-model="localItemData[item.key]" :name='item.key' label-width='100' :label="item.label||formDataConfig[item.key].label" :placeholder="formDataConfig[item.key].placeholder" :rules="formDataConfig[item.key].rules" clearable :required='formDataConfig[item.key].required' input-align='right' readonly @click='selectDateFn(item.key)' :key='index' />
				</template>
				<!-- formDataConfig[item.key].readonly -->
				<!-- 附件 -->
				<template v-else-if='item.type == "files"'>
					<van-cell label-width='100' :title="item.label||formDataConfig[item.key].label" title-class='cell-label-style' :key='index'>
						<div class='preview-imgs' v-for='(file,index) in fileList'>
							<div class='preview-img-name' @click='onClickPreviewFn(file,index)'>
								<van-icon name="photo" size='24' color='#595959' class='' /><span class='van-ellipsis'>{{file.file?file.file.name:file.fileName}}</span>
							</div>
							<van-button type='danger' size='mini' @click='onDeleteFileFn(file,index)'>删除</van-button>
						</div>
						<van-uploader v-model="fileList" class='upload-btn' :preview-image='false' :after-read='onAfterReadFn' multiple>
							<van-button size='small'>
								<van-icon name="photo-o" size='30' color='#595959' />
							</van-button>
						</van-uploader>
					</van-cell>
				</template>
				<template v-else-if='item.type == "state"'>
					<!-- 报销状态 -->
					<van-cell label-width='100' :title="item.label||formDataConfig[item.key].label" :key='index' :value='getReimburseStateFn(localItemData[item.key])' title-class='cell-label-style' value-class='cell-value-style' v-if='item.key == "reimburseState"'></van-cell>
				</template>
				<!-- 其他 -->
				<template v-else>
					<van-field v-model="localItemData[item.key]" :name='item.key' label-width='100' :label="item.label||formDataConfig[item.key].label" :placeholder="formDataConfig[item.key].placeholder" :rules="formDataConfig[item.key].rules" clearable :required='formDataConfig[item.key].required' input-align='right' :readonly='formDataConfig[item.key].readonly' :maxLength='formDataConfig[item.key].maxLength' :type='formDataConfig[item.key].type||"text"' :key='index' @focus='onFocusFn(item.key)' @input='onInputFn(item.key)' @blur='onBlurFn(item.key)' />
				</template>
			</template>
		</template>
		<!-- 只读 -->
		<template v-else>
			<template v-for='(item,index) in showOptions'>
				<!-- 货物或应税劳务 -->
				<van-collapse v-if='item.key == "goodsName"' v-model="activeCollapse" class='list-collapse readonly-style' :border='false'>
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
					<van-cell label-width='100' :title="item.label||formDataConfig[item.key].label" title-class='cell-label-style' :key='index'>
						<div class='preview-imgs' v-for='(file,index) in fileList'>
							<div class='preview-img-name' @click='onClickPreviewFn(file,index)'>
								<van-icon name="photo" size='24' color='#595959' class='' /><span>{{file.file?file.file.name:file.fileName}}</span>
							</div>
							<van-button type='danger' size='mini' @click='onDeleteFileFn(file,index)'>删除</van-button>
						</div>
						<van-uploader v-model="fileList" class='upload-btn' :preview-image='false' :after-read='onAfterReadFn' multiple>
							<van-button size='small'>
								<van-icon name="photo-o" size='30' color='#595959' />
							</van-button>
						</van-uploader>
					</van-cell>
				</template>
				<!-- 报销状态 -->
				<template v-else-if='item.type == "state"'>
					<van-cell label-width='100' class='readonly-style' :title="item.label||formDataConfig[item.key].label" :key='index' :value='getReimburseStateFn(localItemData[item.key])' title-class='cell-label-style' value-class='cell-value-style' v-if='item.key == "reimburseState"' :border='false'></van-cell>
				</template>
				<!-- 其他 -->
				<van-cell label-width='100' class='readonly-style' v-else :title="item.label||formDataConfig[item.key].label" :key='index' :value='localItemData[item.key]' title-class='cell-label-style' value-class='cell-value-style' :border='false'></van-cell>
			</template>
		</template>
		<!-- 开票日期 -->
		<van-popup v-model="calendarShow" position="bottom" :style="{ height: '50%' }" get-container="body">
			<van-datetime-picker v-model="currentDate" type="date" :min-date="minDate" :max-date="maxDate" @confirm='confirmFn' @cancel='onCancelFn' />
		</van-popup>
		<!-- 预览图片 -->
		<van-image-preview v-model="previewShow" :images="previewFileList" :start-position='previewIndex' :loop='false' @change='onPreviewChangeFn' />
	</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { isToString, compressFn, base64ToFileFn, formatDate, getCheckStateFn, getReimburseStateFn, inputDebounce, compressFilesFn } from '@/common/js/common';
import { formDataConfig } from '@/common/js/formDataConfig';
import httpApi from '@/common/js/httpApi.js'
let _VM;
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
			default: '0',
		},
	},

	data() {
		return {
			formDataConfig,
			// localFormData: {},
			photo: '图片',
			photoValue: '', //图片src base64
			photoUrl: '', //压缩后图片base64
			bigPhotoSrc: '', //放大图片url

			previewFileList: [], // 预览图片集合
			// 日期控件显示
			calendarShow: false,
			minDate: new Date(2017, 0, 1),
			maxDate: new Date(2030, 10, 1),
			currentDate: new Date(),
			currentType: '',
			// 
			fileList: [],
			localItemData: {},
			activeCollapse: [1],
			previewShow: false,
			loadedPreviewName: [],
			previewIndex: 0,
			activeFormKey: ''
		}
	},
	computed: {
		...mapState(['invoiceType']),
	},
	watch: {
		uuid() {
			// 由于传data是Object类型，可能导致表单数据无法重新刷新渲染，所以通过监听uuid的变化重置localData;
			this.resetLocalDataFn();
			this.initFormDataItem();
		}
	},
	created() {

	},
	mounted() {
		console.log('调用', this.showOptions);
		console.log('调用', this.isReadOnly);
		
		_VM = this;
		this.resetLocalDataFn();
		this.initFormDataItem();
	},
	methods: {
		...mapMutations(['setResetFormDataConfig']),
		isToString,
		getCheckStateFn,
		getReimburseStateFn,
		compressFilesFn,
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
			this.previewFilesFn(this.localItemData.files);
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
		onFocusFn(key) {
			this.activeFormKey = key;
		},
		// 表单正则输入验证 ,表单数据（data）、表单配置（ formDataConfig ） 调用输入防抖方法，当中的this无法使用，只能创建_VM
		onInputFn: inputDebounce(() => {
			let key = _VM.activeFormKey;
			if (_VM.formDataConfig[key].reg) {
				if (_VM.localItemData[key]) {
					_VM.localItemData[key] = _VM.localItemData[key].replace(_VM.formDataConfig[key].reg, '$1');
				}
			}
			console.log(_VM.localItemData[key])
			_VM.$emit('onInputFn', key, _VM.localItemData[key]);
		}, 1000),
		// // 表单正则输入验证 ,表单数据（data）、表单配置（ formDataConfig ）
		// onInputFn(key) {
		// 	if (this.formDataConfig[key].reg) {
		// 		if (this.localItemData[key]) {
		// 			this.localItemData[key] = this.localItemData[key].replace(this.formDataConfig[key].reg, '$1');
		// 		}
		// 	}
		// 	// 输入防抖
		// 	inputDebounce(() => {
		// 		console.log(this.localItemData[key])
		// 		this.$emit('onInputFn', key, this.localItemData[key])
		// 	}, 1000)();
		// },
		onBlurFn(key) {
			this.$emit('onBlurFn', key, this.formDataConfig[key])
		},
		// 添加图片后，返回图片压缩结果，类型是file
		onAfterReadFn(file, item) {

			console.log(file, item)
			this.compressFilesFn(file).then(resolve => {
				this.addInvoiceShow = false;
				console.log(3, resolve);
				this.fileList.forEach(file => {
					if (!file.fileName) {
						this.loadedPreviewName.push(file.file.name)
						this.previewFileList.push(file.content)
					}

				})
				console.log(5, this.fileList);
				console.log(6, this.loadedPreviewName);
				console.log(7, this.previewFileList)
				this.$emit('afterFileFn', resolve);

				// resolve.file : 单张时是Object，多张时是Array 
				// resolve.type : true：单张；false：多张
				// this.appCollectByPicFn(resolve);

			});

		},
		// 提前 获取附件预览图片
		previewFilesFn(files) {
			// 图片图片先用假图片做展示，当点击查看时，再用接口获取查看原图
			this.fileList = [];
			this.loadedPreviewName = []
			this.previewFileList = []
			if (!files) return;
			files.forEach(file => {
				// this.pushPreviewFileFn(file, true, index)
				let img = document.createElement("img");
				img.src = require('@/assets/logo.png');
				let baseImg = compressFn(img);
				setTimeout(() => {
					this.fileList.push({
						content: baseImg,
						file: base64ToFileFn(baseImg, file.fileName),
						message: "",
						status: "",
						fileName: file.fileName,
						filePath: file.filePath,
						id: file.id
					});
					this.previewFileList.push(file.content)
				}, 1000);

			});

		},
		// 点击查看预览图
		onClickPreviewFn(file, index, type = 'click') {
			console.log('查看预览图', arguments);
			if (type == 'click') {
				console.log(8, 'click')
				this.previewShow = true;
				this.previewIndex = index;
				console.log(5.2, this.fileList)
				console.log(6.2, this.loadedPreviewName)
				console.log(7.2, this.previewFileList)
			}

			if (this.loadedPreviewName.includes(file.file.name)) {
				console.log('有')
				console.log(5.1, this.fileList)
				console.log(6.1, this.loadedPreviewName);
				console.log(7.1, this.previewFileList);
				return;
			} else {
				// this.previewFileList = [];
				// this.previewFileList.push('');
				this.$set(this.previewFileList, index, '')
			}
			let fd = new FormData();
			fd.append('filePath', file.filePath);
			fd.append('fileName', file.fileName);


			this.axios({
				url: httpApi.previewFile,
				file: true,
				data: fd
			}).then(resolve => {
				console.log(resolve);
				if (!this.loadedPreviewName.includes(file.fileName)) {
					this.loadedPreviewName.push(file.fileName);
				}

				this.$set(this.previewFileList, index, resolve.data)
			})
		},
		// getPreviewFileFn(file, index) {
		// 	let fd = new FormData();
		// 	fd.append('filePath', file.filePath);
		// 	fd.append('fileName', file.fileName);

		// 	console.log(this.loadedPreviewName)
		// 	return this.axios({
		// 		url: httpApi.previewFile,
		// 		file: true,
		// 		data: fd
		// 	}).then(resolve => {
		// 		console.log(resolve);
		// 		this.loadedPreviewName.push(file.fileName);
		// 		this.$set(this.previewFileList, index, resolve.data)
		// 	})
		// },
		onDeleteFileFn(file, index) {
			console.log(file, index);
			if (this.loadedPreviewName.length) {
				this.loadedPreviewName = this.loadedPreviewName.filter(item => item.fileName == file.fileName);
				this.loadedPreviewName.splice(index, 1);

				console.log(1, this.loadedPreviewName)
				console.log(1, this.previewFileList)
				console.log(1, this.fileList)
				this.fileList.splice(index, 1);

			} else {
				this.fileList.splice(index, 1);
				console.log(2, this.fileList);

			}
			this.$emit('deleteFile', file)
		},
		// 预览图片切换到未获取的图片是，直接获取图片
		onPreviewChangeFn(index) {
			console.log(this.fileList)
			console.log(arguments);
			if (this.fileList[index].fileName) {
				this.onClickPreviewFn(this.fileList[index], index, 'change')
			}

		}

	},

};
</script>
<style scoped="scoped">
.readonly-style {
	line-height: 18px
}

.form-items {
	position: absolute;
	width: 100%;
	top: 0;
	bottom: 65px;
	left: 0;
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;
}

/* 附件 样式重置 */
.cell-label-style {
	text-align: left;
	color: #595959;
}

.cell-label-style+div {
	flex: 2;
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

/**/
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


.preview-imgs {
	margin: 5px 0;
}

.preview-imgs .preview-img-name {
	width: calc(100% - 50px);
	display: inline-block;
	line-height: 24px;
	vertical-align: bottom;
	margin-right: 10px;
}

.preview-imgs .preview-img-name .van-icon-photo {
	vertical-align: middle;
	margin-right: 5px
}

.preview-imgs .preview-img-name span {
	display: inline-block;
	max-width: calc(100% - 50px);
	vertical-align: middle;
}

.upload-btn button {
	border: 0;
	padding: 0;
}

/* 附件 样式重置 end */
</style>