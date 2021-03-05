<template>
	<div class="search-tools">
		<div class='search-box'>
			<div class='search-input'>
				<van-search v-model="searchVal" placeholder="请输入搜索关键词" clearable :show-action='showAction' @input='onInputFn' @clear='onSearchFn'>
					<template #action>
						<div @click="onSearchFn">搜索</div>
					</template>
				</van-search>
			</div>
			<div class='search-btns' v-show='!showAction'>
				<van-button class='search-filter-btn' type="default" plain @click='filterShow=true'>
					<van-icon name="filter-o" size='24' :color='isSearchState?"#229FFF":"#595959"' />
				</van-button>
				<van-button class='search-filter-btn' type="default" plain @click='onShareFn'>
					<van-icon name="share-o" size='24' />
				</van-button>
			</div>
		</div>
		<!-- 弹出层 -->
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
					<van-row justify="space-between" type="flex" gutter="10">
						<van-col v-for='(item,index) in invoiceType' span='12' :index='index%2 == 1?"odd":"even"'>
							<van-button :type="activeInvoiceType.includes(item.invoiceTypeCode)?'info':'default'" block size='small' @click='onChangeTypeFn(item,index)'>{{item.invoiceTypeName}}</van-button>
						</van-col>
					</van-row>
				</div>
			</div>
			<div class="search-floor-btn">
				<van-row justify='space-around' type="flex" gutter="10">
					<van-col span='12'>
						<van-button type="default" block size='small' @click='onRefreshFn'>重置</van-button>
					</van-col>
					<van-col span='12'>
						<van-button type="info" block size='small' @click='onSureFn'>确定</van-button>
					</van-col>
				</van-row>
			</div>
		</van-popup>
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
			showAction: false,
			activeDate: '',
			activeDateIndex: 0,
			activeDateMonth: "1",
			activeInvoiceType: [],
			isSearchState: false, // 控制筛选图标颜色，表示是否有筛选条件，在选项卡切换时给予参考
		}
	},

	computed: {
		...mapState(['invoiceType']),

	},
	mounted() {
		this.setYears();
	},
	methods: {
		// 根据当前日期设置年数组
		setYears() {
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
		// 弹窗容器
		getContainer() {
			return document.querySelector('.search-getContainer');
		},
		onCancel() {
			this.filterShow = false;
		},
		// 下拉筛选条件确定按钮
		onSureFn() {
			let searchContainer = {
				searchVal: this.searchVal,
				searchStartDate: this.transformDate('start', this.activeDateMonth),
				searchEndDate: this.transformDate('end', parseInt(this.activeDateMonth) + 1),
				searchInvoiceType: this.activeInvoiceType.join(',')
			}
			console.log(searchContainer)
			this.$emit('onSearchCallBack', searchContainer);
			this.filterShow = false;

			if (searchContainer.searchInvoiceType || searchContainer.searchStartDate) {
				this.isSearchState = true;
			} else {
				this.isSearchState = false;
			}



		},
		// 切换开票日期 年
		onChangeYearFn(item, index) {
			this.activeDate = item.value;
			this.activeDateIndex = index;
			this.activeDateMonth = 1;
		},
		// 切换开票日期 月
		onChangeMonthFn(item) {
			this.activeDateMonth = item;
		},
		// 切换发票类型
		onChangeTypeFn(item, index) {
			if (!this.activeInvoiceType.includes(item.invoiceTypeCode)) {
				this.activeInvoiceType.push(item.invoiceTypeCode);
			} else {
				this.activeInvoiceType = this.activeInvoiceType.filter(code => item.invoiceTypeCode != code)
			}
		},
		// 时间转换
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

		},
		// 搜索框内如果有值时显示搜索按钮
		onInputFn(value) {
			this.showAction = !value ? false : true;
		},
		// 搜索按钮
		onSearchFn() {
			console.log('搜索按钮')
			this.onSureFn()
		},
		// 重置按钮
		onRefreshFn() {
			console.log('重置')
			this.activeDate = 'all';
			this.activeDateIndex = this.years.length - 1;
			this.activeInvoiceType = [];
		},
		// 分享
		onShareFn(){
			this.$toast('暂时关闭分享功能')
		}
	}
}
</script>
<!-- 儿童医院 -->
<style scoped="scoped">
.search-tools {
	padding-right: 7px;
	background: #fff
}

.search-box {
	display: flex;
}

.search-box .search-input {
	flex: auto;
}

.search-box .search-btns {
	line-height: 54px;
}

.search-tools .search-filter-btn {
	width: 32px;
	height: 32px;
	padding: 0;
	border: 0;
	vertical-align: middle;
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

.search-invoiceType /deep/ .van-col--12:last-child[index="even"] {
	padding-right: 5px;
}
</style>