'use strict';
angular.module('kiokiApp')
.controller('affineCtrl', ['$scope', 'affineSvc', function($scope, affineSvc){
  $scope.Data = {
    originalMessage: "",
    encryptedMessage: "",
    key: ""
  };
  $scope.error = "";
  $scope.encrypt = function (){
    if ($scope.Data.originalMessage === "" || $scope.Data.key === "") {
      $scope.error = "Data is missing";
      return;
    }
    if (!affineSvc.checkNumbers($scope.Data.key, 32)){
      $scope.error = "Numbers must be coprime";
      return;
    }
    $scope.error = "";
    $scope.Data.encryptedMessage = affineSvc.encrypt($scope.Data.originalMessage, $scope.Data.key);
  };
  $scope.decrypt = function(){
    if ($scope.Data.encryptedMessage === "" || $scope.Data.key === "") {
      $scope.error = "Data is missing";
      return;
    }
    if (!affineSvc.checkNumbers($scope.Data.key, 32)){
      $scope.error = "Numbers must be coprime";
      return;
    }
    $scope.error = "";
    $scope.Data.originalMessage = affineSvc.decrypt($scope.Data.encryptedMessage, $scope.Data.key);
  }
}])
