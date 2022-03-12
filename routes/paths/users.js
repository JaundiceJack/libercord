// Import Libraries
const express = require('express');
const router = express.Router();
const private = require('../../middleware/authMW');
const { loginUser, getProfile, updateProfile, registerUser } =
  require('../actions/userController.js');

// POST api/users/ | create a new user | public
router.route('/')
  .post(registerUser);
// POST: api/users/login | authorize user & get token | public
router.route('/login')
  .post(loginUser);
// GET: api/users/profile | get the user's information | private
// PUT: api/users/profile | update the user's information | private
router.route('/profile')
  .get(private, getProfile)
  .put(private, updateProfile);

module.exports = router;
