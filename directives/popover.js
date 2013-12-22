(function(angular, app) {
  "use strict";
  app.directive('popOver',["$window","$http",function($window,$http){
    return function(scope,element,attrs){
      element.on('mouseover',function(){
        $('.popover').hide();
        var promise = scope.$apply(attrs.popOver);
        if(attrs.popOverAttached){
          element.popover('show');
        }else{
          promise.then(function(promisedValue){
            element.popover( {
              offset:10,
              html:true,
              trigger:'manual',
              placement:'right',
              content:promisedValue.data.content,
              template: '<div class="popover" onmouseover="$(this).mouseleave(function() {$(this).hide(); });"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
            });
            attrs.popOverAttached = true;
            element.popover('show');
          });
        }
        scope.$apply();
      });
      element.on('click',function(e){
        e.preventDefault();
      });

      element.on('mouseleave',function(){
        setTimeout(function(){
          if(!($('.popover:hover').length)){
            element.popover('hide');
          }
        },200);
      });

    };
  }]);
})(angular, app);
