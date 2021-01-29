// pc routers
export default [
	{
	    path: '/pcIndex',
	    name: 'pcIndex',
	    component: () => import(/* webpackChunkName: "pc-index" */ '@/views/pc/index.vue'),
	    children:[
	    	{
			    path: '/invoice',
			    name: 'invoice',
	    		components:{
	    			pcView:() => import(/* webpackChunkName: "pc-index" */ '@/views/pc/invoice.vue'),
	    		},
	    		meta:{
	    			parent:'pc'
	    		}
	    	}
	    ]
	},
	
]