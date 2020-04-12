
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";


d3.json(queryUrl, function(data) {

  createMap(data.features);
});


function bindPopMaker(feature, layer) {
  layer.bindPopup("<h3>" + feature.properties.place +
    "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
}

function ColorCheck(d) {
  if (d >= 6.5) {
      return "red";
  } else if (d >= 6) {
      return "orange";
  } else if (d >= 5.5) {
      return "yellow";
  } else if (d >= 5) {
      return "green";
  } else if (d >= 4) {
      return "blue";
  } else {
      return "#black";
  };
}

function createMap(earthquakeData) {
   
    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature : function (feature, layer) {

            layer.bindPopup("<h3>" + feature.properties.place +
              "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" + "<p> Magnitude: " +  feature.properties.mag + "</p>")
            },     pointToLayer: function (feature, latlng) {
              return new L.circle(latlng,
                {radius: feature.properties.mag*35000,
                fillColor: ColorCheck(feature.properties.mag),
                fillOpacity: 1,
                stroke: false,
            })
          }
          });
  
   
  
  var worldmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var baseMaps = {
    "World Map" : worldmap
  
  };

  
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  
  var myMap = L.map("map", {
    center: [
      0,0
    ],
    zoom: 2.5,
    layers: [worldmap, earthquakes]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);


}
