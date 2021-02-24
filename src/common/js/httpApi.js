export default {
    web: {
        //1获取发票列表
        select: '/web/common/invoice/select',
        //2查看发票详情
        find: '/web/common/invoice/find',
        //3删除发票信息
        delete: '/web/common/invoice/delete',
        //4.其他发票保存接口
        collectByOther: '/web/common/invoice/collectByOther ',
        //5.更新发票信息
        update: '/web/common/invoice/update',
        //6.发票类型列表
        invoiceTypeList: '/web/common/invoice/invoiceTypeList',
        //7.获取发票图片
        getImg: '/web/common/invoice/getImg',
        //8.图片归集接口
        webCollectByPic: '/web/common/invoice/collectByPic',
        //9.PDF归集接口
        collectByPdf: '/web/common/invoice/collectByPdf',
        //10.获取发票管理列表
        invoiceSelect: '/web/common/invoice/invoiceSelect',
        //11.发票管理列表导出
        exportInvoiceList: '/web/common/invoice/exportInvoiceList',
        //12.发票勾选导出
        exportInvoiceListByUuid: '/web/common/invoice/exportInvoiceListByUuid',
        //13.获取可抵扣发票管理列表
        deductibleInvoiceSelect: '/web/common/invoice/deductibleInvoiceSelect',
        //14.可抵扣发票管理列表导出
        exportDeductibleInvoiceList: '/web/common/invoice/exportDeductibleInvoiceList',
        //15.可抵扣发票勾选导出
        exportDeductibleListByUuid: '/web/common/invoice/exportDeductibleListByUuid',
        //16.获取发票列表页面顶部统计数据
        counts: '/web/common/invoice/counts',
        //17.上传图片
        uploadImg: '/web/common/invoice/uploadImg',
        //18.删除上传图片
        deleteImg: '/web/common/invoice/deleteImg',
        //19.费用类型列表
        selectExpenseList: '/web/common/invoice/selectExpenseList',
        //规则列表查询
        selectRulesByType: '/web/common/rule/selectRulesByType',
        //停、启用规则
        disableRuleById: '/web/common/rule/disableRuleById',
        //修改规则信息
        updateRuleById: '/web/common/rule/updateRuleById',
        //获取企业信息列表接口
        selectEnterpriseList: '/web/common/rule/selectEnterpriseList',
        //查询员工白名单列表接口
        selectUserWhiteList: '/web/common/rule/selectUserWhiteList',
        //修改员工白名单信息
        updateWhiteUserById: '/web/common/rule/updateWhiteUserById',
        //删除白名单信息
        disableWhiteById: '/web/common/rule/disableWhiteById',
        //企业黑名单列表获取接口
        selectBlackEnterpriseList: '/web/common/rule/selectBlackEnterpriseList',
        //新增企业黑名单信息接口
        insertBlackEnterprise: '/web/common/rule/insertBlackEnterprise',
        //修改企业黑名单信息接口
        updateBlackEnterpriseById: '/web/common/rule/updateBlackEnterpriseById',
        //删除黑名单信息接口
        disableBlackEnterpriseById: '/web/common/rule/disableBlackEnterpriseById',
        //据用户名称，用户证件号码后四位匹配完整证件号码
        getIdentityNumberByNameAndFourID: '/web/common/invoice/getIdentityNumberByNameAndFourID',
        //发票规则校验接口
        invoiceComplianceCheckWeb: '/web/common/invoice/invoiceComplianceCheck',
        //发票查验接口
        checkInvoice: '/web/common/invoice/checkInvoice',
        //上传源文件
        collectBySourceFile: '/web/common/invoice/collectBySourceFile',
    },
    app: {
        //生产环境
        appSelect: '/app/common/invoice/select',
        //查看发票详情
        appFind: '/app/common/invoice/find',
        //删除发票信息
        deleteInvoice: '/app/common/invoice/delete',
        //其他发票保存接口
        collectByOther1: '/app/common/invoice/collectByOther',
        //发票内容更新
        updateInvoice: '/app/common/invoice/update',
        //获取发票类型列表
        getInvoiceType: '/app/common/invoice/invoiceTypeList',
        //获取发票图片
        getImg: '/app/common/invoice/getImg',
        //图片方式归集发票
        appCollectByPic: '/app/common/invoice/collectByPic',
        //二维码方式归集发票
        collectByQrcode: '/app/common/invoice/collectByQrcode',
        //二维码上传发票图片
        uploadImg: '/app/common/invoice/uploadImg',
        //二维码删除发票图片
        deleteImg: '/app/common/invoice/deleteImg',
        //手动录入发票保存接口
        collectByHand: '/app/common/invoice/collectByHand',
        //H5票夹接口url
        //获取费用类型
        selectExpenseList1: '/app/common/invoice/selectExpenseList',
        //混扫保存发票接口
        updateList: '/app/common/invoice/updateList',
        //混扫保存发票接口 web
        updateListWeb: '/web/common/invoice/updateList',
        //据用户名称，用户证件号码后四位匹配完整证件号码
        getIdentity: '/app/common/invoice/getIdentityNumberByNameAndFourID',
        // 发票规则校验接口
        invoiceComplianceCheck: '/app/common/invoice/invoiceComplianceCheck',
        // 发票规则校验接口(混扫)
        invoiceComplianceCheckList: '/app/common/invoice/invoiceComplianceCheckList',
        // 发票规则校验接口(混扫)
        invoiceComplianceCheckListWeb: '/web/common/invoice/invoiceComplianceCheckList',
        // 获取滴滴信息
        getDDInfo: '/app/common/invoice/getDDInfo',
        // 修改授权状态
        updateDdidUserInfo: '/app/common/invoice/updateDdidUserInfo',
        // 修改存在状态
        getDDRuleState: '/app/common/invoice/getDDRuleState',
        // 删除附件
        deleteInvoiceFiles:'/app/common/invoice/deleteInvoiceFiles',
        
    },
    previewFile:'/web/common/invoice/previewFile',
    uploadFile: '/web/common/invoice/uploadFile',

}