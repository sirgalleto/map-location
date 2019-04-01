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
    /**
    * @hack as vue-mapbox does not update the location color,
    * on any update, the location is removed and then add it again to the array
    */
    Object.assign(state, {
      items: state.items.filter(
        location => (location.id !== updatedLocation.id),
      ),
    });

    // Set timeout needed to queue this task as last,
    // when vue already displayed the previous list
    setTimeout(() => {
      Object.assign(state, {
        items: [...state.items, updatedLocation],
      });
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
    location => locationService.update(location.id, location),
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
