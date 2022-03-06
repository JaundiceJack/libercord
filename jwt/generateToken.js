const jwt = require('jsonwebtoken');

const daysTillExpire = 1;

// Create a token to authenticate user actions
const generateToken = (id) => { 
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: (60 * 60 * 24 * daysTillExpire) }
  )
};

module.exports = generateToken;
