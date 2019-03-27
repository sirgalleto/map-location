<template>
  <MglMap :accessToken="accessToken" :mapStyle="mapStyle">
     <MglMarker v-for="location in locations" :key="location.id" :coordinates="composeLongLat(location)" :color="location.isOpen ? 'blue' : 'red'" />
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
    const mapStyle = {
      version: 8,
      name: "Mapbox Streets",
      sprite: "mapbox://sprites/mapbox/streets-v8",
      glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
      sources: {
        'mapbox-streets': {
          type: 'vector',
          url: 'mapbox://mapbox.mapbox-streets-v6'
        }
      },
      layers: [
        {
          id: 'water',
          source: 'mapbox-streets',
          'source-layer': 'water',
          type: 'fill',
          paint: {
            'fill-color': '#00ffff'
          }
        }
      ]
    }
    
    return {
      mapStyle,
      accessToken: mapboxAccessToken,
    }
  },
  created() {
    this.mapbox = Mapbox
    this.fetchLocations()
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
