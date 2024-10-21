!function (c) { "use strict"; function e(e, t, n, o) { var r, i = c.document, d = i.createElement("link"); if (t) r = t; else { var a = (i.body || i.getElementsByTagName("head")[0]).childNodes; r = a[a.length - 1] } var f = i.styleSheets; if (o) for (var l in o) o.hasOwnProperty(l) && d.setAttribute(l, o[l]); d.rel = "stylesheet", d.href = e, d.media = "only x", function e(t) { if (i.body) return t(); setTimeout(function () { e(t) }) }(function () { r.parentNode.insertBefore(d, t ? r : r.nextSibling) }); var s = function (e) { for (var t = d.href, n = f.length; n--;)if (f[n].href === t) return e(); setTimeout(function () { s(e) }) }; function u() { d.addEventListener && d.removeEventListener("load", u), d.media = n || "all" } return d.addEventListener && d.addEventListener("load", u), (d.onloadcssdefined = s)(u), d } "undefined" != typeof exports ? exports.loadCSS = e : c.loadCSS = e }("undefined" != typeof global ? global : this);

function kgibStatic003() {
    let onloadCSS = function (n, a) { var t; function d() { !t && a && (t = !0, a.call(n)) } n.addEventListener && n.addEventListener("load", d), n.attachEvent && n.attachEvent("onload", d), "isApplicationInstalled" in navigator && "onloadcssdefined" in n && n.onloadcssdefined(d) };
    let scope;
    let mode;
    let window_w;
    let window_h;
    let name;
    let break_point = 768;
    let idx = 0;
    let request;
    var comp_name = 'kgibStatic003';
    let css_array = [];//["kgibStatic003"];
    var data;
    var section_start_top;
    var section_start_offset_top = 200;

    var center_pos
    var swiper;
    var mySwiper = undefined;
    var init_swiper = false;
    //
    let randomID = function () {
        return Math.random().toString(36).substr(2, 9);
    }

    let onlyUnique = function (value, index, self) {
        return self.indexOf(value) === index;
    }

    let install = function () {
        var stylesheet;
        css_array = css_array.filter(onlyUnique);

        $('[type="text/css"]').each(function () {
            var fullPath = $(this).attr("href")
            if (fullPath != undefined) {
                var filename = fullPath.replace(/^.*[\\\/]/, '').split('.').slice(0, -1).join('.')
                css_array.push(filename);
                for (var i = css_array.length - 1; i >= 0; i--) {
                    if (css_array[i] === filename) {
                        css_array.splice(i, 1);
                    }
                }
            }
        })
        request = css_array.length;

        if (request > 0) {
            for (var i in css_array) {
                stylesheet = loadCSS(window.css_url + css_array[i] + ".css?" + window.css_version);
                onloadCSS(stylesheet, onResourceLoad);
            }
        } else {
            onResourceLoad();
        }
    }

    let onResourceLoad = function () {
        request--
        if (request <= 0) {
            main();
        }
    }

    let resize = function () {
        window_w = $(window).width();
        window_h = $(window).height();

        if (window_w >= break_point) {
            if (mode != "lg") {
                mode = "lg";
                initSwiper();
            } else {
            }
        } else {
            if (mode != "s") {
                mode = "s";


                if (mySwiper !== undefined && typeof mySwiper.destroy === "function") {
                    // safe to use the function
                    // console.log('destory to do')
                    mySwiper.destroy(true, true);
                    mySwiper = undefined;
                }
                // $('.swiper-wrapper',scope).attr('style','');
                init_swiper = false;
            }
        }
        $('.kgibStatic003Swiper', scope).css('opacity', 1);

    }

    let addEventListener = function () {

        $(window).off('resize.' + name).on('resize.' + name, resize);

    };

    var centeringSwiper_int;
    let centeringSwiper = function () {
        var left = $(window).width() / 2 - 165;
        var slide_width = $('.swiper-slide', scope).eq(0).width();
        var slide_length = $('.swiper-slide', scope).length;
        var slide_center;
        var shift_left = 0;
        var init_slide_pos = true;
        slide_center = (slide_length) / 2 - 0.5
        shift_left = left - slide_width * slide_center - 20 * (slide_center);

        $('.swiper-wrapper', scope).css('transition', 'all .3s');
        $('.swiper-wrapper', scope).css('transform', 'translate3d(' + shift_left + 'px, 0px, 0px)');
    }
    let initSwiper = function () {

        if (init_swiper) {
            return false;
        }
        console.log('initSwiper start');
        init_swiper = true;

        var swiperPara;
        var use_default = scope.find('[swiper-para]').length == 0; //若沒Attribut則使用預設參數
        if (use_default) {
            swiperPara = {
                spaceBetween: 20,
                centeredSlides: true,
                freeMode: true,
                setWrapperSize: true,
                slidesPerView: 'auto',
                on: {
                    resize: function () {
                        clearTimeout(centeringSwiper_int);
                        centeringSwiper_int = setTimeout(function () {
                            centeringSwiper();
                        }, 10)

                    },
                },
            };
        } else {
            var slide_length = $('.swiper-slide', scope).length;

            if (slide_length > 3) {
                swiperPara = {
                    spaceBetween: 20,//Card中間寬度
                    centeredSlides: false,
                    setWrapperSize: true,
                    allowTouchMove: false,//是否能移動Card
                    slidesPerView: 3,//Card顯示數量
                    slidesPerGroup: 1,//Card移動數量
                    loop: true,//是否循環
                    loopFillGroupWithBlank: true,//Card不足的部分由空白補足
                    autoplay: {
                        disableOnInteraction: false,//移動Card後是否停止輪播
                        delay: 3000,//移動速度
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }
                };
            }
            else {
                swiperPara = {
                    spaceBetween: 20,//Card中間寬度
                    centeredSlides: false,
                    setWrapperSize: true,
                    allowTouchMove: false,//是否能移動Card
                    slidesPerView: 3,//Card顯示數量
                };
            }
        }

        mySwiper = new Swiper('.kgibStatic003Swiper', swiperPara);

        if (use_default) {
            var left = $(window).width() / 2 - 165;
            var slide_width = $('.swiper-slide', scope).eq(0).width();
            var slide_length = $('.swiper-slide', scope).length;
            var slide_center;
            var shift_left = 0;
            var init_slide_pos = true;
            slide_center = (slide_length) / 2 - 0.5
            shift_left = left - slide_width * slide_center - 20 * (slide_center);
            setTimeout(function () {
                if (init_slide_pos) {
                    centeringSwiper();
                    $('.kgibStatic003Swiper', scope).css('opacity', 1);
                    // center_pos = shift_left;
                    // resize();
                }
            }, 300);
        }
    }
    let main = function () {
        setTimeout(function () {
            addEventListener();
            resize();
        }, 100);
    }
    let init = function (a_scope, Swiper) {
        //
        idx = randomID();
        scope = a_scope;
        swiper = Swiper;
        name = comp_name + '-' + randomID();
        install();
    };


    return {
        init: function (a_scope, Swiper) {
            init(a_scope, Swiper);
        }
    }
}