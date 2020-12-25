<template>
	<div class="form-data">
		<template v-for='item in showOptions'>
			<!-- 日期 -->
			<template v-if='item.type == "date"'>
				<van-field v-model="formData[item.key].value" label-width='100' :label="formData[item.key].label" :placeholder="formData[item.key].placeholder" :rules="formData[item.key].rules" clearable :required='formData[item.key].required' input-align='right' readonly @click='selectDateFn' />
			</template>
			<!-- 附件 -->
			<template v-else-if='item.type == "files"'>
				<van-cell label-width='100' :title="formData[item.key].label" title-class='cell-label-style'>
					<template #right-icon>
						<van-icon name="photo-o" size='24' color='#ccc'>
							<van-uploader v-model="fileList" class='upload-btn' multiple>
								<template #preview-cover="{ file }">
									<div class="preview-cover van-ellipsis">{{ file.name }}</div>
								</template>
							</van-uploader>
						</van-icon>
					</template>
				</van-cell>
			</template>
			<!-- 其他 -->
			<template v-else>
				<van-field v-model="formData[item.key][item.key]" label-width='100' :label="formData[item.key].label" :placeholder="formData[item.key].placeholder" :rules="formData[item.key].rules" clearable :required='formData[item.key].required' input-align='right' :readonly='formData[item.key].readonly' :maxLength='formData[item.key].maxLength' @input='inputFn(formData[item.key])' :type='formData[item.key].type||"text"' />
			</template>
		</template>
		<!-- 开票日期 -->
		<van-popup v-model="calendarShow" position="bottom" :style="{ height: '50%' }" get-container="body" >
			<van-datetime-picker v-model="currentDate" type="date" :min-date="minDate" :max-date="maxDate" @confirm='confirmFn' @cancel='onCancelFn' />
		</van-popup>
	</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import { Toast } from 'vant'
import { formData } from '@/common/js/formData';
export default {
	name: '',
	mixins: [],
	components: {},
	props: {
		showOptions: {
			type: Array,
			default: [],
		}
	},
	data() {
		return {
			formData,
			photo: '图片',
			photoValue: '', //图片src base64
			photoUrl: '', //压缩后图片base64
			bigPhotoSrc: '', //放大图片url
			value: '班次',
			placeholder: '请输入班次',

			checkState: '0', //查验状态
			checkStateStr: '查验状态', //查验状态str

			reimburseState: '',
			reimburseStateStr: '报销状态',

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

	},
	created() {},
	mounted() {
		console.log(this.showOptions)
		let keys = Object.keys(this.formData);
		keys.forEach(k => {
			this.showOptions.forEach(item => {
				if (item.key == k) {
					this.$set(this.formData[k], 'required', item.required);
					if (this.formData[k].rules) {
						this.$set(this.formData[k].rules[0], 'required', item.required);
					}
				}
			})

		});
		console.log(this.formData)
	},
	methods: {
		selectDateFn() {
			console.log(12)
			this.calendarShow = true;
		},
		// 开票日期选择
		confirmFn(date) {
			console.log(date)
			this.$set(this.formData.invoiceDate, 'value', new Date(date).toLocaleDateString());
			this.calendarShow = false;
		},
		onCancelFn() {
			this.calendarShow = false;
		},
		// _this.replaceAndSetPosMoney(e.target,/\d+\.?\d{0,2}/,"")
		inputFn(item) {
			if (item.reg) {
				item.value = 123
				// item.value=item.value.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, '$1')
				// console.log(item.value.replace(/^\d*(\d*(?:\.\d{0,2})?).*$/g, '$1'))	
			}

		}
	},

};
</script>
<style scoped="scoped">
.form-data {
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

.upload-btn {
	width: 100%;
}

.preview-cover {
	text-align: right;
	padding-right: 10px
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

/* 附件 样式重置 end */
</style>