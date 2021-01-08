import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
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
		// 发票类
		invoiceCodeClass: {
			majioAddTaxValue: ['01', '03'], // 专用增值税类型、机动车销售统一发票
			trainAndAirRoadWater: ['90', '93', '92', '87', '88', '89'], // 火车票、飞机行程单、公路、水路、其他客票
			normalAddTaxValue: ['04', '10', '11', '14'], // 普通增值税类型
			taxiAndQuota: ['51', '91', '94', '95', '97', '98'], // 出租车、定额发票等其他发票
			transportAddTaxValue: "02", // 货物运输业增值税普通发票
			otherValue: '00', // 其他
			ZZSInvoiceCodes: ['01', '02', '03', '04', '10', '11', '14'], // 所有增值税
		},
		// 供详情页面左右滑动的列表
		detailList:[]
	},
	mutations: {
		getDetailListFn(state,list){
			state.detailList = list;
		}
	},
	actions: {},
	modules: {}
})