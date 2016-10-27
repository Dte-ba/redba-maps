(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("google"));
	else if(typeof define === 'function' && define.amd)
		define("RedbaMap", ["google"], factory);
	else if(typeof exports === 'object')
		exports["RedbaMap"] = factory(require("google"));
	else
		root["RedbaMap"] = factory(root["google"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * RedbaMap
	 *
	 * Copyright (c) 2016 Dte-ba
	 *
	 * MIT License
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _google = __webpack_require__(1);
	
	var _google2 = _interopRequireDefault(_google);
	
	var _utils = __webpack_require__(6);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _regionPolygon = __webpack_require__(7);
	
	var _regionPolygon2 = _interopRequireDefault(_regionPolygon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _google$maps = _google2.default.maps,
	    MapTypeId = _google$maps.MapTypeId,
	    Map = _google$maps.Map;
	
	var RedbaMap = function (_Map) {
	  _inherits(RedbaMap, _Map);
	
	  function RedbaMap(ele, ops) {
	    _classCallCheck(this, RedbaMap);
	
	    var _regions = ops.regions;
	    var regionsDataField = ops.regionsDataField;
	    var fetchRegion = ops.fetchRegion;
	    var fetchDistrict = ops.fetchDistrict;
	    var sedeIcon = ops.sedeIcon;
	
	    if (!fetchRegion) {
	      throw new Error('The ops.fetchRegion is required, define ops.fetchRegion(idRegion)');
	    }
	
	    if (!fetchDistrict) {
	      throw new Error('The ops.fetchDistrict is required, define ops.fetchDistrict(idDistrict)');
	    }
	
	    var baOps = {
	      center: {
	        lat: -36.99483714719853,
	        lng: -59.69601111984252
	      },
	      zoom: 7,
	      mapTypeId: MapTypeId.ROADMAP
	    };
	
	    var gmops = Object.assign({}, ops, baOps);
	
	    var _this = _possibleConstructorReturn(this, (RedbaMap.__proto__ || Object.getPrototypeOf(RedbaMap)).call(this, ele, gmops));
	
	    _this.setData(_regions);
	    _this.regionsDataField = regionsDataField;
	    _this.fetchRegion = fetchRegion;
	    _this.fetchDistrict = fetchDistrict;
	    _this.showSede = ops.showSede || false;
	    _this.sedeIcon = ops.sedeIcon;
	    return _this;
	  }
	
	  _createClass(RedbaMap, [{
	    key: '_createRegions',
	    value: function _createRegions(data) {
	      var _this2 = this;
	
	      if (this.regionsDataField) {
	        data = data[this.regionsDataField];
	      } else if (!(data instanceof Array)) {
	        if (data.hasOwnProperty('data') && data['data'] instanceof Array) {
	          data = data['data'];
	        } else {
	          throw new Error('Can\'t get data from regions, please set ops.regionsDataField');
	        }
	      }
	      data.forEach(function (d) {
	        var rops = {
	          map: _this2,
	          region: d.region,
	          color: d.color,
	          centralPosition: d.centralPosition,
	          centralName: d.centralName,
	          distritos: d.distritos,
	          fetch: _this2.fetchRegion,
	          fetchDistrict: _this2.fetchDistrict,
	          showSede: _this2.showSede,
	          sedeIcon: _this2.sedeIcon
	        };
	        _this2.baRegions.push(new _regionPolygon2.default(rops));
	      });
	    }
	  }, {
	    key: 'emit',
	    value: function emit(event, obj) {
	      _google2.default.maps.event.trigger(this, event, obj);
	    }
	  }, {
	    key: 'setData',
	    value: function setData(data) {
	      var _this3 = this;
	
	      if (!data) {
	        return;
	      }
	      if (_utils2.default.isPromise(data)) {
	        data.then(function (items) {
	          _this3._createRegions(items);
	        }).catch(function (err) {
	          console.log(err);
	        });
	      } else {
	        this._createRegions(data);
	      }
	    }
	  }, {
	    key: 'baRegions',
	    get: function get() {
	      if (!this._regions) {
	        this._regions = [];
	      }
	      return this._regions;
	    }
	  }]);
	
	  return RedbaMap;
	}(Map);
	
	exports.default = RedbaMap;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.default = {
	  isPromise: function isPromise(obj) {
	    return !!obj && ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Region reprecentada como poligono
	 */
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _google = __webpack_require__(1);
	
	var _google2 = _interopRequireDefault(_google);
	
	var _asyncPolygon = __webpack_require__(8);
	
	var _asyncPolygon2 = _interopRequireDefault(_asyncPolygon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Marker = _google2.default.maps.Marker;
	
	var RegionPolygon = function (_AsyncPolygon) {
	  _inherits(RegionPolygon, _AsyncPolygon);
	
	  function RegionPolygon(ops) {
	    _classCallCheck(this, RegionPolygon);
	
	    var polyOps = {
	      strokeColor: ops.strokeColor || "#969494",
	      strokeOpacity: 1,
	      strokeWeight: 2,
	      fillColor: ops.color,
	      fillOpacity: 0.6
	    };
	
	    var _this = _possibleConstructorReturn(this, (RegionPolygon.__proto__ || Object.getPrototypeOf(RegionPolygon)).call(this, polyOps));
	
	    _this.region = ops.region;
	    _this.color = ops.color;
	    _this.centralPosition = ops.centralPosition;
	    _this.centralName = ops.centralName;
	    _this.distritos = ops.distritos;
	    _this.fetch = ops.fetch;
	    _this.fetchDistrict = ops.fetchDistrict;
	    _this.showSede = ops.showSede || false;
	    _this.sedeIcon = ops.sedeIcon;
	
	    _this._setMap(ops.map);
	    _this._fetchData();
	    return _this;
	  }
	
	  _createClass(RegionPolygon, [{
	    key: '_setMap',
	    value: function _setMap(map) {
	      var _this2 = this;
	
	      this._onClick(function () {
	        map.emit('region.click', _this2);
	      });
	
	      this.sede = new Marker({
	        position: this.centralPosition,
	        title: 'Region ' + this.region + ' | Sede ' + this.centralName,
	        icon: this.sedeIcon
	      });
	
	      this.sede.addListener('click', function () {
	        map.emit('sede.click', _this2);
	      });
	
	      this.sede.setMap(map);
	
	      if (!this.showSede) {
	        this.hideSede();
	      }
	
	      _get(RegionPolygon.prototype.__proto__ || Object.getPrototypeOf(RegionPolygon.prototype), 'setMap', this).call(this, map);
	    }
	  }, {
	    key: 'hideSede',
	    value: function hideSede() {
	      this.sede.setVisible(false);
	    }
	  }, {
	    key: 'showSede',
	    value: function showSede() {
	      this.sede.setVisible(true);
	    }
	  }, {
	    key: '_fetchData',
	    value: function _fetchData() {
	      var _this3 = this;
	
	      this.fetch(this.region).then(function (data) {
	        if (!(data instanceof Array)) {
	          if (data.hasOwnProperty('data') && data['data'] instanceof Array) {
	            data = data['data'];
	          } else {
	            throw new Error('Can\'t get path from', data);
	          }
	        }
	        var paths = data.map(function (d) {
	          return { lat: d[0], lng: d[1] };
	        });
	        _this3.setPaths(paths);
	      });
	    }
	  }]);
	
	  return RegionPolygon;
	}(_asyncPolygon2.default);
	
	exports.default = RegionPolygon;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * AsyncPolygon es una versión customizada de google.maps.Polygon
	 * para cargar la información mediante promises
	 */
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _google = __webpack_require__(1);
	
	var _google2 = _interopRequireDefault(_google);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _google$maps = _google2.default.maps,
	    Polygon = _google$maps.Polygon,
	    LatLngBounds = _google$maps.LatLngBounds;
	
	var AsyncPolygon = function (_Polygon) {
	  _inherits(AsyncPolygon, _Polygon);
	
	  function AsyncPolygon(ops) {
	    _classCallCheck(this, AsyncPolygon);
	
	    return _possibleConstructorReturn(this, (AsyncPolygon.__proto__ || Object.getPrototypeOf(AsyncPolygon)).call(this, ops));
	  }
	
	  _createClass(AsyncPolygon, [{
	    key: 'getBounds',
	    value: function getBounds() {
	      var bounds = new LatLngBounds();
	      this.getPath().forEach(function (e) {
	        bounds.extend(e);
	      });
	      return bounds;
	    }
	  }, {
	    key: 'emit',
	    value: function emit(event, obj) {
	      _google2.default.maps.event.trigger(this, event, obj);
	    }
	  }, {
	    key: 'fitBounds',
	    value: function fitBounds() {
	      this.getMap().fitBounds(this.getBounds());
	    }
	  }, {
	    key: '_onClick',
	    value: function _onClick(fn) {
	      var _this2 = this;
	
	      if (!fn || typeof fn !== 'function') {
	        return;
	      }
	
	      _google2.default.maps.event.addListener(this, 'click', function () {
	        fn.apply(_this2);
	      });
	    }
	  }]);
	
	  return AsyncPolygon;
	}(Polygon);
	
	exports.default = AsyncPolygon;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=redba-maps.js.map