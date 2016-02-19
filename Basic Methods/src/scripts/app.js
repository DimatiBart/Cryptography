'use strict';
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
      if ($scope.Data.originalMessage == undefined || $scope.Data.keyPhrase === undefined ||
      $scope.Data.originalMessage === "" || $scope.Data.keyPhrase === "") {
        $scope.error = "Data is missing";
        return;
      }
      else {$scope.error = "";}
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
      }
    };
}).
factory ('gridSvc', function(){
  function transpose (array){
    let temp;
    for (let i in array){
      for(let j = i; j< array[i].length; j++){
        if (j !== i){
          temp = array[i][j];
          array[i][j] = array[j][i];
          array[j][i] = temp;
        }
      }
    }
  };
  function reverseRows (array) {
    for (let i in array){
      array[i].reverse();
    }
  };
  function reverseColumns (array){
    let temp;
    for (let j = 0; j< array.length;j++){
      for (let i = 0; i<array.length/2; i++){
        temp = array[i][j];
        array[i][j] = array[array.length - i][j];
        array[array.length - i][j] = temp;
      }
    }
  };
  function rotateClockwise(array){
    transpose(array);
    reverseRows(array);
  };
  function rotateAntiClockwise (array){
    transpose(array);
    reverseColumns(array);
  };
  function checkIndex (i, j, array){
    if (array[i][j] === undefined
    || array[i][array.length - j - 1] === undefined
    || array[array.length - i - 1][j] === undefined
    || array[array.length - i - 1][array.length - j - 1] === undefined){
      return true;
    }
    else {
      return false;
    }
  }
  return {
    encrypt: function(message, gridArray){
      let finalMessage = "";
      let cryptedMessage = new Array(4);
      for (let i = 0; i < cryptedMessage.length; i++){
        cryptedMessage[i] = new Array(4);
        cryptedMessage[i].fill('');
      }
      message = message.split("");
      while (message.length !== 0 ){
        for (let times = 0; times < 4; times++){
          rotateClockwise(cryptedMessage);
          for (let i = 0; i < gridArray.length; i++){
            cryptedMessage[gridArray[i][0]][gridArray[i][1]] = message.shift();
          }
        }
        for (let i in cryptedMessage){
          finalMessage += cryptedMessage[i].join("");
        }
        for (let i = 0; i < cryptedMessage.length; i++){
          cryptedMessage[i] = new Array(4);
          cryptedMessage[i].fill('');
        }
      }
      return finalMessage;
    },
    decrypt: function (message, gridArray){
      let finalMessage = "";
      let encryptedMessage = new Array(4);
      for (let i = 0; i < encryptedMessage.length; i++){
        encryptedMessage[i] = new Array(4);
      }
      let currentSubSymbol = 0;
      while( currentSubSymbol < message.length){
        for (let i= 0; i < encryptedMessage.length; i++){
          encryptedMessage[i].fill('');
        }
        for (let i = 0; i < encryptedMessage.length && currentSubSymbol < message.length; i++){
          for (let j = 0; j < encryptedMessage[i].length && currentSubSymbol < message.length; j++) {
            encryptedMessage[i][j] = message[currentSubSymbol++];
          }
        }
        rotateClockwise(encryptedMessage);
        for (let gridRow = 0; gridRow < 4; gridRow++) {
          for (let j = 0; j< gridArray.length; j++){
            finalMessage += encryptedMessage[gridArray[j][0]][gridArray[j][1]]
          }
          rotateClockwise(encryptedMessage);
        }
      }
      return finalMessage;
    },
    checkIndexes: function (indexArray){
      let tempArray = new Array(4);
      for (let i = 0; i < tempArray.length; i++){
        tempArray[i] = new Array(4);
      }
      for (let i in indexArray){
        if (checkIndex(indexArray[i][0], indexArray[i][1], tempArray)){
          for (let j = 0; j < tempArray.length; j++){
            tempArray[indexArray[i][0]][indexArray[i][1]] = i;
            rotateClockwise(tempArray);
          }
        }
        else {
          return false;
        }
      }
      return true;
    }
  }
}).
controller('gridCtrl', ['$scope', 'gridSvc', function($scope, gridSvc){
  $scope.Data = {};
  $scope.error = "";
  $scope.encrypt = function(){
    if ($scope.Data.originalMessage == undefined ||
    $scope.Data.originalMessage === "" || $scope.Data.firstNumber === "" || $scope.Data.firstNumber === undefined
    || $scope.Data.secondNumber === "" || $scope.Data.secondNumber === undefined
    ||$scope.Data.thirdNumber === "" || $scope.Data.thirdNumber === undefined
    ||$scope.Data.forthNumber === "" || $scope.Data.forthNumber === undefined ) {
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
    if ($scope.Data.encryptedMessage == undefined ||
    $scope.Data.encryptedMessage === "" || $scope.Data.firstNumber === "" || $scope.Data.firstNumber === undefined
    || $scope.Data.secondNumber === "" || $scope.Data.secondNumber === undefined
    ||$scope.Data.thirdNumber === "" || $scope.Data.thirdNumber === undefined
    ||$scope.Data.forthNumber === "" || $scope.Data.forthNumber === undefined ) {
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
