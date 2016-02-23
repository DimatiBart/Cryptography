'use strict';
var app = angular.module('kiokiApp', []);

//Controllers
require('./controllers/fenceCtrl.js');
require('./controllers/phraseCtrl.js');
require('./controllers/gridCtrl.js');
require('./controllers/caesarCtrl.js');
require('./controllers/caesar1Ctrl.js');

//Services
require('./services/fenceSvc.js');
require('./services/phraseSvc.js');
require('./services/gridSvc.js');
require('./services/caesarSvc.js');
require('./services/caesar1Svc.js');

//Directives
require('./directives/validNumber.js');
require('./directives/validRusInput.js');
