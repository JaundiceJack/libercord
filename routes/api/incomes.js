// Import Libraries
const express = require('express');
const router = express.Router();
// Import route access protection
const auth = require('../../middleware/auth');
// Import the Income Model
const Income = require('../../models/Income');

// Route:  GET api/incomes
// Desc:   get all of the user's incomes
// Access: private
router.get('/:user_id', auth, (req, res) => {
  Income.find({ user_id: req.params.user_id })
  .then(incomes => res.json(incomes));
});

// Route:  POST api/incomes
// Desc:   make an income
// Access: private
router.post('/', auth, (req, res) => {
  const newIncome = new Income({
    user_id:  req.body.user_id,
    category: req.body.category,
    source:   req.body.source,
    date:     req.body.date,
    value:    req.body.value
  });

  // Save the income and return it to the client
  newIncome.save()
  .then(income => res.json(income))
  .catch(err => res.status(400).json({msg: "Failed to add new income."}));
});


// Route: POST api/incomes/_id
// Desc:  edit an income
// Access: private
router.post('/:id', auth, (req, res) => {
  // Find the selected income
  Income.findById(req.params.id)
  .then(income => {
    // validate the edited entries

    // set the new income properties
    income.category = req.body.category;
    income.source = req.body.source;
    income.date     = req.body.date;
    income.value    = req.body.value;
    // save the edited income
    income.save()
    .then(inc => res.json(inc))
    .catch(err => res.status(404).json({msg: 'Unable to save edited income.'}));
  })
  .catch(err => res.status(404).json({msg: 'Unable to edit income.'}))
})


// Route:  DELETE api/incomes
// Desc:   delete an income
// Access: private
router.delete('/:id', auth, (req, res) => {
  Income
  .findById(req.params.id)
  .then(income => income.remove().then(() => res.json({success: true})))
  .catch(err => res.status(404).json({success: false}));;
})



module.exports = router;
