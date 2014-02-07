(function(angular, app) {
  "use strict";
  app.directive('bindOnce',[function(){
    var link = function(scope, element, attrs){
      setTimeout(function(){
        scope.$destroy();
        element.removeClass('ng-binding ng-scope');
      }, 0);
    };

    return{
      scope: true,
      link: link
    };
  }]);
})(angular, app);
