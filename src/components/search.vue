<template>
	<div class="search-tools">
		<van-row justify='center' align='center'>
			<van-col span='21'>
				<van-search v-model="searchVal" placeholder="请输入搜索关键词" clearable />
			</van-col>
			<van-col span='3'>
				<van-button class='search-filter-btn' icon="ellipsis" type="default" plain @click='filterShow=true'></van-button>
			</van-col>
			<van-popup v-model="filterShow" position="top" :get-container="getContainer">
				<van-search v-model="searchVal" placeholder="请输入搜索关键词" clearable show-action @cancel="onCancel" />
				<!-- 开票日期 -->
				<div class='search-dates'>
					<h2>开票日期</h2>
					<van-row justify='space-around' type="flex">
						<van-col v-for='item in getYears'>
							<van-button type="default" size='small'>{{item.label}}</van-button>
						</van-col>
					</van-row>
				</div>
				<!-- 发票类型 -->
				<div class="search-invoiceType">
					<h2>发票类型</h2>
					<van-row justify='space-around' type="flex" gutter="10">
						<van-col v-for='item in invoiceType' span='12' >
							<van-button type="default" block size='small'>{{item.invoiceTypeName}}</van-button>
						</van-col>
					</van-row>
				</div>
				<div class="search-floor-btn">
					<van-row justify='space-around' type="flex" gutter="10">
						<van-col  span='12' >
							<van-button type="default" block size='small'>重置</van-button>
						</van-col>
						<van-col  span='12' >
							<van-button type="info" block size='small'>确定</van-button>
						</van-col>
					</van-row>
				</div>
			</van-popup>
		</van-row>
		
	</div>
</template>
<script>
export default {
	data() {
		return {
			searchVal: '',
			filterShow: false,
			years: [{
				label: '全部',
				value: 'all'
			}],

			invoiceType: [
				{ "invoiceTypeName": "增值税专用发票", "invoiceTypeCode": "01" },
				{ "invoiceTypeName": "增值税普通发票", "invoiceTypeCode": "04" },
				{ "invoiceTypeName": "增值税普通发票(电子)", "invoiceTypeCode": "10" },
				{ "invoiceTypeName": "增值税普通发票(卷式)", "invoiceTypeCode": "11" },
				{ "invoiceTypeName": "增值税电子普通发票(通行费)", "invoiceTypeCode": "14" },
				{ "invoiceTypeName": "机动车销售统一发票", "invoiceTypeCode": "03" },
				{ "invoiceTypeName": "货运运输业增值税专用发票", "invoiceTypeCode": "02" },
				{ "invoiceTypeName": "出租车票", "invoiceTypeCode": "91" },
				{ "invoiceTypeName": "火车票", "invoiceTypeCode": "92" },
				{ "invoiceTypeName": "航空客运电子客票行程单", "invoiceTypeCode": "90" },
				{ "invoiceTypeName": "公路运输客票(实名）", "invoiceTypeCode": "89" },
				{ "invoiceTypeName": "水路运输客票(实名)", "invoiceTypeCode": "88" },
				{ "invoiceTypeName": "其他运输客票(实名)", "invoiceTypeCode": "87" },
				{ "invoiceTypeName": "汽车票", "invoiceTypeCode": "94" },
				{ "invoiceTypeName": "定额发票", "invoiceTypeCode": "95" },
				{ "invoiceTypeName": "通用机打发票", "invoiceTypeCode": "97" },
				{ "invoiceTypeName": "政府非税收收入一般缴款书", "invoiceTypeCode": "98" },
				{ "invoiceTypeName": "其他", "invoiceTypeCode": "00" }
			]
		}
	},
	computed: {
		getYears() {
			let year = parseInt(new Date().getFullYear());
			for (var i = 0; i < 3; i++) {
				this.years.unshift({
					label: year - i,
					value: year - i
				});
			}
			return this.years;
		}
	},
	mounted() {
		// this.getYears()

	},
	methods: {
		getContainer() {
			return document.querySelector('.search-getContainer');
		},
		onCancel() {
			this.filterShow = false
		}
	}
}
</script>
<style scoped="scoped">
.search-tools {
	height: 55px;
	background: #fff
}

.search-tools .van-search {
	/*padding: 6px 10px*/
}

.search-tools .search-filter-btn {
	height: 50px;
	line-height: 50px;
}

.search-tools .search-filter-btn {
	border: 0;
}

.search-dates,
.search-invoiceType {
	padding: 0px 20px;
	text-align: left;

}

.search-dates h2,
.search-invoiceType h2 {
	font-size: 14px;
	color: #595959;
	font-weight: normal;
}

.search-dates div,
.search-invoiceType div {
	display: flex;

}

.search-dates button{
	width: 80px;
}
.search-invoiceType{
	/*height:200px;*/
	overflow-y:auto;
}
.search-invoiceType .van-col {
	margin-bottom: 10px
}
.search-floor-btn{
	margin:10px 20px;
	text-align: justify;
}

</style>