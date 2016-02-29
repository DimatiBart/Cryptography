'use strict';
require ('angular');
var app = angular.module('kiokiApp', []);

//Controllers
require('./controllers/fenceCtrl.js');
require('./controllers/phraseCtrl.js');
require('./controllers/gridCtrl.js');
require('./controllers/caesarCtrl.js');
require('./controllers/affineCtrl.js');

//Services
require('./services/fenceSvc.js');
require('./services/phraseSvc.js');
require('./services/gridSvc.js');
require('./services/caesarSvc.js');
require('./services/affineSvc.js');

//Directives
require('./directives/validNumber.js');
require('./directives/validRusInput.js');
