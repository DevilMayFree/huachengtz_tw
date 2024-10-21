function gallery() {

    let scope;
    let window_w;
    
    let randomID = function(){
        return Math.random().toString(36).substr(2, 9);
    }

    let resize = function(){
        window_w = $(this).width();
    }
    let addEventListener = function(){
    };

    let init = function(a_scope){
        //
        scope = a_scope;
        //

        if($('.section__info',scope).length == 0){
            scope.addClass('gallery--square')
        }
        var idx = randomID();
        let total = $(".gallery__item",scope).length;

        if(total<10){
            total = "0"+total;
        }
        
        $('[role="total-pages"]',scope).html(total);
        if(total>=1){
            $(".gallery__item-wrap",scope).slick({
                infinite: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                prevArrow: $(".gallery__pager--prev",scope),
                nextArrow: $(".gallery__pager--next",scope)
            });

            // On swipe event
            $(".gallery__item-wrap",scope).on('swipe', function(event, slick, direction){
                // console.log(direction);
                // left
            });
            
            // On edge hit
            $(".gallery__item-wrap",scope).on('edge', function(event, slick, direction){
                // console.log('edge was hit')
            });
            
            // On before slide change
            const class_prefix = "gallery__item-";
            $(".gallery__item-wrap",scope).on('beforeChange', function(event, slick, currentSlide, nextSlide){
                const target = $(".slick-slide",scope).eq(nextSlide);

                // console.log($('[class*="'+class_prefix+'"]',target).length);
                $('[class*="'+class_prefix+'"]',target).each(function() {
                    let elm = $(this);
                    let value = elm[0].innerHTML;
                    let class_name = encodeURI(elm.attr("class"));
                    let s = class_name.indexOf(class_prefix);
                    let role_name = class_name.substr(s,class_name.length);
                    role_name = role_name.replace(/gallery__item-/gi,"");
                    // console.log(">",elm,class_name,role_name);
                    // console.log(role_name,value);
                    
                    if($('[role="'+role_name+'"]',scope).length>0){
                        if(role_name=="url"){
                            if($('[role="'+role_name+'"]',scope).attr("data-target") != undefined){
                                $('[role="'+role_name+'"]',scope).attr("data-target",elm.attr("data-target"));
                            }else{
                                $('[role="' + role_name + '"]', scope).prop("href", encodeURI(value));
                            }
                        }else{
                            $('[role="'+role_name+'"]',scope).html(value);

                            /*
                            if(role_name == 'btn_label'){
                                if(value=="" ){
                                    $('[role="'+role_name+'"]',scope).parent().hide();
                                }else{
                                    $('[role="'+role_name+'"]',scope).parent().show();
                                }
                            }
							*/
                        }
                    }
                })
                
				var tempLabel = $('[role="btn_label"]',scope).html();
				var tempHref = $('[role="btn_label"]',scope).parent().attr('href');
				if(tempLabel=="" || tempHref=="")
				{
					$('[role="btn_label"]',scope).parent().hide();
				} else {
					$('[role="btn_label"]',scope).parent().show();
				}
				
                let current_page = nextSlide+1;
                if(current_page<10){
                    current_page = "0"+current_page;
                }
                if($('[role="current-page"]',scope).length>0){
                    $('[role="current-page"]',scope).html(current_page);
                }
            });

            
            $(".gallery__current-page span").html("01");
        }else{
            $(".gallery__pager",scope).remove();
        }
        if(total==1){
            $(".gallery__pager",scope).remove();
        }
        addEventListener();

    };
        
    return {
        init: function (a_scope) {
            init(a_scope);
        }
    }
}