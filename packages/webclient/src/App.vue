<template>
  <VApp>
    <MglMap
    :access-token="accessToken"
    :map-style="mapStyle"
    >
      <MglMarker
        v-for="location in locations"
        :key="location.id"
        :coordinates="composeLongLat(location)"
        :color="location.isOpen ? '#4B45E7' : '#EF5350'"
        @added="popupAdded">
        <MglPopup anchor="top">
          <MarkerInfo :name="location.name" :lat="location.lat" :long="location.long" :isOpen="location.isOpen"/>
        </MglPopup>
      </MglMarker>
    </MglMap>
  </VApp>
</template>

<script>
import Mapbox from 'mapbox-gl';
import { MglMap, MglMarker, MglPopup } from 'vue-mapbox';
import MarkerInfo from '@/components/MarkerInfo.vue';
import { mapActions, mapState } from 'vuex';


const mapboxAccessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN;

export default {
  name: 'App',
  components: {
    MglMap,
    MglMarker,
    MglPopup,
    MarkerInfo,
  },
  data() {
    const mapStyle = 'mapbox://styles/mapbox/dark-v10';

    return {
      mapStyle,
      accessToken: mapboxAccessToken,
    };
  },
  computed: {
    ...mapState('locations', {
      locations: state => state.items,
      error: state => state.fetchingError,
    }),
  },
  created() {
    this.mapbox = Mapbox;
    this.fetchLocations();
    this.startListeningForLocationUpdates();
  },
  methods: {
    ...mapActions('locations', {
      fetchLocations: 'fetchLocations',
      startListeningForLocationUpdates: 'startListeningForUpdates',
    }),
    composeLongLat(location) {
      return [location.long, location.lat];
    },
    // Hack to start popups as closed, a glitch in the start of the page is expected
    popupAdded(event) {
      // When the event is triggered the popup is still not associated
      // The setTimeout queue this action as last
      setTimeout(() => {
        event.marker.togglePopup()
      })
    }
  },
};
</script>

<style>
.mgl-map-wrapper {
  width: 100vw;
  height: 100vh;
}
</style>
