(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("RedbaMap", [], factory);
	else if(typeof exports === 'object')
		exports["RedbaMap"] = factory();
	else
		root["RedbaMap"] = factory();
})(this, function() {
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
/***/ (function(module, exports, __webpack_require__) {

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
	
	var _utils = __webpack_require__(12);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _regionPolygon = __webpack_require__(13);
	
	var _regionPolygon2 = _interopRequireDefault(_regionPolygon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var google = window.google;
	
	var _google$maps = google.maps,
	    MapTypeId = _google$maps.MapTypeId,
	    Map = _google$maps.Map,
	    geometry = _google$maps.geometry;
	
	var RedbaMap = function (_Map) {
	  _inherits(RedbaMap, _Map);
	
	  function RedbaMap(ele, ops) {
	    _classCallCheck(this, RedbaMap);
	
	    ops = ops || {};
	
	    if (!ops.fetchRegion) {
	      throw new Error('The ops.fetchRegion is required, define ops.fetchRegion(idRegion)');
	    }
	
	    if (!ops.fetchDistrict) {
	      throw new Error('The ops.fetchDistrict is required, define ops.fetchDistrict(idDistrict)');
	    }
	
	    var defaultCenter = {
	      lat: -36.99483714719853,
	      lng: -59.69601111984252
	    };
	
	    var defaultZoom = 7;
	
	    var baOps = {
	      center: defaultCenter,
	      zoom: defaultZoom,
	      mapTypeId: MapTypeId.ROADMAP
	    };
	
	    var gmops = Object.assign({}, ops, baOps);
	
	    var _this = _possibleConstructorReturn(this, (RedbaMap.__proto__ || Object.getPrototypeOf(RedbaMap)).call(this, ele, gmops));
	
	    _this.defaultCenter = defaultCenter;
	    _this.defaultZoom = defaultZoom;
	
	    _this.setData(ops.regions);
	    _this.regionsDataField = ops.regionsDataField;
	    _this.fetchRegion = ops.fetchRegion;
	    _this.fetchDistrict = ops.fetchDistrict;
	    _this.showSede = ops.showSede || false;
	    _this.sedeIcon = ops.sedeIcon;
	    _this.overRegionZoom = ops.overRegionZoom || 8;
	
	    // handle zoom
	    _this.addListener('zoom_changed', _this._handleZoon);
	    _this.addListener('center_changed', _this._handleCenter);
	
	    return _this;
	  }
	
	  _createClass(RedbaMap, [{
	    key: '_setOverRegion',
	    value: function _setOverRegion() {
	      var _this2 = this;
	
	      var center = this.getCenter();
	      this.baRegions.forEach(function (r) {
	        if (geometry.poly.containsLocation(center, r)) {
	          if (!_this2.overRegion) {
	            _this2.overRegion = r;
	          } else {
	            if (_this2.overRegion.region !== r.region) {
	              _this2.overRegion = r;
	            }
	          }
	        }
	      });
	    }
	  }, {
	    key: '_handleZoon',
	    value: function _handleZoon() {
	      var zoom = this.getZoom();
	      if (zoom > this.overRegionZoom) {
	        this._setOverRegion();
	      }
	    }
	  }, {
	    key: '_handleCenter',
	    value: function _handleCenter() {
	      var zoom = this.getZoom();
	      if (zoom > this.overRegionZoom) {
	        this._setOverRegion();
	      }
	    }
	  }, {
	    key: '_createRegions',
	    value: function _createRegions(data) {
	      var _this3 = this;
	
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
	          map: _this3,
	          region: d.region,
	          color: d.color,
	          centralPosition: d.centralPosition,
	          centralName: d.centralName,
	          distritos: d.distritos,
	          fetch: _this3.fetchRegion,
	          fetchDistrict: _this3.fetchDistrict,
	          showSede: _this3.showSede,
	          sedeIcon: _this3.sedeIcon
	        };
	        _this3.baRegions.push(new _regionPolygon2.default(rops));
	      });
	    }
	  }, {
	    key: 'emit',
	    value: function emit(event, obj, ob2) {
	      google.maps.event.trigger(this, event, obj, ob2);
	    }
	  }, {
	    key: 'setData',
	    value: function setData(data) {
	      var _this4 = this;
	
	      if (!data) {
	        return;
	      }
	      if (_utils2.default.isPromise(data)) {
	        data.then(function (items) {
	          _this4._createRegions(items);
	        }).catch(function (err) {
	          console.log(err);
	        });
	      } else {
	        this._createRegions(data);
	      }
	    }
	  }, {
	    key: 'findRegion',
	    value: function findRegion(region) {
	      var regs = this.baRegions.filter(function (r) {
	        return r.region === region;
	      });
	      if (regs.length === 0) {
	        return undefined;
	      }
	      return regs[0];
	    }
	  }, {
	    key: 'getRegions',
	    value: function getRegions() {
	      return this.baRegions;
	    }
	  }, {
	    key: 'resetMap',
	    value: function resetMap() {
	      this.baRegions.forEach(function (r) {
	        r.show();
	        r.distritos.forEach(function (d) {
	          d.hide();
	        });
	      });
	      this.setCenter(this.defaultCenter);
	      this.setZoom(this.defaultZoom);
	    }
	  }, {
	    key: 'overRegion',
	    get: function get() {
	      return this._overRegion;
	    },
	    set: function set(value) {
	      var pr = this._overRegion;
	      this._overRegion = value;
	      if (value && pr) {
	        if (value.region === pr.region) {
	          return;
	        }
	      }
	      this.emit('region.over_change', value, pr);
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

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports) {

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

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Region reprecentada como poligono
	 */
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _asyncPolygon = __webpack_require__(14);
	
	var _asyncPolygon2 = _interopRequireDefault(_asyncPolygon);
	
	var _districtPolygon = __webpack_require__(15);
	
	var _districtPolygon2 = _interopRequireDefault(_districtPolygon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var google = window.google;
	
	var Marker = google.maps.Marker;
	
	var RegionPolygon = function (_AsyncPolygon) {
	  _inherits(RegionPolygon, _AsyncPolygon);
	
	  function RegionPolygon(ops) {
	    _classCallCheck(this, RegionPolygon);
	
	    ops = ops || {};
	
	    var polyOps = {
	      strokeColor: ops.strokeColor || "#969494",
	      strokeOpacity: 1,
	      strokeWeight: 2,
	      fillColor: ops.color,
	      fillOpacity: 0.6
	    };
	
	    polyOps.fetch = function () {
	      return ops.fetch(ops.region);
	    };
	
	    var _this = _possibleConstructorReturn(this, (RegionPolygon.__proto__ || Object.getPrototypeOf(RegionPolygon)).call(this, polyOps));
	
	    _this.region = ops.region;
	    _this.color = ops.color;
	    _this.centralPosition = ops.centralPosition;
	    _this.centralName = ops.centralName;
	    var distritos = ops.distritos;
	    _this.fetchDistrict = ops.fetchDistrict;
	    _this._showSede = ops.showSede || false;
	    _this.sedeIcon = ops.sedeIcon;
	    _this._setMap(ops.map);
	    _this._fetchData();
	    _this._createDistritos(distritos);
	
	    return _this;
	  }
	
	  _createClass(RegionPolygon, [{
	    key: '_createDistritos',
	    value: function _createDistritos(data) {
	      var _this2 = this;
	
	      if (!data || !(data instanceof Array)) {
	        console.log('Warning: No existen distritos para ', this.region);
	        return;
	      }
	
	      data.forEach(function (d) {
	        var dops = {
	          map: _this2.getMap(),
	          region: _this2.region,
	          color: _this2.color,
	          fetch: _this2.fetchDistrict,
	          id: d.id,
	          fullname: d.fullname,
	          name: d.name,
	          alias: d.alias,
	          isSede: d.central
	        };
	
	        var p = new _districtPolygon2.default(dops);
	
	        if (d.central) {
	          _this2.sede = p;
	        }
	
	        _this2.distritos.push(p);
	      });
	    }
	  }, {
	    key: '_setMap',
	    value: function _setMap(map) {
	      var _this3 = this;
	
	      this._onClick(function () {
	        map.emit('region.click', _this3);
	      });
	
	      this.sedeMarker = new Marker({
	        position: this.centralPosition,
	        title: 'Region ' + this.region + ' | Sede ' + this.centralName,
	        icon: this.sedeIcon
	      });
	
	      this.sedeMarker.addListener('click', function () {
	        map.emit('sede.click', _this3);
	      });
	
	      this.sedeMarker.setMap(map);
	
	      if (!this._showSede) {
	        this.hideSede();
	      }
	
	      _get(RegionPolygon.prototype.__proto__ || Object.getPrototypeOf(RegionPolygon.prototype), 'setMap', this).call(this, map);
	    }
	  }, {
	    key: 'hideSede',
	    value: function hideSede() {
	      this.sedeMarker.setVisible(false);
	    }
	  }, {
	    key: 'showSede',
	    value: function showSede() {
	      this.sedeMarker.setVisible(true);
	    }
	  }, {
	    key: 'showAll',
	    value: function showAll() {
	      this.distritos.forEach(function (d) {
	        d.show();
	      });
	    }
	  }, {
	    key: 'hideAll',
	    value: function hideAll() {
	      this.distritos.forEach(function (d) {
	        d.hide();
	      });
	    }
	  }, {
	    key: 'show',
	    value: function show(showDistrict) {
	      this.showSede();
	      _get(RegionPolygon.prototype.__proto__ || Object.getPrototypeOf(RegionPolygon.prototype), 'show', this).call(this);
	      if (showDistrict) {
	        this.showAll();
	      }
	    }
	  }, {
	    key: 'hide',
	    value: function hide() {
	      this.hideAll();
	      this.hideSede();
	      _get(RegionPolygon.prototype.__proto__ || Object.getPrototypeOf(RegionPolygon.prototype), 'hide', this).call(this);
	    }
	  }, {
	    key: 'getDistrito',
	    value: function getDistrito(id) {
	      var dists = this.distritos.filter(function (d) {
	        return d.id === id;
	      });
	      if (dists.length === 0) {
	        return undefined;
	      }
	      return dists[0];
	    }
	  }, {
	    key: 'distritos',
	    get: function get() {
	      if (!this._distritos) {
	        this._distritos = [];
	      }
	      return this._distritos;
	    }
	  }]);
	
	  return RegionPolygon;
	}(_asyncPolygon2.default);
	
	exports.default = RegionPolygon;
	module.exports = exports['default'];

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	/**
	 * AsyncPolygon es una versión customizada de google.maps.Polygon
	 * para cargar la información mediante promises
	 */
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var google = window.google;
	
	var _google$maps = google.maps,
	    Polygon = _google$maps.Polygon,
	    LatLngBounds = _google$maps.LatLngBounds;
	
	var AsyncPolygon = function (_Polygon) {
	  _inherits(AsyncPolygon, _Polygon);
	
	  function AsyncPolygon(ops) {
	    _classCallCheck(this, AsyncPolygon);
	
	    ops = ops || {};
	
	    var _this = _possibleConstructorReturn(this, (AsyncPolygon.__proto__ || Object.getPrototypeOf(AsyncPolygon)).call(this, ops));
	
	    _this.fetch = ops.fetch;
	    _this.dataLoaded = false;
	    return _this;
	  }
	
	  _createClass(AsyncPolygon, [{
	    key: '_fetchData',
	    value: function _fetchData() {
	      var _this2 = this;
	
	      this.fetch().then(function (data) {
	        if (!(data instanceof Array)) {
	          if (data.hasOwnProperty('data') && data['data'] instanceof Array) {
	            data = data['data'];
	          } else {
	            throw new Error('Can\'t get paths from', data);
	          }
	        }
	        var paths = data.map(function (d) {
	          return { lat: d[0], lng: d[1] };
	        });
	        _this2.setPaths(paths);
	        _this2.dataLoaded = true;
	        _this2.emit('data_loaded');
	      });
	    }
	  }, {
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
	      google.maps.event.trigger(this, event, obj);
	    }
	  }, {
	    key: 'fitBounds',
	    value: function fitBounds() {
	      if (this.dataLoaded) {
	        this.getMap().fitBounds(this.getBounds());
	      } else {
	        console.log('Warning: The data is not loaded yet, wait to data_loaded');
	      }
	    }
	  }, {
	    key: '_onClick',
	    value: function _onClick(fn) {
	      var _this3 = this;
	
	      if (!fn || typeof fn !== 'function') {
	        return;
	      }
	
	      google.maps.event.addListener(this, 'click', function () {
	        fn.apply(_this3);
	      });
	    }
	  }, {
	    key: 'show',
	    value: function show() {
	      this.setVisible(true);
	    }
	  }, {
	    key: 'hide',
	    value: function hide() {
	      this.setVisible(false);
	    }
	  }]);
	
	  return AsyncPolygon;
	}(Polygon);
	
	exports.default = AsyncPolygon;
	module.exports = exports['default'];

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Distrito reprecentado como poligono
	 */
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _asyncPolygon = __webpack_require__(14);
	
	var _asyncPolygon2 = _interopRequireDefault(_asyncPolygon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DistrictPolygon = function (_AsyncPolygon) {
	  _inherits(DistrictPolygon, _AsyncPolygon);
	
	  function DistrictPolygon(ops) {
	    _classCallCheck(this, DistrictPolygon);
	
	    ops = ops || {};
	
	    var polyOps = {
	      strokeColor: "#666",
	      strokeOpacity: 1,
	      strokeWeight: 2,
	      fillColor: ops.color,
	      fillOpacity: 0.6
	    };
	
	    polyOps.fetch = function () {
	      return ops.fetch(ops.id);
	    };
	
	    var _this = _possibleConstructorReturn(this, (DistrictPolygon.__proto__ || Object.getPrototypeOf(DistrictPolygon)).call(this, polyOps));
	
	    _this.region = ops.region;
	    _this.color = ops.color;
	    _this.id = ops.id;
	    _this.fullname = ops.fullname;
	    _this.name = ops.name;
	    _this.alias = ops.alias;
	    _this.isSede = ops.isSede;
	    _this._setMap(ops.map);
	    return _this;
	  }
	
	  _createClass(DistrictPolygon, [{
	    key: '_setMap',
	    value: function _setMap(map) {
	      var _this2 = this;
	
	      this._onClick(function () {
	        map.emit('district.click', _this2);
	      });
	
	      _get(DistrictPolygon.prototype.__proto__ || Object.getPrototypeOf(DistrictPolygon.prototype), 'setMap', this).call(this, map);
	    }
	  }, {
	    key: 'show',
	    value: function show() {
	      _get(DistrictPolygon.prototype.__proto__ || Object.getPrototypeOf(DistrictPolygon.prototype), 'setVisible', this).call(this, true);
	      if (!this._dataLoaded) {
	        this._fetchData();
	      }
	    }
	  }]);
	
	  return DistrictPolygon;
	}(_asyncPolygon2.default);
	
	exports.default = DistrictPolygon;
	module.exports = exports['default'];

/***/ })
/******/ ])
});
;
//# sourceMappingURL=redba-maps.js.map