// Import Libraries
const express = require('express');
const router = express.Router();
const private = require('../../middleware/authMW.js');
const { getCategories, getCategory, createCategory, editCategory, removeCategory } =
  require('../actions/categoryController.js');

// GET -> api/categories/ -> get all of the categories | private
// POST -> api/categories/ -> create a new category | private
router.route('/')
  .get(private, getCategories)
  .post(private, createCategory);
// GET -> api/categories/id -> get the category with the given id | private
// PUT -> api/categories/id -> edit the category with the given id | private
// DELETE -> api/categories/id -> remove the category with the given id | private
router.route('/:id')
  .get(private, getCategory)
  .put(private, editCategory)
  .delete(private, removeCategory);

module.exports = router;
