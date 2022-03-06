// Import Libraries
const express = require('express');
const router = express.Router();
const private = require('../../middleware/authMW.js');
const { getLocations, getLocation, createLocation, editLocation, removeLocation } =
  require('../actions/locationController.js');

// GET -> api/locations/ -> get all of the user's locations | private
// POST -> api/locations/ -> create a new location for the user | private
router.route('/')
  .get(private, getLocations)
  .post(private, createLocation);
// GET -> api/locations/id -> get the location with the given id | private
// PUT -> api/locations/id -> edit the location with the given id | private
// DELETE -> api/locations/id -> remove the location with the given id | private
router.route('/:id')
  .get(private, getLocation)
  .put(private, editLocation)
  .delete(private, removeLocation);

module.exports = router;
