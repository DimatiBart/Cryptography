'use strict';
angular.module('kiokiApp')
.directive('validnumber', function(){
  return {
    restrict: 'A',
    link: function ($scope, element, attr){
      element.bind('input', function(event){
        this.value = this.value.replace(/[^0-9]+/g, '');
      });
    }
  }
})
