<template>
  <VApp>
    <VSpeedDial
      v-model="fab"
      right
      bottom
      absolute
    >
      <template v-slot:activator>
        <VBtn
          fab
          dark
          color="red"
          @click.stop="toggleCreateLocation"
        >
          <VIcon>add</VIcon>
        </VBtn>
      </template>
    </VSpeedDial>
    <MglMap
      :access-token="accessToken"
      :map-style="mapStyle"
    >
      <MglMarker
        v-for="location in locations"
        :key="location.id"
        :coordinates="composeLongLat(location)"
        :color="location.isOpen ? '#4B45E7' : '#EF5350'"
        @added="popupAdded"
      >
        <MglPopup anchor="top">
          <MarkerInfo
            :name="location.name"
            :lat="location.lat"
            :long="location.long"
            :is-open="location.isOpen"
          />
        </MglPopup>
      </MglMarker>
    </MglMap>
    <LocationModalForm
      :show="showCreateLocation"
      @submit="onSubmitLocation"
      @cancel="toggleCreateLocation"
    />
  </VApp>
</template>

<script>
import Mapbox from 'mapbox-gl';
import { MglMap, MglMarker, MglPopup } from 'vue-mapbox';
import MarkerInfo from '@/components/MarkerInfo.vue';
import LocationModalForm from '@/components/LocationModalForm.vue';
import { mapActions, mapState } from 'vuex';

const mapboxAccessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN;

export default {
  name: 'App',
  components: {
    MglMap,
    MglMarker,
    MglPopup,
    MarkerInfo,
    LocationModalForm,
  },
  data() {
    const mapStyle = 'mapbox://styles/mapbox/dark-v10';

    return {
      mapStyle,
      accessToken: mapboxAccessToken,
      fab: false,
      dialog: true,
      showCreateLocation: false,
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
      createLocation: 'createLocation',
    }),
    composeLongLat(location) {
      return [location.long, location.lat];
    },
    onSubmitLocation(location) {
      this.toggleCreateLocation();
      this.createLocation(location);
    },
    toggleCreateLocation() {
      this.showCreateLocation = !this.showCreateLocation;
    },
    // Hack to start popups as closed, a glitch in the start of the page is expected
    popupAdded(event) {
      // When the event is triggered the popup is still not associated
      // The setTimeout queue this action as last
      setTimeout(() => {
        event.marker.togglePopup();
      });
    },
  },
};
</script>

<style>
.mgl-map-wrapper {
  width: 100vw;
  height: 100vh;
}
.v-speed-dial--bottom.v-speed-dial--absolute {
  bottom: 5%;
}
</style>
