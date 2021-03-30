const express = require('express');
const router = express.Router();

// Income Model
const Income = require('../../models/Income');

// Route: api/incomes
// Desc: get all incomes
// Access: public
router.get('/', (req, res) => {
  Income.find().then(incomes => res.json(incomes));
});

// Route: api/incomes
// Desc: make an income
// Access: public
router.post('/', (req, res) => {
  const newIncome = new Income({
    category: req.body.category,
    value:   req.body.value,
    date: req.body.date
  });

  // Save the income and return it to the client
  newIncome
    .save()
    .then(income => res.json(income));
});

// Route: api/incomes
// Desc: delete an income
// Access: public
router.delete('/:id', (req, res) => {
  Income
  .findById(req.params.id)
  .then(income => income.remove().then(() => res.json({success: true})))
  .catch(err => res.status(404).json({success: false}));;
})


module.exports = router;
