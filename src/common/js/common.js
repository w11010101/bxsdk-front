import Vue from 'vue';
import httpApi from '@/common/js/httpApi.js'
import EXIF from 'exif-js';
// 判断是否是PC
export function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
    }
    return flag;
}
/**
 * [compressFilesFn 上传前压缩]
 * @param  {[type]} file [file类型的文件，可能表示多张]
 * @param  {[type]} uuid []
 * @return {[type]} file [返回一个压缩后，再转成file格式的文件，可能表示多张]
 */
export async function compressFilesFn(file, uuid) {

    let files = [],
        _isObject = isToString(file) == 'Object';
    if (_isObject) {
        files.push(file);
    } else {
        files = file;
    }
    let _files = [];
    for (let i = 0; i < files.length; i++) {
        _files.push(await onCompressFn(files[i]));
    }
    return { file: _isObject ? _files[0] : _files, type: _isObject }
}
/**
 * [onCompressFn 文件压缩和转换]
 * @param  {[type]} file [file类型的文件]
 * @return {[type]} file [返回一个压缩后，再转成file格式的文件]
 */
export function onCompressFn(file) {
    return new Promise((resolve, reject) => {
        let fr = new FileReader();

        fr.readAsDataURL(file.file);
        fr.onloadend = function(img) {

            let imgObj = new Image();
            imgObj.src = this.result;
            imgObj.onload = function() {
                // compress 图片压缩 
                let base64 = compressFn(imgObj, transformImgFn(imgObj));
                let _file = base64ToFileFn(base64, file.file.name);
                resolve({ file: _file, base64 });
            }

        }
    })
}
/**
 * [transformImgFn 获取判断图片是否需要旋转的参数]
 * @param  {[type]} imgObj [Image对象]
 * @return {[Number]} Orientation [旋转参数]
 */
export function transformImgFn(imgObj) {
    let Orientation = null;
    EXIF.getData(imgObj, function() {
        Orientation = EXIF.getTag(this, "Orientation");
    });
    return Orientation;
}
/**
 * [compress description]
 * @param  {[type]} img         [description]
 * @param  {[type]} Orientation [description]
 * @return {[type]}             [description]
 */
export function compressFn(img, Orientation = null) {

    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext('2d');

    let initSize = img.src.length;
    let width = img.width;
    let height = img.height;

    canvas.width = width;
    canvas.height = height;
    // // 铺底色
    ctx.fillStyle = "#fff";
    ctx.fillRect(img, 0, 0, canvas.width, canvas.height);

    ctx.drawImage(img, 0, 0, width, height);
    //修复ios上传图片的时候 被旋转的问题
    if (Orientation != "" && Orientation != 1) {
        switch (Orientation) {
            case 6: //需要顺时针（向左）90度旋转
                rotateImgFn(img, 'left', canvas);
                break;
            case 8: //需要逆时针（向右）90度旋转
                rotateImgFn(img, 'right', canvas);
                break;
            case 3: //需要180度旋转
                rotateImgFn(img, 'right', canvas); //转两次
                rotateImgFn(img, 'right', canvas);
                break;
        }
    }

    let ndata = canvas.toDataURL('image/jpeg', 0.8);
    // console.log(ndata.length)
    // console.log('压缩前：' + initSize);
    // console.log('压缩后：' + ndata.length);
    // console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
    // tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
    return ndata;
}
// 图片旋转
export function rotateImgFn(img, direction, canvas) {
    //最小与最大旋转方向，图片旋转4次后回到原方向
    const min_step = 0;
    const max_step = 3;
    if (img == null) return;
    //img的高度和宽度不能在img元素隐藏后获取，否则会出错
    let height = img.height;
    let width = img.width;
    let step = 2;
    if (step == null) {
        step = min_step;
    }
    if (direction == 'right') {
        step++;
        //旋转到原位置，即超过最大值
        step > max_step && (step = min_step);
    } else {
        step--;
        step < min_step && (step = max_step);
    }
    //旋转角度以弧度值为参数
    let degree = step * 90 * Math.PI / 180;
    let ctx = canvas.getContext('2d');
    switch (step) {
        case 0:
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0);
            break;
        case 1:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, 0, -height);
            break;
        case 2:
            canvas.width = width;
            canvas.height = height;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, -height);
            break;
        case 3:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, 0);
            break;
    }
}
// base64转file

/**
 * 描述
 * @date 2021-01-19
 * @param {any} base
 * @param {any} filename
 * @returns {any}
 */
export function base64ToFileFn(base, filename) {

    let baseArr = base.split(','),
        mime = baseArr[0].match(/:(.*?);/) ? baseArr[0].match(/:(.*?);/)[1] : '',
        _atob = atob(baseArr[1]),
        l = _atob.length,
        _uint8 = new Uint8Array(l);
    while (l--) {
        _uint8[l] = _atob.charCodeAt(l)
    };
    let _file = new File([_uint8], filename, { type: mime });

    return _file;
}

