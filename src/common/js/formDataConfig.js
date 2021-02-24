import myselfFormDataItemConfig from '../myself/myselfFormDataItemConfig.js'; // 个性化定制
export let formDataConfig = {
    invoiceCode: {
        label: '发票代码',
        placeholder: '请输入发票代码',
        required: true,
        rules: [
            { required: true, validator: valueValidator, label: '发票代码', message: '发票代码不能为空', maxLength: 12, }
        ],
        maxLength: 12,
        reg: /\D/g,
        readonly: false,
    },

    invoiceNo: {
        label: '发票号码',
        placeholder: '请输入发票号码',
        required: true,
        rules: [{ required: true, validator: valueValidator, label: '发票号码', message: '发票号码不能为空', maxLength: 8, }],
        maxLength: 8,
        readonly: false,
    },

    invoiceDate: {
        label: '开票日期',
        placeholder: '请选择开票日期',
        required: true,
        rules: [{ required: true, label: '开票日期', message: '开票日期不能为空' }],
        readonly: false,
    },

    invoiceDateTime: {
        label: '开票日期时间',
        placeholder: '请选择开票日期时间',
        required: true,
        rules: [{ required: true, label: '开票日期时间', message: '开票日期时间不能为空' }],
        readonly: false,
    },

    verifyCode: {
        label: '校验码',
        placeholder: '请输入校验码后6位',
        required: true,
        rules: [{ required: true, validator: valueValidator, label: '校验码', message: '校验码不能为空' }],
        readonly: false,
        maxLength: 6
    },

    buyerName: {
        label: '购买方',
        placeholder: '',
        required: false,
        // rules: [{ required: false, validator: valueValidator, message: '' }],
        readonly: true
    },

    goodsName: {
        label: '货物或应税劳务',
        placeholder: '',
        required: false,
        rules: [{ required: false }],
        maxLength: 12,
        readonly: true
    },

    fare: {
        label: '票价',
        placeholder: '最多11位数字(含小数点后2位)',
        required: true,
        rules: [
            { required: true, validator: valueValidator, label: '票价', message: '票价不能为空' },
            { required: true, validator: numberValidator, label: '票价', message: '票价不能为0' }
        ],
        maxLength: 12,
        reg: /^\D*(\d*(?:\.\d{0,2})?).*$/g,
        readonly: false,
    },
    caacDevelopmentFund: {
        label: '民航发展基金',
        placeholder: '最多11位数字(含小数点后2位)',
        required: false,
        rules: [{ required: false, validator: valueValidator, label: '民航发展基金', message: '民航发展基金不能为空' }],
        maxLength: 12,
        reg: /^\D*(\d*(?:\.\d{0,2})?).*$/g,
        readonly: false,
    },
    fuelSurcharge: {
        label: '燃油附加费',
        placeholder: '最多11位数字(含小数点后2位)',
        required: false,
        rules: [{ required: false, validator: valueValidator, label: '燃油附加费', message: '燃油附加费不能为空' }],
        maxLength: 12,
        reg: /^\D*(\d*(?:\.\d{0,2})?).*$/g,
        readonly: false,
    },
    totalAmount: {
        label: '票面金额',
        placeholder: '最多11位数字(含小数点后2位)',
        required: true,
        rules: [
            { required: true, validator: valueValidator, label: '票面金额', message: '票面金额不能为空' },
            { required: true, validator: numberValidator, label: '票价', message: '票价不能为0' }
        ],
        maxLength: 12,
        reg: /^\D*(\d*(?:\.\d{0,2})?).*$/g,
        readonly: false,
    },
    invoiceAmount: {
        label: '金额',
        placeholder: '最多11位数字(含小数点后2位)',
        required: true,
        rules: [
            { required: true, validator: valueValidator, label: '金额', message: '金额不能为空' },
            { required: true, validator: numberValidator, label: '票价', message: '票价不能为0' }
        ],
        maxLength: 12,
        reg: /^\D*(\d*(?:\.\d{0,2})?).*$/g,
        readonly: false,
    },
    deductTaxAmount: {
        label: '可抵扣税额',
        placeholder: '最多11位数字(含小数点后2位)',
        required: false,
        rules: [{ required: false, validator: valueValidator, label: '可抵扣税额', message: '可抵扣税额不能为空' }],
        maxLength: 12,
        reg: /^\D*(\d*(?:\.\d{0,2})?).*$/g,
        readonly: false,
    },
    realAmount: {
        label: '实报金额',
        placeholder: '',
        required: false,
        rules: [{ required: false, validator: valueValidator, label: '实报金额', message: '实报金额不能为空' }],
        maxLength: 12,
        reg: /^\D*(\d*(?:\.\d{0,2})?).*$/g,
        readonly: false,
    },
    taxRate: {
        label: '税率',
        placeholder: '请输入税率',
        required: false,
        rules: [{ required: false, validator: valueValidator, label: '税率', message: '税率不能为空' }],
        readonly: false,
    },
    taxAmount: {
        label: '税额',
        placeholder: '请输入税额',
        required: false,
        rules: [{ required: false, validator: valueValidator, label: '税额', message: '税额不能为空' }],
        maxLength: 12,
        reg: /^\D*(\d*(?:\.\d{0,2})?).*$/g,
        readonly: false,
    },
    salerName: {
        label: '销售方',
        placeholder: '',
        required: false,
        readonly: true
    },
    remark: {
        label: '备注',
        placeholder: '请输入备注',
        required: false,
        rules: [{ required: false }],
        readonly: false,
    },
    reimbursementNote: {
        label: '报销说明',
        placeholder: '请输入报销说明',
        required: false,
        rules: [{ required: false, label: '报销说明', message: '报销说明不能为空' }],
        readonly: false,
    },
    reimburseState: {
        label: '报销状态',
        placeholder: '请输入报销状态',
        required: false,
        readonly: false,
    },
    checkState: {
        label: '查验状态',
        placeholder: '请输入查验状态',
        required: false,
        readonly: false,
    },
    invoiceCount: {
        label: '附件张数',
        placeholder: '最多4位数字',
        required: false,
        readonly: false,
    },
    departCity: {
        label: '出发',
        placeholder: '请输入出发城市',
        required: true,
        rules: [{ required: true, label: '出发城市', message: '出发城市不能为空' }],
        readonly: false,
    },
    arriveCity: {
        label: '到达',
        placeholder: '请输入到达城市',
        required: true,
        rules: [{ required: true, label: '到达城市', message: '到达城市不能为空' }],
        readonly: false,
    },
    trainNumber: {
        label: '车次/班次',
        placeholder: '请输入车次',
        required: true,
        rules: [{ required: true, label: '车次/班次', message: '车次、班次不能为空' }],
        readonly: false,
    },

    seatLevel: {
        label: '座位等级',
        placeholder: '请输入座位等级',
        required: false,
        readonly: false,
    },
    riderValue: {
        label: '乘坐人',
        placeholder: '请输入乘坐人',
        required: true,
        rules: [{ required: true, label: '乘坐人', message: '乘坐人不能为空' }],
        readonly: false,
    },
    passenger: {
        label: '乘坐人',
        placeholder: '请输入乘坐人',
        required: true,
        rules: [{ required: true, label: '乘坐人', message: '乘坐人不能为空' }],
        readonly: false,
    },
    idNumber: {
        label: '证件号',
        placeholder: '请输入证件号后4位',
        required: true,
        rules: [{ required: true, label: '证件号', message: '证件号不能为空' }],
        readonly: false,
    },
    identityNumber: {
        label: '证件号',
        placeholder: '请输入证件号后4位',
        required: true,
        rules: [{ required: true, label: '证件号', message: '证件号不能为空' }],
        readonly: false,
    },
    startDate: {
        label: '出发时间',
        placeholder: '请选择出发时间',
        required: true,
        rules: [{ required: true, label: '出发时间', message: '出发时间不能为空' }],
        readonly: false,
    },
    endDate: {
        label: '到达时间',
        placeholder: '请输入到达时间',
        required: true,
        rules: [{ required: true, label: '到达时间', message: '到达时间不能为空' }],
        readonly: false,
    },
    sourceFile: {
        label: '电子源文件',
        rules: [{ required: false }],
        placeholder: '无',
        required: false,
        readonly: true,
    },
    image: {
        label: '图片',
        placeholder: '',
        required: false,
        readonly: false,
    },
    files: {
        label: '附件',
        placeholder: '无',
        required: false,
        readonly: true
    },
    ...myselfFormDataItemConfig,

}
// 正则判断
function valueValidator(value, item) {
    if (item.required) {
        if (value.length < item.maxLength) {
            _Toast({
                message: item.label + '长度不对'
            });
            return false;
        } else {
            return true;
        }
    }
}

function numberValidator(value, item) {
    if (item.required) {
        if (parseFloat(value) == 0) {
            _Toast({
                message: item.message
            });
            return false;
        } else {
            return true;
        }
        console.log(5, value, item)
    }
}