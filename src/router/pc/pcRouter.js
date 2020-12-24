// pc routers
export default [
	{
	    path: '/pcIndex',
	    name: 'pcIndex',
	    component: () => import(/* webpackChunkName: "pc-index" */ '@/views/pc/index.vue')
	},
	
]