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
    <button @click="getClick">Давай</button>
    <button @click="getClick2">Отмена</button>
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
        routing: null,
        home: require('@/assets/svg/home.svg'),
        map: null
      };
    },
    mounted() {
      //       var thisIcon = new L.Icon({
//     iconUrl:  require('@/assets/svg/home.svg'),
//     iconAnchor: new L.Point(24, 24),
// });
//   var icon = new L.Icon({
//     iconUrl:  require('@/assets/svg/home.svg'),
//     iconAnchor: new L.Point(1, 1),
// });
      const map = this.$refs.map.mapObject;
      L.Routing.control({
        // show: false,
        // addWaypoints: false,
        // draggableWaypoints: false,
        // fitSelectedRoutes: false,
        waypoints: [
      L.latLng(40.308783, 69.650615),
      L.latLng(40.278352, 69.628042),
     ],
      //  createMarker: function () { return null; },
    //  createMarker: function (i, wp) {
    //   if (i === 0) {
    //     return null
    //     // First marker
    //     // return L.marker(wp.latLng, {
    //     //   icon: thisIcon,
    //     //   // icon: blankMarker,
    //     // });
    //   } else {
    //     // Last marker
    //     // return null
    //     return L.marker(wp.latLng, {
    //       icon: thisIcon,
    //       // icon: bMarker,
    //       // icon: require('@/assets/svg/home.svg')
    //     });
    //   }
    // },
    //  show: false,
    // addWaypoints: false,
    // draggableWaypoints: false,
    // fitSelectedRoutes: false,
    lineOptions: {
      styles: [{ color: "blue", opacity: 0.7, weight: 3 }],
    },
    // show: this.getShow,
    // hide: function() {
		// 	L.DomUtil.addClass(this._container, 'leaflet-routing-container-hide');
		// },
      }).addTo(map)
    },
    methods: {
      getClick() {
        this.routing = L.Routing.control({
          waypoints: [
      L.latLng(40.308783, 69.650615),
      L.latLng(40.278352, 69.628042),
     ],
    //  lineOptions: {
    //   styles: [{ color: "blue", opacity: 0.7, weight: 3 }],
    // },
  }).addTo(this.map)
    },
    getClick2() {
        this.routing.spliceWaypoints(1, 1);
      },
      // getShow() {
      //   L.DomUtil.removeClass(this._container, 'leaflet-routing-container-hide');
      // },
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

<style>
.leaflet-routing-container-hide {
  display: none;
}
</style>


<!-- <template>
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
</style> -->
