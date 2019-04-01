import io from 'socket.io-client';
import locationService from '../services/location';
import buildVuexAsyncRequest from '../helpers/buildVuexAsyncRequest';

const fetchItemsAsyncRequest = buildVuexAsyncRequest('fetch', 'items', []);
const createLocationAsyncRequest = buildVuexAsyncRequest('create', 'createLocation', null);
const updateLocationAsyncRequest = buildVuexAsyncRequest('update', 'updateLocation', []);
const deleteLocationAsyncRequest = buildVuexAsyncRequest('delete', 'updateLocation', null);

const initialState = {
  ...fetchItemsAsyncRequest.store,
  ...updateLocationAsyncRequest.store,
  ...createLocationAsyncRequest.store,
  ...deleteLocationAsyncRequest.store,
};

const mutations = {
  ...fetchItemsAsyncRequest.mutations,
  ...updateLocationAsyncRequest.mutations,
  ...createLocationAsyncRequest.mutations,
  ...deleteLocationAsyncRequest.mutations,
  SOCKET_CREATE_LOCATION(state, location) {
    Object.assign(state, {
      items: [...state.items, location],
    });
  },
  SOCKET_UPDATE_LOCATION(state, updatedLocation) {
    Object.assign(state, {
      items: state.items.map(
        location => (location.id === updatedLocation.id ? updatedLocation : location),
      ),
    });
  },
  SOCKET_DELETE_LOCATION(state, deletedLocation) {
    Object.assign(state, {
      items: state.items.filter(location => location.id !== deletedLocation.id),
    });
  },
};

const actions = {
  fetchLocations: fetchItemsAsyncRequest.actionDecorator(() => locationService.getAll()),
  createLocation: createLocationAsyncRequest.actionDecorator(
    location => locationService.create(location),
  ),
  updateLocation: updateLocationAsyncRequest.actionDecorator(
    location => locationService.update(location),
  ),
  deleteLocation: deleteLocationAsyncRequest.actionDecorator(
    locationId => locationService.delete(locationId),
  ),
  startListeningForUpdates({ commit }) {
    const socket = io('http://localhost:3000/locations');

    socket.on('message', ({ eventType, location }) => {
      commit(`SOCKET_${eventType}_LOCATION`, location);
    });
  },
};

export default {
  namespaced: true,
  state: initialState,
  mutations,
  actions,
};
