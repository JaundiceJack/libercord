const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.js');

// Asset Model
const Asset = require('../../models/Asset');

// Route: api/assets
// Desc: get all assets
// Access: public
router.get('/', (req, res) => {
  Asset.find().then(assets => res.json(assets));
});

// Route: api/assets
// Desc: make an asset
// Access: private
router.post('/', auth, (req, res) => {
  const newAsset = new Asset({
    category: req.body.category,
    name:     req.body.name,
    amount:   req.body.amount,
    interest: req.body.interest
  });

  // Save the asset and return it to the client
  newAsset
    .save()
    .then(asset => res.json(asset));
});

// Route: api/assets
// Desc: delete an asset
// Access: private
router.delete('/:id', auth, (req, res) => {
  Asset
  .findById(req.params.id)
  .then(asset => asset.remove().then(() => res.json({success: true})))
  .catch(err => res.status(404).json({success: false}));;
})


module.exports = router;
