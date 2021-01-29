export default {
    web: {
        //1获取发票列表
        select: '/rest/web/common/invoice/select',
        //2查看发票详情
        find: '/rest/web/common/invoice/find',
        //3删除发票信息
        delete: '/rest/web/common/invoice/delete',
        //4.其他发票保存接口
        collectByOther: '/rest/web/common/invoice/collectByOther ',
        //5.更新发票信息
        update: '/rest/web/common/invoice/update',
        //6.发票类型列表
        invoiceTypeList: '/rest/web/common/invoice/invoiceTypeList',
        //7.获取发票图片
        getImg: '/rest/web/common/invoice/getImg',
        //8.图片归集接口
        webCollectByPic: '/rest/web/common/invoice/collectByPic',
        //9.PDF归集接口
        collectByPdf: '/rest/web/common/invoice/collectByPdf',
        //10.获取发票管理列表
        invoiceSelect: '/rest/web/common/invoice/invoiceSelect',
        //11.发票管理列表导出
        exportInvoiceList: '/rest/web/common/invoice/exportInvoiceList',
        //12.发票勾选导出
        exportInvoiceListByUuid: '/rest/web/common/invoice/exportInvoiceListByUuid',
        //13.获取可抵扣发票管理列表
        deductibleInvoiceSelect: '/rest/web/common/invoice/deductibleInvoiceSelect',
        //14.可抵扣发票管理列表导出
        exportDeductibleInvoiceList: '/rest/web/common/invoice/exportDeductibleInvoiceList',
        //15.可抵扣发票勾选导出
        exportDeductibleListByUuid: '/rest/web/common/invoice/exportDeductibleListByUuid',
        //16.获取发票列表页面顶部统计数据
        counts: '/rest/web/common/invoice/counts',
        //17.上传图片
        uploadImg: '/rest/web/common/invoice/uploadImg',
        //18.删除上传图片
        deleteImg: '/rest/web/common/invoice/deleteImg',
        //19.费用类型列表
        selectExpenseList: '/rest/web/common/invoice/selectExpenseList',
        //规则列表查询
        selectRulesByType: '/rest/web/common/rule/selectRulesByType',
        //停、启用规则
        disableRuleById: '/rest/web/common/rule/disableRuleById',
        //修改规则信息
        updateRuleById: '/rest/web/common/rule/updateRuleById',
        //获取企业信息列表接口
        selectEnterpriseList: '/rest/web/common/rule/selectEnterpriseList',
        //查询员工白名单列表接口
        selectUserWhiteList: '/rest/web/common/rule/selectUserWhiteList',
        //修改员工白名单信息
        updateWhiteUserById: '/rest/web/common/rule/updateWhiteUserById',
        //删除白名单信息
        disableWhiteById: '/rest/web/common/rule/disableWhiteById',
        //企业黑名单列表获取接口
        selectBlackEnterpriseList: '/rest/web/common/rule/selectBlackEnterpriseList',
        //新增企业黑名单信息接口
        insertBlackEnterprise: '/rest/web/common/rule/insertBlackEnterprise',
        //修改企业黑名单信息接口
        updateBlackEnterpriseById: '/rest/web/common/rule/updateBlackEnterpriseById',
        //删除黑名单信息接口
        disableBlackEnterpriseById: '/rest/web/common/rule/disableBlackEnterpriseById',
        //据用户名称，用户证件号码后四位匹配完整证件号码
        getIdentityNumberByNameAndFourID: '/rest/web/common/invoice/getIdentityNumberByNameAndFourID',
        //发票规则校验接口
        invoiceComplianceCheckWeb: '/rest/web/common/invoice/invoiceComplianceCheck',
        //发票查验接口
        checkInvoice: '/rest/web/common/invoice/checkInvoice',
        //上传源文件
        collectBySourceFile: '/web/common/invoice/collectBySourceFile',
        // 上传附件
        uploadFile: '/web/common/invoice/uploadFile',
    },
    app: {
        //生产环境
        appSelect: '/rest/app/common/invoice/select',
        //查看发票详情
        appFind: '/rest/app/common/invoice/find',
        //删除发票信息
        deleteInvoice: '/rest/app/common/invoice/delete',
        //其他发票保存接口
        collectByOther1: '/rest/app/common/invoice/collectByOther',
        //发票内容更新
        updateInvoice: '/rest/app/common/invoice/update',
        //获取发票类型列表
        getInvoiceType: '/rest/app/common/invoice/invoiceTypeList',
        //获取发票图片
        getInvoiceImg: '/rest/app/common/invoice/getImg',
        //图片方式归集发票
        appCollectByPic: '/rest/app/common/invoice/collectByPic',
        //二维码方式归集发票
        collectByQrcode: '/rest/app/common/invoice/collectByQrcode',
        //二维码上传发票图片
        uploadImg1: '/rest/app/common/invoice/uploadImg',
        //二维码删除发票图片
        deleteImg1: '/rest/app/common/invoice/deleteImg',
        //手动录入发票保存接口
        collectByHand: '/rest/app/common/invoice/collectByHand',
        //H5票夹接口url
        //获取费用类型
        selectExpenseList1: '/rest/app/common/invoice/selectExpenseList',
        //混扫保存发票接口
        updateList: '/rest/app/common/invoice/updateList',
        //混扫保存发票接口 web
        updateListWeb: '/rest/web/common/invoice/updateList',
        //据用户名称，用户证件号码后四位匹配完整证件号码
        getIdentity: '/rest/app/common/invoice/getIdentityNumberByNameAndFourID',
        // 发票规则校验接口
        invoiceComplianceCheck: '/rest/app/common/invoice/invoiceComplianceCheck',
        // 发票规则校验接口(混扫)
        invoiceComplianceCheckList: '/rest/app/common/invoice/invoiceComplianceCheckList',
        // 发票规则校验接口(混扫)
        invoiceComplianceCheckListWeb: '/rest/web/common/invoice/invoiceComplianceCheckList',
        // 获取滴滴信息
        getDDInfo: '/rest/app/common/invoice/getDDInfo',
        // 修改授权状态
        updateDdidUserInfo: '/rest/app/common/invoice/updateDdidUserInfo',
        // 修改存在状态
        getDDRuleState: '/rest/app/common/invoice/getDDRuleState',
    }

}