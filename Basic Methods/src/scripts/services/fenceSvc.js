angular.module('kiokiApp').factory('fenceSvc', function(){
    return {
      fence: function(message, key){
        'use strict';
        let encryptedMessage = [];
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
            encryptedMessage[current++] = message[j];
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
        return encryptedMessage.join("");
      }
    };
})
