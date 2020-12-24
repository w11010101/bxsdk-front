import Vue from 'vue'
import VueRouter from 'vue-router'

import PCRouters from './pc/pcRouter';
import MobileRouters from './mobile/mobileRouter';
Vue.use(VueRouter)

const routes = [
  ...PCRouters,
  ...MobileRouters,
]
console.log('routes = ',routes);
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
