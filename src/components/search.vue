<template>
	<div class="search-tools">
		<van-row justify='center' align='center'>
			<van-col span='21'>
				<van-search v-model="searchVal" placeholder="请输入搜索关键词" clearable />
			</van-col>
			<van-col span='3'>
				<van-button class='search-filter-btn'  type="default" plain @click='filterShow=true'>
					<van-icon name="filter-o" size='24'/>
				</van-button>
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
	import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			searchVal: '',
			filterShow: false,
			years: [{
				label: '全部',
				value: 'all'
			}],

			
		}
	},
	computed: {
		...mapState(['invoiceType']),
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
	
	border: 0;
}
.search-tools .search-filter-btn i{

	line-height: 55px;
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