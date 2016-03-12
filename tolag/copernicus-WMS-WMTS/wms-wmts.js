/*
 * http://www.ansatt.hig.no/sverres/GEO3141/V2016/WMS
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

// http://wms.geonorge.no/kr/koordsys_res.txt
var resolutions = [
  42.3125,
  21.15625,
  10.578125,
  5.2890625,
  2.64453125,
  1.322265625,
  0.6611328125,
  0.33056640625,
  0.165283203125
];

var zoom = 2;

// http://www.statkart.no/Kart/Gratis-kartdata/Cache-tjenester/
var extentKartverket = [
  -2000000, 3500000, // lower left:  Easting, Northing
  3545984, 9045984 // upper right: Easting, Northing
];

var matrixSet = 'EPSG:25832'; // EUREF89, UTM zone 32

var matrixIds = [
  'EPSG:25832:9',
  'EPSG:25832:10',
  'EPSG:25832:11',
  'EPSG:25832:12',
  'EPSG:25832:13',
  'EPSG:25832:14',
  'EPSG:25832:15',
  'EPSG:25832:16',
  'EPSG:25832:17'
];

var topo2 = new ol.layer.Tile({
  source: new ol.source.WMTS({
    attributions: [attribution],
    url: 'http://opencache.statkart.no/gatekeeper/gk/gk.open_wmts?',
    layer: 'topo2',
    matrixSet: matrixSet,
    format: 'image/png',
    tileGrid: new ol.tilegrid.WMTS({
      extent: extentKartverket,
      resolutions: resolutions,
      matrixIds: matrixIds
    }),
    style: 'default',
  })
});

var fkb = new ol.layer.Tile({
  extent: extent,
  source: new ol.source.TileWMS({
    url: url,
    params: params
  })
});

var map = new ol.Map({
  layers: [topo2, fkb],
  target: 'map',
  view: new ol.View({
    projection: projection,
    extent: extent,
    center: center,
    resolutions: resolutions,
    zoom: zoom
  })
});
