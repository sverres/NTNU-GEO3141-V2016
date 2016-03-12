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

var topo2 = new ol.layer.Tile({
  extent: extent,
  source: new ol.source.TileWMS({
    url: 'http://openwms.statkart.no/skwms1/wms.topo2?',
    params: {
      'LAYERS': 'topo2_WMS'
    }
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
