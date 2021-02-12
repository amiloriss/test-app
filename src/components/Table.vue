<template>
	<a-table
		:style="{ whiteSpace: 'pre' }"
		:pagination="{
			defaultPageSize: 10,
			showSizeChanger: true,
			pageSizeOptions: ['10', '20', '30'],
		}"
		:columns="columns"
		:data-source="dataClient"
		:rowKey="record => record.id"
	>
		<div
			slot="filterDropdown"
			slot-scope="{
				setSelectedKeys,
				selectedKeys,
				confirm,
				clearFilters,
				column,
			}"
			style="padding: 8px"
		>
			<a-input
				v-ant-ref="c => (searchInput = c)"
				:placeholder="`Search ${column.dataIndex}`"
				:value="selectedKeys[0]"
				style="width: 200px; margin-bottom: 8px; display: block;"
				@change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
				@pressEnter="
					() => handleSearch(selectedKeys, confirm, column.dataIndex)
				"
			/>
			<a-button
				type="primary"
				icon="search"
				size="small"
				style="width: 90px; margin-right: 8px"
				@click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
			>
				Search
			</a-button>
			<a-button
				size="small"
				style="width: 90px"
				@click="() => handleReset(clearFilters)"
			>
				Reset
			</a-button>
		</div>
		<a-icon
			slot="filterIcon"
			slot-scope="filtered"
			type="search"
			:style="{
				color: filtered ? '#108ee9' : undefined,
			}"
		/>
		<template slot="customRender" slot-scope="text, record, index, column">
			<span v-if="searchText && searchedColumn === column.dataIndex">
				<template
					v-for="(fragment, i) in text
						.toString()
						.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
				>
					<span
						v-if="fragment.toLowerCase() === searchText.toLowerCase()"
						:key="i"
						class="highlight"
						>{{ fragment }}</span
					>
					<template v-else>{{ fragment }}</template>
				</template>
			</span>
			<template v-else>
				{{ text }}
			</template>
		</template>
	</a-table>
</template>
<script>
export default {
	props: ['tableData'],
	data() {
		return {
			columns: [
				{
					title: 'Название клиента / Адрес',
					dataIndex: 'client',
					key: 'client',
					width: '25%',
					slots: { title: 'customTitle' },
					scopedSlots: {
						filterDropdown: 'filterDropdown',
						filterIcon: 'filterIcon',
						customRender: 'customRender',
					},
					onFilter: (value, record) => {
						return record.client
							.toString()
							.toLowerCase()
							.includes(value.toLowerCase().trim());
					},
					onFilterDropdownVisibleChange: visible => {
						if (visible) {
							setTimeout(() => {
								this.searchInput.focus();
							}, 0);
						}
					},
				},
				{
					title: 'Первый из списка почтовый адрес',
					dataIndex: 'email',
					width: '25%',
					key: 'email',
					scopedSlots: {
						filterDropdown: 'filterDropdown',
						filterIcon: 'filterIcon',
						customRender: 'customRender',
					},
					onFilter: (value, record) =>
						record.email
							.toString()
							.toLowerCase()
							.includes(value.toLowerCase().trim()),
					onFilterDropdownVisibleChange: visible => {
						if (visible) {
							setTimeout(() => {
								this.searchInput.focus();
							});
						}
					},
				},
				{
					title: 'Первый из списка номер телефона',
					dataIndex: 'phone',
					width: '25%',
					key: 'phone',
					scopedSlots: {
						filterDropdown: 'filterDropdown',
						filterIcon: 'filterIcon',
						customRender: 'customRender',
					},
					onFilter: (value, record) =>
						record.phone
							.toString()
							.toLowerCase()
							.includes(value.toLowerCase().trim()),
					onFilterDropdownVisibleChange: visible => {
						if (visible) {
							setTimeout(() => {
								this.searchInput.focus();
							});
						}
					},
				},
				{
					title: 'Дата создания',
					dataIndex: 'createdTime',
					width: '25%',
					key: 'createdTime',
				},
			],
			dataLength: this.tableData.length,
			data: this.tableData,
			dataClient: [],
			searchText: '',
			searchInput: '',
			searchedColumn: '',
		};
	},
	methods: {
		handleSearch(selectedKeys, confirm, dataIndex) {
			confirm();
			this.searchText = selectedKeys[0];
			this.searchedColumn = dataIndex;
		},

		handleReset(clearFilters) {
			clearFilters();
			this.searchText = '';
		},
	},
	mounted() {
		let clientData = [];
		let clientName = [];
		let contactEmailData = [];
		let contactPhoneData = [];
		let addressData = [];
		let addressNumber = [];
		let createdData = [];

		const monthList = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];

		let editText = (name, address, addressNumber) => {
			return name + '\n' + address + ' ' + addressNumber;
		};

		const translateDate = theDate => {
			const time = theDate.toString().slice(11, 16);
			const dateArr = theDate
				.toString()
				.slice(0, 10)
				.split('-');
			const day = dateArr[2];
			const month = monthList[--dateArr[1]];
			const year = dateArr[0];
			return day + ' ' + month + ' ' + year + ' ' + time;
		};

		this.data.map(client => {
			clientData.push(client.id);
			clientName.push(client.name);
			addressData.push(client.addresses[0].streetName);
			addressNumber.push(client.addresses[0].streetNumber);
			contactEmailData.push(client.contacts[0].emails[0]);
			contactPhoneData.push(client.contacts[0].phones[0]);
			createdData.push(client.createdAt);
		});

		for (let i = 0; i < this.dataLength; i++) {
			this.dataClient.push({
				id: clientData[i],
				client: editText(clientName[i], addressData[i], addressNumber[i]),
				email: contactEmailData[i],
				phone: contactPhoneData[i],
				createdTime: translateDate(createdData[i]),
			});
		}
	},
};
</script>

<style>
.ant-table-thead > tr > th,
.ant-table table {
	text-align: center !important;
}
.ant-table-wrapper::before {
	white-space: normal;
}
.ant-table-pagination {
	display: flex;
}
</style>
