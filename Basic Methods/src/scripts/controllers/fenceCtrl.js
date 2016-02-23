'use strict';
angular.module('kiokiApp')
.controller('fenceCtrl', ['$scope', 'fenceSvc', function($scope, fenceSvc){
    $scope.fenceData = {
      originalMessage: "",
      encryptedMessage: "",
      key: ""
    };
    $scope.error = "";
    $scope.encrypt = function (){
      if ( $scope.fenceData.originalMessage === "" || $scope.fenceData.key === "") {
        $scope.error = "Data is missing";
        return;
      }
      else {$scope.error = "";}
      $scope.fenceData.encryptedMessage = fenceSvc.fence($scope.fenceData.originalMessage, $scope.fenceData.key, true);
    };
    $scope.decrypt = function (){
      if ( $scope.fenceData.encryptedMessage === "" || $scope.fenceData.key === "") {
        $scope.error = "Data is missing";
        return;
      }
      else {$scope.error = "";}
      $scope.fenceData.originalMessage = fenceSvc.fence($scope.fenceData.encryptedMessage, $scope.fenceData.key, false);
    };
}])
