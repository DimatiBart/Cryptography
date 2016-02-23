/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var app = angular.module('kiokiApp', []);

	//Controllers
	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);

	//Services
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(10);

	//Directives
	__webpack_require__(11);
	__webpack_require__(12);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	angular.module('kiokiApp')
	.controller('fenceCtrl', ['$scope', 'fenceSvc', function($scope, fenceSvc){
	    $scope.fenceData = {
	      originalMessage: "",
	      encryptedMessage: "",
	      key: ""
	    };
	    $scope.error = "";
	    $scope.encrypt = function (){
	      if ( $scope.fenceData.originalMessage === "" || $scope.fenceData.key === "") {
	        $scope.error = "Data is missing";
	        return;
	      }
	      else {$scope.error = "";}
	      $scope.fenceData.encryptedMessage = fenceSvc.fence($scope.fenceData.originalMessage, $scope.fenceData.key, true);
	    };
	    $scope.decrypt = function (){
	      if ( $scope.fenceData.encryptedMessage === "" || $scope.fenceData.key === "") {
	        $scope.error = "Data is missing";
	        return;
	      }
	      else {$scope.error = "";}
	      $scope.fenceData.originalMessage = fenceSvc.fence($scope.fenceData.encryptedMessage, $scope.fenceData.key, false);
	    };
	}])


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ },
/* 3 */
/***/ function(module, exports) {

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


/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	angular.module('kiokiApp')
	.controller('caesarCtrl', ['$scope', 'caesarSvc', function($scope, caesarSvc){
	  $scope.Data = {
	    originalMessage: "",
	    encryptedMessage: "",
	    key: ""
	  };
	  $scope.error = "";
	  $scope.encrypt = function (){
	    if ($scope.Data.originalMessage === "" || $scope.Data.key === "") {
	      $scope.error = "Data is missing";
	      return;
	    }
	    else {$scope.error = "";}
	    $scope.Data.encryptedMessage = caesarSvc.encrypt($scope.Data.originalMessage, $scope.Data.key);
	  };
	  $scope.decrypt = function(){
	    if ($scope.Data.encryptedMessage === "" || $scope.Data.key === "") {
	      $scope.error = "Data is missing";
	      return;
	    }
	    else {$scope.error = "";}
	    $scope.Data.originalMessage = caesarSvc.decrypt($scope.Data.encryptedMessage, $scope.Data.key);
	  }
	}])


/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	angular.module('kiokiApp')
	.controller('caesar1Ctrl', ['$scope', 'caesar1Svc', function($scope, caesar1Svc){
	  $scope.Data = {
	    originalMessage: "",
	    encryptedMessage: "",
	    key: ""
	  };
	  $scope.error = "";
	  $scope.encrypt = function (){
	    if ($scope.Data.originalMessage === "" || $scope.Data.key === "") {
	      $scope.error = "Data is missing";
	      return;
	    }
	    $scope.Data.encryptedMessage = caesar1Svc.encrypt($scope.Data.originalMessage, $scope.Data.key);
	  };
	  $scope.decrypt = function(){
	    if ($scope.Data.encryptedMessage === "" || $scope.Data.key === "") {
	      $scope.error = "Data is missing";
	      return;
	    }
	    else {$scope.error = "";}
	    $scope.Data.originalMessage = caesar1Svc.decrypt($scope.Data.encryptedMessage, $scope.Data.key);
	  }
	}])


/***/ },
/* 6 */
/***/ function(module, exports) {

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


/***/ },
/* 7 */
/***/ function(module, exports) {

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


/***/ },
/* 8 */
/***/ function(module, exports) {

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


/***/ },
/* 9 */
/***/ function(module, exports) {

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


/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	angular.module('kiokiApp')
	.factory('caesar1Svc', function(){
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
	      for (let i in encryptedMessage){
	        let code = encryptedMessage.charCodeAt(i);
	        if (code>=1040 && code < 1072){
	          message += String.fromCharCode((((code-1040)/key)%32)+1040);
	        }
	        else {message += String.fromCharCode((((code-1072)/(32-key))%32)+1072);}
	      }
	      return message;
	    }
	  }
	})


/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	angular.module('kiokiApp')
	.directive('validnumber', function(){
	  return {
	    restrict: 'A',
	    link: function ($scope, element, attr){
	      element.bind('input', function(event){
	        this.value = this.value.replace(/[^0-9]+/g, '');
	      });
	    }
	  }
	})


/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';
	angular.module('kiokiApp')
	.directive('validrusinput', function(){
	  return {
	    restrict: 'A',
	    link: function ($scope, element, attr){
	      element.bind('input', function(event){
	        this.value = this.value.replace(/[^А-я]/, '');
	      });
	    }
	  }
	})


/***/ }
/******/ ]);