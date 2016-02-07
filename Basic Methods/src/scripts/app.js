var app = angular.module('kiokiApp', []);

app.
controller('fenceCtrl', ['$scope', 'fenceSvc', function($scope, fenceSvc){
    $scope.fenceData = {};
    $scope.error = "";
    $scope.encrypt = function (){
      if ($scope.fenceData.originalMessage === undefined || $scope.fenceData.key === undefined ||
      $scope.fenceData.originalMessage === "" || $scope.fenceData.key === "") {
        $scope.error = "Data is missing";
        return;
      }
      else {$scope.error = "";}
      $scope.fenceData.encryptedMessage = fenceSvc.fence($scope.fenceData.originalMessage, $scope.fenceData.key, true);
    };
    $scope.decrypt = function (){
      if ($scope.fenceData.encryptedMessage === undefined || $scope.fenceData.key === undefined ||
        $scope.fenceData.encryptedMessage === "" || $scope.fenceData.key === "") {
        $scope.error = "Data is missing";
        return;
      }
      else {$scope.error = "";}
      $scope.fenceData.originalMessage = fenceSvc.fence($scope.fenceData.encryptedMessage, $scope.fenceData.key, false);
    };

}]).
factory('fenceSvc', function(){
    return {
      fence: function(message, key, mode){
        'use strict';
        let cryptedMessage = [];
        let current = 0;
        let step = true;
        for (let i = 0; i < key; i++){
          let firstStep = 2 * (key - i - 1);
          let secondStep = 2 * i;
          if (!firstStep){
            firstStep = secondStep;
          }
          if (!secondStep){
            secondStep = firstStep;
          }
          for (let j = i; j < message.length;){
            if (mode){cryptedMessage[current++] = message[j];}
            else {cryptedMessage[j] = message[current++];};
            if (step){
              j += firstStep;
              step = false;
            }
            else {
              j+= secondStep;
              step = true;
            }
          }
        }
        return cryptedMessage.join("");
      }
    };
}).
directive('validnumber', function(){
  return {
    restrict: 'A',
    link: function ($scope, element, attr){
      element.bind('input', function(event){
        this.value = this.value.replace(/[^0-9]+/g, '');
      });
    }
  }
}).
controller('phraseCtrl', ['$scope', 'phraseSvc', function($scope, phraseSvc){
    $scope.Data = {};
    $scope.error = "";
    $scope.encrypt = function (){
      console.log ($scope.Data.originalMessage);
      // if ($scope.Data.originalMessage == undefined || $scope.Data.keyPhrase === undefined ||
      // $scope.Data.originalMessage === "" || $scope.Data.keyPhrase === "") {
      //   $scope.error = "Data is missing";
      //   return;
      // }
      // else {$scope.error = "";}
      $scope.Data.encryptedMessage = phraseSvc.phrase($scope.Data.originalMessage, $scope.Data.keyPhrase, true);
    };
    $scope.decrypt = function (){
      if ($scope.Data.encryptedMessage == undefined || $scope.Data.keyPhrase === undefined ||
        $scope.Data.encryptedMessage === "" || $scope.Data.keyPhrase === "") {
        $scope.error = "Data is missing";
        return;
      }
      else {$scope.error = "";}
      $scope.Data.originalMessage = phraseSvc.phrase($scope.Data.encryptedMessage, $scope.Data.keyPhrase, false);
    };

}]).
factory('phraseSvc', function(){
    return {
      phrase: function(message, keyPhrase, mode){
        'use strict';
        let cryptedMessage = [];
        keyPhrase = keyPhrase.split("");
        let keyIndexes = [];
        for (let i = 0; i < keyPhrase.length; i++){
          let min = 0;
          while (keyPhrase[min] === undefined) {
            min++;
          }
          for (let j = 1; j < keyPhrase.length; j++){
            if (keyPhrase[j]) {
              if (keyPhrase[min]>keyPhrase[j]) {
                min = j;
              }
            }
          }
          keyIndexes.push(min);
          delete keyPhrase[min];
        }
        for (let i = 0; i < message.length; i = i + keyIndexes.length) {
          for (let j = 0; j < keyIndexes.length; j++) {
            if (mode){  cryptedMessage[j+i] = message[i+keyIndexes[j]];}
            else { cryptedMessage[i+keyIndexes[j]] = message[j+i];}
          }
        }
        return cryptedMessage.join("");
        //return keyIndexes.join("");
      }
    };
})
