'use strict';
angular.module('kiokiApp')
.controller('gridCtrl', ['$scope', 'gridSvc', function($scope, gridSvc){
  $scope.Data = {
    originalMessage: "",
    encryptedMessage: "",
    firstNumber: "",
    secondNumber: "",
    thirdNumber: "",
    forth: ""
  };
  $scope.error = "";
  $scope.encrypt = function(){
    if ($scope.Data.originalMessage === "" || $scope.Data.firstNumber === ""
    || $scope.Data.secondNumber === ""
    ||$scope.Data.thirdNumber === ""
    ||$scope.Data.forthNumber === "" ) {
      $scope.error = "Data is missing";
      return;
    }
    else {$scope.error = "";}
    let one = $scope.Data.firstNumber.split(';'),
    two = $scope.Data.secondNumber.split(';'),
    three = $scope.Data.thirdNumber.split(';'),
    four = $scope.Data.forthNumber.split(';'),
    indexArray = [one, two, three, four];
    if(!gridSvc.checkIndexes(indexArray)) {
      $scope.error = "Check your indexes";
      return;
    }
    else {$scope.error = "";}
    $scope.Data.encryptedMessage = gridSvc.encrypt($scope.Data.originalMessage, indexArray);
  };
  $scope.decrypt = function (){
    if ( $scope.Data.encryptedMessage === "" || $scope.Data.firstNumber === ""
    || $scope.Data.secondNumber === ""
    ||$scope.Data.thirdNumber === ""
    ||$scope.Data.forthNumber === "" ) {
      $scope.error = "Data is missing";
      return;
    }
    else {$scope.error = "";}
    let one = $scope.Data.firstNumber.split(';'),
    two = $scope.Data.secondNumber.split(';'),
    three = $scope.Data.thirdNumber.split(';'),
    four = $scope.Data.forthNumber.split(';'),
    indexArray = [one, two, three, four];
    if(!gridSvc.checkIndexes(indexArray)) {
      $scope.error = "Check your indexes";
      return;
    }
    else {$scope.error = "";}
    $scope.Data.originalMessage = gridSvc.decrypt($scope.Data.encryptedMessage, indexArray);
  }
}])
