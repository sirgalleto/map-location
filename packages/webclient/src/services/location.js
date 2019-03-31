import axios from 'axios';

const baseUrl = 'http://0.0.0.0:3000/location';

export default {
  async getAll() {
    const request = await axios.get(baseUrl);

    return request.data;
  },

  async create(location) {
    const request = await axios.put(baseUrl, location);

    return request.data;
  },

  async update(location) {
    const request = await axios.put(`${baseUrl}/${location.id}`, location);

    return request.data;
  },

  async delete(locationId) {
    const request = await axios.delete(`${baseUrl}/${locationId}`);

    return request.data;
  },
};
