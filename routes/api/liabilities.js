// Import Libraries
const express = require('express');
const router = express.Router();
// Import route access protection
const auth = require('../../middleware/auth');
// Import the Liability Model
const Liability = require('../../models/Liability');

// Route:  GET api/liabilities
// Desc:   get all of the user's liabilities
// Access: private
router.get('/:user_id', auth, (req, res) => {
  Liability.find({ user_id: req.params.user_id })
  .then(liabilities => res.json(liabilities));
});

// Route:  POST api/liabilities
// Desc:   make a liability
// Access: private
router.post('/', auth, (req, res) => {
  const newLiability = new Liability({
    user_id:  req.body.user_id,
    category: req.body.category,
    name:     req.body.name,
    value:    req.body.value,
    date:     req.body.date,
    interest: req.body.interest
  });

  // Save the liability and return it to the client
  newLiability.save()
  .then(liability => res.json(liability))
  .catch(err => res.status(400).json({msg: "Failed to add new liability."}));
});

// Route:  DELETE api/liabilities
// Desc:   delete a liability
// Access: private
router.delete('/:id', auth, (req, res) => {
  Liability
  .findById(req.params.id)
  .then(liability => liability.remove().then(() => res.json({success: true})))
  .catch(err => res.status(404).json({success: false}));;
})


module.exports = router;
