const trycatch = require('express-async-handler');

// Import the Location Model
const Location = require('../../models/Location.js');
const Expense = require('../../models/Expense.js');

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
  const existing = await Location.findOne(
    { user_id: req.user._id, name: req.body.name.toLowerCase() });
  if (!existing) {
    const newLocation = new Location(formatLocation(req.body, req.user));
    const savedLocation = await newLocation.save();
    if (savedLocation) { res.status(200).json(savedLocation); }
    else { res.status(404); throw new Error("Unable to save new location."); }
  } else { res.status(200).json(existing); }
});

// PUT -> api/locations/id -> edit the location with the given id | private
const editLocation = trycatch( async (req, res) => {
  const location = await Location.findById(req.params.id);
  if (location) {
    const entries = formatLocation(req.body, req.user);
    Object.assign(location, entries);
    const savedLocation = await location.save();
    if (savedLocation) { res.status(200).json(savedLocation); }
    else { res.status(400); throw new Error("Unable to edit the selected location."); }
  } else { res.status(404); throw new Error("Unable to locate the selected location."); }
});

// DELETE -> api/locations/id -> remove the location with the given id | private
const removeLocation = trycatch( async (req, res) => {
  const location = await Location.findById(req.params.id);
  if (location) {
    if (!location.isDefault || req.user.isAdmin) {
      // Remove the location from each Expense and set the default location
      const expensesDefaulted = await defaultExpenseLocations(req.user._id, location._id);
      if (expensesDefaulted === true) {
        const removed = await location.remove();
        if (removed) { res.status(200).json(req.params.id);
        } else { res.status(400); throw new Error("Unable to remove the selected location."); }
      } else { res.status(400); throw new Error(expensesDefaulted); }
    } else { res.status(400); throw new Error("Unable to remove the default location."); }
  } else { res.status(404); throw new Error("Unable to locate the selected location."); }
});

// Remove the location from each Expense and set the default location
const defaultExpenseLocation = (userId, deletedLocationId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const expenses = await Expense.find({ user_id: userId, location: deletedLocationId });
      const defaultLocation = await Location.findOne({ user_id: userId, isDefault: true });
      if (!expenses) resolve(true)
      else if (expenses && defaultLocation) {
        expenses.forEach(async expense => {
          expense.location = defaultLocation._id;
          await expense.save()
        });
        resolve(true);
      } else { reject("No default location, deletion canceled.") }
    } catch (e) { reject(e) }
  })
}

const formatLocation = (body, user) => {
  return {
    name:    body.name.toLowerCase(),
    user_id: user ? user._id : undefined,
  };
}

module.exports = { getLocations, getLocation, createLocation, editLocation, removeLocation };
