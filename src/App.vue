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
			const data = res.data;
			this.tableData = data;

			const something = data.map(el => el.name);
			console.log(something);
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
