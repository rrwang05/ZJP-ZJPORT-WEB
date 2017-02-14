define(['jquery', 'utils', 'common/fast-jquery', 'common/io'], function($, S, $$, io){

	var $dom = $(document),
		$resultContainer
	;
	
	// 分页
    // $dom.on('click', '.J-page-btn', (function(){
    //     var $pageBtn,
    //         $page,
    //         $target,
    //         $skipInput,
    //         pageCount,
    //         current,
    //         params,
    //         targetFormParamstr
    //     ;

    //    	function init(pageBtnEle){
    //    		$pageBtn = $$(pageBtnEle);
	   //      $page = $pageBtn.closest('.J-page');
	   //      $skipInput = $page.find('input[id = currPage]:first');
	   //      params = S.qs.parse($page.data('params') || '');
	   //      $target = $(document.getElementById(params.target));
	   //      targetFormParamstr = $target.serialize();
	   //      pageCount = +document.getElementById('__pageCount').value;
	   //      current = params.current;
    //         setResultContainerByTarget(pageBtnEle);
    //    	}

    //     function adjustSkipInput(){
    //         var oldNum = +$skipInput.val(),
    //             newNum
    //         ;
    //         // 通过确认按钮进行分页
    //         if($pageBtn.hasClass('pageskip-btn')){

    //             if(!S.isNumber(oldNum) || oldNum < 1){
    //                 newNum = 1;    
    //             }else{
    //                 newNum = oldNum > pageCount ? pageCount : oldNum;
    //             }
    //         }
    //         // 通过页码进行分页
    //         else{
    //             newNum = +$pageBtn.data('num');
    //         }
    //         $skipInput.val(newNum);
    //     }

    //     function doRequestBefore(){
    //         // 置顶
    //         if(params.isTop === 'true'){
    //             window.scrollTo(0, 0);
    //         }
    //         adjustSkipInput();
    //         waitLoading();
    //     }

    //     function doRequest(){
    //         io.form($page, {
    //             url: params.url,
    //             data: targetFormParamstr,
    //             // dataType: 'json',
    //             type: 'POST'
    //         }, function(rst){
    //             if(rst.code === 0){
    //                 appendRst(rst.rst.html);
    //             }
    //         });
    //     }
        
    //    	return function(){
	   //      init(this);
    //         doRequestBefore();
    //     	doRequest();
    //    	};

    // })());

    //分页
    $dom.on('click', '.J-page-btn', function(){

        var pagecount,
            $that,
            $form,
            $searchForm,
            params,
            url,
            currentpage,
            nextpage,
            preClass = 'pagination-mark_prev',
            nextClass = 'pagination-mark_next',
            sureClass = 'pageskip-btn',
            $dynamicPagination,
            dynamicHtml = []
        ;

        $that = $(this);
        $form = $that.closest('form');
        pagecount = +$form.find('.pagecount').html();
        currentpage = +$form.find('input[name="currentPage"]').val();
        $dynamicPagination = $form.find('.dynamic-pagination');

        //如果当前页是第一页时点击上一页无效
        if(currentpage === 1 && $that.hasClass(preClass)){
            return false;
        }

        //如果当前页是最后一个页时点击下一页无效
        if(currentpage === pagecount && $that.hasClass(nextClass)){
            return false;
        }

        //如果不是当前页
        if(!$that.hasClass(preClass) && !$that.hasClass(nextClass)){
            $form.find('input[name="currentPage"]').val(+($.trim($that.html())));
        }

        //如果按下的是上一页
        if($that.hasClass(preClass)){
            $form.find('input[name="currentPage"]').val(currentpage-1);
        }

        //如果按下的是下一页
        if($that.hasClass(nextClass)){
            $form.find('input[name="currentPage"]').val(currentpage+1);
        }

        //如果按下的是确定按钮
        if($that.hasClass(sureClass)){
            $form.find('input[name="currentPage"]').val($form.find('.pageskip-input').val());
        }
        nextpage = +$form.find('input[name="currentPage"]').val();
        

         //页码动态变换
             //页码总数大于5的时候---页码在1-4之间
            if(nextpage <= 3 && pagecount > 5){
                for(var i = 1; i < nextpage; i++){
                    dynamicHtml.push('<a class="pagination-mark pagination-mark_link J-page-btn">'+ i +'</a>');
                }
                dynamicHtml.push('<span class="pagination-mark pagination-mark_current">'+ nextpage +'</span>');
                for(var i = nextpage + 1; i < 5; i++){
                    dynamicHtml.push('<a class="pagination-mark pagination-mark_link J-page-btn">'+ i +'</a>');
                }
                dynamicHtml.push('<span class="pagination-mark pagination-mark_elipses">...</span>');
                dynamicHtml.push('<a class="pagination-mark pagination-mark_link J-page-btn">'+ pagecount +'</a>');               
            }
            //页码总数大于5的时候---页码在中间页
            if(nextpage > 3 && nextpage < (pagecount - 2) && pagecount > 5){
                dynamicHtml.push('<a class="pagination-mark pagination-mark_link J-page-btn">'+ 1 +'</a>');
                dynamicHtml.push('<span class="pagination-mark pagination-mark_elipses">...</span>');
                dynamicHtml.push('<a class="pagination-mark pagination-mark_link J-page-btn">'+ (nextpage-1) +'</a>');
                dynamicHtml.push('<span class="pagination-mark pagination-mark_link pagination-mark_current">'+ (nextpage) +'</span>');
                dynamicHtml.push('<a class="pagination-mark pagination-mark_link J-page-btn">'+ (nextpage+1) +'</a>');
                dynamicHtml.push('<span class="pagination-mark pagination-mark_elipses">...</span>');
                dynamicHtml.push('<a class="pagination-mark pagination-mark_link J-page-btn">'+ pagecount +'</a>');
            }
            //页码总数大于5的时候---页码在最后几页
            if(nextpage >= (pagecount - 2) && pagecount > 5){
                dynamicHtml.push('<a class="pagination-mark pagination-mark_link J-page-btn">'+ 1 +'</a>');
                dynamicHtml.push('<span class="pagination-mark pagination-mark_elipses">...</span>');
                for(var i = (pagecount-3); i < nextpage; i++){
                    dynamicHtml.push('<a class="pagination-mark pagination-mark_link J-page-btn">'+ i +'</a>');
                }
                dynamicHtml.push('<span class="pagination-mark pagination-mark_current">'+ nextpage +'</span>');
                for(var i = nextpage + 1; i <= pagecount; i++){
                    dynamicHtml.push('<a class="pagination-mark pagination-mark_link J-page-btn">'+ i +'</a>');
                }
            }

            //页码总数小于等于5的时候------
            if(nextpage <= 5 && pagecount <= 5){
                for(var i = 1; i < nextpage; i++){
                    dynamicHtml.push('<a class="pagination-mark pagination-mark_link J-page-btn">'+ i +'</a>');
                }
                dynamicHtml.push('<span class="pagination-mark pagination-mark_current">'+ nextpage +'</span>');
                for(var i = nextpage + 1; i <= pagecount; i++){
                    dynamicHtml.push('<a class="pagination-mark pagination-mark_link J-page-btn">'+ i +'</a>');
                }
            }



            $dynamicPagination.empty().append(dynamicHtml.join(''));
        

        $searchForm = $('#search').find('form');
        url = $searchForm.attr('action');

        //分页参数
        params = ($form.serialize()).concat('&' + $searchForm.serialize());

        function doRequest(){
            io.request({
                url: url,
                data: params,
                type: 'POST'
            }, function(data){
                if(data.code === 0){
                    var frageHtml = [];
                    S.each(data.rst.resultList, function(item, index){
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
                    appendRst(frageHtml.join(''));
                }
            });
        }

        setResultContainerByTarget(this);
        waitLoading();
        doRequest();

    });

    // 查询
    $dom.on('click', '.J-searchBtn', function(){
        var $submitBtn = $$(this),
            $form = $submitBtn.closest('form')
        ;
        setResultContainerByTarget(this);
        waitLoading();
        io.form($form, {}, function(data){
            
            if(data.code === 0){
                var frageHtml = [];
                S.each(data.rst.resultList, function(item, index){
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
                appendRst(frageHtml.join(''));
            }
        });
        return false;
    });
	
    // 重置
    $dom.on('click', '.J-resetBtn', function(){
        var $resetBtn = $$(this),
        $form = $resetBtn.closest('form');
        $form[0].reset();
    });

    /*****************************************************
     *              
     *          工具类函数
     *              
     *****************************************************/
    function waitLoading(){
        $resultContainer.empty();
        var loadingContent = '<div class="result-loading-content"></div>';
        if($resultContainer[0].tagName === 'TBODY'){
            var colSpan = 1,
                $thead
            ;
            $thead = $resultContainer.prev('thead');
            
            if($thead && $thead.length){
                colSpan = ($thead.find('tr th').length) || colSpan;
            }
            loadingContent = '<tr class="tr__is-loading"><td class="cel-center" colspan="'+colSpan+'"><div class="hint-result flex flex-pack-center flex-align-center"><div class="hint-result-content hint-result-content-loading"><span>正在努力加载中，请稍后......</span></div></div></td></tr>';
        }
        $resultContainer.append(loadingContent);
    
    }

    function appendRst(content){
        $resultContainer.empty().append(content);
        unsetResultContainer();
    }

    function setResultContainerByTarget(target){
        var $result;
        $result = $$(target).closest('.J-resultContainer');
        if(!$result.length){
            $result = $('#J-resultContainer');
        }
        $resultContainer = $result;
    }

    function unsetResultContainer(){
        $resultContainer = null;   
    }

})