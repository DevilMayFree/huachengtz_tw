function header() {
    let onloadCSS=function(n,a){var t;function d(){!t&&a&&(t=!0,a.call(n))}n.addEventListener&&n.addEventListener("load",d),n.attachEvent&&n.attachEvent("onload",d),"isApplicationInstalled"in navigator&&"onloadcssdefined"in n&&n.onloadcssdefined(d)};

    let scope;
    let window_w;
    let window_h;
    let break_point = 1024;
    // let break_point = 1366;
    let idx = 0;
    let request;
    let css_array = [];

    var OPEN_MASK_CLASS = 'mask-on';
    var OPEN_NAV_CLASS = 'submenu-on';
    var LOCK_BODY_CLASS = 'body-lock';
    var lastScrollTop=0;
    //variables
    var mobileMode;
    var windowScrollTop = $(window).scrollTop();
    var lastScrollTop = 0;
    //element
    var html;
    var body;
    var navbar;
    var toggler;
    let subnav;
    let subnav_h;
    var subnav_top;
    let has_subnav = false;

    const safariHacks = (function() {
      const getWindowVH = () => window.innerHeight / 100; 
      const setVHProperty = () => {
        const mobileLv2 = document.querySelectorAll('.menu__lv2--mobile');
        if (!mobileLv2.length) return; 
        const vh = `${getWindowVH()}px`; 
        mobileLv2.forEach(el => el.style.setProperty('--vh', vh));
      };
      return setVHProperty; 
    })();
    safariHacks(); 
    
    let randomID = function(){
        return Math.random().toString(36).substr(2, 9);
    }
    let onlyUnique = function (value, index, self) {
        return self.indexOf(value) === index;
    }

    let install = function(){
        var stylesheet;
        css_array = css_array.filter(onlyUnique);
        $('[type="text/css"]').each(function(){
            var fullPath = $(this).attr("href");
            if(fullPath!=undefined){
                var filename = fullPath.replace(/^.*[\\\/]/, '').split('.').slice(0, -1).join('.')
                //css_array.push(filename);
                for (var i=css_array.length-1; i>=0; i--) {
                    if (css_array[i] === filename) {
                        css_array.splice(i, 1);
                    }
                }
            }
        })
        request = css_array.length;
        if(request==0){
            onResourceLoad();
            return;
        }
        for(var i in css_array){
            stylesheet = loadCSS(window.css_url + css_array[i] + ".css?"+window.css_version);
            onloadCSS( stylesheet, onResourceLoad);
        }
    }

    let onResourceLoad = function(){
        request--
        if(request<=0){
            main();
        }
    }
    ///////////////////////////////////////////////////////////////////////
    let resize = function(){
        var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

        window_w = $(window).outerWidth();
        window_h = $(window).outerHeight();
        // if($(".subnav").length>0){

        //     subnav_top = $('.subnav').offset().top;
        // }
        if (window_w < break_point) {
            if (mobileMode != true) {
                mobileMode = true
                
                switchMode();
            }

        } else {
            if (mobileMode != false) {
                mobileMode = false
                switchMode();
                
             
            }
        }
     //   //console.log('resize')
    }

    var reset = function(){
        //console.time('reset');
        let els;
        let i;
        var container = document.querySelector('.header');
        if(container==null)
            return false;
        container.classList.remove('header--shadow-on');
        //
        els = container.querySelectorAll('.ch-nav-lv2--show');
        for (i = 0; i < els.length; ++i) {
            els[i].classList.remove('ch-nav-lv2--show');
        }
        //
        els = container.querySelectorAll('.ch-nav-item');
        for (i = 0; i < els.length; ++i) {
            els[i].classList.remove('ch-nav-item--hover');
        }
        //
        els = container.querySelectorAll('.ch-nav-link');
        for (i = 0; i < els.length; ++i) {
            els[i].setAttribute('aria-expanded', 'false');
        }
        //
        els = container.querySelectorAll('.ch-nav');
        for (i = 0; i < els.length; ++i) {
            els[i].style.removeProperty("display");
        }
    }

    var initMobileMode = function() {
        // //console.log('initMobileMode');
        // console.time('initMobileMode');
        reset();

        var initDropdown = function() {
            
            $('.ch-nav-lv2-item',scope).off('');
            $('.ch-nav-item',scope).off('');
            
            $('[role="header-nav-back-to-lv2"]').off('click.navLv3Back').on('click.navLv3Back', function(e) {
                $(this).parent().parent().parent().siblings().attr("aria-expanded", 'false');
                // $(this).parent().parent().parent().siblings().css('background-color','#ff0000');
                $(".ch-nav",scope).removeClass("lv3");
                return false;
            });
            
            $('[role="header-nav-back-to-lv1"]').off('click.navLv2Back').on('click.navLv2Back', function(e) {
                $(this).parent().parent().parent().siblings().attr("aria-expanded", 'false');
                $(".ch-nav",scope).removeClass("lv2");
                return false;
            });

            $('.ch-nav-link', scope).off('click.toggleMobileSubnav').on('click.toggleMobileSubnav', function(e) {
                var o = $(this);
                var hasSibling = $(o).siblings(".ch-nav-lv2").length;
                e.stopPropagation();
                if(hasSibling){
                    var submenu = $(o).siblings(".ch-nav-lv2");
                    e.preventDefault();
                    e.stopPropagation();

                    $('.ch-nav-link', scope).attr("aria-expanded", 'false');
                    $('.ch-nav-lv2.ch-nav-lv2--show', scope).removeClass('ch-nav-lv2--show');
                    
                    if (o.attr("aria-expanded") == 'true') {
                        o.attr("aria-expanded", 'false');
                        submenu.removeClass('ch-nav-lv2--show');
                        $(".ch-nav",scope).removeClass("lv2");
                    } else {
                        o.attr("aria-expanded", 'true');
                        submenu.addClass('ch-nav-lv2--show');

                        $(".ch-nav",scope).addClass("lv2");
                    }
                }
            });
            

            $('.ch-nav-lv2-link', scope).off('click.toggleMobileSubnavLv2').on('click.toggleMobileSubnavLv2', function(e) {
                var o = $(this);
                var hasSibling = $(o).siblings(".ch-nav-lv3").length;
                e.stopPropagation();
                if(hasSibling){
                    var submenu = $(o).siblings(".ch-nav-lv3");
                    e.preventDefault();
                    e.stopPropagation();

                    $('.ch-nav-link', scope).attr("aria-expanded", 'false');
                    $('.ch-nav-lv3.ch-nav-lv3--show', scope).removeClass('ch-nav-lv3--show');
                    
                    if (o.attr("aria-expanded") == 'true') {
                        o.attr("aria-expanded", 'false');
                        submenu.removeClass('ch-nav-lv3--show');
                        $(".ch-nav",scope).removeClass("lv3");
                    } else {
                        o.attr("aria-expanded", 'true');
                        submenu.addClass('ch-nav-lv3--show');

                        $(".ch-nav",scope).addClass("lv3");
                    }
                }
            });
            //console.timeEnd('initMobileMode');
        }

        var initToggler = function(){
            
            // //console.log('initToggler');
            // console.time('initToggler');
            toggler.off().on("click.toggler", function(e) {
                e.preventDefault();
                e.stopPropagation();
                if ($(this).hasClass("moving")) {
                    return false;
                }
                
                if (!$(this).hasClass("ch-toggler--active")) {
                    lastScrollTop = $(window).scrollTop();

                    toggler.attr('aria-expanded', true)
                        $('.ch-nav',navbar).show();
                        toggler.addClass('moving');
                        setTimeout(function(){
                            toggler.removeClass('moving');
                        },10)

                    if (!html.hasClass(OPEN_NAV_CLASS)){
                        html.addClass(OPEN_MASK_CLASS);
                        html.addClass(OPEN_NAV_CLASS);
                        html.addClass(LOCK_BODY_CLASS);
                        body.css('top',-lastScrollTop);
                    }


                } else {
                    $(".ch-nav-lv2").removeClass("ch-nav-lv2--show")
                    $(".ch-nav-lv3").removeClass("ch-nav-lv3--show")
                    $(".ch-nav",scope).removeClass("lv2");
                    $(".ch-nav",scope).removeClass("lv3");
                    html.removeClass(OPEN_MASK_CLASS)
                    html.removeClass(OPEN_NAV_CLASS)
                    html.removeClass(LOCK_BODY_CLASS)
                    body.css('top','auto');
                    $(window).scrollTop(lastScrollTop);
                    toggler.addClass('moving');
                    setTimeout(function(){
                        $('.ch-nav',navbar).hide();
                        toggler.removeClass('moving');
                    },500)
                    toggler.attr('aria-expanded', false);
                    // body.off('click.hideHeaderNav');
                }
                $(this).toggleClass('ch-toggler--active');
                return false;
            })
            //console.timeEnd('initToggler');
        }

        var init = function(){
            $(".ch-nav").appendTo(".header");
            initDropdown();
            initToggler();
        }
        init();
    }
    var initDefaultMode = function() {

        reset();
        // console.time('initDefaultMode');
        html.removeClass(OPEN_MASK_CLASS)
        html.removeClass(OPEN_NAV_CLASS)
        html.removeClass(LOCK_BODY_CLASS)
        body.css('top','auto');
        html.removeClass('safari-addressbar-off');
        toggler.removeClass('moving');
        toggler.attr('aria-expanded', false);
        toggler.addClass("collapsed");
        body.off('click.hideHeaderNav');
        
        $(".ch-nav").insertAfter(".header__logo");

        $('.ch-nav-link', scope).off();
        $('.ch-nav-item',scope).off();
        $('.ch-nav-item',scope).off().on('mouseover',function(e){
            $(html).addClass("submenu-on");
            $(this).addClass('ch-nav-item--hover');
        });
        

        $('.ch-nav-lv2-item',scope).off().on('mouseover',function(e){
            $('.ch-nav-lv2-item',scope).removeClass("ch-nav-lv2-item--hover")
            $(this).addClass('ch-nav-lv2-item--hover');
        });

        $('.ch-nav-lv2-item',scope).on('mouseout',function(e){
            $(this).removeClass('ch-nav-lv2-item--hover');
         });


        $('.ch-nav-item',scope).on('mouseout',function(e){
            $(html).removeClass("submenu-on");
            $(this).removeClass('ch-nav-item--hover');
        });
        
        $('.dropdown [role="button"]',$('.header__func')).on('click',function(e){
            e.preventDefault();
            e.stopPropagation();
            return false;
        });

    }

    var switchMode = function() {
        $(".header").addClass("static");
        setTimeout(function(){
            $(".header").removeClass("static");    
        },200)
        if (mobileMode) {
            initMobileMode()
        } else {
            initDefaultMode()
        }
    }

    let scroll = function(){
        windowScrollTop = $(this).scrollTop();

        if(windowScrollTop>1){
            $("html").addClass("scrolled");
        }else{
            $("html").removeClass("scrolled");
        }
        if(mobileMode){
            var header_func_h = 1;
            // var header_wrap_h = 80;
            var header_wrap_h = 120;
            var subnav_h = 53;
            // var subnav_top = 480;
            // var subnav_top = $('.subnav').offset().top;
            var start_top = subnav_top-header_wrap_h;
            var leave_top = subnav_top;
            
            //console.log('windowScrollTop',windowScrollTop);
            //console.log('header_func_h',header_func_h);
            //console.log('start_top',start_top);
            if(has_subnav){
                if(windowScrollTop<=0){
                    
                    $("html").removeClass("header--sticky");
                    scope.removeClass("shadow-off");
                    scope.attr('style','');
                    subnav.attr('style','');
                    subnav.next().attr('style','');
                    scope.removeClass("transition-on");
                    $("html").removeClass('subnav--sticky');

                }
                else if(windowScrollTop>=header_func_h && windowScrollTop<start_top){

                    $("html").addClass("header--sticky");
                    scope.removeClass("shadow-off");
                    scope.attr('style','');
                    subnav.attr('style','');
                    subnav.next().attr('style','');
                    scope.removeClass("transition-on");
                    subnav.removeClass('transition-none');
                    $("html").removeClass('subnav--sticky');
                    // //console.log('mode 1');
                    // $("#debug").html("mode1");
                }else if(windowScrollTop>=start_top && windowScrollTop<=leave_top){

                    //console.log('s2');
                    $("html").addClass("header--sticky");
                    var diff = leave_top - windowScrollTop;
                    
                    $("html").removeClass('subnav--sticky');
                    scope.removeClass("transition-on");
                    subnav.addClass("static");
                    subnav.addClass('transition-none');
                    subnav.css("position","fixed");
                    subnav.css("top",diff);
                    subnav.css("width",'100%');
                    scope.css("top",-header_wrap_h+diff);
                    subnav.next().css('margin-top',subnav_h);
                    scope.removeClass("shadow-off");
                }else{

                    //console.log('s3');
                    $("html").addClass('subnav--sticky');
                    subnav.removeClass('transition-none');
                    if(lastScrollTop > windowScrollTop){
                        scope.css("top",0);
                        
                        // subnav.addClass("static");
                        subnav.css("position","fixed");
                        subnav.css("top",120);
                        
                        scope.addClass("transition-on");
                        scope.removeClass("shadow-off");
                        // //console.log('mode 3 up');
                        // $("#debug").html("mode 3 up");
                    }else{
                        // subnav.removeClass("static");
                        subnav.attr('style','');
                        scope.addClass("shadow-off");
                        scope.css("top",-120);
                        subnav.next().css('margin-top',subnav_h);
                        // //console.log('mode 3 down');
                        // $("#debug").html("mode 3 down");
                    }
                }
            }
            else{
            }
        }else{

            //laptop
            var header_func_h = 44;
            var header_wrap_h = 92;
            var subnav_h = 63;
            // var subnav_top = 594;
            // var subnav_top = $('.subnav').offset().top;
            var start_top = subnav_top-header_wrap_h;
            var leave_top = subnav_top;

            if(has_subnav){
                if(windowScrollTop<=header_func_h){
                    scope.attr('style','');
                    subnav.attr('style','');
                    subnav.next().attr('style','');
                    $("html").removeClass("header--sticky");
                    $("html").removeClass("subnav--sticky");

                }else if(windowScrollTop>header_func_h && windowScrollTop<start_top){
                    $("html").addClass("header--sticky");
                    scope.attr('style','');
                    subnav.attr('style','');
                    subnav.next().attr('style','');
                    //console.log('mode 2');
                    $("#debug").html("mode2");
                    $("html").removeClass("subnav--sticky");
                }else if(windowScrollTop>=start_top && windowScrollTop<=leave_top){
                    $("html").addClass("header--sticky");
                    var diff = leave_top - windowScrollTop;
                    
                    subnav.css("position","fixed");
                    subnav.css("top",diff);
                    subnav.css("width",'100%');
                    scope.css("top",-header_wrap_h+diff);
                    subnav.next().css('margin-top',subnav_h);
                    $("html").removeClass("subnav--sticky");

                }else{
                    
                    $("html").addClass("subnav--sticky");
                    if(lastScrollTop > windowScrollTop){
                        //up
                        $("html").removeClass("header--sticky");
                        subnav.attr('style','');
                        scope.attr('style','');
                        subnav.next().css('margin-top',subnav_h);
                    }else{

                        //down
                        $("html").removeClass("header--sticky");
                        subnav.attr('style','');
                        scope.attr('style','');
                        subnav.next().css('margin-top',subnav_h);
                    }
                    
                }
            }
            else{
                if(windowScrollTop>header_func_h){
                    $("html").addClass("header--sticky");
                }else{
                    $("html").removeClass("header--sticky");
                }
            }
        }
        lastScrollTop = windowScrollTop;
    }
    let addEventListener = function(){        
        $(window).off("resize.header"+idx).on("resize.header"+idx,resize);
        $(window).off("scroll.header"+idx).on("scroll.header"+idx,scroll);

        resize();
        scroll();
    };

    let main = function(){
        addEventListener();
    }

    let init = function(a_scope){

        idx = randomID();
        scope = a_scope;
        html = $('html');
        body = $('body')
        navbar = $('.header__wrap', scope)
        toggler = $('.ch-toggler', scope)
        if($(".subnav").length>0){
            has_subnav = true;
            subnav = $('.subnav');
            subnav_h = subnav.height();
            subnav_top = $('.subnav').offset().top;
        }

        $('.ch-nav-lv3-list').each(function(){
            var elm = $(this);
            var child_num = $('.ch-nav-lv3-item',elm).length-1;
            var lv2_elm = elm.parents('.ch-nav-lv2');
            var parent_elm = elm.parents('.ch-nav-lv2-item');
            var parent_idx = parent_elm.index();
            var parent_title = $('>a span',parent_elm).text();
            if(parent_idx+child_num>=9){
                lv2_elm.addClass('ch-nav-lv2--lg');
            }
        })
        
        install();

    };
        
    return {
        init: function (a_scope) {
            init(a_scope);
        }
    }
}