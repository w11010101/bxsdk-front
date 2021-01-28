// mobile routers
export default [

	{
		path: '/mobileIndex',
		name: 'mobileIndex',
		// route level code-splitting
		// this generates a separate chunk (index.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import( /* webpackChunkName: "mobile-index" */ '@/views/mobile/index.vue'),
		children: [{
			path: '/detail',
			name: 'detail',
			// route level code-splitting
			// this generates a separate chunk (index.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			components: {
				detailView: () => import( /* webpackChunkName: "mobile-index" */ '@/views/mobile/detail.vue'),
			},
			meta: {
				parent: 'app'
			}
		}]
	}
]