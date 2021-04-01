// Import Libraries
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
// Import route access protection
const auth = require('../../middleware/auth.js');
// Import the User Model
const User = require('../../models/User');

// Route:  POST api/users
// Desc:   register a new user
// Access: public
router.post('/', (req, res) => {
  // Get the user entries from the request body
  const { name, email, password } = req.body;
  // Validate the entries
  if (!name || !email || !password)
    return res.status(400).json({msg: "Please enter all fields."});
  // Check for a user with the entered email to prevent duplicates
  User.findOne({ email })
  .then(user => {
    if(user) return res.status(400).json({msg: "User already exists."});
    // If no other user was found, encrypt the password and make the new user
    const newUser = new User({ name, email, password });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        // Save the user and make a web token
        newUser.save()
        .then(user => {
          jwt.sign({id: user.id}, config.get('jwtSecret'), {expiresIn: 3600},
            (err, token) => {
              if (err) throw err;
              // Resond with the new user
              return res.json({user: { id: user.id, name: user.name, email: user.email }})
            }
          )
        })
      })
    })
  })
});

module.exports = router;
