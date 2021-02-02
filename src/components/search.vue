<template>
	<div class="search-tools">
		<van-row justify='center' align='center'>
			<van-col span='21'>
				<van-search v-model="searchVal" placeholder="请输入搜索关键词" clearable />
			</van-col>
			<van-col span='3'>
				<van-button class='search-filter-btn' type="default" plain @click='filterShow=true'>
					<van-icon name="filter-o" size='24' />
				</van-button>
			</van-col>
			<van-popup v-model="filterShow" position="top" :get-container="getContainer">
				<van-search v-model="searchVal" placeholder="请输入搜索关键词" clearable show-action @cancel="onCancel" />
				<!-- 开票日期 -->
				<div class='search-dates'>
					<h2>开票日期</h2>
					<van-row justify='space-around' type="flex" gutter="5">
						<!-- 年 -->
						<van-col v-for='(item,index) in years' span='6'>
							<van-button :type="activeDateIndex === index?'info':'default'" size='small' @click='onChangeYearFn(item,index)'>{{item.label}}</van-button>
						</van-col>
						<!-- 月份 -->
						<van-col class='search-month' v-for='item in 12' span='4' v-if='activeDate!=="all"'>
							<van-button class='item-month' :type="activeDateMonth === item?'info':'default'" size='mini' @click='onChangeMonthFn(item)'>{{item}}</van-button>
						</van-col>
					</van-row>
				</div>
				<!-- 发票类型 -->
				<div class="search-invoiceType">
					<h2>发票类型</h2>
					<div class='search-invoiceType-list'>
						<van-row justify='space-around' type="flex" gutter="10">
							<van-col v-for='(item,index) in invoiceType' span='12'>
								<van-button :type="activeInvoiceTypeIndex === index?'info':'default'" block size='small' @click='onChangeTypeFn(item,index)'>{{item.invoiceTypeName}}</van-button>
							</van-col>
						</van-row>
					</div>
				</div>
				<div class="search-floor-btn">
					<van-row justify='space-around' type="flex" gutter="10">
						<van-col span='12'>
							<van-button type="default" block size='small'>重置</van-button>
						</van-col>
						<van-col span='12'>
							<van-button type="info" block size='small' @click='onSureFn'>确定</van-button>
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

			activeDate: '',
			activeDateIndex: 0,
			activeDateMonth: "1",
			activeInvoiceType: '',
			activeInvoiceTypeIndex: '',
		}
	},

	computed: {
		...mapState(['invoiceType']),

	},
	mounted() {
		this.getYears();
	},
	methods: {
		getYears() {
			let year = parseInt(new Date().getFullYear());
			for (var i = 0; i < 3; i++) {
				this.years.unshift({
					label: year - i,
					value: year - i
				});
			}
			this.activeDateIndex = this.years.length - 1;
			this.activeDate = this.years[this.activeDateIndex].value;
			return this.years;
		},
		getContainer() {
			return document.querySelector('.search-getContainer');
		},
		onCancel() {
			this.filterShow = false;
		},
		onSureFn() {
			this.$emit('onSearchCallBack', {
				searchVal: this.searchVal,
				searchStartDate: this.transformDate('start', this.activeDateMonth),
				searchEndDate: this.transformDate('end', parseInt(this.activeDateMonth) + 1),
				searchInvoiceType: this.activeInvoiceType
			});
			this.filterShow = false;
		},
		onChangeYearFn(item, index) {
			this.activeDate = item.value;
			this.activeDateIndex = index;
			this.activeDateMonth = 1;
		},
		onChangeMonthFn(item) {
			this.activeDateMonth = item;
		},
		onChangeTypeFn(item, index) {
			this.activeInvoiceType = item.invoiceTypeCode;
			this.activeInvoiceTypeIndex = index;

		},
		transformDate(type, month) {
			if (this.activeDate !== 'all') {
				if (type == 'start') {
					return this.activeDate + '-' + (month < 10 ? '0' + month : month) + '-01';
				} else {
					return new Date(new Date(month >= 12 ? this.activeDate + 1 + '-01-01' : this.activeDate + '-' + month + '-01').getTime() - 1000 * 60 * 60 * 24).toLocaleDateString().replace(/\//g, '-');
				}
			} else {
				return ''
			}

		}
	}
}
</script>
<!-- 儿童医院 -->
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

.search-tools .search-filter-btn i {

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

.search-dates button {
	width: 80px;
}

.search-invoiceType-list {
	height: 30vh;
	overflow-y: auto;

}

.search-invoiceType .van-col {
	margin-bottom: 10px
}

.search-floor-btn {
	margin: 10px 20px;
	text-align: justify;
}

.search-month .item-month {
	margin: 5px 0;
}
</style>