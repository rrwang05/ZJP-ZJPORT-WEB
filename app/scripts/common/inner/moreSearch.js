define(['jquery', 'utils', 'common/fast-jquery'], function($, S, $$){
	var $dom = $(document),

		onlyTwoLineSearchClass = 'search-fold__two-line-search',

		$searchContainer
	;


	$dom.on('click', '.J-searchToggleBtn', function(){
		$searchContainer = $(this).closest('.J-searchContainer');
		if($searchContainer.hasClass(onlyTwoLineSearchClass)){
			$searchContainer.removeClass(onlyTwoLineSearchClass);
		}else{
			$searchContainer.addClass(onlyTwoLineSearchClass);			
		}
	});

})