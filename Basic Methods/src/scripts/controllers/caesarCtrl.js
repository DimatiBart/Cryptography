'use strict';
angular.module('kiokiApp')
.controller('caesarCtrl', ['$scope', 'caesarSvc', function($scope, caesarSvc){
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
    else {$scope.error = "";}
    $scope.Data.encryptedMessage = caesarSvc.encrypt($scope.Data.originalMessage, $scope.Data.key);
  };
  $scope.decrypt = function(){
    if ($scope.Data.encryptedMessage === "" || $scope.Data.key === "") {
      $scope.error = "Data is missing";
      return;
    }
    else {$scope.error = "";}
    $scope.Data.originalMessage = caesarSvc.decrypt($scope.Data.encryptedMessage, $scope.Data.key);
  }
}])
