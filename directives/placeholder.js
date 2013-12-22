(function(angular, app) {
  "use strict";
  app.directive('placeholder',["$document", "$timeout", function($document, $timeout){
    var link = function(scope,element,attrs,ctrl){

      if(Modernizr.input.placeholder){
        return;
      }

      /*
        The following keys all cause the caret to jump to the end of the input value
        27,  Escape
        33,  Page up
        34,  Page down
        35,  End
        36,  Home
        Arrow keys allow you to move the caret manually, which should be prevented when the placeholder is visible
        37,  Left
        38,  Up
        39,  Right
        40,  Down
        The following keys allow you to modify the placeholder text by removing characters, which should be prevented when the placeholder is visible
        8,  Backspace
        46  Delete
      */

      var pTxt, modelValue, placeholding = false, badKeys = [27,33,34,35,36,37,38,39,40,8,46];

      var unplacehold = function(){
        if(!placeholding){
          return;
        }
        placeholding = false;
        element.removeClass('placeholder');
        element.val('');
      };

      var placehold = function(){
        if(placeholding || modelValue){
          return;
        }
        placeholding = true;
        element.addClass('placeholder');
        element.val(pTxt);
      };

      var moveCaret = function(elem, index) {
        var range;
        if (elem.createTextRange) {
          range = elem.createTextRange();
          range.move("character", index);
          range.select();
        } else if (elem.selectionStart) {
          elem.focus();
          elem.setSelectionRange(index, index);
        }
      };

      attrs.$observe('placeholder',function(value){
        pTxt = value;
        placeholding = false;
        placehold();
      });

      ctrl.$parsers.unshift(function (value){
        modelValue = value;
        if(!value){
          placehold();
        }
        if(placeholding){
          return '';
        }
        return value;
      });

      ctrl.$formatters.unshift(function (value){
        if(!value){
          placehold();
          modelValue = '';
          return pTxt;
        }
        return value;
      });

      element.on('click focus contextmenu',function(event){
        if($document[0].activeElement  !== this){
          return;
        }

        if(!modelValue){
          moveCaret(this,0);
        }
      });

      element.on('blur',function(){
        placehold();
      });

      element.on('keydown',function(e){
        if(!placeholding){
          return;
        }
        if(_.contains(badKeys,e.keyCode)){
          if(e.preventDefault){
            e.preventDefault();
          }
          return false;
        }
        unplacehold();
      });

      element.on('keyup',function(e){
        if(modelValue){
          return;
        }
        placehold();
        moveCaret(this,0);
      });

      element.on('paste',function(e){
        $timeout(function(){
          modelValue = element.val();
        },0);

      });
    };

    return{
      restrict: 'A',
      require: 'ngModel',
      link : link,
      priority:3,
    };
  }]);
})(angular, app);
