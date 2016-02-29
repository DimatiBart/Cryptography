'use strict';
angular.module('kiokiApp')
.factory('affineSvc', function(){
  function NOD (a, m){
    return m == 0 ? a : NOD(m, a % m);
  };
  function findInversive (a, m){

  }
  return {
    encrypt: function(message, key){
      let encryptedMessage = "";
      key = +key;
      for (let i in message){
        let code = message.charCodeAt(i);
        if (code>=1040 && code < 1072){
          encryptedMessage += String.fromCharCode((((code-1040)*key)%32)+1040);
        }
        else {encryptedMessage += String.fromCharCode((((code-1072)*key)%32)+1072);}
      }
      return encryptedMessage;
    },
    decrypt: function (encryptedMessage, key){
      let message = "";
      key = +key;
      var inverse;
      for (let i = 1; i < 31;i++){ //its really shamefull, sry, use Euclid's method instead
        if ((key*i)%32 === 1){
          inverse = i;
          break;
        }
      }
      for (let i in encryptedMessage){
        let code = encryptedMessage.charCodeAt(i);
        if (code>=1040 && code < 1072){
          message += String.fromCharCode((inverse*(code-1040)%32)+1040);
        }
        else {message += String.fromCharCode((inverse*(code-1072)%32)+1072);}
      }
      return message;
    },
    checkNumbers: function (a, m){
      return NOD(a, m) === 1 ? true : false;
    }
  }
})
