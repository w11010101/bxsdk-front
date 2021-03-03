// babel
import "babel-polyfill";
import promise from 'es6-promise';
promise.polyfill();

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// vantComponents
import vantComponents from './common/js/vantComponents.js';
// iview
import iView from 'iview';
Vue.use(iView);
import { IsPC } from '@/common/js/common'
// vConsole
// var vConsole = new VConsole();
Vue.config.productionTip = false;
// axios
import axios from 'axios';
import { _axios } from './common/js/request.js';
Vue.prototype.axios = _axios;
Vue.prototype.$axios = axios;
// zepto
Vue.prototype.$zepto = $;
let VM = new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');

// 防抖
function debounce(fn, delay) {
	let timer = null;
	return function() {
		if (timer) clearTimeout(timer);
		timer = setTimeout(fn, delay);
	}
}

// 节流
function throttle(delay) {
	let timer = null,
		state = true;
	return function() {
		if (!state) return;
		state = false;
		timer = setTimeout(function() {
			console.log(delay, VM.$route)
			state = true;
		}, delay)
	}
}
window.onresize = debounce(function() {
	console.log(5, VM.$route.meta.parent)
	if (IsPC()) {
		if (VM.$route.meta.parent !== 'pc') {
			VM.$router.replace('pcIndex');
		}
	} else {
		if (VM.$route.meta.parent !== 'app') {
			VM.$router.replace('mobileIndex');
		}
	}
}, 500);
// window.onresize = throttle(1000)