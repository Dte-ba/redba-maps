'use strict';

import * as _ from "lodash";

export default class QueryFilter {
  constructor(){
  }
  setItems(elements){
    let regions = _.map(elements, r => {
      return {
        type: 'region',
        caption: `Región ${r.region}`,
        query: { region: r.region},
        icon: 'fa-dot-circle-o',
        metastats: [
          {caption: 'distritos', total: r.distritos.length, icon: 'fa-map-marker'}
        ]
      }; 
    });

    let distritos = _.flatMap(elements, r => { 
      return _.map(r.distritos, d => {
        return {
          type: 'distrito',
          caption: `Distrito ${d.name}`,
          query: { region: r.region, distrito: d.name, id: d.id },
          icon: 'fa-map-marker',
          metastats: [
            {caption: `Region ${r.region}`, icon: 'fa-dot-circle-o'}
          ]
        };
      }); 
    });

    this.searchs = regions.concat(distritos);
  }
  filterByRegion(search){
    let searchs = this.searchs;
    var sort = {
      'region': 0,
      'distrito': 2
    };

    var results = _.filter(searchs, i => {
      var r = i.query.region || '';
      return r.toString() === search;
    });

    return _.sortBy(results, r => {
      return sort[r.type];
    });
  }

  filterByDistrito(search){
    let searchs = this.searchs;

    var sort = {
      'region': 1,
      'distrito': 0
    };

    var results = _.filter(searchs, i => {
      var r = i.query.distrito || '';
      var reg = new RegExp(_.escapeRegExp(search), 'ig');
      return reg.test(_.deburr(_.trim(r)));
    });

    return _.sortBy(results, r => {
      return sort[r.type];
    });
  }

  filterByText(search){
    let searchs = this.searchs;

    var sort = {
      'region': 0,
      'distrito': 1
    };

    var results = _.filter(searchs, i => {
      var r = i.query.nombre || '';
      var reg = new RegExp(_.escapeRegExp(search), 'ig');
      return reg.test(_.deburr(_.trim(i.query.nombre)))
             || reg.test(_.deburr(_.trim(i.query.distrito)));
    });

    return _.sortBy(results, r => {
      return sort[r.type];
    });
  }

  queryFilter(text){
    var scaped = _.deburr(_.trim(text));

    var isRegion = /^(region\s+)?[0-9]{1,2}$/ig;
    var isDistrito = /^distrito\s+[\w+\s]+$/ig;
    var clean = /^(region|cue|localidad|distrito)\s+/ig;
    var to = text.replace(clean, '');

    if (isRegion.test(scaped)){
      var res = this.filterByRegion(to);
      return res;
    }

    if (isDistrito.test(scaped)){
      var res = this.filterByDistrito(to);
      return res;
    }

    var res = this.filterByText(to);
    return res;
  }
}