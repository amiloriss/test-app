<template>
	<div id="app">
		<loading :active.sync="isLoading"></loading>
		<Table v-if="!isLoading && tableData" :data="tableData" />
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
		Table,
		Loading,
	},
	data: () => ({
		tableData: undefined,
		isLoading: false,
		isError: false,
	}),
	async mounted() {
		try {
			this.isLoading = true;
			const res = await this.$axios('/clients');
			const data = res.data.data;
			this.tableData = data;

			this.isLoading = false;
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
