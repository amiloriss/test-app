<template>
	<div id="app">
		<!-- depending on what we get from api we react on it difference (loading or error or table) -->
		<loading :active.sync="isLoading"></loading>
		<Table v-if="!isLoading && tableData" :tableData="tableData" />
		<h1 v-else-if="isError">Some error, please refresh the page</h1>
	</div>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Table from './components/Table';
export default {
	name: 'App',
	components: {
		// Table is components where we input our data and output its in table
		Table,
		// Loading component to display animation of loading circle
		Loading,
	},
	data: () => ({
		// handle
		tableData: undefined,
		isLoading: false,
		isError: false,
	}),
	async mounted() {
		// get data from api
		try {
			// loading...
			this.isLoading = true;
			const res = await this.$axios('/clients');
			const data = res.data.data;
			this.tableData = data;
			// when we get data remove loading by loading: false
			this.isLoading = false;
			// if don't get data error is output on page by isError: true
			throw new Error('It does not work');
		} catch (e) {
			this.isError = true;
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
