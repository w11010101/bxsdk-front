export let formData = {
    invoiceCode: {
        label: '发票代码',
        value: '', //发票代码
        placeholder: '请输入发票代码',
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        maxLength:12,
        type:'number'
    },
    invoiceNo: {
        label: '发票号码',
        value: '', //发票号码
        placeholder: '请输入发票号码',
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        maxLength:8,
        type:'number'
    },
    invoiceDate: {
        label: '开票日期',
        value: '', //开票日期
        placeholder: '请选择开票日期',
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        type: 'date'
    },
    invoiceDateTime: {
        label: '开票日期时间',
        value: '', //开票日期时间//显示用
        placeholder: '请选择开票日期时间',
        required: false,
        rules: [{ required: false, validator: valueValidator }]
    },
    verifyCode: {
        label: '校验码',
        value: '', //校验码后6位
        placeholder: '请输入校验码后6位',
        required: false,
        rules: [{ required: false, validator: valueValidator }]
    },
    buyerName: {
        label: '购买方',
        value: '', //购买方名称
        placeholder: "请输入购买方",
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        readonly: true
    },
    goodsName: {
        label: '货物或应税劳务',
        value: '', //货物或应税劳务
        placeholder: '请输入货物或应税劳务',
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        maxLength:11,
        readonly: true
    },
    fare: {
        label: '票价',
        value: '', //航空行程单 票价
        placeholder: '最多11位数字(含小数点后2位)',
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        maxLength:11,
        reg:/\d+\.?\d{0,2}/
    },
    caacDevelopmentFund: {
        label: '民航发展基金',
        value: '', //航空行程单 民航发展基金
        placeholder: '最多11位数字(含小数点后2位)',
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        maxLength:11,
        reg:/\d+\.?\d{0,2}/
    },
    fuelSurcharge: {
        label: '燃油附加费',
        value: '', //航空行程单 燃油附加费
        placeholder: '最多11位数字(含小数点后2位)',
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        maxLength:11,
        reg:/\d+\.?\d{0,2}/
    },
    totalAmount: {
        label: '票面金额',
        value: '', //发票金额、金额 合计金额
        placeholder: '最多11位数字(含小数点后2位)',
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        maxLength:11,
        reg:/\d+\.?\d{0,2}/
    },
    invoiceAmount: {
        label: '金额',
        value: '', //不含税价  金额(不含税)
        placeholder: '最多11位数字(含小数点后2位)',
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        maxLength:11,
        reg:/\d+\.?\d{0,2}/
    },
    deductTaxAmount: {
        label: '可抵扣税额',
        value: '', //可抵扣税额
        placeholder: '最多11位数字(含小数点后2位)',
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        maxLength:11,
        reg:/\d+\.?\d{0,2}/
    },
    realAmount: {
        label: '实报金额',
        value: '',
        placeholder: '',
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        maxLength:11,
        reg:/\d+\.?\d{0,2}/
    },
    taxRate: {
        label: '税率',
        value: '',
        placeholder: '请输入税率',
        required: false,
        rules: [{ required: false, validator: valueValidator }]
    },
    taxAmount: {
        label: '税额',
        value: '',
        placeholder: '请输入税额',
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        maxLength:11,
        reg:/\d+\.?\d{0,2}/
    },
    salerName: {
        label: '销售方',
        value: '', //销售方名称
        placeholder: '请输入销售方',
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        readonly: true
    },
    remark: {
        label: '备注',
        remark: '', //备注
    },
    reimbursementNote: {
        label: '报销说明',
        value: '', //报销说明
        placeholder: '请输入报销说明',
        required: false,
        rules: [{ required: false, validator: valueValidator }]
    },
    invoiceCount: {
        label: '附件张数',
        value: '', //附件张数
        placeholder: '最多4位数字',
        required: false,
        rules: [{ required: false, validator: valueValidator }]
    },
    departCity: {
        label: '出发',
        value: '', //出发城市
        placeholder: '请输入出发城市',
        required: false,
        rules: [{ required: false, validator: valueValidator }]
    },
    arriveCity: {
        label: '到达',
        value: '', //到达城市
        placeholder: '请输入到达城市',
        required: false,
        rules: [{ required: false, validator: valueValidator }]
    },
    trainNumber: {
        label: '车次/班次',
        value: '', //车次、班次
        placeholder: '请输入车次',
        required: false,
        rules: [{ required: false, validator: valueValidator }]
    },
    seatLevel: {
        label: '座位等级',
        value: '', //座位等级
        placeholder: '请输入座位等级',
        required: false,
        rules: [{ required: false, validator: valueValidator }]
    },
    riderValue: {
        label: '乘坐人',
        value: '',
        placeholder: '请输入乘坐人',
        required: false,
        rules: [{ required: false, validator: valueValidator }]
    },
    idNumber: {
        label: '证件号',
        value: '',
        placeholder: '请输入证件号后4位',
        required: false,
        rules: [{ required: false, validator: valueValidator }]
    },
    startDate: {
        label: '出发时间',
        value: '', //出发时间
        placeholder: '请选择出发时间',
        required: false,
        rules: [{ required: false, validator: valueValidator }]
    },
    endDate: {
        label: '到达时间',
        value: '', //到达时间
        placeholder: '请输入到达时间',
        required: false,
        rules: [{ required: false, validator: valueValidator }]
    },
    sourceFile: {
        label: '电子源文件',
        value: '', //到达时间
        placeholder: '无',
        required: false,
        readonly: true
    },
    files: {
        label: '附件',
        value: '', //到达时间
        placeholder: '无',
        required: false,
        readonly: true
    },
}

function valueValidator(value) {
    console.log(9,'valueValidator',value)
    // if (value) {
    //  Toast({
    //      message: '不能为空'
    //  })
    // }
}