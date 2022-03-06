// Import Libraries
const express = require('express');
const router = express.Router();
const private = require('../../middleware/authMW.js');
const { getAssets, getAsset, createAsset, editAsset, removeAsset } =
  require('../actions/assetController.js');

//1. Import coingecko-api
//const CoinGecko = require('coingecko-api');

//2. Initiate the CoinGecko API Client
//const CoinGeckoClient = new CoinGecko();

//3. Make calls
//var func = async() => {
//  let data = await CoinGeckoClient.ping();
//};

// GET -> api/assets/ -> get all of the user's assets | private
// POST -> api/assets/ -> create a new asset for the user | private
router.route('/')
  .get(private, getAssets)
  .post(private, createAsset);
// GET -> api/assets/id -> get the asset with the given id | private
// PUT -> api/assets/id -> edit the asset with the given id | private
// DELETE -> api/assets/id -> remove the asset with the given id | private
router.route('/:id')
  .get(private, getAsset)
  .put(private, editAsset)
  .delete(private, removeAsset);

module.exports = router;
