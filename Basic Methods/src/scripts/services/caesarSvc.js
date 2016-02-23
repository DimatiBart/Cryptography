'use strict';
angular.module('kiokiApp')
.factory('caesarSvc', function(){
  return {
    encrypt: function(message, key){
      let encryptedMessage = "";
      for (let i in message){
        let code = message.charCodeAt(i);
        if (code>=1040 && code < 1072){
          encryptedMessage += String.fromCharCode((((code-1040)+ +key)%32)+1040);
        }
        else {encryptedMessage += String.fromCharCode((((code-1072)+ +key)%32)+1072);}
      }
      return encryptedMessage;
    },
    decrypt: function (encryptedMessage, key){
      let message = "";
      key = +key;
      for (let i in encryptedMessage){
        let code = encryptedMessage.charCodeAt(i);
        if (code>=1040 && code < 1072){
          message += String.fromCharCode((((code-1040)+32-key)%32)+1040);
        }
        else {message += String.fromCharCode((((code-1072)+32-key)%32)+1072);}
      }
      return message;
    }
  }
})
