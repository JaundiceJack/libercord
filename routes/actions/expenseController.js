const trycatch = require('express-async-handler');

// Import the Expense Model
const Expense = require('../../models/Expense.js');

// GET -> api/expenses/ -> get all of the user's expenses | private
const getExpenses = trycatch( async (req, res) => {
  if (req.user) {
    const expenses = await Expense.find({ user_id: req.user._id });
    if (expenses) { res.json(expenses); }
    else { res.status(404); throw new Error("No expenses found."); }
  }
});

// GET -> api/expenses/id -> get the expense with the given id | private
const getExpense = trycatch( async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  if (expense) { res.status(200).json(expense); }
  else { res.status(404); throw new Error("Expense not found."); }
});

// POST -> api/expenses/ -> create a new expense for the user | private
const createExpense = trycatch( async (req, res) => {
  const newExpense = new Expense(formatExpense(req.body, req.user));
  const savedExpense = await newExpense.save();
  if (savedExpense) { res.status(200).json(savedExpense); }
  else { res.status(404); throw new Error("Unable to save new expense."); }
});

// PUT -> api/expenses/id -> edit the expense with the given id | private
const editExpense = trycatch( async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  if (expense) {
    Object.assign(expense, formatExpense(req.body, req.user));
    const savedExpense = await expense.save();
    if (savedExpense) { res.status(200).json(savedExpense); }
    else { res.status(400); throw new Error("Unable to edit selected expense."); }
  } else { res.status(404); throw new Error("Unable to locate selected expense."); }
});

// DELETE -> api/expenses/id -> remove the expense with the given id | private
const removeExpense = trycatch( async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  if (expense) {
    const removed = await expense.remove();
    if (removed) { res.status(200).json(req.params.id); }
    else { res.status(400); throw new Error("Unable to remove selected expense."); }
  } else { res.status(404); throw new Error("Unable to locate selected expense."); }
});

const formatExpense = (body, user) => {
  return {
    name:         body.name.toLowerCase(),
    user_id:      user ? user._id : undefined,
    category:     body.category,
    location:     body.location.toLowerCase(),
    value:        Number(body.value),
    date:   new Date(body.date + 'T00:00:00'),
    currency: body.currency
  };
}

module.exports = { getExpenses, getExpense, createExpense, editExpense, removeExpense };
