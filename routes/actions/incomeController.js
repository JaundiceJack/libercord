const trycatch = require('express-async-handler');

// Import the Income Model
const Income = require('../../models/Income.js');

// GET -> api/incomes/ -> get all of the user's incomes | private
const getIncomes = trycatch( async (req, res) => {
  if (req.user) {
    const incomes = await Income.find({ user_id: req.user._id });
    if (incomes) { res.json(incomes); }
    else { res.status(404); throw new Error("No incomes found."); }
  }
});

// GET -> api/incomes/id -> get the income with the given id | private
const getIncome = trycatch( async (req, res) => {
  const income = await Income.findById(req.params.id);
  if (income) { res.status(200).json(income); }
  else { res.status(404); throw new Error("Income not found."); }
});

// POST -> api/incomes/ -> create a new income for the user | private
const createIncome = trycatch( async (req, res) => {
  const newIncome = new Income(formatIncome(req.body, req.user));
  const savedIncome = await newIncome.save();
  if (savedIncome) { res.status(200).json(savedIncome); }
  else { res.status(404); throw new Error("Unable to save new income."); }
});

// PUT -> api/incomes/id -> edit the income with the given id | private
const editIncome = trycatch( async (req, res) => {
  const income = await Income.findById(req.params.id);
  if (income) {
    const entries = formatIncome(req.body, req.user);
    Object.assign(income, entries);
    const savedIncome = await income.save();
    if (savedIncome) { res.status(200).json(savedIncome); }
    else { res.status(400); throw new Error("Unable to edit selected income."); }
  } else { res.status(404); throw new Error("Unable to locate selected income."); }
});

// DELETE -> api/incomes/id -> remove the income with the given id | private
const removeIncome = trycatch( async (req, res) => {
  const income = await Income.findById(req.params.id);
  if (income) {
    const removed = await income.remove();
    if (removed) { res.status(200).json(req.params.id); }
    else { res.status(400); throw new Error("Unable to remove selected income."); }
  } else { res.status(404); throw new Error("Unable to locate selected income."); }
});

const formatIncome = (body, user) => {
  return {
    name:          body.name.toLowerCase(),
    user_id:       user ? user._id : undefined,
    category:      body.category,
    source:        body.source.toLowerCase(),
    value:         Number(body.value),
    date: new Date(body.date + 'T00:00:00'),
    currency:  body.currency,
  };
}

module.exports = { getIncomes, getIncome, createIncome, editIncome, removeIncome };
