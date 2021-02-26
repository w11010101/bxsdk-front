<template>
	<div class="pc-index">
		<Layout :style="{minHeight: '100vh'}">
			<Sider v-model="isCollapsed">
				<Menu active-name="1-1" theme="dark" width="auto" :class="menuitemClasses">
					<MenuItem :name="item.key" v-for='item in menu'>
					<span>{{item.label}}</span>
					</MenuItem>
				</Menu>
			</Sider>
			<Layout>
				<Content class='container'>
					<router-view name='pcView'></router-view>
				</Content>
			</Layout>
		</Layout>
	</div>
</template>
<script>
export default {
	name: 'Home',
	data() {
		return {
			msg: 'pc-index',
			isCollapsed: false,
			menu: [{
					label: '我的票夹',
					router: "",
					key: '1-1'
				}, {
					label: '票据规则',
					router: "",
					key: '1-2'
				},
				{
					label: '合规性规则',
					router: "",
					key: '1-3'
				}, {
					label: '发票管理',
					router: "",
					key: '1-4'
				},
			],
			value: ''
		}
	},
	computed: {
		menuitemClasses: function() {
			return [
				'menu-item',
				this.isCollapsed ? 'collapsed-menu' : ''
			]
		}
	},
	created() {
		console.log(96,require)
		console.dir(require)
		let iviewCss = require('iview/dist/styles/iview.css');
		this.$router.push({
			name: 'invoice'
		})
	},
	components: {}
}
</script>

<style scoped="scoped">

.ivu-menu-item {
	text-align: left;
}

.container {
	padding: 20px;
	height: calc(100vh - 40px);
	overflow: hidden
}
</style>