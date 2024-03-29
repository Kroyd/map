import Vue from 'vue'
import App from './App.vue'
import 'leaflet/dist/leaflet.css';
import './style.css'
import L from 'leaflet'
import router from './router'

Vue.config.productionTip = false
L.Icon.Default.mergeOptions({
   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
   iconUrl: require('leaflet/dist/images/marker-icon.png'),
   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
