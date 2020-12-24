export default {
	IsPC() {
		var userAgentInfo = navigator.userAgent;
		var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
		var flag = true;
		for (var v = 0; v < Agents.length; v++) {
			if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
		}
		return flag;
	},
	// 图片压缩
	compress(img, Orientation = null) {
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
	},
	base64ToFile(base, filename) {
		let baseArr = base.split(','),
			mime = baseArr[0].match(/:(.*?);/)[1],
			_atob = atob(baseArr[1]),
			l = _atob.length,
			_uint8 = new Uint8Array(l);
		while (l--) {
			_uint8[l] = _atob.charCodeAt(l)
		};
		let _file = new File([_uint8], filename, { type: mime });
		// console.log(_file);
		return _file;

	}

}