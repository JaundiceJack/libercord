const trycatch = require('express-async-handler');

// Import the Category Model
const Category = require('../../models/Category.js');

// GET -> api/categories/ -> get all of the categories | private
const getCategories = trycatch( async (req, res) => {
  const categories = await Category.find({ user_id: req.user._id });
  if (categories) { res.json(categories); }
  else { res.status(404); throw new Error("No categories found."); }
});

// GET -> api/categories/id -> get the category with the given id | private
const getCategory = trycatch( async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) { res.status(200).json(category); }
  else { res.status(404); throw new Error("Category not found."); }
});

// POST -> api/categories/ -> create a new category | private
const createCategory = trycatch( async (req, res) => {
  const newCategory = new Category(formatCategory(req.body));
  const savedCategory = await newCategory.save();
  if (savedCategory) { res.status(200).json(savedCategory); }
  else { res.status(404); throw new Error("Unable to save new category."); }
});

// PUT -> api/categories/id -> edit the category with the given id | private
const editCategory = trycatch( async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    Object.assign(category, formatCategory(req.body));
    const savedCategory = await category.save();
    if (savedCategory) { res.status(200).json(savedCategory); }
    else { res.status(400); throw new Error("Unable to edit selected category."); }
  } else { res.status(404); throw new Error("Unable to locate selected category."); }
});

// DELETE -> api/categories/id -> remove the category with the given id | private
const removeCategory = trycatch( async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    const removed = await category.remove();
    if (removed) { res.status(200).json(req.params.id); }
    else { res.status(400); throw new Error("Unable to remove selected category."); }
  } else { res.status(404); throw new Error("Unable to locate selected category."); }
});

const formatCategory = (body, user) => {
  return {
    type:    body.type,
    name:    body.name.toLowerCase(),
    user_id: user ? user._id : undefined,
  };
}

module.exports = { getCategories, getCategory, createCategory, editCategory, removeCategory };
