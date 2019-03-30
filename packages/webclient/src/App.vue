<template>
  <MglMap :accessToken="accessToken" :mapStyle="mapStyle">
    <MglMarker v-for="location in locations" :key="location.id" :coordinates="composeLongLat(location)" :color="location.isOpen ? '#4B45E7' : '#EF5350'">
      <div>
        Holi
      </div>
    </MglMarker>
  </MglMap>
</template>

<script>
import Mapbox from 'mapbox-gl'
import { MglMap, MglMarker } from 'vue-mapbox'
import { mapActions, mapState } from 'vuex'

const mapboxAccessToken = process.env['VUE_APP_MAPBOX_ACCESS_TOKEN']

export default {
  name: 'app',
  components: {
    MglMap,
    MglMarker
  },
  data() {
    const mapStyle = 'mapbox://styles/mapbox/dark-v10'
    
    return {
      mapStyle,
      accessToken: mapboxAccessToken,
    }
  },
  created() {
    this.mapbox = Mapbox
    this.fetchLocations()
    this.startListeningForLocationUpdates()
  },
  computed: {
    ...mapState('locations', {
      locations: state => state.items,
      error: state => state.fetchingError
    })
  },
  methods: {
    ...mapActions('locations', {
      fetchLocations: 'fetchLocations',
      startListeningForLocationUpdates: 'startListeningForUpdates', 
    }),
    composeLongLat(location) {
      return [location.long, location.lat]
    },
  }
}
</script>

<style>
.mgl-map-wrapper {
  width: 100vw;
  height: 100vh;
}
</style>
