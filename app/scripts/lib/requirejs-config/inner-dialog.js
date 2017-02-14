var require = {
	baseUrl: '../../scripts/lib',
	deps: ['common/inner/btn-base', 'common/inner/table-base', 'dialog/dialog-cancel', 'dialog/dialog-focus'],
	paths: {
		'app': '../app',
		'common': '../common',
		'inner': '../app/inner/module',
		'dialog': '../app/dialog',
		'utils': '../common/utils',
		'jquery': 'jquery/jquery',
		'css': 'require-css/css',
		'csspath': '../../css'
	},
	shim: {
		jquery: {
			exports: '$'
		}

	}
}