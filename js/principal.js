// Objeto mapa
var mapa = L.map("mapaid", { center: [9.5, -84], zoom: 8 });

// Mapa Positron de Carto
var CartoDB_Positron = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 20,
  }
).addTo(mapa);

// OSM
var OpenStreetMap_Mapnik = L.tileLayer(
  "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
);

// ESRI WorldImagery
var Esri_WorldImagery = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {
    attribution:
      "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
  }
);

// Capas base
var mapasbase = {
  "Carto Positron": CartoDB_Positron,
  OpenStreetMap: OpenStreetMap_Mapnik,
  "ESRI WorldImagery": Esri_WorldImagery,
};

// Control de capas
control_capas = L.control
  .layers(mapasbase, null, { collapsed: false })
  .addTo(mapa);

// Capa vectorial de puntos en formato GeoJSON
$.getJSON("datos/coyotes.geojson", function (geodata) {
  var coyoteIcon = L.divIcon({
    html: '<i class="fa fa-paw" style="color: black; font-size: 25px;"></i>',
    iconSize: [20, 20], // Dimensiones del ícono
    iconAnchor: [10, 10], // Punto central del ícono
    className: "myDivIcon", // Clase personalizada para más estilos si es necesario
  });

  var capa_coyotes = L.geoJson(geodata, {
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, { icon: coyoteIcon });
    },
    style: function (feature) {
      return { color: "black", weight: 3, fillOpacity: 0.3 };
    },
    onEachFeature: function (feature, layer) {
      var popupText =
        "<strong>Provincia</strong>: " + feature.properties.stateProvince;
      layer.bindPopup(popupText);
    },
  }).addTo(mapa);

  control_capas.addOverlay(capa_coyotes, "Coyotes");
});
