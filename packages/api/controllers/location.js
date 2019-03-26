const { Location } = require("../models");
const {
  SEQUELIZE_VALIDATION_ERROR,
  LOCATIONS_CHANNEL_NAME,
  CREATE,
  UPDATE,
  DELETE,
} = require('../constants')

function emitChannelEvent(io, eventType, id) {
  const body = {
    eventType,
    locationId: id,
  }

  io.of(LOCATIONS_CHANNEL_NAME).emit(JSON.stringify(body))
}

module.exports = {
  /**
   * Get location list
   *
   * @function
   * @param req {Object} The request.
   * @param res {Object} The response.
   * @return {undefined}
   */
  async get(req, res) {
    try {
      const locations = await Location.findAll();
      res.json(locations);
    } catch (error) {
      console.error("Error: location:list:", error);

      res.status(500).send("There was an error getting the location list");
    }
  },

  /**
   * Get location given an id
   *
   * @function
   * @param req {Object} The request.
   * @param res {Object} The response.
   * @param req.params.id {String} Location id
   * @return {undefined}
   */
  async getById(req, res) {
    const locationId = req.params.id;

    try {
      const location = await Location.findByPk(req.params.id);

      if (location) {
        res.json(location);
      } else {
        res.status(404).send("Location not found");
      }
    } catch (error) {
      console.error(`Error: location:get ${locationId}:`, error);

      res
        .status(500)
        .send(`There was an error getting the location ${locationId}`);
    }
  },

  /**
   * Create location
   *
   * @function
   * @param req {Object} The request.
   * @param req.body {Object} Location object.
   * @param res {Object} The response.
   * @return {undefined}
   */
  async create(req, res) {
    const io = req.app.get('io');

    try {
      const location = await Location.create(req.body);
      res.json(location);

      emitChannelEvent(io, CREATE, location.id)
    } catch (error) {
      console.error("Error: location:create:", error);

      if (error.name === SEQUELIZE_VALIDATION_ERROR) {
        res
          .status(400)
          .send(error.errors.map(({ message }) => message).join(" | "));

        return;
      }

      res.status(500).send("There was an error creation the location");
    }
  },

  /**
   * Update location given an id and the new parameters to be updated
   *
   * @function
   * @param req {Object} The request.
   * @param req.params.id {Number} Location id to be updated.
   * @param req.body {Object} Location object.
   * @param res {Object} The response.
   * @return {undefined}
   */
  async update(req, res) {
    const io = req.app.get('io');

    const { body } = req;
    const locationId = req.params.id;

    try {
      const location = await Location.findByPk(req.params.id);

      if (!location) {
        res.status(404).send("Location not found");

        return;
      }

      await location.update(body, { fields: Object.keys(body) });

      res.json(location);
      emitChannelEvent(io, UPDATE, location.id)
    } catch (error) {
      if (error.name === SEQUELIZE_VALIDATION_ERROR) {
        res
          .status(400)
          .send(error.errors.map(({ message }) => message).join(" | "));

        return;
      }

      console.error(`Error: location:update ${locationId}:`, error);

      res
        .status(500)
        .send(`There was an error updating the location ${locationId}`);
    }
  },

  /**
   * Delete location given an id
   *
   * @function
   * @param req {Object} The request.
   * @param req.params.id {Number} Location id to be deleted.
   * @param res {Object} The response.
   * @return {undefined}
   */
  async delete(req, res) {
    const io = req.app.get('io')
    const locationId = req.params.id;

    try {
      const location = await Location.findByPk(req.params.id);

      if (!location) {
        res.status(404).send("Location not found");

        return;
      }

      await location.destroy();

      res.status(200).send();
      emitChannelEvent(io, DELETE, location.id)
    } catch (error) {
      console.error(`Error: location:delete ${locationId}:`, error);

      res
        .status(500)
        .send(`There was an error deleting the location ${locationId}`);
    }
  }
};
