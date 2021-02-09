const https = require('https');

module.exports = {
	devServer: {
		proxy: {
			'/': {
				target: 'https://test-task-api.labilab.dev',
				changeOrigin: true,
				ws: true,
				agent: https.globalAgent,
			},
		},
	},
};
