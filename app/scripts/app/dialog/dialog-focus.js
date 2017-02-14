define(['jquery', 'utils', 'common/fast-jquery', 'common/dom'], function($, S, $$, $dom){
	/*fixed IE input focus bug*/
	$dom.find('input:first').focus();
})