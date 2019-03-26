const express = require("express");
const LocationController = require("../controllers/location");

const router = express();

router.get("/", LocationController.get);
router.get("/:id", LocationController.getById);
router.post("/", LocationController.create);
router.put("/:id", LocationController.update);
router.delete("/:id", LocationController.delete);

module.exports = router