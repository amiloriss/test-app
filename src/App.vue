<template>
	<div id="app">
		<Table v-if="tableData" :data="tableData" />
	</div>
</template>

<script>
import Table from './components/Table';
export default {
	name: 'App',
	components: {
		Table,
	},
	data: () => ({
		tableData: 10,
	}),
	async mounted() {
		try {
			const res = await this.$axios('/clients');
			const data = res.data.data;
			this.tableData = data;
			console.log(data);
			// const name = data.map(el => el.name);
			// const addresses = data.map(el => el.addresses[0]);
			// console.log(addresses);
		} catch (error) {
			console.log(error.message);
		}
	},
};
</script>

<style>
* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
