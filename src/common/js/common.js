export function IsPC() {
	var userAgentInfo = navigator.userAgent;
	var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
	var flag = true;
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
	}
	return flag;
}
// 图片压缩
export function compress(img, Orientation = null) {
	// console.log('img = ',img);
	let canvas = document.createElement("canvas");
	let ctx = canvas.getContext('2d');
	//瓦片canvas
	let tCanvas = document.createElement("canvas");
	let tctx = tCanvas.getContext("2d");
	let initSize = img.src.length;
	let width = img.width;
	let height = img.height;
	//如果图片大于100w像素，计算压缩比并将大小压至400万以下
	let ratio;
	// console.log(width ,height)
	if ((ratio = width * height / 100000) > 1) {
		// console.log("大于10万像素")
		ratio = Math.sqrt(ratio);
		width /= ratio;
		height /= ratio;
	} else {
		ratio = 1;
	}
	canvas.width = width;
	canvas.height = height;
	// 铺底色
	ctx.fillStyle = "#fff";
	ctx.fillRect(img, 0, 0, canvas.width, canvas.height);
	//如果图片像素大于100万则使用瓦片绘制
	let count;
	if ((count = width * height / 50000) > 1) {
		// console.log("超过5W像素");
		count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
		// 计算每块瓦片的宽和高
		let nw = ~~(width / count);
		let nh = ~~(height / count);
		tCanvas.width = nw;
		tCanvas.height = nh;
		for (let i = 0; i < count; i++) {
			for (let j = 0; j < count; j++) {
				tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
				ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
			}
		}
	} else {
		ctx.drawImage(img, 0, 0, width, height);
	}
	//修复ios上传图片的时候 被旋转的问题
	if (Orientation != "" && Orientation != 1) {
		switch (Orientation) {
			case 6: //需要顺时针（向左）90度旋转
				rotateImg(img, 'left', canvas);
				break;
			case 8: //需要逆时针（向右）90度旋转
				rotateImg(img, 'right', canvas);
				break;
			case 3: //需要180度旋转
				rotateImg(img, 'right', canvas); //转两次
				rotateImg(img, 'right', canvas);
				break;
		}
	}

	let ndata = canvas.toDataURL('image/jpeg', .5);
	// console.log(ndata.length)
	// console.log('压缩前：' + initSize);
	// console.log('压缩后：' + ndata.length);
	// console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
	tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;


	return ndata;
}
// base64转file
export function base64ToFile(base, filename) {

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
// 上传
export async function uploadFileFn(files) {
	let _files = [];
	for (let i = 0; i < files.length; i++) {
		_files.push(await compressFileFn(files[i]));
	}
	const uploaded = await uploadFn(_files);
	return uploaded;
}
// 文件压缩和转换
export function compressFileFn(file) {
	return new Promise((resolve, reject) => {
		let fr = new FileReader();
		fr.readAsDataURL(file);
		fr.onloadend = function(img) {

			let imgObj = new Image();
			imgObj.src = this.result;
			imgObj.onload = function() {
				// compress 图片压缩 
				let data = compress(imgObj);
				let _file = base64ToFile(data, file.name);
				resolve(_file);
			}

		}
	})
}
// 上传图片方法
export function uploadFn(files) {
	// axios
	console.log(2, files);
	return new Promise((resolve, reject) => {
		console.log('finish')
		setTimeout(function() {
			resolve(files)
		}, 1000);

	})
}
// 发票类型转换
export function getInvoiceTypeText(invoiceType) {
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
/*//专用增值税类型、机动车销售统一发票
this.majioAddTaxValue = ['01', '03'].indexOf(this.invoiceTypeCode) > -1 ? true : false;
//火车票、飞机行程单、公路、水路、其他客票
this.trainAndAirRoadWater = ['90', '93', '92', '87', '88', '89'].indexOf(this.invoiceTypeCode) > -1 ? true : false;
//普通增值税类型
this.normalAddTaxValue = ['04', '10', '11', '14'].indexOf(this.invoiceTypeCode) > -1 ? true : false;
//出租车、定额发票等其他发票
this.taxiAndQuota = ['51', '91', '94', '95', '97', '98'].indexOf(this.invoiceTypeCode) > -1 ? true : false;
//货物运输业增值税普通发票
this.transportAddTaxValue = this.invoiceTypeCode == '02' ? true : false;
//其他
this.otherValue = this.invoiceTypeCode == '00' ? true : false;*/
// 发票分类
export let invoiceCodeClass = {

	majioAddTaxValue: ['01', '03'], // 专用增值税类型、机动车销售统一发票

	trainAndAirRoadWater: ['90', '93', '92', '87', '88', '89'], // 火车票、飞机行程单、公路、水路、其他客票

	normalAddTaxValue: ['04', '10', '11', '14'], // 普通增值税类型

	taxiAndQuota: ['51', '91', '94', '95', '97', '98'], // 出租车、定额发票等其他发票

	transportAddTaxValue: "02", // 货物运输业增值税普通发票

	otherValue: '00', // 其他

	ZZSInvoiceCodes: ['01', '02', '03', '04', '10', '11', '14'], // 所有增值税

}

export function isToString(value) {
	let _toString = Object.prototype.toString;
	switch (_toString.call(value)) {
		case "[object String]":
			return 'String';
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
	}
}
// 日期格式化 20201212 => 2020-12-12
export function formatDate(data){
	console.log(data)
	if(data.includes('/')){
		return data.replace(/\//g,'-').split('-').map((item,index)=>{
			if(index!=0) {
				return parseInt(item)<10?('0'+item):item;
			}else{
				return item;
			}
		}).join('-');
	}else{
		return data.split('').map((item,index)=>{
			return [3,5].includes(index)?item+'-':item;
		}).join('');
	}
	
}
// _this.replaceAndSetPosMoney(e.target,/\d+\.?\d{0,2}/,"")
// function replaceAndSetPosMoney(obj, pattern, text) {
// 	// var pos = this.getCursorPos(obj); //保存原始光标位置
// 	var temp = obj.value; //保存原始值
// 	// obj.value=temp.replace(pattern,text);//替换掉非法值
// 	obj.value = temp.match(/\d+\.?\d{0,2}/, '')
// 	this.value = obj.value;
// 	this.$emit('input', obj.value);
// 	pos = pos - (temp.length - obj.value.length); //当前光标位置
// 	this.setCursorPos(obj, pos); //设置光标
// }