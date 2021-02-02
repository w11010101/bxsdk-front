import Vue from 'vue'
import VueRouter from 'vue-router'

import PCRouters from './pc/pcRouter';
import MobileRouters from './mobile/mobileRouter';
Vue.use(VueRouter)

const routes = [
	...PCRouters,
	...MobileRouters,
]
const router = new VueRouter({
	mode: process.env.NODE_ENV !== 'development' ? 'hash' : 'history',
	base: process.env.BASE_URL,
	routes
})

export default router