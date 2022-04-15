var map = L.map('mapid', {center: [51.053928, -114.069973],zoom:12,});
L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYWxleGFuZHJhdWJ0IiwiYSI6ImNrenowazJzYTA1aXAzbHFjbHA4ZW92NG4ifQ.KWWjYYnh2zIGRZQ0KtbCaw'
}).addTo(map);

var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

var processed = new L.geoJSON().addTo(map);

var options = {
  position: 'bottomleft',
  draw: {
    polyline: {
      shapeOptions: {
          color: '#e01616',
          weight: 6
      }
    },
    circle: false,
    rectangle: false,
    marker: false,
    },
  edit: {
    featureGroup: editableLayers,
    remove: false
  }
};

var drawControl = new L.Control.Draw(options);
map.addControl(drawControl);

var polyline, simplified;

map.on('draw:created', function(e) {
  var type = e.layerType,
  layer = e.layer;

  polyline = e.layer.toGeoJSON();

  editableLayers.addLayer(layer);
});

document.getElementById('Simplify').addEventListener("click", function() {
  simplified = turf.simplify(polyline, {tolerance: 0.01, highQuality: false});
  console.log(simplified);
  processed.addData(simplified);
});

document.getElementById('Remove').addEventListener("click", function() {
  processed.clearLayers();
  editableLayers.clearLayers();
});