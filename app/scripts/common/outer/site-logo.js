define(['jquery', 'utils', 'common/dom', 'common/fast-jquery'], function($, S, $dom, $$){
	//系统切换
	var $dom = $(document),
		systemChangeBannerIsOpenClass = 'systemChangeBanner_is-open',
		switching = false
	;

	var siteLogoSystemChange = function(){
		this.init();
	}
	siteLogoSystemChange.prototype = {
		construct: 'siteLogoSystemChange',
		init: function(){
			var $systemChangeBtn = $('.J-systemChangeBtn');
			if(!$systemChangeBtn){
				return false;
			}
			this.btn = '.J-systemChangeBtn';
			this.showBanner();

		},
		showBanner: function(){
			$dom.on('mouseenter', this.btn, function(){
				$(this).addClass(systemChangeBannerIsOpenClass)
			})
			$dom.on('mouseleave', this.btn, function(){
				$(this).removeClass(systemChangeBannerIsOpenClass)
			})
			$dom.on('click', this.btn, function(){
				var $this;
				if(switching === true){
					return false;
				}
				switching = true;
				$this = $$(this);
				if($(this).hasClass(systemChangeBannerIsOpenClass)){
					$(this).removeClass(systemChangeBannerIsOpenClass)
				}else{
					$(this).addClass(systemChangeBannerIsOpenClass)
				}
				switching = false;
				return false;
			})
		}
	}

	;(function(){
		new siteLogoSystemChange();
	}());

	return siteLogoSystemChange;
	




})