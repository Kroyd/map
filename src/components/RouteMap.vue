<template>
  <div>
    <div ref="map" class="map-container"></div>
  </div>
</template>

<script>
import L from 'leaflet';
import 'leaflet-routing-machine';

export default {
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      this.map = L.map(this.$refs.map).setView([51.505, -0.09], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      this.control = L.Routing.control({
        waypoints: [
          L.latLng(51.5, -0.1),
          L.latLng(51.55, -0.12)
        ]
      }).addTo(this.map);

      this.control.on('routesfound', (e) => {
        var routes = e.routes;
        var summary = routes[0].summary;
        console.log('Distance:', summary.totalDistance / 1000, 'km');
        console.log('Time:', summary.totalTime / 60, 'min');
      });
    }
  }
}
</script>

<style>
.map-container {
  height: 400px;
}
</style>