// 发票类型转换
export function getInvoiceTypeTextFn(invoiceType) {
    if (invoiceType == "01") return "增值税专用发票";
    if (invoiceType == "02") return "货运运输业增值税专用发票";
    if (invoiceType == "03") return "机动车销售统一发票";
    if (invoiceType == "14") return "增值税电子普通发票(通行费)";
    if (invoiceType == "04") return "增值税普通发票";
    if (invoiceType == "10") return "增值税普通发票(电子)";
    if (invoiceType == "11") return "增值税普通发票(卷式)";
    if (invoiceType == "87") return "其他运输客票(实名)";
    if (invoiceType == "88") return "水路运输客票(实名)";
    if (invoiceType == "89") return "公路运输客票(实名)";
    if (invoiceType == "90") return "航空客运电子客票行程单";
    if (invoiceType == "92") return "火车票";
    if (invoiceType == "91") return "出租车票";
    if (invoiceType == "94") return "汽车票";
    if (invoiceType == "95") return "定额发票";
    if (invoiceType == "96") return "长途汽车票";
    if (invoiceType == "97") return "通用机打发票";
    if (invoiceType == "98") return "政府非税收收入一般缴款书";
    if (invoiceType == "00") return "其他";
}
// 发票分类
export let invoiceCodeClass = {

    majioAddTaxValue: ['01', '03'], // 专用增值税类型、机动车销售统一发票

    trainAndAirRoadWater: ['90', '93', '92', '87', '88', '89'], // 火车票、飞机行程单、公路、水路、其他客票

    normalAddTaxValue: ['04', '10', '11', '14'], // 普通增值税类型

    taxiAndQuota: ['51', '91', '94', '95', '97', '98'], // 出租车、定额发票等其他发票

    transportAddTaxValue: ["02"], // 货物运输业增值税普通发票

    otherValue: ['00'], // 其他

    VATsAllClass: ['01', '02', '03', '04', '10', '11', '14'], // 所有增值税

    // ------------------------------------------------
    // 相同表单字段的发票类型
    // 增值税普通发票、增值税普通发票(电子)、增值税普通发票(卷式)、增值税电子普通发票(通行费)
    VATSElectcClass: ['04', '10', '11', '14'],
    // 增值税专用发票、机动车销售统一发票、货运运输业增值税专用发票
    VATGClass: ['01', '03', '02'],
    // 火车票、公路、水路、其他（实名）
    trainAndRealNameClass: ['92', '87', '88', '89'],
    // 定额发票、通用、政府非税收
    QCGClass: ['95', '97', '98'],
    // 其他
    otherClass: ['00'],
}

export function filterInvoiceClassFn(code) {
    let keys = Object.keys(invoiceCodeClass);
    let filterInvoiceClass = '';
    keys.filter(key => {
        if (invoiceCodeClass[key].includes(code)) {
            filterInvoiceClass = invoiceCodeClass[key];
        }
    });
    return filterInvoiceClass;

}
/**
 * [isToString 类型判断]
 * @param  {[type]}  obj [任何对象]
 * @return {Boolean}     [返回类型，一般情况以字符串形式返回]
 */
export function isToString(obj) {
    let _toString = Object.prototype.toString;
    switch (_toString.call(obj)) {
        case "[object String]":
            return 'String';
            break;
        case "[object Array]":
            return 'Array';
            break;
        case "[object Object]":
            return 'Object';
            break;
        case "[object Number]":
            return 'Number';
            break;
        case "[object Boolean]":
            return 'Boolean';
            break;
        case "[object Function]":
            return 'Function';
            break;
        default: return undefined;

    }

}
// 查验状态
export function getCheckStateFn(value) {
    switch (value) {
        case "0":
            return '—';
            // return '未查验'; 
            break;
        case "1":
            return '查验成功';
            break;
        case "2":
            return '查验失败';
            break;
        default:
            return '查验成功'
    }
}
// 报销状态
export function getReimburseStateFn(value) {
    switch (value) {
        case "0":
            return '未报销';
            break;
        case "1":
            return '报销中';
            break;
        case "2":
            return '已报销';
            break;
    }
}
// 日期格式化 20201212 => 2020-12-12
export function formatDate(data) {
    if (!data) return '';
    if (data.includes('-')) return data;
    if (data.includes('/')) {
        return data.replace(/\//g, '-').split('-').map((item, index) => {
            if (index != 0) {
                return parseInt(item) < 10 ? ('0' + item) : item;
            } else {
                return item;
            }
        }).join('-');
    } else {

        return data.substr(0, 8).split('').map((item, index) => {
            return [3, 5].includes(index) ? item + '-' : item;
        }).join('');
    }
}
// 随机数
export function randomFn() {
    return parseInt(Math.random(1) * 100000000);
}

// 输入防抖
export function inputDebounce(fn, value, delay) {
    let timer = null;
    return (function() {
        if (timer) clearTimeout(timer);
        timer = setTimeout(fn, !value ? 0 : delay);
    })()
}
