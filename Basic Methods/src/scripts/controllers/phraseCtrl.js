'use strict';
angular.module('kiokiApp')
.controller('phraseCtrl', ['$scope', 'phraseSvc', function($scope, phraseSvc){
  $scope.Data = {
    originalMessage: "",
    encryptedMessage: "",
    keyPhrase: ""
  };
    $scope.error = "";
    $scope.encrypt = function (){
      if ( $scope.Data.originalMessage === "" || $scope.Data.keyPhrase === "") {
        $scope.error = "Data is missing";
        return;
      }
      else {$scope.error = "";}
      $scope.Data.encryptedMessage = phraseSvc.phrase($scope.Data.originalMessage, $scope.Data.keyPhrase, true);
    };
    $scope.decrypt = function (){
      if ( $scope.Data.encryptedMessage === "" || $scope.Data.keyPhrase === "") {
        $scope.error = "Data is missing";
        return;
      }
      else {$scope.error = "";}
      $scope.Data.originalMessage = phraseSvc.phrase($scope.Data.encryptedMessage, $scope.Data.keyPhrase, false);
    };
}])
