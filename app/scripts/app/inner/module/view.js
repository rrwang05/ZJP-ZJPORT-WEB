define(['jquery', 'utils', 'common/fast-jquery', 'common/modal', 'common/dom'], function($, S, $$, modal, $dom){

	var viewObj = {};
	var template = S.template('<iframe src="<@= url@>" frameborder="0" style="width: <@= width@>px;height: <@= height@>px;"></iframe>');

	viewObj.dialog = function(target, url, opts){

		$dom.on('click', target, function(){
			var dialog,
				dialogCssObj,
				dialogOpt,

				dialogParams,
				addUrl = url
			;

			dialogCssObj = {
				// 保证弹出框大小跟实际的一致
				// 38: 标题高度
				height: opts.height + 38,
				width: opts.width
			};
			dialogCssObj['margin-top'] = -(dialogCssObj.height/2);
			dialogCssObj['margin-left'] = -(dialogCssObj.width/2);


			dialogParams = $$(this).data('dialog-params') || '';

			if(dialogParams){
				addUrl = url + ( /\?/.test( url ) ? "&" : "?" ) + dialogParams;
			}

			dialogOpt = {
				url: addUrl,
				height: opts.height,
				width: opts.width
			}

			window.currentDialog = dialog = modal.dialog(template(dialogOpt), [], {
				header: opts.title || '查看功能'
			});

			dialog.node.css(dialogCssObj);

			dialog.node.on('hidden', function(event, data){
				window.currentDialog = null;
				if(!!data){
					opts.callback(data);
				}

			});
		});
	}


	return viewObj;


})