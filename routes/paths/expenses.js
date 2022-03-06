// Import Libraries
const express = require('express');
const router = express.Router();
const private = require('../../middleware/authMW.js');
const { getExpenses, getExpense, createExpense, editExpense, removeExpense } =
  require('../actions/expenseController.js');

// GET -> api/expenses/ -> get all of the user's expenses | private
// POST -> api/expenses/ -> create a new expense for the user | private
router.route('/')
  .get(private, getExpenses)
  .post(private, createExpense);
// GET -> api/expenses/id -> get the expense with the given id | private
// PUT -> api/expenses/id -> edit the expense with the given id | private
// DELETE -> api/expenses/id -> remove the expense with the given id | private
router.route('/:id')
  .get(private, getExpense)
  .put(private, editExpense)
  .delete(private, removeExpense);

module.exports = router;
