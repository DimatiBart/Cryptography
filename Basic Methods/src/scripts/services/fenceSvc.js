'use strict';
angular.module('kiokiApp')
.factory('fenceSvc', function(){
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
})
