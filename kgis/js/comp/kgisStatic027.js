!function(c){"use strict";function e(e,t,n,o){var r,i=c.document,d=i.createElement("link");if(t)r=t;else{var a=(i.body||i.getElementsByTagName("head")[0]).childNodes;r=a[a.length-1]}var f=i.styleSheets;if(o)for(var l in o)o.hasOwnProperty(l)&&d.setAttribute(l,o[l]);d.rel="stylesheet",d.href=e,d.media="only x",function e(t){if(i.body)return t();setTimeout(function(){e(t)})}(function(){r.parentNode.insertBefore(d,t?r:r.nextSibling)});var s=function(e){for(var t=d.href,n=f.length;n--;)if(f[n].href===t)return e();setTimeout(function(){s(e)})};function u(){d.addEventListener&&d.removeEventListener("load",u),d.media=n||"all"}return d.addEventListener&&d.addEventListener("load",u),(d.onloadcssdefined=s)(u),d}"undefined"!=typeof exports?exports.loadCSS=e:c.loadCSS=e}("undefined"!=typeof global?global:this);

function kgisStatic027() {
    let onloadCSS=function(n,a){var t;function d(){!t&&a&&(t=!0,a.call(n))}n.addEventListener&&n.addEventListener("load",d),n.attachEvent&&n.attachEvent("onload",d),"isApplicationInstalled"in navigator&&"onloadcssdefined"in n&&n.onloadcssdefined(d)};
    let scope;
    let mode;
    let window_w;
    let window_h;
    let name;
    let break_point = 1024;
    let idx = 0;
    let request;
    var comp_name = 'kgisStatic027';
    let css_array = [];//["kgisStatic027"];
    var data;
    var section_start_top;
    var section_start_offset_top = 300;
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
        
        let max_len = 26;
        if(window_w>=768){
            max_len = 9999;
        }
        // else if(window_w>=1024 && window_w<1100){
        //     max_len = 50;
        // }else if(window_w>=1100 && window_w<1200){
        //     max_len = 60;
        // }else if(window_w>=1200 && window_w<1366){
        //     max_len = 70;
        // }else if(window_w>=1366){
        //     max_len = 78;
        // }
        $('.kgisStatic027__item-title',scope).each(function(){
            var text = $(this)[0].getAttribute('data-title');
            if(text==undefined){
                text = $(this).text();
                $(this).attr("data-title",text)
            }
            var len = text.length;
            if(len>max_len){
                $(this).text(text.substr(0,max_len)+'...')
            }else{
                $(this).text(text)
            }
        })
    }
    let scroll = function(){
        
        var y = Math.round($(window).scrollTop());
        
    }
    let addEventListener = function(){     

        $(document).on( "click.kgisStatic027-tag", '[role="kgisStatic027-tag"]', function(e) {
            var tag_val = $(this)[0].getAttribute('data-value');
            $(".dropdown-item",scope).each(function(){
                var dropdown_value = $(this)[0].getAttribute('data-value');
                if(tag_val == dropdown_value){
                    $(this).trigger('click');

                    // setTimeout(function(){
                    //     $('html,body').animate({
                    //         scrollTop:$('.dropdown',scope).offset().top - 50
                    //     },800);
                    // })
                    return false;
                }
            })
			return false;
        });

        if($('.dropdownToggle').length>0){
            $('.dropdownToggle').dropdown();
            $('.dropdown').each(function(){
                var o = $(this);
                $(".dropdown-item",o).on("click.dropdown-item",function(){
                    var val = $(this)[0].innerHTML;
                    if ($(".dropdownToggle span", o)[0]) {
                        $(".dropdownToggle span", o)[0].innerHTML = val;
                    }                    
                })
            })
        }
        /////////////////////////////////
        $(window).off('scroll.'+name).on('scroll.'+name,scroll);
        $(window).off('resize.'+name).on('resize.'+name,resize);
    };
    
   
    let main = function(){
        setTimeout(function(){
            
            addEventListener();
            resize();
        },100);
    }
    let init = function(a_scope){
        //
        idx = randomID();
        scope = a_scope;
        name = comp_name+'-'+randomID();
        //
        $('.kgisStatic027__item-title',scope).each(function(){
            var text = $(this).text();
            $(this).attr("data-title",text)
        })
        install();
    };
        
    return {
        init: function (a_scope) {
            init(a_scope);
        }
    }
}