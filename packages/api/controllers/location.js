module.exports = {
  get(req, res) {
    res.json([]);
  },
  getById(req, res) {
    res.status(404).send("Resource Not Found");
  },
  create(req, res) {
    res.status(404).send("Resource Not Found");
  },
  update(req, res) {
    res.status(404).send('Resource Not Found')
  },
  delete(req, res) {
    res.status(404).send('Resource Not Found')
  }
};
