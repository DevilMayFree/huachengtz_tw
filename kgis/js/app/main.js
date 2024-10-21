!function(c){"use strict";function e(e,t,n,o){var r,i=c.document,d=i.createElement("link");if(t)r=t;else{var a=(i.body||i.getElementsByTagName("head")[0]).childNodes;r=a[a.length-1]}var f=i.styleSheets;if(o)for(var l in o)o.hasOwnProperty(l)&&d.setAttribute(l,o[l]);d.rel="stylesheet",d.href=e,d.media="only x",function e(t){if(i.body)return t();setTimeout(function(){e(t)})}(function(){r.parentNode.insertBefore(d,t?r:r.nextSibling)});var s=function(e){for(var t=d.href,n=f.length;n--;)if(f[n].href===t)return e();setTimeout(function(){s(e)})};function u(){d.addEventListener&&d.removeEventListener("load",u),d.media=n||"all"}return d.addEventListener&&d.addEventListener("load",u),(d.onloadcssdefined=s)(u),d}"undefined"!=typeof exports?exports.loadCSS=e:c.loadCSS=e}("undefined"!=typeof global?global:this);

String.prototype.escape = function() {
    var tagsToReplace = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
    };
    return this.replace(/[&<>]/g, function(tag) {
        return tagsToReplace[tag] || tag;
    });
};

// window.color_ary = [];
// var color_primary = ['#FEF8F1','#04327A','#A2C0EF','#68C89E','#FF623E','#DF4623','#7D7D7D','#B7B7B7'] ;

// var color_secondary = ['#FEF8F1','#041C43','#A2C0EF','#FF623E','#FFFFFF','#F0F4F7','#68C89E'];
// var color_grey = ['#7D7D7D','#B7B7B7','#E2E2E2','#F6F6F6','#000000'];
// window.color_ary = color_primary.concat(color_secondary).concat(color_grey)

let css_array = [];

let browserSupportsPositionSticky = function(){
    var prop = 'position:';
    var value = 'sticky';
    var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  
    var el = document.createElement('a');
    var mStyle = el.style;
    mStyle.cssText = prop + prefixes.join(value + ';' + prop).slice(0, - prop.length);
    
    return mStyle.position.indexOf(value) !== -1;
};

window.replaceWord = function(){

    var target_ary = [];
    $('h1,h2,h3,h4,h5,h6,div,br,li,p,span,blockquote',$("main")).each(function() {
        var elm = $(this);

        var children = elm.children();
        while( children.length) {
            children = children.children();
        }
        
        var html = children.end().parent().html();
        if(html!=undefined){
            var indexof = html.indexOf('辜仲瑩');
    
            if(html!="" && indexof!=-1){
                target_ary.push(elm);
            }
        }
    })

   // //console.log('target_ary',target_ary);
    for(var i in target_ary){
        var elm = target_ary[i];
        var html = elm.html();
        html = html.replace(/辜仲瑩/gi,'辜仲<i class="icon-yin"></i>');
        elm.html(html);
    }
   // console.timeEnd('replace 1st');


   // console.time('replace 2nd');
    $('.icon-yin').each(function(){
        var o = $(this);
        var elm = $(this).parent();
        var font_size = elm.css('font-size');
        var font_weight = parseInt(elm.css('font-weight'));
        if(font_weight>400){
            // console.time('replace class');
            o.attr('class','icon-yin-bold');
            // console.timeEnd('replace class');
        }
        
    })
    //console.timeEnd('replace 2nd');
}

let randomID = function(){
    return Math.random().toString(36).substr(2, 9);
}
let addComponentCss = function(){
    for(let i in css_array){
        var stylesheet = $("<link>", {
            rel: "stylesheet",
            type: "text/css",
            // href: "/cdf/css/component/"+css_array[i]+".css"
            href: window.site_url+"css/component/"+css_array[i]+".css?"+window.css_version
        });

    }
    //add google fonts
    var stylesheet = $("<link>", {
        rel: "stylesheet",
        type: "text/css",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;250;300;400;500;600&family=Noto+Sans+TC:wght@300;400;500;700&display=swap"
    });
//    stylesheet.appendTo("head");
}
let onlyUnique = function (value, index, self) {
    return self.indexOf(value) === index;
}
function logElementEvent(eventName, element) {
   // //console.log(Date.now(), eventName, element.getAttribute("data-src"));
}

var callback_enter = function (element) {
    logElementEvent("🔑 ENTERED", element);
};
var callback_exit = function (element) {
    logElementEvent("🚪 EXITED", element);
};
var callback_loading = function (element) {
    logElementEvent("⌚ LOADING", element);
};
var callback_loaded = function (element) {
    logElementEvent("👍 LOADED", element);
};
var callback_error = function (element) {
    logElementEvent("💀 ERROR", element);
    element.src =
        "https://via.placeholder.com/440x560/?text=Error+Placeholder";
};
var callback_finish = function () {
    logElementEvent("✔️ FINISHED", document.documentElement);
};
var callback_cancel = function (element) {
    logElementEvent("🔥 CANCEL", element);
};

window.lazyLoadOptions = {
    threshold: 300,
};
window.addEventListener(
    "LazyLoad::Initialized", 
    function (e) {
    },
    false
);


/// Dynamically define the dependencies
var resources = [
    "IntersectionObserver" in window
        ? null // <- Doesn't require the polyfill
        : "lazyload_polyfill"
        ,"lazyload"
];


resources.push("jquery");

if(!!window.HTMLPictureElement == false){
    resources.push("picturePolyfill");
}
if(!browserSupportsPositionSticky()){
    
    // resources.push("sticky_polyfill");
    // resources.push("jquery.stickytableheaders");
}

// resources.push("sticky_polyfill");

resources.push("ofi");
resources.push("jquery_scrollbar");

let comp_elements = document.querySelectorAll("[data-type='comp']");
let action_ary = [];

