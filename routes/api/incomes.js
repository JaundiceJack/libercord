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
  // Validate entries
  if ( req.body.category === "" || req.body.category === null )
    res.status(400).json({msg: "Income Entry Failure: No category was selected."})
  if ( typeof req.body.value === 'number' )
    res.status(400).json({msg: "Income Entry Failure: Amount paid was not a number."})
  if ( req.body.value === "" || req.body.value === null )
    res.status(400).json({msg: "Income Entry Failure: Amount paid was blank."})
  if ( req.body.date instanceof Date && !isNaN(req.body.date.valueOf()) )
    res.status(400).json({msg: "Income Entry Failure: Selected date was invalid."})

  // Create the new income
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
  .catch(err =>
    res.status(404).json({msg: "Unable to add a new income at this time."}));
});

// Route: POST api/incomes/_id
// Desc:  edit an income
// Access: private
router.post('/:id', auth, (req, res) => {
  // Find the selected income
  Income.findById(req.params.id)
  .then(income => {
    // Validate the edited entries
    if ( req.body.category === "" || req.body.category === null )
      res.status(400).json({msg: "Income Edit Failure: No category was selected."})
    if ( typeof req.body.value === 'number' )
      res.status(400).json({msg: "Income Edit Failure: Amount paid was not a number."})
    if ( req.body.value === "" || req.body.value === null )
      res.status(400).json({msg: "Income Edit Failure: Amount paid was blank."})
    if ( req.body.date instanceof Date && !isNaN(req.body.date.valueOf()) )
      res.status(400).json({msg: "Income Edit Failure: Selected date was invalid."})

    // Set the new income properties
    income.category = req.body.category;
    income.source   = req.body.source;
    income.date     = req.body.date;
    income.value    = req.body.value;

    // Save the edited income
    income.save()
    .then(inc => res.json(inc))
    .catch(err =>
      res.status(404).json({msg: 'Unable to edit the selected income at this time.'}));
  })
  .catch(err => res.status(404).json({msg: 'Unable to find the selected income.'}))
})

// Route:  DELETE api/incomes
// Desc:   delete an income
// Access: private
router.delete('/:id', auth, (req, res) => {
  Income
  .findById(req.params.id)
  .then(income => income.remove().then(() => res.json({success: true})))
  .catch(err =>
    res.status(404).json({success: false, msg: "Unable to delete the selected expense at this time."}));;
})

module.exports = router;
