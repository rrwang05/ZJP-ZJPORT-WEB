define(['jquery', 'utils', 'common/dom', 'common/fast-jquery'], function($, S, $dom, $$){

    var $dom = $(document),
        sideNavGroupIsOpenClass = 'sideNav-group__is-open',
        sideNavLinkerIsActiveClass = 'sideNav-linker__is-active',
        $prevActiveLinker,
        $prevActiveGroup,
        $frame,
        switching = false,
        linking = false
    ;

    var sideNav = function(){
        this.init();
    }

    sideNav.prototype = {
        construct: 'sideNav',
        init: function(){
            var $sideNavGroupTitle,
                $sideNavGroupLinker,
                _asideId = _G['sideNavActive']
            ;
            $frame = $('#J-manageFrame');
            // $sideNavGroupTitle = $node.find('.J-group-title');
            // $sideNavGroupLinker = $node.find('.J-group-linker');
            // 设置初始化激活状态
            $item = $('.J-group-linker[data-id='+_asideId+']');
            if($item.length){
                $prevActiveLinker = $item.addClass(sideNavLinkerIsActiveClass);
                $prevActiveGroup = $item.closest('.J-group').addClass(sideNavGroupIsOpenClass);
            }else{
                $prevActiveGroup = $('.J-group' + '.' + sideNavGroupIsOpenClass).first();
                if($prevActiveGroup.length === 0 ){
                    $prevActiveGroup = $('.J-group:first').addClass(sideNavGroupIsOpenClass);
                }
                $prevActiveLinker = $('.J-group-linker' + '.' + sideNavLinkerIsActiveClass).first();
                if($prevActiveLinker.length === 0 ){
                    $prevActiveLinker = $('.J-group-linker:first').addClass(sideNavLinkerIsActiveClass);
                }
            }

            //设置iframe初始化页面
            if(!$frame.attr('src') && $prevActiveLinker.length){
                $frame.attr('src', $prevActiveLinker.attr('href'));
            }

            this.sideNavFold();
            this.sideNavRedirection();
        },
        sideNavFold: function(){
            $dom.on('click', '.J-group-title', function(){
                var $this, $group;
                if( switching === true){
                    return false;
                }
                switching = true;
                $this = $$(this);
                $group = $this.closest('.J-group');
                if($group.hasClass(sideNavGroupIsOpenClass)){
                    $group.removeClass(sideNavGroupIsOpenClass);
                    $prevActiveGroup = null;
                }else{
                    $group.addClass(sideNavGroupIsOpenClass);
                    if($prevActiveGroup && $prevActiveGroup.length){
                        $prevActiveGroup.removeClass(sideNavGroupIsOpenClass);
                    }
                    $prevActiveGroup = $group;
                }
                switching = false;
                return false;
            });
        },
        sideNavRedirection: function(){
            $dom.on('click', '.J-group-linker', function(){
                var $this;
                if( linking === true ){
                    return false;
                }
                linking = true;
                $this = $(this);
                if(!$this.hasClass(sideNavLinkerIsActiveClass)){
                    $$(this).addClass(sideNavLinkerIsActiveClass);
                    if($prevActiveLinker && $prevActiveLinker.length){
                        $prevActiveLinker.removeClass(sideNavLinkerIsActiveClass);
                    }
                }
                $prevActiveLinker = $this;
                linking = false;
                return true;
            });
        }
    }






    //页面初始化导航栏



    ;(function(){
       new sideNav();
    }());

     return sideNav;


    




})