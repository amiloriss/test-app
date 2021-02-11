<template>
	<a-table :columns="columns" :data-source="dataClient">
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
	},
	{
		title: 'Первый из списка почтовый адрес',
		dataIndex: 'email',
		key: 'email',
	},
	{
		title: 'Первый из списка номер телефона',
		dataIndex: 'Contacts',
		key: 'Contacts',
	},
	{
		title: 'Дата создания',
		dataIndex: 'createdTime',
		key: 'createdAt',
	},
];
export default {
	props: ['data'],
	data() {
		return {
			columns,
			dataLength: this.data.length,
			data1: this.data,
			clientData: [],
			contactEmailData: [],
			contactPhoneData: [],
			addressData: [],
			createdData: [],
			dataClient: [],
		};
	},
	mounted() {
		// let client = {
		// 	clientId: client.id,
		// 	name: client.name,
		// 	streetName: client.addresses[0].streetName,
		// 	email: client.contacts[0].emails[0],
		// 	phone: client.contacts[0].phones[0],
		// 	createdTime: client.createdAt,
		// };
		this.data1.map(client => {
			this.clientData.push(client.id);
			this.addressData.push(client.addresses[0].streetName);
			this.contactEmailData.push(client.contacts[0].emails[0]);
			this.contactPhoneData.push({
				phone: client.contacts[0].phones[0],
			});
			this.createdData.push({
				createdTime: client.createdAt,
			});
		});

		for (let i = 0; i < this.dataLength; i++) {
			this.dataClient.push({
				id: this.clientData[i],
				address: this.addressData[i],
				email: this.contactEmailData[i],
			});
		}
		console.log(this.dataClient);

		// this.data1.map(client => {
		// 	this.clientData.push({ clientId: client.id, name: client.name });
		// 	this.addressData.push({
		// 		addressId: client.addresses[0].clientId,
		// 		streetName: client.addresses[0].streetName,
		// 	});
		// 	this.contactEmailData.push({
		// 		emailId: client.contacts[0].clientId,
		// 		email: client.contacts[0].emails[0],
		// 	});
		// 	this.contactPhoneData.push({
		// 		phoneId: client.contacts[0].clientId,
		// 		phone: client.contacts[0].phones[0],
		// 	});
		// 	this.createdData.push({
		// 		createdId: client.id,
		// 		createdTime: client.createdAt,
		// 	});
		// });
	},
};
</script>
