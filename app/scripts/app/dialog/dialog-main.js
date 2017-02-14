require(['jquery', 'utils', 'common/confirm', 'common/autocomplete', 'dialog/send'], function($, S, confirm, autocomplete, dialogSend){

	/*
	* 提交按钮操作
	* confirm.confirm($btn, callback, bool)
	* params说明
	*	$btn: 提交按钮
	*   callback: 回调函数,提交返回的数据
	*	bool: 布尔型,是否验证表单字段,true为需要验证,反之则无需验证
	*/
	confirm.confirm($('.J-dialogConfirm'), function(data){
		dialogSend.dialogRetrun(data);
	}, true);



	/*
	 * 自动补全
	 * autocomplete(id, method)
	 * params说明
	 * 		id: 自动补全输入框id
	 *      method
	 *			remote: 数据源(实时数据),
	 *				wildcard: 通配符,
	 *				url: 数据服务地址,
	 *				filter: 过滤操作
	 *			local: 数据源(本地),
	 *			limit: 最大条数,
	 *			minLength: 最小条数,
	 *			valueKey: 数据键
	*/
	autocomplete('#J-autocp1', {
        remote: {
            wildcard: '%q',
            url: '/exchange/servmanage/serviceregist/index!doQueryByCode.jspa?code=%q',
            filter: function(resp){
                return resp.list;
            }
        },
        valueKey: 'code',
        limit: 5
    })




})