// Import Libraries
const express = require('express');
const router = express.Router();
const private = require('../../middleware/authMW');
const { loginUser, getProfile, updateProfile, registerUser,
  sendResetLink, resetPassword } = require('../actions/userController.js');

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

// POST: api/users/password-reset | send a reset link to the user's email | public
router.route('/password-reset')
  .post(sendResetLink);

// POST: api/users/password-reset/:id/:token |
// When the user clicks the email link, reset their password
router.route('/password-reset/:id/:token')
  .post(resetPassword)

module.exports = router;
