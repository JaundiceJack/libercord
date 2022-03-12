const trycatch = require('express-async-handler');

// Import the Category Model
const Category = require('../../models/Category.js');
const Expense = require('../../models/Expense.js');
const Income = require('../../models/Income.js');

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
  const existing = await Category.findOne(
    { user_id: req.user._id, name: req.body.name.toLowerCase(), type: req.body.type });
  if (!existing) {
    const newCategory = new Category(formatCategory(req.body, req.user));
    const savedCategory = await newCategory.save();
    if (savedCategory) { res.status(200).json(savedCategory); }
    else { res.status(404); throw new Error("Unable to save new category."); }
  } else { res.status(200).json(existing); }
});

// PUT -> api/categories/id -> edit the category with the given id | private
const editCategory = trycatch( async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    Object.assign(category, formatCategory(req.body));
    const savedCategory = await category.save();
    if (savedCategory) { res.status(200).json(savedCategory); }
    else { res.status(400); throw new Error("Unable to edit the selected category."); }
  } else { res.status(404); throw new Error("Unable to locate the selected category."); }
});

// DELETE -> api/categories/id -> remove the category with the given id | private
const removeCategory = trycatch( async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    if (!category.isDefault) {
      // Remove the category from each Income/Expense and set the default category
      const defaultedIncomes = await defaultIncomeCategories(req.user._id, category._id);
      const defaultedExpenses = await defaultExpenseCategories(req.user._id, category._id);
      if (defaultedIncomes === true && defaultedExpenses === true) {
        const removed = await category.remove();
        if (removed) { res.status(200).json(req.params.id);
        } else { res.status(400); throw new Error(defaultedIncomes === true ? defaultedExpenses : defaultedIncomes); }
      } else { res.status(400); throw new Error("Unable to remove the selected category."); }
    } else { res.status(400); throw new Error("Unable to remove the default category."); }
  } else { res.status(404); throw new Error("Unable to locate the selected category."); }
});

// Remove the category from each Income and set the default category
const defaultIncomeCategories = (userId, deletedCategoryId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const incomes = await Income.find({ user_id: userId, category: deletedCategoryId });
      const defaultCategory = await Category.findOne({ user_id: userId, isDefault: true, type: 'income' });
      if (!incomes) resolve(true)
      else if (incomes && defaultCategory) {
        incomes.forEach(async income => {
          income.category = defaultCategory._id;
          await income.save()
        });
        resolve(true);
      } else { reject("No default category, deletion canceled.") }
    } catch (e) { reject(e) }
  })
}

// Remove the category from each Expense and set the default category
const defaultExpenseCategories = (userId, deletedCategoryId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const expenses = await Expense.find({ user_id: userId, category: deletedCategoryId });
      const defaultCategory = await Category.findOne({ user_id: userId, isDefault: true, type: 'expense' });
      if (!expenses) resolve(true)
      else if (expenses && defaultCategory) {
        expenses.forEach(async expense => {
          expense.category = defaultCategory._id;
          await expense.save()
        });
        resolve(true);
      } else { reject("No default category, deletion canceled.") }
    } catch (e) { reject(e) }
  })
}

const formatCategory = (body, user) => {
  return {
    type:    body.type,
    name:    body.name.toLowerCase(),
    user_id: user ? user._id : undefined,
  };
}

module.exports = { getCategories, getCategory, createCategory, editCategory, removeCategory };
