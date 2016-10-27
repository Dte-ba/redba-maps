'use strict';

import google from 'google';
import angular from 'angular';
import RedbaMap from 'RedbaMap';
import $ from 'jquery';

const {ControlPosition} = google.maps;

class AppController {
  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
    let ele = document.getElementById('map_canvas');
    let ops = {
      sedeIcon: '/app/assets/dot-circle-icon.png',
      streetViewControl: false,
      mapTypeControlOptions: { 
        position: ControlPosition.BOTTOM_LEFT 
      },
      showSede: true
    };

    ops.regions = this.$http.get('/data/regiones.json');

    ops.fetchRegion = (idRegion) => {
      return this.$http.get(`/data/regiones/${idRegion}.json`);
    };

    ops.fetchDistrict = (idDistrict) => {
      return this.$http.get(`/data/regiones/${idRegion}.json`);
    };

    this.map = new RedbaMap(ele, ops);

    this.map.addListener('region.click', (region) => {
      region.fitBounds();
    });

    this.map.addListener('sede.click', (region) => {
      region.fitBounds();
    });
    
  }
}

const app = angular
              .module('redbaApp', [])
              .controller('AppController', AppController);

export default app;
