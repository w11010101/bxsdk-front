// 个性化定制
export default {
    totalNum: {
        label: '总张数',
        // value: '',
        placeholder: '请输入总张数',
        required: false,
        rules: [{ required: false, validator: valueValidator, message: '总张数不能为空' }],
        maxLength: 11,
        // reg: /^\D*(\d*(?:\.\d{0,2})?).*$/g,
        readonly: false,
    },
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