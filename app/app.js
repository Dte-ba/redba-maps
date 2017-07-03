'use strict';

import google from 'google';
import angular from 'angular';
import RedbaMap from 'RedbaMap';
import $ from 'jquery';
import ngMaterial from 'angular-material';
import ngAnimate from 'angular-animate';
import ngAria from 'angular-aria';
import QueryFilter from './filter';

const app = angular.module('redbaApp', [ngMaterial, ngAnimate, ngAria ]);

const {ControlPosition} = google.maps;

class AppController {
  constructor($http, $scope) {
    this.$http = $http;
    this.filter = new QueryFilter();
    this.hola = 'Hol';
    this.isDisabled = false;
    this.noCache = false;
    this.selectedItem;
    this.searchText = '';
    this.items = [];

    this.loading = true;
    this.regions = [];
    this.$scope = $scope;
  }

  $onInit() {
    let ele = document.getElementById('map_canvas');
    let ops = {
      sedeIcon: 'app/assets/dot-circle-icon.png',
      streetViewControl: false,
      mapTypeControlOptions: { 
        position: ControlPosition.BOTTOM_LEFT 
      },
      showSede: true
    };

    ops.regions = this.$http.get('public/regiones.json');

    ops.regions.then( response => {
      this.filter.setItems(response.data);
      this.loading = false;
    });

    ops.fetchRegion = (idRegion) => {
      return this.$http.get(`public/regiones/${idRegion}.json`);
    };

    ops.fetchDistrict = (idDistrict) => {
      return this.$http.get(`public/distritos/${idDistrict}.json`);
    };

    this.map = new RedbaMap(ele, ops);

    this.map.addListener('region.click', (region) => {
      var r = _.find(this.filter.searchs, i => {
        return i.type === 'region' && i.query.region.toString() === region.region.toString();
      });

      this.selectedItem = r;
      this.searchText = r.caption;
      this.$scope.$apply();
    });

    //this.map.addListener('sede.click', (region) => {
    //  region.sede.show()
    //});

    //this.map.addListener('region.over_change', (region, prevRegion) => {
    //  console.log('region.over_change');
    //  console.log(region, prevRegion);
    //  region.showAll();
    //  if (prevRegion){
    //    prevRegion.hideAll();
    //  }
    //});
  }

  selectedItemChange(item){
    if (item === undefined){
      return this.map.resetMap();
    }

    if (item.type === 'region'){
      var region = this.map.findRegion(item.query.region);
      region.show(true);
      region.fitBounds();
      // toggle other regions
      this.map.getRegions().forEach( r => {
        if (r.region !== parseInt(item.query.region)){
          r.hide();
        }
      });
    }

    if (item.type === 'distrito'){
      var region = this.map.findRegion(item.query.region);
      region.show();
      
      var dist = region.getDistrito(item.query.id);
      dist.show();

      if (dist.dataLoaded){
        dist.fitBounds();
      } else {
        dist.addListener('data_loaded', () => {
          dist.fitBounds();
        });
      }
      
      // toggle other regions
      this.map.getRegions().forEach( r => {
        if (r.region !== parseInt(item.query.region)){
          r.hide();
        }
      });
    }
  }

  querySearch(text){
    return this.filter.queryFilter(text);
  }
}

app.controller('AppController', AppController);

export default app;
