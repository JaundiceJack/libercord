const config = require('config');
const jst = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('x-auth-token');

  // Check for the authentication token
  if (!token) return res.status(401).json({msg: "Please log in again or create an account."});

  try {
    // Verify the token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded;
    next();
  } catch(e) {
    res.status(400).json({msg: "Invalid token."})
  }
}

module.exports = auth;
