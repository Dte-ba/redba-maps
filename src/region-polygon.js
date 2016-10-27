/**
 * Region reprecentada como poligono
 */
'use strict'

import google from 'google';
import AsyncPolygon from './async-polygon';

const {Marker} = google.maps;


export default class RegionPolygon extends AsyncPolygon {
  constructor(ops) {

    var polyOps = {
      strokeColor: ops.strokeColor || "#969494",
      strokeOpacity: 1,
      strokeWeight: 2,
      fillColor: ops.color,
      fillOpacity: 0.6
    };

    super(polyOps);

    this.region = ops.region;
    this.color = ops.color;
    this.centralPosition = ops.centralPosition;
    this.centralName = ops.centralName;
    this.distritos = ops.distritos;
    this.fetch = ops.fetch;
    this.fetchDistrict = ops.fetchDistrict;
    this.showSede = ops.showSede || false;
    this.sedeIcon = ops.sedeIcon;

    this._setMap(ops.map);
    this._fetchData();
  }

  _setMap(map){

    this._onClick(() => {
      map.emit('region.click', this);
    });

    this.sede = new Marker({
      position: this.centralPosition,
      title: 'Region '+this.region+' | Sede '+this.centralName,
      icon: this.sedeIcon
    });

    this.sede.addListener('click', () => {
      map.emit('sede.click', this);
    });

    this.sede.setMap(map);

    if (!this.showSede){
      this.hideSede();
    }

    super.setMap(map);
  }

  hideSede(){
    this.sede.setVisible(false);
  }

  showSede(){
    this.sede.setVisible(true);
  }

  _fetchData(){
    this.fetch(this.region)
      .then(data => {
        if (!(data instanceof Array)){
          if (data.hasOwnProperty('data') && (data['data'] instanceof Array)){
            data = data['data'];
          } else {
            throw new Error('Can\'t get path from', data);
          }
        }
        var paths = data.map(function(d){
          return { lat: d[0], lng: d[1]};
        });
        this.setPaths(paths);
      });
  }
}