/**
 *
 * redba-maps.js
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
(function($, google, async, undefined){
  'use strict';

  if (!google || !google.maps){
    console.log('WARNING: google.maps is not defined');
  }

  if (!$){
    console.log('WARNING: jQuery is not defined');
  }

  if (!async){
    console.log('WARNING: async is not defined');
  }
  
  // Function of babel to inheritance
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  /**
   * utils contiene metodos para trabajar con Google Maps
   */
  var utils = {
    getBounds: function(polygon){
      var bounds = new google.maps.LatLngBounds()
      polygon.getPath().forEach(function(element,index){bounds.extend(element)})
      return bounds
    }
  };

  /**
   * AsyncPolygon es una versión customizada de Polygon
   * para cargar la infomración mediante $.ajax
   */
  var AsyncPolygon = function(gmPolygon){
    _inherits(AsyncPolygon, gmPolygon);

    function AsyncPolygon(ops) {
      _classCallCheck(this, AsyncPolygon);

      ops = ops || {};

      var _this = _possibleConstructorReturn(this, (AsyncPolygon.__proto__ || Object.getPrototypeOf(AsyncPolygon)).call(this, ops));

      _this.dataUrl = ops.dataUrl;

      return _this;
    }

    AsyncPolygon.prototype.load = function(cb){
      var self = this;

      $.getJSON(self.dataUrl, function(data){
        var paths = data.map(function(d){
          return { lat: d[0], lng: d[1]};
        });
        self.setPaths(paths);
        cb && cb(null, data);
      }, function(err){
        cb && cb(err);
      });

      return self;
    };

    return AsyncPolygon;
  }(google.maps.Polygon);

  /**
   * Distrito reprecentada como poligono
   */
  var DistritoPolygon = function(aPolygon){
    _inherits(DistritoPolygon, aPolygon);

    function DistritoPolygon(ops) {
      _classCallCheck(this, DistritoPolygon);

      ops = ops || {};

      var _this = _possibleConstructorReturn(this, (DistritoPolygon.__proto__ || Object.getPrototypeOf(DistritoPolygon)).call(this, ops));

      return _this;
    }

    return DistritoPolygon;
  }(AsyncPolygon);

  /**
   * Region reprecentada como poligono
   */
  var RegionPolygon = function(aPolygon){
    _inherits(RegionPolygon, aPolygon);

    function RegionPolygon(ops) {
      _classCallCheck(this, RegionPolygon);

      ops = ops || {};

      var polyOps = {
        dataUrl: ops.dataUrl,
        strokeColor: "#969494",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: ops.color,
        fillOpacity: 0.50    
      }

      var _this = _possibleConstructorReturn(this, (RegionPolygon.__proto__ || Object.getPrototypeOf(RegionPolygon)).call(this, polyOps));

      var opsDistritos = ops.distritos || [];
      _this.distritos = [];

      _this.color = ops.color;
      _this.region = ops.region;
      _this.distritosUrl = ops.distritosUrl;
      _this.marker = ops.marker;

      opsDistritos.forEach(function(d){
        _this.addDistrito(d);
      });

      return _this;
    }

    RegionPolygon.prototype.addDistrito = function(distrito){
      var self = this;

      var d = {
        dataUrl: self.distritosUrl.replace('${distrito}', distrito.id),
        color: self.color,
        fullname: distrito.fullname,
        name: distrito.name,
        alias: distrito.alias,
        central: distrito.central
      };

      self.distritos.push(new DistritoPolygon(d));

      return self;
    };

    return RegionPolygon;
  }(AsyncPolygon);

  /**
   * RedbaMap
   * 
   * @param {Object} ops
   */
  function RedbaMap(ops){
    var self = this;

    ops = ops || {};

    self.dataUrl = ops.dataUrl;
    self.regions = [];
    self.sedeIcon = ops.sedeIcon;

    self.regionsUrl = ops.regionsUrl;
    if (!self.regionsUrl){
      throw new Error('regionsUrl is not defined');
    }
    
    self.distritosUrl = ops.distritosUrl;
    if (!self.distritosUrl){
      throw new Error('distritosUrl is not defined');
    }

    return self;    
  }

  RedbaMap.prototype.setMap = function(map){
    var self = this;

    self.regions.forEach(function(r){
      r.setMap(map);
      r.marker.setMap(map);
      r.distritos.forEach(function(d){
        d.setMap(map);
      });
    });

    return self;
  };

  RedbaMap.prototype.addRegion = function(region){
    var self = this;

    var ops = {
      name: 'Region ' + region.region,
      region: region.region,
      color: region.color,
      dataUrl: self.regionsUrl.replace('${region}', region.region),
      distritosUrl: self.distritosUrl,
      distritos: region.distritos
    };

    var marker = ops.marker = new google.maps.Marker({
      position: region.centralPosition,
      title: 'Region '+region.region+' | Sede '+region.centralName,
      icon: self.sedeIcon
    });

    marker.click = function(cb){
      marker.addListener('click', cb);
    };

    self.regions.push( new RegionPolygon(ops) );

    return self;
  };

  RedbaMap.prototype.loadRegions = function(cb){
    async.eachSeries(
      this.regions,
      function(region, icb){
        region.load(icb);
      },
      cb
    );
  };

  RedbaMap.prototype.load = function(cb){
    var self = this;

    $.getJSON(self.dataUrl, function(data){
      
      data.forEach(function(r){
        self.addRegion(r);
      });

      self.loadRegions(cb);

    }, function(err){
      cb && cb(err);
    });

    return self;
  };

  RedbaMap.VERSION = '0.0.1';
  RedbaMap.utils = utils;
  window.RedbaMap = RedbaMap;

})(jQuery, google, async);