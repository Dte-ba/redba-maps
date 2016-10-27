/**
 * Region reprecentada como poligono
 */
'use strict'

import google from 'google';
import AsyncPolygon from './async-polygon';
import DistrictPolygon from './district-polygon';

const {Marker} = google.maps;


export default class RegionPolygon extends AsyncPolygon {
  constructor(ops) {
    ops = ops || {};

    var polyOps = {
      strokeColor: ops.strokeColor || "#969494",
      strokeOpacity: 1,
      strokeWeight: 2,
      fillColor: ops.color,
      fillOpacity: 0.6
    };

    polyOps.fetch = () => {
      return ops.fetch(ops.region);
    };

    super(polyOps);

    this.region = ops.region;
    this.color = ops.color;
    this.centralPosition = ops.centralPosition;
    this.centralName = ops.centralName;
    let distritos = ops.distritos;
    this.fetchDistrict = ops.fetchDistrict;
    this._showSede = ops.showSede || false;
    this.sedeIcon = ops.sedeIcon;
    this._setMap(ops.map);
    this._fetchData();
    this._createDistritos(distritos);
   
  }

  get distritos(){
    if (!this._distritos){
      this._distritos = [];
    }
    return this._distritos;
  }

  _createDistritos(data){

    if (!data || !(data instanceof Array)){
      console.log('Warning: No existen distritos para ', this.region);
      return;
    }

    data.forEach(d => {
      var dops = {
        map: this.getMap(),
        region: this.region,
        color: this.color,
        fetch: this.fetchDistrict,
        id: d.id,
        fullname: d.fullname,
        name: d.name,
        alias: d.alias,
        isSede: d.central
      };

      var p = new DistrictPolygon(dops);

      if (d.central){
        this.sede = p;
      }

      this.distritos.push(p);
    });

  }

  _setMap(map){

    this._onClick(() => {
      map.emit('region.click', this);
    });

    this.sedeMarker = new Marker({
      position: this.centralPosition,
      title: 'Region '+this.region+' | Sede '+this.centralName,
      icon: this.sedeIcon
    });

    this.sedeMarker.addListener('click', () => {
      map.emit('sede.click', this);
    });

    this.sedeMarker.setMap(map);

    if (!this._showSede){
      this.hideSede();
    }

    super.setMap(map);
  }

  hideSede(){
    this.sedeMarker.setVisible(false);
  }

  showSede(){
    this.sedeMarker.setVisible(true);
  }

  showAll(){
    this.distritos.forEach( d => {
      d.show();
    });
  }

  hideAll(){
   this.distritos.forEach( d => {
    d.hide();
   }); 
  }

  show(showDistrict){
    this.showSede();
    super.show();
    if (showDistrict){
      this.showAll();
    }
  }

  hide(){
    this.hideAll();
    this.hideSede();
    super.hide();
  }

  getDistrito(id){
    var dists = this.distritos.filter(d => {
      return d.id === id;
    });
    if (dists.length === 0){
      return undefined;
    }
    return dists[0];
  }
}