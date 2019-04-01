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
        :color="getPinColor(location.isOpen)"
        @added="popupAdded"
      >
        <MglPopup anchor="top">
          <MarkerInfo
            :location="location"
            @delete="onDeleteLocation($event)"
            @update="onUpdateLocation($event)"
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
import { mapActions, mapState } from 'vuex';
import MarkerInfo from '@/components/MarkerInfo.vue';
import LocationModalForm from '@/components/LocationModalForm.vue';

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
      updateLocation: 'updateLocation',
      deleteLocation: 'deleteLocation',
    }),
    composeLongLat(location) {
      return [location.long, location.lat];
    },
    onSubmitLocation(location) {
      this.toggleCreateLocation();
      this.createLocation(location);
    },
    onUpdateLocation(location) {
      this.updateLocation(location);
    },
    onDeleteLocation(location) {
      this.deleteLocation(location.id);
    },
    toggleCreateLocation() {
      this.showCreateLocation = !this.showCreateLocation;
    },
    getPinColor(isOpen) {
      return isOpen ? '#4B45E7' : '#EF5350';
    },
    // @hack to start popups as closed, a glitch in the start of the page is expected
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
