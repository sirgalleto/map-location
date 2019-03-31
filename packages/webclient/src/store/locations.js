import io from 'socket.io-client';
import locationService from '../services/location';

const initialState = {
  isFetching: false,
  isUpdating: false,
  requestError: null,
  items: [],
};

const mutations = {
  FETCH_LOCATIONS_REQUEST(state) {
    state.isFetching = true;
    state.requestError = null;
  },
  FETCH_LOCATIONS_SUCCESS(state, locations) {
    state.isFetching = false;
    state.items = locations;
    state.requestError = null;
  },
  FETCH_LOCATIONS_FAILURE(state, error) {
    state.isFetching = false;
    state.requestError = error;
  },
  SOCKET_CREATE_LOCATION(state, location) {
    state.items = [...state.items, location];
  },
  SOCKET_UPDATE_LOCATION(state, updatedLocation) {
    state.items = state.items.map(location => (location.id === updatedLocation.id ? updatedLocation : location));
  },
  SOCKET_DELETE_LOCATION(state, deletedLocation) {
    state.items = state.items.filter(
      location => location.id === deletedLocation.id,
    );
  },
};

const actions = {
  async fetchLocations({ commit }) {
    commit('FETCH_LOCATIONS_REQUEST');

    try {
      const locations = await locationService.getAll();
      commit('FETCH_LOCATIONS_SUCCESS', locations);
    } catch (error) {
      commit('FETCH_LOCATIONS_FAILURE', error);
    }
  },
  startListeningForUpdates({ commit }) {
    const socket = io('http://localhost:3000/locations');

    socket.on('message', ({ eventType, location }) => {
      commit(`SOCKET_${eventType}_LOCATION`, location);
    });
  },
  updateLocation({ commit }) {

  },
};

export default {
  namespaced: true,
  state: initialState,
  mutations,
  actions,
};
