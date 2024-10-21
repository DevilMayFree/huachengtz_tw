!function(c){"use strict";function e(e,t,n,o){var r,i=c.document,d=i.createElement("link");if(t)r=t;else{var a=(i.body||i.getElementsByTagName("head")[0]).childNodes;r=a[a.length-1]}var f=i.styleSheets;if(o)for(var l in o)o.hasOwnProperty(l)&&d.setAttribute(l,o[l]);d.rel="stylesheet",d.href=e,d.media="only x",function e(t){if(i.body)return t();setTimeout(function(){e(t)})}(function(){r.parentNode.insertBefore(d,t?r:r.nextSibling)});var s=function(e){for(var t=d.href,n=f.length;n--;)if(f[n].href===t)return e();setTimeout(function(){s(e)})};function u(){d.addEventListener&&d.removeEventListener("load",u),d.media=n||"all"}return d.addEventListener&&d.addEventListener("load",u),(d.onloadcssdefined=s)(u),d}"undefined"!=typeof exports?exports.loadCSS=e:c.loadCSS=e}("undefined"!=typeof global?global:this);

function kgisStatic002() {
    let onloadCSS=function(n,a){var t;function d(){!t&&a&&(t=!0,a.call(n))}n.addEventListener&&n.addEventListener("load",d),n.attachEvent&&n.attachEvent("onload",d),"isApplicationInstalled"in navigator&&"onloadcssdefined"in n&&n.onloadcssdefined(d)};
    let scope;
    let mode;
    let window_w;
    let window_h;
    let name;
    let break_point = 1024;
    let idx = 0;
    let request;
    var comp_name = 'kgisStatic002';
    let css_array = [];//["kgisStatic002"];
    var data;
    var section_start_top;
    var section_start_offset_top = 200;
    //
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
            var fullPath = $(this).attr("href")
            if(fullPath!=undefined){
                var filename = fullPath.replace(/^.*[\\\/]/, '').split('.').slice(0, -1).join('.')
                css_array.push(filename);
                for (var i=css_array.length-1; i>=0; i--) {
                    if (css_array[i] === filename) {
                        css_array.splice(i, 1);
                    }
                }
            }
        })
        request = css_array.length;

        if(request>0){
            for(var i in css_array){
                stylesheet = loadCSS(window.css_url + css_array[i] + ".css?"+window.css_version);
                onloadCSS( stylesheet, onResourceLoad);
            }
        }else{
            onResourceLoad();
        }
    }

    let onResourceLoad = function(){
        request--
        if(request<=0){
            main();
        }
    }

    let resize = function(){
        window_w = $(window).width();
        window_h = $(window).height();

        if(window_w>=break_point){
            if(mode!="lg"){
                mode = "lg";
            }
        }else{
            if(mode!="s"){
                mode = "s";
            }
        }
    }
    let scroll = function(){
        
        var y = Math.round($(window).scrollTop());
        section_start_top = scope.offset().top - section_start_offset_top;
        if(y<section_start_top || section_start_top<0){
            
        }else if(y>=section_start_top){
            if(!scope.hasClass('active')){
                scope.addClass('active')
            }
        }
    }
    let addEventListener = function(){     

        
        /////////////////////////////////
        $(window).off('scroll.'+name).on('scroll.'+name,scroll);
        $(window).off('resize.'+name).on('resize.'+name,resize);

        
    };
    
   
    let main = function(){
        setTimeout(function(){
            
            // On swipe event
            $('.slick-slider',scope).on('swipe', function(event, slick, direction){
                // console.log(direction);
                // left
            });
            
            // On edge hit
            $('.slick-slider',scope).on('edge', function(event, slick, direction){
            //  console.log('edge was hit')
            });
            
            
            $('.slick-slider',scope).on('init', function(slick){
             
                var currentSlide = $('.slick-active',scope).addClass('active');
                var total_length = $('.slick-slide',scope).length;
                // if(total_length<=1){
                //     $('.slick-dots',scope).addClass('d-none');
                // }
                
                if($("video",currentSlide).length>0){
                
                    setTimeout(function(){
                        console.log('play');
                        var video_elm = $("video",currentSlide).get(0);
                        video_elm.currentTime = 0;
                        video_elm.play();
                    },200)
                }
            });

            // On before slide change
            $('.slick-slider',scope).on('beforeChange', function(event, slick, currentSlide, nextSlide){
            });
            
            // On before slide change
            $('.slick-slider',scope).on('afterChange', function(event, slick, currentSlide){
                $('.slick-slide',scope).removeClass('active');
                $('video',scope).each(function(){
                    var video_elm = $(this).get(0);
                    video_elm.currentTime = 0;
                    video_elm.pause();
                });
                var currentSlide = $('.slick-current',scope).addClass('active');
                if($("video",currentSlide).length>0){
                    var video_elm = $("video",currentSlide).get(0);
                    video_elm.currentTime = 0;
                    video_elm.play();
                }
            });
            
            $('.slick-slider',scope).slick({
                dots: true,
                arrows: false,
                infinite: true,
                speed: 500,
                autoplay: true,
                autoplaySpeed: 5000,
            });

            $( ".slick-dots",scope ).wrap( "<div class='container'></div>" );
            $('.slick-slide',scope).css('opacity',1);
            addEventListener();
            resize();
        },100);
    }
    let init = function(a_scope){
        //
        idx = randomID();
        scope = a_scope;
        name = comp_name+'-'+randomID();
        install();
    };
        
    return {
        init: function (a_scope) {
            init(a_scope);
        }
    }
}