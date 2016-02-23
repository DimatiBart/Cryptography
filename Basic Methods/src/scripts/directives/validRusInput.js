'use strict';
angular.module('kiokiApp')
.directive('validrusinput', function(){
  return {
    restrict: 'A',
    link: function ($scope, element, attr){
      element.bind('input', function(event){
        this.value = this.value.replace(/[^А-я]/, '');
      });
    }
  }
})
