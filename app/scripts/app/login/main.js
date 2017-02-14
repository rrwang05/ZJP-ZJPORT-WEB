require(['jquery', 'utils', 'common/confirm'], function($, S, confirm){

	/*
	* 提交按钮操作
	* confirm.confirm($btn, callback, bool)
	* params说明
	*	$btn: 提交按钮
	*   callback: 回调函数,提交返回的数据
	*	bool: 布尔型,是否验证表单字段,true为需要验证,反之则无需验证
	*/
	confirm.confirm($('.J-loginConfirmBtn'), function(data){

		//返回数据结果处理
		//todo
		
	}, true);



});