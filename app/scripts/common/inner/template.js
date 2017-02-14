define(['jquery', 'utils', 'common/fast-jquery', 'common/io', 'common/dom'], function($, S, $$, io, $dom){

	var Resultrender = function(node){
		this.node = $(node);
		this.count = 0;
		this.pageSize = 10;
		this.frageHtml = [];
		this.resultTh = [];
		this.resultList = [];
		this.title;
		this.init();
	};

	Resultrender.prototype = {
		constructor: Resultrender,
		init: function(){
			var $form = $('#search').find('form');
			this.url = $form.attr('action');
			that = this;
			io.request({
				url: this.url,
				data: $form.serialize(),
                type: 'POST',
			}, function(data){
				var datas = data.rst;
				that.count = datas.count;
				that._render(datas);
			})
		},
		_render: function(data){

			this.title = data.resultTitle;
			this.resultTh = data.resultTh;
			this.resultList = data.resultList;
			frageHtml = this.frageHtml;

			//是否显示table的标题
			if(this.title){
				this.frageHtml.push('<div class="result-title-container"><div class="result-title uniq-top-border"><span>'+ this.title +'</span></div></div>');
			}

			frageHtml.push('<div class="result-list">');
			frageHtml.push('<table class="result-table">');
			frageHtml.push('<colgroup>');
			frageHtml.push('<col class="col-checkbox"></col>');
			for(var i = 1; i < this.pageSize; i++){
				frageHtml.push('<col></col>');
			}
			frageHtml.push('</colgroup>');
			
			frageHtml.push('<thead>');
			frageHtml.push('<tr>');
			frageHtml.push('<th><input type="checkbox" class="inp-checkbox J-checkbox-all" /></th>');
			for(var i = 1; i < this.pageSize; i++){
				frageHtml.push('<th><span>'+ this.resultTh[i] +'</span></th>');
			}
			frageHtml.push('</tr>');
			frageHtml.push('</thead>');
			frageHtml.push('<tbody id="J-resultContainer">');

			//渲染tbody的内容
			this.tbody_render();
			frageHtml.push('</tbody>');
			frageHtml.push('</table>');
			frageHtml.push('</div>');
			//分页样式--样式
			this.pagination(this.count);
			this.frageHtml = frageHtml;
			$((this.frageHtml.join(''))).appendTo(this.node);
		},
		tbody_render: function(){
			S.each(this.resultList, function(item, index){
				frageHtml.push('<tr>');
				S.map(item, function(value, key){
					if(key == 'checkbox'){
						frageHtml.push('<td class="cel-center">');
						frageHtml.push('<input type="checkbox" data-params="aa" class="inp-checkbox J-checkbox-one">');
						frageHtml.push('</td>');
					}else{
						frageHtml.push('</td>');
						frageHtml.push('<td class="cel-center">');
						frageHtml.push('<span>'+ value +'</span>');
						frageHtml.push('</td>');
					}
				});

				frageHtml.push('</tr>');
			});
		},
		pagination: function(count){

			var page = Math.ceil(count/10);

			//如果数据在1-5页
			if(page >= 1 && page <= 5){
				(this.frageHtml).push('<div class="result-page">');
				(this.frageHtml).push('<div class="page page_flat page_right">');
				(this.frageHtml).push('<form><span class="pagination">');
				(this.frageHtml).push('<input type="hidden" name="currentPage" value="1" />');
				(this.frageHtml).push('<input type="hidden" name="pageSize" value="10" />');
				(this.frageHtml).push('<a class="pagination-mark pagination-mark_link pagination-mark_prev J-page-btn">上一页</a>');
				(this.frageHtml).push('<span class="dynamic-pagination">');
				(this.frageHtml).push('<span class="pagination-mark pagination-mark_current">1</span>');
				for(var i = 2; i <= page; i++){
					(this.frageHtml).push('<a class="pagination-mark pagination-mark_link J-page-btn">'+ i +'</a>');
				}
				(this.frageHtml).push('</span>');
				(this.frageHtml).push('<span class="pagination-mark pagination-mark_link pagination-mark_next J-page-btn">下一页</span></span>');
				(this.frageHtml).push('<span class="pageinfo"><span class="page-text">共计 '+ count +'条，'+ '<span class="pagecount">' + page +'</span>' +'页</span></span><span class="pageskip"><span class="page-text"到第</span><input value="0" class="pageskip-input"/><span class="page-text">页</span><a href="javascript:;" class="pageskip-btn J-page-btn">确认</a>');
				(this.frageHtml).push('</span></form>');
				(this.frageHtml).push('</div>');
				(this.frageHtml).push('</div>');
			}

			//如果数据在5页以上
			if(page > 5){
				(this.frageHtml).push('<div class="result-page">');
				(this.frageHtml).push('<div class="page page_flat page_right">');
				(this.frageHtml).push('<form><span class="pagination">');
				(this.frageHtml).push('<input type="hidden" name="currentPage" value="1" />');
				(this.frageHtml).push('<input type="hidden" name="pageSize" value="10" />');
				(this.frageHtml).push('<a class="pagination-mark pagination-mark_link pagination-mark_prev J-page-btn">上一页</a>');
				(this.frageHtml).push('<span class="dynamic-pagination">');
				(this.frageHtml).push('<span class="pagination-mark pagination-mark_current">1</span>');
				for(var i = 2; i <= 4; i++){
					(this.frageHtml).push('<a class="pagination-mark pagination-mark_link J-page-btn">'+ i +'</a>');
				}
				(this.frageHtml).push('<span class="pagination-mark pagination-mark_elipses">...</span>');
				(this.frageHtml).push('<a class="pagination-mark pagination-mark_link J-page-btn">'+ page +'</a>');
				(this.frageHtml).push('</span>');
				(this.frageHtml).push('<span class="pagination-mark pagination-mark_link pagination-mark_next J-page-btn">下一页</span></span>');
				(this.frageHtml).push('<span class="pageinfo"><span class="page-text">共计 '+ count +'条，'+ '<span class="pagecount">' + page +'</span>' +'页</span></span><span class="pageskip"><span class="page-text"到第</span><input value="0" class="pageskip-input"/><span class="page-text">页</span><a href="javascript:;" class="pageskip-btn J-page-btn">确认</a>');
				(this.frageHtml).push('</span></form>');
				(this.frageHtml).push('</div>');
				(this.frageHtml).push('</div>');
			}


		}
	};

	(function INIT(){
		var $results = $dom.find('.J-result');
		S.each($results, function(result){
			new Resultrender(result);
		})
	})();

	return Resultrender;

})