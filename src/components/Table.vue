<template>
	<a-table
		:columns="columns"
		:data-source="dataClient"
		:rowKey="record => record.id"
	>
		<span slot="customTitle"
			>Название клиента <br />
			Адресс
		</span>
	</a-table>
</template>
<script>
const columns = [
	{
		dataIndex: 'client',
		key: 'name',
		width: '25%',
		slots: { title: 'customTitle' },
	},

	{
		title: 'Первый из списка почтовый адрес',
		dataIndex: 'email',
		width: '25%',
		key: 'email',
	},
	{
		title: 'Первый из списка номер телефона',
		dataIndex: 'phone',
		width: '25%',
		key: 'phone',
	},
	{
		title: 'Дата создания',
		dataIndex: 'createdTime',
		width: '25%',
		key: 'createdTime',
	},
];
export default {
	props: ['data'],
	data() {
		return {
			columns,
			dataLength: this.data.length,
			data1: this.data,
			dataClient: [],
		};
	},
	mounted() {
		let clientData = [];
		let clientName = [];
		let contactEmailData = [];
		let contactPhoneData = [];
		let addressData = [];
		let createdData = [];

		this.data1.map(client => {
			clientData.push(client.id);
			clientName.push(client.name);
			addressData.push(client.addresses[0].streetName);
			contactEmailData.push(client.contacts[0].emails[0]);
			contactPhoneData.push(client.contacts[0].phones[0]);
			createdData.push(client.createdAt);
		});

		for (let i = 0; i < this.dataLength; i++) {
			this.dataClient.push({
				id: clientData[i],
				// name: clientName[i],
				// address: addressData[i],
				client: clientName[i] + addressData[i],
				email: contactEmailData[i],
				phone: contactPhoneData[i],
				createdTime: createdData[i],
			});
		}
	},
};
</script>
