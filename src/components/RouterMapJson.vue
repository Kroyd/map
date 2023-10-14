<template>
    <div>
        <l-map style="height: 100vh" ref="map" :zoom="zoom" :center="center"
     @update:zoom="zoomUpdated"
     @update:center="centerUpdated">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
     
    </l-map>
    <button @click="getRouter">Go</button>
    </div>
</template>
<script>
import {LMap, LTileLayer} from 'vue2-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';

export default {
    components: {
        LMap,
        LTileLayer,
    },
    data() {
        return {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution:
          '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        zoom: 12,
        map: null,
        routing: null,
        center: [40.28466566765378, 69.62443828582765],
        jsonRouter: null,
        geojsonFeature:[{
    "type": "LineString",
    "coordinates": [[-100, 40], [-105, 45], [-110, 55]]
}, {
    "type": "LineString",
    "coordinates": [[-105, 40], [-110, 45], [-115, 55]]
}],
        egege: [[69.638104,40.306924],[69.638467,40.307116],[69.637966,40.308163],[69.635457,40.307477],[69.633966,40.306806],[69.632741,40.306104],[69.6302,40.30994],[69.630069,40.309889],[69.629386,40.310959],[69.627322,40.310178]],
        }
    },
    mounted() {
        this.map = this.$refs.map.mapObject;
        this.jsonRouter = L.geoJSON(this.geojsonFeature.coordinates, {
    style: function (feature) {
    return {color: feature.properties.color};
    }
    }).bindPopup(function (layer) {
    return layer.feature.properties.description;
    }).addTo(this.map);
    },
    methods: {
        getRouter() {
       
        },
        zoomUpdated (zoom) {
        this.zoom = zoom
      },
      centerUpdated ( center ) {
        this.center = center
      },
        }
}
</script>