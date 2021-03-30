const express = require('express');
const router = express.Router();

// Expense Model
const Expense = require('../../models/Expense');

// Route: api/expenses
// Desc: get all expenses
// Access: public
router.get('/', (req, res) => {
  Expense.find().then(expenses => res.json(expenses));
});

// Route: api/expenses
// Desc: make an expense
// Access: public
router.post('/', (req, res) => {
  const newExpense = new Expense({
    category: req.body.category,
    date:     req.body.date,
    value:   req.body.value,
  });

  // Save the expense and return it to the client
  newExpense
    .save()
    .then(expense => res.json(expense));
});

// Route: api/expenses
// Desc: delete an expense
// Access: public
router.delete('/:id', (req, res) => {
  Expense
  .findById(req.params.id)
  .then(expense => expense.remove().then(() => res.json({success: true})))
  .catch(err => res.status(404).json({success: false}));;
})


module.exports = router;
