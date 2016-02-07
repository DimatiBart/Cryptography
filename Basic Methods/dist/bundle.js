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
/***/ function(module, exports) {

	var app = angular.module('kiokiApp', []);

	app.
	controller('fenceCtrl', ['$scope', 'fenceSvc', function($scope, fenceSvc){
	    $scope.fenceData = {};
	    $scope.encrypt = function (){
	      alert('huiblat');
	      $scope.fenceData.encryptedMessage = fenceSvc.fence ($scope.fenceData.originalMesage, $scope.fenceData.key)
	    }
	    // $scope.decrypt = function(){
	    //
	    // }
	}]).
	factory('fenceSvc', function(){
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


/***/ }
/******/ ]);