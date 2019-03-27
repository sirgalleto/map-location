import axios from "axios";

const baseUrl = "http://0.0.0.0:3000/location";

export default {
  async getAll() {
    const request = await axios.get(baseUrl);

    return request.data;
  }
};
