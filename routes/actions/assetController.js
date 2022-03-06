const trycatch = require('express-async-handler');

// Import the Asset Model
const Asset = require('../../models/Asset.js');

// GET -> api/assets/ -> get all of the user's assets | private
const getAssets = trycatch( async (req, res) => {
  if (req.user) {
    const assets = await Asset.find({ user_id: req.user._id });
    if (assets) { res.json(assets); }
    else { res.status(404); throw new Error("No assets found."); }
  }
});

// GET -> api/assets/id -> get the asset with the given id | private
const getAsset = trycatch( async (req, res) => {
  const asset = await Asset.findById(req.params.id);
  if (asset) { res.status(200).json(asset); }
  else { res.status(404); throw new Error("Asset not found."); }
});

// POST -> api/assets/ -> create a new asset for the user | private
const createAsset = trycatch( async (req, res) => {
  const newAsset = new Asset(formatAsset(req.body, req.user));
  const savedAsset = await newAsset.save();
  if (savedAsset) { res.status(200).json(savedAsset); }
  else { res.status(404); throw new Error("Unable to save new asset."); }
});

// PUT -> api/assets/id -> edit the asset with the given id | private
const editAsset = trycatch( async (req, res) => {
  const asset = await Asset.findById(req.params.id);
  if (asset) {
    Object.assign(asset, formatAsset(req.body, req.user));
    const savedAsset = await asset.save();
    if (savedAsset) { res.status(200).json(savedAsset); }
    else { res.status(400); throw new Error("Unable to edit selected asset."); }
  } else { res.status(404); throw new Error("Unable to locate selected asset."); }
});

// DELETE -> api/assets/id -> remove the asset with the given id | private
const removeAsset = trycatch( async (req, res) => {
  const asset = await Asset.findById(req.params.id);
  if (asset) {
    const removed = await asset.remove();
    if (removed) { res.status(200).json(req.params.id); }
    else { res.status(400); throw new Error("Unable to remove selected asset."); }
  } else { res.status(404); throw new Error("Unable to locate selected asset."); }
});

const formatAsset = (body, user) => {
  return {
    name:     body.name,
    user_id:  user ? user._id : null,
    category: body.category,
    amount: {
      owned:      Number(body.amount.owned),
      units:      body.amount.units,
      unit_price: Number(body.amount.unit_price),
    },
    date: new Date(body.date + 'T00:00:00'),
    currency: body.currency,
    interest:     Number(body.interest)
  };
}

module.exports = { getAssets, getAsset, createAsset, editAsset, removeAsset };
