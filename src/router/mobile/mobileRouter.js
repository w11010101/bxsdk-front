// mobile routers
export default [

	{
		path: '/mobileIndex',
		name: 'mobileIndex',
		component: () => import( /* webpackChunkName: "mobile-index" */ '@/views/mobile/index.vue'),
		meta: {
			parent: 'app'
		},
		children: [{
			path: '/detail',
			name: 'detail',
			components: {
				detailView: () => import( /* webpackChunkName: "mobile-index" */ '@/views/mobile/detail.vue'),
			},
			meta: {
				parent: 'app'
			}
		}]
	}
]