// 个性化定制
import myselfFormDataItemConfig from '../myself/myselfFormDataItemConfig.js';

export let formDataConfig = {
    invoiceCode: {
        label: '发票代码',
        // value: '', //发票代码
        placeholder: '请输入发票代码',
        required: false,
        rules: [{ required: false, validator: valueValidator, maxLength: 12, }],
        maxLength: 12,
        type: 'number',
        reg: /\D/g,
        readonly: false,
    },

    invoiceNo: {
        label: '发票号码',
        // value: '', //发票号码
        placeholder: '请输入发票号码',
        required: false,
        rules: [{ required: false, validator: valueValidator, maxLength: 8, }],
        maxLength: 8,
        type: 'number',
        readonly: false,
    },

    invoiceDate: {
        label: '开票日期',
        // value: '', //开票日期
        placeholder: '请选择开票日期',
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        type: 'date',
        readonly: false,
    },

    invoiceDateTime: {
        label: '开票日期时间',
        // value: '', //开票日期时间//显示用
        placeholder: '请选择开票日期时间',
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        readonly: false,
    },

    verifyCode: {
        label: '校验码',
        // value: '', //校验码后6位
        placeholder: '请输入校验码后6位',
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        readonly: false,
    },

    buyerName: {
        label: '购买方',
        // value: '', //购买方名称
        placeholder: "无",
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        readonly: true
    },

    goodsName: {
        label: '货物或应税劳务',
        // value: '', //货物或应税劳务
        placeholder: '无',
        required: false,
        rules: [{ required: false }],
        maxLength: 11,
        readonly: true
    },

    fare: {
        label: '票价',
        // value: '', //航空行程单 票价
        placeholder: '最多11位数字(含小数点后2位)',
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        maxLength: 11,
        reg: /^\D*(\d*(?:\.\d{0,2})?).*$/g,
        readonly: false,
    },
    caacDevelopmentFund: {
        label: '民航发展基金',
        // value: '', //航空行程单 民航发展基金
        placeholder: '最多11位数字(含小数点后2位)',
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        maxLength: 11,
        reg: /^\D*(\d*(?:\.\d{0,2})?).*$/g,
        readonly: false,
    },
    fuelSurcharge: {
        label: '燃油附加费',
        // value: '', //航空行程单 燃油附加费
        placeholder: '最多11位数字(含小数点后2位)',
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        maxLength: 11,
        reg: /^\D*(\d*(?:\.\d{0,2})?).*$/g,
        readonly: false,
    },
    totalAmount: {
        label: '票面金额',
        // value: '', //发票金额、金额 合计金额
        placeholder: '最多11位数字(含小数点后2位)',
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        maxLength: 11,
        reg: /^\D*(\d*(?:\.\d{0,2})?).*$/g,
        readonly: false,
    },
    invoiceAmount: {
        label: '金额',
        // value: '', //不含税价  金额(不含税)
        placeholder: '最多11位数字(含小数点后2位)',
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        maxLength: 11,
        reg: /^\D*(\d*(?:\.\d{0,2})?).*$/g,
        readonly: false,
    },
    deductTaxAmount: {
        label: '可抵扣税额',
        // value: '', //可抵扣税额
        placeholder: '最多11位数字(含小数点后2位)',
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        maxLength: 11,
        reg: /^\D*(\d*(?:\.\d{0,2})?).*$/g,
        readonly: false,
    },
    realAmount: {
        label: '实报金额',
        // value: '',
        placeholder: '',
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        maxLength: 11,
        reg: /^\D*(\d*(?:\.\d{0,2})?).*$/g,
        readonly: false,
    },
    taxRate: {
        label: '税率',
        // value: '',
        placeholder: '请输入税率',
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        readonly: false,
    },
    taxAmount: {
        label: '税额',
        // value: '',
        placeholder: '请输入税额',
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        maxLength: 11,
        reg: /^\D*(\d*(?:\.\d{0,2})?).*$/g,
        readonly: false,
    },
    salerName: {
        label: '销售方',
        // value: '', //销售方名称
        placeholder: '无',
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        readonly: true
    },
    remark: {
        label: '备注',
        // value: '', //备注
        placeholder: '请输入备注',
        required: false,
        rules: [{ required: false }],
        readonly: false,
    },
    reimbursementNote: {
        label: '报销说明',
        // value: '', //报销说明
        placeholder: '请输入报销说明',
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        readonly: false,
    },
    invoiceCount: {
        label: '附件张数',
        // value: '', //附件张数
        placeholder: '最多4位数字',
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        readonly: false,
    },
    departCity: {
        label: '出发',
        // value: '', //出发城市
        placeholder: '请输入出发城市',
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        readonly: false,
    },
    arriveCity: {
        label: '到达',
        // value: '', //到达城市
        placeholder: '请输入到达城市',
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        readonly: false,
    },
    trainNumber: {
        label: '车次/班次',
        // value: '', //车次、班次
        placeholder: '请输入车次',
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        readonly: false,
    },
    seatLevel: {
        label: '座位等级',
        // value: '', //座位等级
        placeholder: '请输入座位等级',
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        readonly: false,
    },
    riderValue: {
        label: '乘坐人',
        // value: '',
        placeholder: '请输入乘坐人',
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        readonly: false,
    },
    idNumber: {
        label: '证件号',
        // value: '',
        placeholder: '请输入证件号后4位',
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        readonly: false,
    },
    startDate: {
        label: '出发时间',
        // value: '', //出发时间
        placeholder: '请选择出发时间',
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        readonly: false,
    },
    endDate: {
        label: '到达时间',
        // value: '', //到达时间
        placeholder: '请输入到达时间',
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        readonly: false,
    },
    sourceFile: {
        label: '电子源文件',
        // value: '', //到达时间
        rules: [{ required: false }],
        placeholder: '无',
        required: false,
        readonly: true,
    },
    files: {
        label: '附件',
        // value: '', //到达时间
        rules: [{ required: false }],
        placeholder: '无',
        required: false,
        readonly: true
    },
    ...myselfFormDataItemConfig

}
// 正则判断
function valueValidator(value, item) {
    if (value.length < item.maxLength) {
        _Toast({
            message: '长度不对'
        });
        return false;
    } else {
        return true;
    }
}
