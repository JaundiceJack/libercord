const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth.js');

// User Model
const User = require('../../models/User');

// Route:  POST api/users
// Desc:   register a new user
// Access: public
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password)
    return res.status(400).json({msg: "Please enter all fields."});

  // Check for existing credentials
  User.findOne({ email })
  .then(user => {
    if(user) return res.status(400).json({msg: "User already exists."});
    const newUser = new User({ name, email, password });
    // Encrypt the password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        // Save the user and make a web token
        newUser.save()
        .then(user => {
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
    })
  })
});

module.exports = router;
