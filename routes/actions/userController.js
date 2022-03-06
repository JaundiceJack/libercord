const trycatch = require('express-async-handler');
const genToken = require('../../jwt/generateToken.js');

// Create models
const User = require('../../models/User.js');

// POST: api/user/login | authorize user & get token | public
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

// POST api/user/ | create a new user | public
const registerUser = trycatch( async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    const newUser = await User.create({ name, email, password });
    if (newUser) {
      res.status(201);
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        balance: user.balance,
        token: genToken(user._id)
      })
    }
    else { res.status(400); throw new Error("Invalid name, email, or password."); }
  }
  else { res.status(400); throw new Error("A user with that email already exists."); }
});

// GET: api/user/profile | get the user's information | private
const getProfile = trycatch( async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      balance: user.balance
    });
  }
  else { res.status(404); throw new Error("User not found.")}
});

// PUT: api/user/profile | update the user's information | private
const updateProfile = trycatch( async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
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

// PUT: api/user/balance | update the user's initial balance | private
const editBalance = trycatch( async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.balance = Number(req.body.balance);
    const savedUser = await user.save();
    if (savedUser) res.status(200).json(savedUser.balance);
    else { res.status(401); throw new Error("Unable to edit initial balance.") }
  } else { res.status(404); throw new Error("User not found.")}
})

module.exports = { loginUser, getProfile, registerUser, updateProfile, editBalance };
