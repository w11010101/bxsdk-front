<template>
	<div class='invoice'>
		<!-- 筛选条件 -->
		<div class='filter-part'>
			<div class='filter-items'>
				<div class='inline'>
					<label>关键字：</label>
					<Input v-model="searchObj.searchVal" placeholder="请输入关键字" clearable />
				</div>
				<div class='inline'>
					<label>发票类型：</label>
					<Select v-model="searchObj.searchInvoiceType" multiple>
						<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</div>
				<div class='inline'>
					<label>开票日期：</label>
					<DatePicker :value="invoiceDate" format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="请选择开票时间"></DatePicker>
				</div>
				<div class='inline'>
					<label>关键字1：</label>
					<Input v-model="searchObj.searchVal" placeholder="请输入关键字" clearable />
				</div>
				<div class='inline'>
					<label>发票类型2：</label>
					<Select v-model="searchObj.searchInvoiceType" multiple>
						<Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
					</Select>
				</div>
				<div class='inline'>
					<label>开票日期3：</label>
					<DatePicker :value="invoiceDate" format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="请选择开票时间"></DatePicker>
				</div>
			</div>
			<div class='filter-btn'>
				<Button type='info'>查询</Button>
			</div>
		</div>
		<!-- 工具 -->
		<div class='tools-part'>
			<div class='tips-text'>
				<span>我的票夹</span>
			</div>
			<div class='tools-btns'>
				<Upload action="//jsonplaceholder.typicode.com/posts/" class='btn'>
					<Button type='info'>上传图片解析</Button>
				</Upload>
				<Upload action="//jsonplaceholder.typicode.com/posts/" class='btn'>
					<Button type='info'>上传PDF解析</Button>
				</Upload>
				<Button type='error' class='btn'>删除</Button>
			</div>
		</div>
		<!-- 表格数据 -->
		<div class='table-container-part'>
			<Table border :columns="columns" :data="tableData" :max-height='tableMaxHeight'></Table>
		</div>
		<!-- 分页 -->
		<div class="floor-page-part" v-if='tableData.length'>
			<Page :total="total" show-total :current.sync='page' class='floor-page' :page-size='rows' show-sizer show-elevator @on-change='pageChangeFn' @on-page-size-change='pageSizeChangeFn' />
		</div>
		<!-- 弹窗 -->
		<Modal v-model="popupState" width='700' scrollable title="编辑" class-name="vertical-center-modal">
	       	<DetailComponent></DetailComponent>
	    </Modal>
	    <!-- 删除 -->

	</div>
</template>
<script>
import httpApi from '@/common/js/httpApi.js'
import { getInvoiceTypeText, formatDate } from '@/common/js/common.js';
import DetailComponent from '@/views/pc/detail.vue'
export default {
	components:{
		DetailComponent
	},
	data() {
		return {
			value: '',
			invoiceDate: ['2016-01-01', '2016-02-15'],
			tableMaxHeight: 500,
			columns: [{
					type: 'selection',
					width: 60,
					align: 'center',
					fixed: 'left'
				}, {
					type: 'index',
					width: 70,
					align: 'center',
					title: '序号'
				},
				{
					title: '发票类型',
					key: 'invoiceTypeCode',
					width: 200,
					render: (h, params) => {
						return h('span', getInvoiceTypeText(params.row.invoiceTypeCode));
					}
				},
				{
					title: '发票号码',
					key: 'invoiceNo',
					width: 120,
				},
				{
					title: '发票代码',
					key: 'invoiceCode',
					width: 120,
				},
				{
					title: '开票日期',
					key: 'invoiceDate',
					width: 120,
					render: (h, params) => {
						return h('span', formatDate(params.row.invoiceDate))
					}
				},
				{
					title: '开票项目',
					key: 'goodsName',
					width: 200,
				},
				{
					title: '发票金额',
					key: 'invoiceAmount',
					width: 100,
				},
				{
					title: '销方名称',
					key: 'salerName',
					minWidth: 200
				},
				{
					title: '操作',
					key: 'action',
					width: 150,
					align: 'center',
					fixed: 'right',
					render: (h, params) => {
						return h('div', [
							h('Button', {
								props: {
									type: 'info',
									size: 'small'
								},
								style: {
									marginRight: '5px'
								},
								on: {
									click: () => {
										// this.show(params.index);
										this.popupState = true;
									}
								}
							}, '编辑'),
							h('Button', {
								props: {
									type: 'error',
									size: 'small'
								},
								on: {
									click: () => {
										this.remove(params.index)
									}
								}
							}, '删除')
						]);
					}
				}
			],
			tableData: [],
			page: 1,
			rows: 10,
			searchObj: {
				searchStartDate: '',
				searchEndDate: '',
				searchInvoiceType: '01',
				searchVal: '',
			},
			total: 0,
			cityList: [{
					value: 'New York',
					label: 'New York'
				},
				{
					value: 'London',
					label: 'London'
				},
				{
					value: 'Sydney',
					label: 'Sydney'
				},
				{
					value: 'Ottawa',
					label: 'Ottawa'
				},
				{
					value: 'Paris',
					label: 'Paris'
				},
				{
					value: 'Canberra',
					label: 'Canberra'
				}
			],
			popupState:false
		}
	},
	mounted() {
		this.select();
		this.$nextTick().then(() => {
			this.getTablePartHeight();
		})

	},
	methods: {
		getInvoiceTypeText,
		formatDate,
		select() {
			this.axios({
				url: httpApi.pc.select,
				data: {
					startTime: this.searchObj.searchStartDate || '', //发票开始时间
					endTime: this.searchObj.searchEndDate || '', //发票结束时间
					reimburseState: this.active, //报销状态
					invoiceTypeCode: this.searchObj.searchInvoiceType || '', //发票类型串
					dateRank: this.dateRank, //开票时间排序
					dimParam: this.searchObj.searchVal || '', //模糊参数
					page: this.page, //页码
					rows: this.rows //条数	
				}
			}).then(resolve => {
				console.log('resolve = ', resolve);
				if (resolve.data.length) {
					this.total = resolve.total
					this.$set(this.$data, 'tableData', resolve.data);
					this.getTablePartHeight();
				} else {
					this.$toast({
						message: '暂无数据',
						duration: 1500,
					});

				}
			}).catch(reject => {
				console.log('reject = ', reject);
			});
		},
		pageChangeFn() {
			this.select();
		},
		pageSizeChangeFn(rows) {
			this.rows = rows;
			this.page = 1;
			this.select();
		},
		getTablePartHeight() {
			let invoice = document.querySelector('.invoice');
			let filterPart = document.querySelector('.filter-part');
			let toolsPart = document.querySelector('.tools-part');
			let floorPart = document.querySelector('.floor-page-part');

			this.tableMaxHeight = invoice.offsetHeight - filterPart.offsetHeight - toolsPart.offsetHeight - (floorPart ? floorPart.offsetHeight : 0) - 50;
			// console.log(invoice , filterPart , toolsPart , floorPart)
		}
	}
}
</script>
<style lang="scss" scoped>
@import '../../common/css/pc.scss';
</style>