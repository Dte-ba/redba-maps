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

import google from 'google';
import utils from './utils';
import RegionPolygon from './region-polygon';

const {MapTypeId, Map} = google.maps; 

export default class RedbaMap extends Map {
  constructor(ele, ops) {
    let _regions = ops.regions;
    let regionsDataField = ops.regionsDataField;
    let fetchRegion = ops.fetchRegion;
    let fetchDistrict = ops.fetchDistrict;

    if (!fetchRegion){
      throw new Error('The ops.fetchRegion is required, define ops.fetchRegion(idRegion)');
    }

    if (!fetchDistrict){
      throw new Error('The ops.fetchDistrict is required, define ops.fetchDistrict(idDistrict)');
    }

    let baOps = {
      center: {
        lat: -36.99483714719853,
        lng: -59.69601111984252
      },
      zoom: 7,
      mapTypeId: MapTypeId.ROADMAP
    };
    
    let gmops = Object.assign({}, ops, baOps);
    
    super(ele, gmops);

    this.setData(_regions);
    this.regionsDataField = regionsDataField;
    this.fetchRegion = fetchRegion;
    this.fetchDistrict = fetchDistrict;
    this.showSede = ops.showSede || false;
    this.sedeIcon = ops.sedeIcon;
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

  emit(event, obj){
    google.maps.event.trigger(this, event, obj);
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
}
