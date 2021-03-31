const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth.js');

// User Model
const User = require('../../models/User');

// Route:  POST api/auth
// Desc:   authenticate the user for logging in
// Access: public
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!email || !password)
    return res.status(400).json({msg: "Please enter all fields."});

  // Check for existing credentials
  User.findOne({ email })
  .then(user => {
    if(!user) return res.status(400).json({msg: "User not found."});
    // Compare the entered password to the stored one
    bcrypt.compare(password, user.password)
    .then(isMatch => {
      if (!isMatch) return res.status(400).json({msg: "Incorrect password."});
      // Sign a web token for continued access
      jwt.sign(
        {id: user.id},
        config.get('jwtSecret'),
        {expiresIn: 3600},
        (err, token) => {
          if (err) throw err;
          // Resond with the new user
          res.json({
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            }
          })
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
