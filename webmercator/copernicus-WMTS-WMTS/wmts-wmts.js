/*
 * http://www.ansatt.hig.no/sverres/GEO3141/V2016
 *
 * sverre.stikbakke 11.03.2016
 *
 */

var urlarcgis = 'http://copernicus.hig.no:6080/arcgis/rest/services';
var folder = '/geo3141db01';
var servicename = '/geo3141db01v3';
var servicetype = '/MapServer/WMTS?';
var url = urlarcgis + folder + servicename + servicetype;

var layer = 'geo3141db01_geo3141db01v3';
var matrixSet = 'default028mm';

var projection = ol.proj.get('EPSG:3857');
var projectionExtent = projection.getExtent();
var size = ol.extent.getWidth(projectionExtent) / 256;
var resolutions = new Array(20);
var matrixIds = new Array(20);
for (var z = 0; z < 20; ++z) {
  // generate resolutions and matrixIds arrays for this WMTS
  resolutions[z] = size / Math.pow(2, z);
  matrixIds[z] = z;
}

var matrixSetKartverket = 'EPSG:3857';

// Generate id's for WMTS tile sets
var i;
var matrixIdsKartverket = [];
var matrixN = 20;
for (i = 0; i < matrixN; i = i + 1) {
  matrixIdsKartverket[i] = matrixSetKartverket + ":" + i;
};

var attribution = new ol.Attribution({
  html: 'Kartgrunnlag: <a href="http://kartverket.no">Kartverket</a>'
});

var extent = [
  1150445.3383, 8255081.5588, // lower left:  Easting, Northing
  1172994.6965, 8279009.8604 // upper right: Easting, Northing
];

var center = [1166918, 8270992]; // Easting, Northing

var resolutionsView = resolutions.slice(13, 20);
var zoom = 2;

var fkb = new ol.layer.Tile({
  source: new ol.source.WMTS({
    attributions: [attribution],
    url: url,
    layer: layer,
    matrixSet: matrixSet,
    format: 'image/png',
    tileGrid: new ol.tilegrid.WMTS({
      extent: projectionExtent,
      resolutions: resolutions,
      matrixIds: matrixIds
    }),
    style: 'default',
  })
});

var topo2 = new ol.layer.Tile({
  source: new ol.source.WMTS({
    attributions: [attribution],
    url: 'http://opencache.statkart.no/gatekeeper/gk/gk.open_wmts?',
    layer: 'topo2graatone',
    matrixSet: matrixSetKartverket,
    format: 'image/png',
    tileGrid: new ol.tilegrid.WMTS({
      extent: projectionExtent,
      resolutions: resolutions,
      matrixIds: matrixIdsKartverket
    }),
    style: 'default',
  })
});

var map = new ol.Map({
  layers: [topo2, fkb],
  target: 'map',
  view: new ol.View({
    projection: projection,
    extent: extent,
    center: center,
    resolutions: resolutionsView,
    zoom: zoom
  })
});