for (let i = 0; i < comp_elements.length; i++) {
    let comp_name = comp_elements[i].getAttribute("data-comp-name");

    if(comp_name != "" && comp_name != undefined){
        switch(comp_name){
            case "cookie":
                //resources.push("bootstrap/bootstrap.bundle");   
                resources.push("comp/"+comp_name); 
                action_ary.push(comp_name); 
            break;


            case "cdibFundsDetail":
                //resources.push("jquery_scrollbar");
                resources.push("comp/"+comp_name); 
                action_ary.push(comp_name); 
            break;

            case "iframe":
                //resources.push("jquery_scrollbar");
                resources.push("comp/"+comp_name); 
                action_ary.push(comp_name); 
            break;

            case "kgibStatic001":
                resources.push("slick");
                resources.push("comp/"+comp_name); 
                action_ary.push(comp_name); 
            break;
           
            case "kgibStatic003":
                
                resources.push("swiper"); 
                // resources.push("slick");
                resources.push("comp/"+comp_name); 
                action_ary.push(comp_name); 
            break;
            
            case "kgibStatic004":
                resources.push("slick");
                resources.push("comp/"+comp_name); 
                action_ary.push(comp_name); 
            break;

            case "kgibStatic005":
                resources.push("comp/"+comp_name); 
                action_ary.push(comp_name); 
            break;

            case "kgibStatic006":
                resources.push("comp/"+comp_name); 
                action_ary.push(comp_name); 
            break;

            case "kgibStatic010":
                resources.push("comp/"+comp_name); 
                action_ary.push(comp_name); 
            break;


            case "kgibStatic011":
                resources.push("comp/"+comp_name); 
                action_ary.push(comp_name); 
            break;
            
            case "kgisStatic024":
                resources.push("slick");
                resources.push("comp/"+comp_name); 
                action_ary.push(comp_name);
            break;

            case "kgibOtherCus004":
                resources.push("jquery_ui");
                resources.push("bootstrap/bootstrap.bundle");   
                resources.push("comp/"+comp_name); 
                action_ary.push(comp_name); 
            break;

            case "kgibCus006":
                //resources.push("jquery_scrollbar");
                resources.push("bootstrap/bootstrap.bundle");   
                resources.push("comp/"+comp_name); 
                action_ary.push(comp_name); 
            break;

            case "kgibOther001":
                resources.push("bootstrap/bootstrap.bundle");   
                resources.push("comp/"+comp_name); 
                action_ary.push(comp_name); 
            break;

            case "kgibOther006":
                resources.push("jquery_ui");
                resources.push("bootstrap/bootstrap.bundle");   
                //resources.push("jquery_scrollbar");
                resources.push("comp/"+comp_name); 
                action_ary.push(comp_name); 
            break;

            case "kgibOtherCus006":
                resources.push("bootstrap/bootstrap.bundle");   
                resources.push("comp/"+comp_name); 
                action_ary.push(comp_name); 
            break;

            case "kgibOtherCus013":
                resources.push("bootstrap/bootstrap.bundle");   
                resources.push("comp/"+comp_name); 
                action_ary.push(comp_name); 
            break;
            
            case "kgibCus001":
                resources.push("jquery_ui");
                resources.push("jquery.ui.touch-punch.min");
                
                // resources.push("bootstrap/bootstrap.bundle");   
                //resources.push("comp/"+comp_name); 
               // action_ary.push(comp_name); 
            break;

            case "kgibCus009":
                resources.push("highcharts");
                resources.push("highcharts/modules/data"); 
                resources.push("highcharts/modules/stock"); 
                resources.push("bootstrap/bootstrap.bundle");   
                // resources.push("comp/"+comp_name); 
                // action_ary.push(comp_name); 
            break;

            case "kgisStatic001":
                resources.push("slick");
                resources.push("comp/"+comp_name); 
                action_ary.push(comp_name); 
            break;

            case "kgisStatic002":
                resources.push("slick");
                resources.push("comp/"+comp_name); 
                action_ary.push(comp_name); 
            break;

            case "kgisStatic009":
                resources.push("comp/"+comp_name); 
                action_ary.push(comp_name); 
            break;

            case "kgisStatic014":
                resources.push("slick");
                resources.push("bootstrap/bootstrap.bundle");   
                resources.push("comp/"+comp_name); 
                action_ary.push(comp_name); 
            break;

            case "kgisStatic027":
                resources.push("bootstrap/bootstrap.bundle"); 
                resources.push("comp/"+comp_name); 
                action_ary.push(comp_name); 
            break;

            case "kgisStatic031":
                resources.push("bootstrap/util");                
                resources.push("bootstrap/collapse");
                resources.push("comp/"+comp_name); 
                action_ary.push(comp_name); 
            break;

            case "kgisStatic033":
                resources.push("slick");
                resources.push("bootstrap/bootstrap.bundle");   
                resources.push("comp/"+comp_name); 
                action_ary.push(comp_name); 
            break;

            case "kgisStatic034":
                resources.push("bootstrap/bootstrap.bundle");  
                resources.push("comp/"+comp_name); 
                action_ary.push(comp_name); 
            break;

            case "kgibOtherc005":
                resources.push("slick");
                resources.push("comp/"+comp_name); 
                action_ary.push(comp_name); 
            break;
            
            case "kgisOther011":
                resources.push("bootstrap/util");                
                resources.push("bootstrap/dropdown");
                resources.push("comp/"+comp_name); 
                action_ary.push(comp_name); 
            break;

            case "kgisCus012":
                //resources.push("jquery_scrollbar");
                resources.push("bootstrap/util");                
                resources.push("bootstrap/collapse");
                resources.push("comp/"+comp_name); 
                action_ary.push(comp_name); 
            break;

            case "scrollerTable":
                //resources.push("jquery_scrollbar");
                resources.push("bootstrap/bootstrap.bundle");   
                resources.push("comp/"+comp_name); 
                action_ary.push(comp_name); 
            break;

            case "kgisCus017":
                //resources.push("jquery_scrollbar");
                resources.push("bootstrap/util");                
                resources.push("bootstrap/collapse");
                resources.push("comp/"+comp_name); 
                action_ary.push(comp_name); 
            break;

            case "kgisCus018":
                //resources.push("jquery_scrollbar");
                resources.push("bootstrap/bootstrap.bundle");   
                // resources.push("comp/"+comp_name); 
                // action_ary.push(comp_name); 
            break;

            case "kgisCus021":
                //resources.push("jquery_scrollbar");
                resources.push("bootstrap/bootstrap.bundle");   
                resources.push("comp/"+comp_name); 
                action_ary.push(comp_name); 
            break;

            case "kgisCus022":
                resources.push("comp/"+comp_name); 
                action_ary.push(comp_name); 
            break;

            case "kgisCus029":
                //resources.push("jquery_scrollbar");
                resources.push("bootstrap/bootstrap.bundle");   
                resources.push("comp/"+comp_name); 
                action_ary.push(comp_name); 
            break;

            case "kgisCus004":
                resources.push("bootstrap/bootstrap.bundle");   
                // resources.push("comp/"+comp_name); 
                // action_ary.push(comp_name); 
            break;

            case "moneydj":
                resources.push("comp/"+comp_name); 
                action_ary.push(comp_name); 
            break;

            case "kgibCus025":
                action_ary.push(comp_name); 
                resources.push("bootstrap/bootstrap.bundle");   
                //resources.push("jquery_scrollbar");
                resources.push("comp/"+comp_name); 
            break;

            case "googlemap":
                css_array.push(comp_name);
                action_ary.push(comp_name); 
                resources.push("bootstrap/bootstrap.bundle");   
                //resources.push("jquery_scrollbar");
                resources.push("comp/"+comp_name); 
            break;

            case "kgisOtherCus001":
                action_ary.push(comp_name); 
                resources.push("bootstrap/bootstrap.bundle");   
                //resources.push("jquery_scrollbar");
                // resources.push("comp/"+comp_name); 
            break;
        

            case "kgibOtherCus016":
                action_ary.push(comp_name); 
                resources.push("bootstrap/bootstrap.bundle");   
                //resources.push("jquery_scrollbar");
            break;

            case "kgisTimeline":
                action_ary.push(comp_name); 
                resources.push("swiper"); 
                resources.push("comp/"+comp_name); 
            break;

            case "timeline":
                action_ary.push(comp_name); 
                resources.push("swiper"); 
                //resources.push("jquery_scrollbar");
                resources.push("comp/"+comp_name); 
            break;

            case "footer":
                css_array.push(comp_name);
            break;
            case "header":
                resources.push("comp/" + comp_name);
                resources.push("bootstrap/bootstrap.bundle");
                resources.push("bootstrap/collapse");
                resources.push("bootstrap/tab");
                action_ary.push(comp_name); 
            break;
            case "highstock":
                resources.push("highcharts");
                // css_array.push(comp_name);
                action_ary.push(comp_name); 
                resources.push("highcharts/modules/stock"); 
                // resources.push("highcharts/stock/highstock");   
                // resources.push("highcharts/modules/data");   
            break;

            case "highcharts":
                resources.push("highcharts");
                css_array.push(comp_name);
                action_ary.push(comp_name); 
                resources.push("highcharts/modules/variable-pie");   
                resources.push("highcharts/modules/accessibility");    
            break;

            h

            case "highcharts-cdib-portfolio-companies":
                resources.push("highcharts");
                css_array.push("highcharts");
                action_ary.push(comp_name); 
                // resources.push("highcharts/modules/variable-pie");   
                // resources.push("highcharts/modules/accessibility");   
                resources.push("comp/"+comp_name);  
            break;
            case "highcharts-custom":
                resources.push("highcharts");
                css_array.push("highcharts");
                resources.push("highcharts/modules/variable-pie");   
                resources.push("highcharts/modules/accessibility");   
            break;

            case "kgisStatic025":
                resources.push("highcharts");
                css_array.push("highcharts");
                action_ary.push(comp_name); 
                resources.push("highcharts/modules/variable-pie");   
                resources.push("highcharts/modules/accessibility");   
                resources.push("comp/"+comp_name);  
            break;

            case "highcharts-esg-performance-philanthropic-initiatives":
                resources.push("highcharts");
                css_array.push("highcharts");
                action_ary.push(comp_name); 
                resources.push("highcharts/modules/variable-pie");   
                resources.push("highcharts/modules/accessibility");   
                resources.push("comp/"+comp_name);  
            break;

            case "highcharts-esg-hc-roi":
                resources.push("highcharts");
                css_array.push("highcharts");
                action_ary.push(comp_name); 
                resources.push("highcharts/modules/variable-pie");   
                resources.push("highcharts/modules/accessibility");   
                resources.push("comp/"+comp_name);   
            break;


            case "highcharts-esg-green-investment":
                resources.push("highcharts");
                css_array.push("highcharts");
                action_ary.push(comp_name); 
                resources.push("highcharts/modules/variable-pie");   
                resources.push("highcharts/modules/accessibility");   
                resources.push("comp/"+comp_name);   
            break;

            case "highcharts-cdib-our-strategy":
                resources.push("highcharts");
                css_array.push("highcharts");
                action_ary.push(comp_name); 
                resources.push("highcharts/modules/variable-pie");   
                resources.push("highcharts/modules/accessibility");   
                resources.push("comp/"+comp_name);   
            break;

            case "highcharts-esg-social-investment":
                resources.push("highcharts");
                css_array.push("highcharts");
                action_ary.push(comp_name); 
                resources.push("highcharts/modules/variable-pie");   
                resources.push("highcharts/modules/accessibility");   
                resources.push("comp/"+comp_name);   
            break;


            case "highcharts-esg-integration":
                resources.push("highcharts");
                css_array.push("highcharts");
                action_ary.push(comp_name); 
                resources.push("highcharts/modules/variable-pie");   
                resources.push("highcharts/modules/accessibility");   
                resources.push("comp/"+comp_name);   
            break;

            case "highcharts-sdgs-balance-weight":
                resources.push("highcharts");
                css_array.push("highcharts");
                action_ary.push(comp_name); 
                resources.push("highcharts/modules/variable-pie");   
                resources.push("highcharts/modules/accessibility");   
                resources.push("comp/"+comp_name);   
            break;

            case "highcharts-sdgs-total-portfolios":
                resources.push("highcharts");
                css_array.push("highcharts");
                action_ary.push(comp_name); 
                resources.push("highcharts/modules/variable-pie");   
                resources.push("highcharts/modules/accessibility");   
                resources.push("comp/"+comp_name);   
            break;

            case "stock-agents-form":
                css_array.push("form");
                resources.push("validate");
                resources.push("comp/"+comp_name);
                action_ary.push(comp_name);
            break;

            case "subscribe":
                css_array.push(comp_name);
                resources.push("validate");
                // resources.push("validation_additional");
                resources.push("comp/"+comp_name);
                action_ary.push(comp_name);
            break;
            

            case "contact-form":
                // css_array.push("form");
                resources.push("validate");
                resources.push("comp/"+comp_name);
                action_ary.push(comp_name);
            break;
            case "kgibOtherCus015":
                // css_array.push("form");
               // resources.push("validate");
                // resources.push("comp/"+comp_name);
                // action_ary.push(comp_name);
            break;


            case "form-custom":
                // css_array.push("form");
                resources.push("bootstrap/bootstrap.bundle");   
                resources.push("validate");
                resources.push("validate_additional");
                action_ary.push(comp_name);
            break;

            case "tabs":
                css_array.push(comp_name);
                resources.push("comp/"+comp_name);
                action_ary.push(comp_name);
            break;

            case "sdgs-portfolio-tabs":
                css_array.push("tabs");
                resources.push("comp/"+comp_name);
                action_ary.push(comp_name);
            break;
            
            case "news":
                resources.push("comp/"+comp_name);
                action_ary.push(comp_name);
            break;

            case "info-cube":
                css_array.push(comp_name);
                resources.push("comp/"+comp_name);
                action_ary.push(comp_name);
            break;

            case "press":
                // resources.push("popper.min");
                resources.push("bootstrap/bootstrap.bundle");   
                resources.push("comp/"+comp_name);
                action_ary.push(comp_name);
            break;

            case "principal-investments":
                css_array.push("accordion");
                resources.push("bootstrap/util");                
                resources.push("bootstrap/collapse");
                resources.push("comp/"+comp_name);
                action_ary.push(comp_name);
            break;

            case "accordion":
                css_array.push(comp_name);
                resources.push("bootstrap/util");                
                resources.push("bootstrap/collapse");
                resources.push("comp/"+comp_name);
                action_ary.push(comp_name);
            break;
            
            case "kv":
                //css_array.push(comp_name); integrate to style.css for first screen 
                resources.push("comp/"+comp_name); 
                action_ary.push(comp_name);
            break;

            case "media":
                // css_array.push(comp_name);
                // resources.push("video");
                resources.push("comp/"+comp_name); 
                action_ary.push(comp_name);
            break;
            
            case "esg-epl":
                css_array.push(comp_name);
                resources.push("bootstrap/bootstrap.bundle");   
                action_ary.push(comp_name);
            break;
            
            case "esg-reports":
                resources.push("slick");
                action_ary.push(comp_name);
            break;
            
            case "download-group":
                resources.push("slick.1.9");
                resources.push("comp/download-group");
                css_array.push(comp_name);
                action_ary.push(comp_name);
            break;

            case "gallery":
                css_array.push(comp_name);
                resources.push("slick");
                resources.push("comp/gallery");
                action_ary.push(comp_name);
            break;
            
            case "investment-charging-station":
                resources.push("slick");
                resources.push("comp/investment-charging-station");
                action_ary.push(comp_name);
            break;
            
            case "kgis-overseas":
                resources.push("slick");
                resources.push("comp/kgis-overseas");
                action_ary.push(comp_name);
            break;

            case "kgisCus032":
                resources.push("comp/"+comp_name);
                action_ary.push(comp_name);
            break;
            
            case "card-list":
                css_array.push("card-list");
                resources.push("comp/card-list");
                resources.push("slick");
                action_ary.push(comp_name);
            break;

            case "dropdown":
                //css_array.push(comp_name);
                resources.push("bootstrap/util");                
                resources.push("bootstrap/tooltip");
                resources.push("bootstrap/dropdown");
                action_ary.push(comp_name);
            break;

            case "interactive-table":
                css_array.push(comp_name);
                resources.push("bootstrap/util");                
                resources.push("bootstrap/modal");            
                resources.push("bootstrap/tooltip");
                resources.push("bootstrap/dropdown");
                action_ary.push(comp_name);
            break;

            case "modal":
                css_array.push(comp_name);
                resources.push("bootstrap/util");                
                resources.push("bootstrap/modal");            
                resources.push("bootstrap/tooltip");
                action_ary.push(comp_name);
            break;


            case "popup":
                css_array.push(comp_name);
                resources.push("comp/"+comp_name);
                action_ary.push(comp_name);
            break;


            case "meeting":
                css_array.push(comp_name);
            break;

            case "pagination":
                css_array.push(comp_name);
            break;
            case "cards":
                css_array.push(comp_name);
            break;

            case "downloads":
                css_array.push(comp_name);
            break;

            case "calendar":
                css_array.push(comp_name);
            break;

            case "announcement":
                css_array.push(comp_name);
            break;

            case "stock":
                css_array.push(comp_name);
            break;

            case "stock-group":
                css_array.push("stock");
                resources.push("comp/"+comp_name);
                action_ary.push(comp_name);
            break;

            case "cube":
                action_ary.push(comp_name);
            break;

            case "table":
                resources.push("comp/"+comp_name);
                action_ary.push(comp_name);
                // css_array.push(comp_name);
                // css_array.push("flex-table");
            break;

            case "collapse-table":
                action_ary.push(comp_name);
                // css_array.push("table");
            break;

            case "scrollbar":
                //resources.push("jquery_scrollbar");
                resources.push("comp/"+comp_name);
                css_array.push(comp_name);
                action_ary.push(comp_name);
            break;

            case "campaign-registration-listing":
                resources.push("comp/"+comp_name);
                action_ary.push(comp_name);
            break;

            case "campaign-listing":
                resources.push("comp/"+comp_name);
                action_ary.push(comp_name);
            break;

            case "kgisSearch":
                resources.push("comp/"+comp_name);
                action_ary.push(comp_name);
            break;

            case "search":
                //css_array.push(comp_name);
                // resources.push("autocomplete");
                resources.push("comp/"+comp_name);
                action_ary.push(comp_name);
            break;

            case "data-list":
                css_array.push(comp_name);
            break;

            case "subnav":
                //css_array.push(comp_name);
                resources.push("comp/"+comp_name);
                action_ary.push(comp_name);
            break;

            case "data-collapse":
                resources.push("comp/"+comp_name);
                action_ary.push(comp_name);
            break;

            case "quarterly-results":
                // css_array.push("table");
                resources.push("comp/quarterly-results");
                action_ary.push(comp_name);
            break;

            case"esg-issues":
                css_array.push(comp_name);
                resources.push("comp/"+comp_name);
                action_ary.push(comp_name);
            break;

            case "reports":
            break;

            case "flex-table":
                // css_array.push("table");
                // css_array.push(comp_name);
                
                
                action_ary.push(comp_name);
            break;

            case "img-group":
                css_array.push(comp_name);
            break;

            case "process-square":
                css_array.push(comp_name);
            break;
            case "social":
                css_array.push(comp_name);
            break;
            
            /*20200408*/
            case "kgishk017":
                resources.push("bootstrap/bootstrap.bundle");   
                resources.push("comp/"+comp_name); 
                action_ary.push(comp_name); 
            break;

            case "kgishkCus007Chart":
                resources.push("highcharts");
                css_array.push("highcharts");
                action_ary.push(comp_name); 
                resources.push("highcharts/modules/variable-pie");   
                resources.push("highcharts/modules/accessibility");   
                resources.push("comp/"+comp_name);   
            break;

            case "kgishkCus008Chart":
                resources.push("highcharts");
                css_array.push("highcharts");
                action_ary.push(comp_name); 
                resources.push("highcharts/modules/variable-pie");   
                resources.push("highcharts/modules/accessibility");   
                resources.push("comp/"+comp_name);   
            break;

            case "kgishk027":
                resources.push("slick");
                resources.push("bootstrap/bootstrap.bundle");   
                resources.push("comp/kgishk027");
                action_ary.push(comp_name);
            break;

            case "kgishkSearch":
                resources.push("comp/"+comp_name);
                action_ary.push(comp_name);
            break;

            case "kgibSlideBanner":
                action_ary.push(comp_name);
                resources.push("swiper");
            break;

            case "stepFlowInformation":
                resources.push("swiper");
                resources.push("bootstrap/bootstrap.bundle");
                resources.push("slick");
            break;

            default:
                // resources.push("comp/"+comp_name);
            break;
        }
    }
}


