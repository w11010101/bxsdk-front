<template>
	<!-- formData 分类：增票类、费增票（火车，飞机，定额，等） -->
				<!-- 增值税专用发票、机动车销售统一发票、货运运输业增值税专用发票 -->
				<template v-if='VATGClass.includes(localData.invoiceTypeCode)'>
					<FormDataItem ref='formDataItem' :showOptions='VATGOptions' :key='random' :data='localData' :isReadOnly='isReadOnly' @onInputFn='onInputFn' @onBlurFn='onBlurFn'></FormDataItem>
				</template>
				<!-- 增值税普通发票、增值税普通发票(电子)、增值税普通发票(卷式)、增值税电子普通发票(通行费) -->
				<template v-if='VATSElectcClass.includes(localData.invoiceTypeCode)'>
					<FormDataItem ref='formDataItem' :showOptions='VATSElectcOption' :key='random' :data='localData' :isReadOnly='isReadOnly' @onInputFn='onInputFn' @onBlurFn='onBlurFn'></FormDataItem>
				</template>
				<!-- 航空 -->
				<template v-if='localData.invoiceTypeCode === "90"'>
					<FormDataItem ref='formDataItem' :showOptions='aviationShowOptions' :key='random' :data='localData' :isReadOnly='isReadOnly' @onInputFn='onInputFn' @onBlurFn='onBlurFn'></FormDataItem>
				</template>
				<!-- 出租车票 -->
				<template v-if='localData.invoiceTypeCode === "91"'>
					<FormDataItem ref='formDataItem' :showOptions='taxiShowOptions' :data='localData' :key='random' :isReadOnly='isReadOnly' @onInputFn='onInputFn' @onBlurFn='onBlurFn'></FormDataItem>
				</template>
				<!-- 火车票、公路、水路、其他（实名） -->
				<template v-if='trainAndRealNameClass.includes(localData.invoiceTypeCode)'>
					<FormDataItem ref='formDataItem' :showOptions='trainAndRealNameShowOptions' :data='localData' :key='random' :isReadOnly='isReadOnly' @onInputFn='onInputFn' @onBlurFn='onBlurFn'></FormDataItem>
				</template>
				<!-- 汽车票 -->
				<template v-if='localData.invoiceTypeCode === "94"'>
					<FormDataItem ref='formDataItem' :showOptions='carShowOptions' :data='localData' :key='random' :isReadOnly='isReadOnly' @onInputFn='onInputFn' @onBlurFn='onBlurFn'></FormDataItem>
				</template>
				<!-- 定额发票、通用、政府非税收 -->
				<template v-if='QCGClass.includes(localData.invoiceTypeCode)'>
					<FormDataItem ref='formDataItem' :showOptions='QCGShowOptions' :data='localData' :key='random' :isReadOnly='isReadOnly' @onInputFn='onInputFn' @onBlurFn='onBlurFn'></FormDataItem>
				</template>
				<!-- 其他 -->
				<template v-if='localData.invoiceTypeCode === "00"'>
					<FormDataItem ref='formDataItem' :showOptions='otherShowOptions' :data='localData' :key='random' :isReadOnly='isReadOnly' @onInputFn='onInputFn' @onBlurFn='onBlurFn'></FormDataItem>
				</template>
</template>