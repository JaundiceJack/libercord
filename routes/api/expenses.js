// Import Libraries
const express = require('express');
const router = express.Router();
// Import route access protection
const auth = require('../../middleware/auth');
// Import the Expense Model
const Expense = require('../../models/Expense');

// Route:  GET api/expenses
// Desc:   get all of the user's expenses
// Access: private
router.get('/:user_id', auth, (req, res) => {
  Expense.find({ user_id: req.params.user_id })
  .then(expenses => res.json(expenses));
});

// Route:  POST api/expenses
// Desc:   make an expense
// Access: private
router.post('/', auth, (req, res) => {
  // Validate entries

  // Create the new expense
  const newExpense = new Expense({
    user_id:  req.body.user_id,
    category: req.body.category,
    location: req.body.location,
    name:     req.body.name,
    date:     req.body.date,
    value:    req.body.value
  });
  // Save the expense and return it to the client
  newExpense.save()
  .then(expense => res.json(expense))
  .catch(err => res.status(400).json({msg: "Failed to add new expense."}));
});

// Route: POST api/expenses/_id
// Desc:  edit an expense
// Access: private
router.post('/:id', auth, (req, res) => {
  // Find the selected expense
  Expense.findById(req.params.id)
  .then(expense => {
    // validate the edited entries

    // set the new expense properties
    expense.category = req.body.category;
    expense.location = req.body.location;
    expense.name     = req.body.name;
    expense.date     = req.body.date;
    expense.value    = req.body.value;
    // save the edited expense
    expense.save()
    .then(exp => res.json(exp))
    .catch(err => res.status(404).json({msg: 'Unable to save edited expense.'}));
  })
  .catch(err => res.status(404).json({msg: 'Unable to edit expense.'}))
})

// Route:  DELETE api/expenses
// Desc:   delete an expense
// Access: private
router.delete('/:id', auth, (req, res) => {
  Expense
  .findById(req.params.id)
  .then(expense => expense.remove().then(() => res.json({success: true})))
  .catch(err => res.status(404).json({success: false}));;
})



module.exports = router;
