require(['jquery', 'common/dom'], function($, $dom){
	
	//文件上传按钮操作
	var filename,
		selecting = false
	;
	$dom.on('change', '.J-inpFileSelect', function(){
		if(selecting === true){
			return false;
		}
		selecting = true;
		filename = ($(this).val()).toUpperCase();
		$dom.find('.J-inpFileSelectName').val(filename);
		filename = null;
		selecting = false;
	})

});