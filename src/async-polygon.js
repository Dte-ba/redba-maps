/**
 * AsyncPolygon es una versión customizada de google.maps.Polygon
 * para cargar la información mediante promises
 */
'use strict'

import google from 'google';

const {Polygon, LatLngBounds} = google.maps;

export default class AsyncPolygon extends Polygon {
  constructor(ops) {
    super(ops);
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
    this.getMap().fitBounds(this.getBounds());
  }

  _onClick(fn){
    if (!fn || (typeof fn !== 'function')){
      return;
    }

    google.maps.event.addListener(this, 'click', () => {
      fn.apply(this);
    });

  }

}