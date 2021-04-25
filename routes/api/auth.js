// Import Libraries
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Import route access protection
const auth = require('../../middleware/auth.js');
// Import the User Model
const User = require('../../models/User');

// Grab the json web token key
const jwtk = require('../../config/keys').jwtSecret;

// Route:  POST api/auth
// Desc:   authenticate the user for logging in
// Access: public
router.post('/', (req, res) => {
  // Get the user entries from the request body
  const { email, password } = req.body;
  // Validate the entries
  if (!email || !password)
    return res.status(400).json({msg: "Please enter all fields."});
  // Check for the user by email
  User.findOne({ email })
  .then(user => {
    if(!user) return res.status(401).json({msg: "Incorrect email or password."});
    // Compare the entered password to the stored one
    bcrypt.compare(password, user.password)
    .then(isMatch => {
      if (!isMatch) return res.status(401).json({msg: "Incorrect email or password."});
      // Sign a web token for continued access
      jwt.sign({id: user.id}, jwtk, {expiresIn: 3600},
        (err, token) => {
          if (err) throw err;
          // Resond with the user
          return res.json({ user: { id: user.id, name: user.name, email: user.email },
                            token: token})
        }
      )
    })
  })
});

// Route:  GET api/auth
// Desc:   Get user data
// Access: private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
  .select('-password')
  .then(user => res.json(user));
})

module.exports = router;
