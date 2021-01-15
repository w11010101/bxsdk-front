<template>
	<div class='pc-detail'>
		<Row>
			<Col span='12'>
			<div>
				<label>发票类型：</label>
				<Input v-model="value" placeholder="Enter something..." />
			</div>
			</Col>
			<Col span='12'>
			2
			</Col>
		</Row>
	</div>
</template>
<script>
export default {
	data() {
		return {
			value: '11'
		}
	},
	methods: {

	}
}
</script>
<style lang="scss">
.pc-detail {
	label {
		display: inline-block;
		width: 80px;
		text-align: left;
	}

	label+div {
		width: calc(100% - 100px);
	}
}
</style>