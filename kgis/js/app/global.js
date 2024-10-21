
if(navigator.userAgent.indexOf('MSIE')!==-1
|| navigator.appVersion.indexOf('Trident/') > -1){
   
  var root = document.documentElement;
  root.className += ' ie11';
}


let isSafari = navigator.userAgent.indexOf("Safari") > -1;
if(isSafari){
  var root = document.documentElement;
  root.className += ' safari';
}
else{
  var root = document.documentElement;
  root.className += ' not-safari';
}


if(navigator.userAgent.indexOf("Firefox") != -1 ) 
{
    var mac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);

    if (mac) {
      var root = document.documentElement;
      root.className += ' mac-firefox';
      window.is_mac_firefox = true;
    }
}
// var root = document.documentElement;
// root.className += ' mac-firefox';
// window.is_mac_firefox = true;

function toggleLoader(a_boolean,a_bg_color){

  if($('.loading__modal').length==0){
      return false;
  }
  let bg_class = '';
  if(a_boolean){
    switch(a_bg_color){
      case 'white':
        $('html').addClass('modal-backdrop-white')
      break;
    }
    $('.loading__modal').modal('show');
  }else{
      $('.loading__modal').modal('hide');
      $('html').removeClass('modal-backdrop-white')
  }
}