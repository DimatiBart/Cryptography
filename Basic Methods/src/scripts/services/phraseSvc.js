'use strict';
angular.module('kiokiApp')
.factory('phraseSvc', function(){
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
})
