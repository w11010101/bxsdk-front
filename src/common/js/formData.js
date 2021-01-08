export let formData = {
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
        placeholder: "请输入购买方",
        required: false,
        rules: [{ required: false, validator: valueValidator }],
        readonly: true
    },

    goodsName: {
        label: '货物或应税劳务',
        // value: '', //货物或应税劳务
        placeholder: '请输入货物或应税劳务',
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
        placeholder: '请输入销售方',
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

}

function valueValidator(value, item) {
    console.log(8, arguments)
    console.log(9, 'valueValidator', value);

    if (value.length < item.maxLength) {
        console.log(this)
        _Toast({
            message: '长度不对'
        });
        return false;
    } else {
        return true;
    }
}

export let exampleData = {
    "code": null,
    "data": {
        "fare": null,
        "isCanceled": "N",
        "kplx": null,
        "departCity": "0",
        "buyerBankAccount": "",
        "endDate": null,
        "invoiceAmount": "79.21",
        "dataSourceCode": null,
        "passwordArea": "",
        "sourceFile": null,
        "uuid": "001a6c9d5147495b9492936d73b1c538",
        "isDeductible": null,
        "salerTaxNo": "33010419640919071401",
        "checkState": "1",
        "machineNo": "",
        "invoiceNo": "70446395",
        "goodsName": "*餐饮服务*餐饮服务",
        "buyerTaxNo": "91510100MA61TH4B9B",
        "receiver": "",
        "registerTime": null,
        "salerBankAccount": null,
        "issueBy": null,
        "invoiceCount": "1",
        "taxiInvoiceNum": 0,
        "billDate": null,
        "invoiceCode": "033002000111",
        "flightNumber": null,
        "billName": null,
        "taxRate": null,
        "totalAmount": "80.00",
        "reimburseUserName": null,
        "passenger": null,
        "detailList": [{
            "expenseItem": null,
            "unitPrice": 0,
            "plateNo": null,
            "num": 0.0,
            "noTaxAmount": 79.21,
            "trafficDateStart": null,
            "type": null,
            "invoiceCode": null,
            "uuid": null,
            "taxRate": "1",
            "unit": "",
            "detailNo": null,
            "model": "",
            "id": 22753,
            "invoiceNo": null,
            "taxAmount": 0.79,
            "goodsName": "*餐饮服务*餐饮服务",
            "trafficDateEnd": null
        }],
        "files": [],
        "registerStatus": null,
        "trainNumber": "",
        "taxAmount": "0.79",
        "reimburseState": "0",
        "auditorDate": null,
        "picUrlSimple": null,
        "startDate": null,
        "invoiceTypeName": null,
        "salerName": "杭州市江干区饭摊儿餐饮店",
        "taxiSumAmount": null,
        "isException": "",
        "remark": "",
        "isEInvoice": null,
        "invCreateTime": null,
        "currencyName": null,
        "identityNumber": null,
        "seatLevel": null,
        "electronicTicketNumber": null,
        "buyerAddressTel": "",
        "expenseType": null,
        "verifyCode": "66380322381375325481",
        "caacDevelopmentFund": null,
        "drawer": "",
        "reviewer": "",
        "buyerName": "成都武侯蓝光房地产开发有限公司",
        "dateOfIssue": null,
        "invoiceDate": "20200520",
        "userName": null,
        "userId": null,
        "arriveCity": "0",
        "reimburseSerialNo": null,
        "fplb": null,
        "createTime": null,
        "reimbursementNote": null,
        "isBlush": "0",
        "invoiceTypeCode": "10",
        "reimburseUserId": null,
        "enterpriseId": null,
        "fuelSurcharge": null,
        "currencyCode": null,
        "salerAddressTel": "杭州市江干区凤起时代大厦108室 13906537368",
        "deductTaxAmount": null,
        "tradeSerialNo": null
    },
    "isForce": null,
    "message": "ok",
    "otherInvoice": null,
    "status": true
}
export let exampleData1 = {
    "code": null,
    "data": {
        "fare": null,
        "isCanceled": null,
        "kplx": null,
        "departCity": "长春",
        "buyerBankAccount": null,
        "endDate": null,
        "invoiceAmount": "28.90",
        "dataSourceCode": null,
        "passwordArea": null,
        "sourceFile": null,
        "uuid": "32d3e03759da477fb97b370aa2ba507b",
        "isDeductible": null,
        "salerTaxNo": null,
        "checkState": "0",
        "machineNo": null,
        "invoiceNo": "X084277",
        "goodsName": null,
        "buyerTaxNo": null,
        "receiver": null,
        "registerTime": null,
        "salerBankAccount": null,
        "issueBy": null,
        "invoiceCount": null,
        "taxiInvoiceNum": 0,
        "billDate": null,
        "invoiceCode": null,
        "flightNumber": null,
        "billName": null,
        "taxRate": "9%",
        "totalAmount": "31.50",
        "reimburseUserName": null,
        "passenger": "杨志亮",
        "detailList": [],
        "files": [],
        "registerStatus": null,
        "trainNumber": "C1263",
        "taxAmount": "2.60",
        "reimburseState": "0",
        "auditorDate": null,
        "picUrlSimple": null,
        "startDate": "20190717082000",
        "invoiceTypeName": null,
        "salerName": null,
        "taxiSumAmount": null,
        "isException": null,
        "remark": null,
        "isEInvoice": null,
        "invCreateTime": null,
        "currencyName": null,
        "identityNumber": "3713",
        "seatLevel": null,
        "electronicTicketNumber": null,
        "buyerAddressTel": null,
        "expenseType": null,
        "verifyCode": null,
        "caacDevelopmentFund": null,
        "drawer": null,
        "reviewer": null,
        "buyerName": null,
        "dateOfIssue": null,
        "invoiceDate": "20190717",
        "userName": null,
        "userId": null,
        "arriveCity": "吉林",
        "reimburseSerialNo": null,
        "fplb": null,
        "createTime": null,
        "reimbursementNote": null,
        "isBlush": null,
        "invoiceTypeCode": "92",
        "reimburseUserId": null,
        "enterpriseId": null,
        "fuelSurcharge": null,
        "currencyCode": null,
        "salerAddressTel": null,
        "deductTaxAmount": "2.6",
        "tradeSerialNo": null
    },
    "isForce": null,
    "message": "ok",
    "otherInvoice": null,
    "status": true
}
export let resolve = {
    "sumTaxAmount": null,
    "total": 198,
    "code": null,
    "data": [
        { "insurance": null, "isCanceled": "N", "salerName": "北京市八通华瑞汽车销售有限公司", "departCity": null, "buyerBankAccount": "", "endDate": null, "isException": "", "invoiceAmount": "138053.10", "dataSourceCode": null, "uuid": "7b6a01fbd18d43d3ad74975e632c3715", "identityNumber": null, "salerTaxNo": "9111011274671638X5", "checkState": "1", "invoiceNo": "00441689", "goodsName": null, "buyerAddressTel": "", "expenseType": null, "verifyCode": "", "buyerTaxNo": "91110108MA004CPN95", "salerBankAccount": "", "invoiceCount": "1", "billDate": null, "tax": null, "buyerName": "大象慧云信息技术有限公司", "invoiceDate": "20190424", "invoiceCode": "111001822011", "arriveCity": null, "reimburseSerialNo": null, "billName": null, "taxRate": null, "totalAmount": "156000.00", "passenger": null, "reimbursementNote": null, "isBlush": "0", "invoiceTypeCode": "03", "reimburseUserId": null, "trainNumber": "", "taxAmount": "17946.90", "reimburseState": "0", "salerAddressTel": "", "startDate": null },
        { "insurance": null, "isCanceled": null, "salerName": null, "departCity": null, "buyerBankAccount": "", "endDate": null, "isException": null, "invoiceAmount": "0.00", "dataSourceCode": null, "uuid": "65b89ab8e68d461d9d509e5a2d29e46d", "identityNumber": null, "salerTaxNo": "", "checkState": "0", "invoiceNo": "0742497183958", "goodsName": null, "buyerAddressTel": "", "expenseType": null, "verifyCode": "1008", "buyerTaxNo": "", "salerBankAccount": "", "invoiceCount": null, "billDate": null, "tax": null, "buyerName": null, "invoiceDate": "20151002", "invoiceCode": null, "arriveCity": null, "reimburseSerialNo": null, "billName": null, "taxRate": null, "totalAmount": "13336.00", "passenger": null, "reimbursementNote": null, "isBlush": null, "invoiceTypeCode": "90", "reimburseUserId": null, "trainNumber": "KL896", "taxAmount": "", "reimburseState": "0", "salerAddressTel": "", "startDate": null },
        { "insurance": null, "isCanceled": null, "salerName": "国安税务总局永兴县税务局办税服务厅1代开窗口004", "departCity": null, "buyerBankAccount": "", "endDate": null, "isException": null, "invoiceAmount": "735.61", "dataSourceCode": null, "uuid": "7f3d13ba6149412eb446405407fb4778", "identityNumber": null, "salerTaxNo": "", "checkState": "2", "invoiceNo": "12121222", "goodsName": "*现代服务*推广服务费", "buyerAddressTel": "", "expenseType": null, "verifyCode": "1008", "buyerTaxNo": "", "salerBankAccount": "", "invoiceCount": null, "billDate": null, "tax": null, "buyerName": "北京京东世纪贸易有限公司", "invoiceDate": "20201210", "invoiceCode": "4300134170", "arriveCity": null, "reimburseSerialNo": null, "billName": null, "taxRate": null, "totalAmount": "757.68", "passenger": null, "reimbursementNote": "121212", "isBlush": null, "invoiceTypeCode": "01", "reimburseUserId": null, "trainNumber": null, "taxAmount": "22.07", "reimburseState": "0", "salerAddressTel": "", "startDate": "20201210000000" },
        { "insurance": null, "isCanceled": null, "salerName": null, "departCity": null, "buyerBankAccount": null, "endDate": "20200809180700", "isException": null, "invoiceAmount": "0.00", "dataSourceCode": null, "uuid": "a05d3780d7a8435eb3ad822ae0474732", "identityNumber": null, "salerTaxNo": null, "checkState": "0", "invoiceNo": "08996820", "goodsName": null, "buyerAddressTel": null, "expenseType": null, "verifyCode": "1008", "buyerTaxNo": null, "salerBankAccount": null, "invoiceCount": "1", "billDate": null, "tax": null, "buyerName": null, "invoiceDate": "20200809", "invoiceCode": "131001960715", "arriveCity": null, "reimburseSerialNo": null, "billName": null, "taxRate": null, "totalAmount": "63.00", "passenger": null, "reimbursementNote": null, "isBlush": null, "invoiceTypeCode": "91", "reimburseUserId": null, "trainNumber": null, "taxAmount": "", "reimburseState": "0", "salerAddressTel": null, "startDate": "20200809170600" },
        // { "insurance": null, "isCanceled": null, "salerName": null, "departCity": null, "buyerBankAccount": null, "endDate": "20180808184300", "isException": null, "invoiceAmount": "0.00", "dataSourceCode": null, "uuid": "a115c9dd94eb44b99e52a463c35dd2b3", "identityNumber": null, "salerTaxNo": null, "checkState": "0", "invoiceNo": "08464066", "goodsName": null, "buyerAddressTel": null, "expenseType": null, "verifyCode": "1008", "buyerTaxNo": null, "salerBankAccount": null, "invoiceCount": "1", "billDate": null, "tax": null, "buyerName": null, "invoiceDate": "20180808", "invoiceCode": "131001960715", "arriveCity": null, "reimburseSerialNo": null, "billName": null, "taxRate": null, "totalAmount": "16.00", "passenger": null, "reimbursementNote": null, "isBlush": null, "invoiceTypeCode": "91", "reimburseUserId": null, "trainNumber": null, "taxAmount": "", "reimburseState": "0", "salerAddressTel": null, "startDate": "20180808183500" },
        // { "insurance": null, "isCanceled": null, "salerName": "", "departCity": null, "buyerBankAccount": "", "endDate": null, "isException": null, "invoiceAmount": "", "dataSourceCode": null, "uuid": "3bb9afe29eff4e0682dda512ddecbdbf", "identityNumber": null, "salerTaxNo": "", "checkState": "0", "invoiceNo": "00169152", "goodsName": null, "buyerAddressTel": "", "expenseType": null, "verifyCode": "1008", "buyerTaxNo": "", "salerBankAccount": "", "invoiceCount": null, "billDate": null, "tax": null, "buyerName": null, "invoiceDate": "20201204", "invoiceCode": "131001960905", "arriveCity": null, "reimburseSerialNo": null, "billName": null, "taxRate": null, "totalAmount": "3333.00", "passenger": null, "reimbursementNote": null, "isBlush": null, "invoiceTypeCode": "91", "reimburseUserId": null, "trainNumber": null, "taxAmount": "", "reimburseState": "0", "salerAddressTel": "", "startDate": "20201204000000" },
        // { "insurance": null, "isCanceled": null, "salerName": null, "departCity": null, "buyerBankAccount": null, "endDate": null, "isException": null, "invoiceAmount": "28.90", "dataSourceCode": null, "uuid": "6fe003935d4a433682be92ebae572bf7", "identityNumber": null, "salerTaxNo": null, "checkState": "0", "invoiceNo": "E011703", "goodsName": null, "buyerAddressTel": null, "expenseType": null, "verifyCode": "1008", "buyerTaxNo": null, "salerBankAccount": null, "invoiceCount": "1", "billDate": null, "tax": null, "buyerName": null, "invoiceDate": "20190718", "invoiceCode": null, "arriveCity": null, "reimburseSerialNo": null, "billName": null, "taxRate": null, "totalAmount": "31.50", "passenger": "郗美玉", "reimbursementNote": null, "isBlush": null, "invoiceTypeCode": "92", "reimburseUserId": null, "trainNumber": "G8018", "taxAmount": "2.60", "reimburseState": "0", "salerAddressTel": null, "startDate": "20190718145800" },
        // { "insurance": null, "isCanceled": null, "salerName": "", "departCity": null, "buyerBankAccount": "", "endDate": null, "isException": null, "invoiceAmount": "4077.06", "dataSourceCode": null, "uuid": "b61be095fcb14489919fa261604ae284", "identityNumber": null, "salerTaxNo": "", "checkState": "0", "invoiceNo": "E019930", "goodsName": null, "buyerAddressTel": "", "expenseType": null, "verifyCode": "1008", "buyerTaxNo": "", "salerBankAccount": "", "invoiceCount": null, "billDate": null, "tax": null, "buyerName": null, "invoiceDate": "20190725", "invoiceCode": null, "arriveCity": null, "reimburseSerialNo": null, "billName": null, "taxRate": null, "totalAmount": "4444.00", "passenger": "杨志亮", "reimbursementNote": null, "isBlush": null, "invoiceTypeCode": "92", "reimburseUserId": null, "trainNumber": "C1336", "taxAmount": "366.94", "reimburseState": "0", "salerAddressTel": "", "startDate": "20190725144500" },
        // { "insurance": null, "isCanceled": null, "salerName": null, "departCity": null, "buyerBankAccount": null, "endDate": "20200607234300", "isException": null, "invoiceAmount": "0.00", "dataSourceCode": null, "uuid": "59ed5c65f8684120a52445979b739d4d", "identityNumber": null, "salerTaxNo": null, "checkState": "0", "invoiceNo": "01230311", "goodsName": null, "buyerAddressTel": null, "expenseType": null, "verifyCode": "1008", "buyerTaxNo": null, "salerBankAccount": null, "invoiceCount": "1", "billDate": null, "tax": null, "buyerName": null, "invoiceDate": "20200607", "invoiceCode": "144031970219", "arriveCity": null, "reimburseSerialNo": null, "billName": null, "taxRate": null, "totalAmount": "169.00", "passenger": null, "reimbursementNote": null, "isBlush": null, "invoiceTypeCode": "91", "reimburseUserId": null, "trainNumber": null, "taxAmount": "", "reimburseState": "0", "salerAddressTel": null, "startDate": "20200607221400" },
        // {"insurance": null,"isCanceled": null,"salerName": "","departCity": null,"buyerBankAccount": "","endDate": null,"isException": null,"invoiceAmount": "","dataSourceCode": null,"uuid": "a6fb0d5d06164a028cadcfdb075efefa","identityNumber": null,"salerTaxNo": "","checkState": "0","invoiceNo": "59394590","goodsName": null,"buyerAddressTel": "","expenseType": null,"verifyCode": "1008","buyerTaxNo": "","salerBankAccount": "","invoiceCount": null,"billDate": null,"tax": null,"buyerName": null,"invoiceDate": "20200607","invoiceCode": "144011872218","arriveCity": null,"reimburseSerialNo": null,"billName": null,"taxRate": null,"totalAmount": "1111.00","passenger": null,"reimbursementNote": null,"isBlush": null,"invoiceTypeCode": "97","reimburseUserId": null,"trainNumber": null,"taxAmount": "","reimburseState": "0","salerAddressTel": "","startDate": null}
    ],
    "isForce": null,
    "page": 1,
    "message": "ok",
    "rows": 10,
    "otherInvoice": null,
    "status": true,
    "sumTotalAmount": null
}