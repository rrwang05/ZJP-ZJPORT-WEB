var require = {
	baseUrl: '../../scripts/lib',
	// baseUrl: 'http://192.168.180.54/scripts/lib',
	paths: {
		'app': '../app',
		'common': '../common',
		'login': '../app/login',
		'css': 'require-css/css',
		'csspath': '../../css',
		'utils': '../common/utils',
		'jquery': 'jquery/jquery'
	},
	shim: {
		jquery: {
			exports: '$'
		}

	}
}