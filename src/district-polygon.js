/**
 * Distrito reprecentado como poligono
 */
'use strict'

import AsyncPolygon from './async-polygon';

export default class DistrictPolygon extends AsyncPolygon {
  constructor(ops) {
    ops = ops || {};

    var polyOps = {
      strokeColor: "#666",
      strokeOpacity: 1,
      strokeWeight: 2,
      fillColor: ops.color,
      fillOpacity: 0.6
    };

    polyOps.fetch = () => {
      return ops.fetch(ops.id);
    };

    super(polyOps);

    this.region = ops.region;
    this.color = ops.color;
    this.id = ops.id;
    this.fullname = ops.fullname;
    this.name = ops.name;
    this.alias = ops.alias;
    this.isSede = ops.isSede;
    this._setMap(ops.map);
  }

  _setMap(map){

    this._onClick(() => {
      map.emit('district.click', this);
    });

    super.setMap(map);
  }

  show(){
    super.setVisible(true);
    if (!this._dataLoaded){
      this._fetchData();
    }
  }
}