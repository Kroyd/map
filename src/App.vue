<template>
<div>
  <l-map style="height: 100vh" ref="map" :zoom="zoom" :center="center"
   @update:zoom="zoomUpdated"
   @update:center="centerUpdated">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-marker :lat-lng="markerLatLng1">
    <l-popup> {{ markerLatLng1 }}</l-popup>
    </l-marker>
    <l-marker :lat-lng="markerLatLng2">
    <l-popup>{{ markerLatLng2 }}</l-popup>
    </l-marker>
    <l-marker :lat-lng="markerLatLng3">
    <l-popup>{{ markerLatLng3 }}</l-popup>
    </l-marker>
    <l-polygon :lat-lngs="polygon"></l-polygon>
  </l-map>
  <button @click="calculateDistance">Расстояние</button> <br>
  <div v-if="distance">Расстояние: {{ distance }}</div> <br>
</div>
</template>

<script>
import {LMap, LTileLayer, LMarker, LPopup, LPolygon,} from 'vue2-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LPolygon,
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 12,
      center: [40.28466566765378, 69.62443828582765],
      markerLatLng1: [40.308783, 69.650615],
      markerLatLng2: [40.278352, 69.628042],
      markerLatLng3: [40.302086, 69.614105],
      polygon: [[40.308783, 69.650615], [40.278352, 69.628042]],
      distance: null,

    };
  },
  mounted() {
    const map = this.$refs.map.mapObject;
    L.Routing.control({
      waypoints: [
    L.latLng(40.308783, 69.650615),
    L.latLng(40.278352, 69.628042),
   ]
    }).addTo(map)
  },
  methods: {
    zoomUpdated (zoom) {
      this.zoom = zoom
    },
    centerUpdated ( center ) {
      this.center = center
    },
    calculateDistance() {
      let officeStadium = (L.latLng(40.278352, 69.628042));
      let office34 = (L.latLng(40.308783, 69.650615));

      const distance =  officeStadium.distanceTo(office34).toFixed(2);
      
      this.distance = distance
    }
  },
}
</script>