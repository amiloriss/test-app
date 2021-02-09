<template>

	<table>
        
		<thead>
            <th>
                <td>Название клиента <br> Адрес</td>
                <td>Первый из списка почтовый адрес</td>
                <td>Первый из списка номер телефона</td>
                <td>Дата создания</td>
            </th>
        </thead>
		<tbody>
            <tr v-for="(row, index) in data" :key="index">
                <td v-for="(obj, index) in data" :key="index">{{row[obj.key]}}</td>
            </tr>
        </tbody>
        {{data}}
	</table>
</template>

<script>
export default {
    props: ['data']
}
</script>

<style>
    thead th td{width: 600px; padding: 20px 150px; background-color: rgb(158, 158, 158);}
</style>