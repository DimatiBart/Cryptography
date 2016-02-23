'use strict';
angular.module('kiokiApp')
.factory ('gridSvc', function(){
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
        cryptedMessage[i].fill(' ');
      }
      message = message.split("");
      while (message.length !== 0 ){
        for (let times = 0; times < 4; times++){
          rotateClockwise(cryptedMessage);
          for (let i = 0; i < gridArray.length && message.length !== 0; i++){
            cryptedMessage[gridArray[i][0]][gridArray[i][1]] = message.shift();
          }
        }
        for (let i in cryptedMessage){
          finalMessage += cryptedMessage[i].join("");
        }
        for (let i = 0; i < cryptedMessage.length; i++){
          cryptedMessage[i] = new Array(4);
          cryptedMessage[i].fill(' ');
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
          encryptedMessage[i].fill(' ');
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
})
