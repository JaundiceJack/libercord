// Import Libraries
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mailer = require('nodemailer');
const crypto = require('crypto');
// Import route access protection
const auth = require('../../middleware/auth.js');
// Import the User Model
const User = require('../../models/User');

// Grab the json web token key and domain
const jwtk = require('../../config/keys').jwtSecret;
const domain = require('../../config/keys').domain;

// Route:  POST api/auth
// Desc:   authenticate the user for logging in
// Access: public
router.post('/', (req, res) => {
  // Validate the entries
  const { email, password } = req.body;
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

      // Sign a web token for continued access for one hour
      jwt.sign({id: user.id}, jwtk, {expiresIn: 3600},
        (err, token) => {
          if (err) throw err;

          // Resond with the user and token
          return res.json({
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            },
            token: token })
        }
      )
    })
  })
});

// Route: POST api/auth/reset_password
// Desc : Dispatch an email with a link to reset the user's password
// Access: Public
router.post('/reset_password', (req, res) => {
  User.findOne({ email: req.body.email })
  .then(user => {
    if (!user) return res.status(404).json({msg: "No user with that email was found."})
    sendResetMail(req, res, user)})
  .catch( err => { return res.status(401).json(
    {msg: "An error occured while searching for the provided email address."})})
})

// Handle the email for user password resetting
const sendResetMail = (req, res, user) => {
  // Set the reset token to work for one hour (3600000 milliseconds)
  crypto.randomBytes(32, (err, buffer) => {
    if (err) return res.json({msg: "An error occured while generating a reset token."});
    const token = buffer.toString("hex");
    user.passwordResetToken = token;
    user.passwordResetExpire = Date.now() + 3600000;

    // Open an email account to send from
    let transporter = mailer.createTransport({
      host: "127.0.0.1",
      port: 1025,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "jamesmcneilan@protonmail.com",
        pass: require('../../config/keys').noReplyPass,
      },
      tls: { rejectUnauthorized: false }
    });

    // Save the token to the user's account and dispatch the email
    user.save().then(result => {
      transporter.sendMail({
        from: "no_reply@libercrypt.com",
        to: user.email,
        subject: "Libercrypt Password Reset",
        text: "Your password reset link can be found below:",
        html: `<p>If you requested a password reset from libercrypt.com, click
        <a href="${domain}/reset/${token}">here</a> to proceed.</p>`
      })
      .catch(err => { return res.json(
        {msg: "An error occured while sending the reset mail."})})})
    .catch(err => { return res.json(
      {msg: "An error occured while saving user's reset token."})});

    // Give the user confirmation once the email is sent
    return res.json(
      {msg: "A password reset link has been sent to the email you provided."});
  })
}

// Route: GET api/auth/reset_password
// Desc : Go to the reset password page
// Access: Public
router.post('/reset_password/:token', (req, res) => {
  // Find the user by the reset token if still valid
  User.findOne({passwordResetToken: req.params.token,
                passwordResetExpire: { $gt: Date.now() }})
  .then( user => {
    if (!user) return res.status(404).json(
      {msg: "The password reset link has expired. Please try again."});
    const { password } = req.body;

    // Validate and set the new password
    if (!password) return res.status(401).json(
      {msg: "Please enter a new password."});
    if (password.length < 8) return res.status(401).json(
      {msg: "Password must be at least 8 characters."});

    // Hash the new password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
        user.password = hash;
        user.passwordResetToken = null;
        user.passwordResetExpire = null;

        // Save the user and make a web token
        user.save().then(user => {
          jwt.sign({id: user.id}, jwtk, {expiresIn: 3600},
            (err, token) => {
              if (err) throw err;

              // Resond with the user
              return res.json({
                user: { id:              user.id,
                        email:           user.email,
                        startingBalance: user.startingBalance },
                token: token
              })
            }
          )
        })
      })
    })
  })
  .catch( err => console.log(err) );
})

// Route:  GET api/auth
// Desc:   Get user data
// Access: private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
  .select('-password')
  .then(user => {
    if (!user) return res.status(404).json({msg: "User not found."})
    else return res.json(user) })
  .catch(err => { return res.status(404).json({msg: "User not found."})});
})

module.exports = router;
