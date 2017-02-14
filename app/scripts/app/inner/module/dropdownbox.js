define(['jquery', 'utils', 'common/fast-jquery', 'common/dom', 'common/io'], function($, S, $$, $dom, io){
	/*
	 * author: rita1218@126.com
	 * createtime: 2016-05-05
	 * finishtime: 2016-05-11
	 *	
	*/
	var Dropdownfunc = function(selectBoxId, asyn, selectlist){
		this.target = $(selectBoxId); 
		if(!this.target){
			return false;
		}
		this.asyn = asyn;
		this.options = selectlist;
		this.init();
	}

	Dropdownfunc.prototype = {
		constructor: Dropdownfunc,
		init: function(){
			var $targetbox = this.target,
				$selectOne,
				selectOptionArry = [],
				selectOptionHtml,
				that = this
			;
			//本地下拉框数据
			if(!that.asyn){
				//初始化第一个下拉框的值
				$selectOne = $targetbox.find('select:eq(0)');
				that.selectNode = $targetbox.find('select');
				that.selectors = S.map(that.options, function(selector, index){
					selectOptionArry.push('<option value="' + selector.v + '" >' + selector.n + '</option>');
					return selector;
				});

				selectOptionArry.unshift('<option value="">请选择</option>');
				selectOptionHtml = selectOptionArry.join('');
				$selectOne.append(selectOptionHtml);
				that._onChange();
			}else{
				//异步获取下拉框数据
				that._ajaxRequestData();
			}
		},
		_onChange: function(){
			var selectTwoOptions,
				selectThreeOptions,
				selectAllOptions,
				$selects,
				that = this
			;
			$selects = this.target.find('select');
			selectAllOptions = this.options;
			S.each($selects, function(selectItem, index){
				$(selectItem).on('change', function(){
					//下拉框选择为空是级联后面的下拉框为空且属性disabled
					var $self = $(this),
						selfVal
					;
					selfVal = $self.val();
					if(selfVal == ""){
						$selects.slice(index+1, $selects.length).attr('disabled', true).val("");
					}else{
						$selects.eq(index+1).attr('disabled', false);
					}

					//当前下拉框非空级联下一级下拉框
					if(index === 0){
						S.map(selectAllOptions, function(option, index){
							if(selfVal == option.v){
								selectTwoOptions = option.list;
								return false; 
							}
						});
						that._emptyNextSelect(index);
						that._buildOptionHtml(selectTwoOptions, $selects.eq(index+1));
					}
					if(index === 1){
						S.map(selectTwoOptions, function(option, index){
							if(selfVal == option.v){
								selectThreeOptions = option.list;
								return false; 
							}
						});
						that._emptyNextSelect(index);
						that._buildOptionHtml(selectThreeOptions, $selects.eq(index+1));
					}
				})
			})
		},
		_buildOptionHtml: function(options, $selectNode){
			var optionArry = [],
				optionHtml
			;
			S.each(options, function(option, index){
				optionArry.push('<option value="' + option.v + '" >' + option.n + '</option>');;
			});
			optionArry.unshift('<option value="">请选择</option>');
			optionHtml = optionArry.join('');
			$selectNode.empty().append(optionHtml);
		},
		_emptyNextSelect: function(index){
			this.target.find('select').slice(index+1, this.target.find('select').length).val("");
		},
		_ajaxRequestData: function(){
			var selectOptions,
				that = this,
				$selects
			;
			$selects = that.target.find('select');
			S.each($selects, function(selectItem, index){
				$(selectItem).on('change', function(){
					var $self = $(this),
						selfVal
					;
					selfVal = S.trim($self.val());
					if(index == $selects.length){
						return false;
					}
					if(selfVal == ""){
						$selects.slice(index+1, $selects.length).empty().attr('disabled', true).val("");
					}else{
						$selects.eq(index+1).attr('disabled', false);
						that._ajaxGetNextData($self, index);
					}
				});
			});
		},
		_ajaxGetNextData: function($node, index){
			var ajaxParams,
				ajaxUrl,
				nextSelectOptionsArry,
				nextSelectArry = [],
				nextSelectHtml
			;
			ajaxParams = S.trim($node.val());
			ajaxUrl = $node.data('params');
			io.request({
				url: ajaxUrl,
				data: ajaxParams
			}, function(data){
				if(data.code === 0){
					nextSelectOptionsArry = data.rst.list;
					S.each(nextSelectOptionsArry, function(option, index){
						nextSelectArry.push('<option value="' + option.v + '" >' + option.n + '</option>');
					});
					nextSelectArry.unshift('<option value="">请选择</option>');
					nextSelectHtml = nextSelectArry.join('');
					$node.parent().find('select').eq(index+1).empty().append(nextSelectHtml);
				}
			});
		}
	};
	return Dropdownfunc;

})