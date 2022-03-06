const trycatch = require('express-async-handler');

// Import the Location Model
const Location = require('../../models/Location.js');

// GET -> api/locations/ -> get all of the user's locations | private
const getLocations = trycatch( async (req, res) => {
  if (req.user) {
    const locations = await Location.find({ user_id: req.user._id });
    if (locations) { res.json(locations); }
    else { res.status(404); throw new Error("No locations found."); }
  }
});

// GET -> api/locations/id -> get the location with the given id | private
const getLocation = trycatch( async (req, res) => {
  const location = await Location.findById(req.params.id);
  if (location) { res.status(200).json(location); }
  else { res.status(404); throw new Error("Location not found."); }
});

// POST -> api/locations/ -> create a new location for the user | private
const createLocation = trycatch( async (req, res) => {
  const newLocation = new Location(formatLocation(req.body, req.user));
  const savedLocation = await newLocation.save();
  if (savedLocation) { res.status(200).json(savedLocation); }
  else { res.status(404); throw new Error("Unable to save new location."); }
});

// PUT -> api/locations/id -> edit the location with the given id | private
const editLocation = trycatch( async (req, res) => {
  const location = await Location.findById(req.params.id);
  if (location) {
    const entries = formatLocation(req.body, req.user);
    Object.assign(location, entries);
    const savedLocation = await location.save();
    if (savedLocation) { res.status(200).json(savedLocation); }
    else { res.status(400); throw new Error("Unable to edit selected location."); }
  } else { res.status(404); throw new Error("Unable to locate selected location."); }
});

// DELETE -> api/locations/id -> remove the location with the given id | private
const removeLocation = trycatch( async (req, res) => {
  const location = await Location.findById(req.params.id);
  if (location) {
    const removed = await location.remove();
    if (removed) { res.status(200).json(req.params.id); }
    else { res.status(400); throw new Error("Unable to remove selected location."); }
  } else { res.status(404); throw new Error("Unable to locate selected location."); }
});

const formatLocation = (body, user) => {
  return {
    name:    body.name.toLowerCase(),
    user_id: user ? user._id : undefined,
  };
}

module.exports = { getLocations, getLocation, createLocation, editLocation, removeLocation };
