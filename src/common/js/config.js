// 需要渲染的发票类型相关字段配置
export default {
	// 要渲染的表单字段(自定义)
	// key:对应接口返回字段
	// required：必填项，默认按照formDataConfig.js的配置
	// type：个别渲染组件
	// label：个性化修改表单名
	showOptions: [
		{ key: 'invoiceCode', required: true }, // 发票代码
		{ key: 'invoiceNo', required: true }, // 发票号码
		{ key: 'invoiceDate', required: true, type: 'date' }, // 开票日期
		{ key: 'buyerName', required: false }, // 购买方
		{ key: 'goodsName', required: false }, // 货物或应税劳务
		{ key: 'salerName', required: false }, // 销售方
		{ key: 'taxRate', required: false, unit: '%' }, // 税率
		{ key: 'fare', required: true }, // 票价
		{ key: 'invoiceAmount', required: true }, // 金额
		{ key: 'totalAmount', required: true }, // 票面金额
		{ key: 'deductTaxAmount', required: true }, // 可抵扣税额
		{ key: 'reimbursementNote', required: true }, // 报销说明
		{ key: 'sourceFile', required: false }, // 电子源文件
		{ key: 'files', required: false, type: 'files' }, // 附件

	],

	// 增值税专用发票、机动车销售统一发票、货运运输业增值税专用发票
	VATGOptions: [
		{ key: 'invoiceCode', required: true }, // 发票代码
		{ key: 'invoiceNo', required: true }, // 发票号码
		{ key: 'invoiceDate', required: true, type: 'date' }, // 开票日期
		{ key: 'totalAmount', required: true, label: '金额' }, // 金额

		{ key: 'reimbursementNote', }, // 报销说明
		{ key: 'checkState', type: 'state' }, // 查验状态
		{ key: 'reimburseState', type: 'state' }, // 报销状态

		{ key: 'sourceFile', required: false }, // 电子源文件
		{ key: 'files', type: 'files' }, // 附件

	],

	// 增值税普通发票、增值税普通发票(电子)、增值税普通发票(卷式)、增值税电子普通发票(通行费)
	VATSElectcOption: [
		{ key: 'invoiceCode', required: true }, // 发票代码
		{ key: 'invoiceNo', required: true }, // 发票号码
		{ key: 'invoiceDate', required: true, type: 'date' }, // 开票日期
		{ key: 'invoiceAmount', required: true, }, // 金额
		{ key: 'verifyCode', }, // 校验码

		{ key: 'reimbursementNote', }, // 报销说明
		{ key: 'checkState', type: 'state' }, // 查验状态
		{ key: 'reimburseState', type: 'state' }, // 报销状态

		{ key: 'sourceFile', required: false }, // 电子源文件
		{ key: 'files', type: 'files' }, // 附件

	],
	// 火车票、公路、水路、其他（实名）
	trainAndRealNameShowOptions: [

		{ key: 'invoiceNo', }, // 发票号码
		{ key: 'invoiceDate', type: 'date' }, // 开票日期

		{ key: 'riderValue', }, // 乘坐人
		{ key: 'idNumber', }, // 证件号
		{ key: 'trainNumber', }, // 车次/班次

		{ key: 'departCity', }, // 出发城市
		{ key: 'arriveCity', }, // 到达城市

		{ key: 'startDate' }, // 出发时间
		{ key: 'endDate' }, // 到达时间

		{ key: 'totalAmount', }, // 票面金额
		{ key: 'reimbursementNote' }, // 报销说明
		{ key: 'reimburseState', type: 'state' }, // 报销状态
		{ key: 'files', type: 'files' }, // 附件

	],
	// 航空客运机票
	aviationShowOptions: [
		{ key: 'invoiceCode', }, // 发票代码
		{ key: 'invoiceNo', }, // 发票号码
		{ key: 'invoiceDate', type: 'date' }, // 开票日期

		{ key: 'riderValue', }, // 乘坐人
		{ key: 'idNumber', }, // 证件号
		{ key: 'trainNumber', }, // 车次/班次

		{ key: 'departCity', }, // 出发城市
		{ key: 'arriveCity', }, // 到达城市

		{ key: 'startDate' }, // 出发时间
		{ key: 'endDate' }, // 到达时间

		{ key: 'fare', }, // 票价
		{ key: 'fuelSurcharge', }, // 燃油附加费
		{ key: 'caacDevelopmentFund', }, // 民航发展基金
		{ key: 'totalAmount', label: '合计金额' }, // 票面金额
		{ key: 'reimbursementNote' }, // 报销说明
		{ key: 'reimburseState', type: 'state' }, // 报销状态
		{ key: 'files', type: 'files' }, // 附件

	],
	// 出租车
	taxiShowOptions: [
		{ key: 'totalAmount', required: true, label: '总金额' }, // 票面金额
		{ key: 'totalNum', required: true, label: '总张数' },
		{ key: 'reimbursementNote', required: true }, // 报销说明
		{ key: 'sourceFile', required: false }, // 电子源文件
		{ key: 'files', required: false, type: 'files' }, // 附件

	],
	// 汽车票
	carShowOptions: [

		{ key: 'invoiceNo', }, // 发票号码
		{ key: 'invoiceDate', type: 'date' }, // 开票日期

		{ key: 'trainNumber', }, // 车次/班次
		{ key: 'departCity', }, // 出发城市
		{ key: 'arriveCity', }, // 到达城市

		{ key: 'startDate' }, // 出发时间
		{ key: 'endDate' }, // 到达时间
		{ key: 'totalAmount', }, // 票面金额

		{ key: 'reimbursementNote' }, // 报销说明
		{ key: 'reimburseState', type: 'state' }, // 报销状态
		{ key: 'files', type: 'files' }, // 附件

	],
	// 定额发票、通用、政府
	QCGShowOptions: [
		{ key: 'invoiceNo', }, // 发票号码
		{ key: 'invoiceDate', type: 'date' }, // 开票日期
		{ key: 'totalAmount', }, // 票面金额

		{ key: 'reimbursementNote' }, // 报销说明
		{ key: 'reimburseState', type: 'state' }, // 报销状态
		{ key: 'files', type: 'files' }, // 附件

	],
	// 其他
	otherShowOptions: [
		{ key: 'invoiceCode', required: false }, // 发票代码
		{ key: 'invoiceNo', }, // 发票号码
		{ key: 'invoiceDate', type: 'date' }, // 开票日期
		{ key: 'totalAmount', }, // 票面金额

		{ key: 'reimbursementNote' }, // 报销说明
		{ key: 'reimburseState', type: 'state' }, // 报销状态
		{ key: 'sourceFile', required: false }, // 电子源文件
		{ key: 'files', type: 'files' }, // 附件

	],
	

}