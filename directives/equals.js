(function(angular, app) {
  "use strict";
  app.directive('equals',function(){

    var getValueFromScope = function(scope, propertyName){
      var value = scope, props = propertyName.split("."), length = props.length;

      for(var i = 0; i < length; i++){
        if(typeof value !== undefined){
          value = value[props[i]];
        }
      }

      return value;
    };

    var link = function(scope,element,attrs, ngModel){
      if(!ngModel) return;

      scope.$watch(attrs.ngModel, function(){
        validate();
      });

      scope.$watch(attrs.equals,function(val){
        validate();
      });

      var validate = function(){
        var val1 = ngModel.$viewValue;
        var val2 = getValueFromScope[attrs.equals];

        ngModel.$setValidity('equals', val1 === val2);
      };
    };

    return {
      restrict: 'A',
      require:'?ngModel',
      link:link
    };
  });
})(angular, app);