resources = resources.filter(onlyUnique);


require(resources, function() {

    var has_highcharts = false;
    var has_swiper = false;
    for (var i in resources) {
        if (resources[i] == "highcharts") {
            has_highcharts = true;
        }
        if (resources[i] == "swiper") {
            has_swiper = true;
        }
    }
    
    let normalArray = Array.prototype.slice.call(arguments)
    var idx = 0;

    LazyLoad = normalArray[1];
    $ = normalArray[2];

    if (has_highcharts) {
        Highcharts = normalArray[resources.indexOf('highcharts')];
    }

    if (has_swiper) {
        Swiper = normalArray[resources.indexOf('swiper')];
    }

    var lazyLoadInstance = new LazyLoad({
        // Your custom settings go here
    });

    $(function() {
        objectFitImages();

        

        if($('.kgisOther001').length>0){
            document.documentElement.className += ' has-bottom-nav';
        }
        
        $(document).on( "click.data-loader", ".data-loader", function(e) {
        // $('.data-loader').on('click',function(e){
            e.preventDefault();
            // e.stopPropagation();

            var target_name = encodeURI($(this)[0].getAttribute("data-target"));
            var target_text = $(this).text();
            var data_url = encodeURI($(this)[0].getAttribute("href"));

     
            var target = $(decodeURI(target_name));
            var click_elm = $(this);
            if(target.length==0){
                //alert('target element '+target_name+' is not exist');
                return;
            }

            
            if($(this).hasClass('dropdown-item')){
                // alert(decodeURI(target_name));
                // alert($('.dropdown-item.data-loader[data-target="'+decodeURI(target_name)+'"]').length);

                $('main .dropdown-item').each(function(){
                    var elm = $(this);
                    var elm_target_name =  encodeURI(elm[0].getAttribute("data-target"));
                    var elm_text =  elm.text();
                    if(target_name == elm_target_name){
                        var dropdown = elm.parents('.dropdown');
                        $('.dropdownToggle span',dropdown).text(target_text);
                    }

                });
            }else{
                var has_dropdown = false;
                $('main .dropdown-item').each(function(){
                    if($(this).attr("data-target") == click_elm.attr("data-target")){
                        if($(this).attr("href") == click_elm.attr("href")){
                            has_dropdown = true;
                            var header_h = $(".component-header").height();
                            var subnav_h = $(".subnav").height();
                            var item_y = $(this).parents(".dropdown").offset().top;
                            var offset_y = 50;
                            var dest_y = item_y - subnav_h - offset_y;
                            $('html,body').animate({
                                scrollTop:dest_y
                            },500);

                            $(this).trigger('click');
                            return;
                        }
                    }
                })   
            }


            if(target.length){
                //
                if($(".tmp_data_loader").length>0){
                    $(".tmp_data_loader").remove();
                }
                
                $("body").append('<div class="tmp_data_loader d-none"></div>');
                // let data_target = data_url +" "+ target_name;
                let data_target = decodeURI(data_url +" "+ target_name);
                // //console.log(data_target)
                // data_target = DOMPurify.sanitize(data_target);

                // return false;
                $(".tmp_data_loader").load( data_target, function(e) {
        
                    var result_html = undefined;
                    if ($('.tmp_data_loader>*')[0]) {
                        result_html = $('.tmp_data_loader>*')[0].innerHTML;
                    }

                    $(target).fadeOut(function(){
                        $(this).empty();
                        
                        $(this).html(result_html);

                        replaceWord();
                        
                        $(this).fadeIn();
                        
                        $(window).trigger('resize');

                        $('[data-type="comp"]',$(this)).each(function(){
                            var comp_name = $(this).attr("data-comp-name");

                            switch(comp_name){
                                case "table":
                                    let _table;
                                    _table = new table();
                                    _table.init($(this));
                                break;

                                case "data-collapse":
                                    let _dataCollapse;
                                    _dataCollapse = new dataCollapse();
                                    _dataCollapse.init($(this));
                                break;

                                case "popup":
                                    let _popup;
                                    _popup = new popup();
                                    _popup.init($(this));
                                break;

                                case "highcharts-cdib-portfolio-companies":
                                    let _highchartsCdibPortfolioCompanies;
                                    _highchartsCdibPortfolioCompanies = new highchartsCdibPortfolioCompanies();
                                    _highchartsCdibPortfolioCompanies.init(Highcharts,$(this));

                                break;
                                case "highcharts-esg-performance-philanthropic-initiatives":
                                    let _highchartsEsgPerformancePhilanthropicInitiatives;
                                    _highchartsEsgPerformancePhilanthropicInitiatives = new highchartsEsgPerformancePhilanthropicInitiatives();
                                    _highchartsEsgPerformancePhilanthropicInitiatives.init(Highcharts,$(this));
                                break;

                                case "highcharts-esg-hc-roi":
                                    let _highchartsEsgHcRoi;
                                    _highchartsEsgHcRoi = new highchartsEsgHcRoi();
                                    _highchartsEsgHcRoi.init(Highcharts,$(this));
                                break;

                                case "accordion":
                                    let _accordion;
                                    _accordion = new accordion();
                                    _accordion.init($(this));
                                break;

                                case "gallery":
                                    let _gallery;
                                    _gallery = new gallery();
                                    _gallery.init($(this));
                                break;

                                case "highcharts-esg-green-investment":
                                    let _highchartsEsgGreenInvestment;
                                    _highchartsEsgGreenInvestment = new highchartsEsgGreenInvestment();
                                    _highchartsEsgGreenInvestment.init(Highcharts,$(this));
                                break;

                                case "highcharts-esg-social-investment":
                                    let _highchartsEsgSocialInvestment;
                                    _highchartsEsgSocialInvestment = new highchartsEsgSocialInvestment();
                                    _highchartsEsgSocialInvestment.init(Highcharts,$(this));
                                break;

                                case "kgisStatic025":
                                    let _kgisStatic025;
                                    _kgisStatic025 = new kgisStatic025();
                                    _kgisStatic025.init(Highcharts,$(this));

                                    // $('[data-comp-name="'+comp_name+'"]').each(function(){
                                    //     _kgisStatic025 = new kgisStatic025();
                                    //     _kgisStatic025.init(Highcharts,$(this));
                                    // })
                                break;
                                case "download-group":
                                    let _downloadGroup;
                                    _downloadGroup = new downloadGroup();
                                    _downloadGroup.init($(this));
                                break;
                                case "tabs":
                                    let _tabs;
                                    _tabs = new tabs();
                                    _tabs.init($(this));
                                break;

                                //do nothing group
                                case "info-cube":
                                case "dropdown":
                                case "pagination":
                                case "social":

                                break;

                                default:
                                  //  alert("missing "+comp_name)
                                break;
                            }
                        })
                        $(".tmp_data_loader").remove();
                    })
                    
                });
            }
            else{

            }
            $(window).trigger('resize');
        });
        
        if (typeof pageReady !== "undefined") { 
            if(has_highcharts){
                pageReady(Highcharts);
            }else{
                pageReady();
            }
            
        }


 
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
        addComponentCss();
        action_ary = action_ary.filter(onlyUnique);
        
        ////console.log("action_ary:",action_ary);


        if($('.subscribe_mz_iframe').length>0){
            var subscribe_elm = $('.subscribe_mz_iframe');
            $(window).on('resize.subscribe_mz_iframe',function(){
                var window_w = $(window).width();
                if(window_w>0 && window_w < 768){
                    subscribe_elm.height(900);
                }else if(window_w>=768 && window_w < 1024){
                    subscribe_elm.height(755);
                }else if(window_w>=1024){
                    subscribe_elm.height(576);
                }
            }).trigger('resize.subscribe_mz_iframe');
        }

        for(let i in action_ary){
            let comp_name = action_ary[i];

            switch(comp_name){
                case "cookie":
                    let _cookie;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _cookie = new cookie();
                        _cookie.init($(this));
                    })
                break;

                case "iframe":
                    let _iframe;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _iframe = new iframe();
                        _iframe.init($(this));
                    })
                break;

                case "cdibFundsDetail":
                    let _cdibFundsDetail;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _cdibFundsDetail = new cdibFundsDetail();
                        _cdibFundsDetail.init($(this));
                    })
                break;
                case "kgibStatic001":
                    let _kgibStatic001;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _kgibStatic001 = new kgibStatic001();
                        _kgibStatic001.init($(this));
                    })
                break;

                case "kgibStatic003":
                    
                    if(resources.indexOf('swiper')!=-1){
                        Swiper= normalArray[resources.indexOf('swiper')];
                    }
                    let _kgibStatic003;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _kgibStatic003 = new kgibStatic003();
                        _kgibStatic003.init($(this),Swiper);
                    })
                break;
                

                case "kgibStatic004":
                    let _kgibStatic004;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _kgibStatic004 = new kgibStatic004();
                        _kgibStatic004.init($(this));
                    })
                break;

                case "kgibStatic005":
                    let _kgibStatic005;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _kgibStatic005 = new kgibStatic005();
                        _kgibStatic005.init($(this));
                    })
                break;

                case "kgibStatic006":
                    let _kgibStatic006;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _kgibStatic006 = new kgibStatic006();
                        _kgibStatic006.init($(this));
                    })
                break;

                case "kgibStatic010":
                    let _kgibStatic010;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _kgibStatic010 = new kgibStatic010();
                        _kgibStatic010.init($(this));
                    })
                break;

                case "kgibStatic011":
                    let _kgibStatic011;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _kgibStatic011 = new kgibStatic011();
                        _kgibStatic011.init($(this));
                    })
                break;

                case "kgibCus006":
                    let _kgibCus006;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _kgibCus006 = new kgibCus006();
                        _kgibCus006.init($(this));
                    })
                break;

                case "kgibOther001":
                    let _kgibOther001;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _kgibOther001 = new kgibOther001();
                        _kgibOther001.init($(this));
                    })
                break;


                case "kgibOtherCus004":
                    let _kgibOtherCus004;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _kgibOtherCus004 = new kgibOtherCus004();
                        _kgibOtherCus004.init($(this));
                    })
                break;

                case "kgibOther006":
                    let _kgibOther006;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _kgibOther006 = new kgibOther006();
                        _kgibOther006.init($(this));
                    })
                break;

                case "kgibOtherCus006":
                    let _kgibOtherCus006;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _kgibOtherCus006 = new kgibOtherCus006();
                        _kgibOtherCus006.init($(this));
                    })
                break;
 
                case "kgibOtherCus013":
                    let _kgibOtherCus013;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _kgibOtherCus013 = new kgibOtherCus013();
                        _kgibOtherCus013.init($(this));
                    })
                break;

                // case "kgibCus001":
                //     let _kgibCus001;
                //     $('[data-comp-name="'+comp_name+'"]').each(function(){
                //         _kgibCus001 = new kgibCus001();
                //         _kgibCus001.init($(this));
                //     })
                // break;

                // case "kgibCus009":
                //     let _kgibCus009;
                //     $('[data-comp-name="'+comp_name+'"]').each(function(){
                //         _kgibCus009 = new kgibCus009();
                //         _kgibCus009.init($(this));
                //     })
                // break;
                
                case "kgibOther005":
                    let _kgibOther005;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _kgibOther005 = new kgibOther005();
                        _kgibOther005.init($(this));
                    })
                break;

                case "kgisOther011":
                    let _kgisOther011;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _kgisOther011 = new kgisOther011();
                        _kgisOther011.init($(this));
                    })
                break;


                case "kgisStatic001":
                    let _kgisStatic001;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _kgisStatic001 = new kgisStatic001();
                        _kgisStatic001.init($(this));
                    })
                break;

                case "kgisStatic002":
                    let _kgisStatic002;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _kgisStatic002 = new kgisStatic002();
                        _kgisStatic002.init($(this));
                    })
                break;
                
                case "kgisStatic009":
                    let _kgisStatic009;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _kgisStatic009 = new kgisStatic009();
                        _kgisStatic009.init($(this));
                    })
                break;
                
                
                case "kgisStatic014":
                    let _kgisStatic014;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _kgisStatic014 = new kgisStatic014();
                        _kgisStatic014.init($(this));
                    })
                break;


                case "kgisStatic024":
                    let _kgisStatic024;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _kgisStatic024 = new kgisStatic024();
                        _kgisStatic024.init($(this));
                    })
                break;
                
                
                case "kgisStatic025":
                    let _kgisStatic025;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _kgisStatic025 = new kgisStatic025();
                        _kgisStatic025.init(Highcharts,$(this));
                    })
                break;
                case "kgisStatic027":
                    let _kgisStatic027;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _kgisStatic027 = new kgisStatic027();
                        _kgisStatic027.init($(this));
                    })
                break;

                case "kgisStatic031":
                    let _kgisStatic031;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _kgisStatic031 = new kgisStatic031();
                        _kgisStatic031.init($(this));
                    })
                break;
                
                case "kgisStatic033":
                    let _kgisStatic033;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _kgisStatic033 = new kgisStatic033();
                        _kgisStatic033.init($(this));
                    })
                break;

                case "kgisStatic034":
                    let _kgisStatic034;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _kgisStatic034 = new kgisStatic034();
                        _kgisStatic034.init($(this));
                    })
                break;

                case "kgisCus012":
                    let _kgisCus012;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _kgisCus012 = new kgisCus012();
                        _kgisCus012.init($(this));
                    })
                break;

                case "scrollerTable":
                    let _scrollerTable;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _scrollerTable = new scrollerTable();
                        _scrollerTable.init($(this));
                    })
                break;

                case "kgisCus017":
                    let _kgisCus017;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _kgisCus017 = new kgisCus017();
                        _kgisCus017.init($(this));
                    })
                break;

                case "kgisCus018":
                    // let _kgisCus018;
                    // $('[data-comp-name="'+comp_name+'"]').each(function(){
                    //     _kgisCus018 = new kgisCus018();
                    //     _kgisCus018.init($(this));
                    // })
                break;

                case "kgisCus021":
                    let _kgisCus021;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _kgisCus021 = new kgisCus021();
                        _kgisCus021.init($(this));
                    })
                break;
                
                // case "kgisCus004":
                //     let _kgisCus004;
                //     $('[data-comp-name="'+comp_name+'"]').each(function(){
                //         _kgisCus004 = new kgisCus004();
                //         _kgisCus004.init($(this));
                //     })
                // break;
                
                case "kgisCus022":
                    let _kgisCus022;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _kgisCus022 = new kgisCus022();
                        _kgisCus022.init($(this));
                    })
                break;
                case "kgisCus029":
                    let _kgisCus029;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _kgisCus029 = new kgisCus029();
                        _kgisCus029.init($(this));
                    })
                break;
                

                case "campaign-registration-listing":
                    let _campaignRegistrationListing;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _campaignRegistrationListing = new campaignRegistrationListing();
                        _campaignRegistrationListing.init($(this));
                    })
                break;

                case "campaign-listing":
                    let _campaignListing;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _campaignListing = new campaignListing();
                        _campaignListing.init($(this));
                    })
                break;

                case "kv":
                    let _kv;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _kv = new kv();
                        _kv.init($(this));
                    })
                break;

                
                case "table":
                    let _table;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _table = new table();
                        _table.init($(this));
                    })
                        // _table = new table();
                        // _table.init($('[data-comp-name="'+comp_name+'"]').eq(0));
                    
                break;
                case "stock-group":
                    let _stockGroup;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _stockGroup = new stockGroup();
                        _stockGroup.init($(this));
                    })
                break;

                // case "kgis-login":
                //     let _kgisLogin;
                
                //     $('[data-comp-name="'+comp_name+'"]').each(function(){
                //         _kgisLogin = new kgisLogin();
                //         _kgisLogin.init($(this));
                //     })
                // break;
                case "moneydj":
                    let _moneydj;
                
                    $('[data-comp-name="moneydj"]').each(function(){
                        _moneydj = new moneydj();
                        _moneydj.init($(this));
                    })
                break;

                case "googlemap":
                    let _googlemap;
                
                    $('[data-comp-name="googlemap"]').each(function(){
                        _googlemap = new googlemap();
                        _googlemap.init($(this));
                    })
                break;

                case "kgibCus025":
                    let _kgibCus025;
                    $('[data-comp-name="kgibCus025"]').each(function(){
                        _kgibCus025 = new kgibCus025();
                        _kgibCus025.init($(this));
                    })
                break;
                
                case "kgisTimeline":
                    let _kgisTimeline;
                    if(resources.indexOf('swiper')!=-1){
                        Swiper= normalArray[resources.indexOf('swiper')];
                    }
                
                    $('[data-comp-name="kgisTimeline"]').each(function(){
                        _kgisTimeline = new kgisTimeline();
                        _kgisTimeline.init($(this),Swiper);
                    })
                break;

                case "timeline":
                    let _timeline;
                    if(resources.indexOf('swiper')!=-1){
                        Swiper= normalArray[resources.indexOf('swiper')];
                    }
                
                    $('[data-comp-name="timeline"]').each(function(){
                        _timeline = new timeline();
                        _timeline.init($(this),Swiper);
                    })
                break;

                case "header":
                    let _header;
                    $('[data-comp-name="header"]').each(function(){
                        _header = new header();
                        _header.init($(this));
                    })
                break;

                case"esg-issues":
                    let _esgIssues;
                    ////console.log($('[data-comp-name="esg-issues"]').length);
                    $('[data-comp-name="esg-issues"]').each(function(){
                        _esgIssues = new esgIssues();
                        _esgIssues.init($(this));
                    })
                break;
                case "subnav":
                    let _subnav = new subnav();
                    _subnav.init($('[data-comp-name="subnav"]'));
                break;

                case "kgisSearch":
                    let _kgisSearch = new kgisSearch();
                    _kgisSearch.init($('[data-comp-name="kgisSearch"]'));
                break;

                case "search":
                    let _search = new search();
                    _search.init($('[data-comp-name="search"]'));
                break;
                case "highstock":
                    $.getJSON('json/stock.json', function (data) {

                        // split the data set into ohlc and volume
                        var ohlc = [],
                            volume = [],
                            dataLength = data.length,
                            i = 0;

                        for (i; i < dataLength; i += 1) {
                            ohlc.push([
                                data[i][0], // the date
                                data[i][1], // open
                                data[i][2], // high
                                data[i][3], // low
                                data[i][4] // close
                            ]);

                            volume.push([
                                data[i][0], // the date
                                data[i][5] // the volume
                            ]);
                        }

                        var chart_h;
                        var window_w = $(window).width();
                        if(window_w<768){
                            chart_h = 350;
                        }
                        else if(window_w>=768 && window_w<1024){
                            chart_h = 500;
                        }
                        else if(window_w>=1024){
                            chart_h = 875;
                        }
                     
                    
                        Highcharts.stockChart($('.highcharts-stock-holder').get(0), {
                            
                            chart: {
                                backgroundColor: 'transparent',
                                height: chart_h
                            },
                            yAxis: [{
                                labels: {
                                    align: 'left'
                                },
                                height: '80%',
                                resize: {
                                    enabled: true
                                }
                            }, {
                                labels: {
                                    align: 'left'
                                },
                                top: '80%',
                                height: '20%',
                                offset: 0
                            }],
                            series: [{
                                type: 'ohlc',
                                id: '2883-ohlc',
                                name: 'China Development Financial Holding Corp Stock Price',
                                data: ohlc
                            }, {
                                type: 'column',
                                id: '2883-volume',
                                name: 'China Development Financial Holding Corp Volume',
                                data: volume,
                                yAxis: 1
                            }],
                            responsive: {
                                rules: [{
                                    condition: {
                                        maxWidth: 1174
                                    },
                                    chartOptions: {
                                        rangeSelector: {
                                            inputEnabled: false
                                        }
                                    }
                                }]
                            }
                        });
                    });

                break;

                

                case "highcharts-cdib-portfolio-companies":
                    let _highchartsCdibPortfolioCompanies;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _highchartsCdibPortfolioCompanies = new highchartsCdibPortfolioCompanies();
                        _highchartsCdibPortfolioCompanies.init(Highcharts,$(this));
                    }) 
                break;

                case "highcharts-esg-integration":
                    let _highchartsEsgIntegration;
                    $($('[data-comp-name="highcharts-esg-integration"]')).each(function(){
                        _highchartsEsgIntegration = new highchartsEsgIntegration();
                        _highchartsEsgIntegration.init(Highcharts,$(this));
                    })
                break;

                case "highcharts-sdgs-balance-weight":
                    //console.log('highcharts-sdgs-balance-weight');
                    let _highchartsSdgsBalanceWeight;
                    $('[role="highcharts-container"]',$('[data-comp-name="highcharts-sdgs-balance-weight"]')).each(function(){
                        _highchartsSdgsBalanceWeight = new highchartsSdgsBalanceWeight();
                        _highchartsSdgsBalanceWeight.init(Highcharts,$(this));
                    }) 
                break;

                case "highcharts-sdgs-total-portfolios":
                    //console.log('highcharts-sdgs-total-portfolios');
                    let _highchartsSdgsTotalPortfolios;
                    $('[role="highcharts-container"]').each(function(){
                        _highchartsSdgsTotalPortfolios = new highchartsSdgsTotalPortfolios();
                        _highchartsSdgsTotalPortfolios.init(Highcharts,$(this));
                    }) 
                break;

                case "highcharts-esg-green-investment":
                    let _highchartsEsgGreenInvestment;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _highchartsEsgGreenInvestment = new highchartsEsgGreenInvestment();
                        _highchartsEsgGreenInvestment.init(Highcharts,$(this));
                    }) 
                break;


                case "highcharts-cdib-our-strategy":
                    let _highchartsCdibOurStrategy;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _highchartsCdibOurStrategy = new highchartsCdibOurStrategy();
                        _highchartsCdibOurStrategy.init(Highcharts,$(this));
                    }) 
                break;


                case "highcharts-esg-social-investment":
                    let _highchartsEsgSocialInvestment;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _highchartsEsgSocialInvestment = new highchartsEsgSocialInvestment();
                        _highchartsEsgSocialInvestment.init(Highcharts,$(this));
                    }) 
                break;

                case "kgisCus032":
                    let _kgisCus032;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _kgisCus032 = new kgisCus032();
                        _kgisCus032.init($(this));
                    })
                break; 
                case "highcharts-esg-performance-philanthropic-initiatives":
                    let _highchartsEsgPerformancePhilanthropicInitiatives;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _highchartsEsgPerformancePhilanthropicInitiatives = new highchartsEsgPerformancePhilanthropicInitiatives();
                        _highchartsEsgPerformancePhilanthropicInitiatives.init(Highcharts,$(this));
                    }) 
                break; 

                case "highcharts-esg-hc-roi":
                    let _highchartsEsgHcRoi;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _highchartsEsgHcRoi = new highchartsEsgHcRoi();
                        _highchartsEsgHcRoi.init(Highcharts,$(this));
                    }) 
                break;

                case "popup":
                    let _popup;
                    $('[data-comp-name="popup"]').each(function(){
                        _popup = new popup();
                        _popup.init($(this));
                    })
                break;

                case "contact-form":
                    let _contactForm;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _contactForm = new contactForm();
                        _contactForm.init($(this));
                    })
                break;

                case "stock-agents-form":
                    let _stockAgentsForm;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _stockAgentsForm = new stockAgentsForm();
                        _stockAgentsForm.init($(this));
                    })
                break;
                case "subscribe":
                    $('[data-comp-name="subscribe"]').each(function(){
                        let _subscribe = new subscribe();
                        _subscribe.init($(this),$(this).attr("data-mode"));
                    })
                    
                break;
                case "tabs":
                    let _tabs;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _tabs = new tabs();
                        _tabs.init($(this));
                    })
                    // _tabs.init($('[data-comp-name="tabs"]'));
                break;

                case "sdgs-portfolio-tabs":
                    let _sdgsPortfolioTabs = new sdgsPortfolioTabs();
                    _sdgsPortfolioTabs.init($('[data-comp-name="sdgs-portfolio-tabs"]'));
                break;

                case "press":
                    let _press;
                    $('[data-comp-name="press"]').each(function(){
                        _press = new press();
                        _press.init($(this));
                    })
                break;

                case "media":
                    let _media;
                    $('[data-comp-name="media"]').each(function(){
                        _media = new media();
                        _media.init($(this));
                    })

                break;


                case "news":
                    let _news = new news();
                    _news.init($('[data-comp-name="news"]'));
                break;

                case "collapse-table":
                    var s = $('[data-comp-name="collapse-table"]');

                    
                    s.each(function(){
                        var scope = $(this);
                        var name = "";
                        var start_page = 2;
                        var current_page = start_page;
                        var current_category;
                        var total_page = 0;
                        var break_point = 1024;
                        var window_w;
                        var data_scope;
                        var category_ary = [];
                        var mode = "";
                        //
                        var update = function(){
                            if(window_w>=break_point){
                                if(current_category==undefined){
                                    current_category = category_ary[(start_page-1)];
                                    current_page = start_page;
                                }
                            }else{
                                
                                if(current_category==undefined){
                                    $('[data-category]',scope).hide();
                                    current_category = $(".dropdown-item", scope).innerHTML;
                                }
                            }
                            
                            if(total_page == 1){
                                $('[role="content__toggler-less"]',scope).hide();
                                $('[role="content__toggler-more"]',scope).hide();
                            }else{
                                $('[role="content__toggler-less"]',scope).show();
                                $('[role="content__toggler-more"]',scope).show();
                            }

                            $('[role="content__toggler-less"]',scope).addClass("disabled");
                            $('[role="content__toggler-more"]',scope).addClass("disabled");
    
                            if(current_page<=total_page){
                                $('[role="content__toggler-more"]',scope).removeClass("disabled");
                            }
                            if(current_page > start_page){
                                $('[role="content__toggler-less"]',scope).removeClass("disabled");
                            }
                            // //console.log('current_page',current_page);
                            // //console.log('total_page',total_page);
                            // //console.log('start_page',scopetart_page);

                            // //console.log('window_w',window_w);
                            // //console.log('break_point',break_point);
                            //
                            switch(mode){
                                case "lg":
                                    for(var i=0;i<current_page;i++){
                                        //console.log('show',i,category_ary[i],current_page);
                                        $('[data-category="'+category_ary[i]+'"]',scope).show();
                                    }
                                    for(var i=current_page;i<=total_page;i++){
                                        //console.log('hide',i,category_ary[i],current_page);
                                        $('[data-category="'+category_ary[i]+'"]',scope).hide();
                                    }
                                break;

                                case "s":
                                    // //console.log('current_category',current_category);
                                    // //console.log('current_page',current_page);
                                    for(var i =0;i<category_ary.length;i++){
                                        if(category_ary[i] != current_category){
                                            $('[data-category="'+category_ary[i]+'"]',scope).hide();
                                        }
                                    }
                                    $('[data-category="'+current_category+'"]:lt('+(current_page)+')',scope).slideDown();
                                    $('[data-category="'+current_category+'"]:gt('+(current_page-1)+')',scope).slideUp();
                                break;
                            }
                        }
                        var updateCategory = function(){
                            $('[data-category]',scope).each(function(){
                                if($(this).attr("data-category") == current_category){
                                    $(this).show();
                                    current_page = start_page;
                                    data_scope = $(this);
                                }else{
                                    $(this).hide();
                                }
                            })
                            $('[data-category]',scope).hide();
                            total_page = $('[data-category="'+current_category+'"]',scope).length-1;
                            // //console.log('updateCategory',start_page,current_page,total_page);
                            update();
                        }
                        $('[role^="content-group"]',scope).each(function(){
                            if(name != $(this).attr("role")){
                                name = $(this).attr("role");
                                total_page++;
                            }
                        })
                        $('[role="content__toggler-more"]',scope).off().on("click",function(){
                            current_page++;
                            update();
                        })

                        $('[role="content__toggler-less"]',scope).off().on("click",function(){
                            current_page--;
                            update();
                        })

                        $('.dropdown',scope).each(function(){
                            var o = $(this);
                            $(".dropdown-item",o).off("").on("click",function(){
                                var val = $(this)[0].innerHTML;
                                if (typeof ($(".dropdownToggle span", o)[0]) !== "undefined") {
                                    $(".dropdownToggle span", o)[0].innerHTML = val;                               
                                }
                                current_category = val;
                                updateCategory();
                            })
                        })
                        $(".dropdown-item",scope).each(function(){
                            category_ary.push($(this).html());
                        })

                        $(window).off("resize.content__toggler").on("resize.content__toggler",function(){
                            window_w = $(window).width();

                            if(window_w>=break_point){
                                if(mode != "lg"){
                                    mode = "lg";
                                    start_page = 2;
                                    current_page = start_page;
                                    total_page = category_ary.length-1;
                                    //console.log('current_page',current_page);
                                    //console.log('total_page',total_page);
                                    //console.log('category_ary',category_ary);
                                }
                            }
                            else{
                                if(mode != "s"){
                                    mode = "s";
                                    start_page = 2;
                                    current_page = start_page;
                                    if(current_category==undefined){
                                        current_category = $(".dropdown-item", scope).innerHTML;
                                    }
                                    total_page = $('[data-category="'+current_category+'"]',scope).length-1;
                                }
                            }
                            update();
                        }).trigger("resize");
                    })
                break;

                case "scrollbar":
                    let _scrollbar;
                    
                    $('[data-comp-name="scrollbar"]').each(function(){
                        _scrollbar = new scrollbar();
                        _scrollbar.init($(this));
                    })
                break;

                
                case "data-collapse":
                    let _dataCollapse;
                    $('[data-comp-name="data-collapse"]').each(function(){
                        _dataCollapse = new dataCollapse();
                        _dataCollapse.init($(this));
                    })
                    
                break;

                case "quarterly-results":
                    
                    let _quarterlyResults;
                    $('[data-comp-name="quarterly-results"]').each(function(){
                        _quarterlyResults = new quarterlyResults();
                        _quarterlyResults.init($(this));
                    })
                    
                break;

                case "flex-table":
                    var s = $('[data-comp-name="flex-table"]');
                    var idx = 0;
                    s.each(function(){
                        $(this).attr('data-id',idx);
                        idx++;
                        var scope = $(this);
                        var name = "";
                        var limit = 1;
                        var lg_limit = 9999999;
                        var current_limit;
                        //
                    
                        if(scope.attr("data-name")!=undefined){
                            name = scope.attr("data-name");
                        }else{
                            name = "flex-table-"+randomID();
                        }
                    
                        if(scope.attr("data-lg-limit")!=undefined){
                            lg_limit = parseInt(scope.attr("data-lg-limit"));
                        }
                        if(scope.attr("data-limit")!=undefined){
                            limit = parseInt(scope.attr("data-limit"));
                        }
                        //
                        var current_page;
                        var current_category;
                        var total_page = 0;
                        var break_point = 768;
                        var window_w;
                        var data_scope;
                        var category_ary = [];
                        var mode = "";
                        //
                        var update = function(){
                            // //console.log('----------'+name+' update-----------',);
                            if(total_page == 1){
                                // //console.log('hide');
                                $('[role="content__toggler-less"]',scope).hide();
                                $('[role="content__toggler-more"]',scope).hide();
                                $('[role="content__toggler"]',scope).hide();
                                
                            }else{
                                $('[role="content__toggler-less"]',scope).show();
                                $('[role="content__toggler-more"]',scope).show();
                                $('[role="content__toggler"]',scope).show();
                            }

                            $('[role="content__toggler-less"]',scope).addClass("disabled");
                            $('[role="content__toggler-more"]',scope).addClass("disabled");

                            if(current_page<total_page){
                                $('[role="content__toggler-more"]',scope).removeClass("disabled");
                            }
                            if(current_page > 1){
                                $('[role="content__toggler-less"]',scope).removeClass("disabled");
                            }
                            // //console.log('current_page',current_page);
                            // //console.log('total_page',total_page);
                            // //console.log('mode',mode);
                            switch(mode){
                                case "lg":
                                    // //console.log(current_page*current_limit);
                                    // $('[data-page]:lt('+(current_page+1)+')',scope).show();
                                    // $('[data-page]:gt('+(current_page)+')',scope).hide();
                                    
                                    for(var i=1;i<=current_page;i++){
                                        $('[data-page="'+i+'"]',scope).show();
                                    }
                                    for(var i=current_page+1;i<=total_page;i++){
                                        $('[data-page="'+i+'"]',scope).hide();
                                    }
                                    
                                break;

                                case "s":
                                    for(var i=1;i<=current_page;i++){
                                        $('[data-page="'+i+'"]',scope).slideDown();
                                    }
                                    for(var i=current_page+1;i<=total_page;i++){
                                        $('[data-page="'+i+'"]',scope).slideUp();
                                    }
                                break;
                            }
                        }
                     
                        if($('[role="content__toggler-more"]',scope).length==0){
                          //  alert("there is no toggler exist");
                        }
                        $('[role="content__toggler-more"]',scope).off().on("click",function(){
                            current_page++;
                            update();
                        })

                        $('[role="content__toggler-less"]',scope).off().on("click",function(){
                            current_page--;
                            update();
                        })

                        // $('tr',scope).off().on("click",function(){
                        //     $(this)
                        //     .children('td')
                        //     .children()
                        //     // .animate({ height: 0 })
                        //     .slideUp(function() { $(this).closest("tr").hide(); });
                        // })

                        //先將資料照category分組，因為在手機/桌機時 資料的分類方式有異
                        category_ary = [];
                        $('[data-category]',scope).each(function(){
                            category_ary.push($(this).attr("data-category"));
                        })
                        
                        category_ary = category_ary.filter(onlyUnique);
                        // //console.log(name,category_ary);
                        $(window).off("resize.content__toggler"+idx).on("resize.content__toggler"+idx,function(){
                            window_w = $(window).width();

                            if(window_w>=break_point){
                                if(mode != "lg"){
                                    mode = "lg";
                                    var page = 0;
                                    current_limit = lg_limit;
                                    //將類別搭配limit數字去設定頁面
                                    for(var i=0;i<category_ary.length;i++){
                                        if(i % current_limit == 0){
                                            page+=1;
                                        }
                                        // //console.log(name,'page',page);
                                        $('[data-category="'+category_ary[i]+'"]',scope).attr("data-page",page);
                                        
                                    }
                                    // //console.log(name,page);
                                    current_page = 1;
                                    total_page = page;
                                }
                            }
                            else{
                                if(mode != "s"){
                                    mode = "s";
                                    var page = 0;
                                    current_limit = limit;
                                    for(var i=0;i<category_ary.length;i++){
                                        if(i % current_limit == 0){
                                            page+=1;
                                        }
                                        $('[data-category="'+category_ary[i]+'"]',scope).attr("data-page",page);
                                        
                                    }
                                    current_page = 1;
                                    total_page = page;
                                }
                            }
                            update();
                        });
                        
                    })

                    $(window).trigger("resize");
                break;

                case "cube":
                    var s = $('[data-comp-name="cube"]');
                    $('[role="cube__toggler"]',s).off().on("click",function(){
                        let target = $(this); 
                        if(target.hasClass("active")){
                            $("div",target).html("see more");
                            target.attr("aria-expanded","");
                            $(".cube__box").slice(2).not(".cube__box-more").slideUp(function(){
                                // finish();
                            });
                        }else{
                            $("div",target).html("see less");
                            target.attr("aria-expanded","true");
                            $(".cube__box").not(".cube__box-more").slideDown(function(){
                                
                            });
                        }
                        target.toggleClass("active");
                    })

                    $(".cube__box").slice(2).not(".cube__box-more").hide();
                break;
                case "info-cube":
                    // let _infoCube = new infoCube();
                    // _infoCube.init($('[data-comp-name="info-cube"]'));
                    let _infoCube;
                    $('[data-comp-name="info-cube"]').each(function(){
                        _infoCube = new infoCube();
                        _infoCube.init($(this));
                    });
                break
                
                case "esg-epl":
                break;

                case "dropdown":
                    $('.dropdownToggle').dropdown();
                    $('.dropdown').each(function(){
                        var o = $(this);
                        $(".dropdown-item",o).on("click.dropdown-item",function(){
                            var val = $(this)[0].innerHTML;
                            if (typeof ($(".dropdownToggle span", o)[0]) !== 'undefined') {
                                $(".dropdownToggle span", o)[0].innerHTML = val;
                            }
                        })
                    })

                    /*
                    $('.dropdown').each(function(){
                        let elm = $(this);
                        if($('.scrollbar-inner',elm).length>0){
                            if (window.is_mac_firefox) {

                            } else {
                                $('.scrollbar-inner', elm).scrollbar();
                            }
                        }
                        $('.dropdownToggle', elm).dropdown();
                        $(".dropdown-item",elm).on("click.dropdown-item",function(){
                            var val = $(this).html();
                            $(".dropdownToggle span",elm).html(val);
                        })
                    })
                    */
                break;

                case "interactive-table":
                    // $('.dropdownToggle').dropdown();
                break;

                
                case "principal-investments":
                    let _principalInvestments;
                    $('[data-comp-name="principal-investments"]').each(function(){
                        _principalInvestments = new principalInvestments();
                        _principalInvestments.init($(this));
                    });
                break;
                
                case "accordion":
                    let _accordion;
                    $('[data-comp-name="accordion"]').each(function(){
                        _accordion = new accordion();
                        _accordion.init($(this));
                    });
                break;

                case "download-group":
                    let _downloadGroup;
                    $('[data-comp-name="download-group"]').each(function(){
                        _downloadGroup = new downloadGroup();
                        _downloadGroup.init($(this));
                    })
                break;

                case "kgis-overseas":
                    let _kgisOverseas;
                    $('[data-comp-name="kgis-overseas"]').each(function(){
                        _kgisOverseas = new kgisOverseas();
                        _kgisOverseas.init($(this));
                    })
                break;
                case "investment-charging-station":
                    let _investmentChargingStation;
                    $('[data-comp-name="investment-charging-station"]').each(function(){
                        _investmentChargingStation = new investmentChargingStation();
                        _investmentChargingStation.init($(this));
                    })
                break;

                case "card-list":
                    let _cardList;
                    $('[data-comp-name="card-list"]').each(function(){
                        _cardList = new cardList();
                        _cardList.init($(this));
                    })
                break;
                case "gallery":
                    
                    let _gallery;
                    $('[data-comp-name="gallery"]').each(function(){
                        _gallery = new gallery();
                        _gallery.init($(this));
                    })
                break;
                
                case "esg-reports":
                    scope = $(".esg-reports");
                    scope.each(function(){
                        let o = $(this);

                        let total = $(".esg-reports__list",o).length;
                        $('[role="esg-reports-amount"]',o).html(total);
                        if(total>4){
                            $(".esg-reports__body",o).slick({
                                infinite: false,
                                slidesToShow: 4,
                                slidesToScroll: 4,
                                prevArrow: $(".esg-reports__pager--prev",o),
                                nextArrow: $(".esg-reports__pager--next",o),
                                mobileFirst:true,
                                responsive: [
                                    {
                                        breakpoint: 1000,
                                        settings: {
                                            slidesToShow: 4,
                                            slidesToScroll: 4
                                        }
    
                                    },
                                    {
                                        breakpoint: 767,
                                        settings: {
                                            slidesToShow: 4,
                                            slidesToScroll: 4
                                        }
    
                                    },
                                    {
                                        breakpoint: 1,
                                        settings: "unslick"
                                    }
                                ]
                            });
                        }else{
                            $(".esg-reports__pager",o).remove();
                        }
                    })
                break;

                /*20200408*/
                case "kgishk017":
                    let _kgishk017;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _kgishk017 = new kgishk017();
                        _kgishk017.init($(this));
                    })
                break;

                case "kgishkCus007Chart":
                    let _kgishkCus007Chart;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _kgishkCus007Chart = new kgishkCus007Chart();
                        _kgishkCus007Chart.init(Highcharts,$(this));
                    }) 
                break;
                
                case "kgishkCus008Chart":
                    let _kgishkCus008Chart;
                    $('[data-comp-name="'+comp_name+'"]').each(function(){
                        _kgishkCus008Chart = new kgishkCus008Chart();
                        _kgishkCus008Chart.init(Highcharts,$(this));
                    }) 
                break;

                case "kgishkSearch":
                    let _kgishkSearch = new kgishkSearch();
                    _kgishkSearch.init($('[data-comp-name="kgishkSearch"]'));
                break;
                

                case "kgishk027":
                    let _kgishk027;
                    $('[data-comp-name="kgishk027"]').each(function(){
                        _kgishk027 = new kgishk027();
                        _kgishk027.init($(this));
                    })
                break;
            }
        }
        

        if($('.download-group__file').length>0){
            $('.download-group__file').each(function(){
                var elm = $('.h3',$(this));
                // var text = $.trim(elm.text());
                var text = elm.text().replace(/(^\s*)|(\s*$)/g, "");
                elm.attr('data-text',text);
            })
    
            $(window).on('resize.download-group__file',function(){
                var window_w = $(window).width();
                if(window_w>=1024){
                   
                    $('.download-group__file').each(function(){
                        var elm = $('.h3',$(this));
                        if(elm==undefined){
                            elm = $('.h4',$(this));
                        }

                        if(elm!=undefined){
                            var text = elm.attr('data-text');
                            if(text==undefined){
                                text = elm.text();
                                elm.attr('data-text',text);
                            }
                            var length = text.length;
                            var max = 46;
                            if(length>=max){
                                elm.text(text.substr(0,max)+'...');
                            }
                        }
                    }) 
                }else{
                   
                    $('.download-group__file').each(function(){
                        var elm = $('.h3',$(this));
                        if(elm==undefined){
                            elm = $('.h4',$(this));
                        }
                        if(elm!=undefined){
                            var text = elm.attr('data-text');
                            if(text==undefined){
                                text = elm.text();
                                elm.attr('data-text',text);
                            }
                            elm.text(text);
                        }
                    }) 
                }
            }).trigger('resize.download-group__file');
        }

        setTimeout(function(){
         replaceWord();
        },10)
       //
    });
});