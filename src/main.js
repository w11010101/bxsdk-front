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
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

