<template>
	<a-table :columns="columns" :data-source="data">
		<span slot="customTitle"
			>Название клиента <br />
			Адресс
		</span>
	</a-table>
</template>
<script>
const columns = [
	{
		dataIndex: 'name',
		key: 'name',
		slots: { title: 'customTitle' },
		scopedSlots: { customRender: 'name' },
	},
	{
		title: 'Age',
		dataIndex: 'age',
		key: 'age',
	},
	{
		title: 'Address',
		dataIndex: 'address',
		key: 'address',
	},
];

// const data1 = [
// 	{
// 		key: '1',
// 		name: 'John Brown',
// 		age: 32,
// 		address: 'New York No. 1 Lake Park',
// 		tags: ['nice', 'developer'],
// 	},
// 	{
// 		key: '2',
// 		name: 'Jim Green',
// 		age: 42,
// 		address: 'London No. 1 Lake Park',
// 		tags: ['loser'],
// 	},
// 	{
// 		key: '3',
// 		name: 'Joe Black',
// 		age: 32,
// 		address: 'Sidney No. 1 Lake Park',
// 		tags: ['cool', 'teacher'],
// 	},
// ];

export default {
	props: ['data'],
	data() {
		return {
			columns,
		};
	},
};
</script>
