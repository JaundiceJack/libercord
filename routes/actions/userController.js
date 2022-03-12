const trycatch = require('express-async-handler');
const genToken = require('../../jwt/generateToken.js');

// Create models
const User = require('../../models/User.js');
const Category = require('../../models/Category.js');
const Location = require('../../models/Location.js');
const Source   = require('../../models/Source.js');

// POST: api/users/login | authorize user & get token | public
const loginUser = trycatch( async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && user.matchPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      balance: user.balance,
      token: genToken(user._id)
    }); }
  else { res.status(401); throw new Error("User not found."); };
});

// Set up user's default properties
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

module.exports = { loginUser, getProfile, registerUser, updateProfile };
