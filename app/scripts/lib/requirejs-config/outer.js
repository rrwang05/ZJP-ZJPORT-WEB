var require = {
	baseUrl: '../scripts/lib',
	deps: ['common/outer/side-nav', 'common/outer/site-logo'],
	paths: {
		'app': '../app',
		'common': '../common',
		'utils': '../common/utils',
		'jquery': 'jquery/jquery'
	},
	shim: {
		jquery: {
			exports: '$'
		}

	}
}