/*
 * http://www.ansatt.hig.no/sverres/GEO3141/V2016
 *
 * sverre.stikbakke 11.03.2016
 *
 */

var urlarcgis= 'http://copernicus.hig.no:6080/arcgis/rest/services';
var folder = '/svst02';
var servicename = '/svst02d';
var servicetype = '/MapServer/WMTS?';
var url = urlarcgis + folder + servicename + servicetype;

var layer = 'svst02_svst02d';

var attribution = new ol.Attribution({
  html: 'Kartgrunnlag: <a href="http://kartverket.no">Kartverket</a>'
});

var extent = [
  556183.31, 6765964.20, // lower left:  Easting, Northing
  592522.90, 6791042.64 // upper right: Easting, Northing
];

// Oppløsning pr. pixel i meter pr. tileMatrix (zoom-nivå)
var resolutions = [
  26.458386250103, // = ScaleDenominator * 0.00028
  5.291677250020, // = ScaleDenominator * 0.00028
  0.529167725002, // = ...
  0.105833545000
];

var matrixSet = 'default028mm'; // standard-verdi for ArcGIS
var matrixIds = [0, 1, 2, 3];

var center = [579327, 6777480]; // Easting, Northing
var zoom = 1;

var fkb = new ol.layer.Tile({
  source: new ol.source.WMTS({
    attributions: [attribution],
    url: url,
    layer: layer,
    matrixSet: matrixSet,
    format: 'image/png',
    tileGrid: new ol.tilegrid.WMTS({
      extent: extent,
      resolutions: resolutions,
      matrixIds: matrixIds
    }),
    style: 'default',
  })
});

var map = new ol.Map({
  layers: [fkb],
  target: 'map',
  view: new ol.View({
    center: center,
    resolutions: resolutions,
    zoom: zoom
  })
});
