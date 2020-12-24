<template>
	<div class="formData">
		<template v-for='item in showOptions'>
			<van-field v-model="formData[item][item]" label-width='100' :label="formData[item].label" :placeholder="formData[item].placeholder" :rules="[{ required: true, }]" clearable required />
			
		</template>

	</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
	name: '',
	mixins: [],
	components: {},
	props: {
		showOptions:{
			type:Array,
			default:[],
		}
	},
	data() {
		return {
			formData: {
				invoiceCode: {
					label:'发票代码',
					code: '发票代码',
					invoiceCode: '', //发票代码
					placeholder: '请输入发票代码',
				},
				invoiceNo: {
					label:'发票号码',
					number: '发票号码',
					invoiceNo: '', //发票号码
					placeholder: '请输入发票号码',
				},
				invoiceDate: {
					label:'开票日期',
					date: '开票日期',
					invoiceDate: '', //开票日期
					placeholder: '请选择开票日期',
				},
				invoiceDateTime: {
					label:'开票日期时间',
					dateTime: '开票日期时间',
					invoiceDateTime: '', //开票日期时间//显示用
					placeholder: '请选择开票日期时间',
				},
				verifyCode: {
					label:'校验码',
					checkCode: '校验码',
					verifyCode: '', //校验码后6位
					placeholder: '请输入校验码后6位',
				},
				buyerName: {
					label:'购买方',
					buyName: '购买方',
					buyerName: '', //购买方名称
					placeholder: "请输入购买方",
				},
				goodsName: {
					label:'货物或应税劳务',
					goods: '货物或应税劳务',
					goodsName: '', //货物或应税劳务
					placeholder: '请输入货物或应税劳务',
				},
				fare: {
					label:'票价',
					fareLabel: '票价',
					fare: '', //航空行程单 票价
					placeholder: '最多11位数字(含小数点后2位)',
				},
				caacDevelopmentFund: {
					label:'民航发展基金',
					caacDevelopmentFundLabel: '民航发展基金',
					caacDevelopmentFund: '', //航空行程单 民航发展基金
					placeholder: '最多11位数字(含小数点后2位)',
				},
				fuelSurcharge: {
					label:'燃油附加费',
					fuelSurchargeLabel: '燃油附加费',
					fuelSurcharge: '', //航空行程单 燃油附加费
					placeholder: '最多11位数字(含小数点后2位)',
				},
				totalAmount: {
					label:'票面金额',
					taxCount: '票面金额', // 票面金额 合计金额
					totalAmount: '', //发票金额、金额
					placeholder: '最多11位数字(含小数点后2位)',
				},
				invoiceAmount: {
					label:'金额',
					notTax: '金额', // 金额(不含税)
					invoiceAmount: '', //不含税价
					placeholder: '最多11位数字(含小数点后2位)',
				},
				realAmount: {
					label:'实报金额',
					realAmountName: '实报金额',
					realAmount: '',
					placeholder: '',
				},
				taxRate: {
					label:'税率',
					rate: '税率',
					taxRate: '',
					placeholder: '请输入税率',
				},
				taxAmount: {
					label:'税额',
					amount: '税额',
					taxAmount: '',
					placeholder: '请输入税额',
				},
				salerName: {
					label:'销售方',
					saleName: '销售方',
					salerName: '', //销售方名称
					placeholder: '请输入销售方',
				},
				remark: {
					label:'备注',
					remarkName: '备注',
					remark: '', //备注
				},
				reimbursementNote: {
					label:'报销说明',
					reimburseRemark: '报销说明',
					reimbursementNote: '', //报销说明
					placeholder: '请输入报销说明',
				},
				invoiceCount: {
					label:'附件张数',
					enclosure: '附件张数',
					invoiceCount: '', //附件张数
					placeholder: '最多4位数字',
				},
				departCity: {
					label:'出发',
					startCity: '出发',
					departCity: '', //出发城市
					placeholder: '请输入出发城市',
				},
				arriveCity: {
					label:'到达',
					endCity: '到达',
					arriveCity: '', //到达城市
					placeholder: '请输入到达城市',
				},
				trainNumber: {
					label:'车次',
					trainNumberName: '车次/班次',
					trainNumber: '', //车次、班次
					placeholder: '请输入车次',
				},
				seatLevel: {
					label:'座位等级',
					seatLevelText: '座位等级',
					seatLevel: '', //座位等级
					placeholder: '请输入座位等级',
				},
				riderValue: {
					label:'乘坐人',
					riderName: '乘坐人',
					riderValue: '',
					placeholder: '请输入乘坐人',
				},
				idNumber: {
					label:'证件号',
					idName: '证件号',
					idNumber: '',
					placeholder: '请输入证件号后4位',
				},
				startDate: {
					label:'出发时间',
					startDateName: '出发时间',
					startDate: '', //出发时间
					placeholder: '请选择出发时间',
				},
				endDate: {
					label:'到达时间',
					endDateName: '到达时间',
					endDate: '', //到达时间
					placeholder: '请输入到达时间',
				},
			},
			photo: '图片',
			photoValue: '', //图片src base64
			photoUrl: '', //压缩后图片base64
			bigPhotoSrc: '', //放大图片url
			airNumberName: '班次',
			placeholder: '请输入班次',

			checkState: '0', //查验状态
			checkStateStr: '查验状态', //查验状态str

			reimburseState: '',
			reimburseStateStr: '报销状态',
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
	},
	methods: {


	},

};
</script>
<style scoped="scoped">
</style>