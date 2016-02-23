'use strict';
angular.module('kiokiApp')
.controller('caesar1Ctrl', ['$scope', 'caesar1Svc', function($scope, caesar1Svc){
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
    $scope.Data.encryptedMessage = caesar1Svc.encrypt($scope.Data.originalMessage, $scope.Data.key);
  };
  $scope.decrypt = function(){
    if ($scope.Data.encryptedMessage === "" || $scope.Data.key === "") {
      $scope.error = "Data is missing";
      return;
    }
    else {$scope.error = "";}
    $scope.Data.originalMessage = caesar1Svc.decrypt($scope.Data.encryptedMessage, $scope.Data.key);
  }
}])
