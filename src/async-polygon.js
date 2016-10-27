/**
 * AsyncPolygon es una versión customizada de google.maps.Polygon
 * para cargar la información mediante promises
 */
'use strict'

import google from 'google';

const {Polygon, LatLngBounds} = google.maps;

export default class AsyncPolygon extends Polygon {
  constructor(ops) {
    ops = ops || {};
    super(ops);

    this.fetch = ops.fetch;
    this.dataLoaded = false;
  }

  _fetchData(){
    this.fetch()
      .then(data => {
        if (!(data instanceof Array)){
          if (data.hasOwnProperty('data') && (data['data'] instanceof Array)){
            data = data['data'];
          } else {
            throw new Error('Can\'t get paths from', data);
          }
        }
        var paths = data.map(function(d){
          return { lat: d[0], lng: d[1]};
        });
        this.setPaths(paths);
        this.dataLoaded = true;
        this.emit('data_loaded');
      });
  }

  getBounds() {
    let bounds = new LatLngBounds();
    this.getPath().forEach(function(e){
      bounds.extend(e);
    });
    return bounds;
  }

  emit(event, obj){
    google.maps.event.trigger(this, event, obj);
  }

  fitBounds(){
    if (this.dataLoaded){
      this.getMap().fitBounds(this.getBounds());  
    } else {
      console.log('Warning: The data is not loaded yet, wait to data_loaded');
    }
  }

  _onClick(fn){
    if (!fn || (typeof fn !== 'function')){
      return;
    }

    google.maps.event.addListener(this, 'click', () => {
      fn.apply(this);
    });

  }

  show(){
    this.setVisible(true);
  }

  hide(){
    this.setVisible(false);
  }

}