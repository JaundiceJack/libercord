// Import Libraries
const express = require('express');
const router = express.Router();
const private = require('../../middleware/authMW.js');
const { getIncomes, getIncome, createIncome, editIncome, removeIncome } =
  require('../actions/incomeController.js');

// GET -> api/incomes/ -> get all of the user's incomes | private
// POST -> api/incomes/ -> create a new income for the user | private
router.route('/')
  .get(private, getIncomes)
  .post(private, createIncome);
// GET -> api/incomes/id -> get the income with the given id | private
// PUT -> api/incomes/id -> edit the income with the given id | private
// DELETE -> api/incomes/id -> remove the income with the given id | private
router.route('/:id')
  .get(private, getIncome)
  .put(private, editIncome)
  .delete(private, removeIncome);

module.exports = router;
