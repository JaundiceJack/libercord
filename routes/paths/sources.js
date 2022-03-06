// Import Libraries
const express = require('express');
const router = express.Router();
const private = require('../../middleware/authMW.js');
const { getSources, getSource, createSource, editSource, removeSource } =
  require('../actions/sourceController.js');

// GET -> api/sources/ -> get all of the user's sources | private
// POST -> api/sources/ -> create a new source for the user | private
router.route('/')
  .get(private, getSources)
  .post(private, createSource);
// GET -> api/sources/id -> get the source with the given id | private
// PUT -> api/sources/id -> edit the source with the given id | private
// DELETE -> api/sources/id -> remove the source with the given id | private
router.route('/:id')
  .get(private, getSource)
  .put(private, editSource)
  .delete(private, removeSource);

module.exports = router;
