// 需要渲染的发票类型相关字段配置
export default {
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

		{ key: 'totalAmount', required: true, label: '总金额' },
		{ key: 'totalNum', required: true, label: '总张数' },
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
}