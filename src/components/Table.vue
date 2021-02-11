<template>
  <a-table
    :style="{ whiteSpace: 'pre' }"
	:pagination="{defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30']}"
    :columns="columns"
    :data-source="dataClient"
    :rowKey="(record) => record.id"
  >
    <span slot="customTitle">Название клиента<br />Адрес </span>
  </a-table>
</template>
<script>
const columns = [
  {
    dataIndex: "client",
    key: "name",
    width: "25%",
    slots: { title: "customTitle" },
  },

  {
    title: "Первый из списка почтовый адрес",
    dataIndex: "email",
    width: "25%",
    key: "email",
  },
  {
    title: "Первый из списка номер телефона",
    dataIndex: "phone",
    width: "25%",
    key: "phone",
  },
  {
    title: "Дата создания",
    dataIndex: "createdTime",
    width: "25%",
    key: "createdTime",
  },
];
export default {
  props: ["data"],
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
    let addressNumber = [];
    let createdData = [];

    const monthList = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let editText = (name, address, addressNumber) => {
      return name + "\n" + address + " " + addressNumber;
    };

    const translateDate = (theDate) => {
		const time = theDate.toString().slice(11, 16)
		const dateArr = theDate.toString().slice(0, 10).split("-");
      const day = dateArr[2];
      const month = monthList[--dateArr[1]];
      const year = dateArr[0];
      return day + " " + month + " " + year + " " + time;
    };

    this.data1.map((client) => {
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
.ant-table-pagination{
	display: flex;
}
</style>