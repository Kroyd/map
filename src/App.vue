<template>
  <div id="app">
    <!-- <router-view/> -->
    <!-- <route-map></route-map> -->
    <router-map-json></router-map-json>
  </div>
</template>

<script>
// import RouteMap from './components/RouteMap.vue';
import RouterMapJson from './components/RouterMapJson.vue';
export default {
  components: {
    RouterMapJson,
  },
  name: 'App'
}
</script>

<style>

</style>