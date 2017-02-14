require(['jquery', 'utils', 'common/fast-jquery', 'common/dom', 'module/add', 'module/update', 'module/delete', 'module/view', 'module/dropdownbox', 'common/confirm', 'common/modal', 'common/io', 'fileupload/vendor/jquery.ui.widget', 'fileupload/jquery.iframe-transport', 'fileupload/jquery.fileupload'], function($, S, $$, $dom, add, update, del, view, dropdownbox, confirm, modal, io){

	/*
	 * 弹出新增对话框
	 * add.dialog(id, url, options)
	 * params:
	 * 		id: 按钮id
	 *		url: 弹出页面地址
	 *		options: 弹出页面配置项
	 *			height: 弹出框高度
	 *			width: 弹出框宽度
	 *			title: 弹出框标题
	 *			callback: 回调函数
	 *				data: 回调函数返回的数据
	 *
	*/
	add.dialog('#J-addDialogTest', '../弹出框页面/新增-dialog.html', {
		height: 300,
		width: 400,
		title: 'XX功能新增',
		callback: function(data){
			// TODO 数据分析 & 页面局部刷新
			var rowContent =	'<tr>'+
				                  '<td class="cel-center"><input type="checkbox" class="inp-checkbox J-checkbox-one"></td>'+
				                  '<td class="cel-left"><span>新增行</span></td>'+
				                  '<td class="cel-right"><span>新增行</span></td>'+
				                  '<td class="cel-center"><span>新增行</span></td>'+
				                  '<td class="cel-center"><span>新增行</span></td>'+
				                  '<td class="cel-center"><span>新增行</span></td>'+
				                  '<td class="cel-center"><span>新增行</span></td>'+
				                  '<td class="cel-center"><span>新增行</span></td>'+
				                  '<td class="cel-center"><span>新增行</span></td>'+
				                  '<td class="cel-center"><span>新增行</span></td>'+
				                '</tr>';

	        add.addRow('#J-resultContainer:first', rowContent);
		}
	});

	/*
	 * 修改操作
	 *
	*/
	update.dialog('#J-updateDialogTest', '../弹出框页面/新增-dialog.html', {
		height: 300,
		width: 400,
		title: 'XX功能修改',
		callback: function(){
			
		}
	});

	/*
	 *  des: 多行删除操作
	 *
	 *	del.dialog(id, url, options)
	 *  
	 *  params:
	 *    id: 按钮id 
	 *    url: 接口地址
	 *    options: 配置项
	 *		msg: 删除提示语
	 *		callback: 回调函数
	 *
	*/
	del.dialog('#J-deleteDialogTest', '../../test/test.jspa', {
		msg: '你确认要删除这些数据吗？',
		callback: function(){
			del.deleteRows();
		}
	});

	
	/*
	 *  des: 当前行删除操作
	 *
	 *	del.dialog(id, url, options)
	 *  
	 *  params:
	 *    id: 按钮id 
	 *    url: 接口地址
	 *    options: 配置项
	 *		msg: 删除提示语
	 *		callback: 回调函数
	 *
	*/
	del.dialog('.J-inrowDelete', '../../test/test.jspa', {
		msg: '你确认要删除该条数据吗？',
		inrow: true,
		callback: function(){
			del.deleteRows();
		}
	});

	/*
	 *  view: 当前行删除操作
	 *	view.dialog(id, url, options)
	 *  params:
	 *    id: 按钮id 
	 *    url: 弹出页面地址
	 *    options: 配置项
	 *		title: 弹出页面标题
	 *
	*/
	view.dialog('.J-viewDialogTest', '../弹出框页面/查看-dialog.html', {
		height: 300,
		width: 400,
		title: 'XX功能查看'
	}); 


	/*
	* 提交按钮操作
	* confirm.confirm($btn, callback, bool)
	* params说明
	*	$btn: 提交按钮
	*   callback: 回调函数,提交返回的数据
	*	bool: 布尔型,是否验证表单字段,true为需要验证,反之则无需验证
	*/
	confirm.confirm($('.J-confirmBtn'), function(data){

		//返回数据结果处理

		//信息提交成功
		//modal.alert('信息提交成功!');


		// 信息提交失败
		// modal.fail('信息提交失败!');
		
	}, true);

	//文件异步上传
	;(function(){

		$('#uploadFile').fileupload({
			dataType: 'json',
			add: function(e, data){
				data.context = $('#uploadBtn')
                .click(function () {
                    data.submit();
                });
			},
			done: function(e, data){
				data.context.text('Upload finished.');
			}
		});
		
	}());

	//下垃级联
	;(function(){
		var selectlist = [
							{
								n: '安徽省',
								v: '皖',
								list: [{
										n: '安庆市',
										v: '0556',
										list: [{n: '宜秀区', v: 'a01'}, {n: '迎江区', v: 'a02'}, {n: '大观区', v: 'a03'}]
									},
									{
										n: '铜陵市',
										v: '0562',
										list: [{n: '铜官山区', v: 'a01'}, {n: '狮子山区', v: 'a02'}, {n: '郊区', v: 'a03'}]
									}
								]
							},
							{
								n: '浙江省',
								v: '浙',
								list: [{
										n: '杭州市',
										v: '0571',
										list: [{n: '拱墅区', v: 'a01'}, {n: '上城区', v: 'a02'}, {n: '下城区', v: 'a03'}]
									},
									{
										n: '宁波市',
										v: '0574',
										list: [{n: '江东区', v: 'a01'}, {n: '海曙区', v: 'a02'}, {n: '鄞州区', v: 'a03'}]
									}
								]
							}
						];

		/*
		 * new dropdownbox('#id', asyn, selectlist);
		 * 参数说明:
		 * #id: id是级联下拉框的父节点
		 * asyn: 是否要异步(true时, 返回参数{"code":0, "rst": {"list": [{"n":"", "v":""}, {"n":"", "v":""}]}})
		 * selectlist: asyn为false时, 下拉框级联对象
		 *
		*/
		var drop =  new dropdownbox('#cascadeDropdownListbox', true, selectlist);

	}())

	

})