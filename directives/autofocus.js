(function(angular, app) {
  "use strict";
  app.directive('autofocus',function(){
    return{
      restrict: 'A',
      link: function(scope,element,attrs){

        if(Modernizr.input.autofocus){
          return;
        }

        element.focus();
      }
    };
  });
})(angular, app);
