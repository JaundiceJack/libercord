const trycatch = require('express-async-handler');
const genToken = require('../../jwt/generateToken.js');
const sendEmail = require("../../utils/sendMail.js");
const crypto = require("crypto");

// Create models
const User = require('../../models/User.js');
const ResetToken = require('../../models/ResetToken.js');
const Category = require('../../models/Category.js');
const Location = require('../../models/Location.js');
const Source   = require('../../models/Source.js');

// POST: api/users/login | authorize user & get token | public
const loginUser = trycatch( async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await user.matchPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      balance: user.balance,
      token: genToken(user._id)
    }); }
  else { res.status(401); throw new Error("Invalid username or password."); };
});

// Set up user's default properties upon account creation
const createDefaults = user => {
  return new Promise(async (resolve, reject) => {
    try {
      const defaultIncomeCategory = await Category
        .create({ name: 'full-time employment',
          user_id: user._id, isDefault: true, type: 'income' });
      const defaultExpenseCategory = await Category
        .create({ name: 'groceries',
          user_id: user._id, isDefault: true, type: 'expense' });
      const defaultLocation = await Location
        .create({ name: 'store',
          user_id: user._id, isDefault: true });
      const defaultSource = await Source
        .create({ name: 'job',
          user_id: user._id, isDefault: true });
      // Return true if all were created, and false if not
      const success = (defaultIncomeCategory && defaultExpenseCategory &&
        defaultLocation && defaultSource);
      resolve(success);
    } catch (e) { reject(e); }
  })
}

// POST api/users/ | create a new user | public
const registerUser = trycatch( async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    const newUser = await User.create({ name, email, password });
    if (newUser) {
      const setupSucces = await createDefaults(newUser);
      if (setupSucces) {
        res.status(201);
        res.json({
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          isAdmin: newUser.isAdmin,
          balance: newUser.balance,
          token: genToken(newUser._id)
        });
      } else  { res.status(400); throw new Error("Unable to create default user properties."); }
    } else { res.status(400); throw new Error("Invalid name, email, or password."); }
  } else { res.status(400); throw new Error("A user with that email already exists."); }
});

// GET: api/users/profile | get the user's information | private
const getProfile = trycatch( async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      balance: user.balance,
      token: genToken(user._id)
    });
  }
  else { res.status(404); throw new Error("User not found.")}
});

// PUT: api/users/profile | update the user's information | private
const updateProfile = trycatch( async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;
    if (req.body.balance) user.balance = Number(req.body.balance);
    if (req.body.password) user.password = req.body.password;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name.toLowerCase(),
      email: updatedUser.email.toLowerCase(),
      isAdmin: updatedUser.isAdmin,
      token: genToken(updatedUser._id),
      balance: updatedUser.balance
    });
  }
  else { res.status(404); throw new Error("User not found.")}
});

// POST: api/users/password-reset | send a reset link to the user's email | public
const sendResetLink = trycatch( async (req, res) => {
  // Get the entered email for validation
  if (req.body.email) {
    // Look for a user with the given email
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      // If there is already a reset token, use that one, otherwise make a new one
      let resetToken = await ResetToken.findOne({ user_id: user._id });
      if (!resetToken) {
        resetToken = await ResetToken.create({
          user_id: user._id,
          token: crypto.randomBytes(32).toString("hex")
        });
      }
      // Create a password reset link and send it to the user's email
      const link = `${process.env.DOMAIN}/password-reset/${user._id}/${resetToken.token}`;
      await sendEmail(user.email,
        "LiberCord Account",
        `A password reset was requested for this account, click here to change it now: ${link}`,
        `<p>A password reset was requested for this account, click <a href="${link}">here</a> to change it now.</p>`
      );
      res.status(200).json({msg: "A password reset link has been sent to your email."});
    } else { res.status(404); throw new Error("No user with that email was found."); }
  } else { res.status(401); throw new Error("No email provided."); }
});

// POST: api/users/password-reset/:id/:token |
// When the user clicks the email link, reset their password
const resetPassword = trycatch( async (req, res) => {
  // Get the entered new password for validation
  if (req.body.password) {
    // Look for a user with the id from the link
    const user = await User.findById(req.params.id);
    if (user) {
      // Look for the user's reset token to authenticate password reset
      const resetToken = await ResetToken.findOne({
        user_id: user._id,
        token: req.params.token
      });
      if (resetToken) {
        // If valid, set the new password, save the user, and delete the token
        user.password = req.body.password;
        await user.save();
        await resetToken.delete();
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          balance: user.balance,
          token: genToken(user._id)
        });
      } else { res.status(400); throw new Error("Invalid reset link used."); };
    } else { res.status(404); throw new Error("Invalid reset link used."); };
  } else { res.status(401); throw new Error("No password provided."); };
});

module.exports = { loginUser, getProfile, registerUser, updateProfile,
  sendResetLink, resetPassword };
