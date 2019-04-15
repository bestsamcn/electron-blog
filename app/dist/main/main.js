/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "3GRg");
/******/ })
/************************************************************************/
/******/ ({

/***/ "1v4d":
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "2Esn":
/***/ (function(module, exports) {

module.exports = require("electron-config");

/***/ }),

/***/ "3GRg":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var window_namespaceObject = {};
__webpack_require__.d(window_namespaceObject, "create", function() { return create; });
__webpack_require__.d(window_namespaceObject, "getCount", function() { return getCount; });
__webpack_require__.d(window_namespaceObject, "getPath", function() { return getPath; });
var application_namespaceObject = {};
__webpack_require__.d(application_namespaceObject, "init", function() { return init; });
var config_namespaceObject = {};
__webpack_require__.d(config_namespaceObject, "default", function() { return config; });

// EXTERNAL MODULE: external "require(\"electron\")"
var external__require___electron____ = __webpack_require__("G4Vi");
var external__require___electron_____default = /*#__PURE__*/__webpack_require__.n(external__require___electron____);

// EXTERNAL MODULE: external "require(\"electron-is\")"
var external__require___electron_is____ = __webpack_require__("jOlz");
var external__require___electron_is_____default = /*#__PURE__*/__webpack_require__.n(external__require___electron_is____);

// EXTERNAL MODULE: external "require(\"electron-log\")"
var external__require___electron_log____ = __webpack_require__("Kdsk");
var external__require___electron_log_____default = /*#__PURE__*/__webpack_require__.n(external__require___electron_log____);

// EXTERNAL MODULE: external "require(\"path\")"
var external__require___path____ = __webpack_require__("1v4d");
var external__require___path_____default = /*#__PURE__*/__webpack_require__.n(external__require___path____);

// CONCATENATED MODULE: ./src/main/services/window.ts



var count = 0;
function create(opts) {
  count += 1;
  var win = new external__require___electron____["BrowserWindow"](opts);
  win.on('close', function () {
    count -= 1;
    win = null;
  });
  return win;
}
function getCount() {
  return count;
}
function getPath() {
  var path = "file://".concat(Object(external__require___path____["join"])(__dirname, '..', 'renderer'), "/index.html");

  if (external__require___electron_is_____default.a.dev()) {
    path = 'http://127.0.0.1:8000/';
  }

  return path;
}
// CONCATENATED MODULE: ./src/main/services/application.ts

function init() {
  var win = create({
    width: 800,
    height: 600
  });
  win.loadURL(getPath());
}
// CONCATENATED MODULE: ./src/main/services/menu.ts



function getTemplate() {
  return [{
    label: 'MyApp',
    submenu: [{
      role: 'hide'
    }, {
      role: 'hideothers'
    }, {
      role: 'unhide'
    }, {
      type: 'separator'
    }, {
      role: 'quit'
    }]
  }, {
    label: 'Edit',
    submenu: [{
      role: 'undo'
    }, {
      role: 'redo'
    }, {
      type: 'separator'
    }, {
      role: 'cut'
    }, {
      role: 'copy'
    }, {
      role: 'paste'
    }, {
      role: 'selectall'
    }]
  }, {
    label: 'View',
    submenu: [{
      role: 'reload'
    }, {
      role: 'toggledevtools'
    }, {
      type: 'separator'
    }, {
      role: 'togglefullscreen'
    }]
  }, {
    role: 'window',
    label: 'Window',
    submenu: [{
      role: 'minimize'
    }, {
      role: 'close'
    }]
  }];
}

function menu_init() {
  external__require___electron_log_____default.a.info('(menu) init');
  var menu = external__require___electron____["Menu"].buildFromTemplate(getTemplate());
  external__require___electron____["Menu"].setApplicationMenu(menu);
}
// EXTERNAL MODULE: external "require(\"electron-config\")"
var external__require___electron_config____ = __webpack_require__("2Esn");
var external__require___electron_config_____default = /*#__PURE__*/__webpack_require__.n(external__require___electron_config____);

// CONCATENATED MODULE: ./src/main/configs/config.ts

/* harmony default export */ var config = (new external__require___electron_config_____default.a({
  name: 'config'
}));
// CONCATENATED MODULE: ./src/main/index.ts







external__require___electron_log_____default.a.transports.file.level = 'info';
external__require___electron_log_____default.a.info('(main/index) app start');
external__require___electron_log_____default.a.info("(main/index) log file at ".concat(external__require___electron_log_____default.a.transports.file.file));

if (external__require___electron_is_____default.a.dev()) {
  console.log('dev');

  __webpack_require__("WUjU")(); // eslint-disable-line global-require

}

external__require___electron____["app"].on('ready', function () {
  external__require___electron_log_____default.a.info('(main/index) app ready');
  init();
  menu_init(); // 加载 devtools extension

  if (external__require___electron_is_____default.a.dev()) {}
});
external__require___electron____["app"].on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    external__require___electron____["app"].quit();
  }
});
external__require___electron____["app"].on('activate', function () {
  if (getCount() === 0) {
    init();
  }
});
external__require___electron____["app"].on('quit', function () {
  external__require___electron_log_____default.a.info('(main/index) app quit');
  external__require___electron_log_____default.a.info('(main/index) <<<<<<<<<<<<<<<<<<<');
}); // Register to global, so renderer can access these with remote.getGlobal

global.services = {
  application: application_namespaceObject,
  window: window_namespaceObject
};
global.configs = {
  config: config_namespaceObject
};

/***/ }),

/***/ "G4Vi":
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ "Kdsk":
/***/ (function(module, exports) {

module.exports = require("electron-log");

/***/ }),

/***/ "WUjU":
/***/ (function(module, exports) {

module.exports = require("electron-debug");

/***/ }),

/***/ "jOlz":
/***/ (function(module, exports) {

module.exports = require("electron-is");

/***/ })

/******/ });