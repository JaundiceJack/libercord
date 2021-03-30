const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
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
    .then(user, err => {
      if(user) return res.status(400).json({msg: "User already exists."});
      else {
        const newUser = new User({ name, email, password });

        // Hash the password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            else {
              newUser.password = hash;
              newUser.save().then(user => {
                res.json({
                  user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                  }
                })
              })
            }
          })
        })


      }
    })
});

module.exports = router;
