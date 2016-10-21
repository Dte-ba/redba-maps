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
(function($, google, undefined){
  'use strict';

  if (!google || !google.maps){
    console.log('WARNING: google.maps is not defined');
  }

  if (!$){
    console.log('WARNING: jQuery is not defined');
  }

  /**
   * Utils contiene metodos para trabajar con Google Maps
   */
  var Utils = {};

  /**
   * Distrito encapsula la funcionalidad para
   * manipular google.maps.Polygon como distritos
   * 
   * @param {Object} ops
   */
  function Distrito(ops){
    var self = this;

    return self;
  }

  /**
   * Region encapsula la funcionalidad para
   * manipular google.maps.Polygon como regiones
   * 
   * @param {Object} ops
   */
  function Region(ops){
    var self = this;

    return self;
  }

  /**
   * RedbaMap
   * 
   * @param {Object} ops
   */
  function RedbaMap(ops){
    var self = this;

    return self;    
  }

})(jQuery, google);