define(['jquery', 'utils', 'common/fast-jquery', 'common/modal', 'common/io', 'common/dom'], function($, S, $$, modal, io, $dom){

	var deleteObj = {};

	deleteObj.dialog = function(target, url, opts){

		$dom.on('click', target, function(){

			var $checkboxes,
				msg,
				deleteIds = [],
				deleteParams = [],
				self = this
			;
			if(opts.inrow === true){
				$checkboxes = $$(this).closest('tr').find('.J-checkbox-one');
			}else{
				$checkboxes = hasChecked();
			}
			msg = opts.msg || '确认要删除吗？';

			if($checkboxes !== false){
				$checkboxes.each(function(){
					deleteIds.push((opts.inrow === true ? 'id=' : 'ids=') + this.value);
					deleteParams.push((opts.inrow === true ? 'param=' : 'params=') + $(this).data('params'));
				});
				modal.confirm(msg, function(bool){
					if(bool){
						io.request({
							url: url,
							data: {
								"deleteIds": deleteIds.join('&'),
								"deleteParams": deleteParams.join('&')
							}
						}, function(ajaxData){
							modal.alert(ajaxData.msg, function(){
								opts.callback(ajaxData);
							});
							if(opts.inrow === true && ajaxData.code === 0){
								$$(self).closest('tr').remove();
							}
						});
					}
				});
			}else{
				modal.alert('请选择你要删除的条目！');
			}
		})
	}


	deleteObj.deleteRows = function(){
		checkedCheckboxes().each(function(idx, $checkbox){
			$$(this).closest('tr').remove();
		});
	}


	function hasChecked(){
		var $checkboxes;
		$checkboxes = checkedCheckboxes();
		if($checkboxes.length){
			return $checkboxes;
		}
		return false;

	}

	function checkedCheckboxes(){
		return $('.J-checkbox-one:checked');
	}

	return deleteObj;


})