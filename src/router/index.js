import Vue from 'vue'
import VueRouter from 'vue-router'
import { IsPC } from '@/common/js/common';
import PCRouters from './pc/pcRouter';
import MobileRouters from './mobile/mobileRouter';
Vue.use(VueRouter)

const routes = [
	...PCRouters,
	...MobileRouters,
];

const router = new VueRouter({
	// mode: process.env.NODE_ENV !== 'development' ? 'hash' : 'history',
	mode: 'hash',
	base: process.env.BASE_URL,
	routes
})
router.beforeEach((to, form, next) => {
	if (!to.query.uuid) {
		to.meta['main'] = true; // 用来识别首次进入是不是二维码，true为不是
	}
	next();
})
export default router