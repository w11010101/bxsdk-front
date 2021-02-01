import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	token:'',
	state: {
		invoiceType: [
			{ "invoiceTypeName": "增值税专用发票", "invoiceTypeCode": "01" },
			{ "invoiceTypeName": "增值税普通发票", "invoiceTypeCode": "04" },
			{ "invoiceTypeName": "增值税普通发票(电子)", "invoiceTypeCode": "10" },
			{ "invoiceTypeName": "增值税普通发票(卷式)", "invoiceTypeCode": "11" },
			{ "invoiceTypeName": "增值税电子普通发票(通行费)", "invoiceTypeCode": "14" },
			{ "invoiceTypeName": "机动车销售统一发票", "invoiceTypeCode": "03" },
			{ "invoiceTypeName": "货运运输业增值税专用发票", "invoiceTypeCode": "02" },

			{ "invoiceTypeName": "出租车票", "invoiceTypeCode": "91" },
			{ "invoiceTypeName": "火车票", "invoiceTypeCode": "92" },
			{ "invoiceTypeName": "航空客运电子客票行程单", "invoiceTypeCode": "90" },
			{ "invoiceTypeName": "公路运输客票(实名）", "invoiceTypeCode": "89" },
			{ "invoiceTypeName": "水路运输客票(实名)", "invoiceTypeCode": "88" },
			{ "invoiceTypeName": "其他运输客票(实名)", "invoiceTypeCode": "87" },
			{ "invoiceTypeName": "汽车票", "invoiceTypeCode": "94" },
			{ "invoiceTypeName": "定额发票", "invoiceTypeCode": "95" },
			{ "invoiceTypeName": "通用机打发票", "invoiceTypeCode": "97" },
			{ "invoiceTypeName": "政府非税收收入一般缴款书", "invoiceTypeCode": "98" },
			{ "invoiceTypeName": "其他", "invoiceTypeCode": "00" }
		],
		
		// 供详情页面左右滑动的列表
		detailListUuid:[],
		// 根据发票类型重置必填项后的
		resetFormDataConfig:{}
	},
	mutations: {
		saveToken(state,token){
			state.token = token;
			localStorage.setItem('token',token)
		},
		getDetailListUuidFn(state,list){
			state.detailListUuid = list;
		},
		setResetFormDataConfig(state,object){
			state.resetFormDataConfig = object;
		}
	},
	actions: {},
	modules: {}
})