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

import utils from './utils';
import RegionPolygon from './region-polygon';
var google = window.google;

const {MapTypeId, Map, geometry} = google.maps; 

export default class RedbaMap extends Map {
  constructor(ele, ops) {
    ops = ops || {};

    if (!ops.fetchRegion){
      throw new Error('The ops.fetchRegion is required, define ops.fetchRegion(idRegion)');
    }

    if (!ops.fetchDistrict){
      throw new Error('The ops.fetchDistrict is required, define ops.fetchDistrict(idDistrict)');
    }

    let defaultCenter = {
      lat: -36.99483714719853,
      lng: -59.69601111984252
    };

    let defaultZoom = 7;

    let baOps = {
      center: defaultCenter,
      zoom: defaultZoom,
      mapTypeId: MapTypeId.ROADMAP
    };
    
    let gmops = Object.assign({}, ops, baOps);
    
    super(ele, gmops);

    this.defaultCenter = defaultCenter;
    this.defaultZoom = defaultZoom;

    this.setData(ops.regions);
    this.regionsDataField = ops.regionsDataField;
    this.fetchRegion = ops.fetchRegion;
    this.fetchDistrict = ops.fetchDistrict;
    this.showSede = ops.showSede || false;
    this.sedeIcon = ops.sedeIcon;
    this.overRegionZoom = ops.overRegionZoom || 8;

    // handle zoom
    this.addListener('zoom_changed', this._handleZoon);
    this.addListener('center_changed', this._handleCenter);
    
  }

  get overRegion(){
    return this._overRegion;
  }

  set overRegion(value){
    let pr = this._overRegion;
    this._overRegion = value;
    if (value && pr){
      if (value.region === pr.region){
        return;
      }
    }
    this.emit('region.over_change', value, pr);
  }

  _setOverRegion(){
    let center = this.getCenter();
    this.baRegions.forEach(r => {
      if (geometry.poly.containsLocation(center, r)){
        if (!this.overRegion){
          this.overRegion = r;
        } else {
          if (this.overRegion.region !== r.region){
            this.overRegion = r;
          }
        }
      }
    });
  }

  _handleZoon(){
    let zoom = this.getZoom();
    if (zoom > this.overRegionZoom){
      this._setOverRegion();
    }
  }

  _handleCenter(){
    let zoom = this.getZoom();
    if (zoom > this.overRegionZoom){
      this._setOverRegion();
    }
  }

  get baRegions(){
    if (!this._regions){
      this._regions = [];
    }
    return this._regions;
  }

  _createRegions(data){
    if (this.regionsDataField){
      data = data[this.regionsDataField];
    } else if (!(data instanceof Array)){
      if (data.hasOwnProperty('data') && (data['data'] instanceof Array)){
        data = data['data'];
      } else {
        throw new Error('Can\'t get data from regions, please set ops.regionsDataField');
      }
    }
    data.forEach(d => {
      var rops = {
        map: this,
        region: d.region,
        color: d.color,
        centralPosition: d.centralPosition,
        centralName: d.centralName,
        distritos: d.distritos,
        fetch: this.fetchRegion,
        fetchDistrict: this.fetchDistrict,
        showSede: this.showSede,
        sedeIcon: this.sedeIcon
      };
      this.baRegions.push(new RegionPolygon(rops));
    });
  }

  emit(event, obj, ob2){
    google.maps.event.trigger(this, event, obj, ob2);
  }

  setData(data){
    if (!data){
      return;
    }
    if (utils.isPromise(data)){
      data
        .then(items => {
          this._createRegions(items);
        })
        .catch( err => {
          console.log(err);
        });
    } else {
      this._createRegions(data);
    }
  }

  findRegion(region){
    var regs = this.baRegions.filter(r => {
      return r.region === region;
    });
    if (regs.length === 0){
      return undefined;
    }
    return regs[0];
  }

  getRegions(){
    return this.baRegions;
  }

  resetMap(){
    this.baRegions.forEach(r => {
      r.show();
      r.distritos.forEach(d => {
        d.hide();
      });
    });
    this.setCenter(this.defaultCenter);
    this.setZoom(this.defaultZoom);
  }
}
