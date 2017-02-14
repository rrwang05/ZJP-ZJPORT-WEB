var require = {
	baseUrl: '../../scripts/lib',
	// baseUrl: 'http://192.168.180.54/scripts/lib',
	deps: ['common/inner/template', 'common/inner/pagination', 'common/placeholder', 'common/inner/global-layout','common/inner/btn-base', 'common/inner/table-base','common/inner/search-page', 'common/inner/moreSearch', 'common/inner/tab', 'common/inner/csshack', 'common/inner/upload-file'],
	paths: {
		'app': '../app',
		'common': '../common',
		'css': 'require-css/css',
		'csspath': '../../css',
		'module': '../app/inner/module',
		'inner': '../app/inner',
		'utils': '../common/utils',
		'jquery': 'jquery/jquery'
	},
	shim: {
		jquery: {
			exports: '$'
		}

	}
}