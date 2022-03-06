// Import Libraries
const express = require('express');
const router = express.Router();
const private = require('../../middleware/authMW.js');
const { getLiabilities, getLiability, createLiability, editLiability, removeLiability } =
  require('../actions/liabilityController.js');

// GET -> api/liabilities/ -> get all of the user's liabilities | private
// POST -> api/liabilities/ -> create a new liability for the user | private
router.route('/')
  .get(private, getLiabilities)
  .post(private, createLiability);
// GET -> api/liabilities/id -> get the liability with the given id | private
// PUT -> api/liabilities/id -> edit the liability with the given id | private
// DELETE -> api/liabilities/id -> remove the liability with the given id | private
router.route('/:id')
  .get(private, getLiability)
  .put(private, editLiability)
  .delete(private, removeLiability);

module.exports = router;
