const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.js');

// Liability Model
const Liability = require('../../models/Liability');

// Route: api/liabilitys
// Desc: get all liabilitys
// Access: public
router.get('/', (req, res) => {
  Liability.find().then(liabilitys => res.json(liabilitys));
});

// Route: api/liabilitys
// Desc: make a liability
// Access: private
router.post('/', auth, (req, res) => {
  const newLiability = new Liability({
    name: req.body.name,
    category: req.body.category,
    value:   req.body.value,
    date: req.body.date,
    interest: req.body.interest
  });

  // Save the liability and return it to the client
  newLiability
    .save()
    .then(liability => res.json(liability));
});

// Route: api/liabilitys
// Desc: delete a liability
// Access: private
router.delete('/:id', auth, (req, res) => {
  Liability
  .findById(req.params.id)
  .then(liability => liability.remove().then(() => res.json({success: true})))
  .catch(err => res.status(404).json({success: false}));;
})


module.exports = router;
