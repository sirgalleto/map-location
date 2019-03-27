import locationService from "../services/location";

const initialState = {
  isFetching: false,
  fetchingError: null,
  items: []
};

const mutations = {
  FETCH_LOCATIONS_REQUEST(state) {
    state.isFetching = true;
    state.fetchingError = null;
  },
  FETCH_LOCATIONS_SUCCESS(state, locations) {
    state.isFetching = false;
    state.items = locations;
    state.fetchingError = null;
  },
  FETCH_LOCATIONS_FAILURE(state, error) {
    state.isFetching = false;
    state.fetchingError = error;
  }
};

const actions = {
  async fetchLocations({ commit }) {
    commit("FETCH_LOCATIONS_REQUEST");

    try {
      const locations = await locationService.getAll();
      commit("FETCH_LOCATIONS_SUCCESS", locations);
    } catch (error) {
      commit("FETCH_LOCATIONS_FAILURE", error);
    }
  }
};

export default {
  namespaced: true,
  state: initialState,
  mutations,
  actions
};
