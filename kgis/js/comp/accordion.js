function accordion() {

    let scope;
    let window_w;
    
    let randomID = function(){
        return Math.random().toString(36).substr(2, 9);
    }

    let resize = function(){
        window_w = $(this).width();
    }
    let addEventListener = function(){
        
        scope.on('hide.bs.collapse', function () {
            // do something…
        })
        scope.on('hidden.bs.collapse', function () {
            // do something…
        })
        scope.on('shown.bs.collapse', function () {
            // do something…
        })
    };

    let init = function(a_scope){
        //
        scope = a_scope;
        //
        var idx = randomID();
        var accordion_name = "accordion-"+idx;
        var break_point = 768;
        var window_w;
        var mode = "";
        var collapse = scope.find(".collapse");

        // collapse.attr("data-parent","."+accordion_name);
        
        scope.addClass(accordion_name);
        console.time('accordion__item each');
        $(".accordion__item",scope).each(function(index){
            let elm = $(this);
            let name = "accordion__item-"+idx+"-"+index;
            $(">.accordion__item-title",elm).attr("data-target","."+name);
            $(">.accordion__item-content",elm).addClass(name);
        })
        console.timeEnd('accordion__item each');

        console.time('show.bs.collapse');
        $('.accordion__item>.collapse',scope).on('show.bs.collapse', function () {
            var others = $(this).parents(".accordion__item").siblings();
            others.find(".accordion__item-content").collapse('hide');
        });
        console.timeEnd('show.bs.collapse');

        if(scope.attr("data-anchor")=="true"){
            $('.collapse ',scope).on('shown.bs.collapse', function () {
                var header_h = 0;
                var subnav_h = 0;
                if($(".header").length>0){
                    header_h = $(".header").height();
                }
                if($(".subnav").length>0){
                     subnav_h =  $(".subnav").height();
                }
                var item_y = $(this).parent().offset().top;
                var offset_y = 50;
                var dest_y;
                if($(".subnav").length>0){
                    dest_y = item_y - subnav_h - offset_y;
                }else{
                    dest_y = item_y - header_h - offset_y;
                }
                $('html,body').animate({
                    scrollTop:dest_y
                },500);
                
            })
        }
        
        addEventListener();

    };
        
    return {
        init: function (a_scope) {
            init(a_scope);
        }
    }
}