var main_script = document.getElementById('main-script')
var site = main_script.getAttribute("data-site");
var mode = main_script.getAttribute("data-mode");
var resource_path = main_script.getAttribute("data-resource-path");
//前端開發時使用，避免暫存，上線後移除
// var version = (new Date()).getTime();

if(window.version==undefined){
  window.version = '';
}
window.css_version = window.version

var app_url;
var comp_url; 
// switch(site){
//   case 'cdf':
//   case 'cdib':
//   case 'kgis':
//   case 'kgib':
//     window.site_url = "/"+site+"/";
//     app_url = window.site_url+"js/app";
//     comp_url = window.site_url+"js/comp";
//   break;

//   case 'ir':
//     window.site_url = "";
//     app_url = "../app";
//     comp_url = "../comp";
//   break;

//   default:
//     window.site_url = "";
//     app_url = "../app";
//     comp_url = "../comp";
//   break;

// }

// window.site_url = "";//resource_path;
// app_url = window.site_url+"js/app";
// comp_url = window.site_url+"js/comp";
// app_url = "../app";
// comp_url = "../comp";


window.site_url = resource_path;

if(resource_path == ''){
  // console.log('relative');
  app_url = '../'+window.site_url+"app";
  comp_url = '../'+window.site_url+"comp";
}else{
  // console.log('abs');
  app_url = window.site_url+"js/app";
  comp_url = window.site_url+"js/comp";
}



//setup color
window.color_ary = [];
switch(site){
  case 'kgis':
    var color_primary = ['#04327A','#A2C0EF','#68C89E','#FF623E','#DF4623','#FEF8F1','#7D7D7D','#B7B7B7'] ;
    window.color_ary = color_primary;
  break;

  default:
    var color_primary = ['#FEF8F1','#04327A','#A2C0EF','#68C89E','#FF623E','#DF4623','#7D7D7D','#B7B7B7'] ;
    var color_secondary = ['#FEF8F1','#041C43','#A2C0EF','#FF623E','#FFFFFF','#F0F4F7','#68C89E'];
    var color_grey = ['#7D7D7D','#B7B7B7','#E2E2E2','#F6F6F6','#000000'];
    window.color_ary = color_primary.concat(color_secondary).concat(color_grey)
  break;
}


switch(mode){
  case "1":
    //將css、js 指到 https://cdf.doinsane.co/ 方便測試，開發用
    window.site_url = 'https://cdf.doinsane.co/'+site+'/';
    app_url = window.site_url+"js/app";
    comp_url = window.site_url+"js/comp";
  break;
}

window.css_url = window.site_url + 'css/component/';


var jQuery = window.jQuery,
    oldjQuery,
    paths = {},
    noConflict;

// check for jQuery 
if (jQuery){
  oldjQuery = jQuery.fn.jquery != '3.6.0'
}
if (!jQuery || oldjQuery) {
    // load if it's not available or doesn't meet min standards
    paths.jquery = "jquery-3.6.0.min";
    noConflict = !!oldjQuery;
} else {
    // register the current jQuery
    define('jquery', [], function() { return jQuery; });
}


requirejs.config({
    // urlArgs: "v=" + version,
    "baseUrl": window.site_url+"js/plugin",
    
    "packages": [{
      "name": 'highcharts',
      "main": 'highcharts'
    }],
    "paths": {
      "app": app_url,
      "purify": "purify.min",
      "lazyload": "lazyload.amd.min",
      "lazyload_polyfill": "intersection-observer.amd.min",
      "picturePolyfill": "picturefill.min",
      "validate": "jquery.validate.min",
      "validate_additional":"jquery-validation-1.19.3/additional-methods",
      "popper":"popper.min",
      "highcharts":"",
      "ofi": "ofi.min",
      "slick.1.9":"slick-1.9.0.min",
      "slick":"slick-1.8.1.min",
      "jquery_scrollbar":"jquery.scrollbar",
      "sticky_polyfill":"stickyfill.min",
      "jquery_sticky":"jquery.sticky",
      "jquery_ui":"jquery.ui",
      "jquery_datepicker":"jquery.sticky",
      "comp": comp_url, 
      "autocomplete":"bootstrap-4-autocomplete.min",
      "swiper":"swiper-bundle.min",
      "jquery": "jquery-3.6.0.min"
    },
    "shim": {
      "jquery.ui.touch-punch.min": {
          deps: ["jquery_ui"]
      }
    }
});

document.documentElement.className += ' '+site;

// Load the main app module to start the app
requirejs(["app/main"]); 
