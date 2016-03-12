/*
 * http://www.ansatt.hig.no/sverres/GEO3141/V2016
 *
 * sverre.stikbakke 11.03.2016
 *
 */

var urlarcgis = 'http://copernicus.hig.no:6080/arcgis/services';
var folder = '/svst02';
var servicename = '/svst02c';
var servicetype = '/MapServer/WmsServer?';
var url = urlarcgis + folder + servicename + servicetype;

var params = {
  'LAYERS': 'bygning,vegpolygon',
  'STYLES': 'default,default'
};

var attribution = new ol.Attribution({
  html: 'Kartgrunnlag: <a href="http://kartverket.no">Kartverket</a>'
});

var extent = [
  556183.31, 6765964.20, // lower left:  Easting, Northing
  592522.90, 6791042.64 // upper right: Easting, Northing
];

var center = [579327, 6777480]; // Easting, Northing

var projection = new ol.proj.Projection({
  code: 'EPSG:25832',
  extent: extent
});

// Oppløsning pr. pixel i meter - bestemmer min og max zoom
var minResolution = 0.01;
var maxResolution = 50.0;
var resolution = 10.0;

var fkb = new ol.layer.Tile({
  extent: extent,
  source: new ol.source.TileWMS({
    url: url,
    params: params
  })
});

var map = new ol.Map({
  layers: [fkb],
  target: 'map',
  view: new ol.View({
    projection: projection,
    center: center,
    minResolution: minResolution,
    maxResolution: maxResolution,
    resolution: resolution
  })
});
